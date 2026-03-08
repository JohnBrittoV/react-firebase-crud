import { serverTimestamp ,addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../services/firebase.config';
// import { Spinner } from '../components/Spinner';

export const CreateUserDetails = () => {
    
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async() => {
        
        if(![name, age, job].every(field => field.trim())){
            alert('All fields are required');
            return;
        }
        
        setLoading(true);
        try {
            const userRef = collection(db, "userData");
            await addDoc(userRef, {
                name,
                age,
                job,
                createdAt: serverTimestamp()
            })
            alert('User data saved successfully!!!');
                
            setName('');
            setAge('');
            setJob('');

        } catch (error) {
            console.log(error.message)
        }
        finally{
            setLoading(false);
        }
    }

    return(
        
        <div className="flex flex-col items-center
                        gap-4 justify-center m-10"> 

            <h2 className='font-bold 
                           text-2xl'>
                Enter User Details</h2>
            
            
            <input className="p-3 w-lg border
                              rounded text-lg"
                   type="text" name="Name" 
                   id="Name" placeholder="Full Name"
                   value={name}
                   onChange={(e) => {setName(e.target.value)}}/>

            <input className="p-3 w-lg border
                              rounded text-lg"
                   type="text" name="age" 
                   id="age" placeholder="Enter your age"
                   value={age}
                   onChange={(e) => {setAge(e.target.value)}}/>

            <input className="p-3 w-lg border
                              rounded text-lg"
                   type="text" name="job" 
                   id="job" placeholder="Enter occupation" 
                   value={job}
                   onChange={(e)=> {setJob(e.target.value)}}/>

            <button className="bg-amber-400 rounded-2xl
                               w-1/2 h-10  text-lg
                               hover:translate-y-0.5
                               duration-200"
                    onClick={handleSubmit}
                    disabled={loading}>
                    {loading ? "Saving..." : "Save Details"}</button>
        </div>
    )
}