import { useContext, useEffect, useState } from "react"
import config from "../../config/config";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
 
const MyOrders = () => {

    const [data,setData] =  useState([]);
    const {token } = useContext(StoreContext);

    const fetchOrders = async ()=>{
        const response = await axios.post(`${config.apiUrl}/api/order/userorders`,{},{
            headers:{token}
        })
        setData(response.data.data);
    }

    useEffect(() => {
        if(token){
            fetchOrders()
        }
        
    }, [token])
  return (
    <div className="my-orders my-12">
      <h2>My Orders</h2>
      <div className="container flex flex-col gap-5 mt-7">
        {data.map((order, index) => (
          <div
            className="my-orders-order max-md:text-[12px] grid grid-cols-4 lg:grid-cols-8 items-center gap-5 py-2.5 px-5 border text-[#454545] border-tomato rounded "
            key={index}
          >
            <img src={assets.parcel_icon} alt="parcel icon" className="w-12" />
            <p className="col-span-2">
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ",";
                }
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p className="col-span-2">
              <span className="text-tomato">&#x25cf; </span>
              <strong className="font-medium text-[#454545]">{order.status}</strong>
            </p>
            <button className="py-3 rounded bg-[#ffe1e1] cursor-pointer text-[#454545] max-md:text-[10px]" onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders
