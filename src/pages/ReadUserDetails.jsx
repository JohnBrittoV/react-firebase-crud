import { useState, useEffect } from 'react';
import { getDocs,collection } from "firebase/firestore"
import { db } from "../services/firebase.config";

export const ReadUserDetails = () => {

    const [userDetails, setUserDetails] = useState([])
    
    useEffect(() => {
        const userData = async () => {
            try {
                const userRef = collection(db, "userData");
                const userDoc = await getDocs(userRef);

                if(!userDoc.empty){
                    const userData = userDoc.docs.map((data) => ({
                        id: data.id, ...data.data()}))
                        setUserDetails(userData)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        userData();
    }, [])
    
    return(
        <div className="flex flex-col 
                        gap-5 items-start
                        justify-center
                        m-10 max-w-4xl">

            <h2 className='font-bold 
                           text-2xl'>
                        Users Data</h2>

            <div className='grid grid-cols-[60px_200px_80px_1fr]
                            font-semibold border-b pb-2 
                            justify-center items-center'>
                <p>#</p>
                <p>Full Name</p>
                <p>Age</p>
                <p>Job Role</p>
            </div>

            {userDetails.length === 0 ? <p>No users found</p> : (
                 userDetails.map((user, index) => {
                
                return (
                    <div className='grid grid-cols-[60px_200px_80px_1fr]
                                    py-2 border-b items-center
                                    w-full max-w-lg' 

                        key={user.id}>

                        <p className='truncate'>
                        {index + 1}.</p> 

                        <p className='truncate'>
                        {user.name} </p> 

                        <p className='truncate'>
                        {user.age} </p> 

                        <p className='truncate'>
                        {user.job} </p> 
                                
                    </div>
                )
            })   
            )}
                   
        </div>
    )
}