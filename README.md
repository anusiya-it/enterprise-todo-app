# Enterprise Todo App

A full-stack Todo application built with React, FastAPI, and Supabase.

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- Lucide Icons

### Backend
- FastAPI
- Pydantic
- Uvicorn

### Database
- Supabase (PostgreSQL)

---

## Project Structure

```text
enterprise-todo-app/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI routes
│   │   ├── models.py        # Pydantic schemas
│   │   └── database.py      # Supabase client setup
│   ├── requirements.txt
│   └── .env                 # Not committed — see Setup
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, TaskCard
│   │   ├── pages/           # Home, Inbox, Projects, Activity, Upcoming, Settings, Profile, TaskDetail
│   │   ├── services/
│   │   │   └── api.js       # Axios calls to the backend
│   │   └── utils/
│   │       └── formatDate.js
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## Features

- Create tasks
- Update tasks
- Complete tasks
- Delete tasks
- Multiple views:
  - Inbox
  - Projects
  - Upcoming
  - Activity
- Task detail page
- Responsive sidebar/navbar layout
- User profile page
- User settings page

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- Python 3.11+
- A Supabase project with a `todos` table

### Supabase Table

The `todos` table should contain the following columns:

| Column | Description |
|---|---|
| `id` | Unique task ID |
| `text` | Task description |
| `date` | Task date |
| `completed` | Task completion status |

---

## Backend Setup

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Create a Python virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install fastapi uvicorn supabase python-dotenv
```

### 5. Create the environment file

Create a file named:

```text
backend/.env
```

Add your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key
```

> **Important:** Never commit the `.env` file to GitHub.

### 6. Generate `requirements.txt`

After installing the dependencies, run:

```bash
pip freeze > requirements.txt
```

> **Note:** `backend/requirements.txt` in this repository is currently empty. Generate it using the command above.

### 7. Run the API

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

---

## Frontend Setup

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/get_works` | List all tasks |
| `POST` | `/add_work` | Create a task |
| `PUT` | `/update_work/{id}` | Update a task |
| `DELETE` | `/remove_work/{id}` | Delete a task |

---

## Frontend API Configuration

By default, the frontend communicates with:

```text
http://localhost:8000
```

To point the frontend to a different backend, create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://your-backend-url
```

---

## Recommended `.gitignore`

Add the following to the `.gitignore` file at the project root:

```gitignore
# Environment files
.env
*.env

# Python
venv/
__pycache__/
*.pyc

# Node
node_modules/
dist/
```

---

## Running the Project

### Start Backend

Open a terminal:

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## Project Overview

The Enterprise Todo App is a full-stack task management application.

The **React frontend** provides the user interface, while the **FastAPI backend** handles API requests. **Supabase PostgreSQL** is used to store and manage todo data.

```text
React Frontend
      │
      │ Axios
      ▼
FastAPI Backend
      │
      │ Supabase Client
      ▼
Supabase PostgreSQL
```
