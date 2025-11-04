import fs from "fs";
import path from "path";

export const getScrapedProjects = () => {
  const dataPath = path.join(process.cwd(), "../../tools/scraper/output/giverep_projects.json");
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
};
