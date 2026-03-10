from constraints import check_constraints
from scoring import compute_score
from explanation import generate_explanation
from risk_analysis import generate_risk_flags


def match_pets(adopter, pets):

    matches = []

    for _, pet in pets.iterrows():

        if not check_constraints(adopter, pet):
            continue

        score = compute_score(adopter, pet)

        explanation = generate_explanation(adopter, pet)

        risks = generate_risk_flags(adopter, pet)

        matches.append({
            "PetID": pet["PetID"],
            "Name": pet["Name"],
            "Score": score,
            "Explanation": explanation,
            "Risks": risks
        })

    matches = sorted(matches, key=lambda x: x["Score"], reverse=True)

    return matches[:5]