import { useContext,  useState } from "react";
import { FiImage } from "react-icons/fi";
import { displayContext } from "../context/display";
import ProfileDisplay from "../components/ProfileDisplay";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthenticationContext';
import  { useEffect } from 'react';
import { profileContext } from "../context/ProfileContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../components/LoadingButton";



const Profile = () => {
    const [profileForm, setProfileForm] = useState({name: '', restuarantName: '', email: '', phoneNo:'', address:'', profileImage: null})
    const [imagePreview, setImagePreview] = useState(null);
    const {showProfile, setShowProfile} = useContext(displayContext)
    const { user } = useAuth();
    const {fetchUserProfile} = useContext(profileContext)
    const [loading, setLoading] = useState(false); 


    const fetchUserData = async () => {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
          setProfileForm(prevProfile => ({
              ...userDoc.data()
          }));
      } else {
          setProfileForm(prevProfile => ({
              ...prevProfile,
              email: user.email || '',
              profileImage: user.photoURL || null
          }));
      }
  };

      useEffect(() => {
        if (user) {
            fetchUserData();
            const fetchImgUrl = async () => {
              
            }
        }
    }, []);

  const handleChange = (e) => {
    const {name, value} = e.target
    setProfileForm((prev)=>(
      {...prev,
        [name]: value
      }
    ))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileForm(prevProfile => ({
        ...prevProfile,
        profileImage: file
    }))
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      
      reader.readAsDataURL(file);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const db = getFirestore();
      const storage = getStorage();

      let downloadURL = null

      if (profileForm.profileImage) {
        if (typeof profileForm.profileImage !== 'object' ) {
          downloadURL = profileForm.profileImage
        } else {
          const storageRef = ref(storage, `profileImages/${user.uid}`)
          await uploadBytes(storageRef, profileForm.profileImage);
           downloadURL  = await getDownloadURL(storageRef);
        }
      }

      await setDoc(doc(db, 'users', user.uid),{ ...profileForm, profileImage: downloadURL}, );

      fetchUserProfile()
      setLoading(false)
       
      const notify =()=> {
        toast.success("Profile Update successful!", {
          position: "top-right",
        })
      }
  
      notify() 
   
    } 
    catch (error) {
      setLoading(false)
      console.error("Error updating: ", error);
      const errorNotify =()=> {
        toast.error("Error Updating profile!, try again later", {
          position: "top-right",
        })
      } 
      errorNotify() 
    }

};


  return (
    <div className="w-[90%] m-auto p-6 lg:px-32 lg:py-16 bg-n-n6 rounded-lg shadow-md overflow-hidden">

      <div className={`bg-white px-10 p-4 mb-4 ${ showProfile ? '' : 'hidden'}`}>
        <ProfileDisplay/>
      </div>

      <ToastContainer />

      {/* Edit Profile form */}
      <form onSubmit={handleSubmit} action="" className={`sm:mt-8 w-full text-n-n3 `}>
          <div className={`${ showProfile ? 'hidden' : ''} my-4`}>
          <h1 className="font-semibold sm:text-2xl text-[#E2725B] text-center">
          Edit Profile
           </h1>

           <p className="mt-4 font-semibold text-[#E2725B] ">Add Profile Picture</p>
           <div className="flex items-end mt-2 ">
              <div className={`w-36 h-36 flex items-center ${imagePreview ? '' : 'p-4'}  bg-white justify-center border-2 rounded-full overflow-hidden `}>
              {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="rounded-full m-auto " />
            ) : (
              <FiImage className="text-5xl text-n-n3" />
            )}
              </div>

             
              <label
                htmlFor="file"
                className="rounded-f inline-block box-border border-2 pointer bg-p-button p-3 rounded-md text-n-n7 text-xs lg:text-sm font-pop hover:text-p-button hover:bg-n-n7 "
              >
                Browse
              </label>
              <input
                id="file"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
                onChange={handleImageChange}
              />
           </div>
            

            <p className="mt-4 font-semibold text-[#E2725B]">Name</p>
            <input
            name="name"
            value={profileForm.name}
            onChange={handleChange}
            type="text" 
            className="border-2 bg-inherit border-[#E2725B]/20 w-full p-2 rounded-lg focus:outline-none focus:border-[#E2725B] "/>

            <p className="mt-4 font-semibold text-[#E2725B]">Resautrant name</p>
            <input
            name="restuarantName"
            value={profileForm.restuarantName}
            onChange={handleChange}
            type="text" 
            className="border-2 bg-inherit border-[#E2725B]/20 w-full p-2 rounded-lg focus:outline-none focus:border-[#E2725B] "/>

            <p className="mt-4 font-semibold text-[#E2725B] ">Email</p>
            <input
            placeholder="" 
            name="email"
            value={profileForm.email}
            onChange={handleChange}
            id=""
            className="border-2 bg-inherit border-[#E2725B]/20 w-full p-2 rounded-lg focus:outline-none focus:border-[#E2725B] placeholder:text-[#E2725B]/40 placeholder:p-1"></input>

            <p className="mt-4 font-semibold text-[#E2725B] ">Phone Number</p>
            <input
            placeholder="" 
            name="phoneNo"
            type="Number"
            value={profileForm.phoneNo}
            onChange={handleChange}
            id=""
            className="border-2 bg-inherit border-[#E2725B]/20 w-full p-2 rounded-lg focus:outline-none focus:border-[#E2725B] placeholder:text-[#E2725B]/40 placeholder:p-1"></input>

          <p className="mt-4 font-semibold text-[#E2725B] ">Address</p>
            <input
            placeholder="" 
            name="address"
            value={profileForm.address}
            onChange={handleChange}
            id=""
            className="border-2 bg-inherit border-[#E2725B]/20 w-full p-2 rounded-lg focus:outline-none focus:border-[#E2725B] placeholder:text-[#E2725B]/40 placeholder:p-1"></input>

        <div className="flex justify-end items-center mt-4 gap-5">
        {loading ? (<LoadingButton/>):
        (<button type="submit" className="p-3 border-2 text-xs lg:text-sm text-white bg-p-button3 rounded-md transition-colors hover:border-p-button3 hover:text-p-button3 hover:bg-white">Save</button>)}
        <p onClick={() => setShowProfile(true)} className="text-[#E2725B] hover:text-[#ae4c38] font-semibold">Cancel</p>
        </div>
          </div>
      </form>
    </div>
  )
}

export default Profile
