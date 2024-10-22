import React from 'react';
import { useState } from 'react';
import ActiveIcon from '../assets/active.svg';
import Button from './button.jsx';
import OrderPopup from './OrderPopup.jsx';


const OrderNotification = ({orderStatus, orderTime, customerName, orderName, orderQuantity, orderPrice, deliveryTime, orderNumber}) => {
    const [popupOpen, setPopupOpen] = useState(false)

    const toggleOrderPopup = () => {
        setPopupOpen(!popupOpen);
      };

    const updateOrderStatus = (newStatus) => {
        console.log(`Updating order status to: ${newStatus}`);
    };

    const displayOrderInfo = () => {
        switch(orderStatus.toLowerCase()) {
            case 'new':
                return (
                    <div className='flex'>
                        <p className='truncate'>{customerName} has placed an order for: {orderName}</p>
                        <p>£{orderPrice}</p>
                    </div>
                )
            case 'ongoing':
                return (
                    <div className='flex'>
                        <p className='truncate'>{customerName}'s order is being prepared: {orderName}</p>
                        <p class>£{orderPrice}</p>
                    </div>
                )
            case 'delivered':
                return (
                    <div className='flex'>
                        <p className='truncate'>{customerName}'s order has been delivered at: {deliveryTime}</p>
                        <p>£{orderPrice}</p>
                    </div>
                );
                default:
                    return null;
        }

    };
    
    return(
        <div className='bg-green-500 w-full flex justify-between'>
            <div className="grid grid-cols-6 justify-stretch items-center max-h-max py-2 px-4 rounded-md border border-n-n3 bg-notif hover:border-terra-cotta">
                <img src={ActiveIcon} className='size-2.5'/>
                <p className='capitalize'>{orderStatus}</p>
                <p className='font-medium'>#{orderNumber}</p>
                <p>{orderTime}</p>
                <div className='flex justify-between'>
                    {displayOrderInfo()}                    

                </div>
                <Button
                    text="View Order"
                    className="bg-p-button3 hover:border-p-button3 hover:text-p-button3 hover:bg-n-n7"
                    onClick={toggleOrderPopup}
                />
            </div>
            <div>
            {popupOpen && (
                     <OrderPopup
                        customerName={customerName}
                        orderName={orderName}
                        orderNumber={orderNumber}
                        orderQuantity={orderQuantity}
                        orderPrice={orderPrice}
                        popupOpen={popupOpen}
                        toggleOrderPopup={toggleOrderPopup}
                        orderStatus={orderStatus}
                        updateOrderStatus={updateOrderStatus}
                        deliveryTime={deliveryTime}
                    />
            )}
            </div>
        </div>    
    );
};

export default OrderNotification;