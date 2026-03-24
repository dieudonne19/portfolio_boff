FROM node:24-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /app

COPY . .
RUN pnpm build

FROM base AS production
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3333

COPY --from=build /app/build /app
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3333

CMD ["node", "bin/server.js"]
