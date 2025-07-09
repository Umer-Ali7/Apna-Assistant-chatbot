# AI Chat UI - Setup Guide

This guide will help you get the AI Chat UI up and running quickly.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

## 🔑 Getting API Keys

You need at least one API key to use the chat functionality:

### Option 1: Gemini Pro (Recommended - Free tier available)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Option 2: OpenAI (Alternative)

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the generated API key

## 🚀 Installation Steps

### Step 1: Install Dependencies

```bash
# Navigate to the project directory
cd ai-chat-ui

# Install all required packages
npm install
```

### Step 2: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local
```

Open `.env.local` in your text editor and add your API key(s):

```env
# For Gemini Pro (recommended)
GEMINI_API_KEY=your_actual_gemini_api_key_here

# For OpenAI (alternative)
OPENAI_API_KEY=your_actual_openai_api_key_here
```

**Important Notes:**
- Replace `your_actual_gemini_api_key_here` with your real API key
- You only need one API key, but you can configure both
- Never commit `.env.local` to version control
- The file must be named exactly `.env.local`

### Step 3: Start the Development Server

```bash
npm run dev
```

You should see output similar to:
```
> ai-chat-ui@0.1.0 dev
> next dev

   ▲ Next.js 15.3.5
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.100:3000

 ✓ Ready in 2.1s
```

### Step 4: Open the Application

1. Open your web browser
2. Navigate to [http://localhost:3000](http://localhost:3000)
3. You should see the AI Chat interface

## ✅ Verification

To verify everything is working correctly:

1. **Check the Interface**: You should see a clean chat interface with a welcome message
2. **Test Theme Toggle**: Click the theme button (sun/moon icon) to switch between light/dark modes
3. **Test Settings**: Click the settings gear icon to see provider options
4. **Send a Message**: Type a message and click send to test the AI integration

## 🔧 Troubleshooting

### Common Issues and Solutions

#### "API key is not configured" Error

**Problem**: You see an error message about missing API keys

**Solution**:
1. Verify `.env.local` exists in the project root
2. Check that your API key is correctly pasted (no extra spaces)
3. Restart the development server: `Ctrl+C` then `npm run dev`

#### Port 3000 Already in Use

**Problem**: Error message "Port 3000 is already in use"

**Solution**:
```bash
# Option 1: Use a different port
npm run dev -- -p 3001

# Option 2: Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

#### Module Not Found Errors

**Problem**: Errors about missing modules

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors

**Problem**: TypeScript compilation errors

**Solution**:
```bash
# Check for type errors
npm run type-check

# If errors persist, try:
rm -rf .next
npm run dev
```

## 🎨 Customization

### Changing the Default AI Provider

Edit `src/app/page.tsx` and change this line:
```typescript
const [apiProvider, setApiProvider] = useState<'gemini' | 'openai'>('gemini');
```

### Modifying Colors

The app uses Tailwind CSS. Key color classes to modify:
- `from-blue-500 to-purple-600`: Main gradient colors
- `bg-gray-50 dark:bg-gray-900`: Background colors
- `text-gray-900 dark:text-white`: Text colors

### Adding Custom Styles

Add custom CSS to `src/app/globals.css`

## 📱 Mobile Testing

To test the mobile interface:

1. Open browser developer tools (F12)
2. Click the device toggle icon
3. Select a mobile device preset
4. Refresh the page

## 🚀 Production Deployment

### Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `.next` folder to Netlify
3. Configure environment variables

## 📞 Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review the main [README.md](README.md)
3. Ensure all prerequisites are met
4. Try restarting the development server

## 🎉 Success!

If you can send and receive messages in the chat interface, congratulations! Your AI Chat UI is working correctly.

**Next Steps:**
- Customize the appearance to match your preferences
- Deploy to a hosting platform for public access
- Add additional features or integrations

---

Happy chatting! 🤖💬

