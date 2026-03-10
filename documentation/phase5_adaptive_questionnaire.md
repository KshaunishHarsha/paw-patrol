# Phase 5: Adaptive Questionnaire for Adopter Profile Generation

## Overview

After implementing the compatibility scoring engine and LLM-based reasoning layer, the next step was to create a system for **collecting adopter information dynamically**. In earlier phases, adopter profiles were generated from a synthetic dataset for testing purposes. However, in a real adoption scenario, adopter information must be gathered directly from users.

To address this requirement, Phase 5 introduced an **adaptive questionnaire system** that collects information about a potential adopter's lifestyle, environment, and preferences. The questionnaire is designed to be **interactive, efficient, and intelligent**, ensuring that sufficient information is gathered to generate a structured adopter profile without overwhelming the user with unnecessary questions.

The questionnaire system uses a combination of **structured base questions and an LLM-powered adaptive questioning mechanism**. The collected responses are then converted into a standardized adopter profile that serves as input to the compatibility matching engine.

---

# 1. Objectives of the Questionnaire System

The questionnaire system was designed with the following objectives:

1. **Capture key adopter attributes** required by the compatibility scoring engine.
2. **Minimize the number of questions** asked to the user.
3. **Adapt dynamically** based on previous responses.
4. **Convert conversational responses into structured data** compatible with the matching algorithm.

This design ensures that the system gathers all necessary information while maintaining a user-friendly interaction experience.

---

# 2. Adopter Attributes Required by the Matching Engine

The compatibility engine requires a set of structured adopter attributes in order to evaluate compatibility with pets. These attributes represent various aspects of the adopter's lifestyle, living environment, and commitment level.

The questionnaire system collects the following attributes:

| Attribute                  | Description                                |
| -------------------------- | ------------------------------------------ |
| activity_level             | General activity level of the adopter      |
| home_type                  | Type of residence                          |
| home_size                  | Available living space for a pet           |
| pet_experience             | Experience level with pets                 |
| available_time             | Daily time available for pet care          |
| kids_present               | Presence of children in the household      |
| other_pets                 | Presence of other pets                     |
| pet_budget                 | Monthly budget allocated for pet care      |
| insurance_willing          | Willingness to obtain pet health insurance |
| vet_commitment             | Readiness to handle veterinary care        |
| air_conditioning_available | Availability of climate control            |
| training_commitment        | Willingness to train the pet               |
| patience_level             | Tolerance for behavioral challenges        |
| grooming_tolerance         | Comfort with grooming tasks                |
| noise_tolerance            | Ability to tolerate noisy pets             |
| long_term_commitment       | Commitment to long-term pet ownership      |

These attributes form the **input schema for the compatibility scoring engine** developed in Phase 3.

---

# 3. Base Questionnaire Design

The questionnaire begins with a set of **base questions** that capture the most critical adopter attributes. These questions provide the initial information needed to begin building the adopter profile.

The base questionnaire covers the following topics:

| Category                 | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| Living situation         | Determine housing environment               |
| Activity level           | Estimate exercise compatibility             |
| Time availability        | Measure ability to care for the pet         |
| Pet experience           | Assess handling capability                  |
| Household composition    | Identify children or other pets             |
| Financial readiness      | Evaluate ability to afford pet care         |
| Maintenance tolerance    | Understand grooming expectations            |
| Veterinary readiness     | Evaluate willingness to manage medical care |
| Climate control          | Identify environmental constraints          |
| Long-term responsibility | Assess adoption commitment                  |

These base questions provide the majority of the signals required for compatibility scoring.

---

# 4. Adaptive Question Generation

While the base questions capture essential information, additional details may still be required to fully construct the adopter profile. To address this, the system incorporates an **adaptive questioning mechanism powered by a Large Language Model (LLM)**.

The LLM analyzes the conversation history and generates **context-aware follow-up questions** that help gather missing information.

Examples of adaptive follow-up questions include:

* "How comfortable are you with training a pet that may require behavioral guidance?"
* "How tolerant are you of barking or other pet noises?"
* "Would you consider purchasing pet health insurance if necessary?"

These questions allow the system to gather additional information while maintaining a natural conversational interaction.

---

# 5. Coverage Tracking Mechanism

A key component of the adaptive questionnaire system is the **coverage tracker**. The coverage tracker monitors which adopter attributes have already been captured and identifies which attributes remain unknown.

The system maintains a list of required attributes and continuously evaluates which fields have been filled. When generating follow-up questions, the LLM is provided with the list of **missing attributes**, ensuring that new questions target unresolved information.

This mechanism prevents:

* repeated questions
* irrelevant questions
* unnecessary conversation length

By guiding the LLM toward missing attributes, the system behaves like a **goal-directed interviewer**.

---

# 6. Conversation-to-Profile Conversion

Once enough information has been collected through the questionnaire, the conversation history is processed by the LLM to generate a **structured adopter profile**.

The LLM interprets the responses and converts them into a JSON object matching the adopter schema required by the compatibility engine.

Example adopter profile:

```id="97ce6f"
{
  "activity_level": "medium",
  "home_type": "apartment",
  "home_size": "small",
  "pet_experience": "beginner",
  "available_time": "medium",
  "kids_present": "no",
  "other_pets": "no",
  "pet_budget": "medium",
  "insurance_willing": "yes",
  "vet_commitment": "medium",
  "air_conditioning_available": "yes",
  "training_commitment": "medium",
  "patience_level": "high",
  "grooming_tolerance": "medium",
  "noise_tolerance": "medium",
  "long_term_commitment": "yes"
}
```

This structured profile is then passed directly to the **matching engine** to compute compatibility scores.

---

# 7. Questionnaire Workflow

The full workflow of the questionnaire system can be summarized as follows:

```id="5c8sz3"
Base Questions
      ↓
User Responses
      ↓
Coverage Tracker
      ↓
Identify Missing Attributes
      ↓
LLM Generates Follow-up Question
      ↓
Conversation Continues
      ↓
LLM Converts Conversation to Structured Profile
      ↓
Adopter Profile Sent to Matching Engine
```

This process ensures that sufficient information is collected efficiently while maintaining a natural interaction.

---

# 8. Advantages of the Adaptive Questionnaire

### Reduced User Friction

Users are not forced to complete a long static form. The system only asks questions that are relevant based on previous answers.

### Intelligent Data Collection

The LLM dynamically identifies missing information and generates targeted follow-up questions.

### Structured Output

Despite being conversational, the final output remains structured and compatible with the deterministic compatibility scoring system.

### Scalability

The questionnaire can easily incorporate additional attributes in the future without redesigning the entire form.

---

# 9. Role in the Overall System

The questionnaire system acts as the **primary input interface for adopters**. It replaces the synthetic adopter dataset used during development and allows the system to generate adopter profiles dynamically.

Within the overall platform architecture, the questionnaire operates as the **data collection layer** preceding the compatibility engine.

System pipeline:

```id="i4f8mx"
Adaptive Questionnaire
        ↓
Structured Adopter Profile
        ↓
Constraint Filtering
        ↓
Compatibility Scoring Engine
        ↓
LLM Reasoning Layer
        ↓
Adoption Recommendations
```

---

# Outcome

By the end of Phase 5, the platform gained the ability to collect adopter information through an intelligent, adaptive questionnaire and convert conversational responses into structured adopter profiles. This phase completed the transition from a prototype using synthetic adopter data to a system capable of interacting directly with potential adopters and generating personalized pet recommendations.
