import React from "react";
import { useParams } from "react-router-dom";
import { useRecipes } from "../../contexts/recipes";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import GridWrapper from "../../components/GridWrapper/GridWrapper";

function SearchResult() {
  const { searchId } = useParams();
  const { recipeData } = useRecipes();

  const searchResults = recipeData?.filter((recipe) => {
    if (searchId !== undefined) {
      return recipe.name.includes(searchId);
    }
  });

  return (
    <main className='min-h-dvh p-4 font-poppins'>
      <h2 className='mb-4 text-lg'>Showing search results for "{searchId}".</h2>
      <GridWrapper
        children={searchResults?.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
          />
        ))}
      />
    </main>
  );
}

export default SearchResult;
