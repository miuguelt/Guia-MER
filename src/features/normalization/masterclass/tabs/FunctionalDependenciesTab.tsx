import { ArrowRight, Zap } from 'lucide-react'
import type { FunctionalDependency } from '../masterclassTypes'

interface FunctionalDependenciesTabProps {
  selectedAttr: string
  setSelectedAttr: (attr: string) => void
  functionalDependencies: Record<string, FunctionalDependency>
  onNext: () => void
}

export default function FunctionalDependenciesTab({
  selectedAttr,
  setSelectedAttr,
  functionalDependencies,
  onNext,
}: FunctionalDependenciesTabProps) {
  const current = functionalDependencies[selectedAttr] ?? functionalDependencies.nombre_producto

  return (
    <div className="nm-tab-pane" style={{ paddingTop: '18px' }}>
      <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--line)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)' }}>
          <Zap size={18} />
          <strong style={{ fontSize: '13px' }}>Inspector Interactivo de Dependencias Funcionales</strong>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.6 }}>
          La normalización matemática se basa en una sola pregunta: <strong>¿Qué campo determina el valor de cuál otro?</strong> ($X \to Y$).
          Haz clic en cualquier atributo a continuación para analizar su dependencia y ver exactamente por qué se queda o se separa en otra tabla:
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 0.85fr) minmax(320px, 1.15fr)', gap: '16px', alignItems: 'start' }}>
        {/* LISTA DE ATRIBUTOS PARA PROBAR */}
        <div style={{ display: 'grid', gap: '8px' }}>
          <span style={{ fontSize: '10px', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 800 }}>
            Selecciona un atributo a auditar:
          </span>
          {Object.keys(functionalDependencies).map((key) => {
            const dep = functionalDependencies[key]
            const isSelected = selectedAttr === key
            return (
              <div
                key={key}
                className={`nm-dep-card ${isSelected ? 'is-active' : ''}`}
                onClick={() => setSelectedAttr(key)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontSize: '11px', color: isSelected ? 'var(--cyan)' : 'var(--ink)', fontWeight: 700 }}>
                    {key}
                  </code>
                  <span
                    style={{
                      fontSize: '9px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: dep.type === 'total' || dep.type === 'snapshot' ? 'color-mix(in srgb, var(--lime) 15%, transparent)' : 'color-mix(in srgb, var(--rose) 15%, transparent)',
                      color: dep.type === 'total' || dep.type === 'snapshot' ? 'var(--lime)' : 'var(--rose)',
                      fontWeight: 700,
                    }}
                  >
                    {dep.type === 'partial' ? 'Parcial' : dep.type === 'transitive' ? 'Transitiva' : dep.type === 'snapshot' ? 'Snapshot' : 'Total'}
                  </span>
                </div>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', marginTop: '4px' }}>
                  {dep.attribute}
                </small>
              </div>
            )
          })}
        </div>

        {/* PANEL DE ANÁLISIS DE LA DEPENDENCIA */}
        <div style={{ padding: '18px', borderRadius: '10px', background: 'var(--surface-3)', border: '1px solid var(--line-strong)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span className="eyebrow" style={{ color: current.type === 'partial' ? 'var(--amber)' : current.type === 'transitive' ? 'var(--rose)' : 'var(--lime)' }}>
              {current.label}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--faint)' }}>Tabla origen: {current.tableOrigin}</span>
          </div>

          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--line)', marginBottom: '14px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: 'var(--faint)', display: 'block', marginBottom: '4px' }}>Notación Funcional:</span>
            <code style={{ fontSize: '13px', color: 'var(--cyan)', fontWeight: 800 }}>
              {current.arrowNotation}
            </code>
          </div>

          <div style={{ display: 'grid', gap: '10px', fontSize: '11px', lineHeight: 1.5 }}>
            <div>
              <strong style={{ color: 'var(--ink)' }}>Clave primaria en juego: </strong>
              <code style={{ color: 'var(--amber)' }}>{current.pkCandidate}</code>
            </div>
            <div>
              <strong style={{ color: 'var(--rose)' }}>Diagnóstico del problema:</strong>
              <p style={{ margin: '3px 0 0', color: 'var(--muted)' }}>{current.problem}</p>
            </div>
            <div>
              <strong style={{ color: 'var(--lime)' }}>Solución relacional aplicada:</strong>
              <p style={{ margin: '3px 0 0', color: 'var(--muted)' }}>{current.solution}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="primary-button" onClick={onNext} style={{ fontSize: '11px' }}>
          Siguiente: Ver el Dilema del Precio Histórico <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
