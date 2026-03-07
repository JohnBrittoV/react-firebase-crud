import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase.config';
import { useEffect, useState } from 'react';
import closeIcon from '../assets/icons/close-icon.svg';

export const Modal = ({user, closeModal}) =>{

    const [input, setInput] = useState({
        name: "",
        age: "",
        job: ""
    })

    // set selected user input into the state
    useEffect( () => {
        
        if(user){
            setInput({
                name: user.name || '',
                age: user.age || "",
                job: user.job || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        
        const {name, value} = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const updateUser = async () => {
        try {
            
            const userRef = doc(db, "userData", user.id)
            await updateDoc(userRef, input)
            
            alert('User updated successfully');
            closeModal();

        } catch (error) {
            console.error(error.message)
        }
    }

    const handleUpdate = () => {
        updateUser();
    }

    const handleCancel = () => {
        alert('Updation cancelled');
        closeModal();
    }

    return(
        <div className='fixed inset-0 flex
                        items-center justify-center
                        bg-black/40
                        transition-opacity duration-300'>

            <div className="bg-white p-6 rounded-lg
                           transform transition-all
                           duration-300 ease-out
                           scale-100">
            
                <div className='flex justify-between
                                mb-5'>
                    
                    <h2 className="font-bold
                            text-2xl mb">
                        Update User Details</h2>

                    <img className='w-10 cursor-pointer
                                    hover:scale-110 transition 
                                    duration-300'
                        src={closeIcon} alt="close" 
                        onClick={closeModal}/>

                </div>

                <div className='flex flex-col gap-2
                                items-center'>
                    <input className="p-3 w-lg border
                                      rounded text-sm"
                            type="text"
                            name='name' 
                            onChange={handleChange}
                            value={input.name}/>

                    <input className="p-3 w-lg border
                                    rounded text-sm"
                            type="text" 
                            name='age'
                            onChange={handleChange}
                            value={input.age}/>

                    <input  className='p-3 w-lg border
                                       rounded text-sm'
                            type="text"
                            name='job'
                            onChange={handleChange}
                            value={input.job}/>
                    
                    <div className='flex w-full gap-5 mx-3'>

                        <button className="bg-amber-400 rounded-2xl
                                        w-1/2 h-10 text-md
                                        hover:translate-y-0.5
                                        duration-200 mt-3"
                                onClick={handleUpdate}>
                            Update Details
                        </button>

                        <button className='bg-white rounded-2xl
                                        border-2 border-amber-400
                                        w-1/2 h-10 text-shadow-md
                                        hover:translate-y-0.5
                                        duration-200 mt-3'
                                onClick={handleCancel}>
                            Cancel
                        </button>

                    </div>
                </div>
                
            </div>
        </div>
    )
}


/*
    complete work flow
    ------------------

    User clicks edit (on parent)
        ↓
    selectedUser set
        ↓
    Modal opens 
        ↓
    useEffect fills inputs
        ↓
    User edits inputs
        ↓
    handleChange updates state
        ↓
    Click Update
        ↓
    updateDoc()
        ↓
    Firestore updates
        ↓
    onSnapshot updates UI

*/