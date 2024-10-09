import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, removeFromCart, cartItems, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="cart mt-24">
      <div className="cart-items">
        <div className="cart-items-title grid grid-cols-6 items-center text-darkGray">
          <p className="max-md:text-[12px]">Items</p>
          <p className="max-md:text-[12px]">Title</p>
          <p className="max-md:text-[12px]">Price</p>
          <p className="max-md:text-[12px]">Quantity</p>
          <p className="max-md:text-[12px]">Total</p>
          <p className="max-md:text-[12px]">Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item my-2.5 text-black  grid max-md:grid-cols-7 grid-cols-6 items-center ">
                  <img src={item.image} alt={item.title} className="w-14 " />
                  <p className="max-md:text-sm max-md:col-span-2">
                    {item.name}
                  </p>
                  <p className="max-md:text-sm">$ {item.price}</p>
                  <p className="max-md:text-sm">{cartItems[item._id]}</p>
                  <p className="max-md:text-sm">
                    $ {item.price * cartItems[item._id]}
                  </p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cursor-pointer text-red-500"
                  >
                    X
                  </p>
                </div>
                <hr className="bg-[#e2e2e2]  h-[1px] border-none" />
              </div>
            );
          }
        })}
      </div>

      {/*  cart bottom section */}
      <div className="cart-bottom mt-20 flex max-md:flex-col-reverse justify-between gap-5">
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
              <strong> $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</strong>
            </div>
          </div>
          <button
            className="border-none bg-tomato text-white py-3 rounded cursor-pointer"
            onClick={() => navigate("/order")}
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promo-code flex-1 ">
          <div>
            <p className="text-[#555]">
              If you have a promo code, Enter it here
            </p>
            <div className="cart-promo-code-input mt-2.5 flex justify-between items-baseline bg-[#eaeaea] rounded">
              <input
                type="text"
                placeholder="Promo code"
                className="bg-transparent border-none outline-none pl-2.5"
              />
              <button className="w-36 py-3 px-1 rounded border-none text-white bg-black">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
