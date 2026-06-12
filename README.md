# hjisaac.site

Static personal site. Open `index.html` via a local server (recommended), not `file://`.

```bash
python3 -m http.server 8765
# → http://localhost:8765
```

## What to edit

| Goal | File |
|------|------|
| Copy, jobs, projects, links | `js/content.js` |
| Colors, spacing, breakpoints | `css/variables.css` |
| Web3Forms key, visit tracking | `config/site-config.js` (copy from `config/site-config.example.js`) |

## Assets

- Headshot → `assets/images/`
- CV PDF → `assets/cv/`
- Project GIFs → `assets/projects/` (set `gif` path in `content.js`)

## Resume gate

Visitors submit the hello form on `#resume` before downloading the CV. Submissions and optional visit pings go to your email via [Web3Forms](https://web3forms.com) once `web3formsAccessKey` is set.

Set `trackVisits: false` in `config/site-config.js` to disable visit emails.

## Notes

- `config/site-config.js` is gitignored — recreate it on new machines from the example file.
- The CV PDF URL is still reachable directly; the form is a polite gate, not hard security.
- Drawer nav kicks in below `--drawer-breakpoint` (1500px) in `css/variables.css`.
