import { AlertTriangle, Bot, Check, ChevronDown, ChevronUp, Clipboard, ExternalLink, FileDown, HelpCircle, ShieldCheck, Sparkles, Workflow } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { aiExerciseStatements, aiPromptTools, aiTools, aiWorkflow, beginnerGuide, gemaLevels, type AiLogDraft, type GemaLevel } from '../../data/ai'
import { downloadText } from '../../lib/exports'
import AIAuditLog from './AIAuditLog'
import LearningToolkit from '../../components/LearningToolkit'

interface Props { savedLog: AiLogDraft; onSaveLog: (value: AiLogDraft) => void; onComplete: () => void }

function OnboardingSection() {
  const [open, setOpen] = useState(true)
  return (
    <section className="gem-onboarding panel-card">
      <button type="button" className="gem-onboarding-toggle" onClick={() => setOpen((v) => !v)}>
        <div>
          <span className="label-pill lime-pill">Nuevo aquí</span>
          <h2>{beginnerGuide.title}</h2>
        </div>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div className="gem-onboarding-content">
          <div className="gem-onboarding-analogy">
            <HelpCircle size={20} className="color-cyan" />
            <p>{beginnerGuide.analogy}</p>
          </div>
          <p className="gem-onboarding-what-is">{beginnerGuide.whatIs}</p>
          <div className="gem-onboarding-columns">
            <div className="gem-onboarding-does">
              <strong>✅ Lo que hace una Gema</strong>
              <ul>{beginnerGuide.whatItDoes.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="gem-onboarding-does-not">
              <strong>⚠️ Lo que NO hace</strong>
              <ul>{beginnerGuide.whatItDoesNot.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <div className="gem-onboarding-steps">
            <strong>🚀 Cómo empezar en 5 pasos</strong>
            <div className="gem-onboarding-steps-grid">
              {beginnerGuide.howToStart.map((step, i) => (
                <div key={step.title} className="gem-onboarding-step">
                  <span className="gem-step-number">{i + 1}</span>
                  <div>
                    <strong>{step.icon} {step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="gem-onboarding-any-ai"><Sparkles size={14} /> {beginnerGuide.worksWithAny}</p>
        </div>
      )}
    </section>
  )
}

function LevelSelector({ level, onChange }: { level: GemaLevel; onChange: (l: GemaLevel) => void }) {
  return (
    <div className="gem-level-selector" role="tablist" aria-label="Nivel de dificultad">
      {gemaLevels.map((l) => (
        <button
          key={l.id}
          role="tab"
          aria-selected={level === l.id}
          className={`gem-level-btn gem-level-${l.color} ${level === l.id ? 'active' : ''}`}
          onClick={() => onChange(l.id)}
        >
          <span className="gem-level-emoji">{l.emoji}</span>
          <div>
            <strong>{l.label}</strong>
            <small>{l.description}</small>
          </div>
        </button>
      ))}
    </div>
  )
}

export default function AIWorkflowLab({ savedLog, onSaveLog, onComplete }: Props) {
  const [level, setLevel] = useState<GemaLevel>('seed')
  const filteredTools = aiPromptTools.filter((t) => t.level === level)
  const [selectedToolId, setSelectedToolId] = useState(filteredTools[0]?.id ?? '')
  const [copied, setCopied] = useState(false)
  const [showExample, setShowExample] = useState(false)
  const [showSteps, setShowSteps] = useState(true)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const activeTool = filteredTools.find((t) => t.id === selectedToolId) ?? filteredTools[0]
  const solved = aiExerciseStatements.every((item) => answers[item.id] === item.answer)

  const handleLevelChange = (newLevel: GemaLevel) => {
    setLevel(newLevel)
    const tools = aiPromptTools.filter((t) => t.level === newLevel)
    setSelectedToolId(tools[0]?.id ?? '')
    setShowExample(false)
  }

  const answer = (id: string, value: boolean) => setAnswers((current) => ({ ...current, [id]: value }))

  const copyActivePrompt = async () => {
    try {
      await navigator.clipboard.writeText(activeTool.prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.div className="page-shell module-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* ── Hero ── */}
      <section className="module-hero split-hero">
        <div>
          <span className="label-pill blue-pill">MÓDULO 06 · IA CON CRITERIO</span>
          <h1>La IA acelera el dibujo.<br /><em>El criterio decide el modelo.</em></h1>
          <p>Trabaja con un flujo reproducible: requisitos, preguntas, reglas, código, pruebas y revisión humana. La IA propone; el dominio confirma.</p>
        </div>
        <div className="lab-score ai-score">
          <div className="score-ring"><Bot size={27} /></div>
          <span>copiloto, no autoridad</span>
        </div>
      </section>

      {/* ── Onboarding ── */}
      <OnboardingSection />

      {/* ── LearningToolkit ── */}
      <LearningToolkit variant="ai" />

      {/* ── Principios ── */}
      <section className="ai-principles">
        <article><ShieldCheck size={20} /><strong>Contexto antes de la instrucción</strong><p>Entrega glosario, alcance, motor SQL, ejemplos y reglas conocidas.</p></article>
        <article><Workflow size={20} /><strong>Artefacto como código</strong><p>Conserva Mermaid o DBML en Git; el lienzo se puede volver a generar.</p></article>
        <article><AlertTriangle size={20} /><strong>Supuestos visibles</strong><p>Todo lo que la IA no sabe debe quedar marcado para validación.</p></article>
      </section>

      {/* ── Workflow ── */}
      <section className="ai-workflow-section">
        <div className="section-heading">
          <div><span className="eyebrow">Método actual recomendado</span><h2>De la conversación a la evidencia</h2></div>
          <span className="non-official">Humano + IA + pruebas</span>
        </div>
        <div className="workflow-rail">
          {aiWorkflow.map((item) => (
            <article key={item.step} className="workflow-step">
              <span>{item.step}</span><h3>{item.title}</h3><p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Selector de Nivel ── */}
      <section className="gem-level-section panel-card">
        <div className="section-heading">
          <div><span className="eyebrow">Elige tu nivel</span><h2>Herramientas de IA por experiencia</h2></div>
        </div>
        <p className="gem-level-intro">Cada nivel tiene las mismas 4 herramientas, pero con instrucciones adaptadas a tu experiencia. Empieza con 🌱 Semilla si es tu primera vez.</p>
        <LevelSelector level={level} onChange={handleLevelChange} />
      </section>

      {/* ── Suite de Herramientas ── */}
      <section className="gem-builder panel-card">
        <div className="gem-copy">
          <span className="eyebrow">{gemaLevels.find((l) => l.id === level)?.emoji} Herramientas nivel {gemaLevels.find((l) => l.id === level)?.label}</span>
          <h2>Herramientas de análisis y modelado</h2>
          <p>
            {level === 'seed' && 'Instrucciones simples y sin jerga. La IA te guía con lenguaje cotidiano y preguntas claras.'}
            {level === 'sprout' && 'Instrucciones con reglas de modelado, cardinalidad y diagramas Mermaid. La IA explica los conceptos.'}
            {level === 'root' && 'Instrucciones de ingeniería para análisis profesional completo con DDL, normalización y auditoría.'}
          </p>

          {/* Tool tabs */}
          <div className="gem-tool-tabs" role="tablist" aria-label="Selección de herramienta">
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                role="tab"
                aria-selected={tool.id === activeTool.id}
                className={`gem-tool-tab ${tool.id === activeTool.id ? 'active' : ''}`}
                onClick={() => { setSelectedToolId(tool.id); setShowExample(false) }}
              >
                {tool.title}
              </button>
            ))}
          </div>

          {/* Tool meta */}
          <div className="gem-tool-meta">
            <span className="label-pill cyan-pill">{activeTool.category}</span>
            <h3 style={{ fontSize: '16px', margin: '8px 0 4px', color: 'var(--text)' }}>{activeTool.title}</h3>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)' }}>{activeTool.subtitle}</p>
            <div className="gem-tool-when">
              <strong>Cuándo usarla:</strong> {activeTool.bestWhen}
            </div>
          </div>

          {/* Actions */}
          <div className="gem-actions">
            <button className="primary-button small-button" onClick={copyActivePrompt}>
              {copied ? <Check size={15} /> : <Clipboard size={15} />} {copied ? 'Instrucción copiada' : 'Copiar instrucción'}
            </button>
            <button className="soft-button" onClick={() => downloadText(activeTool.fileName, activeTool.prompt, 'text/markdown')}>
              <FileDown size={15} /> Descargar {activeTool.fileName}
            </button>
            {activeTool.id === 'master-architect' && (
              <a
                href="https://gemini.google.com/share/c663a17632de?skid=563a1190-cad0-42ba-9c13-b04bcabea93e&hl=es_419"
                target="_blank"
                rel="noreferrer"
                className="primary-button small-button gemini-launch-btn"
              >
                <Sparkles size={14} /> Probar caso en Gemini Canvas <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Gemini Canvas callout */}
          {activeTool.id === 'master-architect' && (
            <div className="gem-case-study-callout">
              <Sparkles size={16} className="color-cyan" />
              <div>
                <strong>Caso de estudio interactivo en vivo:</strong>
                <p>Accede a la sesión en Gemini Canvas donde el Arquitecto analiza un dominio real paso a paso.</p>
              </div>
              <a href="https://gemini.google.com/share/c663a17632de?skid=563a1190-cad0-42ba-9c13-b04bcabea93e&hl=es_419" target="_blank" rel="noreferrer" className="soft-button small-button">
                Ver caso <ExternalLink size={12} />
              </a>
            </div>
          )}
          {/* ── Usage Steps (collapsible) ── */}
          <div className="gem-usage-section">
            <button type="button" className="gem-usage-toggle" onClick={() => setShowSteps((v) => !v)}>
              <strong>📖 Cómo usar esta herramienta paso a paso</strong>
              {showSteps ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showSteps && (
              <div className="gem-usage-steps">
                {activeTool.usageSteps.map((s) => (
                  <div key={s.step} className="gem-usage-step">
                    <span className="gem-step-number">{s.step}</span>
                    <div>
                      <strong>{s.action}</strong>
                      <p>{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Example Conversation (collapsible) ── */}
          {activeTool.exampleConversation.length > 0 && (
            <div className="gem-example-section">
              <button type="button" className="gem-example-toggle" onClick={() => setShowExample((v) => !v)}>
                <strong>💬 Ver ejemplo de conversación</strong>
                {showExample ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {showExample && (
                <div className="gem-example-conversation">
                  {activeTool.exampleConversation.map((msg, i) => (
                    <div key={i} className={`gem-msg gem-msg-${msg.role}`}>
                      <span className="gem-msg-label">{msg.role === 'user' ? '👤 Tú' : '🤖 IA'}</span>
                      <div className="gem-msg-text">
                        {msg.text.split('\n').map((line, j) => <p key={j}>{line}</p>)}
                      </div>
                      {msg.annotation && <small className="gem-msg-annotation">{msg.annotation}</small>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Prompt Preview Column ── */}
        <div className="gem-preview-column">
          <div className="gem-preview-header">
            <span>Instrucción completa ({activeTool.prompt.split('\n').length} líneas)</span>
            <button type="button" className="soft-button small-button" onClick={copyActivePrompt}>
              {copied ? <Check size={13} /> : <Clipboard size={13} />} {copied ? 'Copiada' : 'Copiar'}
            </button>
          </div>
          <pre className="gem-preview">{activeTool.prompt}</pre>
        </div>
      </section>

      {/* ── Panorama de herramientas ── */}
      <section className="tool-matrix-section">
        <div className="section-heading">
          <div><span className="eyebrow">Panorama de herramientas</span><h2>Elige por función, no por moda</h2></div>
          <span className="non-official">Revisar planes y privacidad</span>
        </div>
        <div className="tool-matrix">
          {aiTools.map((tool) => (
            <article key={tool.name} className="tool-card">
              <div className="tool-card-head">
                <div><span className="tool-company">{tool.company}</span><h3>{tool.name}</h3></div>
                <a href={tool.url} target="_blank" rel="noreferrer" aria-label={`Abrir fuente de ${tool.name}`}><ExternalLink size={14} /></a>
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
          <div><span className="eyebrow">Ejercicio práctico · auditoría de IA</span><h2>¿Aceptarías estas tres afirmaciones?</h2></div>
          <span className={`exercise-score ${solved ? 'is-solved' : ''}`}>{Object.keys(answers).length}/3</span>
        </div>
        <p className="exercise-instruction">Marca cada frase como válida o riesgosa según el método de la guía. La respuesta correcta no es "confiar": es pedir evidencia.</p>
        <div className="statement-list">
          {aiExerciseStatements.map((item) => (
            <div key={item.id} className={`statement ${answers[item.id] !== undefined ? answers[item.id] === item.answer ? 'is-correct' : 'is-wrong' : ''}`}>
              <p>{item.text}</p>
              <div>
                <button className={answers[item.id] === true ? 'selected' : ''} onClick={() => answer(item.id, true)}>Sí, la acepto</button>
                <button className={answers[item.id] === false ? 'selected' : ''} onClick={() => answer(item.id, false)}>No, la cuestiono</button>
              </div>
              {answers[item.id] !== undefined && <small>{answers[item.id] === item.answer ? item.explanation : 'Revisa la razón: una respuesta plausible también puede ocultar un supuesto no validado.'}</small>}
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
