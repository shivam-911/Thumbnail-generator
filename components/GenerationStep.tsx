'use client'

import { useEffect, useState } from 'react'

interface GenerationStepProps {
  isGenerating: boolean
}

const loadingSteps = [
  'Analyzing your photo...',
  'Creating AI prompts...',
  'Generating horizontal thumbnails...',
  'Generating vertical thumbnails...',
  'Finalizing results...'
]

export default function GenerationStep({ isGenerating }: GenerationStepProps) {
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0)

  useEffect(() => {
    if (!isGenerating) return

    const interval = setInterval(() => {
      setCurrentLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isGenerating])

  return (
    <div className="step-card max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Generating Your Thumbnails
      </h2>
      <p className="text-gray-600 mb-8">
        Our AI is creating professional thumbnails for you. This usually takes 10-15 seconds.
      </p>

      <div className="space-y-4">
        {loadingSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center justify-center p-4 rounded-lg transition-all ${
              index <= currentLoadingStep
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {index < currentLoadingStep ? (
              <span className="mr-3 text-green-600">✓</span>
            ) : index === currentLoadingStep ? (
              <div className="loading-spinner mr-3"></div>
            ) : (
              <span className="mr-3 text-gray-400">○</span>
            )}
            {step}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${((currentLoadingStep + 1) / loadingSteps.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {Math.round(((currentLoadingStep + 1) / loadingSteps.length) * 100)}% Complete
        </p>
      </div>
    </div>
  )
}
