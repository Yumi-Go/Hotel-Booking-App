import firebaseConfig from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";




export default function useFirestore() {

    const { auth, db } = firebaseConfig;

    async function addUser(uid, email) {
        console.log("this is addUser function");
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("existing user");
        } else {
            console.log("new user");
            await setDoc(docRef, {
                email: email,
                fName: "",
                mName: "",
                lName: "",
                address: "",
                pNum: "",
                bookings: []
            });
            console.log("User added!");
            window.location.reload();
        }
    }

    async function updateUserInfo(newFName, newMName, newLName, newAddress, newPnum) {
        if (!auth.currentUser) {
            console.error("No user logged in.");
            return;
        }
        const toLowerCaseIfPresent = (value) => value ? value.toLowerCase() : value;
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
            fName: toLowerCaseIfPresent(newFName),
            mName: toLowerCaseIfPresent(newMName),
            lName: toLowerCaseIfPresent(newLName),
            address: newAddress,
            pNum: newPnum,
        });
    }



    // const bookingRequestResult = {
    //     "data": [{
    //         "type": "hotel-booking",
    //         "id": "XD_8138319951754",
    //         "providerConfirmationId": "8138319951754",
    //         "associatedRecords": [{
    //             "reference": "QVH2BX",
    //             "originSystemCode": "GDS"
    //         }]
    //     }]
    // }
    async function addBooking(bookingResponseId, hotelObj, offerObj, paymentObj, nonMemberPwd) {
        if (!hotelObj) {
            console.error("Hotel object is missing");
            return;
        }
        
        console.log("bookingResponseId, hotelObj, offerObj, paymentObj in addBooking() in useFirestore.js: \n", bookingResponseId, hotelObj, offerObj, paymentObj);
        console.log("auth.currentUser: ", auth.currentUser);
        
        const bookingsRef = doc(db, "bookings", bookingResponseId);
        const docSnap = await getDoc(bookingsRef);
        
        if (docSnap.exists()) {
            console.log("existing booking");
            return;
        }

        const bookingData = {
            offerId: offerObj.id,
            hotelId: hotelObj.hotelId,
            hotelName: hotelObj.name,
            guests: {...offerObj.guests},
            price: offerObj.price.total,
            currency: offerObj.price.currency,
            payment: {...paymentObj},
            password: nonMemberPwd
        };

        await setDoc(bookingsRef, bookingData);
        console.log("Booking is added!");

        if (auth.currentUser) {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                bookings: arrayUnion(bookingResponseId),
            });
            console.log("Booking reference added to user's bookings array");
        }
    }

    async function getUserInfoByUID(uid) {
        console.log("uid: ", uid);
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    }

    return {
        addUser,
        updateUserInfo,
        addBooking,
        getUserInfoByUID
    };
}