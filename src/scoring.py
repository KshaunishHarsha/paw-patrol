from scoring_matrices import (
    energy_matrix,
    time_matrix,
    financial_matrix,
    experience_matrix,
    grooming_matrix,
    vet_matrix,
    behavior_matrix,
    commitment_matrix,
    training_matrix,
    noise_matrix,
    insurance_matrix
)


# ----------------------------
# Lifestyle
# ----------------------------
def lifestyle_score(adopter, pet):

    energy = energy_matrix.get(
        (adopter["activity_level"], pet["energy_level"]), 0.5
    )

    time = time_matrix.get(
        (adopter["available_time"], pet["time_requirement"]), 0.5
    )

    return (energy + time) / 2


# ----------------------------
# Environment
# ----------------------------
def environment_score(adopter, pet):

    score = 1

    if adopter["home_size"] == pet["space_requirement"]:
        score = 1
    elif adopter["home_size"] == "large":
        score = 0.8
    else:
        score = 0.4

    # climate
    if pet["requires_temperature_control"] == "yes":
        if adopter["air_conditioning_available"] == "yes":
            score += 0.1
        else:
            score -= 0.2

    # home type penalty
    if adopter["home_type"] == "apartment" and pet["space_requirement"] == "large":
        score -= 0.2

    return max(min(score,1),0)


# ----------------------------
# Financial
# ----------------------------
def financial_score(adopter, pet):

    cost = financial_matrix.get(
        (adopter["pet_budget"], pet["monthly_care_cost"]), 0.5
    )

    return cost


# ----------------------------
# Experience
# ----------------------------
def experience_score(adopter, pet):

    return experience_matrix.get(
        (adopter["pet_experience"], pet["experience_required"]), 0.5
    )


# ----------------------------
# Maintenance
# ----------------------------
def maintenance_score(adopter, pet):

    grooming = grooming_matrix.get(
        (adopter["grooming_tolerance"], pet["grooming_level"]), 0.5
    )

    shedding = grooming_matrix.get(
        (adopter["grooming_tolerance"], pet["shedding_level"]), 0.5
    )

    return (grooming + shedding) / 2


# ----------------------------
# Health compatibility
# ----------------------------
def health_score(adopter, pet):

    vet = vet_matrix.get(
        (adopter["vet_commitment"], pet["vet_visit_frequency"]), 0.5
    )

    insurance = insurance_score(adopter, pet)

    return (vet + insurance) / 2


# ----------------------------
# Behavior compatibility
# ----------------------------
def behavior_score(adopter, pet):

    patience = behavior_matrix.get(
        (adopter["patience_level"], pet["separation_anxiety_risk"]), 0.5
    )

    training = training_score(adopter, pet)

    noise = noise_score(adopter, pet)

    return (patience + training + noise) / 3


# ----------------------------
# Commitment compatibility
# ----------------------------
def commitment_score(adopter, pet):

    return commitment_matrix.get(
        (adopter["long_term_commitment"], pet["expected_lifespan"]), 0.5
    )


def training_score(adopter, pet):

    return training_matrix.get(
        (adopter["training_commitment"], pet["experience_required"]), 0.5
    )


def noise_score(adopter, pet):

    return noise_matrix.get(
        (adopter["noise_tolerance"], pet["energy_level"]), 0.5
    )


def insurance_score(adopter, pet):

    return insurance_matrix.get(
        (adopter["insurance_willing"], pet["medical_risk"]), 0.5
    )


# ----------------------------
# Final compatibility score
# ----------------------------
def compute_score(adopter, pet):

    lifestyle = lifestyle_score(adopter, pet)
    environment = environment_score(adopter, pet)
    financial = financial_score(adopter, pet)
    experience = experience_score(adopter, pet)
    maintenance = maintenance_score(adopter, pet)
    health = health_score(adopter, pet)
    behavior = behavior_score(adopter, pet)
    commitment = commitment_score(adopter, pet)

    score = (
        0.23 * lifestyle +
        0.20 * environment +
        0.15 * financial +
        0.10 * experience +
        0.10 * maintenance +
        0.10 * health +
        0.07 * behavior +
        0.05 * commitment
    )

    return round(score * 100,2)