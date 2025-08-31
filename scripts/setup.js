#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up AI Thumbnail Generator...')

// Check if .env.local exists
const envLocalPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), '.env.example')

if (!fs.existsSync(envLocalPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envLocalPath)
    console.log('✅ Created .env.local from .env.example')
    console.log('⚠️  Please add your API keys to .env.local')
  } else {
    console.log('❌ .env.example not found')
  }
} else {
  console.log('✅ .env.local already exists')
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules')
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...')
  const { execSync } = require('child_process')
  execSync('npm install', { stdio: 'inherit' })
}

console.log(`
🎉 Setup complete! 

Next steps:
1. Add your API keys to .env.local:
   - FAL_KEY=your_fal_ai_api_key
   - OPENAI_API_KEY=your_openai_api_key

2. Start the development server:
   npm run dev

3. Open http://localhost:3000

Need help? Check the README.md file.
`)
