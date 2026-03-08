import loadingIcon from '../assets/svg/loading-spinner.svg';

export const Spinner = () => {
    
    return(
        <div className='min-h-screen flex
                    justify-center items-center
                    h-20'>

            <img src={loadingIcon} alt="loading icon" />
    
        </div>
    )
}