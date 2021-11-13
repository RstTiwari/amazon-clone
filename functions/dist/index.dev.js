"use strict";

var functions = require("firebase-functions");

var express = require("express");

var cors = require('cors');

var stripe = require('stripe')('sk_test_51Jv0d2SGHfNRxAOBfEMDglfIgd4GqPfzwekGuhtmvlX3PtqZYbBndJpIKSDibCSr2vQbrmerLdARHA3HHZ3iOY7L00EI3hjfzc'); //API
// App config


var app = express(); // Midlewares

app.use(cors({
  origin: true
}));
app.use(express.json()); //API routes

app.get("/", function (request, response) {
  return response.status(200).send("hello world");
});
app.get("/rst", function (request, response) {
  return response.status(200).send("hello rst world");
}); // listen command

exports.api = functions.https.onRequest(app);