import { ArrowRight, Check, Code2, KeyRound, MoveRight, RotateCcw, Table2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import LearningToolkit from '../../components/LearningToolkit'
import { transformationRules } from '../../data/rulesData'

const steps = [
  { title: '1. Identificar la relación en el MER', detail: 'CLIENTE tiene muchas ORDEN_SERVICIO. Es una relación 1:N.', focus: 'relation' },
  { title: '2. Tomar la PK del lado 1 (Padre)', detail: 'La PK id_cliente (UUID) identifica unívocamente al cliente padre.', focus: 'parent' },
  { title: '3. Migrar la llave al lado N (Hija)', detail: 'id_cliente viaja hacia ORDEN_SERVICIO y se convierte en Llave Foránea (FK).', focus: 'foreign' },
  { title: '4. Validar integridad referencial', detail: 'La FK conecta cada orden con un cliente existente. Se añade restricción NOT NULL.', focus: 'result' },
]

export default function TransformationLab({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [selectedRuleId, setSelectedRuleId] = useState('rule-one-to-many')
  const current = steps[step]
  const activeRule = transformationRules.find((r) => r.id === selectedRuleId) ?? transformationRules[3]

  return (
    <motion.div className="page-shell module-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="module-hero">
        <div>
          <span className="label-pill violet-pill">MÓDULO 03 · TRANSFORMACIÓN</span>
          <h1>Del MER a las tablas:<br /><em>el algoritmo de derivación.</em></h1>
          <p>
            Transformar un diagrama conceptual a un esquema relacional no es cuestión de intuición: es un algoritmo matemático exacto de 7 reglas universales.
          </p>
        </div>
        <div className="step-counter">
          <strong>0{step + 1}</strong>
          <span>/ 04 simulación</span>
          <div className="mini-progress"><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
        </div>
      </section>

      <LearningToolkit variant="transformation" />

      {/* SIMULADOR VISUAL DE MIGRACIÓN 1:N */}
      <section className="transformer panel-card">
        <div className="transformer-head">
          <div>
            <span className="eyebrow">Simulación en tiempo real</span>
            <h2>{current.title}</h2>
            <p>{current.detail}</p>
          </div>
          <span className="step-pill">Paso {step + 1} de 4</span>
        </div>

        <div className="transform-stage">
          <div className={`concept-entity ${current.focus === 'parent' || current.focus === 'foreign' || current.focus === 'result' ? 'is-focused' : ''}`}>
            <div className="entity-head"><KeyRound size={15} /> CLIENTE</div>
            <div className="entity-field pk-field"><span>🔑</span> id_cliente <b>UUID PK</b></div>
            <div className="entity-field">nombre <b>VARCHAR</b></div>
            <span className="entity-badge">Lado 1 (Entidad Padre)</span>
          </div>

          <div className="migration-arrow">
            <MoveRight size={25} />
            <span>{current.focus === 'foreign' ? 'Migrando PK → FK' : 'Relación 1 : N'}</span>
          </div>

          <div className={`concept-entity child-entity ${current.focus === 'foreign' || current.focus === 'result' ? 'is-focused' : ''}`}>
            <div className="entity-head"><Table2 size={15} /> ORDEN_SERVICIO</div>
            <div className="entity-field"><span>🔑</span> id_orden <b>BIGSERIAL PK</b></div>
            <div className={`entity-field ${current.focus === 'foreign' || current.focus === 'result' ? 'fk-field' : ''}`}>
              <span>{current.focus === 'foreign' || current.focus === 'result' ? '🔗' : '○'}</span> id_cliente <b>UUID FK</b>
            </div>
            <div className="entity-field">fecha_ingreso <b>DATE</b></div>
            <span className="entity-badge">Lado N (Entidad Hija con FK)</span>
          </div>
        </div>

        <div className="transform-explanation">
          <span className="explanation-mark">{step + 1}</span>
          <div>
            <strong>
              {step === 0 ? 'La relación vive como concepto en el MER.' :
               step === 1 ? 'La PK es la identidad inmutable del padre.' :
               step === 2 ? 'La llave foránea se estampa en la tabla dependiente.' :
               'La integridad referencial queda formalizada en el DDL.'}
            </strong>
            <p>{current.detail}</p>
          </div>
        </div>

        <div className="transform-footer">
          <div className="step-dots">
            {steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={index <= step ? 'active' : ''}
                onClick={() => setStep(index)}
                aria-label={`Ir al paso ${index + 1}`}
              />
            ))}
          </div>
          <div className="transform-actions">
            <button className="soft-button" type="button" onClick={() => setStep(0)}>
              <RotateCcw size={14} /> Reiniciar
            </button>
            {step < steps.length - 1 ? (
              <button className="primary-button small-button" type="button" onClick={() => setStep(step + 1)}>
                Siguiente paso <ArrowRight size={15} />
              </button>
            ) : (
              <button className="soft-button" type="button" onClick={() => setStep(0)}>
                Repetir simulación
              </button>
            )}
          </div>
        </div>
      </section>

      {/* EXPLORADOR DE LAS 7 REGLAS DE ORO */}
      <section className="golden-rules-atlas panel-card">
        <div className="card-heading">
          <div>
            <span className="eyebrow">Catálogo Maestro</span>
            <h2>Las 7 Reglas de Oro de Derivación Relacional</h2>
            <p className="card-desc">Cualquier elemento del diagrama entidad-relación se traduce con una de estas siete reglas:</p>
          </div>
          <span className="accent-icon bg-violet"><Code2 size={18} /></span>
        </div>

        <div className="rules-selector-rail">
          {transformationRules.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`rule-tab-btn ${selectedRuleId === r.id ? 'is-selected' : ''}`}
              onClick={() => setSelectedRuleId(r.id)}
            >
              <span className="rule-tab-num">{r.number}</span>
              <span className="rule-tab-title">{r.title}</span>
              <span className="rule-tab-badge">{r.badge}</span>
            </button>
          ))}
        </div>

        <div className="rule-detail-display">
          <div className="rule-detail-info">
            <div className="rule-detail-header">
              <span className="rule-code-badge">Regla {activeRule.number}</span>
              <h3>{activeRule.title}</h3>
            </div>
            <div className="rule-mapping-comparison">
              <div>
                <span className="eyebrow">En el MER Conceptual:</span>
                <p>{activeRule.merConcept}</p>
              </div>
              <div>
                <span className="eyebrow">En el Modelo Relacional:</span>
                <p className="color-violet"><b>{activeRule.relationalMapping}</b></p>
              </div>
            </div>
            <p className="rule-explanation-p">{activeRule.explanation}</p>
          </div>

          <div className="rule-code-preview">
            <div className="code-preview-top">
              <span>SQL DDL Resultante</span>
              <small>PostgreSQL / Estándar</small>
            </div>
            <pre data-dbc="omitir"><code>{activeRule.exampleCode}</code></pre>
          </div>
        </div>
      </section>

      {/* RETO INTERACTIVO DE REGLAS DE DERIVACIÓN */}
      <section className="practice-lab panel-card" aria-labelledby="derivation-challenge-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Autoevaluación Práctica</span>
            <h2 id="derivation-challenge-title">¿Qué regla de derivación aplicarías en cada caso?</h2>
          </div>
          <span className="section-note">Aplica el algoritmo formal</span>
        </div>
        <div className="practice-grid">
          {[
            {
              id: 'c1',
              scenario: 'El cliente registra 3 teléfonos de contacto diferentes (móvil, trabajo, casa).',
              correct: 'rule-multivalued',
              ruleName: 'Regla 03 · Atributos Multivalorados',
              explanation: 'Para no violar 1FN creando columnas repetidas (tel1, tel2), se extrae a una tabla hija vinculada al cliente por FK.',
            },
            {
              id: 'c2',
              scenario: 'Un médico atiende a muchos pacientes y un paciente es atendido por muchos médicos en su estancia.',
              correct: 'rule-many-to-many',
              ruleName: 'Regla 05 · Relaciones Muchos a Muchos (N:M)',
              explanation: 'Se crea una tabla puente asociativa con las claves de ambas entidades y los datos del encuentro clínico.',
            },
            {
              id: 'c3',
              scenario: 'El campo dirección contiene calle, número exterior, barrio y código postal.',
              correct: 'rule-compound',
              ruleName: 'Regla 02 · Atributos Compuestos',
              explanation: 'Se aplana en columnas atómicas independientes en la misma tabla para permitir búsquedas y ordenamientos eficientes.',
            },
          ].map((item) => (
            <article key={item.id} className="practice-card">
              <div className="practice-card-top">
                <span>CASO PRÁCTICO</span>
              </div>
              <p>{item.scenario}</p>
              <div className="rule-select-choice">
                <span className="eyebrow" style={{ marginTop: '8px' }}>Regla recomendada:</span>
                <strong className="color-violet" style={{ display: 'block', fontSize: '13px', margin: '4px 0' }}>{item.ruleName}</strong>
                <small style={{ color: 'var(--muted)', fontSize: '11px', lineHeight: 1.4 }}>{item.explanation}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <button className="primary-button complete-button" type="button" onClick={onComplete}>
        Comprendo las 7 reglas de derivación <Check size={16} />
      </button>
    </motion.div>
  )
}
