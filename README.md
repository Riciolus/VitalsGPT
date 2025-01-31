# VitalsGPT

VitalsGPT is a GPT-based medical web application that provides intelligent insights and assistance using AI-powered natural language processing.

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions, React 18)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Backend**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/api-routes)
- **Database**: [Neon](https://neon.tech/) (Serverless PostgreSQL)
- **AI Model**: [Hugging Face Inference API](https://huggingface.co/docs/api-inference) (Zephyr 7B Alpha)
- **Authentication**: [Auth.js](https://authjs.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Features

- Chat interface for medical inquiries
- AI-powered responses using Zephyr 7B Alpha
- Secure database storage via Neon PostgreSQL
- Real-time streaming with Server-Sent Events (SSE)
- Optimized performance with Next.js caching and SSR

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm or yarn
- A Neon PostgreSQL database
- Hugging Face API key

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/vitalsgpt.git
cd vitalsgpt
```

Install dependencies:

```bash
npm install  # or yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory and add:

```
NEXT_PUBLIC_HF_API_KEY=your_huggingface_api_key
DATABASE_URL=your_neon_database_url
```

### Run the Development Server

```bash
npm run dev  # or yarn dev
```

Visit `http://localhost:3000` in your browser.

## Deployment

This project is optimized for deployment on Vercel:

```bash
git push origin main
```

Then, connect your repository to Vercel and deploy.

## References

- **Zephyr: Direct Distillation of LM Alignment**  
  Tunstall, L., Beeching, E., Lambert, N., et al. (2023).  
  [arXiv:2310.16944](https://arxiv.org/abs/2310.16944)

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT License
