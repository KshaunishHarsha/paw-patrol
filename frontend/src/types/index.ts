// ── Base Question from /questionnaire/start ──
export interface BaseQuestion {
  id: string;
  question: string;
}

// ── Conversation entry tracked in context ──
export interface ConversationEntry {
  question_id: string;
  question_text: string;
  answer: string;
}

// ── 16 required adopter profile attributes ──
export interface AdopterProfile {
  activity_level: string;
  home_type: string;
  home_size: string;
  pet_experience: string;
  available_time: string;
  kids_present: string;
  other_pets: string;
  pet_budget: string;
  insurance_willing: string;
  vet_commitment: string;
  air_conditioning_available: string;
  training_commitment: string;
  patience_level: string;
  grooming_tolerance: string;
  noise_tolerance: string;
  long_term_commitment: string;
}

// ── Match result from /matching/match ──
export interface MatchResult {
  PetID: string;
  Name: string;
  Score: number;
  Explanation: string;
  Risks: string[];
  Advice: string[];
}

// ── Score breakdown from /matching/explain ──
export interface ScoreBreakdown {
  lifestyle: number;
  environment: number;
  financial: number;
  experience: number;
  maintenance: number;
  health: number;
  behavior: number;
  commitment: number;
}

// ── Full explanation from /matching/explain ──
export interface PetExplanation {
  pet_name: string;
  score: number;
  breakdown: ScoreBreakdown;
  explanation: string;
  risks: string[];
  advice: string[];
}

// ── Saved match in localStorage ──
export interface SavedMatch {
  petId: string;
  petName: string;
  score: number;
  dateSaved: string;
  explanation: string;
}

// ── Required attributes list (mirrors backend coverage_tracker.py) ──
export const REQUIRED_ATTRIBUTES: (keyof AdopterProfile)[] = [
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
  "long_term_commitment",
];
