import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from "../components/Banner";
import { FiImage } from "react-icons/fi";
import Category from "../components/ui/Category";
import ChoiceDate from "../components/ui/DatePicker";
import { profileContext } from '../context/ProfileContext';
import { useAuth } from "../context/AuthenticationContext";
import LoadingButton from "../components/LoadingButton";

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

const Promotions = () => {
  const { adForm, setAdForm, promotions,fetchPromotions, } = useContext(profileContext);
  const { user } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPromotions, setShowPromotions] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPromotions();
    }
  }, [user]);

  useEffect(() => {
    setAdForm(prev => ({
      ...prev,
      promotions: {
        ...prev.promotions,
        startDate: prev.promotions?.startDate || new Date().toISOString(),
        endDate: prev.promotions?.endDate || new Date().toISOString(),
      }
    }));
  }, [setAdForm]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdForm(prev => ({
      ...prev,
      promotions: { ...prev.promotions, [name]: value }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdForm(prev => ({
        ...prev,
        promotions: {
          ...prev.promotions,
          image: file,
          imagePreview: URL.createObjectURL(file)
        }
      }));
    }
  };

  const handleDateChange = (date, field) => {
    if (date && !isNaN(date.getTime())) {
      setAdForm(prev => ({
        ...prev,
        promotions: {
          ...prev.promotions,
          [field]: date.toISOString(),
          ...(field === 'startDate' && date > new Date(prev.promotions?.endDate || Date.now()) 
              ? { endDate: date.toISOString() } 
              : {})
        }
      }));
    }
  };

  const clearForm = useCallback(() => {
    setAdForm(prev => ({
      ...prev,
      promotions: {
        title: '',
        description: '',
        image: null,
        imagePreview: null,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        category: ''
      }
    }));
    setTermsAccepted(false);
  }, [setAdForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      throttledWarnToast("Please accept the terms and conditions");
      return;
    }

    try {
      setLoading(true);
      const db = getFirestore();
      const storage = getStorage();

      let imageUrl = null;
      if (adForm.promotions.image) {
        const storageRef = ref(storage, `promotions/${user.uid}/${adForm.promotions.image.name}`);
        await uploadBytes(storageRef, adForm.promotions.image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const userSubcollectionRef = collection(db, "promotions", user.uid, "promotionData");
      await addDoc(userSubcollectionRef, {
        title: adForm.promotions.title,
        description: adForm.promotions.description,
        startDate: adForm.promotions.startDate,
        endDate: adForm.promotions.endDate,
        category: adForm.promotions.category,
        imageUrl,
        createdAt: new Date()
      });

      setLoading(false);
      throttledSuccessToast("Promotion added successfully!");
      fetchPromotions();
      clearForm();
    } catch (error) {
      setLoading(false);
      console.error("Error adding document: ", error);
      throttledErrorToast("Error adding promotion. Please try again.");
    }
  };

  const handleDeletePromotion = useCallback((id) => {
    throttledWarnToast(
      <div>
        <p>Are you sure you want to delete this promotion?</p>
        <div className="mt-2">
          <button 
            onClick={() => confirmDeletePromotion(id)} 
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

  const confirmDeletePromotion = useCallback(async (id) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "promotions", user.uid, "promotionData", id));
      throttledSuccessToast("Promotion deleted successfully!");
      fetchPromotions();
    } catch (error) {
      console.error("Error deleting promotion: ", error);
      throttledErrorToast("Error deleting promotion. Please try again.");
    }
  }, [fetchPromotions, user]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  }, []);

  return (
    <div className="w-[90%] m-auto auto p-6 lg:px-32 lg:py-16 bg-n-n6 rounded-lg shadow-md overflow-hidden">
      <Banner text={"12% per annum"} />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
      
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <h1 className="font-semibold sm:text-2xl text-[#E2725B] text-start">
          Create Promotion
        </h1>
        
        {/* Form fields */}
        <div>
          <label htmlFor="promotionTitle" className="block mb-2 font-semibold text-[#E2725B]">Title field</label>
          <input
            type="text"
            id="promotionTitle"
            name="title"
            value={adForm.promotions?.title || ''}
            onChange={handleChange}
            className="w-full p-2 border-2 bg-inherit border-[#E2725B]/20 rounded-lg focus:outline-none focus:border-[#E2725B]"
            required
          />
        </div>

        <div>
          <label htmlFor="promotionDescription" className="block mb-2 font-semibold text-[#E2725B]">Description</label>
          <textarea
            id="promotionDescription"
            name="description"
            placeholder="Write a detailed description about your Promotion" 
            rows={3}
            value={adForm.promotions?.description || ''}
            onChange={handleChange}
            className="w-full p-2 border-2 bg-inherit border-[#E2725B]/20 rounded-lg focus:outline-none focus:border-[#E2725B]"
            required
          ></textarea>
        </div>

        {/* Image upload */}
        <div>
          <p className="mb-2 font-semibold text-[#E2725B]">Upload image</p>
          <div className="flex gap-4 items-center p-4 bg-white justify-center border-2 border-dashed">
            {adForm.promotions?.imagePreview ? (
              <img src={adForm.promotions.imagePreview} alt="Preview" className="w-32 h-32 object-cover" />
            ) : (
              <FiImage className="text-5xl text-n-n3" />
            )}
            <p className="text-center sm:text-left">Upload an image for your restaurant banner (GIF, JPG or PNG)</p>

            <input              required
            id="file"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className=" min-w-0 max-w-32 text-white file:hidden text-xs lg:text-sm border-2 bg-p-button p-3 rounded-md font-pop hover:border-p-button hover:text-p-button hover:bg-n-n7" onChange={handleImageChange} />
          </div>
        </div>

        {/* Date selection */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between text-sm md:text-base mt-4">
        <span>
          <h3 className="text-[#E2725B] font-semibold">Choose a Start date</h3>
          <ChoiceDate 
            value={adForm.promotions?.startDate ? new Date(adForm.promotions.startDate) : new Date()} 
            onChange={(date) => handleDateChange(date, 'startDate')}
            minDate={new Date()}
          />
        </span>

        <span className="md:inline-block">
          <h3 className="text-[#E2725B] font-semibold">Choose an End date</h3>
          <ChoiceDate 
            value={adForm.promotions?.endDate ? new Date(adForm.promotions.endDate) : new Date()} 
            onChange={(date) => handleDateChange(date, 'endDate')}
            minDate={adForm.promotions?.startDate ? new Date(adForm.promotions.startDate) : new Date()}
          />
        </span>
      </div>

        {/* Category selection */}
        <Category 
          value={adForm.promotions?.category || ''} 
          onChange={(value) => setAdForm(prev => ({ 
            ...prev, 
            promotions: { ...prev.promotions, category: value } 
          }))} 
        />

        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-5">
  {/* Terms and Conditions Section */}
  <span className="flex items-center text-xs md:text-sm">
    <input
      type="checkbox"
      id="promotionTerms"
      className="mr-2"
      checked={termsAccepted}
      onChange={(e) => setTermsAccepted(e.target.checked)}
    />
    <label htmlFor="promotionTerms" className="text-white">
      Read <span className="text-[#E2725B] font-semibold">Terms and Conditions</span>
    </label>
  </span>

  {/* Buttons Section */}
  <div className="flex justify-end items-center gap-5">
    {loading ? (
      <LoadingButton />
    ) : (
      <button
        type="submit"
        className="p-3 border-2 text-xs lg:text-sm text-white bg-p-button3 rounded-md transition-colors hover:border-p-button3 hover:text-p-button3 hover:bg-white"
      >
        Create
      </button>
    )}
    
    <button
      onClick={clearForm}
      type="button"
      className="p-3 border-2 text-xs lg:text-sm text-white bg-[#E2725B] rounded-md transition-colors hover:border-[#E2725B] hover:text-[#E2725B] hover:bg-white"
    >
      Clear form
    </button>

    <Link to="/Adminhome/Dashboard">
      <p className="text-[#E2725B] font-semibold">Cancel</p>
    </Link>
  </div>
</div>

      </form>

      {/* Display promotions */}
      <div className="mt-8">
        <button
          onClick={() => setShowPromotions(!showPromotions)}
          className="px-4 py-2 bg-[#E2725B] text-white rounded-md hover:bg-[#D1614A] transition-colors"
        >
          {showPromotions ? "Hide Promotions" : "Show Promotions"}
        </button>

        {showPromotions && (
          <div className="mt-4 p-4 border-2 border-[#E2725B] rounded-lg">
            <h3 className="text-xl font-semibold text-[#E2725B] mb-4">Promotions created</h3>
            {promotions.length === 0 ? (
              <p>No data available</p>
            ) : (
              promotions.map((promo) => (
                <div key={promo.id} className="mb-4 p-2 bg-white/10 rounded flex">
                  <div className="w-1/4 mr-4">
                    {promo.imageUrl ? (
                      <img src={promo.imageUrl} alt={promo.title} className="w-full h-auto object-cover rounded" />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                  </div>
                  <div className="w-3/4">
                    <h4 className="font-semibold"><span className="text-[#E2725B]">TITLE:</span> {promo.title}</h4>
                    <p><span className="text-[#E2725B]">Description:</span> {promo.description}</p>
                    <p><span className="text-[#E2725B]">Category:</span> {promo.category}</p>
                    <p><span className="text-[#E2725B]">Start Date:</span> {formatDate(promo.startDate)}</p>
                    <p><span className="text-[#E2725B]">End Date:</span> {formatDate(promo.endDate)}</p>
                  <p className="text-sm  text-gray-500"> <span className=" text-[#E2725B] ">Created:</span> {promo.createdAt.toLocaleString()}</p>
                  <button
                    onClick={() => handleDeletePromotion(promo.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete Promotion
                  </button>
                </div>
              </div>
            )))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotions;
