from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .questionnaire_routes import router as questionnaire_router
from .matching_routes import router as matching_router

app = FastAPI(
    title="PawPatrol Adoption Matching API",
    description="AI-powered pet adoption compatibility system",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(questionnaire_router)
app.include_router(matching_router)