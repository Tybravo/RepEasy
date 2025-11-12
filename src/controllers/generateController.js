import openai from "../config/openai.js";
import ai from "../config/gemini.js";
import { getRandomPersona } from "../config/sui_personas.js";
import { getRandomAspect } from "../config/sui_aspects.js";
import { getRandomTemperature } from "../config/ai_temprature.js";



const retry = async (fn, retries = 5, delay = 800) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`, err.message);
      await new Promise(r => setTimeout(r, delay * 2 ** i));
    }
  }
  throw new Error("All retries failed");
};

export const generateThread = async (req, res) => {
  const { name, tweetType, maxGeneration, twitterHandle } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Missing or invalid 'name'." });
  }

  if (!tweetType || !["short", "long"].includes(tweetType)) {
    return res
      .status(400)
      .json({ error: "'tweetType' must be 'short' or 'long'." });
  }

  const maxGenNum = parseInt(maxGeneration, 10);
  if (isNaN(maxGenNum) || (maxGenNum !== 1 && maxGenNum !== 2)) {
    return res
      .status(400)
      .json({ error: "'maxGeneration' must be 1 or 2." });
  }

  if (
    !twitterHandle ||
    typeof twitterHandle !== "string" ||
    !twitterHandle.trim()
  ) {
    return res
      .status(400)
      .json({ error: "Missing or invalid 'twitterHandle' (e.g., '@sui')." });
  }

  const persona = getRandomPersona();
  const temp = getRandomTemperature();
  const aspect = getRandomAspect();

  console.log("Selected Persona:", persona.id);
  console.log("Selected Temperature:", temp);
  console.log("Selected Aspect:", aspect.id);

  const personaPrompt = persona.prompt(name);

  // Set generation parameters
  const numTweets = maxGenNum;
  const isShort = tweetType === "short";
  const charLimit = isShort
    ? "Each tweet must be under 280 characters."
    : "Each tweet must be at least > 560 characters long.";

  const systemPrompt = `${personaPrompt}

**Project Info:**
- Name: "${name}"
- Twitter Handle: ${twitterHandle}

**Rules — NON-NEGOTIABLE:**
1. **ALWAYS mention the project using its Twitter or X handle** (${twitterHandle}) in **every single tweet**.
   - Example: "Check out ${twitterHandle}'s new Walrus integration!"
   - Never refer to the project by name alone — **always use @handle**.
2. Type: ${tweetType === "short" ? "Short tweet(s)" : "Long tweet(s)"}.
3. Generate exactly ${numTweets} independent tweet${
    numTweets > 1 ? "s" : ""
  }, each one must stand completely on its own. 
   - Do NOT make them sequential, do NOT continue or refer to previous tweets. 
   - Each tweet must be self-contained, unique, and understandable without context from others.
   ${charLimit}
4. Use **Sui-specific emojis**
5. End with **1–2 relevant hashtags**: but this #${name} should always be part of it  #Sui #Web3 #SuiMove #WalrusStorage (choose based on topic)
6. **NEVER** add explanations, disclaimers, or markdown — output **ONLY the tweet(s)**
7. Keep tone **casual, hype, and community-focused** — like a real builder on Crypto Twitter
8. Focus on the **"${aspect.id}"** aspect of the project: ${aspect.description}
9. ✅ Label each tweet clearly as:
   "Tweet 1: ..."
   "Tweet 2: ..."
   etc.
10. Do not separate tweets with extra newlines — each tweet should be a single paragraph ending with hashtags.
`;

  const userPrompt = `Generate content for this project name: "${name}".
Determine what kind of Sui project it is (DeFi, AI, MPC, Wallet, Infrastructure, Staking, Analytics, Community,Data Markets, Exchanges, Token, NFT, Storage etc...),
then write tweet(s) accordingly.
Project: ${name}
Twitter: ${twitterHandle}
Parts: ${numTweets}`;

// Unified AI call wrapper
  const callAI = async () => {
    const useGemini = Math.random() < 0.5;
    if (useGemini) {
      console.log("🤖 Trying Gemini...");
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        config: { temperature: temp, systemInstruction: systemPrompt },
      });
      return result.text;
    } else {
      console.log("🧠 Trying OpenAI...");
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: temp,
        max_tokens: 500
      });
      return response.choices[0].message.content;
    }
  };

  try {
    let text = await retry(callAI, 5);

    // Split tweets cleanly
    let tweets = text
      .split(/Tweet\s*\d+:/i)
      .map(t => t.trim())
      .filter(Boolean);

    if (tweets.length === 1 && numTweets > 1) {
      tweets = text.split(/\n\n+/).map(t => t.trim()).filter(Boolean);
    }

    tweets = tweets.map(t => t.replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim());

    res.json({ success: true, tweets: tweets.length ? tweets : ["No content generated."] });
  } catch (err) {
    console.error("All AI attempts failed:", err);
    
  if (err.code === "rate_limit_exceeded") {
    console.log("⚠️ OpenAI rate limit hit — retrying with Gemini...");
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: "Retry: " + req.body.name }] }],
        config: {
          temperature: 0.8,
          systemInstruction: "Generate 1 tweet about " + req.body.name,
        },
      });
      const fallbackText = result.text.trim();
   return res.json({ success: true, tweets: [fallbackText] });
   } catch (geminiErr) {
      console.error("Fallback Gemini Error:", geminiErr);
    }
 }

    res.status(500).json({ error: "Failed to generate content after multiple attempts." });
  }

 };
