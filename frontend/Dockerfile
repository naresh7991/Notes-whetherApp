FROM node:22-alpine as Build

WORKDIR /frontend

COPY ./package*.json .

RUN npm ci

COPY . .

RUN npm run Build

FROM nginx:alpine

COPY --from=build /frontend/dist /user/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]