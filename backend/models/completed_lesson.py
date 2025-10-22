from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from database.database import Base

class CompletedLesson(Base):
    __tablename__ = "completed_lessons"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    submodule_id = Column(Integer, ForeignKey("submodules.id", ondelete="CASCADE"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    completed_at = Column(DateTime(timezone=True), default=func.now())

    # ✅ Proper relationships
    user = relationship("User", back_populates="completed_lessons")
    submodule = relationship("Submodule", back_populates="completed_lessons")
    course = relationship("Course", back_populates="completed_lessons")
