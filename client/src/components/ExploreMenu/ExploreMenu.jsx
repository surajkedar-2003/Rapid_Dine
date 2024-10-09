import { menu_list } from "../../assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  const filterCategory = (menuName) => () => {
    setCategory((prev) => (prev === menuName ? "all" : menuName));
  };
  return (
    <div className="explore-menu flex flex-col gap-5" id="menu">
      <h1 className="text-[#262626] font-medium text-lg">Explore our menu</h1>
      <p className="lg:w-3/5 text-[#808080]">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining
        experience,one delicious meal at a time.
      </p>
      <div className="explore-menu-list flex justify-between items-center gap-5 lg:gap-7 text-center my-5 mx-0 overflow-x-scroll">
        {menu_list.map((item, index) => (
          <div
            onClick={filterCategory(item.menu_name)}
            className="menu-list-item "
            key={index}
          >
            <img
              src={item.menu_image}
              alt="menu"
              className={`w-[7.5vw] min-w-[70px] lg:min-w-[80px] cursor-pointer rounded-full transition ${
                category === item.menu_name ? "border-2 border-tomato p-1" : ""
              }`}
            />
            <p className="text-lightGray mt-2.5 cursor-pointer">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-2.5 mx-0 h-0.5 bg-[#e2e2e2]" />
    </div>
  );
};

export default ExploreMenu;
