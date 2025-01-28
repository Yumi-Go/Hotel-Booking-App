import express from 'express';
import cors from 'cors';
import { https } from 'firebase-functions';

const app = express();
app.use(cors({ origin: 'https://hotel-booking-app-e61c6.web.app' }));
// app.use(cors({ origin: true }));
app.use(express.json());

let cachedToken = null;
let tokenExpiry = null;

// to minimize the number of accessing token
async function getToken() {
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
        console.log("raw data:", rawData);
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



// Hotel List API
async function getHotelsByCity(cityCode) {
    try {
        const url =
            "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?" +
            `cityCode=${cityCode}&` +
            "radius=5&" +
            "radiusUnit=KM&" +
            "hotelSource=ALL";
        
        const hotelObjsArr = await getData(url);
        console.log("hotelObjsArr in getHotelsByCity: ", hotelObjsArr);

        if (!hotelObjsArr || !hotelObjsArr.length) {
            throw new Error(`No hotel data found in City Code ${cityCode}`);
        }
        // result value will be array  e.g. ["TKSXRAHS", "VJPAR00S", ...]
        return hotelObjsArr;
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

    // Name Autocomplete API는 결과값을 20개까지만 보여줘서 여기서 사용하기 적합치 않을뿐더러, 그 20개 안에서도 뭐가 잘못된 건지 cityCode로 검색한거랑 겹치는게 하나도 없음.
    // (e.g. 'CITADINES'으로 검색했을때 파리에 있는 CITADINES 호텔이 몇개 나옴에도 불구하고 PAR로 cityCode로 얻은 리스트에 존재하는 호텔 아이디가 하나도 발견이 안됨. 둘이 뭔가 문제가 있는듯..)
    // 그래서 방법을 바꿈.. 일단은 Hotel List API(getHotelsByCity)만 쓰기로.. 아래처럼..
    // cityCode로 검색 -> 그 결과 리스트 내에서 parameter name값이 포함된 호텔 검색 (e.g. parameter name이 'WESTERN'일때 name: "BEST WESTERN JARDIN DE CLUNY"이 찾아지는 것처럼..) 해서 호텔 아이디 리스트 추리기
    try {
        // result will be array  e.g. ["TKSXRAHS", "VJPAR00S", ...]
        const result = [];
        const hotels = await getHotelsByCity(cityCode);
        console.log("Searched hotels by City (getHotelsByCity) before filtering by Name: ", hotels);
        if (hotels && hotels.length) {
            hotels.forEach(eachHotel => {
                if (eachHotel.name.includes(name)) {
                    result.push(eachHotel.hotelId);
                }
            });
        }
        if (!result.length) {
            throw new Error(`No hotel data found with hotel name "${name}" in city code "${cityCode}"`);
        }
        console.log(`hotelIds with hotel name "${name}" in city code "${cityCode}" from getIds(): ${result}`);
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

        // To avoid async inside forEach
        // async inside forEach does not work as expected because forEach doesn't wait for the async function to complete before moving on to the next iteration.
        // So, Promise.all is used instead.
        const requests = ids.map(async (id) => {
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
                if (hotelData && hotelData.length && hotelData[0].hotel && hotelData[0].offers) {
                    const photoUrls = await getPhotosByHotelName(hotelData[0].hotel.name);
                    const ratings = await getRatingsByHotelId(hotelData[0].hotel.hotelId);
                    // const ratings = await getRatingsByHotelId("TELONMFS"); // test data for ratings
                    const eachHotel = { ...hotelData[0].hotel, photoUrls: photoUrls, offers: hotelData[0].offers, ratings: ratings };
                    console.log("Each hotel with photoUrls & ratings: ", eachHotel);
                    result.push(eachHotel);
                    localStorage.setItem('searchResult', JSON.stringify(result));
                }
            } catch (err) {
                console.error(`Error fetching data for hotel ID ${id}:`, err);
            }
        });
        await Promise.all(requests);
        console.log("result: ", result);
        return result;
    } catch (err) {
        console.error("Error in searchHotels:", err);
        throw err;
    }
}



// 나중에 테스트 끝나면 export 지우기
export async function getPhotosByHotelName(hotelName) {
    const apiUrl = 'https://places.googleapis.com/v1/places:searchText';
    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.photos,places.id" // places.id 추가한거 관련 다른 코드 싹 다 고치기.. photoUrls에 id를 넣던가 등등..
    };
    const body = JSON.stringify({ textQuery: hotelName, maxResultCount: 20 });

    try {
        const response = await fetch(apiUrl, { method: "POST", body, headers });
        const data = await response.json();
        console.log("data in getPhotosByHotelName:", data);
    
        if (!data.places || !Array.isArray(data.places) || data.places.length === 0) {
          throw new Error(`No results found for: ${hotelName}`);
        }
    
        const normalizedHotelName = hotelName.toLowerCase();
    
        let bestPlace = null;
        for (const place of data.places) {
          const placeName = place.displayName?.text?.toLowerCase() || "";
          // If either includes the other, it is considered as a close enough match
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
    
        const placeId = bestPlace.id;
        const photoUrls = bestPlace.photos.map(photo =>
          `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`
        );
    
        const result = { [placeId]: photoUrls };
        console.log("result in getPhotosByHotelName: ", result);
        return result;
    
      } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
      }

}


// Hotel Ratings API
export async function getRatingsByHotelId(hotelId) {
    try {
        const url = `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${hotelId}`;
        const rawRatings = await getData(url);

        // const result = {};
        if (rawRatings) {
            console.log(`rawRatings in getRatingsByHotelId: ${rawRatings}`);
            const ratings = await {...rawRatings[0]};
            console.log(`ratings in getRatingsByHotelId: ${ratings}`);
            return ratings;
        } else {
            console.log(`No Ratings data for the hotel ${hotelId}`);
            return `No Ratings data for the hotel ${hotelId}`;
        }
    } catch (err) {
        console.error("Error in getRatingsByHotelId: ", err);
        return "Error in Ratings Data";
    }
}


export async function bookingRequest(requestBodyObj) {
    console.log("requestBodyObj in bookingRequest() received from Payment.js: ", requestBodyObj);

    const formattedRequestBodyObj = {data: {...requestBodyObj}};

    console.log(`formattedRequestBodyObj ${formattedRequestBodyObj}`);
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


// API route
app.get('/searchHotels', async (req, res) => {
    try {
        const { name, cityCode, searchConditions } = req.query;
        const parsedSearchConditions = JSON.parse(searchConditions);
        const results = await searchHotels(name, cityCode, parsedSearchConditions);
        res.json(results);
    } catch (err) {
        console.error("Error during hotel search:", err);
        // res.status(500).send("Error during hotel search");
        res.status(500).json({ error: "Error during hotel search", details: err.toString() });
    }
});

export const hotelAPIsHandler = https.onRequest(app);
