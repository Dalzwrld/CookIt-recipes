import { Copyright } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-row items-center justify-between">
        <span className="uppercase text-md font-medium">CookIt</span>
        <span className="uppercase">
            Images by
            <a href="https://unsplash.com/">Unsplash</a>
        </span>
        <span className="uppercase">
            <Copyright className="size-2" />
            2026. Built with React & Shadcn/ui.
        </span>
    </footer>
  )
}
