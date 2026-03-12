"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ConversationEntry, AdopterProfile, MatchResult, SavedMatch } from "@/types";

interface PawPatrolState {
  conversation: ConversationEntry[];
  profile: Partial<AdopterProfile>;
  matches: MatchResult[];
  savedMatches: SavedMatch[];
  addConversationEntry: (entry: ConversationEntry) => void;
  setProfile: (profile: Partial<AdopterProfile>) => void;
  setMatches: (matches: MatchResult[]) => void;
  saveMatch: (match: SavedMatch) => void;
  removeMatch: (petId: string) => void;
  isMatchSaved: (petId: string) => boolean;
  resetQuestionnaire: () => void;
}

const PawPatrolContext = createContext<PawPatrolState | undefined>(undefined);

export function PawPatrolProvider({ children }: { children: React.ReactNode }) {
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [profile, setProfileState] = useState<Partial<AdopterProfile>>({});
  const [matches, setMatchesState] = useState<MatchResult[]>([]);
  const [savedMatches, setSavedMatches] = useState<SavedMatch[]>([]);

  // Load saved matches and profile from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pawpatrol_saved_matches");
      if (saved) setSavedMatches(JSON.parse(saved));

      const savedProfile = localStorage.getItem("pawpatrol_profile");
      if (savedProfile) setProfileState(JSON.parse(savedProfile));

      const savedMatches = localStorage.getItem("pawpatrol_matches");
      if (savedMatches) setMatchesState(JSON.parse(savedMatches));
    } catch {
      // Ignore corrupt localStorage
    }
  }, []);

  // Persist saved matches
  useEffect(() => {
    localStorage.setItem("pawpatrol_saved_matches", JSON.stringify(savedMatches));
  }, [savedMatches]);

  // Persist profile
  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      localStorage.setItem("pawpatrol_profile", JSON.stringify(profile));
    }
  }, [profile]);

  // Persist matches
  useEffect(() => {
    if (matches.length > 0) {
      localStorage.setItem("pawpatrol_matches", JSON.stringify(matches));
    }
  }, [matches]);

  const addConversationEntry = useCallback((entry: ConversationEntry) => {
    setConversation((prev) => [...prev, entry]);
  }, []);

  const setProfile = useCallback((p: Partial<AdopterProfile>) => {
    setProfileState(p);
  }, []);

  const setMatches = useCallback((m: MatchResult[]) => {
    setMatchesState(m);
  }, []);

  const saveMatch = useCallback((match: SavedMatch) => {
    setSavedMatches((prev) => {
      const exists = prev.find((m) => m.petId === match.petId);
      if (exists) return prev;
      return [...prev, match];
    });
  }, []);

  const removeMatch = useCallback((petId: string) => {
    setSavedMatches((prev) => prev.filter((m) => m.petId !== petId));
  }, []);

  const isMatchSaved = useCallback(
    (petId: string) => savedMatches.some((m) => m.petId === petId),
    [savedMatches]
  );

  const resetQuestionnaire = useCallback(() => {
    setConversation([]);
    setProfileState({});
    setMatchesState([]);
    localStorage.removeItem("pawpatrol_profile");
    localStorage.removeItem("pawpatrol_matches");
  }, []);

  return (
    <PawPatrolContext.Provider
      value={{
        conversation,
        profile,
        matches,
        savedMatches,
        addConversationEntry,
        setProfile,
        setMatches,
        saveMatch,
        removeMatch,
        isMatchSaved,
        resetQuestionnaire,
      }}
    >
      {children}
    </PawPatrolContext.Provider>
  );
}

export function usePawPatrol() {
  const ctx = useContext(PawPatrolContext);
  if (!ctx) throw new Error("usePawPatrol must be used within PawPatrolProvider");
  return ctx;
}
