# from fastapi import APIRouter, Depends, HTTPException, Cookie
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from fastapi.responses import JSONResponse
# from jose import jwt, JWTError
# from datetime import datetime, timedelta, timezone

# from models import models
# from database import database
# from schemas import schemas

# router = APIRouter(prefix="/auth", tags=["Auth"])

# SECRET_KEY = "supersecret"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 3600

# # Password hashing
# pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# def get_password_hash(password: str):
#     return pwd_context.hash(password)

# def verify_password(plain_password: str, hashed_password: str):
#     return pwd_context.verify(plain_password, hashed_password)

# # -------------------------------
# # SIGNUP
# # -------------------------------
# @router.post("/signup")
# async def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed_password = get_password_hash(user.password)
#     new_user = models.User(
#         name=user.name,
#         email=user.email,
#         password_hash=hashed_password,
#         role="student",
#         created_at=datetime.utcnow()
#     )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return {"msg": "User created successfully"}

# # -------------------------------
# # SIGNIN
# # -------------------------------
# @router.post("/signin")
# def signin(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if not db_user or not verify_password(user.password, db_user.password_hash):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     token_data = {
#         "id": int(db_user.id),
#         "email": db_user.email,
#         "role": db_user.role,
#         "exp": int(expire.timestamp())
#     }

#     token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

#     response = JSONResponse({"msg": "Login successful"})
#     response.set_cookie(
#         key="access_token",
#         value=token,
#         httponly=True,
#         samesite="none",
#         secure=True,
#         max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
#         expires=int(expire.timestamp()),
#         path="/"
#     )
#     return response

# # -------------------------------
# # VERIFY COOKIE (Check session validity)
# # -------------------------------
# @router.get("/verify-session")
# def verify_session(access_token: str = Cookie(default=None)):
#     if not access_token:
#         return {"authenticated": False}

#     try:
#         payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
#         exp_timestamp = payload.get("exp")
#         if datetime.now(timezone.utc).timestamp() > exp_timestamp:
#             return {"authenticated": False}
#         return {"authenticated": True, "email": payload.get("email")}
#     except JWTError:
#         return {"authenticated": False}

# # -------------------------------
# # LOGOUT (Remove cookie)
# # -------------------------------
# @router.post("/logout")
# def logout():
#     response = JSONResponse({"msg": "Logged out successfully"})
#     response.delete_cookie(
#         key="access_token",
#         path="/",
#         samesite="none",
#         secure=True,
#         httponly=True
#     )
#     return response



# from fastapi import APIRouter, Depends, HTTPException, Cookie, Form
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from fastapi.responses import JSONResponse
# from jose import jwt, JWTError
# from datetime import datetime, timedelta, timezone

# from models import models
# from database import database
# from schemas import schemas

# router = APIRouter(prefix="/auth", tags=["Auth"])

# SECRET_KEY = "supersecret"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 3600

# # Password hashing
# pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# def get_password_hash(password: str):
#     return pwd_context.hash(password)

# def verify_password(plain_password: str, hashed_password: str):
#     return pwd_context.verify(plain_password, hashed_password)

# # -------------------------------
# # SIGNUP
# # -------------------------------
# @router.post("/signup")
# async def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed_password = get_password_hash(user.password)
#     new_user = models.User(
#         name=user.name,
#         email=user.email,
#         password_hash=hashed_password,
#         role="student",
#         created_at=datetime.utcnow()
#     )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return {"msg": "User created successfully"}

# # -------------------------------
# # SIGNIN
# # -------------------------------
# @router.post("/signin")
# def signin(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if not db_user or not verify_password(user.password, db_user.password_hash):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     token_data = {
#         "id": int(db_user.id),
#         "email": db_user.email,
#         "role": db_user.role,
#         "exp": int(expire.timestamp())
#     }

#     token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

#     response = JSONResponse({"msg": "Login successful"})
#     response.set_cookie(
#         key="access_token",
#         value=token,
#         httponly=True,
#         samesite="none",
#         secure=True,
#         max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
#         expires=int(expire.timestamp()),
#         path="/"
#     )
#     return response

# # -------------------------------
# # VERIFY COOKIE (Check session validity)
# # -------------------------------
# @router.get("/verify-session")
# def verify_session(access_token: str = Cookie(default=None)):
#     if not access_token:
#         return {"authenticated": False}

#     try:
#         payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
#         exp_timestamp = payload.get("exp")
#         if datetime.now(timezone.utc).timestamp() > exp_timestamp:
#             return {"authenticated": False}
#         return {"authenticated": True, "email": payload.get("email")}
#     except JWTError:
#         return {"authenticated": False}

# # -------------------------------
# # LOGOUT (Remove cookie)
# # -------------------------------
# @router.post("/logout")
# def logout():
#     response = JSONResponse({"msg": "Logged out successfully"})
#     response.delete_cookie(
#         key="access_token",
#         path="/",
#         samesite="none",
#         secure=True,
#         httponly=True
#     )
#     return response


# ============================================================
# ✅ NEW ENDPOINTS: USER PROFILE FETCH & UPDATE
# ============================================================

# -------------------------------
# # Get Current User Profile
# # -------------------------------
# @router.get("/profile")
# def get_profile(access_token: str = Cookie(default=None), db: Session = Depends(database.get_db)):
#     if not access_token:
#         raise HTTPException(status_code=401, detail="Not authenticated")

#     try:
#         payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id = payload.get("id")

#         user = db.query(models.User).filter(models.User.id == user_id).first()
#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")

#         return {
#             "id": user.id,
#             "name": user.name,
#             "email": user.email,
#             "role": user.role,
#             "created_at": user.created_at
#         }

#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")


# # -------------------------------
# # Update User Profile
# # -------------------------------
# @router.put("/profile/update")
# def update_profile(
#     name: str = Form(None),
#     password: str = Form(None),
#     access_token: str = Cookie(default=None),
#     db: Session = Depends(database.get_db)
# ):
#     if not access_token:
#         raise HTTPException(status_code=401, detail="Not authenticated")

#     try:
#         payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id = payload.get("id")

#         user = db.query(models.User).filter(models.User.id == user_id).first()
#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")

#         if name:
#             user.name = name
#         if password:
#             user.password_hash = get_password_hash(password)

#         db.commit()
#         db.refresh(user)

#         return {"msg": "Profile updated successfully"}

#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")


from fastapi import APIRouter, Depends, HTTPException, Form,Cookie
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.responses import JSONResponse
from datetime import datetime
from models import models
from database import database
from schemas import schemas
from datetime import datetime, timedelta, timezone
router = APIRouter(prefix="/auth", tags=["Auth"])

SECRET_KEY = "supersecret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 3600

# Password hashing
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# -------------------------------
# SIGNUP
# -------------------------------
@router.post("/signup")
async def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        password_hash=hashed_password,
        role="student",
        created_at=datetime.utcnow()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "User created successfully"}

# -------------------------------
# SIGNIN
# -------------------------------
@router.post("/signin")
def signin(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {
        "id": int(db_user.id),
        "email": db_user.email,
        "role": db_user.role,
        "exp": int(expire.timestamp())
    }

    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    response = JSONResponse({"msg": "Login successful"})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="none",
        secure=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=int(expire.timestamp()),
        path="/"
    )
    return response

# -------------------------------
# Get Profile
# -------------------------------
@router.get("/profile/{email}")
def get_profile(email: str, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "created_at": user.created_at
    }

# -------------------------------
# Update Profile
# -------------------------------
@router.put("/profile/update")
def update_profile(
    email: str = Form(...),
    name: str = Form(None),
    password: str = Form(None),
    db: Session = Depends(database.get_db)
):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if name:
        user.name = name
    if password:
        user.password_hash = get_password_hash(password)

    db.commit()
    db.refresh(user)
    return {"msg": "Profile updated successfully"}



@router.post("/logout")
def logout():
    response = JSONResponse({"msg": "Logged out successfully"})
    response.delete_cookie(
        key="access_token",
        path="/",
        samesite="none",
        secure=True,
        httponly=True
    )
    return response


# # -------------------------------
# # VERIFY COOKIE (Check session validity)
# # -------------------------------
@router.get("/verify-session")
def verify_session(access_token: str = Cookie(default=None)):
    if not access_token:
        return {"authenticated": False}

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        exp_timestamp = payload.get("exp")
        if datetime.now(timezone.utc).timestamp() > exp_timestamp:
            return {"authenticated": False}
        return {"authenticated": True, "email": payload.get("email")}
    except JWTError:
        return {"authenticated": False}