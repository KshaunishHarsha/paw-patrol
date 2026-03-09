# Pet Dataset Preparation & Enrichment Documentation

## Overview

The original dataset used in this project comes from a large pet adoption dataset containing information about animals available for adoption. While the dataset contained useful raw attributes (age, breed, health status, etc.), it was not directly suitable for building a **compatibility matching system** between adopters and pets.

To support the adoption matching engine, the dataset was **cleaned, normalized, and enriched with derived behavioral and lifestyle traits**. These transformations convert raw shelter metadata into meaningful attributes that can be used by the compatibility algorithm.

The final dataset represents **pet needs and behavioral characteristics**, enabling comparison against adopter profiles collected through the questionnaire.

---

# 1. Dataset Overview

Original dataset size:

* **Rows:** 14,993 pets
* **Initial columns:** 24

After enrichment:

* **Rows:** 14,993 pets
* **Final columns:** 35 (before optional UI enhancements)

The dataset includes both **original attributes** and **derived compatibility traits**.

---

# 2. Label Normalization

Several columns in the original dataset used **integer encodings**. These were replaced with human-readable labels for clarity and easier downstream use.

### Type

| Code | Label |
| ---- | ----- |
| 1    | Dog   |
| 2    | Cat   |

Converted to:

```
dog / cat
```

---

### Gender

| Code | Label           |
| ---- | --------------- |
| 1    | Male            |
| 2    | Female          |
| 3    | Mixed / Unknown |

Converted to:

```
male / female / mixed
```

This normalization improves readability and simplifies rule-based matching.

---

# 3. Label Lookup Integration

The dataset originally used numeric identifiers for several categorical features.

External label tables were used to map these IDs to human-readable values.

### Breed Mapping

Using `breed_labels.csv`

```
BreedID → BreedName
```

Applied to:

* Breed1
* Breed2

---

### Color Mapping

Using `color_labels.csv`

```
ColorID → ColorName
```

Applied to:

* Color1
* Color2
* Color3

---

### State Mapping

Using `state_labels.csv`

```
StateID → StateName
```

Applied to:

* State

This step significantly improves dataset interpretability and allows better filtering and UI display.

---

# 4. Dataset Cleaning

Several columns were removed because they do not contribute to compatibility analysis.

Removed columns:

| Column   | Reason                   |
| -------- | ------------------------ |
| Color2   | cosmetic attribute       |
| Color3   | cosmetic attribute       |
| Quantity | listing metadata         |
| Fee      | shelter-specific pricing |

These attributes do not influence adoption compatibility.

---

# 5. Handling Missing Values

Certain fields contained missing values.

### Name

Pets without names were assigned a default value:

```
"Unnamed Pet"
```

This ensures a consistent UI experience.

---

### Breed2

Many animals are single-breed entries.

Missing values were replaced with:

```
"Mixed"
```

This enables consistent breed display logic.

---

# 6. Derived Compatibility Traits

The most important step in preparing the dataset was generating **behavioral and lifestyle compatibility traits**.

These traits allow the matching algorithm to compare pet needs against adopter capabilities.

---

## Energy Level

Derived from age.

| Age (months) | Energy Level |
| ------------ | ------------ |
| 0–12         | High         |
| 12–60        | Medium       |
| 60+          | Low          |

Purpose:
Match with adopter activity level.

---

## Space Requirement

Derived from maturity size.

| Size Code | Space Requirement |
| --------- | ----------------- |
| 1         | Small             |
| 2         | Medium            |
| 3         | Large             |
| 4         | Extra Large       |

Purpose:
Match against adopter home size.

---

## Grooming Level

Derived from fur length.

| Fur Length | Grooming Requirement |
| ---------- | -------------------- |
| 1          | Low                  |
| 2          | Medium               |
| 3          | High                 |

Purpose:
Match against adopter grooming tolerance.

---

## Experience Required

Derived from health condition and age.

| Condition            | Experience Needed |
| -------------------- | ----------------- |
| Special health needs | Experienced owner |
| Very young pets      | Intermediate      |
| Healthy adult pets   | Beginner-friendly |

Purpose:
Match against adopter pet ownership experience.

---

## Time Requirement

Derived from energy level.

| Energy Level | Time Requirement |
| ------------ | ---------------- |
| High         | High             |
| Medium       | Medium           |
| Low          | Low              |

Purpose:
Match against adopter availability.

---

## Kid Friendly

Approximated using age.

Younger pets may require supervision around children.

Values:

```
yes / maybe
```

Purpose:
Ensure compatibility with households that include children.

---

## Pet Friendly

Compatibility with other animals.

Values were randomly assigned for the prototype dataset to simulate behavioral variability.

Values:

```
yes / maybe / no
```

This field **must be improved in future versions using breed temperament data and real behavioral records from shelters or veterinarians.**

Purpose:
Match adopters who already own pets.

---

## Special Needs

Derived from health condition.

| Health Status     | Special Needs |
| ----------------- | ------------- |
| Healthy           | No            |
| Medical condition | Yes           |

Purpose:
Highlight pets requiring experienced adopters.

---

# 7. Financial Compatibility Traits

Pet ownership cost varies significantly across breeds and sizes.

The following attributes were derived to capture financial commitment.

---

## Monthly Care Cost

Estimated from size and grooming requirements.

| Condition           | Estimated Cost |
| ------------------- | -------------- |
| Large animals       | High           |
| High grooming needs | High           |
| Medium size         | Medium         |
| Small size          | Low            |

Purpose:
Match with adopter pet budget.

---

## Vet Visit Frequency

Derived from health condition.

| Health       | Vet Visits |
| ------------ | ---------- |
| Healthy      | Low        |
| Minor issues | Medium     |
| Major issues | High       |

Purpose:
Match with adopter veterinary commitment.

---

## Medical Risk

Represents likelihood of health complications.

| Health Status     | Risk Level |
| ----------------- | ---------- |
| Healthy           | Low        |
| Minor condition   | Medium     |
| Serious condition | High       |

Purpose:
Assess adopter financial readiness.

---

# 8. Environmental Compatibility

Certain pets have environmental requirements.

---

## Temperature Control Requirement

Derived from fur length and size heuristics.

Values:

```
yes / maybe / no
```

Purpose:
Ensure adopter environment can support the animal.

Example cases:

* brachycephalic breeds (e.g., Shih Tzu)
* long fur breeds in warm climates
* arctic breeds in hot regions

This field should be improved using **breed-specific climate tolerance data**.

---

# 9. Behavioral Traits

Certain animals require more attention or supervision.

---

## Separation Anxiety Risk

Derived from age.

| Age         | Risk   |
| ----------- | ------ |
| Young pets  | High   |
| Adult pets  | Medium |
| Senior pets | Low    |

Purpose:
Match with adopter time availability.

---

## Shedding Level

Derived from fur length.

| Fur Length | Shedding |
| ---------- | -------- |
| Short      | Low      |
| Medium     | Medium   |
| Long       | High     |

Purpose:
Match with adopter grooming tolerance.

---

# 10. Lifespan Estimation

Approximate lifespan added to capture long-term commitment.

| Animal | Expected Lifespan |
| ------ | ----------------- |
| Dogs   | 10–13 years       |
| Cats   | 12–16 years       |

Purpose:
Inform adopters about long-term responsibility.

This can be further refined using **breed-level lifespan statistics**.

---

# 11. Columns Requiring Improvement Using Real Data

Some derived columns currently use **heuristic approximations** and should be improved using real-world datasets.

Columns needing improvement:

| Column                       | Recommended Data Source      |
| ---------------------------- | ---------------------------- |
| pet_friendly                 | breed temperament databases  |
| kid_friendly                 | breed temperament studies    |
| requires_temperature_control | breed climate tolerance data |
| monthly_care_cost            | veterinary cost datasets     |
| vet_visit_frequency          | veterinary health records    |
| medical_risk                 | breed health risk statistics |
| shedding_level               | breed grooming guides        |
| separation_anxiety_risk      | behavioral research data     |
| expected_lifespan            | breed lifespan statistics    |

These improvements would allow the system to transition from a **heuristic prototype to a data-driven adoption recommendation system**.

---

# 12. Dataset Transformation Goal

The original dataset primarily described **animal attributes**.

The transformed dataset instead describes **pet needs and compatibility traits**.

This allows the system to compare:

```
Adopter capabilities
          vs
Pet requirements
```

Resulting in a meaningful compatibility score.

---

# 13. Example Pet Profile

Example structured pet record:

```
Name: Luna
Type: Dog
Breed: Golden Retriever Mix
Age: 2.5 years

Energy Level: High
Space Requirement: Large
Grooming Level: Medium
Experience Required: Beginner
Time Requirement: High

Kid Friendly: Yes
Pet Friendly: Maybe

Monthly Care Cost: Medium
Vet Visit Frequency: Low
Medical Risk: Low

Temperature Control: No
Separation Anxiety Risk: Medium
Shedding Level: High

Expected Lifespan: 10–13 years
```

This structured representation enables efficient matching against adopter profiles.

---

# 14. Outcome

Through cleaning, normalization, and feature engineering, the dataset was transformed into a **compatibility-aware pet profile dataset** suitable for powering an intelligent adoption matching system.

The enriched dataset supports:

* compatibility scoring
* constraint-based filtering
* behavioral matching
* financial compatibility checks
* environmental compatibility checks
* explainable adoption recommendations

This dataset forms the **foundation of the adoption matching engine** used in the system.
