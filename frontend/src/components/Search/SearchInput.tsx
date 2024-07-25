import React, { ChangeEvent, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../../contexts/recipes";
import { IRecipe } from "../../interfaces/recipe-interface";
import SearchList from "./SearchList";

function SearchInput() {
  const { recipeData } = useRecipes();
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (searchTerm === "") {
      setFilteredRecipes(undefined);
      return;
    }

    const filteredItems = recipeData?.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredItems !== undefined) {
      setFilteredRecipes(filteredItems);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`search/${search}`);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label
          htmlFor='search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only'>
          Search
        </label>
        <div className='relative'>
          <input
            value={search}
            onChange={handleInputChange}
            type='search'
            id='search'
            className='ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 relative w-4/5 z-2 h-7 bg-gray-200 focus:outline-2 focus:outline-primary-800 md:h-8 lg:h-10 p-1'
            placeholder='Search'
            required
          />
        </div>
      </form>
      <SearchList filteredRecipes={filteredRecipes} />
    </>
  );
}

export default SearchInput;
