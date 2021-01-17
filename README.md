# coord-pesquisa

Sistema para gerenciamento das coordenações de pesquisa da UFAL

## HOW TO RUN

- Create the **firebase** setup file in `src/firebase-setup.json` according the following example:

```json
{
  "apiKey": "API_KEY",
  "authDomain": "PROJECT_ID.firebaseapp.com",
  "databaseURL": "https://PROJECT_ID.firebaseio.com",
  "projectId": "PROJECT_ID",
  "storageBucket": "PROJECT_ID.appspot.com",
  "messagingSenderId": "SENDER_ID",
  "appId": "APP_ID",
  "measurementId": "G-MEASUREMENT_ID",
};
```

- Install dependencies and start the project:

```shell
$ yarn && yarn start # or "npm install && npm run start"
```
