import { ChangeEvent } from "react";

interface INutritionFacts {
  nutrition_facts: {
    calories: number;
    total_fat: number;
    saturated_fat: number;
    cholesterol: number;
    sodium: number;
    total_carbohydrates: number;
    dietary_fiber: number;
    sugars: number;
    protein: number;
  };
  handleNutritionFactsChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function NutritionFacts({
  nutrition_facts,
  handleNutritionFactsChange,
}: INutritionFacts) {
  //    creating an array to allow for mapping with object keys
  const nutritionFacts = Object.keys(nutrition_facts);

  //   creating a function to capitalize words and remove _
  function capitalizeWords(str: string) {
    return str.replace(/_/g, " ").replace(/\b\w/g, function (char: string) {
      return char.toUpperCase();
    });
  }
  return (
    <>
      <h3>Nutrition Facts</h3>
      {nutritionFacts.map((nutrition, i) => (
        <label
          key={i}
          htmlFor={nutrition}
          className='inline mb-2 text-sm font-medium text-gray-900'>
          {capitalizeWords(nutrition)}
          <input
            defaultValue={nutrition}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5'
            type='number'
            name={nutrition}
            id={nutrition}
            onChange={handleNutritionFactsChange}
          />
        </label>
      ))}
    </>
  );
}

export default NutritionFacts;
