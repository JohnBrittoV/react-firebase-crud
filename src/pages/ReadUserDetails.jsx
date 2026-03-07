import { useState, useEffect } from 'react';
import { doc, getDocs, collection, deleteDoc, onSnapshot } from "firebase/firestore"
import { db } from "../services/firebase.config";
import { Modal } from '../components/Modal';
import editIcon from '../assets/icons/edit-icon.svg';
import deleteIcon from '../assets/icons/delete-icon.svg';

export const ReadUserDetails = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        
        const getUser = onSnapshot(
            collection(db, "userData"),
            (snapshot) => {

                const userData = snapshot.docs.map(doc => ({
                    id: doc.id,...doc.data()
                }))

                setUserDetails(userData);
            }
        );

        return () => getUser();
    }, [])

    const handleDelete = async(id) => {
        try {
            const docRef = doc(db, 'userData', id);
            await deleteDoc(docRef);
            
            const newUsersData = userDetails.filter((item) => item.id !== id);
            setUserDetails(newUsersData);

            alert('User Data deleted successfully!!!');

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleUpdate = (user) => {
        console.log(user);
        setSelectedUser(user);
        setIsOpen(true);
    }
    
    return(
        <div className="flex flex-col 
                        items-start
                        justify-center
                        m-10">

            <h2 className='font-bold mb-2 
                           text-2xl'>
                        Users Data</h2>

            <div className='grid grid-cols-[40px_200px_80px_200px_40px_40px]
                            font-semibold border-b pb-2  
                            justify-center items-center'>
                <p>#</p>
                <p>Full Name</p>
                <p>Age</p>
                <p>Job Role</p>
                <p>Actions</p>
            </div>

            {userDetails.length === 0 && (<p className='mt-5 font-semibold text-lg'>No results found!!!</p>)}
            {userDetails.map((user, index) => {

                return (
                
                    <div className='grid even:bg-white odd:bg-gray-100
                                    grid-cols-[40px_200px_80px_200px_40px_40px]
                                    py-2 border-b items-center' 

                        key={user.id}>

                        <p className='text-lg mx-2'>
                        {index + 1}.</p> 

                        <p className='text-lg'>
                        {user.name} </p> 

                        <p className='text-lg'>
                        {user.age} </p> 

                        <p className='text-lg'>
                        {user.job} </p> 

                        <img className='w-4 hover:translate-y-0.5 
                                        all duration-100'
                             src={editIcon} 
                             alt="edit" 
                             onClick={() => handleUpdate(user)}/>
                        
                        <img className='w-5 hover:translate-y-0.5 
                                        all duration-100'
                             src={deleteIcon} 
                             alt="delete" 
                             onClick={() => {handleDelete(user.id)}}/>
                    </div>
                )
            })}

            {isOpen && (
                <Modal className="transition ease-out duration-500"
                    user={selectedUser}
                    closeModal={() => setIsOpen(false)}/>
            )}
                   
        </div>
    )
}