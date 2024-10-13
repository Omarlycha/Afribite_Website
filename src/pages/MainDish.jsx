import Menu from "../components/Menu";
// import jollofRice from "../assets/jollofRice.svg";
import Button from "../components/button";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import menuIcon from "../assets/menuIcon.svg";

function MainDish() {
  const [userId, setUserId] = useState(null);
  const [mainDish, setMainDish] = useState([]);
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore(); // Initialize Firestore

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        try {
          // Reference to the Appetizer subcollection
          const menuSubcollectionRef = collection(db, "menu", uid, "Main Dish");
          // Fetch all documents from the Appetizer subcollection
          const querySnapshot = await getDocs(menuSubcollectionRef);
          // Extract menus data from each document in the subcollection
          const fetchedMenus = querySnapshot.docs
            .map((doc) => doc.data().menu)
            .flat();

          setMainDish(fetchedMenus);
          setIsEmpty(fetchedMenus.length === 0); // Check if there are no menus in the subcollection

          console.log("Fetched Main Dish: ", fetchedMenus);
        } catch (error) {
          console.error("Error fetching Main Dish: ", error);
          setError(error.message);
          setIsEmpty(true); // Set isEmpty to true if error occurred
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="my-4 mx-auto py-6 p-6 lg:mx-auto w-[90%] md:w-[32rem] lg:w-[48rem] bg-n-n6 rounded-sm grid place-items-center shadow-md">
        <h2 className="mb-8">Main Dish</h2>

        <div className="flex justify-between items-center">
          {/* <div className="flex flex-wrap justify-center items-center h-[480px] overflow-y-scroll scrollbar-thin scrollbar-thumb-p-button scrollbar-track-thin scrollbar-track-n-n4 ml-2 gap-4"> */}
          {mainDish.length > 0 ? (
            <div>
              {/* <div className="flex justify-between items-center"> */}
              <div className="flex flex-wrap justify-center items-center h-[480px] overflow-y-scroll scrollbar-thin scrollbar-thumb-p-button scrollbar-track-thin scrollbar-track-n-n4 ml-2 gap-4">
                {mainDish.map((menu, index) => (
                  <Menu
                    key={index}
                    image={menu.Img} // Replace with actual image field if available
                    dishName={menu.Name} // Assuming name is the dish name
                    price={`$${menu.Price}`} // Assuming price is available
                  />
                ))}
              </div>
              {/* </div> */}
            </div>
          ) : isEmpty ? (
            <div className="p-3 lg:p-6">
              <div className="m-4 lg:m-4 w-full lg:w-[36rem] lg:h-[14rem] bg-n-n6 rounded-sm grid place-items-center shadow-md">
                <img
                  src={menuIcon}
                  className="size-14 lg:size-24 mt-4"
                  alt="menu icon"
                />
                <h2 className="mt-2">Menu</h2>
                <p className="text-center mt-1 mb-4 px-2">
                  Create menu to organize and display food and drinks on your
                  point of sale.
                </p>
              </div>
            </div>
          ) : (
            <p>Loading menus...</p>
          )}
          {/* </div> */}
          <div>
            <Link to="/Adminhome/Appetizer">
              <IoIosArrowForward className="text-3xl lg:text-4xl text-p-button my-4" />
            </Link>
          </div>
        </div>
        <div className=" flex px-2 pt-6">
          <Button
            text="Create +"
            to="/Adminhome/MenuForm"
            className="mr-2 py-3 px-5 lg:px-14"
          />
        </div>
      </div>
    </div>
  );
}

export default MainDish;
