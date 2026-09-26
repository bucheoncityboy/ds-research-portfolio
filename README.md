# Jaewon Kim — DS Macro & Quant Research Portfolio

A responsive static site for a Macro / Quant Research Assistant internship application at DS Investment Securities. It reuses the visual system of the existing investment portfolio while keeping the project and GitHub Pages deployment separate.

Live site: https://bucheoncityboy.github.io/ds-research-portfolio/

## Preview locally

Open `index.html` in a browser. The site has no build step or JavaScript.

## Validate

Run `npx --yes tsx src/harness.ts` from this directory to check the DS-focused content, project order, links, responsive design rules, privacy, and Pages workflow.

## Publish

In the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save. GitHub Pages will publish the static site from the root of `main` after each push. The `.nojekyll` file keeps the source branch from being processed by Jekyll.
