import type { ApprenticeProfile, ProgressState } from '../../../hooks/useLocalProgress'
import { downloadText } from '../../../lib/exports'
import type { EvidenceItem } from '../types'

interface ExportJsonParams {
  profile: ApprenticeProfile
  progressState: ProgressState
  evidences: EvidenceItem[]
  completedCount: number
  totalEvidences: number
  progressPercent: number
  isFullyApproved: boolean
  onToast: (msg: string) => void
}

export function exportDossierJson({
  profile,
  progressState,
  evidences,
  completedCount,
  totalEvidences,
  progressPercent,
  isFullyApproved,
  onToast,
}: ExportJsonParams) {
  const payload = {
    standard: 'devbrain.educational-guide.sena-adso',
    version: '3.0',
    guideId: 'datagenesis-mer-2026',
    competency: '220501098 - Modelado de bases de datos relacionales con reglas de integridad',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO) · Código 228118',
    apprentice: {
      name: profile.name,
      docNumber: profile.docNumber,
      ficha: profile.ficha,
      centro: profile.centro,
      regional: profile.regional,
      instructor: profile.instructor,
    },
    evaluation: {
      timestamp: new Date().toISOString(),
      scorePercentage: progressPercent,
      completedArtifacts: completedCount,
      totalArtifacts: totalEvidences,
      judgment: isFullyApproved ? 'APROBADO' : 'EN_PROCESO',
      instructorObservations: profile.observations,
      hasDigitalSignature: Boolean(profile.signature),
    },
    evidences: evidences.map((e) => ({
      code: e.code,
      id: e.id,
      name: e.name,
      type: e.type,
      instrument: e.instrument,
      criterion: e.criterion,
      status: e.isCompleted ? 'CUMPLIDO' : 'PENDIENTE',
      diagnostic: e.diagnosticObs,
    })),
    projectBrief: progressState.projectText,
    dictionaryRowsCount: progressState.dictionary.length,
    aiLogSummary: progressState.aiLog,
    learningEvidence: {
      assessment: progressState.assessment,
      skillProgress: progressState.skillProgress,
      attempts: progressState.attempts,
      projectState: progressState.projectState,
    },
  }
  const filename = `portafolio_evidencias_sena_${profile.ficha || 'adso'}_${profile.docNumber || 'aprendiz'}.json`
  downloadText(filename, JSON.stringify(payload, null, 2), 'application/json')
  onToast('Archivo JSON de evidencia descargado con éxito')
}

interface ExportMarkdownParams {
  profile: ApprenticeProfile
  progressState: ProgressState
  evidences: EvidenceItem[]
  isFullyApproved: boolean
  progressPercent: number
  defenseReady: boolean
  currentSignature?: string
  onToast: (msg: string) => void
}

export function exportDossierMarkdown({
  profile,
  progressState,
  evidences,
  isFullyApproved,
  progressPercent,
  defenseReady,
  currentSignature,
  onToast,
}: ExportMarkdownParams) {
  const md = [
    '# SERVICIO NACIONAL DE APRENDIZAJE (SENA)',
    '## SISTEMA INTEGRADO DE GESTIÓN Y AUTOCONTROL (SIGA)',
    '### REGISTRO INTEGRAL DE EVIDENCIAS Y LISTA DE CHEQUEO — ADSO 228118',
    '',
    `**Guía de Aprendizaje:** DataGenesis · Modelado Entidad-Relación y Relacional`,
    `**Ficha:** ${profile.ficha} | **Fecha de Emisión:** ${profile.date}`,
    `**Estado Global:** ${isFullyApproved ? 'EVIDENCIA CONSOLIDADA (APROBADO)' : 'EN PROCESO'}`,
    '',
    '---',
    '',
    '### 1. Datos Generales del Aprendiz',
    `- **Nombre del Aprendiz:** ${profile.name}`,
    `- **Documento de Identidad:** C.C. ${profile.docNumber || 'Por diligenciar'}`,
    `- **Centro de Formación:** ${profile.centro}`,
    `- **Regional SENA:** ${profile.regional}`,
    `- **Instructor Técnico:** ${profile.instructor}`,
    `- **Competencia Laboral:** 220501098 - Modelar datos de acuerdo con requisitos y reglas de integridad`,
    '',
    '### 2.1 Expediente vivo y defensa técnica',
    `- **Commits de proyecto:** ${progressState.projectState.commits.length}`,
    `- **Entidades registradas:** ${progressState.projectState.entities.length}`,
    `- **Relaciones registradas:** ${progressState.projectState.relations.length}`,
    `- **Campos del esquema:** ${progressState.projectState.schema ? progressState.projectState.schema.split('\\n').filter(Boolean).length : 0}`,
    `- **Defensa técnica:** ${defenseReady ? 'REGISTRADA' : 'PENDIENTE'}`,
    `- **Texto de defensa:** ${progressState.projectState.defense || 'Por diligenciar'}`,
    '',
    '### 2. Registro Taxativo de Evidencias Técnicas Realizadas',
    '| Código | Denominación de la Evidencia | Instrumento de Evaluación | Resultado Real |',
    '|---|---|---|---|',
    ...evidences.map(
      (e) =>
        `| **${e.code}** | ${e.name} | ${e.instrument} | **${e.isCompleted ? 'CUMPLIDO' : 'PENDIENTE'}** |`
    ),
    '',
    '### 3. Lista de Chequeo y Criterios de Auto-revisión',
    '| Criterio Evaluado | Auto-revisión | Diagnóstico Técnico |',
    '|---|---|---|',
    ...evidences.map(
      (e) =>
        `| ${e.criterion} | **${e.isCompleted ? '[ X ] SÍ  [   ] NO' : '[   ] SÍ  [ X ] NO'}** | ${e.diagnosticObs} |`
    ),
    '',
    '### 4. Dictamen Formativo y Observaciones',
    `- **Resultado Orientativo:** ${isFullyApproved ? 'APROBADO (A)' : 'REQUIERE AJUSTES (EN PROCESO)'} (${progressPercent}% de avance)`,
    `- **Observaciones del Instructor:** ${profile.observations}`,
    '',
    '### 5. Declaración de Autenticidad y Firmas',
    'El aprendiz declara que los esquemas conceptuales, diccionarios de datos, restricciones y bitácoras de IA fueron formulados y comprobados personalmente de forma autónoma durante las prácticas de formación.',
    '',
    `- **Firma del Aprendiz:** ${profile.name} — C.C. ${profile.docNumber} (Aprendiz SENA ADSO) ${currentSignature ? '[Firma Digital Incorporada]' : '[Firma Manuscrita]' }`,
    `- **Firma del Instructor:** ${profile.instructor} — Instructor Técnico SENA`,
  ].join('\n')

  const filename = `registro_evidencias_sena_${profile.ficha || 'adso'}.md`
  downloadText(filename, md, 'text/markdown')
  onToast('Documento Markdown descargado con éxito')
}

interface CopySummaryParams {
  profile: ApprenticeProfile
  completedCount: number
  totalEvidences: number
  progressPercent: number
  isFullyApproved: boolean
  currentSignature?: string
  onToast: (msg: string) => void
}

export function copyDossierSummary({
  profile,
  completedCount,
  totalEvidences,
  progressPercent,
  isFullyApproved,
  currentSignature,
  onToast,
}: CopySummaryParams) {
  const summary = `PORTAFOLIO DE EVIDENCIAS SENA (ADSO 228118)
Guía: DataGenesis · Modelado MER y Relacional
Aprendiz: ${profile.name} (C.C. ${profile.docNumber || 'N/A'}) - Ficha: ${profile.ficha}
Avance Técnico: ${completedCount}/${totalEvidences} evidencias cumplidas (${progressPercent}%)
Dictamen Orientativo: ${isFullyApproved ? 'APROBADO' : 'REQUIERE AJUSTES'}
Firma: ${currentSignature ? 'Firma Digital Registrada' : 'Espacio para firma manual'}`

  navigator.clipboard.writeText(summary).then(() => {
    onToast('Resumen copiado al portapapeles')
  })
}
