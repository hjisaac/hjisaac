# hjisaac.me

Personal portfolio site, built with [Astro](https://astro.build) and pre-rendered to static HTML for real SEO (content is in the page source, not injected by client-side JS).

CV content (experience, education, projects, skills, papers) comes from the `cvitae` submodule's build output, not from this repo directly — see [Content](#content) below.

## Development

```bash
npm install
cp .env.example .env   # add your Web3Forms access key (see Contact form below)
npm run dev             # → http://localhost:4321
```

`npm run build` outputs the static site to `dist/`; `npm run preview` serves that build locally.

## Content

CV content is authored in the `cvitae` submodule (`cvitae/contents/cv_variants/general.yaml`) and resolved into `cvitae/outputs/en/general.json` by cvitae's own Python build. This site reads that JSON file directly at build time (`src/lib/cv.ts`) — it does not re-parse YAML or duplicate content.

If you've edited CV content in `cvitae`, rebuild it before building the site:

```bash
make build-cv   # or: cd cvitae && make build
npm run build
```

## What to edit

| Goal | File |
|------|------|
| CV content (jobs, education, projects, skills, papers) | `cvitae/contents/cv_variants/general.yaml` (see `cvitae/README.md`) |
| Site chrome — nav, section titles/themes, contact form copy, footer | directly in the relevant component (`src/components/Header.astro`, `Hero.astro`, `Footer.astro`, `ContactForm.astro`) or `src/pages/index.astro` for page title/description and section order |
| Colors, spacing, breakpoints | `src/styles/variables.css` (palette + role tokens) |
| Page components | `src/components/`, `src/pages/index.astro` |
| Web3Forms key, visit tracking | `.env` (copy from `.env.example`) |

## Assets

- Headshot → `public/assets/images/`
- CV PDF → `public/assets/cv/`
- Project GIFs → `public/assets/projects/` (set `demo`/`gif`-equivalent path where referenced)

## Contact form / resume gate

Visitors submit the hello form on `#contact` before downloading the CV. Submissions and optional visit pings go to your email via [Web3Forms](https://web3forms.com) once `PUBLIC_WEB3FORMS_ACCESS_KEY` is set in `.env` (locally) or in your Netlify site's environment variables (in production).

Set `PUBLIC_TRACK_VISITS=false` to disable visit emails.

## Notes

- `.env` is gitignored — recreate it on new machines from `.env.example`.
- The CV PDF URL is still reachable directly; the form is a polite gate, not hard security.
- Drawer nav kicks in below `--drawer-breakpoint` (1500px) in `src/styles/variables.css`.

## Deployment

Deployed on Netlify (`netlify.toml`): build command `npm run build`, publish directory `dist`. `cvitae/outputs/en/general.json` is committed inside the submodule, so Netlify's build does not need to run cvitae's Python build — only `cd cvitae && make build` locally, then commit and bump the submodule pointer, before pushing.
