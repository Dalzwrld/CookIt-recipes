import { renderHook } from '@testing-library/react'
import { useSearch } from '../useSearch'

describe('useSearch', () => {
  const mockRecipes = [
    { id: 1, title: 'Spaghetti Carbonara', category: 'Pasta' },
    { id: 2, title: 'Chicken Curry', category: 'Curry' },
  ]

  it('should filter recipes by search term', () => {
    const { result } = renderHook(() => useSearch(mockRecipes))
    result.current.setQuery('chicken')
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].title).toBe('Chicken Curry')
  })

  it('should return all recipes when query is empty', () => {
    const { result } = renderHook(() => useSearch(mockRecipes))
    expect(result.current.filtered).toHaveLength(2)
  })
})