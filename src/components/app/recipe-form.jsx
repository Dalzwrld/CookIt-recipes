import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus } from "lucide-react"

const CATEGORIES = ["Breakfast", "Pasta", "Curry", "Mexican", "Salad", "Soup", "Dessert", "Snack", "Other"]
const DIFFICULTIES = ["Easy", "Medium", "Hard"]

const defaultForm = {
  title: "",
  category: "",
  duration: "",
  servings: "",
  difficulty: "",
  description: "",
  image: "",
  ingredients: [],
  instructions: "",
}

export default function RecipeForm({ initialData, onSubmit, isEditing = false }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(defaultForm)
  const [ingredientInput, setIngredientInput] = useState("")
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const addIngredient = () => {
    const trimmed = ingredientInput.trim()
    if (!trimmed) return
    set("ingredients", [...form.ingredients, trimmed])
    setIngredientInput("")
  }

  const removeIngredient = (index) => {
    set("ingredients", form.ingredients.filter((_, i) => i !== index))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = "Title is required"
    if (!form.category) e.category = "Category is required"
    if (!form.difficulty) e.difficulty = "Difficulty is required"
    if (!form.duration || isNaN(form.duration)) e.duration = "Enter a valid duration"
    if (!form.servings || isNaN(form.servings)) e.servings = "Enter valid servings"
    if (!form.description.trim()) e.description = "Description is required"
    if (!form.instructions.trim()) e.instructions = "Instructions are required"
    if (form.ingredients.length === 0) e.ingredients = "Add at least one ingredient"
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitting(true)
    try {
      await onSubmit({ ...form, duration: Number(form.duration), servings: Number(form.servings) })
      navigate("/recipes")
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="gap-5 w-200">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="title">Recipe Title</Label>
            <Input
              id="title"
              placeholder="e.g. Spaghetti Carbonara"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              aria-invalid={!!errors.title}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v)}>
              <SelectTrigger aria-invalid={!!errors.category}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
          </div>

          {/* Difficulty */}
          <div className="space-y-1.5">
            <Label>Difficulty</Label>
            <Select value={form.difficulty} onValueChange={(v) => set("difficulty", v)}>
              <SelectTrigger aria-invalid={!!errors.difficulty}>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.difficulty && <p className="text-xs text-destructive">{errors.difficulty}</p>}
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="e.g. 30"
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
              aria-invalid={!!errors.duration}
            />
            {errors.duration && <p className="text-xs text-destructive">{errors.duration}</p>}
          </div>

          {/* Servings */}
          <div className="space-y-1.5">
            <Label htmlFor="servings">Servings</Label>
            <Input
              id="servings"
              type="number"
              placeholder="e.g. 4"
              value={form.servings}
              onChange={(e) => set("servings", e.target.value)}
              aria-invalid={!!errors.servings}
            />
            {errors.servings && <p className="text-xs text-destructive">{errors.servings}</p>}
          </div>

          {/* Image */}
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="image">Image URL <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input
              id="image"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A short description of the recipe..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={2}
              aria-invalid={!!errors.description}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="e.g. 200g spaghetti"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addIngredient() }}}
            />
            <Button type="button" variant="outline" size="icon" onClick={addIngredient}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {errors.ingredients && <p className="text-xs text-destructive">{errors.ingredients}</p>}
          <div className="flex flex-wrap gap-2 mb-2 min-h-8">
            {form.ingredients.map((ing, i) => (
              <Badge key={i} variant="secondary" className="gap-1 pr-1">
                {ing}
                <button type="button" onClick={() => removeIngredient(i)} className="hover:text-destructive transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Step-by-step instructions..."
            value={form.instructions}
            onChange={(e) => set("instructions", e.target.value)}
            rows={5}
            aria-invalid={!!errors.instructions}
          />
          {errors.instructions && <p className="text-xs text-destructive">{errors.instructions}</p>}
        </CardContent>
      </Card>

      <Separator />

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEditing ? "Update Recipe" : "Add Recipe"}
        </Button>
      </div>
    </form>
  )
}