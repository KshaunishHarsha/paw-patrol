"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PawPrint, Trash2, Eye, Bookmark, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScoreGauge from "@/components/ScoreGauge";
import { usePawPatrol } from "@/context/PawPatrolContext";

export default function SavedPage() {
  const { savedMatches, removeMatch } = usePawPatrol();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-light/20 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Bookmark className="w-4 h-4" />
            Saved Matches
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Your{" "}
            <span className="bg-gradient-to-r from-orange to-coral bg-clip-text text-transparent">
              Saved
            </span>{" "}
            Companions
          </h1>
          <p className="text-muted-foreground mt-2">
            {savedMatches.length > 0
              ? `You have ${savedMatches.length} saved match${savedMatches.length > 1 ? "es" : ""}`
              : "No saved matches yet"}
          </p>
        </motion.div>

        {/* Empty state */}
        {savedMatches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-6">
              <PawPrint className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No saved matches yet</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Complete the questionnaire to find your compatible pets, then save
              your favorites to view them here anytime.
            </p>
            <Link href="/questionnaire">
              <Button className="bg-gradient-to-r from-orange to-coral text-white rounded-xl px-6">
                Start Questionnaire
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {savedMatches.map((match, i) => (
              <motion.div
                key={match.petId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-orange/30 transition-all hover:shadow-lg"
              >
                {/* Pet icon */}
                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-light to-coral-light dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-orange/40" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg">{match.petName}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {match.explanation?.slice(0, 120)}...
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Saved {new Date(match.dateSaved).toLocaleDateString()}
                  </div>
                </div>

                {/* Score */}
                <div className="shrink-0">
                  <ScoreGauge score={match.score} size={64} strokeWidth={5} showLabel={false} />
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-2">
                  <Link href={`/pet/${match.petId}`}>
                    <Button variant="outline" size="sm" className="rounded-lg text-xs">
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeMatch(match.petId)}
                    className="rounded-lg text-xs text-coral hover:bg-coral/10 hover:border-coral"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
