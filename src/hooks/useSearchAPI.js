    // each hotel with multiple offers
    // [ { hotel(+photos) }, [ {offer 1}, {offer 2}, {offer 3}, ... ] ]


    export default async function searchRequest(searchConditions) {
        // const amadeusClientId = process.env.REACT_APP_AMADEUS_CLIENT_ID;
        // const amadeusClientSecret = process.env.REACT_APP_AMADEUS_CLIENT_SECRET;
        const token = await getToken(process.env.REACT_APP_AMADEUS_CLIENT_ID, process.env.REACT_APP_AMADEUS_CLIENT_SECRET);
        const searchResult = await getOffers(token, searchConditions);
        console.log("searchResult in hook: ", searchResult);
        return searchResult;
        // return await searchHotelOffers(token, searchConditions);
    }



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

    // get offers by searchConditions(except for name)
    async function getOffers(token, searchConditions) {
        // const hotelOffersUrl = "https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2024-11-22&roomQuantity=1";
        // const searchRequest = "https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=2&checkInDate=2024-04-22&checkOutDate=2024-04-24&roomQuantity=1&priceRange=100-800&currency=EUR&paymentPolicy=NONE&bestRateOnly=true"
        
        const searchUrl =
        "https://test.api.amadeus.com/v3/shopping/hotel-offers?" +
        `hotelIds=${searchConditions.hotelId}&` +
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

            if (datas.data && datas.data.length) {
                let result = []; // [ { hotel(+photos) }, [ {offer 1}, {offer 2}, {offer 3}, ... ] ]
                console.log("Hotel data:", datas.data[0]);
                if (datas.data[0].hotel) {
                    const hotel = { ...datas.data[0].hotel, photoUrls: await getPhotosByHotelName(datas.data[0].hotel.name) };
                    console.log("hotel obj with photoUrls: ", hotel);
                    result.push(hotel);
                }
                if (datas.data[0].offers) {
                    result.push(datas.data[0].offers);
                }
                console.log("result of getOffers: ", result);
                return result;
            } else {
                throw new Error('No hotel data found');
            }

            // if (datas.data && datas.data.length) {
            //     let offerWithHotel = [];

            //     console.log("Hotel data:", datas.data[0]);
            //     if (datas.data[0].hotel) {
            //         const photoUrls = await getPhotosByHotelName(datas.data[0].hotel.name);
            //         offerWithHotel = { ...datas.data[0].hotel, photoUrls };
            //     }
            //     if (datas.data[0].offers) {
            //         offerWithHotel = { ...offerWithHotel, ...datas.data[0].offers };
            //     }
            //     // searchResult.push(offerWithHotel);
            //     return offerWithHotel;
            // } else {
            //     throw new Error('No hotel data found');
            // }
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
    
            if (data.places && data.places.length > 0 && data.places[0].photos) {
                result = data.places[0].photos.map(photo => 
                    `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`
                );
                // console.log("photo urls list by hotel name: ", result);
            } else {
                throw new Error('No photos found');
            }
            return result;
        } catch (error) {
            console.error("Error fetching photos:", error);
            throw error;
        }
    }

