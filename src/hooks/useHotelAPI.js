async function getToken() {

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
        return token;

    } catch (err) {
        console.error("Error in searchRequest:", err);
    }
}



async function getData(token, url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response: ", response);
        let rawData = await response.json();
        rawData = await rawData.data;
        console.log("rawData: ", rawData);
        return rawData;

    } catch (err) {
        console.error("Error in searchRequest:", err);
    }
}

// Hotel List API
async function getHotelIdByCity(token, cityCode) {
    try {
        const url =
        "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?" +
        `cityCode=${cityCode}&` +
        "radius=5&" +
        "radiusUnit=KM&" +
        "hotelSource=ALL";
        
        const hotels = await getData(token, url);

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
async function getHotelIdByName(token, name) {
    try {
        const url = 
        "https://test.api.amadeus.com/v1/reference-data/locations/hotel?" +
        `keyword=${name}&` +
        "subType=HOTEL_LEISURE&" +
        "subType=HOTEL_GDS&" +
        "lang=EN&" +
        "max=20";
        
        const hotels = await getData(token, url);

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



export async function getIds(token, name, cityCode) {


    // Name Autocomplete API에서는 결과값이 20개까지만 나오고, 그 안에서도 뭐가 잘못된 건지 cityCode로 검색한거랑 겹치는게 하나도 없음. (e.g. 'CITADINES'으로 검색했을때 파리에 있는 CITADINES 호텔이 몇개 나옴에도 불구하고 PAR로 cityCode로 얻은 리스트에 존재하는 호텔 아이디가 하나도 발견이 안됨. 둘이 뭔가 문제가 있는듯..)
    // 그래서 방법을 바꿈.. 일단은 Hotel List API만 쓰기로.. 아래처럼..
    // cityCode로 검색 -> 그 결과 리스트 내에서 parameter name값이 포함된 호텔 검색 (e.g. parameter name이 'WESTERN'일때 name: "BEST WESTERN JARDIN DE CLUNY"이 찾아지는 것처럼..) 해서 호텔 아이디 리스트 추리기

    try {
        const url =
        "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?" +
        `cityCode=${cityCode}&` +
        "radius=5&" +
        "radiusUnit=KM&" +
        "hotelSource=ALL";
        
        const hotelsData = await getData(token, url);

        console.log("hotelsData: ", hotelsData);
        
        const result = [];

        if (hotelsData && hotelsData.length) {
            // result of below map will be array  e.g. ["TKSXRAHS", "VJPAR00S", ...]
            hotelsData.forEach(async eachHotel => {
                if (eachHotel.name.includes(name)) {
                    result.push(eachHotel.hotelId);
                    // result.push(eachHotel); // to check if the intersection result of cityCode & name is correct
                }
            });
        }
        else {
            throw new Error(`No hotel data found with Hotel name ${name} in City Code ${cityCode}`);
        }
        console.log("result in getIds: ", result);
        return result;
    } catch (err) {
        console.error("Error in getIds:", err);
        throw err;
    }


    
    // // 원래 방법 2..
    // let idsByNamePromise = name.length > 0 ? await getHotelIdByName(token, name) : Promise.resolve([]);
    // let idsByCityPromise = cityCode.length > 0 ? await getHotelIdByCity(token, cityCode) : Promise.resolve([]);

    // return Promise.all([idsByNamePromise, idsByCityPromise]).then(([idsByName, idsByCity]) => {
    //     let ids = [];
    //     if (idsByName.length > 0 && idsByCity.length > 0) {
    //         console.log("idsByName: ", idsByName);
    //         console.log("idsByCity: ", idsByCity);
    //         // ids = idsByName.filter(id => idsByCity.includes(id));
    //         ids = idsByName.filter(id => {
    //             const isIncluded = idsByCity.includes(id);
    //             console.log(`Checking ${id}: ${isIncluded}`);
    //             return isIncluded;
    //         });
    //     } else if (idsByName.length > 0) {
    //         ids = idsByName;
    //     } else if (idsByCity.length > 0) {
    //         ids = idsByCity;
    //     }
    //     ids = [...new Set(ids)]; // Ensure uniqueness

    //     console.log("ids in getIds: ", ids);
    //     return ids;
    // });


    // // 원래 방법 1..
    // let idsByName = [];
    // let idsByCity = [];
    
    // if (name.length > 0) {
    //     idsByName = await getHotelIdByName(token, name);
    //     // console.log("idsByName: ", idsByName);
    // }
    // if (cityCode.length > 0) {
    //     idsByCity = await getHotelIdByCity(token, cityCode);
    //     // console.log("idsByCity: ", idsByCity);
    // }

    // let ids = [];
    // if (idsByName.length > 0 && idsByCity.length > 0) {
    //     console.log("idsByName: ", idsByName);
    //     console.log("idsByCity: ", idsByCity);

    //     // ids = idsByName.filter(async(id) => idsByCity.includes(id));
    //     ids = idsByName.filter(id => {
    //         const isIncluded = idsByCity.includes(id);
    //         console.log(`Checking ${id}: ${isIncluded}`);
    //         return isIncluded;
    //     }); // for check


    // } else if (idsByName.length > 0) {
    //     ids = idsByName;
    // } else if (idsByCity.length > 0) {
    //     ids = idsByCity;
    // }    
    // ids = [...new Set(ids)];

    // console.log("ids in getIds: ", ids);
    // return ids;
}




// Hotel Search API
// get offers by searchConditions(except for hotel name)
// each hotel with multiple offers
// [{ ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, { ...hotel, photoUrls: [url1, url2..], offers: [{offer1},{offer2}..] }, ...]
export async function searchHotels(name, cityCode, searchConditions) {
    try {
        const token = await getToken(); // get token only once only in this function
        const ids = await getIds(token, name, cityCode);
        // const hotelIds = ids.join("%2C"); // multiple hotels.. seperated by '%2C' like this.. e.g. hotelIds=MCLONGHM%2CHNPARKGU
        // console.log("aggregated hotelIds: ", hotelIds);
        console.log("ids: ", ids);


        // Hotel Search API free request quota 초과해서 현재 status: 429, statusText: "Too Many Requests" 응답이 옴. 매월 정해진 quota라 다음달까지 기다려야할듯.
        // https://developers.amadeus.com/pricing#pricing-list 여기 참고
        // 그 동안 다른 작업 하고있기.
        const result = [];
        ids.forEach(async(id) => {
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

            const hotelData = await getData(token, url);
            console.log("hotelData: ", hotelData);

            let eachHotel = {};
            if (hotelData && hotelData.length) {
                console.log(`data of hotel id ${id}: `, hotelData[0]);
                if (hotelData[0].hotel && hotelData[0].offers) {
                    const photoUrls = await getPhotosByHotelName(hotelData[0].hotel.name);
                    eachHotel = await { ...hotelData[0].hotel, photoUrls: photoUrls, offers: hotelData[0].offers };
                    console.log("each Hotel with photos: ", eachHotel);
                    result.push(eachHotel);
                    localStorage.setItem('searchResult', JSON.stringify(result));

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



