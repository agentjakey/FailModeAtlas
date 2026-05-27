# Failure Mode Atlas

An interactive visual essay mapping 24 AI failure modes across 6 conceptual families. Built as part of the Latent Space Lab series alongside CoT Faithfulness and Neural Polysemanticity.

## What it is

A single-page learning tool that covers how AI systems can fail in ways their designers did not intend. Each failure mode has a plain-language definition, an analogy, a safe example, and a reflection question. The interactive atlas shows conceptual relationships as a graph. Failure modes can be searched, filtered, and compared side by side.

This is an educational project. It is not a detector, benchmark, oracle, or compliance tool.

## Structure

```
src/
  types.ts                  Shared TypeScript interfaces
  data/
    failureModes.ts         22 failure modes with pre-computed atlas coordinates
    examples.ts             34 safe examples across all modes
    learningPaths.ts        5 curated reading sequences
    relationships.ts        31 directed edges between failure modes
  styles/tokens.ts          Design tokens (colors, labels)

components/
  ui/                       Nav, Footer, Badge, CareNote, Typography, SectionWrapper
  sections/                 Hero + Sections 1-9
  visualizations/           AtlasMap, ConceptCard, FailureModeCards, CompareConcepts, LearningPaths

scripts/
  validate-data.ts          Integrity checks on all static data

app/
  layout.tsx                Fonts, Nav, ReadingProgress, metadata
  page.tsx                  All sections assembled
  globals.css               CSS variables, family colors, audience track styles
```

## Local setup

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Data validation

```bash
npm run validate:data
```

Checks: no duplicate IDs, all cross-references resolve, relationship strength in [1,5], no learning path step references a missing mode.

## Deploy to Vercel

```bash
npm run build        # verify the build is clean first
npm i -g vercel      # install Vercel CLI if needed
vercel               # preview deploy
vercel --prod        # production deploy
```

## Failure mode families

| Family | Color | Focus |
|---|---|---|
| Objective Failures | #4E8098 | Reward signals and specification problems |
| Oversight Failures | #9B7EBD | Deceptive or sandbagging behavior under evaluation |
| Deployment Failures | #C47C5A | Distribution shift, prompt injection, tool misuse |
| Interaction Failures | #D4A853 | Sycophancy, automation bias, hallucination |
| Representation Failures | #6B8A6B | Polysemanticity, goal misgeneralization |
| Governance and Dual Use | #7B4B44 | Dual-use risks and monitoring gaps |

## Safety policy

All examples are fictional and harmless. No real jailbreak prompts, exploit chains, biosecurity content, fraud guidance, or manipulation techniques. Every sensitive failure mode (prompt injection, data poisoning) is illustrated with a toy scenario rather than a realistic attack.

This project is not affiliated with any AI lab or standards body. The taxonomy is editorial, not official. If you find an error, open an issue.

## Limitations

- The taxonomy is not exhaustive. Agentic failure modes are underrepresented.
- Family assignments are sometimes ambiguous.
- The atlas layout is a teaching aid, not an embedding. Node distance does not encode semantic similarity.
- Difficulty ratings are estimates.
- This has not been peer-reviewed.

## Author

Jacob Ortiz -- https://github.com/agentjakey

Part of a broader effort to learn AI safety in public. Errors are mine. Corrections welcome.

Last updated: May 2026. MIT License.
