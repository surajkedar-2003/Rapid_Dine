import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Loader from "../Loader/Loader";

const FoodDisplay = ({ category }) => {
  const { food_list,loading } = useContext(StoreContext);

  if (loading) {
    return  <Loader />
  }
  return (
    <div id="food-display" className="food-display mt-8">
      <h2 className="text-3xl font-semibold">Top dishes near you</h2>
      <div className="food-display-list grid mt-4 lg:p-8   gap-5  md:grid-cols-3 lg:grid-cols-4">
        {food_list.map((item, index) => {
          if (category === "all" || category === item.category) {
            return <FoodItem key={index} {...item} />;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
