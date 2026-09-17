import { useState } from 'react'
import { Check, CircleHelp, Lightbulb, Sparkles } from 'lucide-react'

export type AttributeType = 'simple' | 'compound' | 'multivalued' | 'derived' | 'pk'

interface AttributeSample {
  name: string
  context: string
  correct: AttributeType
  hint: string
}

const attributeSamples: AttributeSample[] = [
  { name: 'edad', context: 'Calculable restando año actual menos fecha_nacimiento.', correct: 'derived', hint: 'No debe guardarse fija: cambia cada cumpleaños. Es un atributo derivado.' },
  { name: 'telefonos_contacto', context: 'Un cliente puede registrar móvil personal, móvil trabajo y fijo.', correct: 'multivalued', hint: 'Múltiples valores para una misma persona. Debe ser tabla hija para no violar 1FN.' },
  { name: 'direccion_residencia', context: 'Compuesta por calle, número, barrio y ciudad.', correct: 'compound', hint: 'Atributo compuesto: en SQL debe aplanarse a columnas atómicas independientes.' },
  { name: 'id_cliente (UUID)', context: 'Generado por el sistema para identificar unívocamente la fila.', correct: 'pk', hint: 'Clave primaria técnica (surrogate key): estable, inmutable y eficiente.' },
  { name: 'nombre_completo', context: 'Texto descriptivo directo de la persona.', correct: 'simple', hint: 'Atributo simple y atómico que describe a la entidad.' },
]

const typeLabels: Record<AttributeType, { label: string; color: string; desc: string }> = {
  simple: { label: 'Simple / Atómico', color: 'cyan', desc: 'Indivisible y con un solo valor por fila.' },
  compound: { label: 'Compuesto', color: 'lime', desc: 'Formado por partes que deben aplanarse.' },
  multivalued: { label: 'Multivalorado', color: 'rose', desc: 'Múltiples valores; requiere tabla propia.' },
  derived: { label: 'Derivado', color: 'amber', desc: 'Se calcula en tiempo de consulta, no se almacena.' },
  pk: { label: 'Clave Primaria (PK)', color: 'violet', desc: 'Identificador único e inmutable.' },
}

export default function AttributeClassifierLab() {
  const [selections, setSelections] = useState<Record<string, AttributeType>>({})
  const [checked, setChecked] = useState(false)

  const handleSelect = (attrName: string, type: AttributeType) => {
    setChecked(false)
    setSelections((prev) => ({ ...prev, [attrName]: type }))
  }

  const score = attributeSamples.reduce((acc, sample) => acc + (selections[sample.name] === sample.correct ? 1 : 0), 0)

  return (
    <section className="attribute-lab-card panel-card">
      <div className="card-heading">
        <div>
          <span className="eyebrow">Laboratorio de Atributos</span>
          <h2>Aprende a clasificar cada dato antes de tocar SQL</h2>
          <p className="card-desc">No todos los atributos se guardan igual: algunos se aplanan, otros se calculan y otros crean tablas.</p>
        </div>
        <span className="score-badge"><Sparkles size={14} /> {score}/{attributeSamples.length} correctos</span>
      </div>

      <div className="attribute-samples-grid">
        {attributeSamples.map((sample) => {
          const userVal = selections[sample.name]
          const isCorrect = userVal === sample.correct

          return (
            <article key={sample.name} className={`attribute-card-item ${checked ? (isCorrect ? 'item-correct' : 'item-wrong') : ''}`}>
              <div className="attribute-card-top">
                <span className="code-tag">{sample.name}</span>
                <small>{sample.context}</small>
              </div>

              <div className="type-buttons-row">
                {(Object.keys(typeLabels) as AttributeType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`type-btn ${userVal === type ? `type-active-${typeLabels[type].color}` : ''}`}
                    onClick={() => handleSelect(sample.name, type)}
                  >
                    {typeLabels[type].label}
                  </button>
                ))}
              </div>

              {checked && (
                <div className={`attribute-feedback ${isCorrect ? 'success' : 'warning'}`}>
                  {isCorrect ? <Check size={14} /> : <CircleHelp size={14} />}
                  <span>{sample.hint}</span>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <div className="attribute-lab-footer">
        <div className="attribute-guideline">
          <Lightbulb size={16} />
          <span><b>Regla de Oro:</b> Si un dato se calcula (ej. subtotal = precio * cantidad), déjalo como vista o cálculo en tiempo de consulta. Nunca dupliques cálculos sin necesidad de rendimiento justificada.</span>
        </div>
        <button className="primary-button small-button" type="button" onClick={() => setChecked(true)}>
          Verificar clasificación <Check size={14} />
        </button>
      </div>
    </section>
  )
}
