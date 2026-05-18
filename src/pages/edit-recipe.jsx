import { useParams } from 'react-router-dom';
import RecipeForm from '../components/app/recipe-form';

export default function EditRecipe({ recipes, onEdit }) {
  const { id }   = useParams();
  const existing = recipes.find((d) => String(d.id) === String(id));
  return <RecipeForm onSubmit={onEdit} existingData={existing} />;
}
