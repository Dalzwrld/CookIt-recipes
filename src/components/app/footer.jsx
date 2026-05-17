import { Copyright } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <div>
        <span className="uppercase">CookIt</span>
        <span className="uppercase">
            Images by
            <a href="">Unsplash</a>
        </span>
        <span className="uppercase">
            <Copyright className="size-2" />
            2026. Built with React.
        </span>
    </div>
  )
}
