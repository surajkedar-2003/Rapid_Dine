import express from "express";
import {
  createFoodItem,
  listFoodItems,
  removeFood,
} from "../controllers/foodController.js";
import { upload } from "../middleware/upload.middleware.js";
 
const foodRouter = express.Router();

 

foodRouter.post("/add", upload.single("image"), createFoodItem);
foodRouter.get("/list", listFoodItems);
foodRouter.post("/remove", removeFood);

export default foodRouter;
