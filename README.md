# expressjs-typescript-boilerplate

this is a boilerplate to get a expressjs backend following clear architecture using typescript

To create a project, simply run:

steps to run the project

1. first clone the repo
2. run "npm install" to get all dependencies
3. create a .env and fill it based on the .env.template (for NODE_ENV choose either "development" or "production")
4. run "docker compose up -d" to get the db running locally (if using local db)
5. migrate the data base with prisma using

```bash
npx prisma migrate dev --name init
```

6. run "npm run dev" to start the project in development

to use the project documentation "NODE_DEV" has to be set to "development"
