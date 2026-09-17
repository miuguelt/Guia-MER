import { useState } from 'react'
import { Database, AlertTriangle, CheckCircle } from 'lucide-react'
import { sqlDataTypesGuide } from '../../data/rulesData'

export default function SqlDataTypeCheatSheet() {
  const [activeCategory, setActiveCategory] = useState(0)
  const current = sqlDataTypesGuide[activeCategory]

  return (
    <section className="sql-types-cheatsheet panel-card">
      <div className="card-heading">
        <div>
          <span className="eyebrow">Guía de Tipado Físico</span>
          <h2>Cómo elegir el tipo de dato SQL exacto para cada atributo</h2>
          <p className="card-desc">Un tipo de dato incorrecto desperdicia espacio en disco, introduce errores de redondeo o rompe consultas de fecha.</p>
        </div>
        <span className="accent-icon bg-rose"><Database size={18} /></span>
      </div>

      <div className="category-tabs-row">
        {sqlDataTypesGuide.map((cat, idx) => (
          <button
            key={cat.category}
            type="button"
            className={`cat-tab-btn ${activeCategory === idx ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(idx)}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div className="types-cards-grid">
        {current.types.map((t) => (
          <article key={t.name} className="type-card-item">
            <div className="type-card-head">
              <span className="type-name-badge">{t.name}</span>
              <code>{t.example}</code>
            </div>
            <p className="type-best-for">{t.bestFor}</p>
            {t.warning && (
              <div className="type-warning-alert">
                <AlertTriangle size={14} />
                <span>{t.warning}</span>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="constraints-summary-strip">
        <div className="constraint-badge-pill"><CheckCircle size={14} /><b>PRIMARY KEY:</b> Identificador único no nulo.</div>
        <div className="constraint-badge-pill"><CheckCircle size={14} /><b>FOREIGN KEY:</b> Garantiza enlace con tabla padre existente.</div>
        <div className="constraint-badge-pill"><CheckCircle size={14} /><b>NOT NULL:</b> Obligatoriedad de presencia del dato.</div>
        <div className="constraint-badge-pill"><CheckCircle size={14} /><b>UNIQUE:</b> Prohíbe duplicados (ej. email, documento).</div>
        <div className="constraint-badge-pill"><CheckCircle size={14} /><b>CHECK:</b> Validación lógica (ej. precio {'>='} 0).</div>
        <div className="constraint-badge-pill"><CheckCircle size={14} /><b>DEFAULT:</b> Valor automático si no se envía (ej. NOW()).</div>
      </div>
    </section>
  )
}
