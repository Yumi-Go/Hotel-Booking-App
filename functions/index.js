const {initializeApp} = require("firebase-admin/app");

initializeApp();

exports.auth = require("./auth");
exports.firestore = require("./firestore");
exports.hotelAPI = require("./hotelAPI");
exports.format = require("./format");
exports.date = require("./date");


// eslint-disable-next-line max-len
// exports.hotelOffersSearch = onRequest({maxInstances: 10}, async (req, res) => {
//   try {
//     const response = await fetch("https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2024-11-22&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true", {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer qG8cA5JyZadSJhMiUovJa8sHtCmZ",
//       },
//       mode: "cors",
//       catch: "default",
//     });
//     console.log(response.data);
//     res.status(200).send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


// const {logger} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");
// const {initializeApp} = require("firebase-admin/app");
// const {getFirestore} = require("firebase-admin/firestore");

// initializeApp();

// exports.addmessage = onRequest(async (req, res) => {
//   const original = req.query.text;

//   const writeResult = await getFirestore()
//       .collection("messages")
//       .add({original: original});

//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });

// eslint-disable-next-line max-len
// exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
//   const original = event.data.data().original;

//   logger.log("Uppercasing", event.params.documentId, original);

//   const uppercase = original.toUpperCase();

//   return event.data.ref.set({uppercase}, {merge: true});
// });
