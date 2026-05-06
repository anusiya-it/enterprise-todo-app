from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .database import supabase
from .models import TodoCreate, TodoUpdate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get_works")
async def get_todos():
    response = supabase.table("todos").select("*").execute()
    if getattr(response, 'error', None):
        raise HTTPException(status_code=500, detail=str(response.error))
    return response.data

@app.post("/add_work")
async def create_todo(todo: TodoCreate):
    try:
        data = todo.dict()
        response = supabase.table("todos").insert(data).execute()
        if getattr(response, 'error', None):
            raise HTTPException(status_code=400, detail=str(response.error))
        return response.data
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/update_work/{todo_id}")
async def update_todo(todo_id: int, todo: TodoUpdate):
    try:
        update_data = todo.dict(exclude_unset=True)
        response = supabase.table("todos").update(update_data).eq("id", todo_id).execute()
        if getattr(response, 'error', None):
            raise HTTPException(status_code=400, detail=str(response.error))
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/remove_work/{todo_id}")
async def delete_todo(todo_id: int):
    try:
        response = supabase.table("todos").delete().eq("id", todo_id).execute()
        if getattr(response, 'error', None):
            raise HTTPException(status_code=400, detail=str(response.error))
        return {"message": "Success", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))