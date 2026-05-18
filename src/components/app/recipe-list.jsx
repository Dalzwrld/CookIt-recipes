import RecipeCard from "./recipe-card"
import { Empty, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function RecipeList({ recipes, onDelete, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-4xl bg-muted animate-pulse h-72" />
        ))}
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <Empty className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <EmptyMedia className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <UtensilsCrossed className="w-7 h-7 text-muted-foreground" />
        </EmptyMedia>
        <EmptyDescription>
          <p className="font-heading font-medium text-foreground">No recipes found</p>
          <p className="text-sm text-muted-foreground mt-1">Try a different search or add a new recipe.</p>
        </EmptyDescription>
        <Link to="/add-recipe">
          <Button size="sm">Add your first recipe</Button>
        </Link>
      </Empty>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onDelete={onDelete} />
      ))}
    </div>
  )
}