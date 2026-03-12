"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PawPrint, ArrowRight, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScoreGauge from "@/components/ScoreGauge";
import { MatchResult, SavedMatch } from "@/types";

interface MatchCardProps {
  match: MatchResult;
  index: number;
  isSaved: boolean;
  onSave: (match: SavedMatch) => void;
  onRemove: (petId: string) => void;
}

export default function MatchCard({ match, index, isSaved, onSave, onRemove }: MatchCardProps) {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSaved) {
      onRemove(match.PetID);
    } else {
      onSave({
        petId: match.PetID,
        petName: match.Name,
        score: match.Score,
        dateSaved: new Date().toISOString(),
        explanation: match.Explanation,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-orange/40 transition-all duration-300 hover:shadow-xl hover:shadow-orange/5 hover:-translate-y-1"
    >
      {/* Pet image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-orange-light to-coral-light dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,149,0,0.15)_0%,_transparent_70%)]" />
        <PawPrint className="w-16 h-16 text-orange/30" />

        {/* Rank badge */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange shadow">
          #{index + 1} Match
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow hover:scale-110 transition-transform"
          aria-label={isSaved ? "Remove from saved" : "Save match"}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-orange fill-orange" />
          ) : (
            <Bookmark className="w-4 h-4 text-neutral-400 hover:text-orange" />
          )}
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold truncate">{match.Name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {match.Explanation?.slice(0, 100)}
              {match.Explanation?.length > 100 ? "..." : ""}
            </p>
          </div>
          <ScoreGauge score={match.Score} size={80} strokeWidth={6} showLabel={false} />
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs bg-sage/10 text-sage px-2.5 py-1 rounded-full font-medium">
            Score: {Math.round(match.Score)}
          </span>
          {match.Risks?.length > 0 && (
            <span className="text-xs bg-coral/10 text-coral px-2.5 py-1 rounded-full font-medium">
              {match.Risks.length} Risk{match.Risks.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <Link href={`/pet/${match.PetID}`} className="block mt-4">
          <Button
            variant="outline"
            className="w-full rounded-xl group-hover:bg-orange group-hover:text-white group-hover:border-orange transition-all"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
