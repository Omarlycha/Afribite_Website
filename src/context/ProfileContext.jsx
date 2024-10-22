import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from '../context/AuthenticationContext';
import { getFirestore, doc, getDoc, collection, getDocs,query, orderBy, deleteDoc } from 'firebase/firestore';
import { toast} from 'react-toastify';

const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    }
  }

export const profileContext = createContext()

const ProfileContextProvider = (props) => {
    const [myProfile, setMyProfile] = useState({})
    const [loading, setLoading] = useState(true);
    const [adForm, setAdForm] = useState({Title: '', Description: '', image:'', budget:'', audience:'' })
    const [adStartDate, setAdStartDate] = useState(new Date());
    const [adEndDate, setAdEndDate] = useState(adStartDate);
    const [adImagePreview, setAdImagePreview] = useState(null);
    const [userAdData, setUserAdData] = useState([]);  // State to store user data
    const [promotions, setPromotions] = useState([]);
    const { user } = useAuth();


    const fetchUserProfile = async () => {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            setMyProfile(prevProfile => ({
              ...prevProfile,
                ...userDoc.data(),
            }));
        } else {
            setMyProfile(prevProfile => ({
                ...prevProfile,
                email: user.email || '',
                profileImage: user.photoURL || null
            }));
        }
        setLoading(false);
        
    };

    const fetchUserAdData = async () => {
        try {
          if (user) {
            const db = getFirestore();
            // Reference the "advertData" subcollection under the user's document
            const userSubcollectionRef = collection(db, 'adverts', user.uid, 'advertData');

            const q = query(userSubcollectionRef, orderBy("createdAt", "desc"));
            
            // Fetch all documents from the subcollection
            const querySnapshot = await getDocs(q);
            
            // Extract data from each document
            const data = querySnapshot.docs.map(doc => ({ 
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
             }));
            
            // Update state with the fetched data
            setUserAdData(data);
            ;
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setLoading(false);
        }
      };

      const fetchPromotions = useCallback(async () => {
        if (!user) return;
    
        try {
          const db = getFirestore();
          const promotionsRef = collection(db, "promotions", user.uid, "promotionData");
          const q = query(promotionsRef, orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          const promotionsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() 
          }));
          setPromotions(promotionsData);
        } catch (error) {
          console.error("Error fetching promotions: ", error);
        }
      }, [user])

      const throttledSuccessToast = useCallback(
        throttle((message) => toast.success(message), 5000),
        []
      );
    
      
      const throttledErrorToast = useCallback(
        throttle((message) => toast.error(message), 5000),
        []
      );
    
      const throttledWarnToast = useCallback(
        throttle((message) => toast.warn(message), 5000),
        []
      );

      const handleDeletePromotion = useCallback((id, text,collection, subcollection) => {
        throttledWarnToast(
          <div>
            <p>Are you sure you want to delete this {text}?</p>
            <div className="mt-2">
              <button 
                onClick={() => confirmDeletePromotion(id, collection, subcollection)} 
                className="mr-2 px-2 py-1 bg-red-500 text-white rounded"
              >
                Yes
              </button>
              <button 
                onClick={() => toast.dismiss()} 
                className="px-2 py-1 bg-gray-500 text-white rounded"
              >
                No
              </button>
            </div>
          </div>,
          {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false
          }
        );
      }, []);
    
      const confirmDeletePromotion = useCallback(async (id, collection, subcollection) => {
        try {
          const db = getFirestore();
          await deleteDoc(doc(db, collection, user.uid, subcollection, id));
          throttledSuccessToast( collection + " deleted successfully!");
          fetchPromotions();
          fetchUserAdData()
        } catch (error) {
          console.error("Error deleting : ", error);
          throttledErrorToast("Error while deleting. Please try again.");
        }
      }, [fetchPromotions, user]);

  useEffect(() => {

    if (user) {
        fetchUserProfile();
        fetchUserAdData()
        fetchPromotions()
    }
}, [user]);

    const value = {
     myProfile,loading, 
     fetchUserProfile, 
     adForm, 
     setAdForm, 
     adEndDate, 
     setAdEndDate, 
     adStartDate, 
     setAdStartDate,
     adImagePreview, 
     setAdImagePreview,
     userAdData, 
     setUserAdData,
     fetchUserAdData,
     promotions, 
     setPromotions,
     fetchPromotions,
     handleDeletePromotion
    }
    return(
        <profileContext.Provider value={value}>
            {props.children}
        </profileContext.Provider>
    )
}

export default ProfileContextProvider