FROM node:alpine

# Declaring env
ENV NODE_ENV development

WORKDIR /react-app

COPY ./package.json /react-app
RUN npm install

COPY . .

CMD sh serve.sh