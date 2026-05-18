import RecipeForm from '../components/app/recipe-form';

export default function AddRecipe({ onAdd }) {
  return <RecipeForm onSubmit={onAdd} />;
}