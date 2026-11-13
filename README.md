# Nexus AI — upgraded PWA

## What's new
- Secure server-side AI requests (Groq and Gemini); API secrets stay in Netlify environment variables.
- Real web research using Tavily Search, with source links returned in the chat.
- Image understanding through Gemini multimodal or Groq vision (when configured).
- Image-generation endpoint using Gemini image generation (availability depends on the model enabled for your API key).
- Long-term memory vault stored locally on this device and added to relevant prompts.
- Search, pin, rename, export and delete conversations.
- Dark/light theme, voice input/output, PDF/DOCX/ZIP/text/code file reading.
- PWA installability and offline shell caching.

## Deploy using your Android phone
1. Upload the contents of this ZIP to the root of a GitHub repository.
2. In Netlify, create/import a site from that GitHub repository. The included `netlify.toml` configures the functions folder automatically.
3. In Netlify → Site configuration → Environment variables, add:
   - `GROQ_API_KEY` — required if using Groq chat.
   - `GEMINI_API_KEY` — required for Gemini chat/vision and image generation.
   - `TAVILY_API_KEY` — required for live web research.
   Optional: `GROQ_MODEL`, `GROQ_VISION_MODEL`, `GEMINI_MODEL`, `GEMINI_IMAGE_MODEL`.
4. Redeploy the site after adding variables.
5. Open the deployed site and test chat/research. If the PWA is hosted on GitHub Pages or another domain, open Settings and enter `https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions` as the Backend URL.
6. Use PWABuilder with your public HTTPS PWA URL to package it for Android.

## Important
- GitHub Pages is static and cannot run Netlify Functions. Netlify must host the functions, even if GitHub remains your source repository and PWABuilder packages the app from its URL.
- API keys are not entered into the app. They are held in Netlify server environment variables.
- Tavily and AI provider accounts may have usage limits or charges. This is not an unlimited free service.
- Memory and chat history are stored in browser localStorage on this device. Clearing browser/app storage can erase them; use Export to back up conversations.
- Research requires internet. Voice input depends on browser speech recognition. The app cannot listen continuously in the background.
- Image generation requires an image-generation model enabled for the Gemini API key; model availability and billing vary.
