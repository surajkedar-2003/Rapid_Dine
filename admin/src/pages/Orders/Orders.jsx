import { useState } from "react";
import config from "../../config/config";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import Loader from "../../components/Loader/Loader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAllOrders = async () => {
    const response = await axios.get(`${config.apiUrl}/api/order/list`);

    if (response.data.success) {
      setOrders(response.data.data);
      setLoading(false);
    } else {
      console.error(response.data.message);
    }
  };
  const statusHandler = async (e, orderId) => {
    const status = e.target.value;
    const response = await axios.post(`${config.apiUrl}/api/order/status`, {
      orderId,
      status,
    });
    if (response.data.success) {
      fetchAllOrders();
    } else {
      console.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="order add">
      <h3 className="text-lg font-semibold p-2">Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div
            key={index}
            className="order-item grid max-lg:py-6 max-lg:px-3 max-lg:text-sm grid-cols-4 lg:grid-cols-6 items-start gap-8 border border-tomato p-5 my-7 text-[#505050]"
          >
            <img src={assets.parcel_icon} alt="parcel icon" />
            <div className=" col-span-2">
              <p className="order-item-food font-semibold ">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + "x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name font-semibold mt-5 mb-2">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address mb-2.5">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>$ {order.amount}</p>
            <select
              className="bg-[#ffe8e4] border border-tomato w-[max(10vw,120px)] p-2.5 outline-none "
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
