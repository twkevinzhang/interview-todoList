FROM node:20.9 AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG NEXT_PUBLIC_GRAPHQL_ENTRYPOINT
RUN corepack enable
WORKDIR /app

COPY . .
RUN NODE_OPTIONS=--max-old-space-size=4096 && \
    pnpm install && \
    NEXT_PUBLIC_GRAPHQL_ENTRYPOINT=$NEXT_PUBLIC_GRAPHQL_ENTRYPOINT pnpm build

FROM node:20.9-slim AS runtime
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

COPY --from=build /app .
RUN pnpm install --prod

EXPOSE 4000

CMD ["pnpm", "start"]
