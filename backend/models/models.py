# from sqlalchemy import Column, Integer, String, DateTime
# from sqlalchemy.orm import relationship
# from datetime import datetime
# from database.database import Base


# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String(255), nullable=False)
#     email = Column(String(255), unique=True, index=True, nullable=False)
#     password_hash = Column(String(255), nullable=False)
#     role = Column(String, nullable=True)
#     created_at = Column(DateTime, default=datetime.utcnow)

#     # Relationship with Enrollment
#     enrollments = relationship(
#         "Enrollment", back_populates="user", cascade="all, delete-orphan"
#     )
#     completed_lessons = relationship("CompletedLesson", back_populates="user", cascade="all, delete-orphan")

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # ✅ Relationships
    enrollments = relationship("Enrollment", back_populates="user", cascade="all, delete-orphan")
    completed_lessons = relationship("CompletedLesson", back_populates="user", cascade="all, delete-orphan")
    submissions = relationship("Submission", back_populates="student", cascade="all, delete-orphan")  # ✅ add this
