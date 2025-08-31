'use client'

import { useState, useRef } from 'react'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  onBack: () => void
}

export default function ImageUpload({ onImageUpload, onBack }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to server
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        // Pass the uploaded image URL to parent
        onImageUpload(result.imageUrl)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="step-card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Photo</h2>
      <p className="text-gray-600 mb-6">
        Upload a photo of yourself that will be included in your thumbnail. 
        This will be your creator photo that appears on the thumbnail.
      </p>

      {!previewUrl ? (
        <>
          <div
            className={`upload-area ${dragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {dragOver ? 'Drop your image here' : 'Click or drag to upload'}
            </h3>
            <p className="text-gray-500 mb-4">
              Supports JPG, PNG, GIF up to 10MB
            </p>
            {uploading && (
              <div className="flex items-center justify-center">
                <div className="loading-spinner mr-2"></div>
                <span>Uploading...</span>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </>
      ) : (
        <div className="text-center">
          <div className="mb-4">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary"
            >
              Change Photo
            </button>
            <button
              onClick={() => onImageUpload(previewUrl)}
              className="btn-primary"
            >
              Continue
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
      </div>
    </div>
  )
}
