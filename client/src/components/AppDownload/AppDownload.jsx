import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download m-auto mt-24 text-center text-2xl font-medium"  id="mobile-app">
      <p>
        For Better Experience Download <br /> Tomato App
      </p>
      <div className="platforms flex justify-center  gap-2.5 mt-10">
        <img src={assets.play_store} alt="play store image" className="cursor-pointer  w-28 min-w-36 transition hover:scale-105" />
        <img src={assets.app_store} alt="app store image" className="cursor-pointer  w-28 min-w-36 transition hover:scale-105" />
      </div>
    </div>
  );
};

export default AppDownload;
