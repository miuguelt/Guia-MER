import { Check, ChevronDown, ChevronUp, Clipboard, ExternalLink, FileDown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { aiPromptTools, gemaLevels, type GemaLevel } from '../../../data/ai'
import { downloadText } from '../../../lib/exports'

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

export default function AIToolBuilderSection() {
  const [level, setLevel] = useState<GemaLevel>('seed')
  const filteredTools = aiPromptTools.filter((t) => t.level === level)
  const [selectedToolId, setSelectedToolId] = useState(filteredTools[0]?.id ?? '')
  const [copied, setCopied] = useState(false)
  const [showExample, setShowExample] = useState(false)
  const [showSteps, setShowSteps] = useState(true)

  const activeTool = filteredTools.find((t) => t.id === selectedToolId) ?? filteredTools[0]

  const handleLevelChange = (newLevel: GemaLevel) => {
    setLevel(newLevel)
    const tools = aiPromptTools.filter((t) => t.level === newLevel)
    setSelectedToolId(tools[0]?.id ?? '')
    setShowExample(false)
  }

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
    <>
      {/* ── Selector de Nivel ── */}
      <section className="gem-level-section panel-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Elige tu nivel</span>
            <h2>Herramientas de IA por experiencia</h2>
          </div>
        </div>
        <p className="gem-level-intro">
          Cada nivel tiene las mismas 4 herramientas, pero con instrucciones adaptadas a tu experiencia. Empieza con 🌱 Semilla si es tu primera vez.
        </p>
        <LevelSelector level={level} onChange={handleLevelChange} />
      </section>

      {/* ── Suite de Herramientas ── */}
      <section className="gem-builder panel-card">
        <div className="gem-copy">
          <span className="eyebrow">
            {gemaLevels.find((l) => l.id === level)?.emoji} Herramientas nivel {gemaLevels.find((l) => l.id === level)?.label}
          </span>
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
                onClick={() => {
                  setSelectedToolId(tool.id)
                  setShowExample(false)
                }}
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
            <div
              style={{
                marginTop: '8px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: 'rgba(181,235,100,.08)',
                border: '1px solid rgba(181,235,100,.25)',
                fontSize: '12px',
                color: 'var(--text)',
              }}
            >
              <strong>🚀 Cómo activarla:</strong> Pega la instrucción en tu IA y envía la palabra <code>inicia</code> para que comience la mentoría guiada paso a paso.
            </div>
          </div>

          {/* Actions */}
          <div className="gem-actions">
            <button className="primary-button small-button" onClick={copyActivePrompt}>
              {copied ? <Check size={15} /> : <Clipboard size={15} />} {copied ? 'Instrucción copiada' : 'Copiar instrucción'}
            </button>
            <button
              className="soft-button"
              onClick={() => downloadText(activeTool.fileName, activeTool.prompt, 'text/markdown')}
            >
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
              <a
                href="https://gemini.google.com/share/c663a17632de?skid=563a1190-cad0-42ba-9c13-b04bcabea93e&hl=es_419"
                target="_blank"
                rel="noreferrer"
                className="soft-button small-button"
              >
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
                        {msg.text.split('\n').map((line, j) => (
                          <p key={j}>{line}</p>
                        ))}
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
    </>
  )
}
