# Phase 6 – API & AI Reasoning

In this phase the project graduated from a local scoring library into a
networked service with natural‑language explanations. The main goals were:

1. expose the matching algorithm via a REST API
2. integrate Google Gemini to provide human‑readable reasoning for each
   match

## Modules added / modified

- **`src/matcher.py`** – the core loop that filters pets by constraints
  and ranks them using `scoring.compute_score`. Returns a list of
  matches sorted by score.

- **`src/scoring.py`** – unchanged from Phase 3 except for internal
  refactors; still computes component scores and a weighted total.

- **`src/llm_reasoning.py`** – new file wrapping `google.generativeai`.
  The module reads the API key from a `.env` file (supports
  `GEMINI_API_KEY`/`GOOGLE_API_KEY`), configures the client, and exposes
  `generate_match_reasoning(adopter, pet, score)` which returns a JSON
  object with `explanation`, `risks`, and `advice`.

  > ⚠️ Note: the package is deprecated and will eventually be replaced by
  > `google.genai`. A future migration is recommended.

- **`src/api/matching_routes.py`** – FastAPI router providing
  `/matching/match`. Accepts an adopter profile and returns the list of
  top matches, including reasoning information obtained from the LLM.

- **`src/api/questionnaire_routes.py`**, **`src/questionnaire/...`** –
  support for an adaptive questionnaire that makes further use of the
  LLM client; this code was added here but conceptually belongs to Phase
   5.

- Environment handling
  - Added `python-dotenv` dependency and a `.env` file loader.
  - The LLM client configuration now checks both environment variables
    and throws a runtime error if neither key is present.

## Results

- Running `uvicorn src.api.main:app --reload` starts a healthy
  FastAPI server.
- POSTing to `/matching/match` with an adopter profile returns JSON like
  `{"name": "Luna", "score": 88, "explanation": "...", …}`.
- The repo is now a workable backend service ready for integration with a
  front‑end or mobile app.

## References

The earlier phases remain relevant:

- `phase3_compatibility_scoring_matching.md` describes the base scoring
  logic.
- `phase4_llm_based_reasoning.md` explains the LLM interface which is
  reused here.

Phase 6 built the glue that turns those pieces into an API product.
