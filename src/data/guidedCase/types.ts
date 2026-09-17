export interface GuidedCaseSource {
  id: string
  type: string
  title: string
  summary: string
  evidence: string[]
}

export interface GuidedCaseRequirement {
  id: string
  priority: 'Alta' | 'Media'
  text: string
  source: string
  acceptance: string
}

export interface GuidedCaseStep {
  id: number
  phase: string
  title: string
  objective: string
  questions: string[]
  hint: string
  output: string[]
  expected: string
}
