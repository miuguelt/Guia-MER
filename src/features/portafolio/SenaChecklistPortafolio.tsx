import { motion } from 'framer-motion'
import type { SenaChecklistPortafolioProps, EvidenceItem } from './types'
import {
  exportDossierJson,
  exportDossierMarkdown,
  copyDossierSummary,
} from './utils/dossierExport'
import ApprenticeForm from './components/ApprenticeForm'
import SignaturePad from './components/SignaturePad'
import ExportBar from './components/ExportBar'
import PrintableEvidenceSheet from './components/PrintableEvidenceSheet'

export default function SenaChecklistPortafolio({
  progressState,
  onUpdateProfile,
  onUpdateProjectState,
  onUpdateSignature,
  onNavigate,
  onToast,
}: SenaChecklistPortafolioProps) {
  const profile = progressState.apprenticeProfile

  // 1. Evaluación dinámica del progreso real del aprendiz en Guia MER
  const isEv01Done =
    progressState.projectState.requirements.some(
      (requirement) =>
        requirement.text.trim().length >= 25 &&
        requirement.entity.trim() &&
        requirement.relation.trim() &&
        requirement.test.trim()
    ) || progressState.completed.includes('m5')
  const isEv02Done =
    progressState.projectState.relations.length > 0 ||
    progressState.completed.includes('m3') ||
    progressState.completed.includes('m5')
  const isEv03Done = progressState.dictionary.length >= 3 || progressState.completed.includes('m4')
  const isEv04Done =
    progressState.projectState.decisions.some(
      (decision) => decision.id === 'AI-LOG' && decision.status !== 'pending'
    ) ||
    Boolean(progressState.aiLog.prompt.trim() && progressState.aiLog.assumptions.trim()) ||
    progressState.completed.includes('m6')
  const isEv05Done = progressState.completed.includes('m7')
  const isEv06Done = progressState.completed.includes('case')

  const evidences: EvidenceItem[] = [
    {
      id: 'requirements-check',
      code: 'MER-EV01',
      name: 'Autochequeo y Especificación de Requisitos del Sistema',
      phase: 'Transferencia',
      type: 'conocimiento',
      instrument: 'Lista de Chequeo y Preguntas Socráticas',
      criterion: 'El texto tiene contexto suficiente, al menos dos entidades candidatas y un hecho transaccional relacionable.',
      stationModule: 'm5',
      isCompleted: isEv01Done,
      detail: isEv01Done
        ? `Requisito registrado: "${progressState.projectText.slice(0, 70)}..."`
        : 'Pendiente de redactar y verificar el requisito del proyecto propio.',
      diagnosticObs: isEv01Done
        ? 'Cumple con contexto del negocio y entidades candidatas extraídas mediante análisis morfosintáctico.'
        : 'Se requiere redactar los requisitos del sistema en el laboratorio de proyecto.',
    },
    {
      id: 'mermaid-erd',
      code: 'MER-EV02',
      name: 'Diagrama Conceptual Entidad-Relación (Mermaid ERD)',
      phase: 'Apropiación',
      type: 'desempeño',
      instrument: 'Rúbrica de Notación y Transformación ERD',
      criterion: 'El modelo utiliza sintaxis erDiagram, cardinalidades (min, max) bidireccionales y tabla puente en relaciones N:M.',
      stationModule: 'm5',
      isCompleted: isEv02Done,
      detail: isEv02Done
        ? 'Diagrama ERD Mermaid generado y cardinalidades comprobadas en el laboratorio.'
        : 'Pendiente generar o exportar el diagrama conceptual Mermaid ERD en la estación 05.',
      diagnosticObs: isEv02Done
        ? 'Modelo conceptual consistente con operadores estándar y resolución formal de cardinalidades.'
        : 'Pendiente de verificar el trazado de relaciones y resolución de cardinalidad.',
    },
    {
      id: 'data-dictionary',
      code: 'MER-EV03',
      name: 'Diccionario de Datos Físico y Restricciones de Integridad',
      phase: 'Apropiación',
      type: 'producto',
      instrument: 'Lista de Chequeo Técnica de Modelo Físico',
      criterion: 'Cada campo tiene tipo SQL nativo, nulabilidad (NOT NULL), clave (PK/FK/UQ) y política de integridad referencial.',
      stationModule: 'm4',
      isCompleted: isEv03Done,
      detail: isEv03Done
        ? `${progressState.dictionary.length} campos tipificados con constraints y políticas ON DELETE.`
        : 'Pendiente estructurar las columnas y restricciones del diccionario relacional.',
      diagnosticObs: isEv03Done
        ? 'Esquema relacional blindado con tipificación estricta, restricciones de unicidad y llaves foráneas.'
        : 'Pendiente definir tipos de datos SQL y restricciones de integridad.',
    },
    {
      id: 'ai-method',
      code: 'MER-EV04',
      name: 'Auditoría y Bitácora de Modelado Asistido por IA (Protocolo V.E.R.A.)',
      phase: 'Apropiación',
      type: 'conocimiento',
      instrument: 'Ejercicio Formativo de Auditoría Humano-IA',
      criterion: 'Distingue propuesta generativa de IA, verificación rigurosa, supuestos críticos y decisión técnica humana.',
      stationModule: 'm6',
      isCompleted: isEv04Done,
      detail: isEv04Done
        ? 'Bitácora registrada con instrucción, contexto, supuestos identificados y correcciones aplicadas.'
        : 'Pendiente registrar el ciclo de encargo, verificación y decisiones tomadas con la IA.',
      diagnosticObs: isEv04Done
        ? 'Aplica el protocolo de auditoría; documenta supuestos sin aceptar alucinaciones del modelo generativo.'
        : 'Pendiente documentar la bitácora de interacción con la Gema de modelado.',
    },
    {
      id: 'missing-topics',
      code: 'MER-EV05',
      name: 'Plan de Cierre Profesional: Normalización, Seguridad y Evolución',
      phase: 'Transferencia',
      type: 'producto',
      instrument: 'Lista de Chequeo de Cierre Profesional',
      criterion: 'El diseño contempla 1FN-3FN, protección de datos (PII), suites de pruebas e historial de migraciones.',
      stationModule: 'm7',
      isCompleted: isEv05Done,
      detail: isEv05Done
        ? 'Las 5 dimensiones operativas y de normalización fueron auditadas y confirmadas.'
        : 'Pendiente completar la revisión de las dimensiones de normalización y seguridad.',
      diagnosticObs: isEv05Done
        ? 'El diseño integra normalización estricta, seguridad por diseño y previsión de cambios de esquema.'
        : 'Pendiente completar la revisión de las dimensiones en la estación 07.',
    },
    {
      id: 'guided-case-package',
      code: 'MER-EV06',
      name: 'Caso Integrador: Expediente de Análisis y MER Defendible',
      phase: 'Transferencia',
      type: 'producto',
      instrument: 'Ejercicio Guiado y Defensa Técnica',
      criterion: 'Traza entrevistas, encuesta y documentos hasta requisitos, entidades, cardinalidades, tablas asociativas y un MER verificable.',
      stationModule: 'case',
      isCompleted: isEv06Done,
      detail: isEv06Done
        ? 'Caso Taller Ruta 7 completado con expediente documental, solución orientativa y paquete descargable para usar sin conexión.'
        : 'Pendiente completar el caso integrador de la estación 08.',
      diagnosticObs: isEv06Done
        ? 'El aprendiz conectó evidencia de levantamiento con decisiones de modelado y dejó visibles los supuestos por validar.'
        : 'Se requiere recorrer el ejercicio guiado desde la evidencia hasta la construcción del MER.',
    },
  ]

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
