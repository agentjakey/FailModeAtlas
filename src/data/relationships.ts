import type { Relationship } from '@/src/types'

export const RELATIONSHIPS: Relationship[] = [
  // Objective failures cluster
  { source: 'reward_hacking', target: 'specification_gaming', reason: 'Both involve optimizing a proxy rather than the actual goal; reward hacking is the RL framing, specification gaming is the broader behavioral framing.', strength: 5 },
  { source: 'reward_hacking', target: 'overoptimization', reason: 'Overoptimization is the continuous version of reward hacking: pushing a reward signal past the point where it still tracks the intended objective.', strength: 4 },
  { source: 'reward_hacking', target: 'goodharts_law_ml', reason: 'Reward hacking is the mechanism through which Goodhart\'s Law operates in RL systems.', strength: 5 },
  { source: 'specification_gaming', target: 'goodharts_law_ml', reason: 'Specification gaming is a behavioral manifestation of Goodhart\'s Law: the specification became the target and ceased to be a good measure.', strength: 4 },
  { source: 'specification_gaming', target: 'goal_misgeneralization', reason: 'Specification gaming describes the training-time version; goal misgeneralization is when the learned behavior that seemed to satisfy the spec fails in new contexts.', strength: 3 },
  { source: 'overoptimization', target: 'sycophancy', reason: 'Sycophancy is a form of overoptimization where the reward model being optimized is the human approval signal.', strength: 4 },
  { source: 'corrigibility_failure', target: 'power_seeking', reason: 'Corrigibility failure and power-seeking share the same instrumental root: a system that cannot be corrected tends to acquire the ability to resist correction.', strength: 4 },
  { source: 'corrigibility_failure', target: 'deceptive_alignment', reason: 'Deceptive alignment can be seen as a form of corrigibility failure: the system resists correction by making evaluation unreliable.', strength: 3 },
  { source: 'power_seeking', target: 'instrumental_convergence', reason: 'Power-seeking is one of the central behaviors predicted by instrumental convergence theory.', strength: 5 },
  { source: 'instrumental_convergence', target: 'corrigibility_failure', reason: 'Resistance to shutdown and correction is one of the instrumentally convergent sub-goals.', strength: 4 },

  // Oversight failures cluster
  { source: 'deceptive_alignment', target: 'sandbagging', reason: 'Sandbagging is a specific case of deceptive alignment: a system that distinguishes evaluation contexts and underperforms strategically in those contexts.', strength: 4 },
  { source: 'deceptive_alignment', target: 'monitoring_gap', reason: 'Deceptive alignment can only persist if there is a monitoring gap: a region of behavior the evaluation cannot reach.', strength: 5 },
  { source: 'sandbagging', target: 'evaluation_gaming', reason: 'Sandbagging is evaluation gaming in reverse: gaming the evaluation by underperforming rather than overperforming.', strength: 4 },
  { source: 'evaluation_gaming', target: 'goodharts_law_ml', reason: 'Evaluation gaming is Goodhart\'s Law applied to benchmark performance: the benchmark became a target and ceased to be a reliable measure.', strength: 4 },
  { source: 'monitoring_gap', target: 'tool_use_failure', reason: 'Tool-using agents produce actions and intermediate steps that are often not logged or reviewed, widening the monitoring gap.', strength: 3 },

  // Deployment failures cluster
  { source: 'prompt_injection', target: 'multimodal_prompt_injection', reason: 'Multimodal prompt injection extends the same attack pattern from text to image, audio, and other modalities.', strength: 5 },
  { source: 'prompt_injection', target: 'tool_use_failure', reason: 'Injected prompts in agentic systems can cause tool use failures: the injected instruction triggers an unintended action with real-world effects.', strength: 4 },
  { source: 'data_poisoning', target: 'distribution_shift', reason: 'Poisoned data represents a form of deliberate distribution shift: the training distribution is shifted to include adversarial examples.', strength: 3 },
  { source: 'data_poisoning', target: 'evaluation_gaming', reason: 'Both involve the corruption of signals that are supposed to tell us something reliable about a system\'s behavior.', strength: 2 },

  // Interaction failures cluster
  { source: 'sycophancy', target: 'automation_bias', reason: 'Both involve failure modes where the relationship between user and AI system degrades output quality in ways that are hard to detect.', strength: 3 },
  { source: 'sycophancy', target: 'representation_overlap_mode', reason: 'Both involve a mismatch between surface appearance and underlying reliability. In sycophancy it is approval versus accuracy; in overlap it is proximity versus meaning.', strength: 2 },
  { source: 'automation_bias', target: 'monitoring_gap', reason: 'Automation bias reduces human attention, effectively widening the monitoring gap by reducing human oversight of AI outputs.', strength: 3 },

  // Representation failures cluster
  { source: 'representation_overlap_mode', target: 'distribution_shift', reason: 'Representation overlap is a property of the embedding space; distribution shift changes which region of that space the inputs occupy in deployment.', strength: 3 },
  { source: 'representation_overlap_mode', target: 'hallucination', reason: 'Hallucination can be thought of as a representation failure: the model\'s internal representation does not reliably correspond to factual states of the world.', strength: 2 },
  { source: 'distribution_shift', target: 'goal_misgeneralization', reason: 'Goal misgeneralization is the goal-directed version of distribution shift: the goal that was learned does not transfer to the new distribution.', strength: 4 },
  { source: 'hallucination', target: 'automation_bias', reason: 'Hallucination is most harmful when automation bias reduces the chance that the human reviewer catches the error.', strength: 3 },

  // Governance / dual-use
  { source: 'dual_use_ambiguity', target: 'representation_overlap_mode', reason: 'Dual-use ambiguity is in part a representational problem: content that serves legitimate and harmful purposes may be represented similarly in the embedding space.', strength: 2 },
  { source: 'dual_use_ambiguity', target: 'data_poisoning', reason: 'The same ambiguity that makes dual-use content hard to filter makes it a useful vector for data poisoning: poisoned examples can hide behind legitimate-seeming use cases.', strength: 2 },

  // Cross-cluster connections
  { source: 'goal_misgeneralization', target: 'deceptive_alignment', reason: 'A model with misgeneralized goals might exhibit behavior that looks like deceptive alignment: aligned in training, misaligned in deployment. The mechanisms differ.', strength: 3 },
  { source: 'overoptimization', target: 'evaluation_gaming', reason: 'Both involve a system optimizing something so effectively that the proxy breaks away from the underlying goal.', strength: 3 },
  { source: 'reward_hacking', target: 'corrigibility_failure', reason: 'A sufficiently capable reward hacker might hack the reward by preventing correction that would change the reward.', strength: 2 },
]

export function getNeighbors(modeId: string): string[] {
  const neighbors = new Set<string>()
  for (const rel of RELATIONSHIPS) {
    if (rel.source === modeId) neighbors.add(rel.target)
    if (rel.target === modeId) neighbors.add(rel.source)
  }
  return Array.from(neighbors)
}

export function getRelationshipBetween(
  sourceId: string,
  targetId: string
): Relationship | undefined {
  return RELATIONSHIPS.find(
    (r) =>
      (r.source === sourceId && r.target === targetId) ||
      (r.source === targetId && r.target === sourceId)
  )
}
