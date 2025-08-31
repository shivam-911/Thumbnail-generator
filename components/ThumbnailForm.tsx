'use client'

import { useState } from 'react'

interface ThumbnailFormProps {
  onSubmit: (data: {
    videoType: string
    thumbnailStyle: string
    mood: string
    placement: string
    videoTitle?: string
  }) => void
    onBack: () => void
      uploadedImage: string | null
}

const videoTypes = [
  'Gaming', 'Tutorial', 'Vlog', 'Review', 'Music', 'Comedy',
  'Education', 'Tech', 'Fitness', 'Cooking', 'Travel', 'DIY'
]

const thumbnailStyles = [
  'Bold & Colorful', 'Minimalist', 'Dark & Moody', 'Bright & Fun',
  'Professional', 'Gaming Style', 'Tech Style'
]

const moods = [
  'Exciting', 'Calm', 'Serious', 'Funny', 'Mysterious',
  'Energetic', 'Professional', 'Creative'
]

const placements = [
  'Left', 'Right', 'Center', 'Top-left', 'Top-right',
  'Bottom-left', 'Bottom-right'
]

export default function ThumbnailForm({ onSubmit, onBack, uploadedImage }: ThumbnailFormProps) {
  const [formData, setFormData] = useState({
    videoType: '',
    thumbnailStyle: '',
    mood: '',
    placement: '',
    videoTitle: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.videoType || !formData.thumbnailStyle || !formData.mood || !formData.placement) {
      alert('Please fill in all required fields')
      return
    }

    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid =
    formData.videoType && formData.thumbnailStyle && formData.mood && formData.placement

  return (
    <div className="step-card max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">Customize Your Thumbnail</h2>
          <p className="text-slate-300 mb-6">
            Tell us about your video so we can create the perfect thumbnail for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Type */}
            <div>
              <label className="block text-sm font-semibold text-blue-400 mb-2">
                Video Type *
              </label>
              <select
                value={formData.videoType}
                onChange={(e) => handleInputChange('videoType', e.target.value)}
                className="w-full rounded-xl border border-slate-500 bg-slate-800 text-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="" className="text-slate-400">Select video type...</option>
                {videoTypes.map(type => (
                  <option key={type} value={type} className="bg-slate-900 text-slate-100">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Thumbnail Style */}
            <div>
              <label className="block text-sm font-semibold text-blue-400 mb-2">
                Thumbnail Style *
              </label>
              <select
                value={formData.thumbnailStyle}
                onChange={(e) => handleInputChange('thumbnailStyle', e.target.value)}
                className="w-full rounded-xl border border-slate-500 bg-slate-800 text-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="" className="text-slate-400">Select style...</option>
                {thumbnailStyles.map(style => (
                  <option key={style} value={style} className="bg-slate-900 text-slate-100">
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-sm font-semibold text-blue-400 mb-2">
                Mood/Tone *
              </label>
              <select
                value={formData.mood}
                onChange={(e) => handleInputChange('mood', e.target.value)}
                className="w-full rounded-xl border border-slate-500 bg-slate-800 text-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="" className="text-slate-400">Select mood...</option>
                {moods.map(mood => (
                  <option key={mood} value={mood} className="bg-slate-900 text-slate-100">
                    {mood}
                  </option>
                ))}
              </select>
            </div>

            {/* Placement */}
            <div>
              <label className="block text-sm font-semibold text-blue-400 mb-2">
                Your Photo Placement *
              </label>
              <select
                value={formData.placement}
                onChange={(e) => handleInputChange('placement', e.target.value)}
                className="w-full rounded-xl border border-slate-500 bg-slate-800 text-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="" className="text-slate-400">Select placement...</option>
                {placements.map(place => (
                  <option key={place} value={place} className="bg-slate-900 text-slate-100">
                    {place}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-blue-400 mb-2">
                Video Title (Optional)
              </label>
              <input
                type="text"
                value={formData.videoTitle}
                onChange={(e) => handleInputChange('videoTitle', e.target.value)}
                className="w-full rounded-xl border border-slate-500 bg-slate-800 text-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition"
                placeholder="Enter your video title for context..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-6">
              <button type="button" onClick={onBack} className="btn-secondary">
                Back
              </button>
              <button
                type="submit"
                className={`btn-primary ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isFormValid}
              >
                Generate Thumbnails
              </button>
            </div>
          </form>
        </div>

        {/* Preview and Tips Section */}
        <div className="space-y-6">
          {uploadedImage && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Your Photo</h3>
              <img
                src={uploadedImage}
                alt="Your uploaded photo"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• High contrast colors perform better</li>
              <li>• Keep text large and readable</li>
              <li>• Faces increase engagement</li>
              <li>• Test thumbnails at small sizes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
