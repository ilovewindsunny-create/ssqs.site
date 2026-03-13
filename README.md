# SSQS Website

Source repository for the SSQS lab website.

- Site: `http://111.230.186.141`
- GitHub: `https://github.com/ilovewindsunny-create/ssqs.site.git`

## Project

SSQS stands for `Solid-State Quantum Storage Laboratory`.

This project is built with `Next.js` and contains the public website for the lab, including:

- home page
- research page
- research team page
- faculty profile pages
- join us page

## Key Files

- `app/site-data.ts`
  Main content data for faculty, students, papers, and platforms.
- `app/page.tsx`
  Home page.
- `app/research/page.tsx`
  Research page.
- `app/research-team/page.tsx`
  Research team page.
- `app/research-team/[slug]/page.tsx`
  Faculty profile pages.
- `app/globals.css`
  Global styles.

## Assets

- `public/assets/faculty`
  Faculty portraits.
- `public/assets/lab`
  Lab photos.
- `public/assets/papers`
  Publication figures.
- `gmail.txt`
  Email reference file.

## Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

## Build Check

Run before publishing:

```bash
npm run build
```

## Content Updates

Most routine content updates happen in:

- `app/site-data.ts`

Use this file to update:

- faculty profiles
- student information
- current students
- alumni students
- publications
- source links
- research platform text

Use `app/globals.css` for layout and typography changes.

Replace images in:

- `public/assets/faculty`
- `public/assets/lab`
- `public/assets/papers`

## Student Sections

- Current students are maintained in `currentStudents`
- Graduated students are maintained in `alumniStudents`

You can add alumni photos, schools, destinations, and summaries later in `app/site-data.ts`.

## Deployment

Push to GitHub:

```bash
git push origin main
```

Deploy to the production server:

```bash
git push production main
```

The `production` remote triggers the server-side deployment hook and updates the live site automatically.

## Recommended Workflow

```bash
git add .
git commit -m "update site"
git push origin main
git push production main
```
