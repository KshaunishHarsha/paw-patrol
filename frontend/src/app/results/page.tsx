"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RefreshCw, Loader2, PawPrint, ArrowDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MatchCard from "@/components/MatchCard";
import { usePawPatrol } from "@/context/PawPatrolContext";
import { fetchMatches } from "@/lib/api";
import { AdopterProfile, MatchResult } from "@/types";
import { toast } from "sonner";

export default function ResultsPage() {
  const router = useRouter();
  const { profile, matches, setMatches, saveMatch, removeMatch, isMatchSaved, resetQuestionnaire } =
    usePawPatrol();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    let cancelled = false;

    async function loadMatches() {
      // If we already have matches in state and profile hasn't changed, use those
      if (matches.length > 0) {
        setLoading(false);
        return;
      }

      // Check if profile exists
      if (!profile || Object.keys(profile).length === 0) {
        setError("No adopter profile found. Please complete the questionnaire first.");
        setLoading(false);
        return;
      }

      try {
        const results = await fetchMatches(profile as AdopterProfile);
        if (!cancelled) {
          setMatches(results);
          setLoading(false);

          // Confetti for great matches
          if (results.length > 0 && results[0].Score > 80) {
            toast.success("🎉 Great news! We found an excellent match for you!");
          }
        }
      } catch {
        if (!cancelled) {
          setError("Failed to find matches. Please try again.");
          setLoading(false);
        }
      }
    }

    loadMatches();
    return () => { cancelled = true; };
  }, [profile, matches.length, setMatches]);

  const sortedMatches = [...matches].sort((a, b) =>
    sortOrder === "desc" ? b.Score - a.Score : a.Score - b.Score
  );

  const handleRetake = () => {
    resetQuestionnaire();
    router.push("/questionnaire");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-orange animate-spin" />
        <p className="text-muted-foreground">Finding your perfect pet matches...</p>
        <p className="text-xs text-muted-foreground">This may take a moment as our AI analyzes compatibility</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <AlertCircle className="w-12 h-12 text-coral" />
        <h2 className="text-xl font-bold text-center">{error}</h2>
        <div className="flex gap-3 mt-4">
          <Button onClick={() => router.push("/questionnaire")} className="bg-orange text-white rounded-xl">
            Take Questionnaire
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()} className="rounded-xl">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-light/30 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-sage/10 text-sage px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <PawPrint className="w-4 h-4" />
            Match Results
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Your{" "}
            <span className="bg-gradient-to-r from-orange to-coral bg-clip-text text-transparent">
              Perfect Pet
            </span>{" "}
            Matches
          </h1>
          <p className="text-muted-foreground mt-2">
            We found {matches.length} compatible pet{matches.length !== 1 ? "s" : ""} for you
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-medium hover:border-orange/40 transition-colors"
            >
              <ArrowDown
                className={`w-4 h-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`}
              />
              Sort by Score
            </button>
          </div>
          <Button
            variant="outline"
            onClick={handleRetake}
            className="rounded-xl text-sm"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retake Questionnaire
          </Button>
        </div>

        {/* Match Grid */}
        {matches.length === 0 ? (
          <div className="text-center py-20">
            <PawPrint className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No matches found</h3>
            <p className="text-muted-foreground text-sm mt-2">
              Try adjusting your preferences by retaking the questionnaire.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMatches.map((match: MatchResult, i: number) => (
              <MatchCard
                key={match.PetID}
                match={match}
                index={i}
                isSaved={isMatchSaved(match.PetID)}
                onSave={saveMatch}
                onRemove={removeMatch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
