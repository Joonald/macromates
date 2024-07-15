import React from "react";
import { useParams } from "react-router-dom";
import { useRecipes } from "../../contexts/recipes";
import Spinner from "../../components/Spinner";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import GridWrapper from "../../components/GridWrapper/GridWrapper";

function Category() {
  const { discId } = useParams();
  const { recipeData, isLoading } = useRecipes();

  if (!recipeData) {
    return (
      <main className='min-h-dvh p-4'>
        <h1>No data is availble at this current time.</h1>
      </main>
    );
  }

  const fileredArray = recipeData?.filter((recipe) => {
    if (discId !== undefined) {
      return recipe.categories.includes(discId);
    }
  });

  return (
    <main className='min-h-dvh p-4 font-poppins'>
      <h1>{discId}</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <GridWrapper
          children={fileredArray.map((recipe) => (
            <RecipeCard recipe={recipe} />
          ))}
        />
      )}
    </main>
  );
}

export default Category;
