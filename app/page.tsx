'use client'
import { useState } from "react"
import { Box } from "@/components/ui/box"
import { Button } from "@/components/ui/button"
import ImageUpload from "@/components/ImageUpload"
import ThumbnailForm from "@/components/ThumbnailForm"
import GenerationStep from "@/components/GenerationStep"
import ResultsDisplay from "@/components/ResultsDisplay"
import ProgressBar from "@/components/ProgressBar"


export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({})
  const [generatedThumbnails, setGeneratedThumbnails] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    setCurrentStep(3)
  }

  const handleFormSubmit = async (data: any) => {
    setFormData(data)
    setCurrentStep(4)
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate-thumbnails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImage,
          ...data
        }),
      })

      const result = await response.json()
      setGeneratedThumbnails(result.thumbnails)
      setCurrentStep(5)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const restartProcess = () => {
    setCurrentStep(1)
    setUploadedImage(null)
    setFormData({})
    setGeneratedThumbnails([])
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🎬 AI Thumbnail Generator
              </h1>
              <p className="text-gray-600 mt-1">
                Create professional YouTube thumbnails in seconds
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar currentStep={currentStep} />

        {currentStep === 1 && (
          <div className="text-center py-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to AI Thumbnail Generator
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload your photo, answer a few quick questions, and get professional
              thumbnails for both YouTube videos and Shorts - powered by AI.
            </p>
            <button
              onClick={() => setCurrentStep(2)}
              className="btn-dark"
            >
              🚀 Get Started
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <ImageUpload onImageUpload={handleImageUpload} onBack={() => setCurrentStep(1)} />
        )}

        {currentStep === 3 && (
          <ThumbnailForm
            onSubmit={handleFormSubmit}
            onBack={() => setCurrentStep(2)}
            uploadedImage={uploadedImage}
          />
        )}

        {currentStep === 4 && (
          <GenerationStep isGenerating={isGenerating} />
        )}

        {currentStep === 5 && (
          <ResultsDisplay
            thumbnails={generatedThumbnails}
            onStartOver={restartProcess}
            onGenerateNew={() => setCurrentStep(3)}
          />
        )}
      </main>
    </div>
  )
}
