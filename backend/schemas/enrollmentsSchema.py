from pydantic import BaseModel

class EnrollmentCreate(BaseModel):
    user_email: str
    course_id: int

class EnrollmentOut(BaseModel):
    status: str
    message: str
