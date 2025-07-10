# 🤖 Gemini Clone

A modern, responsive web application that replicates the Google Gemini AI interface, built with React and Vite. This project provides a clean, intuitive chat interface powered by Google's Generative AI API.

![Gemini Clone Screenshot](src/assets/preview.png)

## ✨ Features

- **🤖 AI-Powered Chat**: Integrated with Google's Gemini 2.5 Pro model for intelligent conversations
- **💬 Real-time Messaging**: Instant responses with loading states and error handling
- **📱 Responsive Design**: Beautiful, modern UI that works on desktop and mobile devices
- **🔄 Chat History**: Persistent conversation history with easy access to previous prompts
- **🎨 Modern Interface**: Clean, intuitive design inspired by Google's Gemini interface
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and build times
- **🔒 Safety Settings**: Built-in content safety filters and moderation
- **♿ Accessibility**: Keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sainath-666/gemini-clone.git
   cd gemini-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API=your_gemini_api_key_here
   ```

   To get your API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
gemini-clone/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and icons
│   ├── components/        # React components
│   │   ├── Main/         # Main chat interface
│   │   └── Sidebar/      # Navigation sidebar
│   ├── config/           # API configuration
│   ├── context/          # React context for state management
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json
└── README.md
```

## 🔧 Configuration

### API Configuration

The application uses Google's Generative AI API. Key configuration options in `src/config/gemini.js`:

- **Model**: Gemini 2.5 Pro
- **Temperature**: 0.9 (creativity level)
- **Max Output Tokens**: 2048
- **Safety Settings**: Medium threshold for all harm categories

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API` | Your Google Gemini API key | Yes |

## 🎯 Usage

1. **Start a New Chat**: Click the "New chat" button in the sidebar
2. **Send Messages**: Type your prompt in the input field and press Enter or click the send button
3. **View History**: Expand the sidebar to see your recent conversations
4. **Quick Prompts**: Use the suggested prompt cards for common tasks

## 🎨 UI Components

### Main Interface
- **Greeting Section**: Welcome message with suggested prompts
- **Chat Area**: Real-time conversation display
- **Input Section**: Text input with send, gallery, and microphone buttons

### Sidebar
- **Menu Toggle**: Expandable sidebar navigation
- **New Chat**: Start fresh conversations
- **Recent Chats**: Access previous conversations
- **Settings**: Help, activity, and settings options

## 🔒 Security & Privacy

- API keys are stored in environment variables
- Built-in content safety filters
- No data is stored locally beyond session
- Follows Google's AI safety guidelines

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add your environment variables in the Vercel dashboard

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Generative AI](https://ai.google.dev/) for the powerful AI capabilities
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Google Gemini](https://gemini.google.com/) for the interface inspiration

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/sainath-666/gemini-clone/issues) page
2. Create a new issue with detailed information
3. Include your Node.js version and any error messages

## 🔄 Changelog

### Version 0.0.0
- Initial release
- Basic chat functionality
- Responsive design
- Google Gemini API integration
- Chat history management

---

**Note**: This is a clone project for educational purposes. Please respect Google's terms of service and API usage guidelines.
