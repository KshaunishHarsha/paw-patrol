from fastapi import APIRouter
from ..questionnaire.base_questions import BASE_QUESTIONS
from ..questionnaire.adaptive_questions import generate_followup_question
from ..questionnaire.profile_extractor import update_adopter_profile

router = APIRouter(prefix="/questionnaire")


@router.get("/start")
def start_questionnaire():

    return {
        "base_questions": BASE_QUESTIONS
    }


@router.post("/next")
def next_question(data: dict):

    conversation = data.get("conversation", [])
    profile = data.get("profile", {})

    question = generate_followup_question(conversation, profile)

    return {"question": question}


@router.post("/profile")
def generate_profile(data: dict):

    conversation = data.get("conversation", [])
    profile = data.get("profile", {})

    updated_profile = update_adopter_profile(conversation, profile)

    return {"profile": updated_profile}