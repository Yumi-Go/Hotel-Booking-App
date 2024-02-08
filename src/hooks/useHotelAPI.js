async function getData(url) {

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
        const token = authData.access_token;
        console.log("token:", token);

        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const rawData = await response.json();
        console.log("rawData: ", rawData.data);
        return rawData.data;

    } catch (err) {
        console.error("Error in searchRequest:", err);
    }
}

// Hotel List API
async function getHotelIdByCity(cityCode) {
    try {
        const url =
        "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?" +
        `cityCode=${cityCode}&` +
        "radius=5&" +
        "radiusUnit=KM&" +
        "hotelSource=ALL";
        
        const hotels = await getData(url);

        console.log("hotels: ", hotels);
        const result = [];

        if (hotels && hotels.length) {
            // result of below map will be array  e.g. ["TKSXRAHS", "VJPAR00S", ...]
            hotels.forEach(async eachHotel => {
                result.push(eachHotel.hotelId);
            });
        }
        else {
            throw new Error(`No hotel data found in City Code ${cityCode}`);
        }
        console.log("result in getHotelIdByCity: ", result);
        return result;
    } catch (err) {
        console.error("Error in getHotelIdByCity:", err);
        throw err;
    }
}


// Hotel Name Autocomplete API
async function getHotelIdByName(name) {
    try {
        const url = 
        "https://test.api.amadeus.com/v1/reference-data/locations/hotel?" +
        `keyword=${name}&` +
        "subType=HOTEL_LEISURE&" +
        "subType=HOTEL_GDS&" +
        "lang=EN&" +
        "max=20";
        
        const hotels = await getData(url);

        console.log("hotels: ", hotels);
        const result = [];
        if (hotels && hotels.length) {
            // eachHotel.hotelIds is array (e.g. hotelIds: ["TKSXRAHS"])
            // So, hotels.map(async eachHotel => eachHotel.hotelIds) will be   e.g. [ ["TKSXRAHS"], ["VJPAR00S"], ...]
            // Finally, result of 2nd forEach(= ids.forEach) will be     e.g. ["TKSXRAHS", "VJPAR00S", ...]            
            hotels.forEach(async eachHotel => {
                eachHotel.hotelIds.forEach(id => {
                    // console.log("id: ", id);
                    // console.log("type of id: ", typeof id);
                    result.push(id);
                });
            });
        }
        else {
            throw new Error(`No hotel data found in Name ${name}`);
        }
        console.log("result in getHotelIdByName: ", result);
        return result;
    } catch (err) {
        console.error("Error in getHotelIdByCity:", err);
        throw err;
    }
}



export async function getIds(name, cityCode) {
    
    let idsByName = [];
    let idsByCity = [];
    
    if (name.length > 0) {
        idsByName = await getHotelIdByName(name);
        console.log("idsByName: ", idsByName);
    }
    if (cityCode.length > 0) {
        idsByCity = await getHotelIdByCity(cityCode);
        console.log("idsByCity: ", idsByCity);
    }

    let ids = [];
    if (idsByName.length > 0 && idsByCity.length > 0) {
        ids = idsByName.filter(async(id) => idsByCity.includes(id));
    } else if (idsByName.length > 0) {
        ids = idsByName;
    } else if (idsByCity.length > 0) {
        ids = idsByCity;
    }    
    ids = [...new Set(ids)];

    console.log("ids in getIds: ", ids);
    return ids;
}




// Hotel Search API
// get offers by searchConditions(except for hotel name)
// each hotel with multiple offers
// [{ ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, { ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, ...]
export async function searchHotels(url) {
    try {
        const hotels = await getData(url);

        console.log("hotels: ", hotels);

        if (hotels && hotels.length) {

            const promises = hotels.map(async eachHotel => {
                if (eachHotel.hotel && eachHotel.offers) {
                    const photoUrls = await getPhotosByHotelName(eachHotel.hotel.name);
                    return { ...eachHotel.hotel, photoUrls: photoUrls, offers: eachHotel.offers };
                }
            });
            const result = await Promise.all(promises);
            const filteredResults = result.filter(hotel => hotel !== undefined);
            localStorage.setItem('searchResult', JSON.stringify(filteredResults));
            return filteredResults;
            
        }
        else {
            throw new Error('No hotel data found');
        }
    } catch (err) {
        console.error("Error in searchHotels:", err);
        throw err;
    }
}

async function getPhotosByHotelName(hotelName) {
    let result = [];
    const apiUrl = 'https://places.googleapis.com/v1/places:searchText';
    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.photos"
    };
    const body = JSON.stringify({ textQuery: hotelName });

    try {
        const response = await fetch(apiUrl, { method: "POST", body, headers });
        const data = await response.json();
        // console.log("data in getPhotosByHotelName: ", data);
        if (data.places && data.places.length > 0 && data.places[0].photos) {
            result = await data.places[0].photos.map(photo => 
                `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`
            );
        } else {
            throw new Error(`No photos found for hotel: ${hotelName}`);
        }
        // console.log("photo result: ", result)
        return result;
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
}

