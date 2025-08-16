FROM node:20-slim AS react

WORKDIR /client

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

COPY . .

ARG VITE_API_HOST
ARG VITE_API_PORT

RUN npm install vite
RUN npm run build
RUN rm -rf node_modules
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "80"]

EXPOSE 80