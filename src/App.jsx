import { CreateUserDetails } from './pages/CreateUserDetail';
import { ReadUserDetails } from './pages/ReadUserDetails';

function App() {

  return (
    <div className='flex flex-col justify-center
                    w-full items-center
                    lg:flex-row gap-10'>
      <CreateUserDetails/>
      <ReadUserDetails/>
    </div>
  )
}

export default App
