import os
import google.generativeai as genai
from .coverage_tracker import get_missing_attributes


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_followup_question(conversation, current_profile):

    missing_attributes = get_missing_attributes(current_profile)

    prompt = f"""
You are conducting a smart pet adoption questionnaire.

Some adopter attributes are still unknown.

Missing attributes:
{missing_attributes}

Conversation so far:
{conversation}

Ask ONE concise follow-up question that helps determine one of the missing attributes.

Do not repeat previous questions.
"""

    response = model.generate_content(prompt)

    return response.text.strip()