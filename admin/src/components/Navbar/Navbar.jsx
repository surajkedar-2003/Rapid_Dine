import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div>
      <div className="navbar flex justify-between items-center py-2 px-[4%]">
        <img src={assets.logo} alt="logo" className="logo w-[max(10%,80px)]"/>
        <img src={assets.profile_image} alt="profile" className="logo w-10 "/>
      </div>
    </div>
  );
};

export default Navbar;

// 41
