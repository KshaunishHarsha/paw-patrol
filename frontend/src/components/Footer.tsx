import Link from "next/link";
import { PawPrint, Heart, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="w-7 h-7 text-orange-500" />
              <span className="text-lg font-bold text-white">PawPatrol</span>
            </Link>
            <p className="text-sm max-w-md leading-relaxed">
              AI-powered pet adoption matching that helps you find your perfect
              furry companion. Every pet deserves a loving home.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Heart className="w-4 h-4 text-coral fill-coral" />
              <span className="text-xs text-coral">Made with love for pets</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/questionnaire" className="hover:text-orange-400 transition-colors">
                  Find a Match
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-orange-400 transition-colors">
                  Saved Matches
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-orange-500 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-orange-500 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-orange-500 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-800 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} PawPatrol. All rights reserved. Every
          match brings a pet closer to home.
        </div>
      </div>
    </footer>
  );
}
