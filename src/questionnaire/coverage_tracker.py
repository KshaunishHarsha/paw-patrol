REQUIRED_ATTRIBUTES = [
    "activity_level",
    "home_type",
    "home_size",
    "pet_experience",
    "available_time",
    "kids_present",
    "other_pets",
    "pet_budget",
    "insurance_willing",
    "vet_commitment",
    "air_conditioning_available",
    "training_commitment",
    "patience_level",
    "grooming_tolerance",
    "noise_tolerance",
    "long_term_commitment"
]


def get_missing_attributes(current_profile):

    missing = []

    for attr in REQUIRED_ATTRIBUTES:
        if attr not in current_profile or current_profile[attr] is None:
            missing.append(attr)

    return missing