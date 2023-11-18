# JP FlashCards API
> AWS Lambda API for JP Flashcards

# Install

```sh
$ npm install
```

Then install the required DynamoDB local with the following command

```sh
$ npm run dynamodb-local
```

# Run serverless app locally

```sh
$ npm start
```

This will start a local version of the app using Serverless and Express.

# Invoke a function locally

For invoking the API locally, you can either make a REST API call, or make use of
`serverless invoke local`.

To test a specific API endpoint, make use of the `npm run invoke` script followed
by the `test-data` filename.

Eg.

```sh
$ npm run invoke --filename=auth-success.json
```

This script will invoke the Serverless function and send a POST request against the
`/auth` endpoint providing a `username` and `password` in the request payload.

The `auth-success.json` file lives inside the `test-data` folder. You can create
new files here and invoke your function using the same `npm run invoke` script followed
by your JSON filename.

The `npm run invoke` script will also watch for file changes in the function
TypeScript file, and automatically fire a new request when this changes.