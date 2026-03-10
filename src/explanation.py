def generate_explanation(adopter, pet):

    reasons = []

    if adopter["activity_level"] == pet["energy_level"]:
        reasons.append("Your activity level matches the pet's energy needs")

    if adopter["home_size"] == pet["space_requirement"]:
        reasons.append("Your home size suits the pet's space requirements")

    if adopter["grooming_tolerance"] == pet["grooming_level"]:
        reasons.append("Your grooming tolerance fits the pet's grooming needs")

    if adopter["pet_experience"] == pet["experience_required"]:
        reasons.append("Your experience level matches the pet's needs")

    if adopter["pet_budget"] == pet["monthly_care_cost"]:
        reasons.append("Your pet care budget fits the pet's maintenance cost")

    if adopter["available_time"] == pet["time_requirement"]:
        reasons.append("You have enough time to meet the pet's care needs")

    return reasons