import { NavLink } from "react-router-dom"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <span className="font-semibold text-lg tracking-tight font-[Playfair_Display]"><span className="text-primary">Cook</span>It</span>
        </NavLink>

        <nav className="hidden sm:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/recipes" className={navLinkClass}>Recipes</NavLink>
        </nav>

        <NavLink to="/add-recipe">
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            Add Recipe
          </Button>
        </NavLink>
      </div>
      <Separator />
    </header>
  )
}