"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePawPatrol } from "@/context/PawPatrolContext";
import { fetchBaseQuestions, fetchNextQuestion, generateProfile } from "@/lib/api";
import { BaseQuestion, REQUIRED_ATTRIBUTES } from "@/types";
import { toast } from "sonner";

// Predefined options for known question types
const QUESTION_OPTIONS: Record<string, { type: "choice" | "yesno" | "text"; options?: string[] }> = {
  home_type: { type: "choice", options: ["apartment", "house", "other"] },
  home_size: { type: "choice", options: ["small", "medium", "large"] },
  activity_level: { type: "choice", options: ["low", "medium", "high"] },
  available_time: { type: "choice", options: ["low", "medium", "high"] },
  pet_experience: { type: "choice", options: ["beginner", "intermediate", "experienced"] },
  kids_present: { type: "yesno" },
  other_pets: { type: "yesno" },
  pet_budget: { type: "choice", options: ["low", "medium", "high"] },
  grooming_tolerance: { type: "choice", options: ["low", "medium", "high"] },
  vet_commitment: { type: "choice", options: ["low", "medium", "high"] },
  air_conditioning_available: { type: "yesno" },
  long_term_commitment: { type: "yesno" },
};

export default function QuestionnairePage() {
  const router = useRouter();
  const { conversation, profile, addConversationEntry, setProfile, setMatches } = usePawPatrol();

  const [baseQuestions, setBaseQuestions] = useState<BaseQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"loading" | "base" | "adaptive" | "finalizing">("loading");
  const [adaptiveQuestion, setAdaptiveQuestion] = useState("");
  const [adaptiveCount, setAdaptiveCount] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // How many attrs are covered?
  const coveredCount = REQUIRED_ATTRIBUTES.filter(
    (attr) => profile[attr] !== undefined && profile[attr] !== null && profile[attr] !== ""
  ).length;
  const totalRequired = REQUIRED_ATTRIBUTES.length;
  const isComplete = coveredCount >= totalRequired;

  // Total question count for progress
  const totalQuestions = baseQuestions.length + adaptiveCount;
  const currentQuestionNumber =
    phase === "base" ? currentIndex + 1 : baseQuestions.length + adaptiveCount;
  const progressPercent = totalQuestions > 0 ? (currentQuestionNumber / Math.max(totalQuestions, 16)) * 100 : 0;

  // Fetch base questions on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const questions = await fetchBaseQuestions();
        if (!cancelled) {
          setBaseQuestions(questions);
          setPhase("base");
        }
      } catch {
        toast.error("Failed to load questionnaire. Please try again.");
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const currentQuestion = phase === "base" ? baseQuestions[currentIndex] : null;
  const questionText = phase === "base" ? currentQuestion?.question || "" : adaptiveQuestion;
  const questionId = phase === "base" ? currentQuestion?.id || "" : `adaptive_${adaptiveCount}`;
  const questionConfig = currentQuestion ? QUESTION_OPTIONS[currentQuestion.id] : undefined;

  // Submit an answer
  const submitAnswer = useCallback(
    async (answer: string) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      addConversationEntry({
        question_id: questionId,
        question_text: questionText,
        answer,
      });

      // Update profile client-side for base questions
      if (phase === "base" && currentQuestion) {
        setProfile({ ...profile, [currentQuestion.id]: answer });
      }

      setTextInput("");

      if (phase === "base") {
        if (currentIndex < baseQuestions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setIsSubmitting(false);
        } else {
          // Transition to adaptive phase
          setPhase("adaptive");
          try {
            const updatedConversation = [
              ...conversation,
              { question_id: questionId, question_text: questionText, answer },
            ];
            const nextQ = await fetchNextQuestion(updatedConversation, profile);
            setAdaptiveQuestion(nextQ);
            setAdaptiveCount(1);
          } catch {
            toast.error("Failed to get follow-up question.");
          }
          setIsSubmitting(false);
        }
      } else {
        // Adaptive phase — check coverage and get next question or finalize
        try {
          const updatedConversation = [
            ...conversation,
            { question_id: questionId, question_text: questionText, answer },
          ];

          // Try to update profile via LLM
          const updatedProfile = await generateProfile(updatedConversation, profile);
          setProfile(updatedProfile);

          // Check if all attributes are covered
          const covered = REQUIRED_ATTRIBUTES.filter(
            (attr) => updatedProfile[attr] !== undefined && updatedProfile[attr] !== null && updatedProfile[attr] !== ""
          ).length;

          if (covered >= totalRequired || adaptiveCount >= 8) {
            // Profile complete → redirect
            setPhase("finalizing");
            setTimeout(() => router.push("/results"), 1500);
          } else {
            const nextQ = await fetchNextQuestion(updatedConversation, updatedProfile);
            setAdaptiveQuestion(nextQ);
            setAdaptiveCount((prev) => prev + 1);
          }
        } catch {
          toast.error("Something went wrong. Please try again.");
        }
        setIsSubmitting(false);
      }
    },
    [
      isSubmitting, phase, currentIndex, baseQuestions, currentQuestion,
      conversation, profile, questionId, questionText, adaptiveCount,
      totalRequired, addConversationEntry, setProfile, router,
    ]
  );

  // ── Encouragement messages ──
  const encouragements = [
    "Great start! 🐾",
    "You're doing great!",
    "Almost there! Keep going! ✨",
    "Wonderful answers! 🎉",
    "Your perfect pet is getting closer! 🐕",
  ];
  const encourageIndex = Math.min(
    Math.floor(currentQuestionNumber / 3),
    encouragements.length - 1
  );

  if (phase === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-orange animate-spin" />
        <p className="text-muted-foreground">Loading your questionnaire...</p>
      </div>
    );
  }

  if (phase === "finalizing") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <CheckCircle className="w-16 h-16 text-sage" />
        </motion.div>
        <h2 className="text-2xl font-bold">Profile Complete!</h2>
        <p className="text-muted-foreground">Finding your perfect pet matches...</p>
        <Loader2 className="w-6 h-6 text-orange animate-spin mt-2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-light/30 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <PawPrint className="w-4 h-4" />
            Pet Matching Questionnaire
          </div>
          <p className="text-muted-foreground text-sm">
            {encouragements[encourageIndex]}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              Question {currentQuestionNumber} of {Math.max(totalQuestions, 12)}
              {phase === "adaptive" && "+"}
            </span>
            <span className="font-medium text-orange">
              {coveredCount}/{totalRequired} attributes
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={questionId}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-lg shadow-neutral-100 dark:shadow-none"
          >
            <h2 className="text-xl font-semibold mb-6 leading-relaxed">
              {questionText}
            </h2>

            {/* Input based on type */}
            {questionConfig?.type === "choice" && questionConfig.options && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {questionConfig.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => submitAnswer(opt)}
                    disabled={isSubmitting}
                    className="px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-orange hover:bg-orange/5 transition-all text-sm font-medium capitalize disabled:opacity-50 hover:scale-105 active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {questionConfig?.type === "yesno" && (
              <div className="grid grid-cols-2 gap-4">
                {["yes", "no"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => submitAnswer(opt)}
                    disabled={isSubmitting}
                    className={`px-6 py-4 rounded-xl border-2 transition-all text-base font-semibold capitalize disabled:opacity-50 hover:scale-105 active:scale-95 ${
                      opt === "yes"
                        ? "border-sage/30 hover:border-sage hover:bg-sage/10 text-sage"
                        : "border-coral/30 hover:border-coral hover:bg-coral/10 text-coral"
                    }`}
                  >
                    {opt === "yes" ? "✓ Yes" : "✗ No"}
                  </button>
                ))}
              </div>
            )}

            {(!questionConfig || questionConfig.type === "text" || phase === "adaptive") && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && textInput.trim()) submitAnswer(textInput.trim());
                  }}
                  placeholder="Type your answer..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-transparent focus:border-orange focus:outline-none transition-colors text-base"
                  disabled={isSubmitting}
                  autoFocus
                />
                <Button
                  onClick={() => textInput.trim() && submitAnswer(textInput.trim())}
                  disabled={!textInput.trim() || isSubmitting}
                  className="bg-gradient-to-r from-orange to-coral text-white rounded-xl px-6"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <ArrowRight className="w-4 h-4 mr-2" />
                  )}
                  Next
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Back button for base questions */}
        {phase === "base" && currentIndex > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous question
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
