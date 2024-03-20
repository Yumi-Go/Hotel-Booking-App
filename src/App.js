import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Top from './components/header/Top/Top'
import Search from './components/header/Search/Search'
import Home from './components/pages/Home'
import Account from './components/pages/Account';
import BookingHistory from './components/pages/BookingHistory';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthProvider } from './AuthContext';
import { Box } from '@mui/material';
import { searchHotels, getRatingsByHotelId } from './hooks/useHotelAPI';
import HotelDetail from './components/pages/Hotel/HotelDetail';
import { useDate } from './hooks/useDate';
import Booking from './components/pages/Booking/Booking';
import Payment from './components/pages/Booking/Payment';
import LogIn from './components/reusableComponents/LogIn';


export default function App() {
  const [openBooking, setOpenBooking] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [dates, setDates] = useState({
    checkInDate: null,
    checkOutDate: null,
  });
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
  });
  
  const formattedCheckInDate = useDate(dates.checkInDate);
  const formattedCheckOutDate = useDate(dates.checkOutDate);

  useEffect(() => {
    console.log("searchResult updated in App:", searchResult);
  }, [searchResult]);

  useEffect(() => {
    console.log("hotelName updated in App:", hotelName);
  }, [hotelName]);

  useEffect(() => {
    console.log("cityCode updated in App:", cityCode);
  }, [cityCode]);


  useEffect(() => {
    console.log(`dates updated in App: checkIn ${dates.checkInDate}, checkOut ${dates.checkOutDate}`);
    console.log("Formatted checkInDate: ", formattedCheckInDate);
    console.log("Formatted checkOutDate: ", formattedCheckOutDate);
}, [dates, formattedCheckInDate, formattedCheckOutDate]);



  useEffect(() => {
    console.log(`guests updated in App: adults ${guests.adults}, children ${guests.children}`);
  }, [guests]);




  const handleSearch = async() => {
    try {
      const searchConditions = ({
        adults: 2,
        children: 0,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        roomQuantity: 1,
        priceRange: "100-1500",
        currency: "EUR"
      });


      const response = await searchHotels(hotelName, cityCode, searchConditions);
      setSearchResult(response);
      console.log("Updated searchResult in App:", response);
    } catch (error) {
      console.error("Error in handleSearch: ", error);
      setSearchResult([]);
    }
  };



  

  // // harde coded sample data.. for testing. Remove this later
  // // 일단 이거 이용해서 HotelDetail.js 테스트해야 함. 무료 api call 수 다시 리셋될 때까지. 콜 수 리셋되면 실제 데이터로 해보기!
  // const hotelObj = {
  //     "hotel": {
  //       "type": "hotel",
  //       "hotelId": "MCLONGHM",
  //       "chainCode": "MC",
  //       "dupeId": "700031300",
  //       "name": "JW Marriott Grosvenor House London",
  //       "cityCode": "LON",
  //       "latitude": 51.50988,
  //       "longitude": -0.15509
  //     },
  //     "photoUrls": {
  //       "ChIJZcFL1TMFdkgRZcciwfX0gr0": 
  //       [
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJYvFOYLl45m-Qi7LG0ms9iWDlqzu9xIlQkaG81EgbQKkseboYBKmWSMAh6zoyNOQ_RbbmRxq1OyaZlzAJthKelWm9B1GdMWsfMxybhbJ-bUv8Hy6IVYpH_so9_WTtN3Jz-BHDASsdxePxZup4E4mi1zigZyjb2-BqXQ/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJb4ngq1cmIeL59XH-muB2nGtttzS1BtmNuK_Di4iUPfnoV6bJ9xzih-qx2pP-nEKBYfmeZE4XiurFYrc8mBygw7P8Tbs2z5O5q1cEqPsfGLk7v-R7R1HDr8lyeBzO_sIPZdiQXeQLyrL2bbM6jhWJSFifj3tZvbpfbF/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJaBP7FhkQbTB9uRwWPAY8hSRJ1oNwUXhzoTKK4YqV4a9byDZihdWBXsCuzQJ0jJHmocovnFTuCxeeGjTcLmW-nM8BCfL_pUkrORlu4fsEFWP5T5NLBEF5Braaan9YIVNhtXAmP8AbalK4lcbcHMVEislP4R7nlK3Ro/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJbpMZzmSesJAhgb64PwU6cfSa6Ez-FJl6aWa_u9t2Otwpond571_HKhV_HfUpYQY2NQkqkh9hNcczai41ouFX6MJ5ljUulaPo-9xgH1G9LsqxF_TUypTSYLpQxKvQ8wKSAIp8vJOfpHuesiN-cE3cxfobD_t-r8c_tT/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJa7-IHw7FAYuvOstodemCpmErc4zbgHezT18II11HQV1sJrUg3_JqC0EUJS-L0FuQSeG-mOPdCGTvwEyZix_QKMmSxu3gxEVqwXypk56jC1oiSkoXLkMOOflzoZgCqNxq7wd2Xjphbn4EIBtMnBaFjNn3Zac2nr4UZk/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJaH7-ftHis1u3pVo5iHSVovq3zXm45Dz62Z_rTJ6YW9WEf9yQA-_PdTVr_NSXyD5HIlxTbnu9OVW7Be50155fykAolb2qaHH93qCclmO4frMoDbWF0L2YObKBP2NTHxIvV1wpTjMr7F145MmDM0NCge1wIrLt2cavr7/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJamCOEUyV-MOLLeglqobz0jEfSvx2Syt_AdH6vjg3IOQMfip6GyFPbEkN5rYFOevB95ik0ASw2b26ecL_r-mYsQ4cPoWnIfXwu0Q8P5iy3tzqfHqljNcatyn4HpzO0pTDFFnqPTsXwT3YkKl92s8QF6IPBsBgLfiums/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJZJNEg4i-lUjHlmmZOQXQk24G2q_zahiTYCKCbivYwtUstJdG27MPd_tSRdc45CZaK0QR3hLSZbetK7yVcZn5Q3YKbaR8-rdW7G7h4_PDKmmLPkhb06KRRGyFIM_9QVxBCVvUg2tAI5D7Kg03uVEAsIsytRgd-URfD9/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJZS-E55dFozo35ulkYZZ_oZ9PelXjXj-JJ95cNpZ5UEC-0LfdbRyEUpNX825FUEzU1w4BCJXic1EkdzvJkF87z5_w8BmpBg2fXYau8B7XoEq-WFZasULWKqLa9GjTYpaH6me1SGkjyGqRVwvmF-RAtJesg2IJCb9q1B/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
  //         "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJZ3WsT9tHGPVJhPS1jMyZLWGZLhbPp8dfxKO_r-pqoRAD5v-Nekz_FyyKdFfGa7el40X2U3-1OorDPLSJXr5ncCvD7u-MegC0MfbhFFpNXQ-KdRreMzsK-fiA35UudFFZUI97chc3NJZm69FJHlfG2_Ry508611g3sE/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***"
  //       ]
  //     },
  //     "offers": [
  //       {
  //         "id": "S90FE1KGIB",
  //         "checkInDate": "2024-11-22",
  //         "checkOutDate": "2024-11-23",
  //         "rateCode": "RAC",
  //         "rateFamilyEstimated": {
  //           "code": "PRO",
  //           "type": "P"
  //         },
  //         "room": {
  //           "type": "AP7",
  //           "typeEstimated": {
  //             "category": "SUPERIOR_ROOM",
  //             "beds": 1,
  //             "bedType": "DOUBLE"
  //           },
  //           "description": {
  //             "text": "Prepay Non-refundable Non-changeable, prepay in full\nSuperior King Room, 1 King,\n23sqm/247sqft-35sqm/377sqft, Wireless",
  //             "lang": "EN"
  //           }
  //         },
  //         "guests": {
  //           "adults": 1
  //         },
  //         "price": {
  //           "currency": "GBP",
  //           "base": "460.00",
  //           "total": "483.00",
  //           "variations": {
  //             "average": {
  //               "base": "460.00"
  //             },
  //             "changes": [
  //               {
  //                 "startDate": "2024-11-22",
  //                 "endDate": "2024-11-23",
  //                 "base": "460.00"
  //               }
  //             ]
  //           }
  //         },
  //         "policies": {
  //           "cancellations": [
  //             {
  //               "description": {
  //                 "text": "NON-REFUNDABLE RATE"
  //               },
  //               "type": "FULL_STAY"
  //             }
  //           ],
  //           "paymentType": "deposit"
  //         },
  //       }
  //     ],
  // };


  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className="App">
            <Top />
            <Search
              onSearch={handleSearch}
              setHotelName={setHotelName}
              setCityCode={setCityCode}
              dates={dates}
              setDates={setDates}
              guests={guests}
              setGuests={setGuests}
            />
            <Routes>
              <Route path="/" element={<Home searchResult={searchResult} />} />

              {/* have to think about what will be displayed if user input "/hotel" directly without clicking a specific hotel from search result in Home */}
              <Route path="/hotel-detail" element={<HotelDetail />} />

              {/* {openBooking ?
              <Route path="/" element={<Booking />} /> 
              : <Route path="/" element={<Home searchResult={searchResult} />} />
              } */}

              <Route path="/booking" element={<Booking />} />
              <Route path="/payment" element={<Payment />} />


              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/history" element={<BookingHistory />} />
            </Routes>
          </Box>
      </LocalizationProvider>
    </AuthProvider>
  );
}
