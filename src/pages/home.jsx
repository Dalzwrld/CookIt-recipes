import { Link } from "react-router-dom"
import { ArrowRight, UtensilsCrossed, Clock, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import RecipeList from "../components/app/recipe-list"
// import { useRecipes } from "../hooks/useRecipes"
// import { useSearch } from "../hooks/useSearch"

export default function Home() {
  const { recipes, loading, deleteRecipe } = useRecipes()
  const { filtered } = useSearch(recipes)
  const recent = filtered.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-muted/40 border-b border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
          <Badge variant="secondary" className="gap-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5" />
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

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, label: "Recipes saved", value: recipes.length },
            { icon: Clock, label: "Avg. cook time", value: recipes.length ? `${Math.round(recipes.reduce((a, r) => a + r.duration, 0) / recipes.length)} min` : "—" },
            { icon: UtensilsCrossed, label: "Categories", value: [...new Set(recipes.map((r) => r.category))].length },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label} className="sm:last:col-span-1 col-span-1 last:col-span-2">
              <CardContent className="flex items-center gap-4 py-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-semibold">{loading ? "—" : value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Recipes */}
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
        <RecipeList recipes={recent} onDelete={deleteRecipe} loading={loading} />
      </section>
    </div>
  )
}