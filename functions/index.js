// const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");
// const {logger} = require("firebase-functions");
// const admin = require("firebase-admin");

// admin.initializeApp();

// exports.addmessage = onRequest({maxInstances: 10}, async (req, res) => {
//   const original = req.query.text;
//   const writeResult = await admin.firestore()
//       .collection("bookings")
//       .add({original: original});
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });


// // Only this functions is deployed without problem!!!!!!!!!!!!!!!!
// exports.helloWorld = onRequest({maxInstances: 10}, (request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello World!!");
// });


// exports.makeuppercase = onDocumentCreated(
//     "/bookings/{newdocumenttt}", {maxInstances: 10}, (event) => {
//       console.log("Document created: ", event.params.documentId);
//       return null; // Just a test action
//     },
// );


// const {onRequest} = require("firebase-functions/v2/https");
// const Amadeus = require("amadeus");
// const amadeusConfig = process.env;


// const amadeus = new Amadeus({
//   clientId: amadeusConfig.client_id,
//   clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET,
// });

// exports.hotelOffersSearch = onRequest(async (req, res) => {
//   try {
//     const response = await amadeus.shopping.hotelOffersSearch.get({
//       hotelIds: "RTPAR001",
//       adults: "2",
//     });
//     console.log(response.data);
//     res.status(200).send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


// const {onRequest} = require("firebase-functions/v2/https");
// const Amadeus = require("amadeus");

// const amadeus = new Amadeus({
//   clientId: "8MEG3LPspvqB3GoiWYfEibC4N4nZoBOD",
//   clientSecret: "o1bK1JjBi39gIFDW",
// });

// exports.hotelOffersSearch = onRequest(
// {maxInstances: 10}, async (req, res) => {
//   try {
//     const response = await amadeus.shopping.hotelOffersSearch.get({
//       hotelIds: "RTPAR001",
//       adults: "2",
//     });
//     console.log(response.data);
//     res.status(200).send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


const {onRequest} = require("firebase-functions/v2/https");
// const Amadeus = require("amadeus");

// const amadeus = new Amadeus({
//   clientId: "8MEG3LPspvqB3GoiWYfEibC4N4nZoBOD",
//   clientSecret: "o1bK1JjBi39gIFDW",
// });


exports.hotelOffersSearch = onRequest({maxInstances: 10}, async (req, res) => {
  try {
    const response = await fetch("https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2024-11-22&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true", {
      method: "GET",
      headers: {
        Authorization: "Bearer qG8cA5JyZadSJhMiUovJa8sHtCmZ",
      },
      mode: "cors",
      catch: "default",
    });
    console.log(response.data);
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }


//   try {
//     const response = await amadeus.shopping.hotelOffersSearch.get({
//       hotelIds: "MCLONGHM",
//       adults: "1",
//     });
//     console.log(response.data);
//     res.status(200).send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
});
