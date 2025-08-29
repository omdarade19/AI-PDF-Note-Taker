
# AI-PDF-Note-Taker

A sleek and powerful Next.js application for AI-assisted note-taking directly from PDF files. Built using modern web technologies, this app streamlines the process of uploading PDF documents, extracting key insights, and generating organized notes using AI.


## Features

- Upload PDFs and receive intelligent summaries and notes
- AI-powered extraction of key points and insights
- Smooth, dynamic user interface built with modern frameworks
- Support for authenticated users


## Tech Stack

**Next.js** – React framework for SSR and client-side rendering
GitHub

**Tailwind CSS** – Utility-first CSS styling via Tailwind config
GitHub

**Convex / Backend-as-a-Service** – For real-time database and serverless functions

**Clerk / Auth Provider** – For handling user authentication

**AI Engine (e.g., Gemini)** – To summarize and process PDF content


# Getting Started
## Prerequisites

Make sure you have the following installed:

  Node.js (v18+ recommended)
  
  npm, yarn, or pnpm


## Installation

Install AI-PDF-Note-Taker with npm

```bash
# Clone the repository
git clone https://github.com/omdarade19/AI-PDF-Note-Taker.git
cd AI-PDF-Note-Taker

# Install dependencies
npm install
# or yarn
# or pnpm install

# Start the development server
npm run dev
```
Open http://localhost:3000
 in your browser to view the app

## Project Structure
```bash
AI-PDF-Note-Taker/
├── app/
├── components/
├── config/
├── convex/           # Backend services
├── lib/
├── public/
├── middleware.js
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── jsconfig.json
└── README.md

```
## Usage

```bash
1.Navigate to the homepage.

2.Upload your PDF file.

3.Let the AI engine generate summaries or notes.

4.Review, annotate, or edit your notes in the rich editor.

5.Save or export your notes 
```


## Deployment

Deploy seamlessly using Vercel:

```bash
1.Push changes to your GitHub repository.

2.Visit Vercel and import your project.

3.Configure environment variables (e.g., AI API keys, Convex URL, Clerk keys).

4.Deploy — Vercel handles builds and hosting automatically
```

