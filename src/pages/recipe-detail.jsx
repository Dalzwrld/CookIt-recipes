import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Clock, Users, Pencil, Trash2, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

const difficultyColor = {
  Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Hard: "bg-red-100 text-red-700 border-red-200",
}

export default function RecipeDetail({ recipes, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const recipe = recipes.find((r) => String(r.id) === String(id))

  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return
    await deleteRecipe(Number(id))
    navigate("/recipes")
  }

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="font-heading text-xl font-medium">Recipe not found</p>
        <p className="text-muted-foreground text-sm mt-2">It may have been deleted or doesn't exist.</p>
        <Link to="/recipes" className="mt-6 inline-block">
          <Button variant="outline" className="gap-2 mt-4"><ArrowLeft className="w-4 h-4" /> Back to Recipes</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 w-full">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Hero Image */}
      {recipe.image && (
        <div className="rounded-4xl overflow-hidden h-64 sm:h-80 mb-8 bg-muted">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge variant="secondary">{recipe.category}</Badge>
            <Badge className={`border text-xs ${difficultyColor[recipe.difficulty] || ""}`}>{recipe.difficulty}</Badge>
          </div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">{recipe.title}</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{recipe.description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link to={`/recipes/${recipe.id}/edit`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
          </Link>
          <Button variant="destructive" size="sm" className="gap-1.5" onClick={handleDelete}>
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </Button>
        </div>
      </div>

      {/* Meta */}
      <div className="flex gap-6 text-sm text-muted-foreground mb-8">
        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {recipe.duration} minutes</span>
        <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {recipe.servings} servings</span>
        <span className="flex items-center gap-1.5"><ChefHat className="w-4 h-4" /> {recipe.difficulty}</span>
      </div>

      <Separator className="mb-8" />

      <div className="grid sm:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="sm:col-span-1">
          <h2 className="font-heading font-semibold text-base mb-4">Ingredients</h2>
          <Card>
            <CardContent className="py-4 px-5">
              <ul className="space-y-2">
                {recipe.ingredients?.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="sm:col-span-2">
          <h2 className="font-heading font-semibold text-base mb-4">Instructions</h2>
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line bg-muted/40 rounded-2xl p-5 border border-border">
            {recipe.instructions}
          </div>
        </div>
      </div>
    </div>
  )
}