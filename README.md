# Lumen Website - Frontend

Next.js frontend application for the Lumen website.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your Sanity CMS environment variables here
# NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
# NEXT_PUBLIC_SANITY_DATASET=your_dataset
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the production application:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## 📁 Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions and API helpers
├── public/          # Static assets
└── styles/          # Global styles
```

## 🔗 Backend

This frontend will connect to a Sanity CMS backend. Configure your Sanity project credentials in your environment variables.

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy!

## 📚 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **CMS**: Sanity (external)



