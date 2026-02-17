FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile || bun install
COPY . .
ARG VITE_API_URL=""
RUN bun run build

FROM beeman/static-server:latest
COPY --from=build /app/dist /workspace/app
ENV SPA=true
