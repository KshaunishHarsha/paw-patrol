def generate_risk_flags(adopter, pet):

    risks = []

    if pet["separation_anxiety_risk"] == "high" and adopter["available_time"] == "low":
        risks.append("Pet may experience separation anxiety")

    if pet["vet_visit_frequency"] == "high" and adopter["vet_commitment"] == "low":
        risks.append("Pet may require frequent veterinary care")

    if pet["grooming_level"] == "high" and adopter["grooming_tolerance"] == "low":
        risks.append("Pet requires high grooming maintenance")

    if pet["requires_temperature_control"] == "yes" and adopter["air_conditioning_available"] == "no":
        risks.append("Pet may require a cooler indoor environment")

    if pet["shedding_level"] == "high" and adopter["grooming_tolerance"] == "low":
        risks.append("Pet sheds heavily and may require frequent cleaning")

    return risks