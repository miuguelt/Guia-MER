import { ArrowRight, CheckCircle2, CircleAlert, HelpCircle, Lightbulb, ListChecks, Sparkles } from 'lucide-react'
import type { ModuleKey } from '../../../data/course'
import type { EvidenceItem } from '../types'

interface ApprenticeInteractiveChecklistProps {
  evidences: EvidenceItem[]
  progressPercent: number
  completedCount: number
  totalEvidences: number
  onNavigate: (module: ModuleKey) => void
}

export default function ApprenticeInteractiveChecklist({
  evidences,
  progressPercent,
  completedCount,
  totalEvidences,
  onNavigate,
}: ApprenticeInteractiveChecklistProps) {
  return (
    <section className="panel-card sena-apprentice-checklist-panel">
      <div className="card-heading">
        <div>
          <span className="eyebrow">Autoevaluación Formativa Paso a Paso</span>
          <h3>Lista de Chequeo Técnico para el Aprendiz</h3>
        </div>
        <div className="checklist-summary-badge">
          <ListChecks size={18} />
          <span>
            <b>{completedCount}</b> de <b>{totalEvidences}</b> cumplidos ({progressPercent}%)
          </span>
        </div>
      </div>

      <p className="checklist-intro-text">
        Como aprendiz de desarrollo de software, esta lista te permite comprobar si tu modelo de datos cumple con las
        buenas prácticas de la industria antes de enviarlo a revisión con el instructor. Revisa cada evidencia y sus
        tres indicadores observables:
      </p>

      <div className="apprentice-checklist-grid">
        {evidences.map((ev) => (
          <article
            key={ev.code}
            className={`apprentice-checklist-card ${ev.isCompleted ? 'is-complete' : 'is-pending'}`}
          >
            <div className="checklist-card-header">
              <div className="card-header-meta">
                <span className="ev-code-pill">{ev.code}</span>
                <span className="ev-phase-pill">{ev.phase}</span>
              </div>
              <span className={`badge ${ev.isCompleted ? 'badge--success' : 'badge--warning'}`}>
                {ev.isCompleted ? '✓ CUMPLIDO' : '○ PENDIENTE'}
              </span>
            </div>

            <h4 className="checklist-card-title">{ev.name}</h4>
            <div className="checklist-instrument-tag">Instrumento: {ev.instrument}</div>

            {ev.beginnerExplanation && (
              <div className="checklist-beginner-tip">
                <Lightbulb size={16} className="tip-icon" />
                <div>
                  <strong>¿Qué significa para un principiante?</strong>
                  <p>{ev.beginnerExplanation}</p>
                </div>
              </div>
            )}

            {ev.indicators && ev.indicators.length > 0 && (
              <div className="checklist-indicators-section">
                <span className="indicators-label">Indicadores observables en tu proyecto:</span>
                <ul className="indicators-list">
                  {ev.indicators.map((ind, i) => (
                    <li key={i} className={`indicator-item ${ind.pass ? 'pass' : 'fail'}`}>
                      <span className="indicator-icon">
                        {ind.pass ? <CheckCircle2 size={14} /> : <CircleAlert size={14} />}
                      </span>
                      <div className="indicator-body">
                        <span className="indicator-text">{ind.label}</span>
                        {ind.tip && <small className="indicator-tip">{ind.tip}</small>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="checklist-diagnostic-box">
              <span className="diag-label">Estado actual registrado:</span>
              <p className="diag-text">{ev.detail}</p>
            </div>

            <div className="checklist-card-footer">
              {!ev.isCompleted ? (
                <button
                  type="button"
                  className="primary-button small-button"
                  onClick={() => onNavigate(ev.stationModule)}
                >
                  Ir a Estación a resolverlo <ArrowRight size={14} />
                </button>
              ) : (
                <span className="checklist-verified-note">
                  <CheckCircle2 size={15} /> Criterio verificado en tu espacio local
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Caja de consejos para la sustentación ante el instructor */}
      <div className="instructor-defense-tips panel-card">
        <div className="tips-header">
          <Sparkles size={18} className="color-amber" />
          <h4>Consejos para defender tu modelo ante el Instructor</h4>
        </div>
        <div className="defense-tips-grid">
          <div className="tip-card">
            <strong>1. Explica el porqué de las relaciones</strong>
            <p>
              El instructor no evaluará si memorizaste la definición de cardinalidad. Te preguntará: <i>«¿Por qué un cliente tiene muchas órdenes pero una orden pertenece a un solo cliente?»</i> Explica la regla de negocio con ejemplos reales.
            </p>
          </div>
          <div className="tip-card">
            <strong>2. Justifica tus tablas puente (N:M)</strong>
            <p>
              Muestra dónde almacenas datos propios de la interacción (como la cantidad de repuestos en una orden, o la fecha de matrícula de un curso). Las tablas puente casi nunca van vacías.
            </p>
          </div>
          <div className="tip-card">
            <strong>3. Demuestra la integridad referencial</strong>
            <p>
              Explica qué restricciones (<code>NOT NULL</code>, <code>UNIQUE</code>, <code>RESTRICT</code>) agregaste para que nadie pueda insertar una orden sin cliente o borrar historiales contables por accidente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
