import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RecipeList from "../components/app/recipe-list"

export default function Home({ recipes, loading, onDelete }) {
  const recent = recipes.slice(0, 3)

  return (
    <div className="flex flex-col">
      <section className="relative bg-muted/40 border-b border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
          <Badge variant="secondary" className="gap-1.5">
            Your personal recipe book
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-foreground max-w-2xl leading-tight">
            Cook something <span className="text-primary">delicious</span> today
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            Save, manage, and discover your favorite recipes — all in one place.
          </p>
          <div className="flex gap-3">
            <Link to="/recipes">
              <Button size="lg" className="gap-2">
                Browse Recipes <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/add-recipe">
              <Button size="lg" variant="outline">Add a Recipe</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-xl font-semibold">Recent Recipes</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Your latest additions</p>
          </div>
          <Link to="/recipes">
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
        <RecipeList recipes={recent} onDelete={onDelete} loading={loading} />
      </section>
    </div>
  )
}