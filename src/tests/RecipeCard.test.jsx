import { render, screen } from '@testing-library/react'
import RecipeCard from '../RecipeCard'

const mockRecipe = {
  id: 1,
  title: 'Spaghetti Carbonara',
  category: 'Pasta',
  duration: 30,
  servings: 2,
}

describe('RecipeCard', () => {
  it('should render recipe title', () => {
    render(<RecipeCard recipe={mockRecipe} />)
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument()
  })

  it('should render category badge', () => {
    render(<RecipeCard recipe={mockRecipe} />)
    expect(screen.getByText('Pasta')).toBeInTheDocument()
  })
})