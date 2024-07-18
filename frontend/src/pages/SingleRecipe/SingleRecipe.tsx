import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { recipeURL } from "../../utils/globalVar";
import { IRecipe } from "../../interfaces/recipe-interface";
import Spinner from "../../components/Spinner";

function SingleRecipe() {
  const [recipe, setRecipe] = useState<IRecipe>({
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
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { recipeId } = useParams();

  const singleRecipeUrl = recipeURL + `/${recipeId}`;

  useEffect(() => {
    axios.get(singleRecipeUrl).then((response) => {
      const result = response.data.data.recipe;
      setRecipe(result);
      setIsLoading(false);
    });
  }, [singleRecipeUrl, recipeId]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main className='min-h-dvh'>
          <section>
            <h1>{recipe.name}</h1>
          </section>
        </main>
      )}
    </>
  );
}

export default SingleRecipe;
