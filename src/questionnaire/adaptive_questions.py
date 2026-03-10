import os
from dotenv import load_dotenv
import google.generativeai as genai
from .coverage_tracker import get_missing_attributes

# load environment variables from a .env file in the project root
load_dotenv()

# prefer GEMINI_API_KEY but fall back to GOOGLE_API_KEY
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise RuntimeError(
        "No API key found. Please set GEMINI_API_KEY (or GOOGLE_API_KEY) in a .env file or the environment."
    )

genai.configure(api_key=api_key)

# choose a supported model; gemini-2.5-flash is available
model = genai.GenerativeModel("gemini-2.5-flash")


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