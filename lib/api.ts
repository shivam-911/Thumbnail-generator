import { ThumbnailRequest, GenerationResponse, UploadResponse } from './types'

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl
  }

  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${this.baseUrl}/api/upload-image`, {
      method: 'POST',
      body: formData,
    })

    return response.json()
  }

  async generateThumbnails(data: ThumbnailRequest): Promise<GenerationResponse> {
    const response = await fetch(`${this.baseUrl}/api/generate-thumbnails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  async checkHealth() {
    const response = await fetch(`${this.baseUrl}/api/health`)
    return response.json()
  }
}

export const api = new ApiClient()
