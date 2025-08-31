import { NextRequest, NextResponse } from 'next/server'
import { fal } from '@fal-ai/client'
import OpenAI from 'openai'

// Configure APIs
fal.config({
  credentials: process.env.FAL_KEY
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface ThumbnailRequest {
  imageUrl: string
  videoType: string
  thumbnailStyle: string
  mood: string
  placement: string
  videoTitle?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ThumbnailRequest = await request.json()

    if (!body.imageUrl || !body.videoType || !body.thumbnailStyle || !body.mood || !body.placement) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Generate enhanced prompts using OpenAI
    const prompts = await generateEnhancedPrompts(body)

    // Generate thumbnails using Fal.ai
    const thumbnails = await generateThumbnails(body.imageUrl, prompts)

    return NextResponse.json({
      success: true,
      thumbnails,
      prompts
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Thumbnail generation failed' },
      { status: 500 }
    )
  }
}

async function generateEnhancedPrompts(data: ThumbnailRequest) {
  const baseContext = `
    Video Type: ${data.videoType}
    Style: ${data.thumbnailStyle}
    Mood: ${data.mood}
    Photo Placement: ${data.placement}
    ${data.videoTitle ? `Video Title: ${data.videoTitle}` : ''}
  `

  // Each array contains 6 completely distinct prompts
  const promptTemplates = {
    horizontal: [
      `Ultra-crisp YouTube thumbnail (1280x720, 16:9) for ${data.videoType}. Style: ${data.thumbnailStyle}. Mood: ${data.mood}. Place the subject on the ${data.placement} side against a shattered-glass backdrop, overlay glowing neon text, incorporate dynamic motion lines and social-media icons for a high-octane feel.`,

      `Professional 16:9 YouTube thumbnail (1280×720). Theme: ${data.videoType}. A moody, ${data.mood} scene with the user's photo on the ${data.placement}, framed by dramatic lighting and cinematic lens flares. Add bold metallic typography and subtle background textures to convey depth.`,

      `Vibrant YouTube banner-style thumbnail, 1280x720, for ${data.videoType} content. ${data.thumbnailStyle} meets ${data.mood}: user portrait on the ${data.placement} with a pastel gradient sky, floating geometric shapes, and large drop-shadow text inviting “Watch Now.”`,

      `Clean minimalistic thumbnail 1280×720 px for ${data.videoType}. ${data.thumbnailStyle}, bright ${data.mood} vibe. Subject on the ${data.placement} with a clean white background, playful colored blocks, and precise sans-serif text highlighting the key message.`,

      `Bold editorial-style YouTube thumbnail, 16:9 ratio. ${data.thumbnailStyle} & ${data.mood} mood. User’s photo on the ${data.placement} with dynamic magazine-cut collage elements, halftone patterns, and contrasting callout text boxes.`,

      `Grunge-inspired YouTube thumbnail (1280×720), ${data.videoType}. Style: ${data.thumbnailStyle}. Mood: ${data.mood}. Place the photo on the ${data.placement} within torn-paper frame, layered with spray-paint textures, distressed fonts, and color-splash accents for an edgy look.`
    ],
    vertical: [
      `Ultra-sharp YouTube Shorts thumbnail (720x1280, 9:16). ${data.thumbnailStyle}, ${data.mood} mood. Subject on the ${data.placement} against a bold color-block gradient. Add oversized, vertical-friendly text with drop shadows and animated spark effects for mobile scroll-stopper impact.`,

      `Clean portrait-orientation Shorts thumbnail (720×1280). Theme: ${data.videoType}. ${data.thumbnailStyle} style with soft, ${data.mood} lighting. Place user on the ${data.placement} in a circular mask, with subtle particle overlay and concise headline text at top and bottom.`,

      `Dynamic vertical thumbnail 9:16 for ${data.videoType}. Style: ${data.thumbnailStyle}. Mood: ${data.mood}. Subject on the ${data.placement} side, split-screen effect with contrasting textures and bold diagonal text slashes emphasizing the core hook.`,

      `Minimalistic 720x1280 portrait thumbnail. ${data.thumbnailStyle}, bright ${data.mood} theme. User portrait on the ${data.placement} against a solid color backdrop. Incorporate a single, large emoji and big rounded font for maximum readability on mobile.`,

      `High-energy Shorts thumbnail (9:16 ratio). ${data.thumbnailStyle}, vibrant ${data.mood}. Subject on the ${data.placement} with neon-glow frames, glitch overlays, and stacked text layers urging “Tap to Watch!” optimized for quick mobile engagement.`,

      `Cinematic vertical thumbnail 720×1280 px for ${data.videoType}. ${data.thumbnailStyle} with a dramatic ${data.mood} palette. Photo on the ${data.placement} embedded in floating film strips, with film grain effect and stylized serif text for a movie-poster vibe.`
    ]
  }

  try {
    const horizontalPrompts: string[] = []
    const verticalPrompts: string[] = []

    for (const template of promptTemplates.horizontal) {
      const resp = await openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert prompt engineer for Fal.ai “nano-banana” editing. Refine this horizontal thumbnail prompt to add more vivid visual context, compositional details, and platform-specific best practices.'
          },
          { role: 'user', content: `Refine: ${template}` }
        ],
        temperature: 0.7
      })
      horizontalPrompts.push(resp.choices[0].message.content || template)
    }

    for (const template of promptTemplates.vertical) {
      const resp = await openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert prompt engineer for Fal.ai “nano-banana” editing. Refine this vertical Shorts thumbnail prompt to ensure perfect 9:16 aspect ratio adherence, add mobile-first composition tips, and enrich visual storytelling.'
          },
          { role: 'user', content: `Refine: ${template}` }
        ],
        temperature: 0.7
      })
      verticalPrompts.push(resp.choices[0].message.content || template)
    }

    return { horizontal: horizontalPrompts, vertical: verticalPrompts }
  } catch (error) {
    console.error('OpenAI prompt enhancement failed:', error)
    return promptTemplates
  }
}

async function generateThumbnails(imageUrl: string, prompts: any) {
  const thumbnails = []

  try {
    // Horizontal thumbnails
    for (let i = 0; i < prompts.horizontal.length; i++) {
      const result = await fal.subscribe('fal-ai/nano-banana/edit', {
        input: {
          prompt: prompts.horizontal[i],
          image_urls: [imageUrl],
          num_images: 1,
          output_format: 'jpeg'
        },
        logs: true
      })

      if (result.data?.images?.length) {
        thumbnails.push({
          id: `horizontal-${i + 1}`,
          url: result.data.images[0].url,
          type: 'horizontal',
          style: prompts.horizontal[i],
          dimensions: '1280x720 (16:9)'
        })
      }
    }

    // Vertical thumbnails
    for (let i = 0; i < prompts.vertical.length; i++) {
      const result = await fal.subscribe('fal-ai/nano-banana/edit', {
        input: {
          prompt: prompts.vertical[i],
          image_urls: [imageUrl],
          num_images: 1,
          output_format: 'jpeg'
        },
        logs: true
      })

      if (result.data?.images?.length) {
        thumbnails.push({
          id: `vertical-${i + 1}`,
          url: result.data.images[0].url,
          type: 'vertical',
          style: prompts.vertical[i],
          dimensions: '720x1280 (9:16)'
        })
      }
    }

    return thumbnails
  } catch (error) {
    console.error('Fal.ai generation error:', error)
    throw new Error('Failed to generate thumbnails')
  }
}
