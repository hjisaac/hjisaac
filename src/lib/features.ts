export const ARTICLES_ENABLED = true;

// Articles live in run-crucible's jobs/<slug>/ARTICLE.md, mounted here as
// the `articling` git submodule (same convention as cvitae/). Articles are
// read on GitHub itself, not rendered on this site; cards just link out.
// A job's ARTICLE.md must have `published: true` frontmatter to show up —
// see content.config.ts for the collection filter.
export const ARTICLES_LOCAL_DIR = 'articling';
export const ARTICLES_REPO = 'hjisaac/run-crucible';
export const ARTICLES_BRANCH = 'main';
export const ARTICLES_JOBS_PATH = 'jobs';
export const ARTICLE_FILENAME = 'ARTICLE.md';
