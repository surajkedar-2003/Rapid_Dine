import { useEffect, useState } from "react";
import config from "../../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    const response = await axios.get(`${config.apiUrl}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      setLoading(false);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
     fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${config.apiUrl}/api/food/remove`,{id: foodId});
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    await fetchList();
    

  }

  if(loading){
    return <Loader />
  }
  return (
    <div className="list add flex flex-col gap-2.5  ml-6 mt-12 w-full">
      <p> All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title   grid-cols-5 items-center gap-2.5 p-3 border border-[#cacaca] bg-[#f9f9f9] hidden lg:grid">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong>Action</strong>
        </div>
        {list.map((item) => (
          <div
            key={item._id}
            className="list-table-format grid grid-cols-3 md:grid-cols-5 items-center gap-5 max-md:justify-end md:gap-2.5 p-3 border border-[#cacaca]  "
          >
            <img src={item.image} alt={item.name} className="w-12" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p className="max-md:justify-self-end max-md:col-span-2">
              $ {item.price}
            </p>
            <button
              onClick={() => removeFood(item._id)}
              className="cursor-pointer text-red-400 max-md:justify-self-center"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
