import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clipboard,
  Download,
  ExternalLink,
  FileArchive,
  FileText,
  Flag,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Package,
  ShieldCheck,
  Sparkles,
  Table2,
  Users,
} from 'lucide-react'
import MermaidPreview from '../../components/MermaidPreview'
import {
  buildGuidedCasePackageFiles,
  buildGuidedCaseWorkbookMarkdown,
  guidedCaseActors,
  guidedCaseBrief,
  guidedCaseCandidateInventory,
  guidedCaseFunctionalRequirements,
  guidedCaseMermaid,
  guidedCaseNonFunctionalRequirements,
  guidedCaseOpenQuestions,
  guidedCaseRelations,
  guidedCaseScope,
  guidedCaseSources,
  guidedCaseSteps,
  guidedCaseSql,
  guidedCaseTitle,
} from '../../data/guidedCase'
import { downloadText } from '../../lib/exports'
import { downloadZip } from '../../lib/zip'

interface Props {
  onComplete: () => void
}

const packageFiles = buildGuidedCasePackageFiles()
const GUIDED_CASE_PROGRESS_KEY = 'datagenesis-guided-case-v1'

function readGuidedCaseProgress() {
  try {
    const raw = localStorage.getItem(GUIDED_CASE_PROGRESS_KEY)
    if (!raw) return { activeStep: 1, completedSteps: [] as number[] }
    const saved = JSON.parse(raw)
    return {
      activeStep: typeof saved.activeStep === 'number' && saved.activeStep >= 1 && saved.activeStep <= guidedCaseSteps.length ? saved.activeStep : 1,
      completedSteps: Array.isArray(saved.completedSteps) ? saved.completedSteps.filter((step: unknown): step is number => typeof step === 'number' && step >= 1 && step <= guidedCaseSteps.length) : [],
    }
  } catch {
    return { activeStep: 1, completedSteps: [] as number[] }
  }
}

function SourceIcon({ type }: { type: string }) {
  if (type.startsWith('Entrevista')) return <Users size={16} />
  if (type.startsWith('Encuesta')) return <Clipboard size={16} />
  if (type.startsWith('Documento')) return <FileText size={16} />
  return <BookOpen size={16} />
}

export default function GuidedCase({ onComplete }: Props) {
  const [activeStep, setActiveStep] = useState(() => readGuidedCaseProgress().activeStep)
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => readGuidedCaseProgress().completedSteps)
  const [revealedSteps, setRevealedSteps] = useState<number[]>([])
  const [sourceFilter, setSourceFilter] = useState('Todas')
  const [showExpectedModel, setShowExpectedModel] = useState(false)
  const [copied, setCopied] = useState('')

  const currentStep = guidedCaseSteps.find((step) => step.id === activeStep) ?? guidedCaseSteps[0]
  const isStepDone = completedSteps.includes(currentStep.id)
  const allStepsDone = completedSteps.length === guidedCaseSteps.length
  const visibleSources = useMemo(
    () => sourceFilter === 'Todas' ? guidedCaseSources : guidedCaseSources.filter((source) => source.type === sourceFilter),
    [sourceFilter],
  )
  const sourceTypes = ['Todas', ...Array.from(new Set(guidedCaseSources.map((source) => source.type)))]

  useEffect(() => {
    localStorage.setItem(GUIDED_CASE_PROGRESS_KEY, JSON.stringify({ activeStep, completedSteps }))
  }, [activeStep, completedSteps])

  const markStep = () => {
    setCompletedSteps((current) => current.includes(activeStep) ? current : [...current, activeStep])
    if (activeStep < guidedCaseSteps.length) setActiveStep(activeStep + 1)
  }

  const toggleExpected = (id: number) => {
    setRevealedSteps((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const resetGuidedCase = () => {
    setActiveStep(1)
    setCompletedSteps([])
    setRevealedSteps([])
    localStorage.removeItem(GUIDED_CASE_PROGRESS_KEY)
  }

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      window.setTimeout(() => setCopied(''), 1600)
    } catch {
      setCopied('Selecciona y copia el bloque')
    }
  }

  return (
    <motion.div className="page-shell module-page guided-case-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="module-hero split-hero guided-case-hero">
        <div>
          <span className="label-pill blue-pill"><Sparkles size={13} /> MÓDULO 08 · CASO INTEGRADOR</span>
          <h1>De la evidencia<br /><em>al MER defendible.</em></h1>
          <p>
            Trabaja con un expediente completo de levantamiento: contexto, alcance, entrevistas, encuesta, documentos, observación y requisitos. Avanza paso a paso hasta construir el modelo entidad-relación del Taller Ruta 7.
          </p>
          <div className="guided-case-hero-meta"><span><ShieldCheck size={14} /> Datos ficticios y trazables</span><span><Package size={14} /> 13 archivos descargables</span><span><ListChecks size={14} /> {guidedCaseSteps.length} pasos guiados</span></div>
        </div>
        <div className="lab-score guided-case-score">
          <div className="score-ring"><span>{completedSteps.length}</span><small>/{guidedCaseSteps.length}</small></div>
          <span>pasos registrados</span>
          <small>{allStepsDone ? 'Listo para defender el análisis' : 'Marca cada salida antes de avanzar'}</small>
          {completedSteps.length > 0 && <button className="guided-case-reset" type="button" onClick={resetGuidedCase}>Reiniciar ejercicio</button>}
        </div>
      </section>

      <section className="guided-case-download panel-card">
        <div className="guided-case-download-copy">
          <span className="eyebrow">Paquete de trabajo · sin conexión</span>
          <h2>Descarga la carpeta completa del caso</h2>
          <p>
            El ZIP contiene la base documental, requisitos funcionales y no funcionales, plantilla de respuestas, matriz de cardinalidades, resultado esperado, diagrama Mermaid y DDL SQL. Puedes trabajarlo sin conexión y entregar tus propias versiones al instructor.
          </p>
        </div>
        <div className="guided-case-download-actions">
          <button className="primary-button" type="button" onClick={() => downloadZip('caso-guiado-taller-ruta-7.zip', packageFiles)}><FileArchive size={16} /> Descargar paquete ZIP</button>
          <button className="soft-button" type="button" onClick={() => downloadText('cuaderno-caso-guiado-taller-ruta-7.md', buildGuidedCaseWorkbookMarkdown(), 'text/markdown')}><Download size={14} /> Solo cuaderno Markdown</button>
          <a href="https://gemini.google.com/share/c663a17632de?skid=563a1190-cad0-42ba-9c13-b04bcabea93e&hl=es_419" target="_blank" rel="noreferrer" className="soft-button"><Sparkles size={14} /> Caso interactivo en Gemini Canvas <ExternalLink size={14} /></a>
          <small>{Object.keys(packageFiles).length} archivos · sin enviar datos</small>
        </div>
      </section>

      <section className="guided-case-brief-grid">
        <article className="panel-card guided-case-brief-card">
          <div className="card-heading"><div><span className="eyebrow">Base del análisis</span><h2>{guidedCaseTitle}</h2></div><Flag size={19} className="accent-text" /></div>
          <p>{guidedCaseBrief}</p>
          <div className="guided-case-scope-grid">
            <div><span className="guided-case-kicker is-in">Sí entra</span>{guidedCaseScope.in.map((item) => <span key={item}><Check size={13} />{item}</span>)}</div>
            <div><span className="guided-case-kicker is-out">No entra todavía</span>{guidedCaseScope.out.map((item) => <span key={item}><ArrowRight size={13} />{item}</span>)}</div>
          </div>
        </article>
        <article className="panel-card guided-case-actors-card">
          <div className="card-heading"><div><span className="eyebrow">Quién interviene</span><h2>Actores y acciones</h2></div><Users size={19} className="muted-icon" /></div>
          <div className="guided-case-actors">{guidedCaseActors.map((actor) => <div key={actor.name}><span>{actor.name.slice(0, 2).toUpperCase()}</span><p><strong>{actor.name}</strong><small>{actor.action}</small></p></div>)}</div>
        </article>
      </section>

      <section className="guided-case-sources panel-card" aria-labelledby="guided-case-sources-title">
        <div className="card-heading">
          <div><span className="eyebrow">Expediente de levantamiento</span><h2 id="guided-case-sources-title">Lee la evidencia antes de decidir</h2><p className="card-desc">No empieces por las tablas. Primero identifica qué fue dicho, qué fue observado y qué todavía debe validarse.</p></div>
          <FileText size={20} className="accent-text" />
        </div>
        <div className="guided-case-filter-row" role="tablist" aria-label="Filtrar fuentes">
          {sourceTypes.map((type) => <button key={type} type="button" className={sourceFilter === type ? 'is-active' : ''} onClick={() => setSourceFilter(type)}>{type}</button>)}
        </div>
        <div className="guided-case-source-grid">
          {visibleSources.map((source) => <details className="guided-case-source" key={source.id} open={sourceFilter !== 'Todas'}>
            <summary><span className="guided-case-source-icon"><SourceIcon type={source.type} /></span><span><small>{source.type}</small><strong>{source.title}</strong></span><ChevronDown size={16} /></summary>
            <div><p>{source.summary}</p><ul>{source.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </details>)}
        </div>
      </section>

      <section className="guided-case-stepper panel-card" aria-labelledby="guided-case-stepper-title">
        <div className="card-heading">
          <div><span className="eyebrow">Ejercicio guiado · evidencia → decisión</span><h2 id="guided-case-stepper-title">Piensa como analista, paso a paso</h2><p className="card-desc">Responde primero en tu cuaderno o en el ZIP. Después abre la orientación y marca la salida que ya puedes defender.</p></div>
          <span className="route-counter">{completedSteps.length}/{guidedCaseSteps.length} salidas</span>
        </div>
        <div className="guided-case-step-layout">
          <nav className="guided-case-step-nav" aria-label="Pasos del caso">
            {guidedCaseSteps.map((step) => <button key={step.id} type="button" className={`${activeStep === step.id ? 'is-active' : ''} ${completedSteps.includes(step.id) ? 'is-done' : ''}`} onClick={() => setActiveStep(step.id)}><span>{completedSteps.includes(step.id) ? <Check size={13} /> : String(step.id).padStart(2, '0')}</span><strong>{step.title}</strong><small>{step.phase}</small></button>)}
          </nav>
          <article className="guided-case-current-step">
            <div className="guided-case-step-head"><span className="guided-case-step-number">{String(currentStep.id).padStart(2, '0')}</span><div><span className="eyebrow">{currentStep.phase}</span><h3>{currentStep.title}</h3></div>{isStepDone && <span className="guided-case-done"><Check size={13} /> salida registrada</span>}</div>
            <p className="guided-case-objective"><strong>Objetivo:</strong> {currentStep.objective}</p>
            <div className="guided-case-thinking"><div className="guided-case-section-label"><HelpCircle size={15} /> ¿Qué debes ir pensando?</div><ol>{currentStep.questions.map((question) => <li key={question}>{question}</li>)}</ol></div>
            <div className="guided-case-hint"><Lightbulb size={16} /><div><strong>Pista de análisis</strong><p>{currentStep.hint}</p></div></div>
            <div className="guided-case-output"><div className="guided-case-section-label"><Table2 size={15} /> Salida que debes producir</div><ul>{currentStep.output.map((item) => <li key={item}><Check size={13} />{item}</li>)}</ul></div>
            <button className="guided-case-reveal" type="button" onClick={() => toggleExpected(currentStep.id)} aria-expanded={revealedSteps.includes(currentStep.id)}><ChevronDown size={15} className={revealedSteps.includes(currentStep.id) ? 'rotated' : ''} /> {revealedSteps.includes(currentStep.id) ? 'Ocultar orientación esperada' : 'Ver orientación esperada para comparar'}</button>
            {revealedSteps.includes(currentStep.id) && <div className="guided-case-expected"><strong>Resultado orientativo del paso {currentStep.id}</strong><p>{currentStep.expected}</p></div>}
            <div className="guided-case-step-footer"><span>{isStepDone ? 'Puedes volver a este paso para revisar tu decisión.' : 'Marca la salida cuando puedas explicarla con evidencia.'}</span><button className="primary-button small-button" type="button" onClick={markStep}>{isStepDone ? 'Siguiente paso' : 'Marcar salida y avanzar'} <ArrowRight size={14} /></button></div>
          </article>
        </div>
      </section>

      <section className="guided-case-analysis-grid">
        <article className="panel-card guided-case-requirements-card">
          <div className="card-heading"><div><span className="eyebrow">Consolidación</span><h2>Lo que el análisis debe dejar escrito</h2></div><ListChecks size={19} className="accent-text" /></div>
          <div className="guided-case-requirement-summary"><div><strong>{guidedCaseFunctionalRequirements.length}</strong><span>requisitos funcionales</span></div><div><strong>{guidedCaseNonFunctionalRequirements.length}</strong><span>no funcionales</span></div><div><strong>{guidedCaseOpenQuestions.length}</strong><span>preguntas abiertas</span></div></div>
          <div className="guided-case-compact-list"><details open><summary>Requisitos funcionales clave <ChevronDown size={14} /></summary><ul>{guidedCaseFunctionalRequirements.slice(0, 6).map((item) => <li key={item.id}><code>{item.id}</code><span>{item.text}</span></li>)}</ul></details><details><summary>Requisitos no funcionales clave <ChevronDown size={14} /></summary><ul>{guidedCaseNonFunctionalRequirements.map((item) => <li key={item.id}><code>{item.id}</code><span>{item.text}</span></li>)}</ul></details><details><summary>Preguntas abiertas que no debes ocultar <ChevronDown size={14} /></summary><ul>{guidedCaseOpenQuestions.map((item) => <li key={item}><span>?</span><span>{item}</span></li>)}</ul></details></div>
        </article>
        <article className="panel-card guided-case-inventory-card">
          <div className="card-heading"><div><span className="eyebrow">Filtro de entidad</span><h2>Conceptos que sobreviven al análisis</h2></div><Table2 size={19} className="muted-icon" /></div>
          <div className="guided-case-inventory">{guidedCaseCandidateInventory.map((item) => <div key={item.word}><span className={`guided-case-decision decision-${item.decision.toLowerCase().replaceAll(' ', '-')}`}>{item.decision}</span><strong>{item.word}</strong><small>{item.reason}</small></div>)}</div>
        </article>
      </section>

      <section className="guided-case-result panel-card" aria-labelledby="guided-case-result-title">
        <div className="card-heading"><div><span className="eyebrow">Resultado esperado del análisis</span><h2 id="guided-case-result-title">Ahora sí: construye el MER y compáralo</h2><p className="card-desc">Esta es la referencia de revisión. No es la única respuesta posible: una variante es válida cuando está respaldada por los requisitos y deja visibles sus supuestos.</p></div><ShieldCheck size={21} className="accent-text" /></div>
        <div className="guided-case-result-highlights"><div><strong>10</strong><span>entidades conectadas</span></div><div><strong>3</strong><span>tablas asociativas N:M</span></div><div><strong>7</strong><span>relaciones justificadas</span></div><div><strong>1</strong><span>consulta crítica: historial por placa</span></div></div>
        <div className="guided-case-relations-table-wrap"><table className="guided-case-relations-table"><thead><tr><th>Relación</th><th>Verbo</th><th>Cardinalidad</th><th>Participación</th><th>Qué demuestra</th></tr></thead><tbody>{guidedCaseRelations.map((relation) => <tr key={relation.pair}><td><strong>{relation.pair}</strong></td><td>{relation.verb}</td><td><span className="relation-pill">{relation.cardinality}</span></td><td>{relation.left} / {relation.right}</td><td>{relation.rule}</td></tr>)}</tbody></table></div>
        <div className="guided-case-model-actions"><button className="soft-button" type="button" onClick={() => setShowExpectedModel((value) => !value)}><Table2 size={14} /> {showExpectedModel ? 'Ocultar MER esperado' : 'Mostrar MER esperado'}</button><button className="soft-button" type="button" onClick={() => copy(guidedCaseMermaid, 'MERmaid')}><Clipboard size={14} /> {copied === 'MERmaid' ? 'Copiado' : 'Copiar Mermaid'}</button><button className="soft-button" type="button" onClick={() => downloadText('modelo-esperado-taller-ruta-7.mmd', guidedCaseMermaid, 'text/plain')}><Download size={14} /> Descargar .mmd</button><button className="soft-button" type="button" onClick={() => downloadText('ddl-esperado-taller-ruta-7.sql', guidedCaseSql, 'text/sql')}><Download size={14} /> Descargar .sql</button></div>
        {showExpectedModel && <div className="guided-case-model-grid"><MermaidPreview code={guidedCaseMermaid} /><div className="guided-case-sql-card"><div className="artifact-card-head"><span className="artifact-icon violet"><FileText size={15} /></span><span>DDL orientativo · PostgreSQL</span></div><pre>{guidedCaseSql}</pre></div></div>}
        <div className="guided-case-defense"><div className="guided-case-section-label"><Flag size={15} /> Defensa técnica mínima</div><p>“El modelo separa datos maestros de hechos transaccionales. Las relaciones N:M se resuelven con entidades asociativas que conservan sus propios atributos. Los precios aplicados no dependen del catálogo vigente, las PK son técnicas, los identificadores naturales tienen UNIQUE y las órdenes/pagos se protegen con RESTRICT para preservar la historia. Las decisiones aún no confirmadas quedan en preguntas abiertas.”</p></div>

        {/* CONEXIÓN METODOLÓGICA: NORMALIZACIÓN FORMAL 1FN-3FN */}
        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: '10px',
            background: 'var(--surface-2)',
            border: '1px solid var(--line-strong)',
            borderLeft: '4px solid var(--cyan)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ color: 'var(--cyan)' }}><Sparkles size={16} /></span>
            <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
              Conexión Metodológica: ¿Cómo se aplican 1FN, 2FN y 3FN en este Taller?
            </strong>
          </div>
          <p style={{ margin: '0 0 12px', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Al igual que en la <strong>Factura Comercial del Módulo 07</strong>, la <em>Orden de Servicio</em> física del taller automotriz no se guarda en una sola tabla plana. Se descompone rigurosamente para evitar anomalías operativas:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '6px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
              <strong style={{ fontSize: '11px', color: 'var(--cyan)', display: 'block', marginBottom: '4px' }}>
                1FN · Atomicidad de Insumos
              </strong>
              <p style={{ margin: 0, fontSize: '10px', color: 'var(--muted)', lineHeight: 1.4 }}>
                Los repuestos utilizados no se guardan como texto separado por comas. Cada ítem instalado en el carro se registra en su propia fila independiente.
              </p>
            </div>
            <div style={{ padding: '10px', borderRadius: '6px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
              <strong style={{ fontSize: '11px', color: 'var(--lime)', display: 'block', marginBottom: '4px' }}>
                2FN · Sin Dependencias Parciales
              </strong>
              <p style={{ margin: 0, fontSize: '10px', color: 'var(--muted)', lineHeight: 1.4 }}>
                En <code>detalle_orden_repuesto</code>, el nombre del repuesto depende únicamente del <code>repuesto_id</code>, por lo que se traslada a la tabla maestra <code>REPUESTO</code>.
              </p>
            </div>
            <div style={{ padding: '10px', borderRadius: '6px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
              <strong style={{ fontSize: '11px', color: 'var(--amber)', display: 'block', marginBottom: '4px' }}>
                3FN & Snapshot Histórico
              </strong>
              <p style={{ margin: 0, fontSize: '10px', color: 'var(--muted)', lineHeight: 1.4 }}>
                El <code>precio_unitario_aplicado</code> se congela en el detalle de la orden. Además, se separa <code>CLIENTE</code> de <code>VEHICULO</code> para evitar la transitividad (<em>placa → cliente_id → teléfono</em>).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta guided-case-final-cta">
        <div><span className="eyebrow">Cierre del caso</span><h2>{allStepsDone ? 'El expediente ya tiene una ruta de decisión completa.' : 'Completa las salidas del ejercicio para cerrar el caso.'}</h2><p>{allStepsDone ? 'Guarda el ZIP, compara tu modelo con la referencia y llévalo a revisión con el instructor o el negocio.' : `Te faltan ${guidedCaseSteps.length - completedSteps.length} paso(s). Puedes volver a abrir cualquier orientación antes de marcar la salida.`}</p></div>
        <button className="primary-button" type="button" disabled={!allStepsDone} onClick={onComplete}>{allStepsDone ? 'Guardar caso y continuar al portafolio' : 'Completa el ejercicio guiado'} <Check size={16} /></button>
      </section>
    </motion.div>
  )
}
