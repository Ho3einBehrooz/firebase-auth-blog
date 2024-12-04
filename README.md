# Firebase Auth Blog

Blog api with firebase authentication

## Installation

```bash
$ npm install
```

## Prerequisites

- Create a database in postgres and put that name into the .env file(DATABASE_NAME)
- Fill the database environments in .env file(like: DATABASE_HOST, DATABASE_USERNAME, ...)
- Go to your firebase console and create a new project if you don't have it and navigate to Project Overview → Project Settings → Service Accounts → Generate new private key.
- After you get the json config file from firebase console convert that file content to base64 format and put it into this environment in .env file:
  FIREBASE_SERVICE_ACCOUNT_BASE64

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Swagger UI address:

http://localhost:3000/docs
</n>
</n>
