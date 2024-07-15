import { RequestHandler } from "express";
import Recipe from "../models/recipeModels";

export const getAllRecipes: RequestHandler = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json({
      status: "Recipes was successfully fetched.",
      results: recipes.length,
      data: {
        recipes,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const getRecipe: RequestHandler = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json({
      status: "Recipe was successfully fetched.",
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
  next();
};

export const createRecipe: RequestHandler = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({
      status: "Recipe was successfully created.",
      data: {
        newRecipe,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
  next();
};

export const updateRecipe: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "Recipe was successfully updated.",
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
  next();
};

export const deleteRecipe: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Recipe.findByIdAndDelete(id);
    res.status(204).json({
      status: "Recipe was successfully deleted.",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
