# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from sqlalchemy import Column, Integer, String, DateTime
# from datetime import datetime
# from pydantic import BaseModel
# from database.database import get_db, Base

# router = APIRouter(prefix="/announcements", tags=["Announcements"])

# # 🧱 MODEL
# class Announcement(Base):
#     __tablename__ = "announcements"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String(255), nullable=False)
#     description = Column(String, nullable=False)
#     link = Column(String(255), nullable=True)
#     date = Column(DateTime, default=datetime.utcnow)

# # 🧾 SCHEMAS
# class AnnouncementBase(BaseModel):
#     title: str
#     description: str
#     link: str | None = None

# class AnnouncementCreate(AnnouncementBase):
#     pass

# class AnnouncementUpdate(AnnouncementBase):
#     pass

# class AnnouncementResponse(AnnouncementBase):
#     id: int
#     date: datetime
#     class Config:
#         orm_mode = True

# # 🚀 CREATE ANNOUNCEMENT
# @router.post("/", response_model=AnnouncementResponse)
# def create_announcement(data: AnnouncementCreate, db: Session = Depends(get_db)):
#     new_announcement = Announcement(**data.dict())
#     db.add(new_announcement)
#     db.commit()
#     db.refresh(new_announcement)
#     return new_announcement

# # 📜 GET ALL ANNOUNCEMENTS
# @router.get("/", response_model=list[AnnouncementResponse])
# def get_announcements(db: Session = Depends(get_db)):
#     return db.query(Announcement).order_by(Announcement.date.desc()).all()

# # 🧩 UPDATE ANNOUNCEMENT
# @router.put("/{announcement_id}", response_model=AnnouncementResponse)
# def update_announcement(announcement_id: int, data: AnnouncementUpdate, db: Session = Depends(get_db)):
#     announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
#     if not announcement:
#         raise HTTPException(status_code=404, detail="Announcement not found")
    
#     announcement.title = data.title
#     announcement.description = data.description
#     announcement.link = data.link
#     db.commit()
#     db.refresh(announcement)
#     return announcement

# # ❌ DELETE ANNOUNCEMENT
# @router.delete("/{announcement_id}")
# def delete_announcement(announcement_id: int, db: Session = Depends(get_db)):
#     announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
#     if not announcement:
#         raise HTTPException(status_code=404, detail="Announcement not found")

#     db.delete(announcement)
#     db.commit()
#     return {"message": "Announcement deleted successfully"}


from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.database import get_db, Base
from models import models 
from models.enrollmentsModel import Enrollment
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

router = APIRouter(prefix="/announcements", tags=["Announcements"])

# ✅ Announcement Model
class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String, nullable=False)
    link = Column(String(255), nullable=True)
    date = Column(DateTime, default=datetime.utcnow)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)


# ✅ Route to get announcements for the user's active course
@router.get("/user/{email}")
def get_user_announcements(email: str, db: Session = Depends(get_db)):
    # Step 1: Find the user
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Step 2: Find active enrollment for that user
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == user.id,
        Enrollment.status == "active"
    ).first()
    if not enrollment:
        raise HTTPException(status_code=404, detail="No active enrollment found")

    # Step 3: Fetch announcements for that course_id
    announcements = db.query(Announcement).filter(
        Announcement.course_id == enrollment.course_id
    ).all()

    return announcements
