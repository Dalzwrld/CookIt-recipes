import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const emptyForm = {
  name: "",
  category: "",
  duration: "",
  ingredients: "",
  instructions: "",
  image: "",
  coverPhoto: "",
};

const foodOptions = ["Pasta", "Pastry", "Soup", "Beverage", "Meat", "Vegan"];

const badge = {
  Pasta: "bg-amber-300 text-black",
  Pastry: "bg-amber-700 text-black",
  Soup: "bg-indigo-500 text-white",
  Beverage: "bg-blue-500 text-white",
  Meat: "bg-red-600 text-white",
  Vegan: "bg-green-400 text-white",
};

export default function RecipeForm({ onSubmit, existingData }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (existingData) setForm(existingData);
  }, [existingData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim()) {
      setError('Recipe name and category are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
      navigate('/recipes');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 px-12 py-12 max-w-5xl mx-auto items-start font-[Inter]">
      <div>
        <p className="font-[Playfair_Display_SC] text-[10px] tracking-[0.35em] uppercase text-green mb-3">
          {isEdit ? 'Edit destination' : 'New destination'}
        </p>
        <h1 className="font-[Playfair_Display] text-[38px] font-light text-[#042C53] leading-[1.15] mb-2">
          {isEdit ? 'Update Your Journey' : 'Add to Your Bucket List'}
        </h1>
        <p className="text-[13px] text-[#6b8fa8] leading-relaxed mb-8 font-[Playfair_Display]">
          {isEdit
            ? 'Change the details for this destination.'
            : "Save a place you're dreaming of, planning to visit, or have already explored."
          }
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {error && (
            <div className="bg-[#FCEBEB] border border-[#F7C1C1] rounded-sm px-4 py-2.5 text-[13px] text-[#A32D2D]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className='font-[Inter] text-[9px] tracking-[0.25em] uppercase text-[#6b8fa8] block mb-1.5' htmlFor="name">Destination name *</label>
              <input id="name" name="name" type="text" placeholder="e.g. Tuscany"
                value={form.name} onChange={handleChange} 
                className='w-full bg-white border border-[rgba(24,95,165,0.13)] rounded-sm px-3.5 py-2.5 text-[13px] text-[#0c1f2e] font-[Inter] focus:outline-none focus:border-blue-mid focus:ring-2 focus:ring-blue-mid/10' 
                required 
              />
            </div>
            <div>
              <label className='font-[Inter] text-[9px] tracking-[0.25em] uppercase text-[#6b8fa8] block mb-1.5' htmlFor="country">Country *</label>
              <input id="country" name="country" type="text" placeholder="e.g. Italy"
                value={form.country} onChange={handleChange} 
                className='w-full bg-white border border-[rgba(24,95,165,0.13)] rounded-sm px-3.5 py-2.5 text-[13px] text-[#0c1f2e] font-[Inter] focus:outline-none focus:border-blue-mid focus:ring-2 focus:ring-blue-mid/10' 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className='font-[Inter] text-[9px] tracking-[0.25em] uppercase text-[#6b8fa8] block mb-1.5' htmlFor="region">Region</label>
              <select id="region" name="region" value={form.region} onChange={handleChange}
                className='w-full bg-white border border-[rgba(24,95,165,0.13)] rounded-sm px-3.5 py-2.5 text-[13px] text-[#0c1f2e] font-[Inter] focus:outline-none focus:border-blue-mid focus:ring-2 focus:ring-blue-mid/10 appearance-none cursor-pointer'>
                <option value="">Select region...</option>
                {REGION_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className='font-[Inter] text-[9px] tracking-[0.25em] uppercase text-[#6b8fa8] block mb-1.5' htmlFor="status">Status</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}
                className='w-full bg-white border border-[rgba(24,95,165,0.13)] rounded-sm px-3.5 py-2.5 text-[13px] text-[#0c1f2e] font-[Inter] focus:outline-none focus:border-blue-mid focus:ring-2 focus:ring-blue-mid/10 appearance-none cursor-pointer'>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className='font-[Inter] text-[9px] tracking-[0.25em] uppercase text-[#6b8fa8] block mb-1.5' htmlFor="coverPhoto">Cover photo URL</label>
            <input id="coverPhoto" name="coverPhoto" type="url"
              placeholder="https://images.unsplash.com/..."
              value={form.coverPhoto} onChange={handleChange} 
              className= 'w-full bg-white border border-[rgba(24,95,165,0.13)] rounded-sm px-3.5 py-2.5 text-[13px] text-[#0c1f2e] font-[Inter] focus:outline-none focus:border-blue-mid focus:ring-2 focus:ring-blue-mid/10'
            />
            {form.coverPhoto && (
              <div className="mt-2 h-20 rounded-sm bg-cover bg-center border border-border"
                style={{ backgroundImage: `url(${form.coverPhoto})` }}>
              </div>
            )}
          </div>

          <div>
            <label className='font-[Inter] text-[9px] tracking-[0.25em] uppercase text-[#6b8fa8] block mb-1.5' htmlFor="notes">Travel notes</label>
            <textarea id="notes" name="notes" rows={4}
              placeholder="What do you want to see, do, or remember about this place?"
              value={form.notes} onChange={handleChange}
              className='w-full bg-white border border-[rgba(24,95,165,0.13)] rounded-sm px-3.5 py-2.5 text-[13px] text-[#0c1f2e] font-[Inter] focus:outline-none focus:border-blue-mid focus:ring-2 focus:ring-blue-mid/10 resize-y min-h-25' />
          </div>

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={() => navigate(-1)}
              className="font-[Inter] text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-sm border border-[rgba(24,95,165,0.13)] text-[#2a4a6b] bg-white hover:border-[#042C53] hover:text-[#042C53]">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 font-[Inter] text-[11px] tracking-[0.2em] uppercase py-3.5 rounded-sm bg-green text-white bg-[#3B6D11]">
              {loading ? 'Saving...' : isEdit ? 'Update Destination' : 'Save to Bucket List'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
