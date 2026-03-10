import requests

url='http://127.0.0.1:8000/matching/explain'
payload={
 "pet_id": "86e1089a3",
 "adopter_profile": {
   "activity_level": "medium",
   "home_type": "apartment",
   "home_size": "small",
   "pet_experience": "beginner",
   "available_time": "medium",
   "kids_present": "no",
   "other_pets": "no",
   "pet_budget": "medium",
   "insurance_willing": "yes",
   "vet_commitment": "medium",
   "air_conditioning_available": "yes",
   "training_commitment": "medium",
   "patience_level": "high",
   "grooming_tolerance": "medium",
   "noise_tolerance": "medium",
   "long_term_commitment": "yes"
 }
}

resp = requests.post(url, json=payload)
print('status', resp.status_code)
print('body', resp.json())
