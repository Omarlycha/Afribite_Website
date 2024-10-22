import Menu from "../components/Menu";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import menuIcon from "../assets/menuIcon.svg";

function Special() {
  const [userId, setUserId] = useState(null);
  const [special, setSpecial] = useState([]);
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore(); // Initialize Firestore

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        try {
          // Reference to the Appetizer subcollection
          const menuSubcollectionRef = collection(db, "menu", uid, "Special");
          // Fetch all documents from the Appetizer subcollection
          const querySnapshot = await getDocs(menuSubcollectionRef);
          // Extract menus data from each document in the subcollection
          const fetchedMenus = querySnapshot.docs
            .map((doc) => doc.data().menu)
            .flat();

          setSpecial(fetchedMenus);
          setIsEmpty(fetchedMenus.length === 0); // Check if there are no menus in the subcollection

          console.log("Fetched Special: ", fetchedMenus);
        } catch (error) {
          console.error("Error fetching Special: ", error);
          setError(error.message);
          setIsEmpty(true); // Set isEmpty to true if error occurred
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCreateMenu = () => {
    const category = "Special";
    // navigate("/Adminhome/CategoryMenuForm");
    navigate("/Adminhome/CategoryMenuForm", {
      state: { cat: category },
    });
    console.log("create menu");
  };

  return (
    <div>
      <div className="my-4 mx-auto py-6 lg:p-6 lg:mx-auto w-[90%] md:w-[30rem] lg:w-[48rem] bg-n-n6 rounded-sm grid place-items-center shadow-md">
        <h2 className="mb-8">Special</h2>

        <div className="flex justify-between items-center">
          <div>
            <Link to="/Adminhome/Salad">
              <IoIosArrowBack className="text-3xl lg:text-4xl text-p-button my-4" />
            </Link>
          </div>
          {special.length > 0 ? (
            <div>
              {/* <div className="flex justify-between items-center"> */}
              <div className="flex flex-wrap justify-center items-center h-[480px] overflow-y-scroll scrollbar-thin scrollbar-thumb-p-button scrollbar-track-thin scrollbar-track-n-n4 ml-2 gap-4">
                {special.map((menu, index) => (
                  <Menu
                    key={index}
                    image={menu.Img} // Replace with actual image field if available
                    dishName={menu.Name} // Assuming name is the dish name
                    price={menu.Price} // Assuming price is available
                    index={index}
                    description={menu.Desc}
                    category={menu.Category}
                  />
                ))}
              </div>
            </div>
          ) : isEmpty ? (
            <div className="flex justify-center items-center w-full p-3 lg:p-6">
              <div className="lg:w-[36rem] lg:h-[14rem] bg-n-n6 rounded-sm grid place-items-center shadow-md">
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
          <div>
            <Link to="/Adminhome/Beverage">
              <IoIosArrowForward className="text-3xl lg:text-4xl text-p-button my-4" />
            </Link>
          </div>
        </div>
        <div className="flex px-2 pt-6">
          <button
            onClick={handleCreateMenu}
            className="bg-p-button p-3 rounded-md text-n-n7 text-xs lg:text-sm font-pop border-2 hover:border-p-button hover:text-p-button hover:bg-transparent py-3 px-5 lg:px-14"
          >
            Create +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Special;
