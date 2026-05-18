import Search from "../components/app/search"
import RecipeList from "../components/app/recipe-list"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function Recipes({ recipes = [], categories = [], loading, deleteRecipe }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = recipes.filter((r) => {
    const matchesQuery =
      query === "" ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description?.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = category === 'All' || r.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">All Recipes</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {loading ? "Loading..." : `${filtered.length} recipe${filtered.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 mb-8">
        <Search
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />

        {/* Category Tabs */}
        <div className="overflow-x-auto pb-1">
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList className="w-max">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-xs">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Separator className="mb-8" />

      <RecipeList recipes={filtered} onDelete={deleteRecipe} loading={loading} />
    </div>
  )
}