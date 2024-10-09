import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // form submission
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    const response = await axios.post(
      `${config.apiUrl}/api/order/place`,
      orderData,
      {
        headers: {
          token,
        },
      }
    );
    if (response.data.success) {
      const {session_url } = response.data;
      window.location.replace(session_url);
      
    }
    else{
      alert("Order Failed")
    }
  };

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[token])
  return (
    <form
      onSubmit={placeOrder}
      className="place-order flex max-md:flex-col items-start justify-between gap-4 mt-24"
    >
      <div className="place-order-left w-full max-w-[max(30%,500px)]   ">
        <p className="title text-3xl font-semibold mb-12">
          Delivery Information
        </p>
        <div className="multi-fields flex gap-2.5 ">
          <input
            type="text"
            placeholder="First Name"
            className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          placeholder="Street"
          className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />

        <div className="multi-fields flex gap-2.5 ">
          <input
            type="text"
            placeholder="City"
            className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
            name="city"
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="multi-fields flex gap-2.5 ">
          <input
            type="text"
            placeholder="Zip Code"
            className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
            name="zipCode"
            value={data.zipCode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          className="mb-4 w-full  p-2.5 border border-[#c5c5c5] rounded outline-tomato"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="place-order-right w-full max-w-[max(40%,500px)]">
        <div className="cart-total flex-1 flex flex-col gap-5 ">
          <h2 className="font-semibold text-xl">Cart Totals</h2>
          <div>
            <div className="cart-total-details flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr className="my-2.5 " />
            <div className="cart-total-details flex  justify-between text-[#555]">
              <p>Delivery Fee</p>
              <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className="my-2.5 " />
            <div className="cart-total-details flex justify-between text-[#555]">
              <strong>Total</strong>
              <strong>
                {" "}
                $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </strong>
            </div>
          </div>
          <button
            type="submit"
            className="border-none bg-tomato text-white py-3 px-7 rounded cursor-pointer mt-4"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
