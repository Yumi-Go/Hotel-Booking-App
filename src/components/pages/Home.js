import styled from "@emotion/styled";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

// search result (single item for each hotel from multiple hotels)
export default function Home({ searchResult, defaultText }) {

  const { currentUser, logOut } = useAuth();

  const navigate = useNavigate();

  const Item = styled(Paper)(() => ({
      backgroundColor: '#dedede',
      padding: '0px',
      margin: '0px',
      height: '300px',
      textAlign: 'center',
  }));
  
  // console.log("searchResult received in Home.js (from App.js): ", searchResult);

  useEffect(() => {
    // console.log("searchResult prop updated in Home:", searchResult);
  }, [searchResult]);

  // // for testing Ratings API.. merge ratings to hotelObj later.. after testing
  // useEffect(() => {
  //     const fetchRatings = async() => {
  //         try {
  //             const ratingsData = await getRatingsByHotelId("TELONMFS"); // replace hard-coded parameter with hotelObj.hote.hotelId later..
  //             if (JSON.stringify(ratingsData) !== JSON.stringify(ratings)) {
  //               setRatings(ratingsData);
  //             }
  //             console.log("ratings in App.js: ", ratingsData);
  //         } catch (error) {
  //             console.error("Failed to fetch ratings:", error);
  //         }
  //     };
  //     fetchRatings();
  // }, []);

  const clickHotel = (hotelObj) => {
    navigate("/hotel-detail", { state: { hotelObj } });
  }

  return (
    <Box sx={{ width: "100%", display:"flex", position: "absolute", justifyContent: 'center'}}>
      <Stack sx={{ width: "90%", alignItems: 'center', bgcolor: '#dedede', margin: 0, padding: 0 }}>
        {/* <Box>
          {
          currentUser ?
          <div>
              <h4>
              Name: {currentUser?.fName} / Email: {currentUser?.email} / User ID: {currentUser?.uid} / Phone Number: {currentUser?.pNum}
              </h4>
              <button onClick={()=>logOut()}>
              Log Out
              </button>
          </div>
          : "No User Logged in"
          }
        </Box> */}
        
        <Box sx={{ width: "95%", my: "20px", bgcolor: "white" }}>
          <Grid container padding="20px" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'left' }}>
          {
          searchResult && searchResult.length > 0 ?
            searchResult.map((hotelObj, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                  <Item onClick={() => clickHotel(hotelObj)} sx={{cursor: 'pointer' }}>
                    <Box sx={{ width: "100%", height: "70%", bgcolor: "pink" }}>
                      <img src={Object.values(hotelObj.photoUrls)[0][0]} alt={`hotel ${index}`} style={{ width: '100%', height: '100%' }} />
                    </Box>
                    <Box
                      sx={{ height: "30%", display:"flex", justifyContent: 'center', padding: '10px', margin: '0px' }}>
                      <h4>{hotelObj.name}</h4>

                    </Box>
                  </Item>
                </Grid>
            ))
            : <div>{searchResult.length === 0 ? (defaultText ? "Hello!" : "No hotel found") : "Loading..."}</div>
            }
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}




//   // harde coded sample data.. for testing. Remove this later
//   // 아마데우스 무료 콜 수 다 찼으면, 일단 clickHotel에 있는 hotelObj에 아래 하드코드된 hotelObj를 대신 넣어서 HotelDetail.js 테스트해야 함. 무료 api call 수 다시 리셋될 때까지. 콜 수 리셋되면 실제 데이터로 해보기!
//   const hotelObj = {
//     "hotel": {
//         "type": "hotel",
//         "hotelId": "MCLONGHM",
//         "chainCode": "MC",
//         "dupeId": "700031300",
//         "name": "JW Marriott Grosvenor House London",
//         "cityCode": "LON",
//         "latitude": 51.50988,
//         "longitude": -0.15509
//     },
//     "photoUrls": {
//         "ChIJZcFL1TMFdkgRZcciwfX0gr0": [
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJYvFOYLl45m-Qi7LG0ms9iWDlqzu9xIlQkaG81EgbQKkseboYBKmWSMAh6zoyNOQ_RbbmRxq1OyaZlzAJthKelWm9B1GdMWsfMxybhbJ-bUv8Hy6IVYpH_so9_WTtN3Jz-BHDASsdxePxZup4E4mi1zigZyjb2-BqXQ/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJb4ngq1cmIeL59XH-muB2nGtttzS1BtmNuK_Di4iUPfnoV6bJ9xzih-qx2pP-nEKBYfmeZE4XiurFYrc8mBygw7P8Tbs2z5O5q1cEqPsfGLk7v-R7R1HDr8lyeBzO_sIPZdiQXeQLyrL2bbM6jhWJSFifj3tZvbpfbF/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJaBP7FhkQbTB9uRwWPAY8hSRJ1oNwUXhzoTKK4YqV4a9byDZihdWBXsCuzQJ0jJHmocovnFTuCxeeGjTcLmW-nM8BCfL_pUkrORlu4fsEFWP5T5NLBEF5Braaan9YIVNhtXAmP8AbalK4lcbcHMVEislP4R7nlK3Ro/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJbpMZzmSesJAhgb64PwU6cfSa6Ez-FJl6aWa_u9t2Otwpond571_HKhV_HfUpYQY2NQkqkh9hNcczai41ouFX6MJ5ljUulaPo-9xgH1G9LsqxF_TUypTSYLpQxKvQ8wKSAIp8vJOfpHuesiN-cE3cxfobD_t-r8c_tT/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJa7-IHw7FAYuvOstodemCpmErc4zbgHezT18II11HQV1sJrUg3_JqC0EUJS-L0FuQSeG-mOPdCGTvwEyZix_QKMmSxu3gxEVqwXypk56jC1oiSkoXLkMOOflzoZgCqNxq7wd2Xjphbn4EIBtMnBaFjNn3Zac2nr4UZk/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJaH7-ftHis1u3pVo5iHSVovq3zXm45Dz62Z_rTJ6YW9WEf9yQA-_PdTVr_NSXyD5HIlxTbnu9OVW7Be50155fykAolb2qaHH93qCclmO4frMoDbWF0L2YObKBP2NTHxIvV1wpTjMr7F145MmDM0NCge1wIrLt2cavr7/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJamCOEUyV-MOLLeglqobz0jEfSvx2Syt_AdH6vjg3IOQMfip6GyFPbEkN5rYFOevB95ik0ASw2b26ecL_r-mYsQ4cPoWnIfXwu0Q8P5iy3tzqfHqljNcatyn4HpzO0pTDFFnqPTsXwT3YkKl92s8QF6IPBsBgLfiums/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJZJNEg4i-lUjHlmmZOQXQk24G2q_zahiTYCKCbivYwtUstJdG27MPd_tSRdc45CZaK0QR3hLSZbetK7yVcZn5Q3YKbaR8-rdW7G7h4_PDKmmLPkhb06KRRGyFIM_9QVxBCVvUg2tAI5D7Kg03uVEAsIsytRgd-URfD9/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJZS-E55dFozo35ulkYZZ_oZ9PelXjXj-JJ95cNpZ5UEC-0LfdbRyEUpNX825FUEzU1w4BCJXic1EkdzvJkF87z5_w8BmpBg2fXYau8B7XoEq-WFZasULWKqLa9GjTYpaH6me1SGkjyGqRVwvmF-RAtJesg2IJCb9q1B/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***",
//           "https://places.googleapis.com/v1/places/ChIJZcFL1TMFdkgRZcciwfX0gr0/photos/ATplDJZ3WsT9tHGPVJhPS1jMyZLWGZLhbPp8dfxKO_r-pqoRAD5v-Nekz_FyyKdFfGa7el40X2U3-1OorDPLSJXr5ncCvD7u-MegC0MfbhFFpNXQ-KdRreMzsK-fiA35UudFFZUI97chc3NJZm69FJHlfG2_Ry508611g3sE/media?maxHeightPx=1000&maxWidthPx=1000&key=***REMOVED***"
//         ]
//     },
//     "offers": [
//         {
//             "id": "S90FE1KGIB",
//             "checkInDate": "2024-11-22",
//             "checkOutDate": "2024-11-23",
//             "rateCode": "RAC",
//             "rateFamilyEstimated": {
//                 "code": "PRO",
//                 "type": "P"
//             },
//             "room": {
//                 "type": "AP7",
//                 "typeEstimated": {
//                     "category": "SUPERIOR_ROOM",
//                     "beds": 1,
//                     "bedType": "DOUBLE"
//                 },
//                 "description": {
//                     "text": "Prepay Non-refundable Non-changeable, prepay in full\nSuperior King Room, 1 King,\n23sqm/247sqft-35sqm/377sqft, Wireless",
//                     "lang": "EN"
//                 }
//             },
//             "guests": {
//                 "adults": 1
//             },
//             "price": {
//                 "currency": "GBP",
//                 "base": "460.00",
//                 "total": "483.00",
//                 "variations": {
//                     "average": {
//                         "base": "460.00"
//                     },
//                     "changes": [
//                         {
//                             "startDate": "2024-11-22",
//                             "endDate": "2024-11-23",
//                             "base": "460.00"
//                         }
//                     ]
//                 }
//             },
//             "policies": {
//                 "cancellations": [
//                     {
//                         "description": {
//                             "text": "NON-REFUNDABLE RATE"
//                         },
//                         "type": "FULL_STAY"
//                     }
//                 ],
//                 "paymentType": "deposit"
//             },
//         }
//     ],
//     "ratings": {}, // 여기 추가하기!!
// };