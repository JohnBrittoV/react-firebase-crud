import { addDoc, collection } from "firebase/firestore";
import { db } from '../services/firebase.config.js'

export const DbConnection = () => {

    const handlePost = async() => {
        const postRef = collection(db, "posts");
        await addDoc(postRef, {message: "Hey, first post"});
        alert('message posted successfully!!1');
    }

    return(
        <div className="flex gap-10 mt-10
                        justify-center">
            
            <input className="border p-3 rounded"
                   type="text" name="post" 
                   id="post" placeholder="post" />

            <button className="bg-amber-400 px-15
                              rounded-lg cursor-pointer
                              hover:translate-x-0.5 duration-300"   
                    
                    onClick={handlePost}>set</button>
        </div>
    )
}