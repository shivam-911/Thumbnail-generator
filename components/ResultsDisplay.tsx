'use client'

import { useState } from 'react'

interface Thumbnail {
  id: string
  url: string
  type: 'horizontal' | 'vertical'
  style: string
  dimensions: string
}

interface ResultsDisplayProps {
  thumbnails: Thumbnail[]
  onStartOver: () => void
  onGenerateNew: () => void
}

export default function ResultsDisplay({ thumbnails, onStartOver, onGenerateNew }: ResultsDisplayProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const horizontalThumbnails = thumbnails.filter(t => t.type === 'horizontal')
  const verticalThumbnails = thumbnails.filter(t => t.type === 'vertical')

  const downloadThumbnail = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const shareLink = (url: string) => {
    alert(`Share link: ${url}\n\n(In a real app, this would generate a shareable link)`)
  }

  const downloadAll = () => {
    alert('ZIP download would start in a real app with all thumbnails included')
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Thumbnails Are Ready! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          We've generated {thumbnails.length} professional thumbnails for you.
          Download them individually or get them all in a ZIP file.
        </p>

        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={downloadAll} className="btn-primary">
            📦 Download All as ZIP
          </button>
          <button onClick={onGenerateNew} className="btn-secondary">
            🔄 Generate New Variations
          </button>
          <button onClick={onStartOver} className="btn-secondary">
            🏠 Start Over
          </button>
        </div>
      </div>

      {/* Horizontal Thumbnails */}
      {horizontalThumbnails.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📺 YouTube Thumbnails (16:9)
          </h3>
          <div className="thumbnail-grid">
            {horizontalThumbnails.map((thumbnail, index) => (
              <ThumbnailCard
                key={thumbnail.id}
                thumbnail={thumbnail}
                title={`YouTube Thumbnail ${index + 1}`}
                onDownload={() => downloadThumbnail(thumbnail.url, `youtube-thumbnail-${index + 1}.jpg`)}
                onCopy={() => copyToClipboard(thumbnail.url, thumbnail.id)}
                onShare={() => shareLink(thumbnail.url)}
                copied={copiedId === thumbnail.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Vertical Thumbnails */}
      {verticalThumbnails.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📱 Shorts Thumbnails (9:16)
          </h3>
          <div className="thumbnail-grid">
            {verticalThumbnails.map((thumbnail, index) => (
              <ThumbnailCard
                key={thumbnail.id}
                thumbnail={thumbnail}
                title={`Shorts Thumbnail ${index + 1}`}
                onDownload={() => downloadThumbnail(thumbnail.url, `shorts-thumbnail-${index + 1}.jpg`)}
                onCopy={() => copyToClipboard(thumbnail.url, thumbnail.id)}
                onShare={() => shareLink(thumbnail.url)}
                copied={copiedId === thumbnail.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface ThumbnailCardProps {
  thumbnail: Thumbnail
  title: string
  onDownload: () => void
  onCopy: () => void
  onShare: () => void
  copied: boolean
}

function ThumbnailCard({ thumbnail, title, onDownload, onCopy, onShare, copied }: ThumbnailCardProps) {
  return (
    <div className="card group overflow-hidden">
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
        <img
          src={thumbnail.url}
          alt={title}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <span className="text-sm text-cyan-200">{thumbnail.dimensions}</span>
        <div className="flex space-x-2">
          <button onClick={onDownload} className="btn-secondary text-sm">💾</button>
          <button onClick={onCopy} className="btn-secondary text-sm">
            {copied ? '✓' : '📋'}
          </button>
          <button onClick={onShare} className="btn-secondary text-sm">🔗</button>
        </div>
      </div>
    </div>

  )
}
