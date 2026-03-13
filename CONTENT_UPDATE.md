# SSQS Content Update Guide

This site is designed so that most routine updates happen in one place.

## 1. Edit the main content file

Open:

`app/site-data.ts`

This file controls:

- faculty names, emails, portraits, and profile text
- research themes
- publication summaries and source links
- student names
- join-us copy

## 2. Update faculty portraits

Local faculty photos are stored in:

`public/assets/faculty`

If you replace a portrait, keep the same file name when possible:

- `manjin-zhong.jpg`
- `shuping-liu.jpg`
- `fudong-wang.jpg`

## 3. Update publications

In `app/site-data.ts`, edit the `publications` list.

Each paper currently includes:

- title
- venue
- year
- result summary
- significance summary
- `sourceHref`
- optional preview image

The website now links only to `Source` pages, not directly to local PDFs.

## 4. Update faculty profile pages

Faculty profile pages are generated automatically from `app/site-data.ts`.

You do not need to edit a separate page for each faculty member unless you want to change the layout:

- faculty list page: `app/research/page.tsx`
- faculty detail template: `app/research/[slug]/page.tsx`

## 5. Preview locally

Run:

```bash
npm install
npm run dev
```

Then open:

`http://localhost:3000`

## 6. Check production build

Before publishing, run:

```bash
npm run build
```

## 7. Update the server

After uploading your latest project files to the server, run on the server:

```bash
cd /var/www/ssqs/current
./deploy/update-site.sh
```

That script will:

- install dependencies
- rebuild the site
- refresh standalone static assets
- restart the SSQS service
- reload nginx
