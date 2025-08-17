# Sunrite Sunset Assignement (backend)

This is the backend component of the Jumpseller assignement

## Running Locally

Install dependencies

```bash
  bundle install
```

Bootstrap database and populate City table with dataset in /db/worldcities by running /db/seeds.rb

```bash
  rails db:reset
```

Run the development server
```bash
  rails server -p 4000
```

## Running with Docker


```bash
  docker build -t backend  .
  docker run -d -p 4000:80 -e RAILS_MASTER_KEY=<your_key> --name backend backend```
