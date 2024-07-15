import React from "react";
// import { NavLink } from "react-router-dom";
import italianImage from "../../assets/images/italian-pasta-with-spinach-leaves-grated-cheese.jpg";
import chineseImage from "../../assets/images/chinese-dumplings.jpg";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

function Discover() {
  // const categories = [
  //   "Italian",
  //   "Mexican",
  //   "Chinese",
  //   "Indian",
  //   "Japanese",
  //   "Mediterranean",
  //   "French",
  //   "Thai",
  //   "Middle Eastern",
  //   "African",
  //   "American",
  //   "Latin American",
  //   "Breakfast",
  //   "Lunch",
  //   "Dinner",
  //   "Brunch",
  //   "Snacks",
  //   "Appetizers",
  //   "Desserts",
  //   "Side Dishes",
  //   "Beverages",
  // ];
  const categoryObj = [
    {
      name: "Italian",
      image: italianImage,
    },
    {
      name: "Chinese",
      image: chineseImage,
    },
  ];
  return (
    <main className='min-h-dvh p-4 font-poppins'>
      <h1 className='text-3xl font-medium text-center my-8'>
        Discover a new recipe.
      </h1>
      <section className='mx-auto md:flex md:gap-4'>
        {categoryObj.map((category) => {
          return (
            <CategoryCard
              name={category.name}
              image={category.image}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Discover;
