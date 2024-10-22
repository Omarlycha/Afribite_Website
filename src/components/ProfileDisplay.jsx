import { useContext } from "react";
import Button from "../components/button";
import { Link, useLocation } from "react-router-dom";
import { displayContext } from "../context/display";
import profileImg from '../assets/profile.png'
import { profileContext } from "../context/ProfileContext";

const ProfileDisplay = () => {
    const {myProfile,loading} = useContext(profileContext)
    const {setShowProfile} = useContext(displayContext)
    const location = useLocation()


  return (
    <div>
      <h1 className="text-center text-2xl font-medium my-4 ">My Profile</h1>
      <div className="flex flex-col justify-around">
        <div className="mb-8 ">
            <div className="w-24 h-24 flex items-center justify-center m-auto rounded-full overflow-hidden">
            <img src={myProfile?.profileImage ? myProfile?.profileImage : profileImg} alt="" className=" rounded-full m-auto bg-[#E2725B]" />
            </div>
            <p className='text-center m-4 break-all h-[1rem]'>{myProfile?.name === '' ? " Nil" : myProfile?.name}</p>
            </div>
            <div className="flex flex-col gap-5 my-4">
              <div className="">
                <h2 className='font-medium text-lg'>Restaurant&#39;s Name</h2>
                <p className='mt-2 break-all h-[1rem]'>{myProfile?.restuarantName === '' ? "Nil" : myProfile?.restuarantName}</p>
              </div>
              <div>
                <h2 className='font-medium text-lg'>Phone No</h2>
                <p className='mt-2  h-[1rem]'>{myProfile?.phoneNo === '' ? "Nil" : myProfile?.phoneNo}</p>
              </div>
              <div className="">
                <h2 className='font-medium text-lg'>Email</h2>
                <p className='mt-2 break-all  h-[1rem]'>{myProfile?.email === '' ? "Nil" : myProfile?.email}</p>
              </div>
              <div>
                <h2 className='font-medium text-lg'>Address</h2>
                <p className='mt-2 break-all  h-[1rem]'>{myProfile?.address === '' ? "Nil" : myProfile?.address}</p>
              </div>
            </div>
      </div>
            <div className={`flex justify-end items-center gap-5 font-semibold m-6 ${location.pathname === '/Adminhome/Dashboard' ? 'hidden': ''}`}>
              <Button onClick={() => setShowProfile(false)}  text='Edit profile' className='bg-p-button3 hover:border-p-button3 hover:text-p-button3'/>
              <Link to='/Adminhome/Dashboard'><p className="text-p-button">Exit</p></Link>
            </div>
    </div>
  )
}

export default ProfileDisplay
