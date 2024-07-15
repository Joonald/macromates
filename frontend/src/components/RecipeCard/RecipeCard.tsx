import React from "react";
import { IRecipe } from "../../interfaces/recipeInterface";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }: { recipe: IRecipe }) {
  return (
    <>
      <section
        key={recipe._id}
        className='max-w-sm bg-white border border-gray-200 rounded-lg shadow mb-4 mx-auto'>
        <Link to={recipe._id.toString()}>
          <img
            className='rounded-t-lg'
            src='https://images.pexels.com/photos/8743917/pexels-photo-8743917.jpeg?auto=compress&cs=tinysrgb&w=800'
            alt='default image'
          />
        </Link>
        <section className='p-4'>
          <Link to={recipe._id.toString()}>
            <h2 className='mb-2'>{recipe.name}</h2>
          </Link>
          <h3 className='text-sm'>Nutrition Facts:</h3>
          <dl className='list-none flex flex-wrap items-center text-gray-700 mb-2 text-sm'>
            <dt className='me-2'>Calories: </dt>
            <dd className='me-2'>{recipe.calories}</dd>
            <dt className='me-2'>Fat: </dt>
            <dd className='me-2'>{recipe.total_fat}</dd>
            <dt className='me-2'>Carbs: </dt>
            <dd className='me-2'>{recipe.carbohydrates}</dd>
            <dt className='me-2'>Protein: </dt>
            <dd className='me-2'>{recipe.protein}</dd>
          </dl>
          <Link
            to={recipe._id.toString()}
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-800 rounded-lg hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-blue-300'>
            Explore{" "}
            <svg
              className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'>
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </Link>
        </section>
      </section>
    </>
  );
}

export default RecipeCard;
