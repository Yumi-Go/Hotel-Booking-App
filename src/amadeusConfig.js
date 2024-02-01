import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
    clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET
});


amadeus.shopping.hotelOffersSearch
.get({
    hotelIds: 'RTPAR001',
    adults: '2'
})
.then(function(response) {
    console.log(response.data);
}).catch(function(responseError) {
    console.log(responseError.code);
});

export default amadeus;