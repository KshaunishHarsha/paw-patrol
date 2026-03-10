import os
import json
import google.generativeai as genai


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_match_reasoning(adopter, pet, score):

    prompt = f"""
You are an expert pet adoption counselor.

Analyze the compatibility between the adopter and the pet.

Compatibility score: {score}/100

Adopter profile:
{json.dumps(adopter, indent=2)}

Pet profile:
{json.dumps(pet, indent=2)}

Return a JSON object with:

explanation: short paragraph explaining why this match works
risks: list of potential concerns
advice: list of helpful instructions for the adopter or counselor

Be concise and practical.
"""

    response = model.generate_content(prompt)

    text = response.text

    try:
        return json.loads(text)
    except:
        return {
            "explanation": text,
            "risks": [],
            "advice": []
        }