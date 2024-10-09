import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL;
   

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 83.5,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 83.5,
      },
      quantity: 1,
    });
    const successUrl = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;
    const cancelUrl = `${frontend_url}/verify?success=false&orderId=${newOrder._id}`;

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      payment_method_types: ["card"],
      success_url:   successUrl,
      cancel_url:   cancelUrl,
    });
    return res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res
        .status(200)
        .json({ success: true, message: "Order placed successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(400).json({ success: false, message: "Order failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

// user orders for frontend

const userOrders = async (req,res)=>{
   try{
    const orders = await orderModel.find({userId:req.body.userId});
    return res.status(200).json({success:true, data:orders})
  }catch(err){
    console.error(err);
    return res.status(500).json({success:false, message:err});
  }

}

// Listing orders for admin panel
const listOrders =async (req,res) =>{
  try{
    const orders = await orderModel.find({});

    res.status(200).json({success:true, data:orders})

  }catch(err){
    console.error(err);
    return res.status(500).json({success:false, message:err});
  
  }

}
// api for updating order status
const updateStatus = async (req,res)=>{
  try{
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
    res.status(200).json({success:true, message:"Order status updated"})

  }catch(err){
    console.error(err);
    return res.status(500).json({success:false, message:err});
  }

}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
