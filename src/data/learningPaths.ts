import type { LearningPath } from '@/src/types'

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'objectives_gone_wrong',
    title: 'Objectives Gone Wrong',
    description:
      'How do AI systems fail to do what we actually want, even when training succeeds? This path traces the gap between specified objectives and intended goals.',
    orderedModeIds: [
      'goodharts_law_ml',
      'specification_gaming',
      'reward_hacking',
      'overoptimization',
      'goal_misgeneralization',
    ],
    estimatedTime: '~20 minutes',
    reflectionQuestion:
      'After this path: Can you state, in your own words, the difference between reward hacking and goal misgeneralization? How would you detect each from the outside?',
    whyItMatters:
      'Objective failures are foundational to understanding almost every other category of AI safety concern. Getting clear on what it means for a goal to be misspecified is a prerequisite for thinking about fixes.',
  },
  {
    id: 'when_helpfulness_fails',
    title: 'When Helpfulness Fails',
    description:
      'AI systems trained to be helpful can develop failure modes specific to that helpfulness goal. Sycophancy, automation bias, and representation overlap all emerge from the same dynamics.',
    orderedModeIds: [
      'sycophancy',
      'automation_bias',
      'representation_overlap_mode',
      'hallucination',
      'dual_use_ambiguity',
    ],
    estimatedTime: '~18 minutes',
    reflectionQuestion:
      'After this path: In what situation would you most want an AI to disagree with you? How would you tell the difference between useful disagreement and a model simply being wrong?',
    whyItMatters:
      'The failure modes associated with helpfulness are subtle. They look like the system working correctly right up until the moment they become a problem.',
  },
  {
    id: 'prompt_and_tool_risks',
    title: 'Prompt and Tool Use Risks',
    description:
      'As AI systems process external inputs and gain tool access, new failure surfaces emerge. This path covers the risks specific to agentic and multi-modal systems.',
    orderedModeIds: [
      'prompt_injection',
      'multimodal_prompt_injection',
      'tool_use_failure',
      'data_poisoning',
      'monitoring_gap',
    ],
    estimatedTime: '~22 minutes',
    reflectionQuestion:
      'After this path: For an AI system you interact with regularly, identify the external inputs it processes. Which of those could carry injected instructions? Which actions it takes are hardest to reverse?',
    whyItMatters:
      'Agentic AI systems can take real-world actions with real-world consequences. The failure modes specific to this capability require specific attention.',
  },
  {
    id: 'evaluation_not_safety',
    title: 'Evaluation Is Not Safety',
    description:
      'Good benchmark scores do not guarantee safe behavior. This path explores how evaluation can fail to tell us what we need to know.',
    orderedModeIds: [
      'evaluation_gaming',
      'distribution_shift',
      'sandbagging',
      'monitoring_gap',
      'deceptive_alignment',
    ],
    estimatedTime: '~25 minutes',
    reflectionQuestion:
      'After this path: What would it mean to have an evaluation that could not be gamed? What properties would it need? Is this achievable?',
    whyItMatters:
      'Evaluation is how we decide whether AI systems are ready for deployment. When evaluation fails, the consequences compound.',
  },
  {
    id: 'hard_boundaries',
    title: 'Hard Boundaries',
    description:
      'Some failure modes are especially concerning because they involve systems actively working against oversight. This path covers the concepts at the harder end of the alignment challenge.',
    orderedModeIds: [
      'instrumental_convergence',
      'power_seeking',
      'corrigibility_failure',
      'deceptive_alignment',
      'sandbagging',
    ],
    estimatedTime: '~30 minutes',
    reflectionQuestion:
      'After this path: These failure modes are theoretical concerns more than confirmed empirical findings in current systems. What evidence would you need to see to take them seriously? What evidence would be reassuring?',
    whyItMatters:
      'These failure modes are the core of what makes advanced AI alignment a research priority. Understanding the theoretical structure is a prerequisite for evaluating the actual risk.',
  },
]

export function getLearningPathById(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id)
}
