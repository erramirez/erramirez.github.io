# ernestoramirez.com

Personal site for Ernesto Ramirez, built with [Astro](https://astro.build), edited with
[Pages CMS](https://pagescms.org), and hosted on Cloudflare.

## Writing

The easy way: sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub, open this
repo, and edit. Each save is a commit to `main`, and Cloudflare redeploys in about a minute.

The hands-on way: add or edit Markdown files directly.

| What | Where |
| --- | --- |
| Posts and notes | `src/content/posts/*.md` |
| Research case studies | `src/content/research/*.md` |
| About, Now, CV, Colophon | `src/content/pages/*.md` |
| Homepage text and photo | `src/data/home.json` |
| SQL box tables and starter questions | `src/data/dataset.json` |
| Lab cards | `src/content/lab/*.md` |
| Images | `public/images/` |

Set `draft: true` to keep a post off the live site (drafts still show in `npm run dev`).

## Lab apps

Each experiment lives at `/lab/<slug>/`. Either drop a built static app (an `index.html` plus
its assets) into `public/lab/<slug>/`, or add Astro pages under `src/pages/lab/<slug>/`. Then
add or edit its card in `src/content/lab/<slug>.md` (title, description, status). Cards for
`live` apps link to `/lab/<slug>/` automatically; set `url` to point somewhere else.

The SQL box's `posts` and `lab` tables are generated from the content at build time.

## Local development

Requires Node 22.12+ (see `.node-version`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check and build to dist/
```

## Hosting (Cloudflare)

Cloudflare Workers Builds is connected to this repo. Build command `npm run build`, deploy
command `npx wrangler deploy` (config in `wrangler.jsonc`). Pushes to `main` deploy to
production; other branches get preview URLs. Old Hugo URLs redirect via `public/_redirects`.

## Design review

The [Impeccable](https://impeccable.style) skill lives in `.claude/skills/impeccable`. In
Claude Code, run `/impeccable critique` or `/impeccable audit` on any page.
