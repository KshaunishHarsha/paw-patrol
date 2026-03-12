from .constraints import check_constraints
from .scoring import compute_score
from .llm_reasoning import generate_match_reasoning


def match_pets(adopter, pets):

    scored_pets = []

    # Phase 1: Score all pets
    for _, pet in pets.iterrows():
        if not check_constraints(adopter, pet):
            continue

        score = compute_score(adopter, pet)
        
        scored_pets.append({
            "PetID": pet["PetID"],
            "Name": pet["Name"],
            "Score": score,
            "pet_data": pet.to_dict()
        })

    # Phase 2: Sort and keep only the top 5
    scored_pets = sorted(scored_pets, key=lambda x: x["Score"], reverse=True)[:5]

    # Phase 3: Generate detailed explanations only for the top 5
    matches = []
    for pet in scored_pets:
        reasoning = generate_match_reasoning(
            adopter,
            pet["pet_data"],
            pet["Score"]
        )
        
        matches.append({
            "PetID": pet["PetID"],
            "Name": pet["Name"],
            "Score": pet["Score"],
            "Explanation": reasoning.get("explanation", ""),
            "Risks": reasoning.get("risks", []),
            "Advice": reasoning.get("advice", [])
        })

    return matches