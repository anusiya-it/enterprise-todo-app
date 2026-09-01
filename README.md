Tech Stack

Frontend: React 19, Vite, React Router, Axios, Lucide Icons Backend: FastAPI, Supabase (Postgres), Pydantic Database: Supabase

Project Structure
enterprise-todo-app/
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI routes
│   │   ├── models.py      # Pydantic schemas
│   │   └── database.py    # Supabase client setup
│   ├── requirements.txt
│   └── .env                # Not committed — see Setup
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, TaskCard
│   │   ├── pages/          # Home, Inbox, Projects, Activity, Upcoming, Settings, Profile, TaskDetail
│   │   ├── services/api.js # Axios calls to the backend
│   │   └── utils/formatDate.js
│   └── package.json
└── README.md
Features
Create, update, complete, and delete tasks
Multiple views: Inbox, Projects, Upcoming, Activity
Task detail page
Responsive sidebar/navbar layout
User profile and settings pages
Getting Started
Prerequisites
Node.js 18+
Python 3.11+
A Supabase project with a todos table (columns: id, text, date, completed)
Backend Setup
bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install fastapi uvicorn supabase python-dotenv

Create a backend/.env file (never commit this):

SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key

Note: backend/requirements.txt in this repo is currently empty — generate one after installing dependencies with pip freeze > requirements.txt.

Run the API:

bash
uvicorn app.main:app --reload

The API will be available at http://localhost:8000.

Frontend Setup
bash
cd frontend
npm install
npm run dev

The app will be available at http://localhost:5173.

By default the frontend talks to http://localhost:8000. To point it elsewhere, set VITE_API_URL in a frontend/.env file.

API Endpoints
Method	Endpoint	Description
GET	/get_works	List all tasks
POST	/add_work	Create a task
PUT	/update_work/{id}	Update a task
DELETE	/remove_work/{id}	Delete a task
Recommended .gitignore

Add this at the project root:

# Env
.env
*.env

# Python
venv/
__pycache__/
*.pyc

# Node
node_modules/
dist/
