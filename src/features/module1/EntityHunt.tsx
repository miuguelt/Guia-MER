import { ArrowRight, Check, CircleHelp, Filter, HelpCircle, RotateCcw, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { huntTokens } from '../../data/course'
import LearningToolkit from '../../components/LearningToolkit'
import AttributeClassifierLab from './AttributeClassifierLab'

type Kind = 'entity' | 'attribute' | 'key'
interface EntityEvidence { entities: string[]; attributes: string[] }

export default function EntityHunt({ onComplete }: { onComplete: (evidence?: EntityEvidence) => void }) {
  const [selected, setSelected] = useState<Record<string, Kind>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => huntTokens.reduce((total, token) => total + (selected[token.id] === token.kind ? 1 : 0), 0), [selected])
  const choose = (id: string, kind: Kind) => {
    setSubmitted(false)
    setSelected((prev) => ({ ...prev, [id]: kind }))
  }

  return (
    <motion.div className="page-shell module-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="module-hero split-hero">
        <div>
          <span className="label-pill lime-pill">MÓDULO 01 · FUNDAMENTOS</span>
          <h1>Paso a paso desde cero:<br /><em>del texto a las entidades.</em></h1>
          <p>
            Cualquier sistema empieza como una conversación humana. Aprende a aplicar el análisis lingüístico para extraer sistemáticamente las entidades, atributos y claves sin dudar.
          </p>
        </div>
        <div className="concept-stack">
          <div className="concept-chip entity-chip">
            <span>CLIENTE</span>
            <small>Sustantivo con identidad propia</small>
          </div>
          <div className="concept-connector">se describe con</div>
          <div className="concept-chip attribute-chip">
            <span>nombre, teléfono</span>
            <small>Propiedades atómicas</small>
          </div>
          <div className="concept-connector">se identifica con</div>
          <div className="concept-chip key-chip">
            <span>id_cliente</span>
            <small>Clave Primaria (PK)</small>
          </div>
        </div>
      </section>

      <LearningToolkit variant="entities" />

      {/* MÉTODO MORFOSINTÁCTICO TEÓRICO */}
      <section className="linguistic-method panel-card">
        <div className="section-heading compact-heading">
          <div>
            <span className="eyebrow">La Fórmula Lingüística Universal</span>
            <h2>Cómo analizar cualquier narrativa en 3 preguntas</h2>
          </div>
          <span className="section-note">de las palabras a las tablas</span>
        </div>

        <div className="linguistic-steps-grid">
          <article className="linguistic-step-card">
            <span className="step-badge">1. Sustantivos</span>
            <h3>Candidatos a Entidad</h3>
            <p>Subraya todas las cosas, personas, lugares o eventos del texto (ej. Cliente, Vehículo, Orden de Servicio, Producto).</p>
            <div className="card-micro-rule">
              <Filter size={14} />
              <span><b>Filtro de Descarte:</b> ¿Tiene muchas instancias y varios datos para describir? Si es sí: <b>Entidad</b>. Si es un valor simple: <b>Atributo</b>.</span>
            </div>
          </article>

          <article className="linguistic-step-card">
            <span className="step-badge">2. Adjetivos y Datos</span>
            <h3>Atributos</h3>
            <p>Información que describe o califica a la entidad (ej. nombre, precio, fecha, placas, color, estado).</p>
            <div className="card-micro-rule">
              <HelpCircle size={14} />
              <span><b>Prueba de Dependencia:</b> Si la entidad desaparece, ¿este dato pierde sentido? Si depende de ella, es su <b>Atributo</b>.</span>
            </div>
          </article>

          <article className="linguistic-step-card">
            <span className="step-badge">3. Verbos de Acción</span>
            <h3>Relaciones</h3>
            <p>Acciones que conectan dos sustantivos (ej. Cliente <i>solicita</i> Servicio, Vehículo <i>recibe</i> Reparación).</p>
            <div className="card-micro-rule">
              <Sparkles size={14} />
              <span><b>Pregunta de Unión:</b> ¿Quién hace qué con quién? El verbo es el puente que se convertirá en línea o en tabla puente.</span>
            </div>
          </article>
        </div>
      </section>

      {/* CAZA DE ENTIDADES INTERACTIVA */}
      <div className="lesson-grid hunt-grid">
        <section className="lesson-copy">
          <div className="step-tag">Práctica 01 · Caza de Elementos</div>
          <h2>Clasifica los términos del taller</h2>
          <p>
            Evalúa cada término del negocio y márcalo como <b>E</b> (Entidad), <b>A</b> (Atributo) o <b>K</b> (Llave identificadora).
          </p>
          <div className="legend-row">
            <span className="legend entity-legend">E · Entidad (Sustantivo con instancias)</span>
            <span className="legend attribute-legend">A · Atributo (Dato descriptivo)</span>
            <span className="legend key-legend">K · Llave (Identificador único)</span>
          </div>
          <div className="callout hint-callout">
            <CircleHelp size={17} />
            <div>
              <strong>Pista Didáctica:</strong>
              <p>“Taller” o “Vehículo” albergan múltiples datos y registros. “Placa” distingue un vehículo de otro. “Marca” describe una propiedad del vehículo.</p>
            </div>
          </div>
        </section>

        <section className="hunt-board panel-card">
          <div className="board-header">
            <div>
              <span className="eyebrow">Términos extraídos del texto</span>
              <p>Selecciona una categoría para cada ficha:</p>
            </div>
            <span className="score-badge"><Sparkles size={14} /> {score}/{huntTokens.length}</span>
          </div>

          <div className="token-grid">
            {huntTokens.map((token) => {
              const userKind = selected[token.id]
              const isCorrect = userKind === token.kind
              return (
                <div
                  key={token.id}
                  className={`hunt-token ${userKind ? `picked-${userKind}` : ''} ${
                    submitted ? (isCorrect ? 'token-correct' : 'token-incorrect') : ''
                  }`}
                >
                  <div className="token-head-row">
                    <span className="token-word">{token.label}</span>
                    {submitted && (
                      <span className={`token-status-icon ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
                        {isCorrect ? <Check size={14} /> : <CircleHelp size={14} />}
                      </span>
                    )}
                  </div>
                  <div className="token-actions">
                    {(['entity', 'attribute', 'key'] as Kind[]).map((kind) => (
                      <button
                        key={kind}
                        type="button"
                        className={userKind === kind ? 'selected' : ''}
                        onClick={() => choose(token.id, kind)}
                      >
                        {kind === 'entity' ? 'E' : kind === 'attribute' ? 'A' : 'K'}
                      </button>
                    ))}
                  </div>
                  {submitted && (
                    <div className={`token-feedback-note ${isCorrect ? 'note-correct' : 'note-wrong'}`}>
                      <small>
                        <b>{isCorrect ? '¡Correcto!' : `Es ${token.kind === 'entity' ? 'Entidad (E)' : token.kind === 'attribute' ? 'Atributo (A)' : 'Llave (K)'}:`}</b>{' '}
                        {token.hint}
                      </small>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="board-footer">
            <button className="soft-button" type="button" onClick={() => { setSelected({}); setSubmitted(false) }}>
              <RotateCcw size={14} /> Limpiar
            </button>
            <button
              className="soft-button"
              type="button"
              onClick={() => {
                const solution: Record<string, Kind> = {}
                huntTokens.forEach((t) => { solution[t.id] = t.kind as Kind })
                setSelected(solution)
                setSubmitted(true)
              }}
            >
              <Sparkles size={14} /> Ver solución didáctica
            </button>
            <button className="primary-button small-button" type="button" onClick={() => setSubmitted(true)}>
              Comprobar caza <Check size={15} />
            </button>
          </div>

          {submitted && (
            <div className={`feedback ${score === huntTokens.length ? 'success-feedback' : 'error-feedback'}`} role="alert">
              {score === huntTokens.length ? (
                <>
                  <Check size={16} />
                  <span><b>¡Excelente discernimiento!</b> Has separado los sustantivos con identidad de los datos descriptivos y las llaves.</span>
                </>
              ) : (
                <>
                  <CircleHelp size={16} />
                  <span><b>{score} de {huntTokens.length} correctas:</b> Revisa las notas amarillas en cada ficha para entender qué función cumple en el negocio.</span>
                </>
              )}
            </div>
          )}
        </section>
      </div>

      {/* LABORATORIO DE CLASIFICACIÓN DE ATRIBUTOS */}
      <AttributeClassifierLab />

      <section className="definition-row">
        <div>
          <span className="eyebrow">Regla de Oro en Producción</span>
          <h2>PKs Técnicas vs Llaves Naturales</h2>
        </div>
        <p>
          Nunca uses documentos nacionales, placas o correos electrónicos como clave primaria interna. Si el usuario corrige un dígito de su cédula o cambia de correo, actualizarás cientos de tablas foráneas (o bloquearás el cambio). Usa siempre un <b>id técnico inmutable (UUID o BIGSERIAL)</b> como PK, y protege la cédula o correo con una restricción <code>UNIQUE NOT NULL</code>.
        </p>
      </section>

      <button className="primary-button complete-button" type="button" onClick={() => onComplete({
        entities: huntTokens.filter((token) => token.kind === 'entity' && selected[token.id] === token.kind).map((token) => token.label.toUpperCase()),
        attributes: huntTokens.filter((token) => token.kind !== 'entity' && selected[token.id] === token.kind).map((token) => token.label),
      })}>
        Domino la extracción de entidades y atributos <ArrowRight size={15} />
      </button>
    </motion.div>
  )
}
