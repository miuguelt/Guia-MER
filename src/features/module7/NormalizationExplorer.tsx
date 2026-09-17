import { useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronRight, Database, Split, Zap } from 'lucide-react'
import { normalizationStages } from '../../data/normalizationData'

export default function NormalizationExplorer() {
  const [selectedNf, setSelectedNf] = useState<'1FN' | '2FN' | '3FN'>('1FN')
  const stage = normalizationStages.find((s) => s.nf === selectedNf) ?? normalizationStages[0]

  return (
    <section className="normalization-explorer panel-card">
      <div className="card-heading">
        <div>
          <span className="eyebrow">Laboratorio de Calidad Arquitectónica</span>
          <h2>Normalización en la Práctica: 1FN, 2FN y 3FN</h2>
          <p className="card-desc">
            La normalización no es teoría académica: es el método paso a paso para erradicar las redundancias y proteger la integridad de tus datos.
          </p>
        </div>
        <span className="accent-icon bg-lime"><Zap size={18} /></span>
      </div>

      <div className="nf-tabs-row">
        {normalizationStages.map((s) => (
          <button
            key={s.nf}
            type="button"
            className={`nf-tab-btn ${selectedNf === s.nf ? 'is-active' : ''}`}
            onClick={() => setSelectedNf(s.nf)}
          >
            <b>{s.nf}</b>
            <span>{s.name.split(':')[1]}</span>
          </button>
        ))}
      </div>

      <div className="nf-content-body">
        <div className="nf-rule-callout">
          <div className="callout-badge">{stage.nf}</div>
          <div>
            <strong>Regla Fundamental:</strong>
            <p>{stage.rule}</p>
          </div>
        </div>

        <div className="nf-comparison-layout">
          {/* TABLA ANTES DE NORMALIZAR */}
          <div className="nf-table-side bad-side">
            <div className="side-title color-rose">
              <AlertCircle size={15} />
              <span>Antes: Tabla con Anomalía ({stage.badTable.name})</span>
            </div>
            <div className="table-scroll-container">
              <table className="mini-norm-table">
                <thead>
                  <tr>
                    {stage.badTable.columns.map((col) => <th key={col}>{col}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {stage.badTable.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={cell.includes(',') ? 'danger-cell' : ''}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="anomaly-explanation-card">
              <span className="eyebrow">Anomalía Detectada:</span>
              <p>{stage.anomalyDetected}</p>
            </div>
          </div>

          <div className="nf-transform-arrow">
            <ChevronRight size={28} />
            <small>Descomposición</small>
          </div>

          {/* TABLAS DESPUÉS DE NORMALIZAR */}
          <div className="nf-table-side good-side">
            <div className="side-title color-lime">
              <CheckCircle2 size={15} />
              <span>Después: Esquema Normalizado en {stage.nf}</span>
            </div>
            <div className="fixed-tables-stack">
              {stage.fixedTables.map((tbl) => (
                <div key={tbl.name} className="fixed-table-box">
                  <div className="fixed-tbl-head">
                    <Database size={13} />
                    <strong>{tbl.name}</strong>
                    <small>{tbl.keyNote}</small>
                  </div>
                  <div className="table-scroll-container">
                    <table className="mini-norm-table clean-table">
                      <thead>
                        <tr>
                          {tbl.columns.map((c) => <th key={c}>{c}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {tbl.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => <td key={cIdx}>{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIMULADOR INTERACTIVO DE IMPACTO */}
        <div className="nf-sim-box" style={{ marginTop: '16px', padding: '14px', borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <span className="eyebrow" style={{ color: 'var(--lime)' }}>Simulación Interactiva de Impacto en Base de Datos</span>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Experimenta la diferencia en tiempo de ejecución:</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginTop: '10px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'color-mix(in srgb, var(--rose) 8%, var(--surface))', border: '1px solid color-mix(in srgb, var(--rose) 30%, transparent)' }}>
              <strong style={{ color: 'var(--rose)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                ❌ Consecuencia en Tabla Desnormalizada:
              </strong>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5 }}>
                {stage.nf === '1FN'
                  ? 'Las búsquedas requieren escaneo secuencial (TABLE SCAN) con LIKE \'%Mouse%\', imposibilitando el uso de índices B-Tree y forzando casteo de texto para calcular sumatorias.'
                  : stage.nf === '2FN'
                  ? 'Si el teclado cambia de descripción, debes ejecutar un UPDATE masivo en toda la tabla transaccional. Si una sola fila falla o se omite, se genera una anomalía de inconsistencia.'
                  : 'Si se modifica el nombre de la ciudad o departamento de un código postal, debes actualizar miles de registros de clientes, bloqueando tablas (locks) innecesariamente.'}
              </p>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'color-mix(in srgb, var(--lime) 8%, var(--surface))', border: '1px solid color-mix(in srgb, var(--lime) 30%, transparent)' }}>
              <strong style={{ color: 'var(--lime)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                ✅ Garantía del Esquema Normalizado en {stage.nf}:
              </strong>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5 }}>
                {stage.nf === '1FN'
                  ? 'Cada producto es una fila atómica indexable. Puedes ejecutar SELECT COUNT(*), aplicar constraints CHECK numéricos y realizar JOINs relacionales puros a velocidad máxima.'
                  : stage.nf === '2FN'
                  ? 'El nombre y categoría residen en PRODUCTO una sola vez (SSoT). La actualización toma 1 milisegundo en 1 sola fila y todos los pedidos históricos leen el dato consistente.'
                  : 'La ubicación geográfica reside en UBICACION_POSTAL. Los clientes solo conservan la clave foránea, manteniendo el tamaño de la tabla cliente compacto y los índices ágiles.'}
              </p>
            </div>
          </div>
        </div>

        <div className="nf-how-to-steps" style={{ marginTop: '16px' }}>
          <span className="eyebrow">¿Cómo lograr que tu modelo cumpla {stage.nf}?</span>
          <div className="steps-chips-row">
            {stage.howToAchieve.map((step, idx) => (
              <div key={idx} className="step-chip">
                <Split size={14} />
                <span><b>Paso {idx + 1}:</b> {step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
