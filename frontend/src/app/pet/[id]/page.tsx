"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Loader2,
  AlertCircle,
  PawPrint,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  Lightbulb,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScoreGauge from "@/components/ScoreGauge";
import ScoreBar from "@/components/ScoreBar";
import { usePawPatrol } from "@/context/PawPatrolContext";
import { fetchExplanation } from "@/lib/api";
import { AdopterProfile, PetExplanation } from "@/types";
import { toast } from "sonner";

const BREAKDOWN_COLORS: Record<string, string> = {
  lifestyle: "#FF9500",
  environment: "#9DCFA8",
  financial: "#87CEEB",
  experience: "#8B6F47",
  maintenance: "#F59E0B",
  health: "#EF4444",
  behavior: "#A78BFA",
  commitment: "#FF6B6B",
};

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const petId = params.id as string;
  const { profile, matches, saveMatch, removeMatch, isMatchSaved } = usePawPatrol();

  const [explanation, setExplanation] = useState<PetExplanation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Find current match index for prev/next navigation
  const currentMatchIndex = matches.findIndex((m) => m.PetID === petId);
  const prevMatch = currentMatchIndex > 0 ? matches[currentMatchIndex - 1] : null;
  const nextMatch =
    currentMatchIndex >= 0 && currentMatchIndex < matches.length - 1
      ? matches[currentMatchIndex + 1]
      : null;

  const saved = isMatchSaved(petId);

  useEffect(() => {
    let cancelled = false;

    async function loadExplanation() {
      if (!profile || Object.keys(profile).length === 0) {
        setError("No adopter profile found. Please complete the questionnaire first.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchExplanation(profile as AdopterProfile, petId);
        if (!cancelled) {
          setExplanation(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load pet details. Please try again.");
          setLoading(false);
          toast.error("Could not load pet explanation.");
        }
      }
    }

    loadExplanation();
    return () => { cancelled = true; };
  }, [petId, profile]);

  const handleToggleSave = () => {
    if (!explanation) return;
    if (saved) {
      removeMatch(petId);
      toast("Match removed from saved.");
    } else {
      saveMatch({
        petId,
        petName: explanation.pet_name,
        score: explanation.score,
        dateSaved: new Date().toISOString(),
        explanation: explanation.explanation,
      });
      toast.success("Match saved!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-orange animate-spin" />
        <p className="text-muted-foreground">Analyzing compatibility details...</p>
      </div>
    );
  }

  if (error || !explanation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <AlertCircle className="w-12 h-12 text-coral" />
        <h2 className="text-xl font-bold text-center">{error || "Something went wrong."}</h2>
        <Button onClick={() => router.push("/results")} className="bg-orange text-white rounded-xl mt-4">
          Back to Results
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-light/20 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <button
          onClick={() => router.push("/results")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Results
        </button>

        {/* Pet Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-lg"
        >
          {/* Image banner */}
          <div className="h-48 bg-gradient-to-r from-orange/20 via-coral/10 to-sage/20 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center relative">
            <PawPrint className="w-20 h-20 text-orange/20" />
            <button
              onClick={handleToggleSave}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow hover:scale-110 transition-transform"
              aria-label={saved ? "Remove from saved" : "Save match"}
            >
              {saved ? (
                <BookmarkCheck className="w-5 h-5 text-orange fill-orange" />
              ) : (
                <Bookmark className="w-5 h-5 text-neutral-400" />
              )}
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{explanation.pet_name}</h1>
                <p className="text-muted-foreground mt-1">Pet ID: {petId}</p>
              </div>
              <ScoreGauge score={explanation.score} size={140} strokeWidth={10} />
            </div>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow"
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Brain className="w-5 h-5 text-orange" />
            Compatibility Breakdown
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(explanation.breakdown).map(([key, value]) => (
              <ScoreBar
                key={key}
                label={key}
                value={value}
                color={BREAKDOWN_COLORS[key] || "#FF9500"}
              />
            ))}
          </div>
        </motion.div>

        {/* AI Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow"
        >
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-sage" />
            AI Explanation
          </h2>
          <p className="text-muted-foreground leading-relaxed">{explanation.explanation}</p>
        </motion.div>

        {/* Risks */}
        {explanation.risks && explanation.risks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-coral/5 dark:bg-coral/10 rounded-2xl border border-coral/20 p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-coral">
              <AlertTriangle className="w-5 h-5" />
              Potential Risks
            </h2>
            <ul className="space-y-2">
              {explanation.risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Advice */}
        {explanation.advice && explanation.advice.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-sage/5 dark:bg-sage/10 rounded-2xl border border-sage/20 p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-sage">
              <Lightbulb className="w-5 h-5" />
              Expert Advice
            </h2>
            <ul className="space-y-2">
              {explanation.advice.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {prevMatch ? (
            <Button
              variant="outline"
              onClick={() => router.push(`/pet/${prevMatch.PetID}`)}
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {prevMatch.Name}
            </Button>
          ) : (
            <div />
          )}
          {nextMatch && (
            <Button
              variant="outline"
              onClick={() => router.push(`/pet/${nextMatch.PetID}`)}
              className="rounded-xl"
            >
              {nextMatch.Name}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
