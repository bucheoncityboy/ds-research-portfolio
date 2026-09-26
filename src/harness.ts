import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

interface ContentCheck {
  readonly label: string;
  readonly fragment: string;
}

const rootDirectory: string = process.cwd();
const indexPath: string = resolve(rootDirectory, "index.html");
const stylesheetPath: string = resolve(rootDirectory, "styles.css");
const noJekyllPath: string = resolve(rootDirectory, ".nojekyll");

assert.ok(existsSync(indexPath), "index.html must exist at the site root");
assert.ok(existsSync(stylesheetPath), "styles.css must exist at the site root");
assert.ok(existsSync(noJekyllPath), ".nojekyll must exist at the Pages source root");

const html: string = readFileSync(indexPath, "utf8");
const stylesheet: string = readFileSync(stylesheetPath, "utf8");
const requiredContent: ReadonlyArray<ContentCheck> = [
  { label: "DS macro and quant identity", fragment: "Macro Research <span>·</span> Quant Analysis <span>·</span> Financial Data" },
  { label: "macro and quant hero statement", fragment: "경제·금융시장 데이터를 수집하고 검증해," },
  { label: "research-oriented hero subcopy", fragment: "반복적인 데이터 수집과 리서치 과정을 구조화했습니다." },
  { label: "official data workflow in hero", fragment: "Official sources" },
  { label: "five-step research output caption", fragment: "DATA TO RESEARCH OUTPUT" },
  { label: "macro and market research capability", fragment: "Rates · FX · Economic Indicators · Cross-Asset" },
  { label: "quant validation capability", fragment: "Time Series · Regression · Bootstrap · Walk-Forward" },
  { label: "financial data capability", fragment: "Python · SQL · API · Data Validation" },
  { label: "research automation capability", fragment: "News / Report Monitoring · Research Workflow" },
  { label: "K-Skill official contributor badge", fragment: "K-SKILL · OFFICIAL CONTRIBUTOR" },
  { label: "K-Skill PR merged result", fragment: "해당 기능은 K-Skill 오픈소스 프로젝트에 PR #675로 병합됐습니다." },
  { label: "official macro data sources", fragment: "U.S. Treasury</span><i>·</i><span>Cboe" },
  { label: "K-Skill upstream contribution proof", fragment: "https://github.com/NomaDamas/k-skill/pull/675" },
  { label: "BOK policy and curve analysis", fragment: "한국은행 통화정책과<br>KTB 금리곡선 분석" },
  { label: "BOK event sample and observations", fragment: "금융통화위원회 결정 38회를 대상으로 국고채 3년물과 10년물 1,151개 일별 관측치" },
  { label: "BOK event windows", fragment: "D-1 / D+1 / D+5" },
  { label: "BOK interpretation counts", fragment: "D+1 기준 3s10s 확대는 20회였고" },
  { label: "US factor validation before execution details", fragment: "QUANT STRATEGY <i>·</i> BACKTEST VALIDATION" },
  { label: "five-fold out-of-sample validation", fragment: "시간순 5-Fold Walk-Forward 방식으로 검증했습니다." },
  { label: "account-order evidence is framed as a test", fragment: "ORDER-PATH TEST · 29 BUY / 29 SELL FILLS CONFIRMED" },
  { label: "Fama-French cross-market research", fragment: "Fama-French 팩터의<br>미국·한국시장 재현 및 실증분석" },
  { label: "US GRS result", fragment: "GRS Bootstrap p-value는 0.010" },
  { label: "Korea HML result", fragment: "HML t-stat 3.89" },
  { label: "research workflow section title", fragment: "02 / RESEARCH WORKFLOW" },
  { label: "data-to-output workflow heading", fragment: "From data to<br>research output." },
  { label: "research workflow nine-step endpoints", fragment: "Source Identification" },
  { label: "research workflow reusable automation", fragment: "Reusable Research Workflow · LLM" },
  { label: "additional K-ICS research", fragment: "Dynamic K-ICS FX Hedging" },
  { label: "Macro Research capabilities", fragment: "Market Data Validation" },
  { label: "education and activities", fragment: "Hanyang University, Seoul" },
  { label: "Global IB report monitoring", fragment: "Global IB Report Monitoring" },
  { label: "four credentials", fragment: "Quantitative Research Consultant" },
  { label: "contact section", fragment: 'id="contact"' },
];

const passedChecks: string[] = [];
for (const check of requiredContent) {
  assert.ok(html.includes(check.fragment), "Missing " + check.label);
  passedChecks.push(check.label);
}

const projectTitles: string[] = [
  "K-Skill 오픈소스 반영:<br>금융시장 리서치 프로세스 자동화",
  "한국은행 통화정책과<br>KTB 금리곡선 분석",
  "미국 대형주 팩터전략<br>검증 및 백테스트",
  "Fama-French 팩터의<br>미국·한국시장 재현 및 실증분석",
];
const selectedWork: string = html.split('id="work"')[1]?.split('id="research"')[0] ?? "";
const titlePositions: number[] = projectTitles.map((title: string): number => selectedWork.indexOf(title));
assert.ok(titlePositions.every((position: number): boolean => position >= 0), "All four requested projects must appear in Selected Work");
assert.ok(titlePositions.every((position: number, index: number): boolean => index === 0 || position > (titlePositions[index - 1] ?? -1)), "Selected Work must follow the requested project order");
assert.ok(selectedWork.indexOf("project-featured project-flagship") < selectedWork.indexOf("project-featured project-rates"), "K-Skill and BOK projects must be the two featured cards");
passedChecks.push("four projects appear in the requested order and hierarchy");

const ids: string[] = Array.from(html.matchAll(/\bid="([^"]+)"/g))
  .map((match: RegExpMatchArray): string | undefined => match[1])
  .filter((id: string | undefined): id is string => id !== undefined);
const uniqueIds: Set<string> = new Set(ids);
assert.equal(uniqueIds.size, ids.length, "HTML id attributes must be unique");
const internalTargets: string[] = Array.from(html.matchAll(/href="#([^"]+)"/g))
  .map((match: RegExpMatchArray): string | undefined => match[1])
  .filter((target: string | undefined): target is string => target !== undefined);
for (const target of internalTargets) assert.ok(uniqueIds.has(target), "Internal link target #" + target + " must exist");
passedChecks.push("unique section identifiers and working in-page links");

const repositoryLinks: string[] = Array.from(html.matchAll(/href="(https:\/\/github\.com\/[^\"]+)"/g))
  .map((match: RegExpMatchArray): string | undefined => match[1])
  .filter((link: string | undefined): link is string => link !== undefined);
const requiredLinks: ReadonlyArray<string> = [
  "https://github.com/bucheoncityboy/multi-asset-morning-briefing",
  "https://github.com/NomaDamas/k-skill/pull/675",
  "https://github.com/bucheoncityboy/krw-rates-integrated-research",
  "https://github.com/bucheoncityboy/us-robust-live-ops",
  "https://github.com/bucheoncityboy/fama-french-integrated-research",
  "https://github.com/bucheoncityboy/Dynamic-Shield-K-ICS-AI",
  "https://www.linkedin.com/in/jaewon-kim-kr/",
];
for (const link of requiredLinks) assert.ok(html.includes('href="' + link + '"'), "Missing public project or profile link: " + link);
assert.ok(repositoryLinks.length >= 8, "Project cards and upstream proof must have public repository links");
assert.doesNotMatch(html, /\b010[- ]\d{3,4}[- ]\d{4}\b/, "A phone number must not be published");
assert.doesNotMatch(html, /AI Engineer|ML Engineer|Python Developer|Software Engineer|Data Scientist/i, "The page must lead with a research identity");
assert.doesNotMatch(html, /THE THROUGH-LINE|live portfolio management|continuous live trading|production portfolio management/i, "The page must not imply ongoing live portfolio operations");
passedChecks.push("project/profile links, phone privacy, and research-first positioning");

passedChecks.push("root-branch Pages source with .nojekyll");

assert.match(stylesheet, /--bg:\s*#f7f8fa/);
assert.match(stylesheet, /--navy:\s*#18233a/);
assert.match(stylesheet, /--blue:\s*#4169a1/);
assert.match(stylesheet, /\.container\s*\{\s*width:\s*min\(1180px/);
assert.match(stylesheet, /\.site-header\s*\{\s*position:\s*sticky/);
assert.match(stylesheet, /@media \(max-width: 980px\)/);
assert.match(stylesheet, /@media \(max-width: 720px\)/);
assert.match(stylesheet, /\.operations-section\s*\{\s*border-block:\s*1px solid #e1e6ed;\s*background:\s*#f1f3f6/);
assert.match(stylesheet, /\.project-featured\.project-flagship/);
passedChecks.push("responsive reference design and DS project card hierarchy");

for (const check of passedChecks) console.log("PASS " + check);
console.log("All " + (passedChecks.length + requiredContent.length) + " DS portfolio checks passed.");
