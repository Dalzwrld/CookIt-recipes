import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/app/navbar'
import Footer from './components/app/footer'
import Home from './pages/home'
import Recipes from './pages/recipes'
import AddRecipe from './pages/add-recipe'
import EditRecipe from './pages/edit-recipe'

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setRecipes)
      .catch(() => setError('Could not connect to the server.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(formData) {
    const res = await fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Failed to add');
    const newRecipe = await res.json();
    setRecipes((prev) => [...prev, newRecipe]);
  }

  async function handleEdit(formData) {
    const res = await fetch(`${'http://localhost:3000/recipes'}/${formData.id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Failed to update');
    const updated = await res.json();
    setRecipes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  async function handleDelete(id) {
    const res = await fetch(`${'http://localhost:3000/recipes'}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="font-[Inter] italic text-[#6b8fa8] text-[16px]">
          Loading your recipes…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen px-10 text-center">
        <div>
          <p className="font-[Playfair_Display] text-[13px] tracking-[0.2em] text-[#A32D2D] mb-3">
            CONNECTION ERROR
          </p>
          <p className="text-[#6b8fa8] max-w-md leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
        <Navbar />
          <Routes>
            <Route path="/"
              element={<Home recipes={recipes} onDelete={handleDelete} />} />
            <Route path="/recipes"
              element={<Recipes recipes={recipes} onDelete={handleDelete} />} />
            <Route path="/recipes/:id/edit"
              element={<EditRecipe recipes={recipes} onEdit={handleEdit} />} />
            <Route path="/add"
              element={<AddRecipe onAdd={handleAdd} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
