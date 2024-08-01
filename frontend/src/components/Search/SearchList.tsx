import React from "react";
import { IRecipe } from "../../interfaces/RecipeInterfaces";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
type SearchListProp = {
  filteredRecipes: IRecipe[] | undefined;
};

function SearchList({ filteredRecipes }: SearchListProp) {
  return (
    <article className='bg-primary-400 relative top-0.5 w-4/5 mx-auto'>
      {filteredRecipes?.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredRecipes?.map((recipe) => (
            <li
              className='text-left pl-4 py-4'
              key={recipe._id}>
              <Link to={recipe._id.toString()}>
                <p>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <span className='ml-4'>{recipe.name}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default SearchList;
