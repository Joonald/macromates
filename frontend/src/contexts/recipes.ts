import { createContext, useContext } from "react";
import { RecipeContextType } from "../interfaces/recipeInterface";

export const RecipeContext = createContext<RecipeContextType>({
  recipeData: [
    {
      name: "",
      ingredients: [""],
      calories: 0,
      total_fat: 0,
      saturated_fat: 0,
      cholesterol: 0,
      sodium: 0,
      carbohydrates: 0,
      dietary_fiber: 0,
      sugars: 0,
      protein: 0,
      _id: 0,
      categories: [""],
      steps: "",
    },
  ],
  isLoading: true,
});
export const RecipeProvider = RecipeContext.Provider;

export function useRecipes() {
  return useContext(RecipeContext);
}
