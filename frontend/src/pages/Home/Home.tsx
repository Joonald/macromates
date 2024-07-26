import Spinner from "../../components/Spinner";
import { useRecipes } from "../../contexts/recipes";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Search from "../../components/Search/SearchInput";
import GridWrapper from "../../components/GridWrapper/GridWrapper";

function Home() {
  const { recipeData, isLoading } = useRecipes();

  if (!recipeData) {
    return (
      <div>
        <h1>No data is availble at this current time.</h1>
      </div>
    );
  }

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const date = new Date();
  const formattedDate = formatDate(date);

  return (
    <main className='font-poppins min-h-dvh'>
      <section className='text-center relative w-full h-80 bg-primary-800 p-2'>
        <h1 className='mt-16 mb-4 text-3xl font-medium text-white lg:text-4xl'>
          Find your next recipe idea.
        </h1>
        <Search />
      </section>
      <section className='mt-8 mb-2 mx-4'>
        <p className='text-center mb-2'>{formattedDate}</p>
        <h2 className='text-2xl text-center mb-6'>Daily MacroMates</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <GridWrapper
            children={recipeData.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
              />
            ))}
          />
        )}
      </section>
    </main>
  );
}

export default Home;
