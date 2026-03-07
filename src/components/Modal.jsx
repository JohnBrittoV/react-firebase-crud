import closeIcon from '../assets/icons/close-icon.svg';
export const Modal = ({user, closeModal}) =>{

    const handleUpdate = () => {
        
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
                            defaultValue={user?.name}/>

                    <input className="p-3 w-lg border
                                    rounded text-sm"
                            type="text" 
                            defaultValue={user?.age}/>

                    <input  className='p-3 w-lg border
                                       rounded text-sm'
                            type="text"
                            defaultValue={user?.job}/>

                    <button className="bg-amber-400 rounded-2xl
                                    w-1/2 h-10 text-md
                                    hover:translate-y-0.5
                                    duration-200 mt-3"
                            onClick={handleUpdate}>
                        Update Details
                    </button>
                </div>
                
            </div>
        </div>
    )
}