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
const selectedWork: string = html.split('id="work"')[1]?.split('id="research"')[0] ?? "";

const requiredContent: ReadonlyArray<ContentCheck> = [
  { label: "DS macro and quant identity", fragment: "Macro Research <span>·</span> Quant Analysis <span>·</span> Financial Data" },
  { label: "research-first Hero", fragment: "경제·금융시장 데이터를 수집하고 검증해," },
  { label: "Hero workflow visual", fragment: "DATA TO RESEARCH OUTPUT" },
  { label: "three-project Selected Work heading", fragment: "From market data to research." },
  { label: "K-Skill title", fragment: "글로벌 시장 브리핑 자동화:<br>K-Skill 정식 기능 채택" },
  { label: "K-Skill workflow detail", fragment: "실제 브리핑 과정을 데이터 수집, 기준일 확인, 검증, 자산별 정리 단계로 나누고 각 단계의 판단 기준을 규칙화했습니다." },
  { label: "K-Skill source and date checks", fragment: "각 수치에는 출처와 기준일을 함께 기록했습니다." },
  { label: "K-Skill time reduction", fragment: "약 40분 걸리던 시간을 10분 이내로 줄였습니다." },
  { label: "K-Skill accepted feature", fragment: "‘Multi-Asset Morning Briefing’이라는 정식 기능으로 채택됐습니다." },
  { label: "K-Skill official contributor badge", fragment: "K-SKILL · OFFICIAL CONTRIBUTOR" },
  { label: "K-Skill badge points to the accepted feature documentation", fragment: "href=\"https://github.com/NomaDamas/k-skill/blob/main/docs/features/multi-asset-morning-briefing.md\"" },
  { label: "K-Skill time metric", fragment: "40<span> min</span> <i>→</i> &lt;10<span> min</span>" },
  { label: "K-Skill upstream PR link", fragment: "https://github.com/NomaDamas/k-skill/pull/675" },
  { label: "KTB research question", fragment: "같은 정책 방향에서도 만기별 금리 반응은 달라질 수 있다고 보고 3년물과 10년물의 상대적인 움직임을 중심으로 금통위 전후의 커브 변화를 살펴봤습니다." },
  { label: "KTB event count and observations", fragment: "총 36차례의 금융통화위원회를 대상으로 국고채 3년물과 10년물의 공통 관측일 1,084개를 분석했습니다." },
  { label: "KTB event windows", fragment: "D-1 / D+1 / D+5" },
  { label: "KTB event results", fragment: "3s10s 스프레드가 확대된 경우는 19회였고, 3년물의 절대 변동폭이 10년물보다 컸던 경우는 21회였습니다." },
  { label: "KTB relative value and risk review", fragment: "양쪽의 DV01을 맞춘 상대가치 포지션을 연구상 구성하고 거래비용과 잔여위험을 점검했습니다." },
  { label: "KTB result chips", fragment: "Transaction Cost · Residual Risk" },
  { label: "US factor OOS title", fragment: "미국 대형주 팩터전략<br>Walk-Forward 검증 및 백테스트" },
  { label: "US factor walk-forward method", fragment: "확장형 Walk-Forward 검증을 5회 수행했습니다." },
  { label: "US factor IID bootstrap validation", fragment: "IID 및 Block Bootstrap과 파라미터 민감도 분석으로" },
  { label: "US factor monthly portfolio implementation", fragment: "고정 60/20/20 운용 전략과 구간마다 후보를 다시 선택하는 검증 결과를 구분해 기록했습니다." },
  { label: "US factor result chips", fragment: "IID / Block Bootstrap</span><span>Parameter Sensitivity" },
  { label: "Research Workflow heading", fragment: "02 / RESEARCH WORKFLOW" },
  { label: "Research Workflow nine-step endpoints", fragment: "Source Identification" },
  { label: "Research Output wording", fragment: "Market Briefings · Research Presentations · Analysis Reports" },
  { label: "Background retains Fama-French activity", fragment: "Fama-French Research <i>·</i> Quantitative Finance Research" },
  { label: "Contact remains present", fragment: "06 / CONTACT" },
];

for (const check of requiredContent) {
  assert.ok(html.includes(check.fragment), "Missing " + check.label);
}

const projectTitles: string[] = [
  "글로벌 시장 브리핑 자동화:<br>K-Skill 정식 기능 채택",
  "한국은행 통화정책과<br>KTB 금리곡선 분석",
  "미국 대형주 팩터전략<br>Walk-Forward 검증 및 백테스트",
];
const titlePositions: number[] = projectTitles.map((title: string): number => selectedWork.indexOf(title));
assert.ok(titlePositions.every((position: number): boolean => position >= 0), "All three current projects must appear in Selected Work");
assert.ok(titlePositions.every((position: number, index: number): boolean => index === 0 || position > (titlePositions[index - 1] ?? -1)), "Selected Work must preserve project order");
assert.equal((selectedWork.match(/class="project-card /g) ?? []).length, 3, "Selected Work must contain exactly three project cards");
assert.doesNotMatch(selectedWork, /Fama-French|GRS Bootstrap|HML t-stat|29 BUY|29 SELL|매수 29건|매도 29건|실계좌 주문 경로/);
const cardClassPositions: number[] = [
  selectedWork.indexOf("project-card project-featured project-flagship"),
  selectedWork.indexOf("project-card project-featured project-rates"),
  selectedWork.indexOf("project-card project-standard"),
];
assert.ok(cardClassPositions.every((position: number): boolean => position >= 0), "The three projects must retain their featured and standard card styles");
assert.ok(cardClassPositions.every((position: number, index: number): boolean => index === 0 || position > (cardClassPositions[index - 1] ?? -1)), "Project card hierarchy and order must be preserved");
const selectedDescriptions: string[] = selectedWork.match(/<p class="project-description">[\s\S]*?<\/p>/g) ?? [];
assert.ok(selectedDescriptions.length > 0, "Selected Work descriptions must remain present");
assert.ok(selectedDescriptions.every((description: string): boolean => !/<br\b/i.test(description)), "Project description paragraphs must wrap naturally");
assert.ok(html.includes('검증해,<br class="meaning-break"> 매크로·퀀트 분석'), "Hero statement must break at the requested meaning boundary");
assert.equal((selectedWork.match(/class="project-description project-continuation"/g) ?? []).length, 2, "KTB analysis and interpretation must have separate continuation paragraphs");
assert.ok(html.includes('href="https://github.com/bucheoncityboy/portfolio-index"'), "Top GitHub links must point to portfolio-index");
assert.doesNotMatch(stylesheet, /text-align:\s*justify/i, "Body copy must not use justified alignment");

const workflowSection: string = html.split('id="research"')[1]?.split('class="section skills-section"')[0] ?? "";
const workflowSteps: string[] = ["Source Identification", "Data Collection", "Validation", "Macro Analysis", "Quant Analysis", "Statistical Validation", "Market Context", "Research Output", "Automation"];
for (const step of workflowSteps) assert.ok(workflowSection.includes(step), "Research Workflow is missing " + step);
assert.equal((workflowSection.match(/class="ops-index"/g) ?? []).length, 9, "Research Workflow must retain nine steps");

const repositoryLinks: string[] = Array.from(html.matchAll(/href="(https:\/\/github\.com\/[^\"]+)"/g))
  .map((match: RegExpMatchArray): string | undefined => match[1])
  .filter((link: string | undefined): link is string => link !== undefined);
const requiredLinks: ReadonlyArray<string> = [
  "https://github.com/bucheoncityboy/multi-asset-morning-briefing",
  "https://github.com/NomaDamas/k-skill/pull/675",
  "https://github.com/NomaDamas/k-skill/blob/main/docs/features/multi-asset-morning-briefing.md",
  "https://github.com/bucheoncityboy/krw-rates-integrated-research",
  "https://github.com/bucheoncityboy/us-robust-live-ops",
  "https://www.linkedin.com/in/jaewon-kim-kr/",
];
for (const link of requiredLinks) assert.ok(html.includes('href="' + link + '"'), "Missing project or profile link: " + link);
assert.ok(repositoryLinks.length >= 7, "Project cards and profile must retain their public links");

const ids: string[] = Array.from(html.matchAll(/\bid="([^"]+)"/g))
  .map((match: RegExpMatchArray): string | undefined => match[1])
  .filter((id: string | undefined): id is string => id !== undefined);
assert.equal(new Set(ids).size, ids.length, "HTML id attributes must be unique");
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  const target: string | undefined = match[1];
  if (target !== undefined) assert.ok(ids.includes(target), "Internal link target #" + target + " must exist");
}

assert.match(stylesheet, /\.project-flagship \.project-featured-main > \.project-description \+ \.project-description\s*\{\s*margin-top:\s*16px/);
assert.match(stylesheet, /\.project-rates \.project-featured-main > \.project-description \+ \.project-description\s*\{\s*margin-top:\s*16px/);
assert.match(stylesheet, /\.project-standard \.project-description \+ \.project-description\s*\{\s*margin-top:\s*14px/);
assert.match(stylesheet, /#work \.detail-label\s*\{[^}]*display:\s*block/);
assert.match(stylesheet, /#work \.detail-label\s*\{[^}]*margin:\s*0 0 6px/);
assert.match(stylesheet, /--navy:\s*#18233a/);
assert.match(stylesheet, /--blue:\s*#4169a1/);
assert.match(stylesheet, /@media \(max-width: 980px\)/);
assert.match(stylesheet, /@media \(max-width: 720px\)/);
assert.match(stylesheet, /\.project-grid > \.project-standard:only-child\s*\{\s*grid-column:\s*1 \/ -1/);
assert.match(stylesheet, /\.project-rates \.project-featured-main > \.project-description\s*\{\s*max-width:\s*720px/);
assert.match(stylesheet, /\.project-standard \.project-description\s*\{\s*max-width:\s*820px;\s*font-size:\s*12\.5px/);
assert.match(stylesheet, /text-align:\s*left;\s*text-wrap:\s*pretty/);
assert.match(stylesheet, /word-break:\s*keep-all;\s*overflow-wrap:\s*break-word/);
assert.match(stylesheet, /\.project-rates \.project-featured-main > \.project-description \+ \.project-description\s*\{\s*margin-top:\s*14px/);

for (const check of requiredContent) console.log("PASS " + check.label);
console.log("PASS three Selected Work projects with Fama-French retained in Background only");
console.log("PASS nine-step Research Workflow and existing links");
console.log("PASS scoped label and paragraph spacing styles");
console.log("All " + (requiredContent.length + 3) + " DS portfolio checks passed.");
