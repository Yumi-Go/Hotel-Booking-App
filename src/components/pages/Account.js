import useAuth from "../../hooks/useAuth";


export default function Account() {
    const { currentUser, logOut } = useAuth();

    return (
        <>
            <h1>This is Account!</h1>
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
 
