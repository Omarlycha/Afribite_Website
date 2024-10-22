import bannerImage from "../assets/image.png";
import dishIcon from "../assets/dishicon.png";
import vector from "../assets/Vector.png";
import { IoIosArrowDropdown } from "react-icons/io";
import {NoRecentOrder, RecentOrder, } from '../components/RecentOrder';
import { useContext, useEffect } from "react";
import ViewersChart from "../components/ViewersChart";
import ProfileDisplay from "../components/ProfileDisplay";
import { profileContext } from "../context/ProfileContext";
import PointChart from "../components/PointChart";
import CustomerChart from "../components/CustomerChart";
import ProgressBar from "../components/ProgressBar";
import { menuContext } from "../context/MenuContext";

const Dashboard = () => {
  const { myProfile, userAdData, promotions} = useContext(profileContext);

  const { menuLength, fetchAllMenu } = useContext(menuContext)

  const myOrders = []

  const recentOrders = myOrders.slice(0,3)

  useEffect(() => {
    fetchAllMenu();
  }, []);



  return (
    <div className="">
      <div className="grid grid-cols-3">
        {/* left side */}
        <div className="lg:col-span-2 col-span-3 ">
          {/* top banner */}
          <div className="w-full bg-white rounded-lg overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="flex flex-col m-auto gap-1 lg:gap-5 p-4 ">
                <h1 className="text-black text-xl md:text-2xl text-center">
                  Hi, {myProfile?.restuarantName}
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-black text-center">
                  Welcome to <span className="text-[#E2725B]">AfriBite</span>
                </p>
              </div>
              <div className=" lg:h-56  flex">
                <img src={bannerImage} alt="" className="flex-1 lg:w-full" />
              </div>
            </div>
          </div>

          {/* Available dish and total orders */}
          <div className="grid grid-cols-2 gap-4 mt-4 ">
            <div className="relative bg-white rounded-lg p-4 ">
              <span className="absolute right-5 top-6 md:right-10 md:top-5 md:text-3xl text-n-n3">
                <IoIosArrowDropdown />
              </span>

              <p className="text-center my-2">Available Dish</p>

              <div className="w-full m-auto flex items-center px-2">
                <img
                  src={dishIcon}
                  alt=""
                  className="rounded-full bg-[#E2725B]/50 p-1 border-2 border-red-300 ml-5 h-10 md:h-full"
                />
                <div className="text-black/60 md:text-4xl font-semibold text-center flex-1 md:mr-14">
                  {menuLength}
                </div>
              </div>

              <div className="w-full flex my-2 md:my-4">
                <div className="px-2 py-1 rounded-2xl border-[#808000] bg-[#808000]/30 m-auto">
                  <p className="">+{menuLength} New Add</p>
                </div>
              </div>
            </div>

            <div className="relative bg-white rounded-lg p-4">
              <span className="absolute right-5 top-6 md:right-10 md:top-5 md:text-3xl text-n-n3">
                <IoIosArrowDropdown />
              </span>

              <p className="text-center my-2">Total Orders</p>

            <div className='w-full m-auto flex items-center px-2'>
              <img src={vector} alt="" className="rounded-full bg-yellow-200/50 p-1 border-2 border-yellow-200 h-10 md:h-full" />
              <div className='text-black/60 md:text-4xl font-semibold text-center flex-1 md:mr-12 '>
                   {myOrders.length}
              </div>
            </div>


              <div className="w-full flex my-2 md:my-4">
                <div className="px-2 py-1 rounded-2xl border-[#808000] bg-[#808000]/30 m-auto">
                  <p className="">+{myOrders.length} New Add</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4 ">
            <div className="bg-white rounded-lg p-8 flex flex-col gap-5 md:gap-0 justify-around">
              <h2 className="font-medium text-lg">Total Summary</h2>

              <div className="">
                <div className="flex justify-between">
                  <p>Promotions</p>
                  <p>{promotions.length}/100</p>
                </div>
                <ProgressBar
                  value={promotions.length}
                  color={"p-button"}
                  max="100"
                />
              </div>

              <div className="">
                <div className="flex justify-between">
                  <p>Advertisment</p>
                  <p>{userAdData.length}/100</p>
                </div>
                <ProgressBar
                  value={userAdData.length}
                  color={"p-button3"}
                  max="100"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4  flex flex-col">
              <h2 className="font-medium text-lg">Performance</h2>

              <div className="h-36">
                <PointChart />
              </div>

              <p className="text-center">
                Earn more points and boost your restaurant’s visibility
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4 ">
            <div className="bg-white rounded-lg p-4">
              <h2 className="font-medium text-lg">Views</h2>
              <div className="h-52">
                {" "}
                <ViewersChart />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="w-full">
                <h2 className="font-medium text-lg">Your Customers</h2>
                <div className="h-52">
                  <CustomerChart />
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* right side */}
      <div className=" ml-6 hidden lg:flex flex-col justify-between">

        {/* profile info display */}
        <div className="bg-white px-8 p-4 flex-1 my-auto">
          <ProfileDisplay/>
        </div>

        {/* recent orders */}
        <div className="bg-white px-2 p-4 mt-4 flex flex-col gap-2">
          <h1 className="text-center text-l font-medium my-4 ">Recent Order</h1>
          {recentOrders.map((items, index)=>
            <RecentOrder key={index} image={items.dishImg} dish={items.mealname} price={items.price} date={items.date} status={items.status}/>
          )}

          {recentOrders.length === 2 ? (<NoRecentOrder/>) : '' }
          {recentOrders.length === 1 ? (<><NoRecentOrder/> <NoRecentOrder/></> ) : '' }
          {recentOrders.length === 0 ? (<><NoRecentOrder/> <NoRecentOrder/> <NoRecentOrder/></>) : '' }
                  
        </div>
      </div>
    </div>
  </div>
  );
};


export default Dashboard;
