import { NextRequest, NextResponse } from 'next/server'
import { fal } from '@fal-ai/client'

// Configure fal client
fal.config({
  credentials: process.env.FAL_KEY
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File too large (max 10MB)' }, { status: 400 })
    }

    // Upload file to Fal.ai storage
    const imageUrl = await fal.storage.upload(file)

    return NextResponse.json({ 
      success: true, 
      imageUrl: imageUrl,
      message: 'Image uploaded successfully' 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload failed' }, 
      { status: 500 }
    )
  }
}
