export interface ThumbnailRequest {
  imageUrl: string
  videoType: string
  thumbnailStyle: string
  mood: string
  placement: string
  videoTitle?: string
}

export interface Thumbnail {
  id: string
  url: string
  type: 'horizontal' | 'vertical'
  style: string
  dimensions: string
}

export interface GenerationResponse {
  success: boolean
  thumbnails: Thumbnail[]
  prompts?: {
    horizontal: string[]
    vertical: string[]
  }
  error?: string
}

export interface UploadResponse {
  success: boolean
  imageUrl?: string
  error?: string
  message?: string
}

// Form data interface
export interface FormData {
  videoType: string
  thumbnailStyle: string
  mood: string
  placement: string
  videoTitle: string
}

// Constants
export const VIDEO_TYPES = [
  'Gaming', 'Tutorial', 'Vlog', 'Review', 'Music', 'Comedy', 
  'Education', 'Tech', 'Fitness', 'Cooking', 'Travel', 'DIY'
] as const

export const THUMBNAIL_STYLES = [
  'Bold & Colorful', 'Minimalist', 'Dark & Moody', 'Bright & Fun', 
  'Professional', 'Gaming Style', 'Tech Style'
] as const

export const MOODS = [
  'Exciting', 'Calm', 'Serious', 'Funny', 'Mysterious', 
  'Energetic', 'Professional', 'Creative'
] as const

export const PLACEMENTS = [
  'Left', 'Right', 'Center', 'Top-left', 'Top-right', 
  'Bottom-left', 'Bottom-right'
] as const
