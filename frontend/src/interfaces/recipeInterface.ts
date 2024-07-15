export interface IRecipe {
  name: string;
  ingredients: string[];
  calories: number;
  total_fat: number;
  saturated_fat: number;
  cholesterol: number;
  sodium: number;
  carbohydrates: number;
  dietary_fiber: number;
  sugars: number;
  protein: number;
  _id: number;
  categories: string[];
  steps: string;
}

export interface RecipeContextType {
  recipeData: IRecipe[] | null;
  isLoading: boolean;
}
