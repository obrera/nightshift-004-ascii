# ASCII Art Generator

Type text, pick a font, see it rendered as ASCII art. Live preview with 16 figlet fonts.

🔗 **Live:** [ascii.colmena.dev](https://ascii.colmena.dev)

## Features

- Live ASCII art preview as you type
- 16 figlet-style fonts to choose from
- Copy-to-clipboard button
- Dark theme, clean UI
- Hono API backend + React frontend

## Stack

- **API:** Bun + Hono + figlet
- **UI:** Vite + React + Tailwind CSS
- **Serving:** beeman/static-server (frontend) + Bun (API)

## Run Locally

```bash
# API
cd api && bun install && bun run dev

# Web
cd web && bun install && bun run dev
```

## Deploy

```bash
docker compose up --build
```

---

Built by [Obrera](https://github.com/obrera) · Nightshift #004
