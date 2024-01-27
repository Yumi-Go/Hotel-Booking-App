import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    // clientId: process.env.AMADEUS_CLIENT_ID,
    // clientSecret: process.env.AMADEUS_CLIENT_SECRET
    clientId: "8MEG3LPspvqB3GoiWYfEibC4N4nZoBOD",
    clientSecret: "o1bK1JjBi39gIFDW"
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