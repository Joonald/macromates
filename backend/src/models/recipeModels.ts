import mongoose from "mongoose";
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "All recipes must have a name."],
    trim: true,
    minLength: [5, "Recipe names must be greater than 5 characters."],
  },
  ingredients: {
    type: [String],
    required: [true, "All recipes must have at least one ingredient."],
  },
  calories: {
    type: Number,
    required: [true, "Please enter the calories."],
    min: 0,
  },
  total_fat: {
    type: Number,
    required: [true, "Please enter the total fat."],
    min: 0,
  },
  saturated_fat: {
    type: Number,
    min: 0,
  },
  cholesterol: {
    type: Number,
    min: 0,
  },
  sodium: {
    type: Number,
    min: 0,
  },
  carbohydrates: {
    type: Number,
    required: [true, "Please enter the carbs."],
    min: 0,
  },
  fiber: {
    type: Number,
    min: 0,
  },
  sugars: {
    type: Number,
    min: 0,
  },
  protein: {
    type: Number,
    required: [true, "Please enter the proteins."],
    min: 0,
  },
  categories: {
    type: [String],
    enum: [
      // Cuisine Types
      "Italian",
      "Mexican",
      "Chinese",
      "Indian",
      "Japanese",
      "Mediterranean",
      "French",
      "Thai",
      "Middle Eastern",
      "African",
      "American",
      "Latin American",
      // Meal Types
      "Breakfast",
      "Lunch",
      "Dinner",
      "Brunch",
      "Snacks",
      "Appetizers",
      "Desserts",
      "Side Dishes",
      "Beverages",
      // // Dietary Preferences
      // "Vegetarian",
      // "Vegan",
      // "Gluten-Free",
      // "Dairy-Free",
      // "Low-Carb",
      // "Keto",
      // "Paleo",
      // "Halal",
      // "Kosher",
      // // Cooking Methods
      // "Baking",
      // "Grilling",
      // "Slow Cooking",
      // "Pressure Cooking",
      // "Stir-Frying",
      // "Steaming",
      // "Roasting",
      // "Smoking",
      // "Sous Vide",
      // "Raw",
      // // Healthy Eating
      // "Low-Calorie",
      // "High-Protein",
      // "Heart-Healthy",
      // "Diabetic-Friendly",
      // "Low-Sodium",
      // "Immune-Boosting",
      // "Detox",
      // // Quick & Easy
      // "15-Minute Recipes",
      // "30-Minute Meals",
      // "One-Pot Dishes",
      // "5 Ingredients or Less",
      // "No-Cook Recipes",
      // // Budget-Friendly
      // "Cheap Eats",
      // "Leftover Magic",
      // "Meal Prep",
      // "Pantry Staples",
      // // Special Diets
      // "Weight Loss",
      // "Muscle Gain",
      // "Detox",
      // "Gut Health",
    ],
    required: [true, "Please enter atleast one category."],
  },
  steps: {
    type: String,
    required: [true, "Please provide the cooking instructions."],
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
