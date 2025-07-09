# AI Chat UI

A modern, responsive AI chat interface built with Next.js, TypeScript, and Tailwind CSS. Features support for both Gemini Pro and OpenAI APIs with a beautiful dark/light mode toggle.

![AI Chat UI Screenshot](https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=AI+Chat+UI)

## ✨ Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Dark/Light Mode**: Automatic theme detection with manual toggle (Light → Dark → System)
- **Dual AI Support**: Switch between Gemini Pro and OpenAI GPT-3.5 Turbo
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Chat**: Instant messaging with typing indicators and loading states
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API key from either:
  - [Google AI Studio](https://makersuite.google.com/app/apikey) (for Gemini Pro)
  - [OpenAI Platform](https://platform.openai.com/api-keys) (for OpenAI)

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the project files
   cd ai-chat-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local and add your API key(s)
   ```

4. **Configure your API key**
   
   Open `.env.local` and add one or both API keys:
   
   ```env
   # For Gemini Pro (recommended)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # For OpenAI (alternative)
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### API Providers

The application supports two AI providers:

#### Gemini Pro (Default)
- **Endpoint**: `/api/chat`
- **Model**: `gemini-pro`
- **Environment Variable**: `GEMINI_API_KEY`
- **Get API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey)

#### OpenAI
- **Endpoint**: `/api/chat-openai`
- **Model**: `gpt-3.5-turbo`
- **Environment Variable**: `OPENAI_API_KEY`
- **Get API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini Pro API key | Optional* |
| `OPENAI_API_KEY` | OpenAI API key | Optional* |

*At least one API key is required for the chat functionality to work.

## 🎨 Customization

### Themes

The application supports three theme modes:
- **Light**: Clean, bright interface
- **Dark**: Easy on the eyes for low-light environments  
- **System**: Automatically matches your device's theme preference

### Styling

The UI is built with Tailwind CSS and can be easily customized:

- **Colors**: Modify the gradient colors in `src/app/page.tsx`
- **Fonts**: Update font families in `src/app/layout.tsx`
- **Animations**: Adjust transitions in `src/app/globals.css`

## 📱 Mobile Support

The interface is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar and expanded layout
- **Tablet**: Adapted layout with touch-friendly controls
- **Mobile**: Compact design with optimized input and navigation

## 🔒 Security Features

- **API Key Protection**: Environment variables keep API keys secure
- **Input Validation**: All user inputs are validated and sanitized
- **Error Boundaries**: Graceful error handling prevents crashes
- **CORS Configuration**: Proper cross-origin request handling

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in the Vercel dashboard
   - Deploy!

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `.next` folder to Netlify
   - Configure environment variables in Netlify dashboard

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🛠️ Development

### Project Structure

```
ai-chat-ui/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/          # Gemini Pro API route
│   │   │   └── chat-openai/   # OpenAI API route
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   └── page.tsx           # Main chat interface
│   └── components/
│       └── theme-provider.tsx # Theme management
├── .env.example               # Environment variables template
├── package.json
└── README.md
```

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Adding New Features

1. **New API Provider**: Create a new route in `src/app/api/`
2. **UI Components**: Add reusable components in `src/components/`
3. **Styling**: Extend Tailwind classes in `src/app/globals.css`

## 🐛 Troubleshooting

### Common Issues

**API Key Not Working**
- Verify the API key is correctly set in `.env.local`
- Ensure the environment file is in the project root
- Restart the development server after adding environment variables

**Build Errors**
- Check TypeScript errors: `npm run type-check`
- Verify all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next`

**Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Verify dark mode classes are applied correctly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please:
- Check the [troubleshooting section](#-troubleshooting)
- Open an issue on GitHub
- Review the [Next.js documentation](https://nextjs.org/docs)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

