
const {onRequest} = require("firebase-functions/v2/https");

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
});
