# WATHBA Landing

Marketing website for **WATHBA** — a fixed-price web design service for small and medium businesses. The site showcases packages, portfolio work, and a contact flow to start a new project.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- React, TypeScript, Tailwind CSS
- [next-intl](https://next-intl.dev) for English and Arabic (RTL)

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Run production server    |
| `npm run lint`  | Run ESLint               |

## Project Structure

- `src/app/[locale]/` — Localized pages (home, start project form)
- `src/components/sections/` — Landing page sections (Hero, Packages, Portfolio, etc.)
- `messages/` — Translation files (`en.json`, `ar.json`)
