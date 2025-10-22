from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import database
from models import models

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/overview")
def get_admin_overview(db: Session = Depends(database.get_db)):
    try:
        # 🧮 Basic stats
        total_students = db.query(models.User).filter(models.User.role == "student").count()
        total_enrollments = db.query(models.Enrollment).count()
        total_courses = db.query(models.Course).count()
        free_courses = db.query(models.Course).filter(models.Course.type == "free").count()
        paid_courses = db.query(models.Course).filter(models.Course.type == "paid").count()

        # 🧾 Detailed course data + students enrolled
        courses = (
            db.query(models.Course)
            .options(joinedload(models.Course.modules))
            .all()
        )

        courses_data = []
        for course in courses:
            enrolled_students = (
                db.query(models.User)
                .join(models.Enrollment, models.User.id == models.Enrollment.user_id)
                .filter(models.Enrollment.course_id == course.id)
                .all()
            )

            courses_data.append({
                "id": course.id,
                "title": course.title,
                "type": course.type,
                "price": course.price,
                "total_students": len(enrolled_students),
                "students": [
                    {"id": s.id, "name": s.name, "email": s.email}
                    for s in enrolled_students
                ]
            })

        return {
            "stats": {
                "total_students": total_students,
                "total_courses": total_courses,
                "total_enrollments": total_enrollments,
                "free_courses": free_courses,
                "paid_courses": paid_courses,
            },
            "courses": courses_data,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching overview: {str(e)}")
