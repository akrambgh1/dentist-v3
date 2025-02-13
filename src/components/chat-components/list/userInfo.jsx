import { useUserStore } from '../../userStore';
import { SquarePen } from 'lucide-react';
const UserInfo = () => {
    const { userDetails } = useUserStore()
  
  return (
    <section className='flex items-center  w-full gap-[3rem]'>
    <div className=' flex   flex-1 items-center justify-start w-full gap-2'>
      <div className='rounded-[] w-12'>
        <img className='rounded-[50%] w-10 h-10' src={userDetails?.photo|| "profilepi.jpg"} alt="" />
      </div>
        <h1>{ userDetails?.Firstname}</h1>
            
            
      </div>
      <SquarePen />
    </section>
  )
}

export default UserInfo