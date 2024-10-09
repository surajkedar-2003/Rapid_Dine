import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import config from "../../config/config";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setToken } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let url = config.apiUrl + "/api/user";

    if (currentState === "Login") {
      url += "/login";
    } else {
      url += "/register";
    }
    try{
      const response = await axios.post(url, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(response.data.message)
      } 
    }catch(err){
      const errorMsg = err.response?.data?.message || "Server Error";
      toast.error(errorMsg);
    }
      
  };
 
  return (
    <div className="login-popup fixed z-10 w-full h-screen bg-[#00000090] grid">
      <form
        onSubmit={onLogin}
        className="login-popup-container place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-6 px-7 rounded-lg animate-fadeIn font-sm"
      >
        <div className="login-popup-title flex justify-between items-center text-black">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="close icon"
            onClick={() => setShowLogin(false)}
            className=" w-4 cursor-pointer"
          />
        </div>
        <div className="login-popup-inputs flex flex-col gap-5 ">
          {currentState === "SignUp" ? (
            <input
              type="text"
              placeholder="Your name"
              required
              name="name"
              className="outline-none border border-solid border-[#c9c9c9] p-2.5 rounded"
              onChange={onChangeHandler}
              value={data.name}
            />
          ) : null}
          <input
            type="email"
            placeholder="Your email"
            required
            name="email"
            className="outline-none border border-solid border-[#c9c9c9] p-2.5 rounded"
            onChange={onChangeHandler}
            value={data.email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            className="outline-none border border-solid border-[#c9c9c9] p-2.5 rounded"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>
        <button
          type="submit"
          className="border-none p-2.5 rounded text-white bg-tomato cursor-pointer text-base"
        >
          {currentState === "SignUp" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition flex  items-start gap-2  ">
          <input type="checkbox" id="terms" required className=" mt-2" />
          <label htmlFor="terms">
            I agree to the terms and conditions and privacy policy
          </label>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("SignUp")}
              className="text-tomato font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-tomato font-medium cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
