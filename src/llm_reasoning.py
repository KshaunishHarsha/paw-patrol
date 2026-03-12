import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

# read .env so the key is available when module is imported
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise RuntimeError(
        "No API key found for LLM. Please set GEMINI_API_KEY or GOOGLE_API_KEY."
    )

# configure client and pick a valid model
genai.configure(api_key=api_key)

# upgrade to a currently available release
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_match_reasoning(adopter, pet, score):

    prompt = f"""
You are an expert pet adoption counselor.

Analyze the compatibility between the adopter and the pet.

Compatibility score: {score}/100

Adopter profile:
{json.dumps(adopter, indent=2)}

Pet profile:
{json.dumps(pet, indent=2)}

Return a RAW JSON object ONLY with:

"explanation": short paragraph explaining why this match works
"risks": list of potential concerns
"advice": list of helpful instructions for the adopter or counselor

DO NOT wrap the response in ```json text blocks.
DO NOT include any other text or explanations.
Just the raw JSON object.
Be concise and practical.
"""

    try:
        response = model.generate_content(prompt)
        text = response.text
        
        # Clean up markdown formatting if Gemini returns ```json
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]

        return json.loads(text.strip())
    except Exception as e:
        print(f"LLM Reasoning Failed (likely rate limit): {e}")
        return {
            "explanation": "Based on our scoring criteria, this pet represents a great match for your lifestyle. (Detailed AI insights are temporarily unavailable due to high server traffic.)",
            "risks": ["Please directly consult with the shelter about any specific concerns."],
            "advice": ["We recommend a meet-and-greet to ensure personality compatibility."]
        }