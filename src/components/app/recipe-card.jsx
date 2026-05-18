import { Link } from "react-router-dom"
import { Clock, Users, Trash2, Pencil } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const difficultyColor = {
  Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Hard: "bg-red-100 text-red-700 border-red-200",
}

export default function RecipeCard({ recipe, onDelete }) {
  return (
    <Card className="group overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative overflow-hidden h-44 bg-muted">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className={`text-xs font-medium border ${difficultyColor[recipe.difficulty] || ""}`}>
            {recipe.difficulty}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug line-clamp-1">{recipe.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0 text-xs">{recipe.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2 text-xs">{recipe.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 mt-auto">
        <Separator />
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {recipe.duration} mins
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {recipe.servings} servings
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/recipes/${recipe.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs">View Recipe</Button>
          </Link>
          <Link to={`/edit-recipe/${recipe.id}`}>
            <Button variant="ghost" size="icon-sm">
              <Pencil className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(recipe.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}