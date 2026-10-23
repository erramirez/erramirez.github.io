# Editing the site in Pages CMS

Sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub, open
`erramirez/erramirez.github.io`, and pick a branch in the top left. Edit `main` for the live
site. Each save is a commit to that branch, and Cloudflare rebuilds the site from it in about
a minute. Every field has a short hint under it in the editor.

## What's where

| Sidebar item | What it controls |
| --- | --- |
| Writing | Posts and notes, at `/posts/<file-name>/` |
| Research | Case studies on the Research page |
| Pages | About, Now, CV and Colophon |
| Lab | The cards on the Lab page |
| Homepage | Tagline, intro, photo and the SQL box title |
| SQL box data | Starter questions and the `me`, `jobs` and `interests` tables |
| Media | Images in `public/images/` |

## Common tasks

**Write a post.** Writing, then Add an entry. Fill in the title and date, and tick Draft until
it's ready. The file name, and so the URL, comes from the title. You can change it before the
first save, but changing it later breaks old links.

**Add an image to a post.** Use the image button in the editor toolbar. It uploads to
`public/images/`. Add alt text describing the image.

**Edit an older post with code.** Three archived posts have R code blocks. Switch the editor to
Markdown before editing them, so the code keeps its formatting.

**Update Now.** Pages, then Now. Edit the text and set Last updated to today.

**Add a fact to the SQL box.** SQL box data, then Table: me. Add a row with a lowercase
`field` name, such as `favorite_question`, and a value. It shows up right away in
`SELECT * FROM me;`. The `posts` and `lab` tables update on their own from Writing and Lab.

**Add a Lab experiment.** Lab, then Add an entry. Start it as Idea or Building, which shows the
card without a link. Once the app exists, either in `public/lab/<file-name>/` in the repo or
elsewhere with a full URL in Link, change it to Live.

## What needs code

These need a change in the repo instead of the CMS. Ask Claude, or edit the files.

- The top navigation (`src/layouts/BaseLayout.astro`). A new Page works at `/<file-name>/` but
  isn't in the menu.
- New tables or columns in the SQL box (`src/components/SqlConsole.astro`).
- The Lab apps themselves.
- Colors, fonts and layout (`src/styles/global.css`).
