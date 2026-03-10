from fastapi import FastAPI
from .questionnaire_routes import router as questionnaire_router
from .matching_routes import router as matching_router

app = FastAPI(
    title="OpenPaws Adoption Matching API",
    description="AI-powered pet adoption compatibility system",
    version="1.0"
)

app.include_router(questionnaire_router)
app.include_router(matching_router)