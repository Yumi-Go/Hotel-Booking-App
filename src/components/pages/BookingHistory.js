import useAuth from "../../hooks/useAuth";


export default function BookingHistory() {
    const { currentUser, logOut } = useAuth();

    return (
        <>
            <h1>This is Booking History!</h1>
            <div>
                {
                    currentUser ?
                    <div>
                        <h3>Name: {currentUser?.fName}</h3>
                        <h5>Email: {currentUser?.email}</h5>
                        <p>User ID: {currentUser?.uid}</p>
                        <p>Phone Number: {currentUser?.pNum}</p>
                        <button onClick={()=>logOut()}>Log Out</button>
                    </div>
                    : ""
                }
            </div>
        </>
    );
}
 
