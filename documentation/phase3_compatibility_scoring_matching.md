# Phase 3: Compatibility Scoring and Matching Engine

## Overview

After preparing structured datasets for both pets and adopters, the next step in the system development process was to design and implement the **core compatibility scoring and matching engine**.

The goal of this phase was to create a deterministic system capable of:

* evaluating compatibility between an adopter and available pets
* filtering out unsafe or unsuitable matches
* ranking pets according to compatibility
* producing interpretable scores that adoption counselors can trust

Unlike black-box machine learning models, the system relies on a **rule-based compatibility model combined with weighted scoring**, ensuring that the decision process remains transparent and explainable.

This phase introduced three major components:

1. **Hard constraint filtering**
2. **Multi-dimensional compatibility scoring**
3. **Pet ranking and matching logic**

Together, these components form the **core intelligence layer of the adoption matching system**.

---

# 1. Hard Constraint Filtering

Before any compatibility score is calculated, each potential match must pass a set of **hard constraints**. These constraints represent situations where a match should be automatically rejected because it would likely result in an unsafe or unsuccessful adoption.

Examples of such scenarios include:

* a pet that is not kid-friendly being matched with a household with children
* a pet requiring a climate-controlled environment being placed in a home without air conditioning
* a high medical risk pet being matched with an adopter with very limited budget
* a pet requiring experienced handling being matched with a beginner adopter

If any of these conditions are met, the pet is **excluded from consideration before scoring**.

### Example Constraints

| Condition                                              | Outcome      |
| ------------------------------------------------------ | ------------ |
| Kids present and pet not kid-friendly                  | Reject match |
| Other pets present and pet not pet-friendly            | Reject match |
| Pet requires temperature control but adopter lacks AC  | Reject match |
| Pet requires experienced owner but adopter is beginner | Reject match |
| Large space requirement but adopter has small home     | Reject match |

This constraint layer ensures the system prioritizes **safety and realistic adoption outcomes**.

---

# 2. Compatibility Scoring Model

Once a pet passes the constraint filter, the system calculates a **compatibility score between the adopter and the pet**.

Instead of evaluating every attribute individually, related features are grouped into **compatibility dimensions**. Each dimension captures a specific aspect of adoption suitability.

## Compatibility Dimensions

The scoring model evaluates the following dimensions:

| Dimension                 | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| Lifestyle Compatibility   | Alignment between adopter activity level and pet energy needs |
| Environment Compatibility | Suitability of adopter living environment                     |
| Financial Compatibility   | Ability to handle the pet’s maintenance costs                 |
| Experience Compatibility  | Adopter skill level relative to pet requirements              |
| Maintenance Compatibility | Grooming effort required vs tolerance                         |
| Health Compatibility      | Veterinary commitment vs expected medical care                |
| Behavior Compatibility    | Adopter patience vs behavioral challenges                     |
| Commitment Compatibility  | Long-term responsibility for the pet                          |

Each dimension produces a **normalized score between 0 and 1**.

---

# 3. Attribute Pairing Strategy

Compatibility is calculated by pairing **adopter attributes with corresponding pet requirements**.

Examples include:

| Adopter Attribute    | Pet Attribute           | Purpose                  |
| -------------------- | ----------------------- | ------------------------ |
| activity_level       | energy_level            | lifestyle fit            |
| available_time       | time_requirement        | daily care capacity      |
| home_size            | space_requirement       | environment suitability  |
| pet_budget           | monthly_care_cost       | financial readiness      |
| pet_experience       | experience_required     | handling ability         |
| grooming_tolerance   | grooming_level          | maintenance expectations |
| vet_commitment       | vet_visit_frequency     | health care readiness    |
| patience_level       | separation_anxiety_risk | behavioral tolerance     |
| long_term_commitment | expected_lifespan       | ownership responsibility |

These attribute pairs form the basis for compatibility calculations.

---

# 4. Compatibility Matrices

Not all mismatches should result in complete rejection. For example, a moderately active adopter may still be compatible with a high-energy pet, but not perfectly.

To capture this nuance, the system uses **compatibility matrices** that assign partial scores to different attribute combinations.

Example energy compatibility matrix:

| Adopter Activity | Pet Energy | Score |
| ---------------- | ---------- | ----- |
| low              | low        | 1.0   |
| medium           | medium     | 1.0   |
| high             | high       | 1.0   |
| medium           | high       | 0.6   |
| high             | medium     | 0.8   |
| low              | medium     | 0.5   |
| low              | high       | 0.2   |

This allows the system to represent **degrees of compatibility instead of binary matches**.

---

# 5. Weighted Scoring System

Each compatibility dimension contributes a weighted portion to the final score.

The scoring model uses the following weights:

| Dimension                 | Weight |
| ------------------------- | ------ |
| Lifestyle Compatibility   | 23%    |
| Environment Compatibility | 20%    |
| Financial Compatibility   | 15%    |
| Experience Compatibility  | 10%    |
| Maintenance Compatibility | 10%    |
| Health Compatibility      | 10%    |
| Behavior Compatibility    | 7%     |
| Commitment Compatibility  | 5%     |

The final compatibility score is computed as a weighted sum of these components.

### Final Score Formula

```
Final Score =
0.23 × Lifestyle +
0.20 × Environment +
0.15 × Financial +
0.10 × Experience +
0.10 × Maintenance +
0.10 × Health +
0.07 × Behavior +
0.05 × Commitment
```

The final result is normalized to a **0–100 compatibility score**.

---

# 6. Matching and Ranking Logic

Once compatibility scores are computed for all eligible pets, the system performs the following steps:

1. Filter pets that fail hard constraints
2. Compute compatibility scores for remaining pets
3. Store match results with scores
4. Sort pets by descending score
5. Return the top recommended pets

The result is a ranked list of pets that best match the adopter’s lifestyle, environment, and capabilities.

---

# 7. Example Matching Output

Example system output:

```
Top Pet Matches

Luna — Score: 88
Bella — Score: 84
Rocky — Score: 82
Max — Score: 79
Milo — Score: 76
```

Each score reflects how well the adopter’s characteristics align with the pet’s needs.

---

# 8. Advantages of the Approach

The compatibility scoring system offers several advantages:

### Interpretability

Every score is derived from clearly defined factors, making recommendations easy to explain.

### Safety

Hard constraints prevent unsafe or unrealistic matches.

### Flexibility

Compatibility matrices allow nuanced scoring instead of rigid rules.

### Extensibility

Additional attributes and scoring dimensions can easily be added as the system evolves.

---

# 9. Role in the Overall System

The compatibility engine developed in this phase serves as the **central decision-making component of the adoption platform**.

Its responsibilities include:

* evaluating adopter–pet compatibility
* ranking potential matches
* supporting adoption counselors in decision making

Later phases build on this foundation by introducing:

* natural-language explanations for matches
* risk analysis and adoption guidance
* adaptive questionnaires for collecting adopter information

---

# Outcome

At the end of Phase 3, the system was capable of taking an adopter profile and producing **ranked pet recommendations based on structured compatibility analysis**. This provided a reliable and interpretable foundation for the intelligent adoption matching platform.
