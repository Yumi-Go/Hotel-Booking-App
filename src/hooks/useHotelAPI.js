async function getToken(amadeusClientId, amadeusClientSecret) {
    const amadeusAuthUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=client_credentials&client_id=${amadeusClientId}&client_secret=${amadeusClientSecret}`,
    };

    try {
        const authResponse = await fetch(amadeusAuthUrl, requestOptions);
        const data = await authResponse.json();
        console.log("data.access_token:", data.access_token);
        return data.access_token;
    } catch (err) {
        console.error("Error in searchRequest:", err);
    }
}

// Hotel Search API
// get offers by searchConditions(except for hotel name)
// each hotel with multiple offers
// [{ ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, { ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, ...]
export async function getOffers(searchConditions) {

    const token = await getToken(process.env.REACT_APP_AMADEUS_CLIENT_ID, process.env.REACT_APP_AMADEUS_CLIENT_SECRET);
    const hotelId = searchConditions.hotelId.join("%2C"); // multiple hotels.. seperated by '%2C' like this.. e.g. hotelIds=MCLONGHM%2CHNPARKGU
    // console.log("aggregated hotelId: ", hotelId);
    const searchUrl =
    "https://test.api.amadeus.com/v3/shopping/hotel-offers?" +
    `hotelIds=${hotelId}&` +
    `adults=${searchConditions.adults}&` +
    `checkInDate=${searchConditions.checkInDate}&` +
    `checkOutDate=${searchConditions.checkOutDate}&` +
    `roomQuantity=${searchConditions.roomQuantity}&` +
    `priceRange=${searchConditions.priceRange}&` +
    `currency=${searchConditions.currency}&` +
    "paymentPolicy=NONE&" +
    "bestRateOnly=false"

    try {
        const response = await fetch(searchUrl, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const datas = await response.json();
        console.log("datas: ", datas);
        const hotels = datas.data;

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
        console.error("Error in fetchHotelOffers:", err);
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

// Hotel List API
async function getHotelByCity(token, cityName) {

}


