"use client";

import { motion } from "framer-motion";

interface ScoreBarProps {
  label: string;
  value: number; // 0 to 1
  color?: string;
}

export default function ScoreBar({ label, value, color = "#FF9500" }: ScoreBarProps) {
  const percentage = Math.round(value * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium capitalize text-foreground">{label}</span>
        <span className="text-muted-foreground font-mono text-xs">{percentage}%</span>
      </div>
      <div className="h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}
