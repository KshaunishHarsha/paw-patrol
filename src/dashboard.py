from src.scoring import compute_score, compute_score_breakdown
from src.llm_reasoning import generate_match_reasoning


def generate_match_dashboard(adopter, pet):

    score = compute_score(adopter, pet)

    breakdown = compute_score_breakdown(adopter, pet)

    reasoning = generate_match_reasoning(
        adopter,
        pet,
        score
    )

    dashboard = {
        "pet_name": pet.get("Name"),
        "score": score,
        "breakdown": breakdown,
        "explanation": reasoning.get("explanation"),
        "risks": reasoning.get("risks"),
        "advice": reasoning.get("advice")
    }

    return dashboard
