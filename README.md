# Bookly Frontend (Next.js 16)

A modern frontend built with Next.js 16 to consume the Bookly REST API. (Work In Progress)

[Live Link](https://bookly-next-frontend.vercel.app/books)

[Symfony Backend Repo](https://github.com/4l1onGit/Bookly)

[Bookly Live Standalone](https://bookly-api-b82d6a0cb81b.herokuapp.com/)

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- ShadCn
- API Routes for backend proxying
- Framer motion

## Project Structure

```
├── app
│   ├── api
│   ├── (auth)
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── (root)
├── components
│   ├── book
│   ├── navbar
│   └── ui
├── components.json
├── eslint.config.mjs
├── lib
│   ├── types.ts
│   └── utils.ts
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
├── README.md
└── tsconfig.json
```

## Setup

```bash
npm i
```

```bash
npm run dev
```

Create a `.env` file:

```
API_URL={bookly_api_url}

```
