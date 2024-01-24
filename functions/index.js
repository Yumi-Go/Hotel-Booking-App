/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");

// eslint-disable-next-line object-curly-spacing
exports.helloWorld = functions.runWith({ maxInstances: 10 })
    .https.onRequest((request, response) => {
      logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    });


// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
