export const ARTICLES_ENABLED = true;

// Articles live in run-crucible's jobs/<slug>/ARTICLE.md — fetched remotely
// at build time (see content.config.ts), no local clone/submodule needed.
// Articles are read on GitHub itself, not rendered on this site; cards just
// link out. A job's ARTICLE.md must have `published: true` frontmatter to
// show up at all — see the loader for the full frontmatter shape.
export const ARTICLES_REPO = 'hjisaac/run-crucible';
export const ARTICLES_BRANCH = 'main';
export const ARTICLES_JOBS_PATH = 'jobs';
export const ARTICLE_FILENAME = 'ARTICLE.md';
