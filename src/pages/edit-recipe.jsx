import { useParams } from 'react-router-dom'
import RecipeForm from '../components/app/recipe-form'

export default function EditRecipe({ recipes = [], onEdit }) {
  const { id } = useParams()
  const existing = recipes.find((r) => String(r.id) === String(id))

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Edit Recipe</h1>
        {existing && (
          <p className="text-muted-foreground mt-1 text-sm">Updating "{existing.title}"</p>
        )}
      </div>
      <RecipeForm onSubmit={onEdit} initialData={existing} isEditing />
    </div>
  )
}
