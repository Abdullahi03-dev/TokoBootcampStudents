from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from database.database import get_db
from models.certificates import Certificate
from models.enrollmentsModel import Enrollment
from models.models import User
from models.coursesModel import Course
from typing import List

router = APIRouter(prefix="/certificates", tags=["certificates"])


@router.get("/", response_model=List[dict])
def get_user_certificates(email: str = Query(...), db: Session = Depends(get_db)):
    """
    Fetch all courses (active + completed) a user is enrolled in,
    and include their certificates if they exist.
    """
    # 1️⃣ Find the user
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 2️⃣ Fetch all enrollments (active and completed)
    enrollments = (
        db.query(Enrollment)
        .options(joinedload(Enrollment.course))
        .filter(Enrollment.user_id == user.id)
        .all()
    )

    if not enrollments:
        return []

    # 3️⃣ Build a list of all enrolled courses with their certificates
    results = []
    for enrollment in enrollments:
        course = enrollment.course
        certificate = (
            db.query(Certificate)
            .filter(Certificate.course_id == course.id)
            .first()
        )

        results.append({
            "course_id": course.id,
            "course_name": course.title,
            "status": enrollment.status,
            "certificate_url": certificate.file_url if certificate else None,
        })

    return results
