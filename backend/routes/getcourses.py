from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from typing import List  # ✅ this is what you were missing
from models import User, Course, Enrollment
from models.coursesModel import Submodule
from models.completed_lesson import CompletedLesson
from schemas.enrollmentsSchema import EnrollmentCreate, EnrollmentOut

from database.database import get_db
import models.coursesModel
import schemas.coursesSchema

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/", response_model=List[schemas.coursesSchema.CourseOut])
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(models.coursesModel.Course).all()
    return courses


@router.get("/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Return course data manually as a dict
    return {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "duration": course.duration,
        "type": course.type.value,
        "price": course.price,
        "image": course.image,
        "modules": [
            {
                "id": module.id,
                "day": module.day,
                "submodules": [
                    {"id": sub.id, "title": sub.title, "link": sub.link}
                    for sub in module.submodules
                ]
            }
            for module in course.modules
        ]
    }