import firebaseConfig from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";




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
        const toLowerCaseIfPresent = (value) => value ? value.toLowerCase() : value;
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
            fName: toLowerCaseIfPresent(newFName),
            mName: toLowerCaseIfPresent(newMName),
            lName: toLowerCaseIfPresent(newLName),
            address: newAddress,
            pNum: newPnum
        });
    }

    async function getUserInfoByUID(uid) {
        console.log("uid: ", uid);
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    }

    return {
        addUser,
        updateUserInfo,
        getUserInfoByUID
    };
}