"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Sparkles,
  Heart,
  PawPrint,
  Users,
  ClipboardList,
  Cpu,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PetScene3D = dynamic(() => import("@/components/PetScene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange to-coral animate-pulse" />
    </div>
  ),
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const features = [
  {
    icon: Cpu,
    title: "AI Compatibility Matching",
    description:
      "Our intelligent algorithm analyzes 16+ dimensions of compatibility to find your perfect pet match.",
    color: "from-orange to-amber-400",
  },
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description:
      "Adaptive questionnaire learns your lifestyle and preferences for tailored suggestions.",
    color: "from-coral to-pink-400",
  },
  {
    icon: ClipboardList,
    title: "Expert Pet Guidance",
    description:
      "AI-generated insights explain why each pet is right for you, with risks and advice.",
    color: "from-sage to-emerald-400",
  },
  {
    icon: Heart,
    title: "Happy Adoptions",
    description:
      "Matching the right pet with the right home leads to lifelong happiness for both.",
    color: "from-sky to-blue-400",
  },
];

const steps = [
  {
    number: "01",
    title: "Take the Questionnaire",
    description: "Answer simple questions about your lifestyle, home, and preferences.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "AI Analyzes Your Profile",
    description: "Our AI builds a comprehensive adopter profile from your answers.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Get Matched",
    description: "See your top 5 pet matches ranked by compatibility score.",
    icon: Star,
  },
  {
    number: "04",
    title: "Meet Your Pet",
    description: "Review detailed explanations and connect with your perfect companion.",
    icon: Heart,
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-light via-white to-coral-light dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,149,0,0.1)_0%,_transparent_60%)]" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            >
              <PawPrint className="w-4 h-4" />
              AI-Powered Pet Matching
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Find Your{" "}
              <span className="bg-gradient-to-r from-orange to-coral bg-clip-text text-transparent">
                Perfect
              </span>{" "}
              Furry Companion
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              PawPatrol uses advanced AI to match you with the most compatible
              pet based on your lifestyle, experience, and living situation.
              Every match is scoring across 16+ dimensions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/questionnaire">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange to-coral hover:from-orange/90 hover:to-coral/90 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-orange/25 transition-all hover:shadow-xl hover:shadow-orange/30 hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-base rounded-full border-2 hover:bg-orange/5"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sage" />
                <span>1000+ Adopters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sage" />
                <span>95% Match Accuracy</span>
              </div>
            </motion.div>
          </div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] lg:h-[500px] relative"
          >
            <PetScene3D />
            {/* Glow effect behind */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
              <div className="w-full h-full bg-gradient-to-r from-orange/40 via-coral/30 to-sage/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 bg-sage/10 text-sage px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Why PawPatrol
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl font-bold"
            >
              Smart Matching,{" "}
              <span className="bg-gradient-to-r from-orange to-coral bg-clip-text text-transparent">
                Happy Tails
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-muted-foreground max-w-2xl mx-auto"
            >
              Our AI doesn&apos;t just match—it understands. Every recommendation is backed by
              multi-dimensional scoring and expert-level reasoning.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group relative p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange/5 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feat.color} mb-4`}
                >
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 bg-sky/10 text-sky px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            >
              <PawPrint className="w-4 h-4" />
              How It Works
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl font-bold"
            >
              Your Journey to a{" "}
              <span className="bg-gradient-to-r from-sage to-sky bg-clip-text text-transparent">
                Perfect Match
              </span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-orange/30 to-transparent" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange to-coral text-white text-xl font-bold mb-4 shadow-lg shadow-orange/20">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange to-coral" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 text-center text-white"
        >
          <motion.div variants={fadeUp} custom={0}>
            <PawPrint className="w-12 h-12 mx-auto mb-6 opacity-80" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Meet Your New Best Friend?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg opacity-90 mb-8 max-w-2xl mx-auto"
          >
            Take our 5-minute AI-powered questionnaire and discover the pet
            that&apos;s perfect for your lifestyle.
          </motion.p>
          <motion.div variants={fadeUp} custom={3}>
            <Link href="/questionnaire">
              <Button
                size="lg"
                className="bg-white text-orange hover:bg-white/90 px-10 py-6 text-base rounded-full shadow-xl font-semibold transition-all hover:scale-105"
              >
                Start Your Pet Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
