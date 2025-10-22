# from fastapi import APIRouter, Depends,HTTPException
# from sqlalchemy.orm import Session
# from database.database import get_db
# from models import User, Course, Enrollment
# from schemas.enrollmentsSchema import EnrollmentCreate, EnrollmentOut
# from datetime import datetime

# router = APIRouter(prefix="/enrollments", tags=["Enrollments"])

# @router.post("/", response_model=EnrollmentOut)
# def enroll_user(payload: EnrollmentCreate, db: Session = Depends(get_db)):
#     # 1. Get the user by email
#     user = db.query(User).filter(User.email == payload.user_email).first()
#     if not user:
#         return {"status": "error", "message": "User not found"}

#     # 2. Get the course
#     course = db.query(Course).filter(Course.id == payload.course_id).first()
#     if not course:
#         return {"status": "error", "message": "Course not found"}

#     # 3. Check if the user has ANY active enrollment
#     active_enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"
#     ).first()

#     if active_enrollment:
#         if active_enrollment.course_id == course.id:
#             return {"status": "exists", "message": "You are already enrolled in this course."}
#         else:
#             # User already has another active course
#             active_course = db.query(Course).filter(Course.id == active_enrollment.course_id).first()
#             return {
#                 "status": "restricted",
#                 "message": f"You are already enrolled in '{active_course.title}'. Complete it before enrolling in another course."
#             }

#     # 4. If not active in any course, allow enrollment
#     enrollment = Enrollment(
#         user_id=user.id,
#         course_id=course.id,
#         status="active",
#         enrolled_at=datetime.utcnow()
#     )
#     db.add(enrollment)
#     db.commit()
#     db.refresh(enrollment)

#     return {"status": "success", "message": f"Enrolled in {course.title}"}




# @router.get("/check/{email}")
# def check_enrollment_status(email: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         return {"status": "error", "message": "User not found"}

#     active_enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"
#     ).first()

#     if active_enrollment:
#         course = db.query(Course).filter(Course.id == active_enrollment.course_id).first()
#         return {
#             "status": "active",
#             "enrolled": True,
#             "course": {"id": course.id, "title": course.title}
#         }
#     else:
#         return {"status": "none", "enrolled": False}






# @router.get("/user/{email}")
# def get_user_enrolled_course(email: str, db: Session = Depends(get_db)):
#     # 1️⃣ Find user by email
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # 2️⃣ Check enrollment
#     enrollment = db.query(Enrollment).filter(Enrollment.user_id == user.id).first()
#     if not enrollment:
#         raise HTTPException(status_code=404, detail="User not enrolled in any course")

#     # 3️⃣ Get course details using the course_id
#     course = db.query(Course).filter(Course.id == enrollment.course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")

#     # ✅ Convert SQLAlchemy object → dict manually
#     course_data = {
#         "id": course.id,
#         "title": course.title,
#         "description": course.description,
#         "duration": course.duration,
#         "type": course.type.value if hasattr(course.type, "value") else course.type,
#         "price": course.price,
#         "image": course.image,
#         "modules": [
#             {
#                 "id": module.id,
#                 "day": module.day,
#                 "submodules": [
#                     {
#                         "id": sub.id,
#                         "title": sub.title,
#                         "link": sub.link
#                     }
#                     for sub in module.submodules
#                 ]
#             }
#             for module in course.modules
#         ],
#         "enrolled_at": enrollment.enrolled_at.isoformat() if enrollment.enrolled_at else None
#     }

# #     return course_data

# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from database.database import get_db
# from models import User, Course, Enrollment
# from models.coursesModel import Submodule
# from models.completed_lesson import CompletedLesson
# from schemas.enrollmentsSchema import EnrollmentCreate, EnrollmentOut
# from datetime import datetime
# from pydantic import BaseModel

# router = APIRouter(prefix="/enrollments", tags=["Enrollments"])


# # ======================================================
# # 1️⃣ ENROLL USER IN A COURSE
# # ======================================================
# @router.post("/", response_model=EnrollmentOut)
# def enroll_user(payload: EnrollmentCreate, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == payload.user_email).first()
#     if not user:
#         return {"status": "error", "message": "User not found"}

#     course = db.query(Course).filter(Course.id == payload.course_id).first()
#     if not course:
#         return {"status": "error", "message": "Course not found"}

#     active_enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"
#     ).first()

#     if active_enrollment:
#         if active_enrollment.course_id == course.id:
#             return {"status": "exists", "message": "You are already enrolled in this course."}
#         else:
#             active_course = db.query(Course).filter(Course.id == active_enrollment.course_id).first()
#             return {
#                 "status": "restricted",
#                 "message": f"You are already enrolled in '{active_course.title}'. Complete it before enrolling in another course."
#             }

#     enrollment = Enrollment(
#         user_id=user.id,
#         course_id=course.id,
#         status="active",
#         enrolled_at=datetime.utcnow()
#     )
#     db.add(enrollment)
#     db.commit()
#     db.refresh(enrollment)

#     return {"status": "success", "message": f"Enrolled in {course.title}"}


# # ======================================================
# # 2️⃣ CHECK ENROLLMENT STATUS
# # ======================================================
# @router.get("/check/{email}")
# def check_enrollment_status(email: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         return {"status": "error", "message": "User not found"}

#     active_enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"
#     ).first()

#     if active_enrollment:
#         course = db.query(Course).filter(Course.id == active_enrollment.course_id).first()
#         return {
#             "status": "active",
#             "enrolled": True,
#             "course": {"id": course.id, "title": course.title}
#         }
#     else:
#         return {"status": "none", "enrolled": False}


# # ======================================================
# # 3️⃣ GET USER ENROLLED COURSE (FULL DETAILS)
# # ======================================================
# @router.get("/user/{email}")
# def get_user_enrolled_course(email: str, db: Session = Depends(get_db)):
#     # ✅ Find the user
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # ✅ Find an active enrollment
#     enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"   # <-- Only active enrollments
#     ).first()

#     if not enrollment:
#         raise HTTPException(status_code=404, detail="User is not actively enrolled in any course")

#     # ✅ Get the course
#     course = db.query(Course).filter(Course.id == enrollment.course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")

#     # ✅ Prepare course data
#     course_data = {
#         "id": course.id,
#         "title": course.title,
#         "description": course.description,
#         "duration": course.duration,
#         "type": course.type.value if hasattr(course.type, "value") else course.type,
#         "price": course.price,
#         "image": course.image,
#         "modules": [
#             {
#                 "id": module.id,
#                 "day": module.day,
#                 "submodules": [
#                     {"id": sub.id, "title": sub.title, "link": sub.link}
#                     for sub in module.submodules
#                 ]
#             }
#             for module in course.modules
#         ],
#         "enrolled_at": enrollment.enrolled_at.isoformat() if enrollment.enrolled_at else None
#     }

#     return course_data


# class ToggleLessonPayload(BaseModel):
#     user_email: str
#     submodule_id: int

# # Helpers
# def _get_user_by_email(db: Session, email: str):
#     return db.query(User).filter(User.email == email).first()

# def _get_enrollment_for_user_course(db: Session, user_id: int, course_id: int):
#     return (
#         db.query(Enrollment)
#         .filter(Enrollment.user_id == user_id, Enrollment.course_id == course_id)
#         .order_by(Enrollment.enrolled_at.desc())
#         .first()
#     )

# @router.post("/complete_lesson")
# def complete_lesson(payload: ToggleLessonPayload, db: Session = Depends(get_db)):
#     """
#     Mark lesson as completed — cannot be undone once set.
#     If course is already completed, reject request.
#     """
#     user = _get_user_by_email(db, payload.user_email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     submodule = db.query(Submodule).filter(Submodule.id == payload.submodule_id).first()
#     if not submodule:
#         raise HTTPException(status_code=404, detail="Submodule not found")

#     module = db.query(Module).filter(Module.id == submodule.module_id).first()
#     if not module:
#         raise HTTPException(status_code=404, detail="Module not found")

#     course_id = module.course_id
#     enrollment = _get_enrollment_for_user_course(db, user.id, course_id)
#     if not enrollment:
#         raise HTTPException(status_code=404, detail="User not enrolled in this course")

#     if enrollment.status == "completed":
#         raise HTTPException(status_code=400, detail="Course already completed. No changes allowed.")

#     # Check if already marked as completed
#     existing = db.query(CompletedLesson).filter(
#         CompletedLesson.user_id == user.id,
#         CompletedLesson.submodule_id == payload.submodule_id,
#         CompletedLesson.course_id == course_id
#     ).first()

#     if existing:
#         # Prevent uncompleting
#         raise HTTPException(status_code=400, detail="This lesson is already completed and cannot be undone.")

#     # Add as new completed lesson
#     new = CompletedLesson(user_id=user.id, submodule_id=payload.submodule_id, course_id=course_id)
#     db.add(new)
#     db.commit()

#     return {"status": "added", "submodule_id": payload.submodule_id}

# @router.get("/completed_lessons/{email}")
# def get_completed_lessons(email: str, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     enrollment = (
#         db.query(Enrollment)
#         .filter(Enrollment.user_id == user.id)
#         .order_by(Enrollment.enrolled_at.desc())
#         .first()
#     )
#     if not enrollment:
#         return []

#     lessons = db.query(CompletedLesson).filter(
#         CompletedLesson.user_id == user.id,
#         CompletedLesson.course_id == enrollment.course_id
#     ).all()

#     return [{"submodule_id": l.submodule_id} for l in lessons]

# @router.put("/mark-complete/{email}")
# def mark_enrollment_complete(email: str, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     active = (
#         db.query(Enrollment)
#         .filter(Enrollment.user_id == user.id, Enrollment.status == "active")
#         .order_by(Enrollment.enrolled_at.desc())
#         .first()
#     )

#     if not active:
#         raise HTTPException(status_code=404, detail="No active enrollment found")

#     active.status = "completed"
#     active.completed_at = datetime.utcnow()
#     db.commit()

#     return {"status": "success", "message": "Course marked as completed"}



# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from database.database import get_db
# from models import User, Course, Enrollment
# from models.coursesModel import Module, Submodule
# from models.completed_lesson import CompletedLesson
# from schemas.enrollmentsSchema import EnrollmentCreate, EnrollmentOut
# from datetime import datetime
# from pydantic import BaseModel

# router = APIRouter(prefix="/enrollments", tags=["Enrollments"])

# # Helper Functions
# def _get_user_by_email(db: Session, email: str):
#     return db.query(User).filter(User.email == email).first()

# def _get_enrollment_for_user_course(db: Session, user_id: int, course_id: int):
#     return (
#         db.query(Enrollment)
#         .filter(Enrollment.user_id == user_id, Enrollment.course_id == course_id)
#         .order_by(Enrollment.enrolled_at.desc())
#         .first()
#     )


# # ======================================================
# # 1️⃣ ENROLL USER IN A COURSE
# # ======================================================
# @router.post("/", response_model=EnrollmentOut)
# def enroll_user(payload: EnrollmentCreate, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, payload.user_email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     course = db.query(Course).filter(Course.id == payload.course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")

#     existing = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.course_id == course.id
#     ).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="Already enrolled in this course")

#     active_enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"
#     ).first()
#     if active_enrollment and active_enrollment.course_id != course.id:
#         raise HTTPException(
#             status_code=400,
#             detail="You already have an active course. Complete it first."
#         )

#     enrollment = Enrollment(
#         user_id=user.id,
#         course_id=course.id,
#         status="active",
#         enrolled_at=datetime.utcnow()
#     )
#     db.add(enrollment)
#     db.commit()
#     db.refresh(enrollment)
#     return {"status": "success", "message": f"Enrolled in {course.title}"}


# # ======================================================
# # 2️⃣ FETCH USER ENROLLED COURSE + MODULES + SUBMODULES
# # ======================================================
# @router.get("/user/{email}")
# def get_user_enrolled_course(email: str, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     enrollment = (
#         db.query(Enrollment)
#         .filter(Enrollment.user_id == user.id)
#         .order_by(Enrollment.enrolled_at.desc())
#         .first()
#     )
#     if not enrollment:
#         raise HTTPException(status_code=404, detail="No course found for this user")

#     course = db.query(Course).filter(Course.id == enrollment.course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")

#     return {
#         "id": course.id,
#         "title": course.title,
#         "status": enrollment.status,
#         "modules": [
#             {
#                 "id": mod.id,
#                 "day": mod.day,
#                 # "title": mod.title,
#                 "submodules": [
#                     {"id": sub.id, "title": sub.title, "link": sub.link}
#                     for sub in mod.submodules
#                 ],
#             }
#             for mod in course.modules
#         ],
#     }


# # ======================================================
# # 3️⃣ COMPLETE LESSON (One-way only)
# # ======================================================
# class ToggleLessonPayload(BaseModel):
#     user_email: str
#     submodule_id: int

# @router.post("/complete_lesson")
# def complete_lesson(payload: ToggleLessonPayload, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, payload.user_email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     submodule = db.query(Submodule).filter(Submodule.id == payload.submodule_id).first()
#     if not submodule:
#         raise HTTPException(status_code=404, detail="Submodule not found")

#     module = db.query(Module).filter(Module.id == submodule.module_id).first()
#     if not module:
#         raise HTTPException(status_code=404, detail="Module not found")

#     enrollment = _get_enrollment_for_user_course(db, user.id, module.course_id)
#     if not enrollment:
#         raise HTTPException(status_code=404, detail="User not enrolled in this course")

#     if enrollment.status == "completed":
#         raise HTTPException(status_code=400, detail="Course already completed.")

#     existing = db.query(CompletedLesson).filter(
#         CompletedLesson.user_id == user.id,
#         CompletedLesson.submodule_id == payload.submodule_id
#     ).first()

#     if existing:
#         raise HTTPException(status_code=400, detail="Lesson already completed.")

#     new = CompletedLesson(
#         user_id=user.id,
#         course_id=module.course_id,
#         submodule_id=payload.submodule_id
#     )
#     db.add(new)
#     db.commit()

#     return {"status": "added", "submodule_id": payload.submodule_id}


# # ======================================================
# # 4️⃣ FETCH COMPLETED LESSONS
# # ======================================================
# @router.get("/completed_lessons/{email}")
# def get_completed_lessons(email: str, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     lessons = db.query(CompletedLesson).filter(CompletedLesson.user_id == user.id).all()
#     return [{"submodule_id": l.submodule_id} for l in lessons]


# # ======================================================
# # 5️⃣ MARK ENROLLMENT COMPLETE (Once 100%)
# # ======================================================
# @router.put("/update-status/{email}")
# def mark_enrollment_complete(email: str, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     active = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id, Enrollment.status == "active"
#     ).first()
#     if not active:
#         raise HTTPException(status_code=404, detail="No active course found")

#     active.status = "completed"
#     active.completed_at = datetime.utcnow()
#     db.commit()
#     return {"status": "success", "message": "Course marked as completed"}





# # # ======================================================
# # # 2️⃣ CHECK ENROLLMENT STATUS
# # # ======================================================
# @router.get("/check/{email}")
# def check_enrollment_status(email: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         return {"status": "error", "message": "User not found"}

#     active_enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"
#     ).first()

#     if active_enrollment:
#         course = db.query(Course).filter(Course.id == active_enrollment.course_id).first()
#         return {
#             "status": "active",
#             "enrolled": True,
#             "course": {"id": course.id, "title": course.title}
#         }
#     else:
#         return {"status": "none", "enrolled": False}




# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from database.database import get_db
# from models import User, Course, Enrollment
# from models.coursesModel import Module, Submodule
# from models.completed_lesson import CompletedLesson
# from schemas.enrollmentsSchema import EnrollmentCreate, EnrollmentOut
# from datetime import datetime
# from pydantic import BaseModel

# router = APIRouter(prefix="/enrollments", tags=["Enrollments"])

# # ======================================================
# # Helper Functions
# # ======================================================
# def _get_user_by_email(db: Session, email: str):
#     return db.query(User).filter(User.email == email).first()

# def _get_enrollment_for_user_course(db: Session, user_id: int, course_id: int):
#     return (
#         db.query(Enrollment)
#         .filter(Enrollment.user_id == user_id, Enrollment.course_id == course_id)
#         .order_by(Enrollment.enrolled_at.desc())
#         .first()
#     )


# # ======================================================
# # 1️⃣ ENROLL USER IN A COURSE
# # ======================================================
# @router.post("/", response_model=EnrollmentOut)
# def enroll_user(payload: EnrollmentCreate, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, payload.user_email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     course = db.query(Course).filter(Course.id == payload.course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")

#     existing = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.course_id == course.id
#     ).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="Already enrolled in this course")

#     active_enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"
#     ).first()
#     if active_enrollment and active_enrollment.course_id != course.id:
#         raise HTTPException(
#             status_code=400,
#             detail="You already have an active course. Complete it first."
#         )

#     enrollment = Enrollment(
#         user_id=user.id,
#         course_id=course.id,
#         status="active",
#         enrolled_at=datetime.utcnow()
#     )
#     db.add(enrollment)
#     db.commit()
#     db.refresh(enrollment)
#     return {"status": "success", "message": f"Enrolled in {course.title}"}


# # ======================================================
# # 2️⃣ FETCH USER ENROLLED COURSE + MODULES + SUBMODULES (WITH CONTENT)
# # ======================================================
# @router.get("/user/{email}")
# def get_user_enrolled_course(email: str, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     enrollment = (
#         db.query(Enrollment)
#         .filter(Enrollment.user_id == user.id)
#         .order_by(Enrollment.enrolled_at.desc())
#         .first()
#     )
#     if not enrollment:
#         raise HTTPException(status_code=404, detail="No course found for this user")

#     course = db.query(Course).filter(Course.id == enrollment.course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")

#     # ✅ Return both link and content from submodules
#     return {
#         "id": course.id,
#         "title": course.title,
#         "status": enrollment.status,
#         "modules": [
#             {
#                 "id": mod.id,
#                 "day": mod.day,
#                 # "title": mod.title,
#                 "submodules": [
#                     {
#                         "id": sub.id,
#                         "title": sub.title,
#                         "link": sub.link,
#                         "content": sub.content  # ✅ Include TipTap content here
#                     }
#                     for sub in mod.submodules
#                 ],
#             }
#             for mod in course.modules
#         ],
#     }


# # ======================================================
# # 3️⃣ COMPLETE LESSON (One-way only)
# # ======================================================
# class ToggleLessonPayload(BaseModel):
#     user_email: str
#     submodule_id: int

# @router.post("/complete_lesson")
# def complete_lesson(payload: ToggleLessonPayload, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, payload.user_email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     submodule = db.query(Submodule).filter(Submodule.id == payload.submodule_id).first()
#     if not submodule:
#         raise HTTPException(status_code=404, detail="Submodule not found")

#     module = db.query(Module).filter(Module.id == submodule.module_id).first()
#     if not module:
#         raise HTTPException(status_code=404, detail="Module not found")

#     enrollment = _get_enrollment_for_user_course(db, user.id, module.course_id)
#     if not enrollment:
#         raise HTTPException(status_code=404, detail="User not enrolled in this course")

#     if enrollment.status == "completed":
#         raise HTTPException(status_code=400, detail="Course already completed.")

#     existing = db.query(CompletedLesson).filter(
#         CompletedLesson.user_id == user.id,
#         CompletedLesson.submodule_id == payload.submodule_id
#     ).first()

#     if existing:
#         raise HTTPException(status_code=400, detail="Lesson already completed.")

#     new = CompletedLesson(
#         user_id=user.id,
#         course_id=module.course_id,
#         submodule_id=payload.submodule_id
#     )
#     db.add(new)
#     db.commit()

#     return {"status": "added", "submodule_id": payload.submodule_id}


# # ======================================================
# # 4️⃣ FETCH COMPLETED LESSONS
# # ======================================================
# @router.get("/completed_lessons/{email}")
# def get_completed_lessons(email: str, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     lessons = db.query(CompletedLesson).filter(CompletedLesson.user_id == user.id).all()
#     return [{"submodule_id": l.submodule_id} for l in lessons]


# # ======================================================
# # 5️⃣ MARK ENROLLMENT COMPLETE (Once 100%)
# # ======================================================
# @router.put("/update-status/{email}")
# def mark_enrollment_complete(email: str, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     active = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id, Enrollment.status == "active"
#     ).first()
#     if not active:
#         raise HTTPException(status_code=404, detail="No active course found")

#     active.status = "completed"
#     active.completed_at = datetime.utcnow()
#     db.commit()
#     return {"status": "success", "message": "Course marked as completed"}


# # ======================================================
# # 6️⃣ CHECK ENROLLMENT STATUS
# # ======================================================
# @router.get("/check/{email}")
# def check_enrollment_status(email: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         return {"status": "error", "message": "User not found"}

#     active_enrollment = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.status == "active"
#     ).first()

#     if active_enrollment:
#         course = db.query(Course).filter(Course.id == active_enrollment.course_id).first()
#         return {
#             "status": "active",
#             "enrolled": True,
#             "course": {"id": course.id, "title": course.title}
#         }
#     else:
#         return {"status": "none", "enrolled": False}






from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from pydantic import BaseModel
from database.database import get_db
from models import User, Course, Enrollment
from models.coursesModel import Module, Submodule
from models.completed_lesson import CompletedLesson
from schemas.enrollmentsSchema import EnrollmentCreate, EnrollmentOut

router = APIRouter(prefix="/enrollments", tags=["Enrollments"])

# ======================================================
# Helper Functions
# ======================================================
def _get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def _get_enrollment_for_user_course(db: Session, user_id: int, course_id: int):
    return (
        db.query(Enrollment)
        .filter(Enrollment.user_id == user_id, Enrollment.course_id == course_id)
        .order_by(Enrollment.enrolled_at.desc())
        .first()
    )

# ======================================================
# 1️⃣ ENROLL USER IN A COURSE
# ======================================================
@router.post("/", response_model=EnrollmentOut)
def enroll_user(payload: EnrollmentCreate, db: Session = Depends(get_db)):
    user = _get_user_by_email(db, payload.user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    course = db.query(Course).filter(Course.id == payload.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing = db.query(Enrollment).filter(
        Enrollment.user_id == user.id,
        Enrollment.course_id == course.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")

    active_enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == user.id,
        Enrollment.status == "active"
    ).first()
    if active_enrollment and active_enrollment.course_id != course.id:
        raise HTTPException(
            status_code=400,
            detail="You already have an active course. Complete it first."
        )

    enrollment = Enrollment(
        user_id=user.id,
        course_id=course.id,
        status="active",
        enrolled_at=datetime.utcnow()
    )
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return {"status": "success", "message": f"Enrolled in {course.title}"}


# ======================================================
# 2️⃣ FETCH USER ENROLLED COURSE + MODULES + SUBMODULES
# ======================================================
@router.get("/user/{email}")
def get_user_enrolled_course(email: str, db: Session = Depends(get_db)):
    user = _get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    enrollment = (
        db.query(Enrollment)
        .filter(Enrollment.user_id == user.id)
        .order_by(Enrollment.enrolled_at.desc())
        .first()
    )
    if not enrollment:
        raise HTTPException(status_code=404, detail="No course found for this user")

    course = db.query(Course).filter(Course.id == enrollment.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    return {
        "id": course.id,
        "title": course.title,
        "status": enrollment.status,
        "modules": [
            {
                "id": mod.id,
                "day": mod.day,
                # "title": mod.title,
                "submodules": [
                    {
                        "id": sub.id,
                        "title": sub.title,
                        "link": sub.link,
                        "content": sub.content
                    }
                    for sub in mod.submodules
                ],
            }
            for mod in course.modules
        ],
    }

# ======================================================
# 3️⃣ COMPLETE LESSON
# ======================================================
class ToggleLessonPayload(BaseModel):
    user_email: str
    submodule_id: int

@router.post("/complete_lesson")
def complete_lesson(payload: ToggleLessonPayload, db: Session = Depends(get_db)):
    user = _get_user_by_email(db, payload.user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    submodule = db.query(Submodule).filter(Submodule.id == payload.submodule_id).first()
    if not submodule:
        raise HTTPException(status_code=404, detail="Submodule not found")

    module = db.query(Module).filter(Module.id == submodule.module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")

    enrollment = _get_enrollment_for_user_course(db, user.id, module.course_id)
    if not enrollment:
        raise HTTPException(status_code=404, detail="User not enrolled in this course")

    existing = db.query(CompletedLesson).filter(
        CompletedLesson.user_id == user.id,
        CompletedLesson.submodule_id == payload.submodule_id,
        CompletedLesson.course_id == module.course_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Lesson already completed.")

    new = CompletedLesson(
        user_id=user.id,
        course_id=module.course_id,
        submodule_id=payload.submodule_id
    )
    db.add(new)
    db.commit()

    return {"status": "added", "submodule_id": payload.submodule_id}

# ======================================================
# 4️⃣ FETCH COMPLETED LESSONS BY COURSE
# ======================================================
@router.get("/completed_lessons/{email}/{course_id}")
def get_completed_lessons(email: str, course_id: int, db: Session = Depends(get_db)):
    user = _get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    lessons = db.query(CompletedLesson).filter(
        CompletedLesson.user_id == user.id,
        CompletedLesson.course_id == course_id
    ).all()
    return [{"submodule_id": l.submodule_id} for l in lessons]

# ======================================================
# 5️⃣ MARK COURSE COMPLETE
# ======================================================
# @router.put("/update-status/{email}/{course_id}")
# def mark_enrollment_complete(email: str, course_id: int, db: Session = Depends(get_db)):
#     user = _get_user_by_email(db, email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     active = db.query(Enrollment).filter(
#         Enrollment.user_id == user.id,
#         Enrollment.course_id == course_id,
#         Enrollment.status == "active"
#     ).first()
#     if not active:
#         raise HTTPException(status_code=404, detail="No active course found")

#     active.status = "completed"
#     active.completed_at = datetime.utcnow()
#     db.commit()
#     return {"status": "success", "message": "Course marked as completed"}



@router.put("/update-status/{email}")
def mark_enrollment_complete(email: str, db: Session = Depends(get_db)):
    user = _get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    active = db.query(Enrollment).filter(
        Enrollment.user_id == user.id, Enrollment.status == "active"
    ).first()
    if not active:
        raise HTTPException(status_code=404, detail="No active course found")

    active.status = "completed"
    active.completed_at = datetime.utcnow()
    db.commit()
    return {"status": "success", "message": "Course marked as completed"}




# # ======================================================
# # 6️⃣ CHECK ENROLLMENT STATUS
# # ======================================================
@router.get("/check/{email}")
def check_enrollment_status(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return {"status": "error", "message": "User not found"}

    active_enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == user.id,
        Enrollment.status == "active"
    ).first()

    if active_enrollment:
        course = db.query(Course).filter(Course.id == active_enrollment.course_id).first()
        return {
            "status": "active",
            "enrolled": True,
            "course": {"id": course.id, "title": course.title}
        }
    else:
        return {"status": "none", "enrolled": False}
    
    
    

# # ======================================================
# # 4️⃣ FETCH COMPLETED LESSONS
# # ======================================================
@router.get("/completed_lessons/{email}")
def get_completed_lessons(email: str, db: Session = Depends(get_db)):
    user = _get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    lessons = db.query(CompletedLesson).filter(CompletedLesson.user_id == user.id).all()
    return [{"submodule_id": l.submodule_id} for l in lessons]