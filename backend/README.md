#Anchor Backend

## Prerequisites
- Node.js
- PostgreSQL

## Setup
1. Install Dependencies
    - npm install
2. Create a ".env" file in this folder by copying '.env.example' and filling your values
    - DATABASE_URL: Your PostgreSQL connection string
    - JWT_SECRET: generate one by running: 
      - node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
3. Run Database migrations
    - npx prisma migrate dev
4. Generate Prisma Client
    - npx prisma generate
5. Start the server
    - node server.js

Server runs on http://localhost:3001
