# from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey
# from sqlalchemy.orm import relationship
# from database.database import Base
# import enum


# # -----------------------------
# # Enum for Course Type
# # -----------------------------
# class CourseTypeEnum(str, enum.Enum):
#     free = "free"
#     paid = "paid"


# # -----------------------------
# # Course Model
# # -----------------------------
# class Course(Base):
#     __tablename__ = "courses"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String(255), nullable=False)
#     description = Column(Text, nullable=True)
#     duration = Column(Integer, nullable=False)  # duration in days
#     type = Column(Enum(CourseTypeEnum), nullable=False, default=CourseTypeEnum.free)
#     price = Column(String(100), nullable=True)
#     image = Column(String(255), nullable=True)

#     # Relationships
#     modules = relationship(
#         "Module",
#         back_populates="course",
#         cascade="all, delete-orphan",
#         passive_deletes=True
#     )

#     enrollments = relationship(
#         "Enrollment",
#         back_populates="course",
#         cascade="all, delete-orphan"
#     )

#     completed_lessons = relationship("CompletedLesson", back_populates="course", cascade="all, delete-orphan")

# # -----------------------------
# # Module Model
# # -----------------------------
# class Module(Base):
#     __tablename__ = "modules"

#     id = Column(Integer, primary_key=True, index=True)
#     day = Column(Integer, nullable=False)
#     course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)

#     course = relationship("Course", back_populates="modules")

#     submodules = relationship(
#         "Submodule",
#         back_populates="module",
#         cascade="all, delete-orphan",
#         passive_deletes=True
#     )
#     completed_lessons = relationship("CompletedLesson", back_populates="course", cascade="all, delete-orphan")
    


# # -----------------------------
# # Submodule Model
# # -----------------------------
# class Submodule(Base):
#     __tablename__ = "submodules"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String(255), nullable=False)
#     link = Column(Text, nullable=False)
#     module_id = Column(Integer, ForeignKey("modules.id", ondelete="CASCADE"), nullable=False)

#     module = relationship("Module", back_populates="submodules")
#     completed_lessons = relationship("CompletedLesson", back_populates="course", cascade="all, delete-orphan")
    
    
    



from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database.database import Base
import enum

# -----------------------------
# Enum for Course Type
# -----------------------------
class CourseTypeEnum(str, enum.Enum):
    free = "free"
    paid = "paid"

# -----------------------------
# Course Model
# -----------------------------
class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    duration = Column(Integer, nullable=False)
    type = Column(Enum(CourseTypeEnum), nullable=False, default=CourseTypeEnum.free)
    price = Column(String(100), nullable=True)
    image = Column(String(255), nullable=True)

    # ✅ Relationships
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    completed_lessons = relationship("CompletedLesson", back_populates="course", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="course", cascade="all, delete-orphan")

# -----------------------------
# Module Model
# -----------------------------
class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(Integer, nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)

    # ✅ Relationships
    course = relationship("Course", back_populates="modules")
    submodules = relationship("Submodule", back_populates="module", cascade="all, delete-orphan")
    



# -----------------------------
# Submodule Model
# -----------------------------
class Submodule(Base):
    __tablename__ = "submodules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    link = Column(Text, nullable=False)
    content = Column(Text, nullable=True)
    module_id = Column(Integer, ForeignKey("modules.id", ondelete="CASCADE"), nullable=False)

    # ✅ Relationships
    module = relationship("Module", back_populates="submodules")
    completed_lessons = relationship("CompletedLesson", back_populates="submodule", cascade="all, delete-orphan")
