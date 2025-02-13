
import { EllipsisVertical,Phone } from 'lucide-react';
const UserInfos = () => {
    
  
  return (

    <div className=' flex  items-center  w-full border-b border-[#e0e0e0] gap-4 p-2'>
      <div className=' flex   flex-1 items-center justify-start w-full gap-2'>
      <div className='rounded-[] w-12'>
        <img className='rounded-[50%] ' src="/vite.svg" alt="" />
        </div>
        <div>
        <h1>akram</h1>
        <p className="text-[#88898b]">+212 6 555 555 55</p>
      </div></div>
      <Phone />
      
            <EllipsisVertical />
      </div>
  )
}

export default UserInfos;