import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="sidebar w-[18%] min-h-screen border border-t-0 border-[#a9a9a9]">
      <div className="sidebar-options pt-12 pl-[20%] flex flex-col gap-5">
        <NavLink
          to="/add"
          className={({ isActive }) => `
          ${isActive ? "bg-[#fff0ed] border border-tomato" : ""}
          sidebar-option flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5 rounded rounded-tl rounded-tr-none rounded-br-none rounded-bl cursor-pointer `}
        >
          <img src={assets.add_icon} alt="plus icon" />
          <p className="max-lg:hidden">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) => `
          ${isActive ? "bg-[#fff0ed] border border-tomato" : ""}
          sidebar-option flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5 rounded rounded-tl rounded-tr-none rounded-br-none rounded-bl cursor-pointer `}
        >
          <img src={assets.order_icon} alt="cart icon" />
          <p className="max-lg:hidden">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => `
          ${isActive ? "bg-[#fff0ed] border border-tomato" : ""}
          sidebar-option flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-2 px-2.5 rounded rounded-tl rounded-tr-none rounded-br-none rounded-bl cursor-pointer `}
        >
          <img src={assets.order_icon} alt=" icon" />
          <p className="max-lg:hidden">orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
