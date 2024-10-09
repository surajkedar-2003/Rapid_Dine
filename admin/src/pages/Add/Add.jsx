import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async(e)=>{
    e.preventDefault()

    const formData =  new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("category", data.category)
    formData.append("price", Number(data.price));
    formData.append("image", image);

    setLoading(true)
    const response = await axios.post(`${config.apiUrl}/api/food/add`, formData);
    if(response.data.success){
       setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      })
      setImage(false)
      setLoading(false)
      toast.success(response.data.message)
    }else{
       setLoading(false)
      toast.error(response.data.message)
    }
    
  }

  return (
    <div className="add w-3/4 ml-6 mt-12 text-[#6d6d6d] ">
      <form onSubmit={onSubmitHandler} className="  gap-5 flex flex-col ">
        <div className="add-image-upload   flex flex-col gap-2.5">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="cloud image"
              className="w-28"

            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            name="image"

          />
        </div>
        <div className="add-product-name   flex flex-col gap-2.5 max-w-[max(40%,280px)]">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="p-2.5 border rounded-sm"
            onChange={onChangeHandler}
            value={data.name}
            required
          />
        </div>
        <div className="add-product-description   flex flex-col gap-2.5 max-w-[max(40%,280px)]">
          <p>Product description</p>
          <textarea
            name="description"
            rows={6}
            placeholder="Write content here"
            required
            className="p-2.5 border rounded-sm"
            onChange={onChangeHandler}
            value={data.description}
          ></textarea>
        </div>
        <div className="add category-price flex gap-7">
          <div className="add-category   flex flex-col gap-2.5">
            <p>Product category</p>
            <select
              name="category"
              className="max-w-28 p-2.5 border rounded-sm"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price   flex flex-col gap-2.5">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              className="max-w-28 p-2.5 border rounded-sm"
              onChange={onChangeHandler}
              value={data.price}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="add-btn max-w-28 border-none p-2.5 bg-black text-white cursor-pointer"
          disabled={loading}
           
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;
