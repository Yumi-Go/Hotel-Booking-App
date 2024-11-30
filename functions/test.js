/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const {onRequest} = require("firebase-functions/v2/https");

let cachedToken = null;
let tokenExpiry = null;


async function fetchToken() {
  const now = new Date();
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    console.log("Using cached token");
    return cachedToken;
  }

  const amadeusClientId = process.env.REACT_APP_AMADEUS_CLIENT_ID;
  const amadeusClientSecret = process.env.REACT_APP_AMADEUS_CLIENT_SECRET;
  const amadeusAuthUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `grant_type=client_credentials&client_id=${amadeusClientId}&client_secret=${amadeusClientSecret}`,
  };

  try {
    const authResponse = await fetch(amadeusAuthUrl, requestOptions);
    if (!authResponse.ok) {
      throw new Error("Failed to fetch token");
    }
    const authData = await authResponse.json();
    cachedToken = authData.access_token;
    tokenExpiry = new Date(now.getTime() + 1800 * 1000); // 30 minutes
    return cachedToken;
  } catch (err) {
    console.error("Error obtaining token:", err);
  }
}


exports.getData = onRequest(async (req, res) => {
  const url = req.query.url; // Assume URL is passed as a query parameter

  try {
    const token = await fetchToken();
    const response = await fetch(url, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    res.json(data); // Send the fetched data as the HTTP response
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});


exports.postData = onRequest(async (req, res) => {
  const {url, requestBodyObj} = req.body;
  try {
    const token = await fetchToken();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(requestBodyObj),
    });
    if (!response.ok) {
      console.error("Failed to post data");
      res.status(500).send("Error posting data");
      return;
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error posting data:", err);
    res.status(500).send("Error posting data");
  }
});


// Hotel List API
exports.getHotelIdByCity = onRequest(async (req, res) => {
  const cityCode = req.query.cityCode;

  if (!cityCode) {
    res.status(400).send("City code is required as a query parameter.");
    return;
  }

  try {
    const token = await fetchToken();
    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch hotel IDs by city code.");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("getHotelIdByCity error:", error);
    res.status(500).send("Failed to fetch hotel IDs by city code.");
  }
});


exports.getHotelIdByName = onRequest(async (req, res) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).send("Hotel name is required as a query parameter.");
    return;
  }

  try {
    const token = await fetchToken();
    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotel?keyword=${name}&subType=HOTEL_LEISURE&subType=HOTEL_GDS&lang=EN&max=20`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch hotel IDs by name.");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("getHotelIdByName error:", error);
    res.status(500).send("Failed to fetch hotel IDs by name.");
  }
});


export async function getIds(name, cityCode) {
  try {
    const result = [];

    if (name.length > 0 && cityCode.length > 0) {
      // Name Search API
      const url =
            "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?" +
            `cityCode=${cityCode}&` +
            "radius=5&" +
            "radiusUnit=KM&" +
            "hotelSource=ALL";

      console.log("Searched result by hotel name and city both");

      const hotelsData = await getData(url);

      console.log("hotelsData: ", hotelsData);

      if (hotelsData && hotelsData.length) {
        // result of below map will be array  e.g. ["TKSXRAHS", "VJPAR00S", ...]
        hotelsData.forEach(async (eachHotel) => {
          if (eachHotel.name.includes(name)) {
            result.push(eachHotel.hotelId);
            // result.push(eachHotel); // to check if the intersection result of cityCode & name is correct
          }
        });
      } else {
        throw new Error(`No hotel data found with Hotel name ${name} in City Code ${cityCode}`);
      }
    } else {
      // Hotel Name Autocomplete API
      if (name.length > 0) {
        const hotelsData = await getHotelIdByName(name);
        console.log("Searched result by hotel name without city (Name Autocomplete): ", hotelsData);
        if (hotelsData && hotelsData.length) {
          hotelsData.forEach(async (eachHotel) => {
            result.push(eachHotel.id);
            // result.push(eachHotel); // to check if the result of name searching is correct
          });
        } else {
          throw new Error(`No hotel data found with Hotel name ${name}`);
        }
      }

      // Hotel List API
      if (cityCode.length > 0) {
        const hotelsData = await getHotelIdByCity(cityCode);
        console.log("Searched result by city without name: ", hotelsData);
        if (hotelsData && hotelsData.length) {
          hotelsData.forEach(async (eachHotel) => {
            result.push(eachHotel.hotelId);
            // result.push(eachHotel); // to check if the result of cityCode searching is correct
          });
        } else {
          throw new Error(`No hotel data found with City Code ${cityCode}`);
        }
      }
    }
    console.log("result in getIds: ", result);
    return result;
  } catch (err) {
    console.error("Error in getIds:", err);
    throw err;
  }
}


export async function searchHotels(name, cityCode, searchConditions) {
  try {
    console.log("received searchCondition: ", searchConditions);
    const ids = await getIds(name, cityCode);
    console.log("ids: ", ids);


    const result = [];

    ids.forEach(async (id) => {
      // Hotel Search API
      const url =
            "https://test.api.amadeus.com/v3/shopping/hotel-offers?" +
            `hotelIds=${id}&` +
            `adults=${searchConditions.adults}&` +
            `checkInDate=${searchConditions.checkInDate}&` +
            `checkOutDate=${searchConditions.checkOutDate}&` +
            `roomQuantity=${searchConditions.roomQuantity}&` +
            `priceRange=${searchConditions.priceRange}&` +
            `currency=${searchConditions.currency}&` +
            "paymentPolicy=NONE&" +
            "bestRateOnly=false";


      const hotelData = await getData(url);
      // console.log("hotelData: ", hotelData);

      let eachHotel = {};
      if (hotelData && hotelData.length) {
        console.log(`data of hotel id ${id}: `, hotelData[0]);
        if (hotelData[0].hotel && hotelData[0].offers) {
          const photoUrls = await getPhotosByHotelName(hotelData[0].hotel.name);
          // console.log("hotelData[0].hotel.hotelId before getRatingsByHotelId: ", hotelData[0].hotel.hotelId);
          const ratings = await getRatingsByHotelId(hotelData[0].hotel.hotelId);
          eachHotel = await {...hotelData[0].hotel, photoUrls: photoUrls, offers: hotelData[0].offers, ratings: ratings};
          console.log("each Hotel with photos: ", eachHotel);
          result.push(eachHotel);
          localStorage.setItem("searchResult", JSON.stringify(result));
        }
      }
      // else {
      //     throw new Error(`No hotel data found in hotel id '${id}'`);
      // }
    });
    console.log("result: ", result);
    return result;
  } catch (err) {
    console.error("Error in searchHotels:", err);
    throw err;
  }
}


// 나중에 테스트 끝나면 export 지우기
export async function getPhotosByHotelName(hotelName) {
  const result = {};
  const apiUrl = "https://places.googleapis.com/v1/places:searchText";
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.photos,places.id", // places.id 추가한거 관련 다른 코드 싹 다 고치기.. photoUrls에 id를 넣던가 등등..
  };
  const body = JSON.stringify({textQuery: hotelName, maxResultCount: 20});

  try {
    const response = await fetch(apiUrl, {method: "POST", body, headers});
    const data = await response.json();
    console.log("data in getPhotosByHotelName: ", data);
    const placeId = Object.values(data.places)[0].id;
    console.log("place Id in getPhotosByHotelName: ", placeId);
    if (data.places && data.places.length > 0 && data.places[0].photos) {
      result[placeId] = await data.places[0].photos.map((photo) =>
        `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`,
      );
    } else {
      throw new Error(`No photos found for hotel: ${hotelName}`);
    }
    // console.log("photo result: ", result);
    return result;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
}


// Hotel Ratings API
export async function getRatingsByHotelId(hotelId) {
  try {
    const url =
        `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${hotelId}`;

    const rawRatings = await getData(url);

    // const result = {};
    if (rawRatings) {
      console.log("rawRatings in getRatingsByHotelId(): ", rawRatings);
      const ratings = await rawRatings.data[0];
      console.log("ratings in getRatingsByHotelId(): ", ratings);
      return ratings;
    } else {
      console.log(`No Ratings data for the hotel ${hotelId}`);
      return `No Ratings data for the hotel ${hotelId}`;
    }
  } catch (err) {
    console.error("Error in getRatingsByHotelId:", err);
    return "Error in Ratings Data";
  }
}


export async function bookingRequest(requestBodyObj) {
  console.log("requestBodyObj in bookingRequest() received from Payment.js: ", requestBodyObj);

  const formattedRequestBodyObj = {data: {...requestBodyObj}};

  console.log("formattedRequestBodyObj: ", formattedRequestBodyObj);
  try {
    const url = "https://test.api.amadeus.com/v1/booking/hotel-bookings";
    const bookingResponse = await postData(url, formattedRequestBodyObj);
    if (bookingResponse) {
      console.log("bookingResponse in bookingRequest(): ", bookingResponse);
      return bookingResponse;
    } else {
      console.log(`No response for the Booking Request of offer ${requestBodyObj.offerId}`);
      return `No response for the Booking Request of offer ${requestBodyObj.offerId}`;
    }
  } catch (err) {
    console.error("Error in bookingRequest:", err);
  }
}
