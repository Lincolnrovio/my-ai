# Nexus AI

A private, mobile-first personal AI workspace for Precious.

## Deploy
Upload the repository contents to GitHub and connect the repository to Netlify. Publish directory: `.` (repository root).

## Configure
Open Nexus → Settings → AI provider keys. Add one or more Groq and/or Google Gemini API keys. Choose a default provider and model.

## Included
- ChatGPT-inspired responsive interface and chat history
- Chat, coding, research, file intelligence and image-prompt modes
- Multiple Groq and Gemini API keys with provider/key fallback
- Text, source-code, PDF, DOCX and ZIP text extraction
- Speech recognition, browser text-to-speech and microphone recording attachment
- PWA manifest and service worker

## Important limitations and security
This is a static browser app. API keys are stored in this browser's local storage and are not encrypted. Anyone who can access the browser profile or inspect its storage may retrieve them. Use only on a trusted, locked device. For stronger security, build a private authenticated backend and keep provider keys in server-side environment variables.

Image Studio currently helps prepare image-generation requests; it does not itself generate image files. Image attachments are not yet passed as image pixels to the text models. Recorded audio can be attached but requires a speech-to-text provider for automatic transcription. Voice wake-word activation and Android system controls require a native Android companion app; a PWA cannot continuously listen in the background or power on a switched-off phone.

PDF/DOCX/ZIP readers load libraries from public CDNs and therefore need internet access the first time. AI chat always requires internet access.
