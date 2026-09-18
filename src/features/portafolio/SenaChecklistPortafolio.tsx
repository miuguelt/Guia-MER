import { motion } from 'framer-motion'
import type { SenaChecklistPortafolioProps } from './types'
import {
  exportDossierJson,
  exportDossierMarkdown,
  copyDossierSummary,
} from './utils/dossierExport'
import { evaluatePortfolioEvidences } from './utils/portfolioEvidences'
import ApprenticeForm from './components/ApprenticeForm'
import SignaturePad from './components/SignaturePad'
import ExportBar from './components/ExportBar'
import PrintableEvidenceSheet from './components/PrintableEvidenceSheet'
import ApprenticeInteractiveChecklist from './components/ApprenticeInteractiveChecklist'

export default function SenaChecklistPortafolio({
  progressState,
  onUpdateProfile,
  onUpdateProjectState,
  onUpdateSignature,
  onNavigate,
  onToast,
}: SenaChecklistPortafolioProps) {
  const profile = progressState.apprenticeProfile
  const evidences = evaluatePortfolioEvidences(progressState)

  const completedCount = evidences.filter((e) => e.isCompleted).length
  const totalEvidences = evidences.length
  const progressPercent = Math.round((completedCount / totalEvidences) * 100)
  const defenseReady = progressState.projectState.defense.trim().length >= 80
  const isFullyApproved = completedCount === totalEvidences && defenseReady
  const currentSignature = profile.signature

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadJson = () => {
    exportDossierJson({
      profile,
      progressState,
      evidences,
      completedCount,
      totalEvidences,
      progressPercent,
      isFullyApproved,
      onToast,
    })
  }

  const handleDownloadMarkdown = () => {
    exportDossierMarkdown({
      profile,
      progressState,
      evidences,
      isFullyApproved,
      progressPercent,
      defenseReady,
      currentSignature,
      onToast,
    })
  }

  const handleCopySummary = () => {
    copyDossierSummary({
      profile,
      completedCount,
      totalEvidences,
      progressPercent,
      isFullyApproved,
      currentSignature,
      onToast,
    })
  }

  return (
    <motion.div
      className="page-shell sena-portafolio-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 1. SECCIÓN NO IMPRIMIBLE: PANEL DE CONTROL Y FORMULARIO */}
      <div className="no-print">
        <div className="panel-card sena-control-hero">
          <div className="sena-control-header">
            <div className="sena-badge-title">
              <span className="sena-shield-tag">SENA SIGA</span>
              <h2>Portafolio de Evidencias & Lista de Chequeo Institucional</h2>
            </div>
            <div className="sena-progress-meter">
              <span className="meter-label">
                Progreso Real: <strong>{progressPercent}%</strong> ({completedCount} de {totalEvidences} evidencias)
              </span>
              <div className="meter-track">
                <div className="meter-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
          <p className="sena-control-desc">
            Este módulo consolida de manera fidedigna tu recorrido formativo, evalúa tus entregables técnicos contra
            los criterios declarados y produce el documento oficial estandarizado listo para firmar e incorporar a la
            plataforma educativa institucional.
          </p>
        </div>

        {/* LISTA DE CHEQUEO INTERACTIVA PARA EL APRENDIZ */}
        <ApprenticeInteractiveChecklist
          evidences={evidences}
          progressPercent={progressPercent}
          completedCount={completedCount}
          totalEvidences={totalEvidences}
          onNavigate={onNavigate}
        />

        <ApprenticeForm
          profile={profile}
          projectDefense={progressState.projectState.defense}
          defenseReady={defenseReady}
          onUpdateProfile={onUpdateProfile}
          onUpdateProjectDefense={(defense) => onUpdateProjectState({ defense })}
        >
          <SignaturePad
            currentSignature={currentSignature}
            onUpdateSignature={onUpdateSignature}
            onToast={onToast}
          />
          <ExportBar
            onPrint={handlePrint}
            onDownloadJson={handleDownloadJson}
            onDownloadMarkdown={handleDownloadMarkdown}
            onCopySummary={handleCopySummary}
          />
        </ApprenticeForm>
      </div>

      {/* 2. HOJA BLANCA OFICIAL SENA SIGA (IMPRIMIBLE) */}
      <PrintableEvidenceSheet
        profile={profile}
        evidences={evidences}
        isFullyApproved={isFullyApproved}
        progressPercent={progressPercent}
        defenseReady={defenseReady}
        projectDefense={progressState.projectState.defense}
        onNavigate={onNavigate}
      />
    </motion.div>
  )
}
