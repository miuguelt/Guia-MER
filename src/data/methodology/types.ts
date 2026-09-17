export interface MethodologyStep {
  id: number
  title: string
  shortTitle: string
  objective: string
  howTo: string[]
  pitfalls: string[]
  checklist: string[]
}

export interface CaseStudyEntity {
  name: string
  description: string
  isWeak?: boolean
  attributes: Array<{
    name: string
    type: string
    role: 'PK' | 'FK' | 'UQ' | 'ATTR' | 'DERIVED' | 'MULTIVALUED'
    description: string
  }>
}

export interface CaseStudyRelation {
  source: string
  target: string
  verb: string
  cardinality: '1:1' | '1:N' | 'N:M'
  leftMinMax: string
  rightMinMax: string
  explanation: string
  attributes?: string[]
}

export interface SystemCaseStudy {
  id: string
  title: string
  category: string
  narrative: string
  entities: CaseStudyEntity[]
  relations: CaseStudyRelation[]
  mermaid: string
  sqlSample: string
  externalUrl?: string
  externalUrlLabel?: string
  externalUrlBadge?: string
}
