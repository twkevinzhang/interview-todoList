FROM node:20.9 AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY . .
RUN pnpm install && \
    pnpx prisma generate && \
    pnpm build

FROM build AS runtime
WORKDIR /app

COPY --from=build /app .
RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start:prod"]
