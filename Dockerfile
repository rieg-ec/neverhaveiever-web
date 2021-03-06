# dev stage
FROM node:14.3-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 8080
COPY . .

# build stage
FROM dev AS build
RUN npm run build

# prod stage
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
