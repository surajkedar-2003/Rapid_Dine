import { useNavigate, useSearchParams } from "react-router-dom";
import config from "../../config/config";
import axios from "axios";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  console.log(orderId);
  const url = config.apiUrl;

  const verifyPayment = async () =>{

    const response = await axios.post(`${url}/api/order/verify`,{success,orderId});
    if(response.data.success){
      console.log("Payment Verified");
        navigate("/myorders");
    }
    else{
        console.log("Payment Failed");
        navigate("/");
    }
  }


  useEffect(()=>{
    verifyPayment();
  },[])
  return (
    <div className="verify min-h-[60vh] grid ">
      <div className="spinner w-20 h-20 place-self-center border-4 animate-spin border-[#bdbdbd] border-t-tomato rounded-full">
       
      </div>
    </div>
  );
};

export default Verify;
