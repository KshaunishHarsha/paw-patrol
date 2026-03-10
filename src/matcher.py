from .constraints import check_constraints
from .scoring import compute_score
from .llm_reasoning import generate_match_reasoning


def match_pets(adopter, pets):

    matches = []

    for _, pet in pets.iterrows():

        if not check_constraints(adopter, pet):
            continue

        score = compute_score(adopter, pet)

        reasoning = generate_match_reasoning(
            adopter,
            pet.to_dict(),
            score
        )

        matches.append({
            "PetID": pet["PetID"],
            "Name": pet["Name"],
            "Score": score,
            "Explanation": reasoning.get("explanation", ""),
            "Risks": reasoning.get("risks", []),
            "Advice": reasoning.get("advice", [])
        })

    matches = sorted(matches, key=lambda x: x["Score"], reverse=True)

    return matches[:5]