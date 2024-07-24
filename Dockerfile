FROM node:21 AS builder

# build
ARG SERVICE_NAME

# install yarn
#RUN npm install -g yarn
RUN yarn --version

WORKDIR /web
COPY . .
RUN yarn install
WORKDIR /web/packages/servant
RUN yarn build
# WORKDIR /web/packages/needer
# RUN yarn build
WORKDIR /web/packages/docs
RUN yarn build
WORKDIR /web/packages/official
RUN yarn build

# run
FROM nginx:latest
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}

COPY --from=builder /web/packages/servant/dist /usr/share/nginx/servant
# COPY --from=builder /web/packages/needer/dist /usr/share/nginx/needer
COPY --from=builder /web/packages/docs/dist /usr/share/nginx/docs
COPY --from=builder /web/packages/official/dist /usr/share/nginx/official
COPY ./nginx.conf /etc/nginx/conf.d/default.conf