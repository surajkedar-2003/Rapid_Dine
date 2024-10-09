import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
const navigate = useNavigate();
  const navLinks = [
    {
      name: "Menu",
      link: "menu",
    },
    {
      name: "Contact us",
      link: "contact",
    },
  ];
  
  const logout = ()=>{
     localStorage.removeItem("token");
    setToken(null)
    navigate("/")

  }
  return (
    <div className=" pt-5 flex justify-between items-center  ">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-20 md:w-24 lg:w-36" />
      </Link>
      <ul className="flex gap-5 cursor-pointer text-link text-sm lg:text-lg max-md:hidden">
        {/* Nav link generate using map function */}
        <Link to="/">Home</Link>
        {navLinks.map((link, index) => (
          <a
            href={`#${link.link}`}
            key={index}
            onClick={() => setMenu(link.link)}
            className={
              menu === link.link
                ? "pb-0.5 border-b border-solid border-link"
                : ""
            }
          >
            {link.name}
          </a>
        ))}
      </ul>
      <div className="flex items-center gap-5 lg:gap-10">

        <div className="flex justify-between items-center gap-5">
          <input type="text" placeholder="search" className="border outline-none px-4 py-2 rounded-2xl" />
          <img src={assets.search_icon} alt="search-icon" className="w-5" />
        </div>
        
        <div className="relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" className="w-5" />
          </Link>
          <div
            className={` ${
              getTotalCartAmount() !== 0
                ? "dot absolute min-w-[10px] min-h-[10px] bg-tomato rounded-md -top-2 -right-2"
                : ""
            }`}
          ></div>
        </div>
        {!token ? (
          <button
            className="bg-transparent text-link text-base border border-solid border-tomato py-2 px-5  lg:py-2.5 lg:px-7 rounded-[50px] duration-300 hover:bg-[#fff4f2]"
            onClick={() => setShowLogin(true)}
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile relative group ">
            <img
              src={assets.profile_icon}
              alt="profile icon"
              className="cursor-pointer transition-all"
            />
            <ul className="nav-profile-dropdown m-auto">
              <li onClick={()=>navigate("/myorders")} className="flex gap-2.5 items-center cursor-pointer hover:text-tomato">
                <img src={assets.bag_icon} alt="icon" className="w-5" />
                <p>Orders</p>
              </li>
              <hr className="h-[1px] w-full bg-black" />
              <li
                className="flex gap-2.5 items-center cursor-pointer hover:text-tomato"
                onClick={logout}
              >
                <img src={assets.logout_icon} alt="icon" className="w-5" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
