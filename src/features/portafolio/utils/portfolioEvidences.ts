import type { ProgressState } from '../../../hooks/useLocalProgress'
import type { EvidenceItem } from '../types'
import { EVIDENCE_CATALOG } from './evidenceCatalog'

export function evaluatePortfolioEvidences(progressState: ProgressState): EvidenceItem[] {
  // 1. Evaluación dinámica del progreso real del aprendiz en Guia MER
  const hasRequirements = progressState.projectState.requirements.some(
    (requirement) =>
      requirement.text.trim().length >= 25 &&
      Boolean(requirement.entity.trim()) &&
      Boolean(requirement.relation.trim()) &&
      Boolean(requirement.test.trim())
  )
  const isEv01Done =
    hasRequirements ||
    (progressState.projectText.trim().length >= 50 && progressState.projectState.entities.length >= 2) ||
    progressState.completed.includes('m5')

  const hasDiagram =
    progressState.projectState.relations.length > 0 ||
    progressState.projectState.diagramCode.includes('erDiagram')
  const isEv02Done =
    hasDiagram ||
    progressState.completed.includes('m2') ||
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

  const c1 = EVIDENCE_CATALOG['MER-EV01']
  const c2 = EVIDENCE_CATALOG['MER-EV02']
  const c3 = EVIDENCE_CATALOG['MER-EV03']
  const c4 = EVIDENCE_CATALOG['MER-EV04']
  const c5 = EVIDENCE_CATALOG['MER-EV05']
  const c6 = EVIDENCE_CATALOG['MER-EV06']

  return [
    {
      ...c1,
      isCompleted: isEv01Done,
      detail: isEv01Done
        ? `Requisito registrado: "${progressState.projectText.slice(0, 70)}..." (${progressState.projectState.entities.length} entidades detectadas)`
        : 'Pendiente de redactar y verificar el requisito del proyecto propio.',
      diagnosticObs: isEv01Done
        ? 'Cumple con contexto del negocio y entidades candidatas extraídas mediante análisis morfosintáctico.'
        : 'Se requiere redactar los requisitos del sistema en el laboratorio de proyecto.',
      indicators: [
        { ...c1.indicatorTemplates[0], pass: progressState.projectText.trim().length >= 50 || progressState.completed.includes('m5') },
        { ...c1.indicatorTemplates[1], pass: progressState.projectState.entities.length >= 2 || progressState.completed.includes('m1') || progressState.completed.includes('m5') },
        { ...c1.indicatorTemplates[2], pass: progressState.projectState.requirements.some((r) => Boolean(r.test.trim())) || progressState.completed.includes('m5') },
      ],
    },
    {
      ...c2,
      isCompleted: isEv02Done,
      detail: isEv02Done
        ? `Diagrama ERD estructurado con relaciones identificadas (${progressState.projectState.relations.length} relación/es registradas).`
        : 'Pendiente generar o exportar el diagrama conceptual Mermaid ERD en la estación 05.',
      diagnosticObs: isEv02Done
        ? 'Modelo conceptual consistente con operadores estándar y resolución formal de cardinalidades.'
        : 'Pendiente de verificar el trazado de relaciones y resolución de cardinalidad.',
      indicators: [
        { ...c2.indicatorTemplates[0], pass: progressState.projectState.diagramCode.includes('erDiagram') || progressState.completed.includes('m5') },
        { ...c2.indicatorTemplates[1], pass: progressState.projectState.relations.length > 0 || progressState.completed.includes('m2') || progressState.completed.includes('m5') },
        { ...c2.indicatorTemplates[2], pass: progressState.completed.includes('m3') || progressState.completed.includes('m5') || progressState.projectState.relations.some((r) => r.includes('N:M')) },
      ],
    },
    {
      ...c3,
      isCompleted: isEv03Done,
      detail: isEv03Done
        ? `${progressState.dictionary.length} campos tipificados con constraints y políticas ON DELETE.`
        : 'Pendiente estructurar las columnas y restricciones del diccionario relacional.',
      diagnosticObs: isEv03Done
        ? 'Esquema relacional blindado con tipificación estricta, restricciones de unicidad y llaves foráneas.'
        : 'Pendiente definir tipos de datos SQL y restricciones de integridad.',
      indicators: [
        { ...c3.indicatorTemplates[0], pass: progressState.dictionary.some((d) => ['UUID', 'BIGINT', 'VARCHAR', 'DATE', 'NUMERIC'].includes(d.type)) || progressState.completed.includes('m4') },
        { ...c3.indicatorTemplates[1], pass: progressState.dictionary.some((d) => d.constraint.includes('PK') || d.constraint.includes('FK')) || progressState.completed.includes('m4') },
        { ...c3.indicatorTemplates[2], pass: progressState.dictionary.length >= 3 || progressState.completed.includes('m4') },
      ],
    },
    {
      ...c4,
      isCompleted: isEv04Done,
      detail: isEv04Done
        ? 'Bitácora registrada con instrucción, contexto, supuestos identificados y correcciones aplicadas.'
        : 'Pendiente registrar el ciclo de encargo, verificación y decisiones tomadas con la IA.',
      diagnosticObs: isEv04Done
        ? 'Aplica el protocolo de auditoría; documenta supuestos sin aceptar alucinaciones del modelo generativo.'
        : 'Pendiente documentar la bitácora de interacción con la Gema de modelado.',
      indicators: [
        { ...c4.indicatorTemplates[0], pass: Boolean(progressState.aiLog.prompt.trim()) || progressState.completed.includes('m6') },
        { ...c4.indicatorTemplates[1], pass: Boolean(progressState.aiLog.assumptions.trim()) || progressState.completed.includes('m6') },
        { ...c4.indicatorTemplates[2], pass: Boolean(progressState.aiLog.corrections.trim()) || progressState.completed.includes('m6') },
      ],
    },
    {
      ...c5,
      isCompleted: isEv05Done,
      detail: isEv05Done
        ? 'Las dimensiones operativas y de normalización formal fueron auditadas y confirmadas.'
        : 'Pendiente completar la revisión de las dimensiones de normalización y seguridad.',
      diagnosticObs: isEv05Done
        ? 'El diseño integra normalización estricta, seguridad por diseño y previsión de cambios de esquema.'
        : 'Pendiente completar la revisión de las dimensiones en la estación 07.',
      indicators: [
        { ...c5.indicatorTemplates[0], pass: progressState.completed.includes('m7') },
        { ...c5.indicatorTemplates[1], pass: progressState.completed.includes('m7') },
        { ...c5.indicatorTemplates[2], pass: progressState.completed.includes('m7') },
      ],
    },
    {
      ...c6,
      isCompleted: isEv06Done,
      detail: isEv06Done
        ? 'Caso Taller Ruta 7 completado con expediente documental, solución orientativa y paquete descargable para usar sin conexión.'
        : 'Pendiente completar el caso integrador de la estación 08.',
      diagnosticObs: isEv06Done
        ? 'El aprendiz conectó evidencia de levantamiento con decisiones de modelado y dejó visibles los supuestos por validar.'
        : 'Se requiere recorrer el ejercicio guiado desde la evidencia hasta la construcción del MER.',
      indicators: [
        { ...c6.indicatorTemplates[0], pass: progressState.completed.includes('case') },
        { ...c6.indicatorTemplates[1], pass: progressState.completed.includes('case') },
        { ...c6.indicatorTemplates[2], pass: progressState.completed.includes('case') },
      ],
    },
  ]
}
