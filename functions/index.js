const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors')
const stripe = require('stripe')(
    'sk_test_51Jv0d2SGHfNRxAOBfEMDglfIgd4GqPfzwekGuhtmvlX3PtqZYbBndJpIKSDibCSr2vQbrmerLdARHA3HHZ3iOY7L00EI3hjfzc'
)

//API

// App config
const app = express();


// Midlewares
app.use(cors({ origin: true }));
app.use(express.json());


//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.get("/rst", (request, response) => response.status(200).send("hello rst world"));
// listen command
exports.api = functions.https.onRequest(app);



