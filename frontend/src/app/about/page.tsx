"use client";

import { motion, Variants } from "framer-motion";
import {
  PawPrint,
  Brain,
  Heart,
  Shield,
  BarChart3,
  HelpCircle,
  ChevronDown,
  Mail,
} from "lucide-react";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const scoringCategories = [
  { name: "Lifestyle", weight: "23%", description: "Energy level and time availability matching" },
  { name: "Environment", weight: "20%", description: "Home size, type, and climate compatibility" },
  { name: "Financial", weight: "15%", description: "Budget vs. pet care cost alignment" },
  { name: "Experience", weight: "10%", description: "Your pet experience vs. pet needs" },
  { name: "Maintenance", weight: "10%", description: "Grooming and shedding tolerance" },
  { name: "Health", weight: "10%", description: "Vet commitment and insurance readiness" },
  { name: "Behavior", weight: "7%", description: "Patience, training, and noise tolerance" },
  { name: "Commitment", weight: "5%", description: "Long-term care readiness" },
];

const faqs = [
  {
    q: "How accurate is the AI matching?",
    a: "Our algorithm scores compatibility across 8 dimensions with 16+ attributes. The AI explanation is powered by Google Gemini, providing human-readable insights for each match.",
  },
  {
    q: "How long does the questionnaire take?",
    a: "The questionnaire has 12 base questions plus a few adaptive follow-ups. Most users complete it in under 5 minutes.",
  },
  {
    q: "Can I retake the questionnaire?",
    a: "Yes! You can retake it anytime from the results page. Your previous saved matches will remain in your saved list.",
  },
  {
    q: "Are my answers saved?",
    a: "Your profile and saved matches are stored locally in your browser. No data is sent to external servers beyond the matching API.",
  },
  {
    q: "What pets are in the database?",
    a: "Our database includes dogs and cats with detailed attributes like energy level, grooming needs, space requirements, and more.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <span className="font-medium text-sm">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-4 pb-4 text-sm text-muted-foreground"
        >
          {a}
        </motion.div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Mission */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Our Mission
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold mb-4">
            Every Pet Deserves a{" "}
            <span className="bg-gradient-to-r from-orange to-coral bg-clip-text text-transparent">
              Perfect Home
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            PawPatrol is an AI-powered adoption matching system that connects
            potential adopters with their most compatible pets. We believe that
            the right match leads to happier pets and happier families. Our
            technology analyzes your lifestyle across 16+ dimensions to find
            the pet that truly fits your world.
          </motion.p>
        </motion.div>

        {/* How AI Works */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-orange" />
            <h2 className="text-2xl font-bold">How the AI Works</h2>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="space-y-4 mb-8">
            <p className="text-muted-foreground leading-relaxed">
              Our matching algorithm evaluates compatibility across <strong>8 scoring dimensions</strong>,
              each weighted by importance. The system considers your lifestyle, living environment,
              financial capacity, experience, and commitment level to produce a 0-100 compatibility score.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              After scoring, <strong>Google Gemini AI</strong> generates natural-language explanations,
              identifying potential risks and providing expert adoption advice tailored to each match.
            </p>
          </motion.div>

          {/* Scoring table */}
          <motion.div variants={fadeUp} custom={2}>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Category</span>
                <span>Weight</span>
                <span>Measures</span>
              </div>
              {scoringCategories.map((cat, i) => (
                <div
                  key={cat.name}
                  className={`grid grid-cols-3 gap-4 p-4 text-sm ${
                    i % 2 ? "bg-neutral-50/50 dark:bg-neutral-800/20" : ""
                  }`}
                >
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-orange font-mono font-semibold">{cat.weight}</span>
                  <span className="text-muted-foreground">{cat.description}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: Shield, title: "Privacy First", desc: "All data stays in your browser. No tracking, no accounts." },
            { icon: BarChart3, title: "Data-Driven", desc: "Scoring based on real adoption research and expert knowledge." },
            { icon: Heart, title: "Pet Welfare", desc: "Better matches mean fewer returns and happier animals." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-orange/10 mb-3">
                <item.icon className="w-6 h-6 text-orange" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-orange" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </motion.div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 bg-sage/10 text-sage px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Mail className="w-4 h-4" />
              Get in Touch
            </div>
          </motion.div>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground mb-4">
            Have questions or feedback? We&apos;d love to hear from you.
          </motion.p>
          <motion.a
            variants={fadeUp}
            custom={2}
            href="mailto:support@pawpatrol.ai"
            className="inline-flex items-center gap-2 text-orange hover:underline font-medium"
          >
            <Mail className="w-4 h-4" />
            support@pawpatrol.ai
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
