import express from 'express';
import cors from 'cors';

const hotelAPIsApp = express();
hotelAPIsApp.use(cors({
    origin: [/^http:\/\/localhost:\d+$/, 'https://hotel-booking-app-e61c6.web.app']
}));
  
// app.use(cors({ origin: true }));
hotelAPIsApp.use(express.json());

let cachedToken = null;
let tokenExpiry = null;

// to minimize the number of accessing token
async function getToken() {
    const now = new Date();
    if (cachedToken && tokenExpiry && now < tokenExpiry) {
        console.log("Using cached token");
        return cachedToken;
    }
  
    const amadeusClientId = process.env.AMADEUS_CLIENT_ID;
    const amadeusClientSecret = process.env.AMADEUS_CLIENT_SECRET;
    const amadeusAuthUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=client_credentials&client_id=${amadeusClientId}&client_secret=${amadeusClientSecret}`,
    };
  
    try {
        const authResponse = await fetch(amadeusAuthUrl, requestOptions);
        const authData = await authResponse.json();
        cachedToken = authData.access_token;
        
        // Test environment tokens valid for 30 minutes
        tokenExpiry = new Date(now.getTime() + 1800 * 1000);
        console.log("Token refreshed:", cachedToken.slice(0, 10), "...");
        
        return cachedToken;
    } catch (err) {
        console.error("Error obtaining token:", err);
        throw err;
    }
}


async function getData(url) {
    const token = await getToken();
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const rawData = await response.json();
        console.log("raw data in getData():", rawData);
        return rawData.data;
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
    }
}


async function postData(url, requestBodyObj) {
    const token = await getToken();
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBodyObj),
        });
        const rawData = await response.json();
        console.log("POST response:", rawData);
        return rawData;
    } catch (err) {
        console.error("Error posting data:", err);
        throw err;
    }
}

// Get IATA code for a city
async function getIataCode(cityInput) {
    try {
        const url =
            "https://test.api.amadeus.com/v1/reference-data/locations?" +
            `keyword=${encodeURIComponent(cityInput)}&subType=CITY`;
        const iataData = await getData(url); 
        if (iataData && iataData.length > 0) {
            const iata = iataData[0].iataCode; // e.g. "PAR"
            console.log(`Converted "${cityInput}" to IATA code: ${iata}`);
            return iata;
        }
        throw new Error(`No IATA code found for ${cityInput}`);
    } catch (err) {
        console.error("Error converting city to IATA code:", err);
        return cityInput;
    }
}

// Hotel List API
async function getHotelsByCity(cityCode) {
    try {
        const url =
            "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?" +
            `cityCode=${cityCode}&` +
            "radius=5&" +
            "radiusUnit=KM&" +
            "hotelSource=ALL";
        
        const response = await getData(url);
        console.log("response in getHotelsByCity: ", response);

        if (!response || !response.length) {
            throw new Error(`No hotel data found in City Code ${cityCode}`);
        }
        // result value will be array  e.g. ["TKSXRAHS", "VJPAR00S", ...]
        return response;
    } catch (err) {
        console.error("Error in getHotelsByCity:", err);
        throw err;
    }
}

// // Hotel Name Autocomplete API (up to 20 hotels).. Leave this for later just in case
// async function getHotelsByName(name) {
//     try {
//         const url = 
//             "https://test.api.amadeus.com/v1/reference-data/locations/hotel?" +
//             `keyword=${name}&` +
//             "subType=HOTEL_LEISURE&" +
//             "subType=HOTEL_GDS&" +
//             "lang=EN&" +
//             "max=20";
        
//         const hotelObjsArr = await getData(url);
//         console.log("hotelObjsArr in getHotelsByName: ", hotelObjsArr);

//         if (!hotelObjsArr || !hotelObjsArr.length) {
//             throw new Error(`No hotel data found in Name ${name}`);
//         }        
//         return hotelObjsArr;
//     } catch (err) {
//         console.error("Error in getHotelsByCity:", err);
//         throw err;
//     }
// }



// name can be "" (empty string), but cityCode must be non-empty string
// (This should've been restricted in the front-end..)
export async function getIds(name, cityCode) {
  // Search by cityCode -> filter hotel IDs by name keyword
  try {
    // result will be array  e.g. ["TKSXRAHS", "VJPAR00S", ...]
    const result = [];
    const hotels = await getHotelsByCity(cityCode);
    console.log(
      "Searched hotels by City (getHotelsByCity) before filtering by Name: ",
      hotels
    );
    if (hotels && hotels.length) {
      hotels.forEach((eachHotel) => {
        if (eachHotel.name.includes(name)) {
          result.push(eachHotel.hotelId);
        }
      });
    }
    if (!result.length) {
      throw new Error(
        `No hotel data found with hotel name "${name}" in city code "${cityCode}"`
      );
    }
    console.log(
      `hotelIds with hotel name "${name}" in city code "${cityCode}" from getIds(): ${result}`
    );
    return result;
  } catch (err) {
    console.error("Error in getIds:", err);
    throw err;
  }
}


// Hotel Search API
// get offers by searchConditions(except for hotel name)
// each hotel with multiple offers
// [{ ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, { ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, ...]
export async function searchHotels(name, cityCode, searchConditions) { // name can be "" (empty string), but cityCode must be non-empty string (This should've been restricted in the front-end..)
    try {
        console.log("searchCondition in searchHotels (from App.js): ", searchConditions);
        const ids = await getIds(name, cityCode);
        // const hotelIds = ids.join("%2C"); // multiple hotels.. seperated by '%2C' like this.. e.g. hotelIds=MCLONGHM%2CHNPARKGU
        // console.log("aggregated hotelIds: ", hotelIds);
        console.log("ids: ", ids);

        const result = [];

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        for (const id of ids) {
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

            try {
                const hotelData = await getData(url);
                console.log("hotelData in searchHotels:", hotelData);
                if (hotelData && hotelData.length && hotelData[0].hotel && hotelData[0].offers) {
                    const photoUrls = await getPhotosByHotelName(hotelData[0].hotel.name);
                    const ratings = await getRatingsByHotelId(hotelData[0].hotel.hotelId);
                    // const ratings = await getRatingsByHotelId("TELONMFS"); // test data for ratings
                    const eachHotel = { ...hotelData[0].hotel, photoUrls: photoUrls, offers: hotelData[0].offers, ratings: ratings };
                    console.log("Each hotel with photoUrls & ratings: ", eachHotel);
                    result.push(eachHotel);
                    // localStorage.setItem('searchResult', JSON.stringify(result));
                }
            } catch (err) {
                console.error(`Error fetching data for hotel ID ${id}:`, err);
            }
            await delay(1000); // Wait 1 second between requests
        }
        console.log("result: ", result);
        return result;
    } catch (err) {
        console.error("Error in searchHotels:", err);
        throw err;
    }
}


export async function getPhotosByHotelName(hotelName) {
    // Google Places API - Text Search (New)
    const apiUrl = 'https://places.googleapis.com/v1/places:searchText';
    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.photos,places.id" // places.id 추가한거 관련 다른 코드 싹 다 고치기.. photoUrls에 id를 넣던가 등등..
    };
    const body = JSON.stringify({ textQuery: hotelName, maxResultCount: 20 });
    let bestPlace = null;
    try {
        const response = await fetch(apiUrl, { method: "POST", body, headers });
        const data = await response.json();
        if (!data.places || !Array.isArray(data.places) || data.places.length === 0) {
          throw new Error(`No results found for: ${hotelName}`);
        }
        const normalizedHotelName = hotelName.toLowerCase();
        for (const place of data.places) {
          const placeName = place.displayName?.text?.toLowerCase() || "";
          if (
            placeName.includes(normalizedHotelName) ||
            normalizedHotelName.includes(placeName)
          ) {
            bestPlace = place;
            break;
          }
        }
        if (!bestPlace) {
          bestPlace = data.places[0];
          console.warn(
            `No partial match for "${hotelName}". Using the first place result: "${bestPlace.displayName?.text}"`
          );
        }
        if (!bestPlace.photos) {
          throw new Error(`No photos found for: ${bestPlace.displayName?.text}`);
        }
        // Google Places API - Place Photo (New)
        const photoUrls = bestPlace.photos.map(photo =>
          `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`
        );
        const result = { [bestPlace.id]: photoUrls };
        return result;
      } catch (error) {
        console.error("Error fetching photos:", error);
        return { [bestPlace.id]: "../public/no_image.png" };
      }
}


// Hotel Ratings API
export async function getRatingsByHotelId(hotelId) {
    try {
        console.log("hotelId in getRatingsByHotelId:", hotelId);
        // const url = `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${hotelId}`;
        const url = `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=TELONMFS`; // test data
        const rawRatings = await getData(url);
        console.log("rawRatings in getRatingsByHotelId:", rawRatings);

        if (rawRatings && rawRatings.length > 0) {
            const ratings = {...rawRatings[0]};
            console.log(`ratings in getRatingsByHotelId:`, ratings);
            return ratings;
        } else {
            console.log(`No Ratings data for the hotel ${hotelId}`);
            return {
                overallRating: 0,
                numberOfReviews: 0,
                numberOfRatings: 0,
                sentiments: {
                    "Cleanliness": 0,
                    "Comfort": 0,
                    "Location": 0,
                    "Facilities": 0,
                    "Staff": 0,
                    "Value for money": 0
                }
            };
        }
    } catch (err) {
        console.error("Error in getRatingsByHotelId: ", err);
        return {
            overallRating: 0,
            numberOfReviews: 0,
            numberOfRatings: 0,
            sentiments: {
                "Cleanliness": 0,
                "Comfort": 0,
                "Location": 0,
                "Facilities": 0,
                "Staff": 0,
                "Value for money": 0
            }
        };
    }
}


export async function bookingRequest(requestBodyObj) {
    console.log("requestBodyObj in bookingRequest() received from Payment.js: ", requestBodyObj);

    const formattedRequestBodyObj = {data: {...requestBodyObj}};

    // console.log(`formattedRequestBodyObj ${formattedRequestBodyObj}`);
    try {
        const url = 'https://test.api.amadeus.com/v1/booking/hotel-bookings';
        const bookingResponse = await postData(url, formattedRequestBodyObj);
        if (bookingResponse) {
            console.log(`bookingResponse in bookingRequest(): ${bookingResponse}`);
            return bookingResponse;
        } else {
            console.log(`No response for the Booking Request of offer ${requestBodyObj.offerId}`);
            return `No response for the Booking Request of offer ${requestBodyObj.offerId}`;
        }
    } catch (err) {
        console.error("Error in bookingRequest:", err);
    }
}


// API route for searchHotels()
hotelAPIsApp.get('/searchHotels', async (req, res) => {
    try {
        const { name, cityCode, searchConditions } = req.query;
        const parsedSearchConditions = JSON.parse(searchConditions);
        const newCityCode = await getIataCode(cityCode);
        const results = await searchHotels(name, newCityCode, parsedSearchConditions);
        res.json(results);
    } catch (err) {
        console.error("Error in Hotel Search:", err);
        // res.status(500).send("Error during hotel search");
        res.status(500).json({ error: "Hotel Search Failed", details: err.toString() });
    }
});

// API route for bookingRequest()
hotelAPIsApp.post('/bookingRequest', async (req, res) => {
    try {
      const requestBodyObj = req.body;
      console.log("requestBodyObj in /bookingRequest route:", requestBodyObj);  
      const bookingResponse = await bookingRequest(requestBodyObj);  
      return res.json(bookingResponse || {});
    } catch (err) {
      console.error("Error in Booking Request:", err);
      return res.status(500).json({ error: "Booking Request Failed", details: err.toString() });
    }
  });
  

export default hotelAPIsApp;
