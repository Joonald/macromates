interface IListProps {
  ingredients: string[];
  handleIngredientChange: (index: number, value: string) => void;
}

function IngredientList({ ingredients, handleIngredientChange }: IListProps) {
  return (
    <>
      <label
        htmlFor='ingredients'
        className='block mb-2 text-sm font-medium text-gray-900'>
        Ingredients
        {ingredients.map((ingredient, index) => (
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5'
            key={index}
            name='ingredients'
            type='text'
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
          />
        ))}
      </label>
    </>
  );
}

export default IngredientList;
