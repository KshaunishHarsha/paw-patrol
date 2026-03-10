def check_constraints(adopter, pet):

    if adopter["kids_present"] == "yes" and pet["kid_friendly"] == "no":
        return False

    if adopter["other_pets"] == "yes" and pet["pet_friendly"] == "no":
        return False

    if pet["requires_temperature_control"] == "yes" and adopter["air_conditioning_available"] == "no":
        return False

    if pet["medical_risk"] == "high" and adopter["pet_budget"] == "low":
        return False

    if pet["experience_required"] == "experienced" and adopter["pet_experience"] == "beginner":
        return False

    if pet["space_requirement"] == "large" and adopter["home_size"] == "small":
        return False

    return True