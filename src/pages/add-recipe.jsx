import RecipeForm from '../components/app/recipe-form'

export default function AddRecipe({ onAdd }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Add Recipe</h1>
        <p className="text-muted-foreground mt-1 text-sm">Fill in the details to save a new recipe.</p>
      </div>
      <RecipeForm onSubmit={onAdd} />
    </div>
  )
}
