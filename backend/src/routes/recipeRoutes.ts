import express from "express";
import {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeControllers";

const router = express.Router();

// Get All Recipe Route
router.route("/").get(getAllRecipes).post(createRecipe);
router.route("/:id").get(getRecipe).patch(updateRecipe).delete(deleteRecipe);

export default router;
