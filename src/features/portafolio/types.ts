import type { ModuleKey } from '../../data/course'
import type { ProgressState, ApprenticeProfile, ProjectState } from '../../hooks/useLocalProgress'

export interface SenaChecklistPortafolioProps {
  progressState: ProgressState
  onUpdateProfile: (profile: Partial<ApprenticeProfile>) => void
  onUpdateProjectState: (patch: Partial<ProjectState>) => void
  onUpdateSignature: (sig: string) => void
  onNavigate: (module: ModuleKey) => void
  onToast: (msg: string) => void
}

export interface EvidenceItem {
  id: string
  code: string
  name: string
  phase: string
  type: 'conocimiento' | 'desempeño' | 'producto'
  instrument: string
  criterion: string
  stationModule: ModuleKey
  isCompleted: boolean
  detail: string
  diagnosticObs: string
}
