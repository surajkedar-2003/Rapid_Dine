import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 p-5 pt-20 mt-20"
    >
      <div className="footer-content w-full gap-10 lg:gap-20 grid lg:grid-cols-3">
        <div className="left lg:col-span-1   flex flex-col items-start ">
          <img src={assets.logo} alt="logo" />
          <p className="mt-3">
            Delicious meals delivered straight to your door. Experience the
            taste of convenience with our wide range of cuisines and easy online
            ordering. Satisfaction guaranteed with every bite!
          </p>

          <div className="social-icons flex justify-start items-center gap-5 mt-3">
            <img
              src={assets.facebook_icon}
              alt="facebook icon"
              className="w-8 cursor-pointer"
            />
            <img src={assets.twitter_icon} alt="twitter icon" className="w-8 cursor-pointer" />
            <img
              src={assets.linkedin_icon}
              alt="linkedin icon"
              className="w-8 cursor-pointer"
            />
          </div>
        </div>
        <div className="center flex flex-col items-start gap:2">
          <h2 className="font-semibold lg:text-xl border-b mb-2 text-white uppercase">
            Company
          </h2>
          <ul>
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Delivery </li>
            <li className="cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div className="right flex flex-col items-start gap-2 ">
          <h2 className="font-semibold lg:text-xl border-b mb-2 text-white uppercase">
            Get in touch
          </h2>
          <ul>
            <li>+91 6673432178</li>
            <li>example@rapid_dine.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full  my-2 bg-darkGray" />
      <p className="copyright">
        Copyright 2024 &copy; 
        <a href="https://rijoksd.netlify.app" target="_blank">
           {" "}Suraj Kedar
        </a>{" "}
        - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

// 1:59

