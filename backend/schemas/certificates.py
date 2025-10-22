from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CertificateOut(BaseModel):
    id: int
    course_id: int
    course_name: str
    status: str
    certificate_url: Optional[str]
    uploaded_at: Optional[datetime]

    class Config:
        orm_mode = True
