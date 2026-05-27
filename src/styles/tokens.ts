export const FAMILY_COLORS: Record<string, string> = {
  objective_failures: '#4E8098',
  oversight_failures: '#9B7EBD',
  deployment_failures: '#C47C5A',
  interaction_failures: '#D4A853',
  representation_failures: '#6B8A6B',
  governance_dual_use: '#7B4B44',
}

export const DIFFICULTY_LABELS: Record<string, string> = {
  foundational: 'Foundational',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  open_problem: 'Open Problem',
}

export const DIFFICULTY_COLORS: Record<string, string> = {
  foundational: '#4E8098',
  intermediate: '#9B7EBD',
  advanced: '#C2411C',
  open_problem: '#1A1915',
}

export const FAMILY_LABELS: Record<string, string> = {
  objective_failures: 'Objective Failures',
  oversight_failures: 'Oversight Failures',
  deployment_failures: 'Deployment Failures',
  interaction_failures: 'Interaction Failures',
  representation_failures: 'Representation Failures',
  governance_dual_use: 'Governance & Dual-Use',
}

export const TOKEN = {
  background: '#FAFAF8',
  surface: '#FFFFFF',
  muted: '#F2F0EB',
  primary: '#1A1915',
  secondary: '#5C5A54',
  mutedText: '#8A8880',
  accent: '#C2411C',
  border: '#E4E2DB',
} as const
