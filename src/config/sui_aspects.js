export const SUI_ASPECTS = [
  {
    id: "technology",
    description: "Focus on the technology — explain what makes it innovative, scalable, or unique within the Sui ecosystem.",
  },
  {
    id: "tokenomics",
    description: "Focus on the token use case, rewards, staking, or economic incentives driving the ecosystem.",
  },
  {
    id: "community and partnerships",
    description: "Highlight the community growth, engagement, collaborations, and how people are using it.",
  },
  {
    id: "ecosystem",
    description: "Show how this project connects with other parts of the Sui ecosystem — integrations, partnerships, or composability.",
  },
  {
    id: "marketing and growth",
    description: "Focus on metrics, milestones, adoption, and growth potential.",
  },
  {
    id: "vision",
    description: "Focus on the mission, long-term vision, and why this project matters in the Web3 or Sui future.",
  },
  {
    id: "innovation",
    description: "Highlight what’s new, experimental, or cutting-edge about it — emphasize novelty and creativity.",
  },
    {
        id: "UI/UX and user experience",
        description: "Emphasize the design, usability, and overall user experience of the project within the Sui ecosystem.",
    },
    {
        id:  "scalability and performance",
        description: "Focus on how the project handles growth, high demand, and maintains performance on the Sui network.",
    },
    {
        id: "security and reliability",
        description: "Highlight the security measures, audits, and reliability features that ensure trustworthiness within the Sui ecosystem.",
    },
    {
        id: "decentralization and governance",
        description: "Emphasize the project's approach to decentralization, community governance, and decision-making processes on Sui.",
    },
    {
        id: "sustainability and impact",
        description: "Focus on the environmental impact, sustainability initiatives, and social responsibility of the project within the Sui ecosystem.",
    },
    { id:  "real-world adoption and use cases",
        description: "Highlight real-world applications, partnerships, and how the project is being adopted outside of the crypto space on Sui.",
    },

];

export const getRandomAspect = () => {
  const randomIndex = Math.floor(Math.random() * SUI_ASPECTS.length);
  return SUI_ASPECTS[randomIndex];
};

// import openai from "../config/openai.js";
// import { getRandomPersona } from "../config/sui_personas.js";
// import { getRandomAspect } from "../config/sui_aspects.js";

// export const generateThread = async (req, res) => {
//   const { name, tweetType, maxGeneration, twitterHandle } = req.body;

//   // ✅ Validate input
//   if (!name || typeof name !== "string" || name.trim() === "") {
//     return res.status(400).json({ error: "Missing or invalid 'name'." });
//   }

//   if (!tweetType || !["short", "long"].includes(tweetType)) {
//     return res.status(400).json({ error: "'tweetType' must be 'short' or 'long'." });
//   }

//   const maxGenNum = parseInt(maxGeneration, 10);
//   if (isNaN(maxGenNum) || (maxGenNum !== 1 && maxGenNum !== 2)) {
//     return res.status(400).json({ error: "'maxGeneration' must be 1 or 2." });
//   }

//   if (!twitterHandle || typeof twitterHandle !== "string" || !twitterHandle.trim()) {
//     return res.status(400).json({ error: "Missing or invalid 'twitterHandle' (e.g., '@sui')." });
//   }

//   // 🎭 Random persona and aspect
//   const persona = getRandomPersona();
//   const aspect = getRandomAspect();

//   const personaPrompt = persona.prompt(name);
//   const numTweets = maxGenNum;
//   const isShort = tweetType === "short";

//   const charLimit = isShort
//     ? "Each tweet must be under 280 characters."
//     : "Each tweet must be at least 560 characters long (split long thoughts into two tweets if needed).";

//   try {
//     // 🧩 System-level instruction
//     const systemPrompt = `
// ${personaPrompt}

// Now focus on the **"${aspect.id}"** aspect of the project:
// ${aspect.description}

// **Project Info:**
// - Name: "${name}"
// - Twitter Handle: ${twitterHandle}

// **Rules — NON-NEGOTIABLE:**
// 1. ALWAYS mention the project using its Twitter or X handle (${twitterHandle}) in EVERY tweet.
//    - Example: "Check out ${twitterHandle}'s new update!"
//    - Never refer to the project by name alone — always use @handle.
// 2. Focus on the "${aspect.id}" aspect: ${aspect.description}.
// 3. Type: ${tweetType === "short" ? "Short tweet(s)" : "Long tweet(s)"}.
// 4. Generate exactly ${numTweets} tweet${numTweets > 1 ? "s" : ""}. ${charLimit}
// 5. Use Sui-specific emojis.
// 6. Include 1–2 relevant hashtags (always include #${name}, and optionally #Sui #Web3 #SuiMove #WalrusStorage).
// 7. NEVER add explanations, disclaimers, or markdown — output ONLY the tweet(s).
// 8. Keep tone casual, hype, and crypto-native — like a real builder on Crypto Twitter.
// 9. If multiple tweets are generated, each should explore a DIFFERENT subtopic of "${aspect.id}".
// `;

//     // 🧠 User-level content
//     const userPrompt = `
// Generate ${numTweets} tweet(s) about "${name}" focusing on the "${aspect.id}" aspect.
// Avoid repetition. Each tweet should explore a unique angle or idea related to ${aspect.id}.
// Mention ${twitterHandle} in every tweet.
// `;

//     // 🚀 AI generation
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userPrompt },
//       ],
//       temperature: 0.85, // more creative
//       max_tokens: 500,
//     });

//     // 🧹 Clean up and format output
//     let tweets = response.choices[0].message.content
//       .split("\n")
//       .map((line) => line.trim())
//       .filter((line) => line && !line.startsWith("```") && line.length > 0);

//     if (tweets.length === 0) {
//       tweets = ["No content generated. Try a clearer topic."];
//     }

//     res.json({
//       success: true,
//       persona: persona.id,
//       aspect: aspect.id,
//       tweets,
//     });
//   } catch (err) {
//     console.error("AI Generation Error:", err);
//     res.status(500).json({ error: "Failed to generate content" });
//   }
// };



// // Temperature	Creativity Level	Typical Use
// // 0.0–0.3	🔒 Very focused, factual	Code generation, data cleaning
// // 0.4–0.6	⚖️ Balanced	Explanations, summaries

// // 1.0–1.3	🌀 Wild, chaotic	Brainstorming, humor, memes