import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key=os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise RuntimeError("No API key available")

# suppress future warning
import warnings
warnings.filterwarnings('ignore', category=FutureWarning)

print("Listing models:")
models = list(genai.list_models())
print(models)
