import os
import json
import google.generativeai as genai


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def update_adopter_profile(conversation, current_profile):

    prompt = f"""
Update the adopter profile based on the latest questionnaire conversation.

Conversation:
{conversation}

Current profile:
{current_profile}

Return the updated profile as a RAW JSON object ONLY. 
DO NOT wrap the response in ```json text blocks.
DO NOT include any other text or explanations.
Just the raw JSON object with these fields:

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
    
    # Clean up markdown formatting if Gemini returns ```json
    if text.startswith("```json"):
        text = text[7:]
    if text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
        
    try:
        new_data = json.loads(text.strip())
        # Merge the new data into the current profile
        for key, value in new_data.items():
            current_profile[key] = value
        return current_profile
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        print(f"Raw text was: {text}")
        return current_profile