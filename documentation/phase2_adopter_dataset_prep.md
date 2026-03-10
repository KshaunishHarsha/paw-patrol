# Adopter Dataset Preparation Documentation

## Overview

To build a reliable **pet–adopter compatibility matching system**, the platform must understand both **pet requirements** and **adopter lifestyles**. While the pet dataset provides detailed information about the needs, behavior, and maintenance requirements of each animal, the system also requires structured information about potential adopters.

In the final product, adopter data will primarily be collected through an **interactive questionnaire** completed by users during the adoption process. However, during the development phase of the matching engine, a dataset of adopter profiles is required in order to:

* test the compatibility algorithm
* simulate realistic adopter scenarios
* validate scoring logic
* develop and debug the recommendation system

Since real adopter data is not publicly available and collecting such data involves privacy concerns, a **synthetic adopter dataset** was created to simulate realistic adopter profiles. This dataset serves as **training and testing data for the compatibility engine**.

---

# 1. Role of the Adopter Dataset in the System

The adopter dataset is not the primary source of adopter data in production. Instead, it serves the following development purposes:

1. **Training and validating the compatibility scoring system**
2. **Simulating adopter behavior during testing**
3. **Ensuring the algorithm works across diverse adopter profiles**
4. **Providing structured inputs for model development and experimentation**

In the deployed system, adopter profiles will be dynamically generated from responses collected through the platform’s **adaptive questionnaire interface**.

---

# 2. Alignment with Pet Dataset

The adopter dataset was designed so that its attributes directly correspond to the **derived pet traits** in the enriched pet dataset.

This one-to-one mapping allows the compatibility engine to easily compare adopter capabilities with pet requirements.

| Adopter Attribute          | Pet Attribute                |
| -------------------------- | ---------------------------- |
| activity_level             | energy_level                 |
| home_size                  | space_requirement            |
| grooming_tolerance         | grooming_level               |
| pet_experience             | experience_required          |
| available_time             | time_requirement             |
| kids_present               | kid_friendly                 |
| other_pets                 | pet_friendly                 |
| pet_budget                 | monthly_care_cost            |
| vet_commitment             | vet_visit_frequency          |
| air_conditioning_available | requires_temperature_control |

This alignment ensures the system can compute compatibility in a **structured and interpretable way**.

---

# 3. Adopter Dataset Schema

The synthetic adopter dataset contains the following attributes.

| Column                     | Description                                         |
| -------------------------- | --------------------------------------------------- |
| AdopterID                  | Unique identifier for each adopter profile          |
| activity_level             | General physical activity level of the adopter      |
| home_type                  | Type of residence                                   |
| home_size                  | Approximate living space available for the pet      |
| pet_experience             | Previous experience owning or caring for pets       |
| available_time             | Amount of time the adopter can dedicate to pet care |
| kids_present               | Whether children live in the household              |
| other_pets                 | Whether the adopter currently owns other pets       |
| pet_budget                 | Estimated monthly financial budget for pet care     |
| insurance_willing          | Willingness to purchase pet health insurance        |
| vet_commitment             | Ability to manage veterinary care and visits        |
| air_conditioning_available | Availability of climate control in the home         |
| training_commitment        | Willingness to train and socialize the pet          |
| patience_level             | Ability to handle behavioral challenges             |
| grooming_tolerance         | Willingness to manage grooming needs                |
| noise_tolerance            | Ability to tolerate vocal or energetic pets         |
| long_term_commitment       | Readiness for long-term pet ownership               |

---

# 4. Standardized Attribute Values

To maintain consistency across the dataset, categorical attributes were standardized to predefined value sets.

### Activity Level

```
low / medium / high
```

---

### Home Type

```
apartment / house
```

---

### Home Size

```
small / medium / large
```

---

### Pet Experience

```
beginner / intermediate / experienced
```

---

### Available Time

```
low / medium / high
```

---

### Kids Present

```
yes / no
```

---

### Other Pets

```
yes / no
```

---

### Pet Budget

```
low / medium / high
```

---

### Insurance Willingness

```
yes / no
```

---

### Veterinary Commitment

```
low / medium / high
```

---

### Air Conditioning Availability

```
yes / no
```

---

### Training Commitment

```
low / medium / high
```

---

### Patience Level

```
low / medium / high
```

---

### Grooming Tolerance

```
low / medium / high
```

---

### Noise Tolerance

```
low / medium / high
```

---

### Long-Term Commitment

```
yes / no
```

---

# 5. Synthetic Dataset Generation

Since the adopter dataset is intended primarily for **algorithm development and testing**, a synthetic dataset was generated using controlled random sampling.

Random sampling ensures that the dataset contains a wide range of adopter profiles, enabling the matching system to be tested against diverse scenarios.

The dataset was generated using the following Python workflow:

```python
import pandas as pd
import numpy as np

n = 100

adopters = pd.DataFrame({
    "AdopterID": [f"A{i}" for i in range(1, n+1)],
    "activity_level": np.random.choice(["low","medium","high"], n),
    "home_type": np.random.choice(["apartment","house"], n),
    "home_size": np.random.choice(["small","medium","large"], n),
    "pet_experience": np.random.choice(["beginner","intermediate","experienced"], n),
    "available_time": np.random.choice(["low","medium","high"], n),
    "kids_present": np.random.choice(["yes","no"], n),
    "other_pets": np.random.choice(["yes","no"], n),
    "pet_budget": np.random.choice(["low","medium","high"], n),
    "insurance_willing": np.random.choice(["yes","no"], n),
    "vet_commitment": np.random.choice(["low","medium","high"], n),
    "air_conditioning_available": np.random.choice(["yes","no"], n),
    "training_commitment": np.random.choice(["low","medium","high"], n),
    "patience_level": np.random.choice(["low","medium","high"], n),
    "grooming_tolerance": np.random.choice(["low","medium","high"], n),
    "noise_tolerance": np.random.choice(["low","medium","high"], n),
    "long_term_commitment": np.random.choice(["yes","no"], n)
})
```

This approach produces a diverse distribution of adopter profiles that can be used to test the matching algorithm.

---

# 6. Example Adopter Profile

Example adopter record:

```
AdopterID: A42

Activity Level: high
Home Type: house
Home Size: large

Pet Experience: intermediate
Available Time: high

Kids Present: no
Other Pets: yes

Pet Budget: high
Insurance Willing: yes
Vet Commitment: high

Air Conditioning Available: yes

Training Commitment: high
Patience Level: high

Grooming Tolerance: medium
Noise Tolerance: medium

Long-Term Commitment: yes
```

This structured representation allows the system to simulate a realistic adopter profile during algorithm testing.

---

# 7. Integration with the Questionnaire System

In the production version of the platform, adopter profiles will be created dynamically through a **guided questionnaire interface**.

The questionnaire will:

1. collect adopter lifestyle information
2. convert responses into structured attributes
3. populate an adopter profile similar to the schema described above
4. feed the profile into the compatibility engine

This means the synthetic adopter dataset and the questionnaire output share the **same schema**, ensuring seamless integration between development and production systems.

---

# 8. Future Improvements

While the synthetic dataset is sufficient for testing the compatibility algorithm, future improvements could include:

* collecting anonymized adopter questionnaire data
* learning adopter preferences from historical adoption outcomes
* incorporating regional housing patterns
* integrating behavioral survey responses
* modeling adopter willingness to adopt special-needs pets

These improvements would enable the system to transition from rule-based compatibility scoring to **data-driven adoption recommendation models**.

---

# 9. Outcome

The synthetic adopter dataset provides a structured representation of adopter lifestyles, preferences, and capabilities. It enables the development and validation of the pet–adopter compatibility matching engine before real adopter data is collected through the questionnaire interface.

Together with the enriched pet dataset, this dataset forms the **core input layer of the adoption matching system**, enabling intelligent and explainable pet recommendations.
