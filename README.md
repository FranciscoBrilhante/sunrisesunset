# Sunrite Sunset Assignement

This is an implementation of the Jumpseller assignement using two components

- frontend React client (Vite + React)
- backend API (Ruby on Rails)

## Running with Docker

```bash
  docker compose up -d
```
To run the frontend you will need to set the following environment variables

`VITE_API_HOST`

`VITE_API_PORT`

`RAILS_MASTER_KEY`

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
