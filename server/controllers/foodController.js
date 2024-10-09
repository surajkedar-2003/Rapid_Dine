import foodModel from "../models/foodModel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name:  process.env.CLOUD_NAME,
  api_key:  process.env.API_KEY,
  api_secret:  process.env.API_SECRET,
});

// add food item
const createFoodItem = async (req, res) => {
   
  const result = await cloudinary.uploader.upload(req.file.path,{
    folder: "food-ordering-app",
    tags: "menu"
  });
   const image_filename = result.secure_url;


  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get all food list
const listFoodItems = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// delete food items
// TODO: test
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    
    const public_id = food.image.split("/").splice(-2).join("/").split(".")[0]
    await cloudinary.uploader.destroy(public_id);

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createFoodItem, listFoodItems, removeFood };

// 1. addFood = createFoodItem
// 2. list food = listFoodItems
// 3. removeFood = deleteFoodById
