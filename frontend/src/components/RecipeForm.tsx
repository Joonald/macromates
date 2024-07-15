// import { ChangeEvent, useState } from "react";
// import { IRecipe } from "../pages/Home";
// import IngredientList from "../components/IngredientList";
// import NutritionFacts from "./NutritionFacts";

// function RecipeForm() {
//   const [recipeData, setRecipeData] = useState<IRecipe>({
//     name: "",
//     ingredients: [""],

//       calories: 0,
//       total_fat: 0,
//       saturated_fat: 0,
//       cholesterol: 0,
//       sodium: 0,
//       total_carbohydrates: 0,
//       dietary_fiber: 0,
//       sugars: 0,
//       protein: 0,

//   });

//   function handleChange(event: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     setRecipeData({
//       ...recipeData,
//       [name]: value,
//     });
//   }
//   function handleNutritionFactsChange(event: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     setRecipeData({
//       ...recipeData,
//       nutrition_facts: {
//         ...recipeData
//         [name]: parseFloat(value) || 0,
//       },
//     });
//   }

//   function handleIngredientChange(index: number, value: string) {
//     const newRecipeData = { ...recipeData };
//     newRecipeData.ingredients[index] = value;
//     setRecipeData(newRecipeData);
//   }
//   function handleAddIngredient() {
//     const newRecipeData = { ...recipeData };
//     newRecipeData.ingredients.push("");
//     setRecipeData(newRecipeData);
//   }
//   console.log(recipeData);

//   return (
//     <form action=''>
//       <label
//         htmlFor='name'
//         className='block mb-2 text-sm font-medium text-gray-900'>
//         Recipe Name:
//         <input
//           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
//           type='text'
//           name='name'
//           id='name'
//           value={recipeData.name}
//           onChange={handleChange}
//         />
//       </label>
//       <IngredientList
//         handleIngredientChange={handleIngredientChange}
//         ingredients={recipeData.ingredients}
//       />
//       <button
//         type='button'
//         onClick={handleAddIngredient}>
//         Add Ingredient
//       </button>
//       <NutritionFacts
//         nutrition_facts={recipeData.nutrition_facts}
//         handleNutritionFactsChange={handleNutritionFactsChange}
//       />
//     </form>
//   );
// }
// export default RecipeForm;
