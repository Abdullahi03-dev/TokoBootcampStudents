# routes/assignments_student.py
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from database.database import get_db
# adjust imports to your real module names/paths
from models.AssignmentModel import Assignment
from models.SubmissionModel import Submission
from models.enrollmentsModel import Enrollment
from models.models import User  # your User model

router = APIRouter(prefix="/assignments", tags=["Assignments - Student"])

# ---------------------------
# Helper: get user from header
# ---------------------------
def get_user_by_email(db: Session, email: str):
    if not email:
        return None
    return db.query(User).filter(User.email == email).first()


# GET assignments for the currently logged-in student
@router.get("/my", response_model=list[dict])
def get_my_assignments(
    x_user_email: str = Header(None),
    db: Session = Depends(get_db),
):
    """
    Returns assignments for courses where the student has an *active* enrollment.
    Header: x-user-email
    """
    if not x_user_email:
        raise HTTPException(status_code=400, detail="Missing x-user-email header")

    user = get_user_by_email(db, x_user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # get active enrollments for user
    enrollments = db.query(Enrollment).filter(
        Enrollment.user_id == user.id,
        Enrollment.status == "active"
    ).all()

    if not enrollments:
        return []  # student not enrolled anywhere

    course_ids = [e.course_id for e in enrollments]

    assignments = db.query(Assignment).filter(Assignment.course_id.in_(course_ids)).all()

    # return simple dict objects (avoid returning ORM objects raw)
    return [
        {
            "id": a.id,
            "course_id": a.course_id,
            "title": a.title,
            "instructions": getattr(a, "instructions", None),
        }
        for a in assignments
    ]


# GET current student's submissions
@router.get("/submissions/me", response_model=list[dict])
def get_my_submissions(
    x_user_email: str = Header(None),
    db: Session = Depends(get_db),
):
    if not x_user_email:
        raise HTTPException(status_code=400, detail="Missing x-user-email header")
    user = get_user_by_email(db, x_user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    subs = db.query(Submission).filter(Submission.student_id == user.id).order_by(Submission.submitted_at.desc()).all()
    return [
        {
            "id": s.id,
            "assignment_id": s.assignment_id,
            "submitted_link": getattr(s, "submitted_link", getattr(s, "content", None)),
            "grade": getattr(s, "grade", "Pending"),
            "submitted_at": s.submitted_at.isoformat() if s.submitted_at else None,
        }
        for s in subs
    ]


# POST submit assignment (student)
@router.post("/submit", response_model=dict)
def submit_assignment(
    assignment_id: int,
    submitted_link: str,
    x_user_email: str = Header(None),
    db: Session = Depends(get_db),
):
    """
    Submit a link for an assignment.
    - Query/body: assignment_id (int), submitted_link (str)
    - Header: x-user-email
    """
    if not x_user_email:
        raise HTTPException(status_code=400, detail="Missing x-user-email header")

    user = get_user_by_email(db, x_user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # confirm assignment exists
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    # optional: ensure student is enrolled in the course for this assignment
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == user.id,
        Enrollment.course_id == assignment.course_id,
        Enrollment.status == "active"
    ).first()
    if not enrollment:
        raise HTTPException(status_code=403, detail="You are not enrolled in this course")

    # create submission
    # note: your SubmissionModel may call the link field differently (submitted_link/content)
    
    new_sub = Submission(
    assignment_id=assignment_id,
    student_id=user.id,
    submitted_link=submitted_link,  # ✅ use the correct column
    submitted_at=datetime.utcnow()
    )

    # Optional: if your model has grade, set default
    if hasattr(new_sub, "grade"):
        new_sub.grade = "Pending"

    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)

    return {"message": "Submission saved", "submission_id": new_sub.id}
