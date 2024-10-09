import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });
    return res
      .status(200)
      .json({ success: true, message: "Item added to cart" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    // if (cartData[req.body.itemId] === 1) {
    //   delete cartData[req.body.itemId];
    //   await userModel.findByIdAndUpdate(req.body.userId, {
    //     cartData: cartData,
    //   });
    //   return res
    //     .status(200)
    //     .json({ success: true, message: " Item removed from cart" });
    // }
    // if (!cartData[req.body.itemId]) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Item not found in cart" });
    // }

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: cartData,
    });
    return res
      .status(200)
      .json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);

        const cartData = await userData.cartData;

        return res.status(200).json({ success: true, cartData: cartData });
 
    }catch(err){
        console.error(err);
        return res
            .status(500)
            .json({success:false, message:"Internal server error"})
    
    }
};

export { addToCart, removeFromCart, getCart };
