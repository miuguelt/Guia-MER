import { useEffect, useState } from 'react'
import type { ModuleKey } from '../data/course'
import type { AiLogDraft } from '../data/ai'

export interface DictionaryRow {
  table: string
  field: string
  type: string
  size: string
  nn: boolean
  constraint: string
  description: string
}

export interface ApprenticeProfile {
  name: string
  docNumber: string
  ficha: string
  centro: string
  regional: string
  instructor: string
  observations: string
  signature: string
  date: string
}

export type MasteryStatus = 'explored' | 'practiced' | 'mastered' | 'transferred'

export interface ProjectRequirement {
  id: string
  text: string
  entity: string
  relation: string
  test: string
  evidence: string[]
  status: 'open' | 'covered' | 'validated'
  source: 'learner' | 'case-study' | 'ai'
}

export interface ProjectDecision {
  id: string
  label: string
  value: string
  rationale: string
  status: 'proposed' | 'accepted' | 'corrected' | 'pending'
  source: 'learner' | 'ai' | 'instructor'
}

export interface ProjectCommit {
  id: string
  module: ModuleKey
  label: string
  evidence: string
  timestamp: string
}

export interface ProjectState {
  version: number
  title: string
  requirements: ProjectRequirement[]
  glossary: string[]
  entities: string[]
  relations: string[]
  attributes: string[]
  schema: string
  diagramCode: string
  sqlCode: string
  tests: string[]
  decisions: ProjectDecision[]
  commits: ProjectCommit[]
  defense: string
}

export interface SkillProgress {
  status: MasteryStatus
  attempts: number
  successes: number
  errors: string[]
  lastAttemptAt?: string
  nextReviewAt?: string
}

export interface AttemptRecord {
  id: string
  module: ModuleKey
  skillId: string
  score: number
  status: MasteryStatus
  errors: string[]
  timestamp: string
}

export interface AssessmentState {
  pretestAnswers: Record<string, string>
  posttestAnswers: Record<string, string>
  pretestScore?: number
  posttestScore?: number
  pretestCompletedAt?: string
  posttestCompletedAt?: string
}

export interface ProgressState {
  completed: ModuleKey[]
  current: ModuleKey
  theme: 'dark' | 'light'
  projectText: string
  dictionary: DictionaryRow[]
  aiLog: AiLogDraft
  apprenticeProfile: ApprenticeProfile
  projectState: ProjectState
  skillProgress: Record<string, SkillProgress>
  attempts: AttemptRecord[]
  assessment: AssessmentState
}

const STORAGE_KEY = 'datagenesis-progress-v1'
const initialProjectText = 'Un taller mecánico necesita registrar clientes, vehículos, órdenes de servicio y repuestos.'

const initialProfile: ApprenticeProfile = {
  name: 'APRENDIZ ADSO',
  docNumber: '',
  ficha: '228118-ADSO',
  centro: 'Centro de Biotecnología Agropecuaria / CSF',
  regional: 'Regional Distrito Capital',
  instructor: 'INSTRUCTOR TÉCNICO SENA',
  observations: 'El aprendiz completó la ruta de modelado conceptual, formulación de cardinalidades, normalización relacional, diccionario técnico de datos y bitácora de interacción asistida con IA.',
  signature: '',
  date: new Date().toLocaleDateString('es-CO'),
}

const initialState: ProgressState = {
  completed: [], current: 'home', theme: 'dark',
  projectText: initialProjectText,
  dictionary: [],
  aiLog: { prompt: '', context: '', assumptions: '', corrections: '', tests: '' },
  apprenticeProfile: initialProfile,
  projectState: {
    version: 1,
    title: 'Proyecto MER · Taller mecánico',
    requirements: [{ id: 'REQ-01', text: initialProjectText, entity: '', relation: '', test: '', evidence: [], status: 'open', source: 'learner' }],
    glossary: [], entities: [], relations: [], attributes: [], schema: '', diagramCode: '', sqlCode: '', tests: [], decisions: [], commits: [], defense: '',
  },
  skillProgress: {},
  attempts: [],
  assessment: { pretestAnswers: {}, posttestAnswers: {} },
}

function readState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    const savedProjectText = typeof parsed.projectText === 'string' ? parsed.projectText : initialProjectText
    return {
      ...initialState,
      ...parsed,
      projectText: savedProjectText,
      projectState: {
        ...initialState.projectState,
        ...(parsed.projectState || {}),
        requirements: (parsed.projectState?.requirements || [{ ...initialState.projectState.requirements[0], text: savedProjectText }]).map((requirement: ProjectRequirement) => ({
          ...initialState.projectState.requirements[0],
          ...requirement,
          entity: requirement.entity || '',
          relation: requirement.relation || '',
          test: requirement.test || '',
        })),
        glossary: parsed.projectState?.glossary || [],
        entities: parsed.projectState?.entities || [],
        relations: parsed.projectState?.relations || [],
        attributes: parsed.projectState?.attributes || [],
        diagramCode: parsed.projectState?.diagramCode || '',
        sqlCode: parsed.projectState?.sqlCode || '',
        tests: parsed.projectState?.tests || [],
        decisions: parsed.projectState?.decisions || [],
        commits: parsed.projectState?.commits || [],
        defense: parsed.projectState?.defense || '',
      },
      skillProgress: parsed.skillProgress || {},
      attempts: parsed.attempts || [],
      assessment: {
        ...initialState.assessment,
        ...(parsed.assessment || {}),
        pretestAnswers: parsed.assessment?.pretestAnswers || {},
        posttestAnswers: parsed.assessment?.posttestAnswers || {},
      },
      apprenticeProfile: {
        ...initialProfile,
        ...(parsed.apprenticeProfile || {}),
        signature: parsed.apprenticeProfile?.signature || localStorage.getItem('sena_apprentice_signature') || '',
      },
    }
  } catch {
    return initialState
  }
}

export function useLocalProgress() {
  const [state, setState] = useState<ProgressState>(readState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    if (state.apprenticeProfile.signature) {
      localStorage.setItem('sena_apprentice_signature', state.apprenticeProfile.signature)
    }
    document.documentElement.dataset.theme = state.theme
  }, [state])

  const setCurrent = (current: ModuleKey) => setState((previous) => ({ ...previous, current }))
  const completeModule = (module: ModuleKey) => setState((previous) => ({
    ...previous, completed: previous.completed.includes(module) ? previous.completed : [...previous.completed, module],
  }))
  const setTheme = (theme: ProgressState['theme']) => setState((previous) => ({ ...previous, theme }))
  const setProjectText = (projectText: string) => setState((previous) => ({
    ...previous,
    projectText,
      projectState: {
      ...previous.projectState,
      requirements: [{
        ...(previous.projectState.requirements[0] || { id: 'REQ-01', entity: '', relation: '', test: '', evidence: [], status: 'open', source: 'learner' as const }),
        text: projectText,
        status: 'open',
      }],
    },
  }))
  const setDictionary = (dictionary: DictionaryRow[]) => setState((previous) => ({
    ...previous,
    dictionary,
    projectState: {
      ...previous.projectState,
      schema: dictionary.map((row) => `${row.table}.${row.field}`).join('\n'),
      attributes: Array.from(new Set([...previous.projectState.attributes, ...dictionary.map((row) => `${row.table}.${row.field}`)])),
    },
  }))
  const setAiLog = (aiLog: AiLogDraft) => setState((previous) => {
    const nonAiDecisions = previous.projectState.decisions.filter((decision) => decision.id !== 'AI-LOG')
    const aiDecision: ProjectDecision[] = aiLog.prompt.trim() ? [{
      id: 'AI-LOG',
      label: 'Uso de IA en el modelado',
      value: aiLog.assumptions.trim() || 'Propuesta pendiente de validar',
      rationale: aiLog.corrections.trim() || 'Registrar una corrección o una prueba humana.',
      status: aiLog.corrections.trim() ? 'corrected' : 'pending',
      source: 'ai',
    }] : []
    return {
      ...previous,
      aiLog,
      projectState: { ...previous.projectState, decisions: [...nonAiDecisions, ...aiDecision] },
    }
  })
  const updateProjectState = (patch: Partial<ProjectState>) => setState((previous) => ({
    ...previous,
    projectState: { ...previous.projectState, ...patch },
  }))
  const commitProjectEvidence = (commit: Omit<ProjectCommit, 'id' | 'timestamp'>) => setState((previous) => {
    const entry: ProjectCommit = { ...commit, id: `commit-${Date.now()}`, timestamp: new Date().toISOString() }
    return {
      ...previous,
      projectState: {
        ...previous.projectState,
        commits: [...previous.projectState.commits.filter((item) => item.module !== commit.module), entry],
      },
    }
  })
  const recordAttempt = (attempt: Omit<AttemptRecord, 'id' | 'timestamp'>) => setState((previous) => {
    const timestamp = new Date().toISOString()
    const id = `attempt-${Date.now()}`
    const current = previous.skillProgress[attempt.skillId] || { status: 'explored' as MasteryStatus, attempts: 0, successes: 0, errors: [] }
    const masteryRank: Record<MasteryStatus, number> = { explored: 0, practiced: 1, mastered: 2, transferred: 3 }
    const nextSkill: SkillProgress = {
      ...current,
      status: masteryRank[attempt.status] >= masteryRank[current.status] ? attempt.status : current.status,
      attempts: current.attempts + 1,
      successes: current.successes + (attempt.score >= 0.8 ? 1 : 0),
      errors: Array.from(new Set([...current.errors, ...attempt.errors])).slice(-8),
      lastAttemptAt: timestamp,
    }
    return {
      ...previous,
      attempts: [...previous.attempts, { ...attempt, id, timestamp }].slice(-100),
      skillProgress: { ...previous.skillProgress, [attempt.skillId]: nextSkill },
    }
  })
  const setAssessment = (patch: Partial<AssessmentState>) => setState((previous) => ({
    ...previous,
    assessment: { ...previous.assessment, ...patch },
  }))
  const setApprenticeProfile = (profile: Partial<ApprenticeProfile>) => setState((previous) => ({
    ...previous,
    apprenticeProfile: { ...previous.apprenticeProfile, ...profile },
  }))
  const setSignature = (signature: string) => {
    if (signature) {
      localStorage.setItem('sena_apprentice_signature', signature)
    } else {
      localStorage.removeItem('sena_apprentice_signature')
    }
    setState((previous) => ({
      ...previous,
      apprenticeProfile: { ...previous.apprenticeProfile, signature },
    }))
  }

  return {
    state,
    setCurrent,
    completeModule,
    setTheme,
    setProjectText,
    setDictionary,
    setAiLog,
    updateProjectState,
    commitProjectEvidence,
    recordAttempt,
    setAssessment,
    setApprenticeProfile,
    setSignature,
  }
}
