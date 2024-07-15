import React from "react";
import { NavLink } from "react-router-dom";

type CategoryCardProps = {
  name: string;
  image: string;
};

function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <section className='relative my-8 text-white h-52'>
      <NavLink to={name}>
        <div className='absolute z-10 bg-gray-800/50 w-full h-full rounded-3xl'>
          <div className='relative left-6 top-2/4'>
            <h2 className='font-medium text-2xl'>{name}</h2>
            <button className='px-4 py-2 mt-4 bg-gray-200 rounded-3xl text-gray-800'>
              Explore
            </button>
          </div>
        </div>
        <div className='h-full w-full'>
          <img
            src={image}
            alt={image}
            className='rounded-3xl z-0 object-cover w-full h-full'
          />
        </div>
      </NavLink>
    </section>
  );
}

export default CategoryCard;
