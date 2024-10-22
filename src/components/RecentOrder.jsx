import { LuPoundSterling } from "react-icons/lu";
import dishIcon from '../assets/dishicon.png'


const RecentOrder = ({image, dish, price, date, status}) => {
  return (
    <div>
        <div className="flex justify-between items-center  border border-[#E2725B]/20 text-xs rounded-2xl p-2 gap-2">
            <img src={image} alt="" className="" />

            <div className="flex flex-col flex-1">
              <p className="">{dish}</p>
              <span className='mt-1 flex items-center gap-1'> <LuPoundSterling className=" text-n-n3" />{price}</span>
            </div>

            <div className="text-end">
              <p className="text-xs">{date}</p>
              <p className={`text-[#808000] font-semibold mt-1 text-xs ${ status === 'Completed' ? 'text-[#808000]' : 'text-red-700'}`}>{status}</p>
            </div>
          </div>
    </div>
  )
}


const NoRecentOrder = () => {
  return (
    <div>
        <div className="flex justify-between items-center  border border-[#E2725B]/20 text-xs rounded-2xl p-2 gap-2">
            <img src={dishIcon} alt="" className="" />

            <div className="flex flex-col flex-1 ">
              <div className="h-2 rounded-lg w-5/6 bg-gray-200"></div>
              <div className="h-2 w-4 mt-1 rounded-lg bg-gray-200"></div>
            </div>

            <div className="flex flex-col items-end">
              <div className="h-2 rounded-lg w-14 bg-gray-200"></div>
             <div className="h-2 w-12 mt-1 rounded-lg bg-gray-200"></div>
            </div>
          </div>
    </div>
  )
}

export {RecentOrder,NoRecentOrder}
