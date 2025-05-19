# ResumeScan - Resume Skills Extractor

A modern web application for extracting and analyzing skills from resumes.

## Features

- Upload resume files (PDF, TXT)
- Extract key skills automatically
- Categorize skills by type (Programming, Tool, Soft Skill, etc.)
- Download extracted skills
- Copy skills to clipboard

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Python, Flask
- **Libraries**: Lucide React for icons, PyPDF2 for PDF processing

## Setup

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend

```bash
# Navigate to server directory
cd server

# Install Python requirements
pip install -r requirements.txt

# Start the server
python api.py
```

## Project Structure

- `/src`: React frontend code
  - `/components`: Reusable UI components
  - `/pages`: Page components
  - `/context`: React context for state management
  - `/services`: Services for API calls
  - `/types`: TypeScript interfaces
- `/server`: Python backend code
  - `api.py`: Flask server with skill extraction logic
  - `requirements.txt`: Python dependencies

## How It Works

1. User uploads a resume file (PDF or text)
2. The file is sent to the Python backend
3. Backend extracts text from the file and identifies skills
4. Results are returned to the frontend and displayed as tags
5. User can filter, copy, or download the extracted skills