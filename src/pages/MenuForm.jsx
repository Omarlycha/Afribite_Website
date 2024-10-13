import { useState, useRef, useEffect } from "react";
import Button from "../components/button";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
} from "@firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage";
import { ImageDb } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function MenuForm() {
  // Form states
  const [image, setImage] = useState("/imagePlaceHolder.svg");
  const [uploadImage, setUploadImage] = useState(null);
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const fileInputRef = useRef(null); // Reference to the file input instance of the current state change event

  const maxDishNamechar = 100; // Maximum name

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, get the user's UID
        setUserId(user.uid);
        console.log(user.uid);
      } else {
        // No user is signed in
        setUserId(null);
      }
    });
    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Handle image click
  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input element to open the file picker dialog
  };

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const render = new FileReader(); // Read the file contents from the filesystem and convert it to a string
      render.onload = () => {
        setImage(render.result); // Convert the image file to upload file
      };
      render.readAsDataURL(file); // Convert the file as data URL
      setUploadImage(file); // Set the image file to upload
    }
  };

  const db = getFirestore(); // Reference to the Firestore collection
  const imageRef = ref(ImageDb, `menu/${uuidv4()}`); // Reference to the image storage
  const metadata = {
    contentType: "image/png",
  };

  // Add Form data Firestore database
  const sendForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await uploadBytes(imageRef, uploadImage, metadata); // Upload the image to the storage
      const imageUrl = await getDownloadURL(imageRef);

      const userRef = doc(db, "menu", userId);

      const menuSubcollectionRef = doc(userRef, category, "menus");

      const docSnapshot = await getDoc(menuSubcollectionRef);

      if (docSnapshot.exists()) {
        await updateDoc(menuSubcollectionRef, {
          menu: arrayUnion({
            Img: imageUrl,
            Name: dishName,
            Price: price,
            Category: category,
            Desc: description,
          }),
        });
      } else {
        await setDoc(menuSubcollectionRef, {
          menu: [
            {
              Img: imageUrl,
              Name: dishName,
              Price: price,
              Category: category,
              Desc: description,
            },
          ],
        });
      }
      // await setDoc(userRef, {
      //   category: {
      //     Img: imageUrl,
      //     Name: dishName,
      //     Price: price,
      //     Category: category,
      //     Desc: description,
      //   },
      // });

      alert("Sent Successfully!");
      if (category === "Main Dish") {
        navigate("/Adminhome/MainDish");
      } else if (category === "Appetizer") {
        navigate("/Adminhome/Appetizer");
      } else if (category === "Side") {
        navigate("/Adminhome/Side");
      } else if (category === "Soup") {
        navigate("/Adminhome/Soup");
      } else if (category === "Salad") {
        navigate("/Adminhome/Salad");
      } else if (category === "Special") {
        navigate("/Adminhome/Special");
      } else if (category === "Beverage") {
        navigate("/Adminhome/Beverage");
      } else if (category === "Dessert") {
        navigate("/Adminhome/Dessert");
      }
    } catch (error) {
      alert("Form failed to be sent!");
      setError(error.message);
    }
  };

  // Handle cancel button click (reset form fields)
  const handleCancel = () => {
    setImage("/src/assets/imagePlaceHolder.svg"); // Reset image to the initial placeholder
    setDishName(""); // Reset dish name input
    setPrice(""); // Reset price input
    setCategory(""); // Reset category input
    setDescription(""); // Reset description input
  };

  return (
    <div className="">
      <div className="my-12 mx-auto py-10 lg:mx-auto w-[90%] lg:w-[48rem] bg-n-n6  rounded-sm grid place-items-center shadow-md">
        <div className="flex flex-col justify-between items-center lg:flex-row gap-8 px-4 lg:px-10">
          <div className="lg:ml-12 Lg:w-[30%]">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                handleImageChange(e);
              }}
              className="hidden lg:hidden"
              accept="image/*" // Only allow image files
            />

            {/* Clickable Image */}
            <img
              src={image} // Placeholder image or default image
              alt=""
              className="cursor-pointer w-36 lg:w-40 h-32 lg:h-36 rounded-xl object-cover border-gray-300"
              onClick={handleImageClick}
            />
          </div>
          <div className="lg:w-[70%]">
            <form onSubmit={sendForm}>
              {/* Dish Name */}
              <div className="inline-block w-full lg:mr-4 mb-4 border border-n-n3 rounded-md focus:ring-0">
                <input
                  type="text"
                  placeholder="Dish Name"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  className="w-[80%] lg:w-[80%] h-11 p-3 bg-transparent outline-none text-sm font-light"
                  maxLength={maxDishNamechar}
                  required
                />
                <span className="text-n-n3 text-sm lg:ml-10">
                  {dishName.length}/{maxDishNamechar}
                </span>
              </div>

              {/* Price */}
              <div className="inline-block w-full lg:mr-4 mb-4 border border-n-n3 rounded-md focus:ring-0">
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-[80%] lg:w-[80%] h-11 p-3 bg-transparent outline-none text-sm font-light"
                  required
                />
                <span className="text-n-n3 text-sm ml-6 lg:ml-16">$</span>
              </div>

              {/* Category */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full  h-11 p-3 bg-transparent rounded-md mb-4 border border-n-n3 outline-none focus:ring-0 text-sm font-light text-n-n3"
                required
              >
                <option value="">Category</option>
                <option value="Main Dish">Main Dish</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Side">Side</option>
                <option value="Soup">Soup</option>
                <option value="Salad">Salad</option>
                <option value="Special">Special</option>
                <option value="Beverage">Beverage</option>
                <option value="Dessert">Dessert</option>
              </select>

              {/* Description */}
              <textarea
                placeholder="Description"
                value={description}
                rows="4"
                cols="5"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-transparent rounded-md mb-4 border border-n-n3 outline-none focus:ring-0 text-sm font-light"
                required
              />
              {error && (
                <p className="text-red-500 text-center text-sm">{error}</p>
              )}
              <div className="w-full flex justify-end ">
                {/* Cancel Button */}
                <Button
                  onClick={handleCancel} // Call the handleCancel function when clicked
                  className="bg-transparent text-p-button3 px-5 py-1 border-none"
                  text="Cancel"
                />

                {/* Save Button */}
                <button
                  type="submit"
                  className="`bg-transparent px-5 py-1 rounded-md text-p-button3 text-xs lg:text-sm font-pop border-none hover:border-p-button hover:bg-p-button hover:text-n-n7"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuForm;
