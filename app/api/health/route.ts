import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    apis: {
      fal: !!process.env.FAL_KEY,
      openai: !!process.env.OPENAI_API_KEY
    }
  })
}
