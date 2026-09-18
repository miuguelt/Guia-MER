import type { AttemptRecord } from '../../../hooks/useLocalProgress'

export type MainTab = 'doc' | 'steps' | 'deps' | 'price' | 'challenge' | 'erd' | 'code' | 'quiz'
export type NormalFormStep = '0FN' | '1FN' | '2FN' | '3FN'
export type CodeFlavor = 'sql' | 'prisma' | 'jpa' | 'rest'
export type InvoiceHotspot = 'all' | 'header' | 'client' | 'items' | 'totals'

export interface NormalizationMasterclassProps {
  onRecordAttempt?: (attempt: Omit<AttemptRecord, 'id' | 'timestamp'>) => void
  onCompleteMasterclass?: () => void
}

export interface FunctionalDependency {
  attribute: string
  tableOrigin: string
  pkCandidate: string
  arrowNotation: string
  type: 'total' | 'partial' | 'transitive' | 'snapshot'
  label: string
  problem: string
  solution: string
}

export interface QuizItem {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}
