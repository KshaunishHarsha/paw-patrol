import os
import json
import google.generativeai as genai


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def update_adopter_profile(conversation, current_profile):

    prompt = f"""
Update the adopter profile based on the latest questionnaire conversation.

Conversation:
{conversation}

Current profile:
{current_profile}

Return the updated profile as JSON with fields:

activity_level
home_type
home_size
pet_experience
available_time
kids_present
other_pets
pet_budget
insurance_willing
vet_commitment
air_conditioning_available
training_commitment
patience_level
grooming_tolerance
noise_tolerance
long_term_commitment
"""

    response = model.generate_content(prompt)

    text = response.text

    try:
        return json.loads(text)
    except:
        return current_profile