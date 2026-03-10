# Phase 7 – Compatibility Dashboard API

With the matching engine and explanation service in place, this phase
added a counselor‑friendly dashboard endpoint that explains _why_ a
match works and _how_ to act on the information.

## New functionality

1. **Score breakdown**
   - Added `compute_score_breakdown(adopter, pet)` to
     `src/scoring.py`. This returns each of the eight component scores
     (lifestyle, environment, financial, etc.) so callers can display a
     detailed breakdown.

2. **Dashboard generator module**
   - Created `src/dashboard.py`.
   - `generate_match_dashboard(adopter, pet)` computes the overall score
     and breakdown, then calls `generate_match_reasoning()` to obtain the
     LLM‑produced `explanation`, `risks`, and `advice`.
   - The returned dictionary contains exactly the fields needed for
     rendering a compatibility report:
     ```json
     {
       "pet_name": "Luna",
       "score": 88,
       "breakdown": { ... },
       "explanation": "...",
       "risks": [...],
       "advice": [...]
     }
     ```

3. **API extension**
   - Updated `src/api/matching_routes.py` to import the dashboard function
     and register a new POST endpoint `/matching/explain`.
   - The endpoint expects `{"pet_id": "<id>", "adopter_profile": {...}}`
     in the request body, looks up the pet by ID in the preloaded dataset,
     and returns the dashboard object.

4. **Testing**
   - Added `test_explain.py` script for manual invocation.
   - Verified a real pet record (ID `86e1089a3`) returns a complete
     dashboard including sensible `breakdown` values and an LLM
     explanation.

5. **Documentation**
   - This file highlights the new API and describes the example request
     and response structures.

## Why it matters

The dashboard transforms a raw numerical score into an interpretable
product: shelters and counselors can now see a breakdown of matching
criteria, understand potential concerns, and act on AI‑generated advice.
It turns the system from a black‑box matching algorithm into a
decision‑support tool.

## Related documentation

- `phase6_api_and_reasoning.md` – previous phase describing the base API
  and reasoning integration.
- `phase4_llm_based_reasoning.md` – for details on how the explanation
  text is generated.

With Phase 7 complete, the project is suitable for pilot deployment and
user testing with real adoption counselors.
