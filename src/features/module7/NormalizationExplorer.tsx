import NormalizationMasterclass from '../normalization/NormalizationMasterclass'
import type { AttemptRecord } from '../../hooks/useLocalProgress'

interface NormalizationExplorerProps {
  onRecordAttempt?: (attempt: Omit<AttemptRecord, 'id' | 'timestamp'>) => void
  onCompleteMasterclass?: () => void
}

export default function NormalizationExplorer({
  onRecordAttempt,
  onCompleteMasterclass,
}: NormalizationExplorerProps = {}) {
  return (
    <NormalizationMasterclass
      onRecordAttempt={onRecordAttempt}
      onCompleteMasterclass={onCompleteMasterclass}
    />
  )
}

