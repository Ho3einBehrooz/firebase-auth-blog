# Firebase Auth Blog

Blog api with firebase authentication, this app save blog posts into postgres database and also save image posts into your local storage.
</n>

All the database operations(CRUD) implemented by TypeOrm and you can find entity models in the entity directory in project src.

## Installation

```bash
$ npm install
```

## Prerequisites

- Create a database in postgres and put that name into the .env file(**DATABASE_NAME**)
- Fill the database environments in .env file(like: DATABASE_HOST, DATABASE_USERNAME, ...)
- Go to your firebase console and create a new project if you don't have it and navigate to Project Overview → Project Settings → Service Accounts → Generate new private key.
- After you get the json config file from firebase console convert that file content to base64 format and put it into this environment in .env file:
  **FIREBASE_SERVICE_ACCOUNT_BASE64**
- **Optional:** This app save post image into your local storage, so you can change the default directory of that in this env:
  **IMAGESPATH**

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Run with docker

```bash
$ docker-compose up --build -d
```

### Swagger UI address:

http://localhost:3000/docs
</n>
</n>

### Features
This project used firebase authentication and also using role based authorization system with firebase, so you need to create a user with ADMIN privilage in firebase with endpoint "POST http://localhost:3000/users/signup"
</n>

Use this endpoint to generate server token for use it in client apllication: "POST http://localhost:3000/users/signin"
</n>

**Note:** This tools simulate the client application for you to generate the client token to pass it to server as "bearer token" and use the apis, also you can use that token in swagger for testing apis.
</n>

Firebase token generator: https://www.firebasejwt.com/
