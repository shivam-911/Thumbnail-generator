export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function generateFileName(type: 'horizontal' | 'vertical', index: number): string {
  const prefix = type === 'horizontal' ? 'youtube-thumbnail' : 'shorts-thumbnail'
  return `${prefix}-${index + 1}.jpg`
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please upload an image file' }
  }

  if (file.size > 10 * 1024 * 1024) { // 10MB
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Supported formats: JPG, PNG, GIF' }
  }

  return { valid: true }
}

export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}
