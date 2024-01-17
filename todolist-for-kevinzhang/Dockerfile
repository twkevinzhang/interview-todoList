FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app

COPY . .
RUN NODE_OPTIONS=--max-old-space-size=4096 \
    pnpm install \
    pnpm build

FROM base AS prod
WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD ["pnpm", "start:prod"]
