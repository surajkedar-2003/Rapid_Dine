import { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ _id: id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  return (
     <div className="food-item w-full m-auto rounded-2xl shadow animate-fadeIn">
      <div className="food-item-img-container relative ">
        <img src={image} alt={name} className="rounded-t-xl w-full" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt="add"
            onClick={() => addToCart(id)}
            className="absolute bottom-3.5 right-3.5  w-8 rounded-full cursor-pointer"
          />
        ) : (
          <div className="absolute bottom-3.5 right-3.5  flex items-center gap-2.5 p-1.5 bg-white rounded-full">
            <img
              src={assets.remove_icon_red}
              alt="remove icon"
              onClick={() => removeFromCart(id)}
              className="w-8 cursor-pointer"
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add icon"
              onClick={() => addToCart(id)}
              className="w-8 cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="food-item-info p-3">
        <div className="food-item-name-rating flex justify-between items-center mb-2.5">
          <p className="font-semibold text-lg">{name}</p>
          <img src={assets.rating_starts} alt="star" className="w-16" />
        </div>
        <div className="foot-item-desc text-darkGray text-sm">
          {description}
        </div>
        <p className="text-tomato font-medium text-xl my-2.5">$ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
