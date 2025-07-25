FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache git

COPY package.json yarn.lock ./
COPY .yarnrc.docker.yml ./.yarnrc.yml
COPY .yarn/ ./.yarn/
RUN yarn install --immutable

COPY . .

ARG NEXT_PUBLIC_ROOT_URL
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_ALGOLIA_APP_ID
ARG NEXT_PUBLIC_ALGOLIA_APP_ID_KEY
ARG NEXT_PUBLIC_ALGOLIA_INDEX_NAME

ENV NEXT_PUBLIC_ROOT_URL=$NEXT_PUBLIC_ROOT_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=$NEXT_PUBLIC_ALGOLIA_APP_ID
ENV NEXT_PUBLIC_ALGOLIA_APP_ID_KEY=$NEXT_PUBLIC_ALGOLIA_APP_ID_KEY
ENV NEXT_PUBLIC_ALGOLIA_INDEX_NAME=$NEXT_PUBLIC_ALGOLIA_INDEX_NAME

RUN yarn build

FROM node:22-alpine AS production
WORKDIR /app

COPY --from=base /app/package.json /app/yarn.lock /app/.yarnrc.yml ./
COPY --from=base /app/node_modules/ ./node_modules/
COPY --from=base /app/.yarn/ ./.yarn/
COPY --from=base /app/.next/ ./.next/
COPY --from=base /app/public/ ./public/
COPY --from=base /app/pages/ ./pages/

EXPOSE 3000

CMD ["yarn", "start"]
