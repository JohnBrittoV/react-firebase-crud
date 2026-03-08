import { useState, useEffect } from 'react';
import { doc, query, orderBy, collection, deleteDoc, onSnapshot } from "firebase/firestore"
import { db } from "../services/firebase.config";
import { Modal } from '../components/Modal';
import editIcon from '../assets/icons/edit-icon.svg';
import deleteIcon from '../assets/icons/delete-icon.svg';
import { Spinner } from '../components/Spinner';

export const ReadUserDetails = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sortOption, setSortOptions] = useState('newest');

    const sort = {
        newest: orderBy('createdAt', 'desc'),
        nameAsc: orderBy('name', 'asc'),
        nameDesc: orderBy('name', 'desc'),
        age: orderBy('age', 'asc'),
        job: orderBy('job', 'asc')
    }

    const handleSorting = (option) => {
        return query(collection(db, 'userData'), sort[option])
    }
    
    useEffect(() => {
        
        setLoading(true);
        const sortedQuery = handleSorting(sortOption);

        const getUser = onSnapshot(sortedQuery, (snapshot) => {

                const userData = snapshot.docs.map(doc => ({
                    id: doc.id,...doc.data()
                }))

                setTimeout(() => {
                    setUserDetails(userData);
                    setLoading(false)
                }, 1000);
            });

        return () => getUser();
    }, [sortOption])

    // Delete function
    const handleDelete = async(id) => {
        setLoading(true);
        
        try {
            const docRef = doc(db, 'userData', id);
            await Promise.all([
                deleteDoc(docRef),
                new Promise(resolve => setTimeout(resolve,300))
            ])   
            
            const newUsersData = userDetails.filter((item) => item.id !== id);
            setUserDetails(newUsersData);

            alert('User Data deleted successfully!!!');
            setLoading(false);

        } catch (error) {
            console.log(error.message)
        }
    }

    // Edit function
    const handleUpdate = (user) => {
        console.log(user);
        setSelectedUser(user);
        setIsOpen(true);
    }

    if(loading){
        return <Spinner/>
    }
    
    return(
        <div className="flex flex-col 
                        items-start
                        justify-center
                        m-10">

            <div className='flex justify-between
                            w-full mb-4'>

                <h2 className='font-bold
                            text-2xl'>
                            Users Data</h2>
 
                <select className='border p-2 rounded'
                        value={sortOption}
                        onChange={(e) => setSortOptions(e.target.value)}>
                        
                    <option value={'newest'}>Newest</option>
                    <option value={'nameAsc'}>Name (A → Z )</option>
                    <option value={'nameDesc'}>Name (Z → A )</option>
                    <option value={'age'}>Age</option>
                    <option value={'job'}>Job</option>
                </select>
            </div>

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