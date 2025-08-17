# Sunrise Sunset Assignment

This is an implementation of the Jumpseller assignment using two components

- frontend React client (Vite + React)
- backend API (Ruby on Rails)

## Running with Docker

```bash
  docker compose up -d
```
To run the assignment you will need to set the following environment variables.

In a real application, `RAILS_MASTER_KEY` should not be exposed like done here 😉.

```bash
  VITE_API_HOST=127.0.0.1
  VITE_API_PORT=4000
  RAILS_MASTER_KEY=0b30adb6f45042e69dbd3580b37f8531
```

> **_NOTE:_**  I had some issues with git adding CRLF line breaks to some scripts preventing the app from running. Make sure `/backend/bin/thrust`, `/backend/bin/ruby`, `/backend/bin/rake` and `/backend/bin/docker-entrypoint` end with LF.

## Running Locally

### Running backend

Install dependencies

```bash
  bundle install
```

Bootstrap database

```bash
  rails db:reset
```

Run dev server

```bash
  rails server -p 4000
```

### Running frontend

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run start
```

#### Environment Variables

To run the frontend you will need to add the following variables to either your .env file or environment

`VITE_API_HOST`

`VITE_API_PORT`
