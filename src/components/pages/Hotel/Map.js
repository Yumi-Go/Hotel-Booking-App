import { useEffect } from "react";

export default function Map({ hotelObj }) {
    console.log("Received hotelObj in Map: ", hotelObj);

    // useEffect(() => {
    //     const rooms = () => {
    //         for (const [key, value] of Object.entries(hotelObj.offers[0].room)) {
    //             if (key === "typeEstimated" || key === "description") {
    //                 console.log(`*** ${key}:`);
    //                 for (const [k, v] of Object.entries(value)) {
    //                     console.log(`${k}: ${v}`);
    //                 }
    //             }  
    //         }
    //     };
    //     rooms();
    // }, [hotelObj]);

    return (
        <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_FIREBASE_API_KEY}&q=place_id:${Object.keys(hotelObj.photoUrls)[0]}`}
            style={{ width: "100%", height: "100%", border: "0" }}
            title="map"
            allowFullScreen
        />
    );
}
