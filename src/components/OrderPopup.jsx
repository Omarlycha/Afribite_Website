import React, {useState} from 'react';
import Button from "./button";

const OrderPopup = ({customerName, orderName, orderNumber, orderQuantity, orderPrice, popupOpen, toggleOrderPopup, orderStatus, updateOrderStatus, deliveryTime }) => {
    
    return (
        popupOpen && (
        <div className="flex flex-col justify-center items-center bg-notif border-2 border-terra-cotta w-[281px] text-n-n1 font-light gap-y-5 py-[21px] px-[23px] rounded-lg leading-5">
            <div className="text-sm text-n-n1">
                {orderStatus === "new" && (
                    <div className='font-normal'>
                        <h2 className='text-xl tfont-normal text-p-button'>Order Details: #{orderNumber}</h2>
                        <p className='font-medium mt-2 text-n-n1'>New order #{orderNumber} from {customerName}!</p>
                        <p className="font-medium mt-4 text-n-n2">Order Summary:</p>
                        <p className='text-n-n2'>Dish: {orderName}</p>
                        <p className='text-n-n2'>Quantity: {orderQuantity}x</p>
                        <p className='text-n-n2'>Total: £{orderPrice}</p><br/>
                        <p className='text-n-n2'>Please Start Preparing the Order.</p><br/>
                        <p className='text-n-n2'>Update Order Status once it's Ready for Pickup.</p>
                    <div className='mt-4 flex justify-center'>
                        <Button 
                            text="Ready for Pickup"
                            className="bg-accent text-notif rounded-lg font-medium"
                            onClick={() => updateOrderStatus("ongoing")}
                        />
                    </div>
                    </div>
                )}
                

                {orderStatus === "ongoing" && (
                    <div>
                        <h2 className='text-xl font-normal text-p-button'>Order Details: #{orderNumber}</h2>
                        <p className='font-medium mt-2 text-n-n1'>Order #{orderNumber} is being delivered to {customerName}.</p>
                        <p className="font-medium mt-4 text-n-n2">Order Summary:</p>
                        <p className='text-n-n2'>Dish: {orderName}</p>
                        <p className='text-n-n2'>Quantity: {orderQuantity}x</p>
                        <p className='text-n-n2'>Total: £{orderPrice}</p><br/>
                        <p className='text-n-n2'>Take the next step to complete the order.</p>
                        <div className='mt-4 flex justify-center'>
                            <Button
                            text="Complete Delivery"
                            className="bg-accent text-notif text-lg p-4 rounded-lg font-medium"
                            onClick={() => updateOrderStatus("delivered")}
                            />   
                        </div>
                        
                    </div>             
                )}
                {orderStatus === "delivered" && (
                    <div>
                        <h2 className='text-xl font-normal text-p-button'>Order Details: #{orderNumber}</h2>
                        <p className='font-medium mt-2 text-n-n1'>Order #{orderNumber} was delivered to {customerName}, and your service was outstanding!</p>
                        <p className="font-medium mt-4 text-n-n2">Order Summary:</p>
                        <p className='text-n-n2'>Dish: {orderName}</p>
                        <p className='text-n-n2'>Quantity: {orderQuantity}x</p>
                        <p className='text-n-n2'>Total: £{orderPrice}</p>
                        <p className='text-n-n2'>Delivery Time: {deliveryTime}</p><br/>
                        <p className='text-n-n2'>Thank you for your commitment to great service!</p>
                        <div className='mt-4 flex justify-center'>
                            <Button
                            text="View Order History"
                            className="bg-accent text-notif text-lg p-4 rounded-lg font-medium"
                            />
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
        )
    ); 
};

export default OrderPopup;