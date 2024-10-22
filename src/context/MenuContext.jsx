import { createContext } from "react";
import { useAuth } from "../context/AuthenticationContext";
import { useState, useEffect } from "react";
import { db } from "../firebase";

import { getDocs, collection } from "firebase/firestore";

export const menuContext = createContext();

const MenuContext = (props) => {
  const { user } = useAuth();
  const [menuData, setMenuData] = useState([]);
  const [menuLength, setMenuLength] = useState(0);

  const fetchAllMenu = async () => {
    const subCollections = [
      "Appetizer",
      "Main Dish",
      "Side",
      "Special",
      "Salad",
      "Soup",
      "Beverage",
      "Dessert",
    ];
    const userData = { menus: {} };

    for (let subCollectionName of subCollections) {
      const subCollectionRef = collection(
        db,
        `menu/${user.uid}/${subCollectionName}`
      );
      const subCollectionSnapshot = await getDocs(subCollectionRef);

      subCollectionSnapshot.forEach((menuDoc) => {
        const menuItems = menuDoc.data().menu;
        userData.menus[subCollectionName] = menuItems || [];
      });
    }

    const totalMenuItems = Object.keys(userData.menus).reduce(
      (total, category) => {
        return total + (userData.menus[category]?.length || 0);
      },
      0
    );
    setMenuLength(totalMenuItems);
    setMenuData(userData);
  };

  useEffect(() => {
    if (user) {
      fetchAllMenu();
    }
  }, [user]);

  const value = {
    menuData,
    fetchAllMenu,
    menuLength,
  };
  return (
    <menuContext.Provider value={value}>{props.children}</menuContext.Provider>
  );
};

export default MenuContext;
