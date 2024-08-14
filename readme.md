
# Game Management System

Game Management API is a backend service for managing games, users, and scores. This project provides RESTful API endpoints for creating, retrieving, updating, and deleting game data, user profiles, and scores.


## API Reference

Link to the Api Documentation : https://documenter.getpostman.com/view/36618671/2sA3s6Dort


## Run Locally

Clone the project

```bash
  git clone git@github.com:itsharshitsaini/game-management.git
```

Go to the project directory

```bash
  cd game-management/
```

Install dependencies

```bash
  npm install
```

Create a .env file in the root directory and paste the environment variables

```bash
  cat .env
```

Start the server

```bash
  node app.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`="zmgBQ0jbNcpryCy"

`DB_URL`="postgresql://postgres.axylkdzkddvszxaizyyg:8$RNnKQU.3cQh5f@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
