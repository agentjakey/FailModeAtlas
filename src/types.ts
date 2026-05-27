export type FailureModeFamily =
  | 'objective_failures'
  | 'oversight_failures'
  | 'deployment_failures'
  | 'interaction_failures'
  | 'representation_failures'
  | 'governance_dual_use'

export type Difficulty = 'foundational' | 'intermediate' | 'advanced' | 'open_problem'

export type ExampleStyle =
  | 'plain_language'
  | 'analogy'
  | 'toy_example'
  | 'policy_example'
  | 'technical_summary'
  | 'reflective'

export interface FailureMode {
  id: string
  displayName: string
  shortDefinition: string
  plainLanguageAnalogy: string
  whyItMatters: string
  safeExample: string
  nonExample: string
  beginnerTakeaway: string
  relatedModes: string[]
  family: FailureModeFamily
  difficulty: Difficulty
  reflectionQuestion: string
  recommendedReadingPlaceholder: string
  x: number
  y: number
}

export interface Example {
  id: string
  failureModeId: string
  title: string
  style: ExampleStyle
  content: string
  safeSummary: string
  whyItTeaches: string
  difficulty: Difficulty
  tags: string[]
}

export interface LearningPath {
  id: string
  title: string
  description: string
  orderedModeIds: string[]
  estimatedTime: string
  reflectionQuestion: string
  whyItMatters: string
}

export interface Relationship {
  source: string
  target: string
  reason: string
  strength: 1 | 2 | 3 | 4 | 5
}

export interface FamilyMeta {
  key: FailureModeFamily
  label: string
  description: string
  color: string
}
