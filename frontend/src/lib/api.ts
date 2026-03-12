import {
  BaseQuestion,
  ConversationEntry,
  AdopterProfile,
  MatchResult,
  PetExplanation,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ── Questionnaire ──

export async function fetchBaseQuestions(): Promise<BaseQuestion[]> {
  const res = await fetch(`${API_BASE}/questionnaire/start`);
  if (!res.ok) throw new Error("Failed to fetch base questions");
  const data = await res.json();
  return data.base_questions;
}

export async function fetchNextQuestion(
  conversation: ConversationEntry[],
  profile: Partial<AdopterProfile>
): Promise<string> {
  const res = await fetch(`${API_BASE}/questionnaire/next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conversation: conversation.map((c) => ({
        q: c.question_text,
        a: c.answer,
      })),
      profile,
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch next question");
  const data = await res.json();
  return data.question;
}

export async function generateProfile(
  conversation: ConversationEntry[],
  profile: Partial<AdopterProfile>
): Promise<AdopterProfile> {
  const res = await fetch(`${API_BASE}/questionnaire/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conversation: conversation.map((c) => ({
        q: c.question_text,
        a: c.answer,
      })),
      profile,
    }),
  });
  if (!res.ok) throw new Error("Failed to generate profile");
  const data = await res.json();
  return data.profile;
}

// ── Matching ──

export async function fetchMatches(
  adopterProfile: AdopterProfile
): Promise<MatchResult[]> {
  const res = await fetch(`${API_BASE}/matching/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adopter_profile: adopterProfile }),
  });
  if (!res.ok) throw new Error("Failed to fetch matches");
  const data = await res.json();
  return data.matches;
}

export async function fetchExplanation(
  adopterProfile: AdopterProfile,
  petId: string
): Promise<PetExplanation> {
  const res = await fetch(`${API_BASE}/matching/explain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adopter_profile: adopterProfile, pet_id: petId }),
  });
  if (!res.ok) throw new Error("Failed to fetch explanation");
  return await res.json();
}
