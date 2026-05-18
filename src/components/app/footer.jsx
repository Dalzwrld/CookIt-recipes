import { UtensilsCrossed } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <Separator />
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <UtensilsCrossed className="w-4 h-4" />
          <span className="text-sm font-medium">CookIt</span>
        </div>
        <p className="text-xs text-muted-foreground">
          A recipe book built with React & shadcn/ui
        </p>
      </div>
    </footer>
  )
}