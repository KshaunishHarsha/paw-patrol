# PawPatrol: AI-Powered Pet Adoption Matchmaker

PawPatrol is an intelligent pet adoption platform designed to create safer, more reliable, and transparent matches between potential adopters and shelter pets. By computing deterministic compatibility scores and leveraging Large Language Models (LLMs) to explain the reasoning, the system empowers adoption counselors and matching coordinators with actionable insights, risk analysis, and tailored guidance.

![OpenPaws Demo](documentation/pawpatrol-demo.mp4)

---

## 🚀 Core Features

- **Smart Compatibility Engine:** Deterministic ranking based on 8 key dimensions including lifestyle, environmental readiness, and financial commitment.
- **Hard Constraint Filtering:** Rejects matches based on clear safety thresholds (e.g., placing high-energy pets in unsuited enclosed spaces, or placing pets requiring a mature environment in homes with toddlers).
- **LLM-Powered Explanations:** Real-time generation of natural-language reasoning summarizing *why* a match is highly rated, along with specific risks and actionable advice for the adopter.
- **Adaptive Questionnaire:** An intelligent, context-aware Next.js conversational flow that dynamically adjusts its questions based on the adopter's previous answers to efficiently capture a complete profile.
- **Modern Interactive Dashboard:** A polished Next.js client visualizing compatibility breakdowns, pet characteristics, and AI-driven match insights.

---

## 🏗️ Technical Architecture

PawPatrol is a full-stack application built with the following technologies:

### Backend API (`src/api`)
- **FastAPI:** High-performance, async web framework for handling the REST API.
- **Python Data Stack:** Pandas and NumPy are used internally for handling the structured datasets and computing weighted match scores.
- **LLM Integration:** `google-generativeai` (Gemini API) is seamlessly integrated to parse the adaptive questionnaire responses and to generate plain-text reasoning outputs.

### Frontend Application (`frontend/`)
- **Next.js 15+ & React 19:** Utilizing the App Router for modern component-based architecture and Server-Side Rendering capabilities.
- **Tailwind CSS & Framer Motion:** For creating a responsive, highly polished, and fluid user interface.
- **Lucide React:** Scalable iconography.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 20+**
- A **Google Gemini API Key**

### 2. Backend Setup

1. **Navigate to the root directory:**
   ```bash
   cd paw-patrol
   ```
2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   *(Note: Ensure you have `fastapi`, `uvicorn`, `pandas`, `numpy`, `python-dotenv`, and `google-generativeai` installed.)*
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Run the API Server:**
   ```bash
   python -m uvicorn src.api.main:app --reload --port 8000
   ```
   The backend will be available at [http://localhost:8000](http://localhost:8000). You can check the interactive docs at `/docs`.

### 3. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd paw-patrol/frontend
   ```
2. **Install Node dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env.local` file in the `frontend/` directory (if different from default backend URL):
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```
4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## 📖 Phase-by-Phase Development

The development of PawPatrol was structured into distinct, logical phases. You can read the detailed documentation for each phase in the `documentation/` directory:

1. **[Phase 1: Pet Dataset Preparation](documentation/phase1_pet_dataset_preparation.md)**  
   Cleaned and enriched a dataset of 14,000+ pets by generating compatibility-focused traits (energy, space, grooming) from raw shelter metadata.
2. **[Phase 2: Adopter Dataset Preparation](documentation/phase2_adopter_dataset_prep.md)**  
   Created a synthetic dataset mapping exactly to the pet required traits to test the matching algorithm during development.
3. **[Phase 3: Compatibility Scoring Engine](documentation/phase3_compatibility_scoring_matching.md)**  
   Implemented the core deterministic matching logic using matrices, constraint filtering, and weighted scoring logic across 8 distinct dimensions.
4. **[Phase 4: LLM-Based Reasoning](documentation/phase4_llm_based_reasoning.md)**  
   Integrated Gemini to synthesize the raw numerical compatibility outputs into actionable insights (explanations, risks, and advice).
5. **[Phase 5: Adaptive Questionnaire](documentation/phase5_adaptive_questionnaire.md)**  
   Designed a conversational system utilizing the LLM to dynamically determine which adopter attributes are missing and to formulate follow-up questions.
6. **[Phase 6: API Layer](documentation/phase6_api_and_reasoning.md)**  
   Wrapped the core engine inside a FastAPI application to serve compatibility scores and reasoning outputs to clients.
7. **[Phase 7: Compatibility Dashboard Endpoint](documentation/phase7_compatibility_dashboard.md)**  
   Created specialized API formatting designed to gracefully feed a frontend dashboard with a granular breakdown of scores alongside the AI reasoning.
8. **[Phase 8: Frontend Architecture & Final Fixes](documentation/phase8_frontend_and_final_fixes.md)**  
   Built the comprehensive Next.js web application, solving integration bugs and enabling users to actually test the full flow end-to-end.

---

## 🔮 Future Improvements

While PawPatrol is fully functioning, it serves as a powerful prototype that can be evolved into a production-ready enterprise product with several future enhancements:

- **Deterministic Constraint Enhancements:**
  Currently, many traits map to categorical strings (e.g., `"low"`, `"medium"`, `"high"`). Future iterations should transition these characteristics into true exact variables for highly accurate edge-case resolution.
  - *Income/Budget:* Asking for exact or bracketed dollar amounts (e.g., $100/mo vs $300/mo) mapped directly against actual breed-specific veterinary costs instead of a `"high"` budget category.
  - *Square Footage:* Asking for exact living space in square feet/meters instead of relying on subjective terms like `"small"` or `"large"` home, matching these against exact breed spatial requirements.
- **Deep Historical Analytics Integration:**
  Improving the heuristic scoring weights by applying machine learning specifically trained on *historical outcomes* (e.g., analyzing patterns in adoption returns to identify factors most likely to cause adoption failure).
- **Extended External Data Sources:**
  Automating the enrichment of pet profiles using specialized veterinary and breed APIs to handle variables like inherited conditions, actual lifetime costs, and detailed local climate matching.
- **Shelter CRM Integrations:**
  Connecting directly with major shelter management systems (like Petfinder Pro or Shelterluv) to pull active, live pet inventory on a regular schedule.
