import { AlertTriangle, Bot, Check, ExternalLink, ShieldCheck, Workflow } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { aiExerciseStatements, aiTools, aiWorkflow, type AiLogDraft } from '../../data/ai'
import AIAuditLog from './AIAuditLog'
import LearningToolkit from '../../components/LearningToolkit'
import AIOnboardingSection from './components/AIOnboardingSection'
import AIToolBuilderSection from './components/AIToolBuilderSection'

interface Props {
  savedLog: AiLogDraft
  onSaveLog: (value: AiLogDraft) => void
  onComplete: () => void
}

export default function AIWorkflowLab({ savedLog, onSaveLog, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const solved = aiExerciseStatements.every((item) => answers[item.id] === item.answer)
  const answer = (id: string, value: boolean) => setAnswers((current) => ({ ...current, [id]: value }))

  return (
    <motion.div className="page-shell module-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* ── Hero ── */}
      <section className="module-hero split-hero">
        <div>
          <span className="label-pill blue-pill">MÓDULO 06 · IA CON CRITERIO</span>
          <h1>
            La IA acelera el dibujo.<br />
            <em>El criterio decide el modelo.</em>
          </h1>
          <p>
            Trabaja con un flujo reproducible: requisitos, preguntas, reglas, código, pruebas y revisión humana. La IA propone; el dominio confirma.
          </p>
        </div>
        <div className="lab-score ai-score">
          <div className="score-ring"><Bot size={27} /></div>
          <span>copiloto, no autoridad</span>
        </div>
      </section>

      {/* ── Onboarding ── */}
      <AIOnboardingSection />

      {/* ── LearningToolkit ── */}
      <LearningToolkit variant="ai" />

      {/* ── Principios ── */}
      <section className="ai-principles">
        <article>
          <ShieldCheck size={20} />
          <strong>Contexto antes de la instrucción</strong>
          <p>Entrega glosario, alcance, motor SQL, ejemplos y reglas conocidas.</p>
        </article>
        <article>
          <Workflow size={20} />
          <strong>Artefacto como código</strong>
          <p>Conserva Mermaid o DBML en Git; el lienzo se puede volver a generar.</p>
        </article>
        <article>
          <AlertTriangle size={20} />
          <strong>Supuestos visibles</strong>
          <p>Todo lo que la IA no sabe debe quedar marcado para validación.</p>
        </article>
      </section>

      {/* ── Workflow ── */}
      <section className="ai-workflow-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Método actual recomendado</span>
            <h2>De la conversación a la evidencia</h2>
          </div>
          <span className="non-official">Humano + IA + pruebas</span>
        </div>
        <div className="workflow-rail">
          {aiWorkflow.map((item) => (
            <article key={item.step} className="workflow-step">
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Suite de Herramientas (Nivel y Generador) ── */}
      <AIToolBuilderSection />

      {/* ── Panorama de herramientas ── */}
      <section className="tool-matrix-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Panorama de herramientas</span>
            <h2>Elige por función, no por moda</h2>
          </div>
          <span className="non-official">Revisar planes y privacidad</span>
        </div>
        <div className="tool-matrix">
          {aiTools.map((tool) => (
            <article key={tool.name} className="tool-card">
              <div className="tool-card-head">
                <div>
                  <span className="tool-company">{tool.company}</span>
                  <h3>{tool.name}</h3>
                </div>
                <a href={tool.url} target="_blank" rel="noreferrer" aria-label={`Abrir fuente de ${tool.name}`}>
                  <ExternalLink size={14} />
                </a>
              </div>
              <span className="tool-category">{tool.category}</span>
              <p><b>Úsala para:</b> {tool.bestFor}</p>
              <p><b>Fortaleza:</b> {tool.strength}</p>
              <p className="tool-watch"><b>Cuida:</b> {tool.watch}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Bitácora ── */}
      <AIAuditLog value={savedLog} onSave={onSaveLog} />

      {/* ── Ejercicio ── */}
      <section className="ai-exercise panel-card">
        <div className="card-heading">
          <div>
            <span className="eyebrow">Ejercicio práctico · auditoría de IA</span>
            <h2>¿Aceptarías estas tres afirmaciones?</h2>
          </div>
          <span className={`exercise-score ${solved ? 'is-solved' : ''}`}>{Object.keys(answers).length}/3</span>
        </div>
        <p className="exercise-instruction">
          Marca cada frase como válida o riesgosa según el método de la guía. La respuesta correcta no es "confiar": es pedir evidencia.
        </p>
        <div className="statement-list">
          {aiExerciseStatements.map((item) => (
            <div
              key={item.id}
              className={`statement ${
                answers[item.id] !== undefined ? (answers[item.id] === item.answer ? 'is-correct' : 'is-wrong') : ''
              }`}
            >
              <p>{item.text}</p>
              <div>
                <button className={answers[item.id] === true ? 'selected' : ''} onClick={() => answer(item.id, true)}>
                  Sí, la acepto
                </button>
                <button className={answers[item.id] === false ? 'selected' : ''} onClick={() => answer(item.id, false)}>
                  No, la cuestiono
                </button>
              </div>
              {answers[item.id] !== undefined && (
                <small>
                  {answers[item.id] === item.answer
                    ? item.explanation
                    : 'Revisa la razón: una respuesta plausible también puede ocultar un supuesto no validado.'}
                </small>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="final-cta">
        <div>
          <span className="eyebrow">Criterio adquirido</span>
          <h2>La mejor salida de IA es auditable.</h2>
          <p>Guarda la instrucción, el contexto, los supuestos y las pruebas junto al diagrama.</p>
        </div>
        <button className="primary-button" disabled={!solved} onClick={onComplete}>
          {solved ? 'Guardar estación' : 'Resuelve el ejercicio'} <Check size={16} />
        </button>
      </section>
    </motion.div>
  )
}
