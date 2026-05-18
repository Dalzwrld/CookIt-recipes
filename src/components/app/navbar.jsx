import { NavLink } from "react-router-dom"
import { UtensilsCrossed, Plus } from "lucide-react"
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
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-semibold text-lg tracking-tight">CookIt</span>
        </NavLink>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/recipes" className={navLinkClass}>Recipes</NavLink>
        </nav>

        {/* CTA */}
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