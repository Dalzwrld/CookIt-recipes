import { renderHook, waitFor } from '@testing-library/react'
import { useRecipes } from '../useRecipes'

describe('useRecipes', () => {
  it('should fetch and return recipes', async () => {
    const { result } = renderHook(() => useRecipes())
    await waitFor(() => {
      expect(result.current.recipes).toBeDefined()
    })
  })
})