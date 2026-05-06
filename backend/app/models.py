from pydantic import BaseModel, root_validator
from typing import Optional

class TodoBase(BaseModel):
    """
    Base properties for the Enterprise-Todo-App.
    Updated to match the React frontend keys: 'text' and 'date'.
    """
    text: str
    date: str
    completed: bool = False

    @root_validator(pre=True)
    def normalize_fields(cls, values):
        if 'task' in values and 'text' not in values:
            values['text'] = values.pop('task')
        if 'is_completed' in values and 'completed' not in values:
            values['completed'] = values.pop('is_completed')
        return values

class TodoCreate(TodoBase):
    """
    Data required to create a new activity.
    Inherits text, date, and completed status.
    """
    pass

class TodoUpdate(BaseModel):
    """
    Data used for updating an existing work item (Settings/Edit/Redo).
    Fields are optional to allow partial updates.
    """
    text: Optional[str] = None
    date: Optional[str] = None
    completed: Optional[bool] = None

    @root_validator(pre=True)
    def normalize_fields(cls, values):
        if 'task' in values and 'text' not in values:
            values['text'] = values.pop('task')
        if 'is_completed' in values and 'completed' not in values:
            values['completed'] = values.pop('is_completed')
        return values

class TodoResponse(TodoBase):
    """
    How the data looks when sent back from Supabase to the frontend.
    """
    id: int

    class Config:
        from_attributes = True