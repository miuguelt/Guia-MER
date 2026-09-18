import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface Step1FNViewProps {
  onPrev: () => void
  onNext: () => void
}

export default function Step1FNView({ onPrev, onNext }: Step1FNViewProps) {
  return (
    <div>
      <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'color-mix(in srgb, var(--cyan) 8%, var(--surface-2))', border: '1px solid color-mix(in srgb, var(--cyan) 30%, transparent)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', fontWeight: 700, fontSize: '12px' }}>
          <CheckCircle2 size={16} /> Regla de la 1FN: Atomicidad y Clave Primaria
        </div>
        <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.5 }}>
          Desglosamos las listas en filas individuales. Cada celda ahora contiene un solo dato indivisible.
          Como <code>num_factura</code> se repite, la clave primaria pasa a ser compuesta: <strong>(num_factura + cod_producto)</strong>.
        </p>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '8px' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--surface-3)', color: 'var(--faint)' }}>
            <tr>
              <th style={{ padding: '8px', color: 'var(--cyan)' }}>num_factura (PK 1)</th>
              <th style={{ padding: '8px', color: 'var(--lime)' }}>cod_producto (PK 2)</th>
              <th style={{ padding: '8px' }}>fecha</th>
              <th style={{ padding: '8px' }}>cliente_doc</th>
              <th style={{ padding: '8px' }}>cliente_nom</th>
              <th style={{ padding: '8px' }}>ciudad</th>
              <th style={{ padding: '8px' }}>desc_producto</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>cant</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>precio_unit</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--cyan)' }}>FACT-1001</td>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--lime)' }}>PRD-01</td>
              <td style={{ padding: '8px' }}>2026-09-17</td>
              <td style={{ padding: '8px' }}>10203040</td>
              <td style={{ padding: '8px' }}>Carlos Mendoza</td>
              <td style={{ padding: '8px' }}>Medellín</td>
              <td style={{ padding: '8px' }}>Taladro Percutor</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>$ 250.000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--cyan)' }}>FACT-1001</td>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--lime)' }}>PRD-05</td>
              <td style={{ padding: '8px' }}>2026-09-17</td>
              <td style={{ padding: '8px' }}>10203040</td>
              <td style={{ padding: '8px' }}>Carlos Mendoza</td>
              <td style={{ padding: '8px' }}>Medellín</td>
              <td style={{ padding: '8px' }}>Juego de Brocas</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>2</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>$ 40.000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--cyan)' }}>FACT-1001</td>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--lime)' }}>PRD-12</td>
              <td style={{ padding: '8px' }}>2026-09-17</td>
              <td style={{ padding: '8px' }}>10203040</td>
              <td style={{ padding: '8px' }}>Carlos Mendoza</td>
              <td style={{ padding: '8px' }}>Medellín</td>
              <td style={{ padding: '8px' }}>Cinta Métrica 5m</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>3</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>$ 15.000</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--cyan)' }}>FACT-1002</td>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--lime)' }}>PRD-05</td>
              <td style={{ padding: '8px' }}>2026-09-17</td>
              <td style={{ padding: '8px' }}>10203040</td>
              <td style={{ padding: '8px' }}>Carlos Mendoza</td>
              <td style={{ padding: '8px' }}>Medellín</td>
              <td style={{ padding: '8px' }}>Juego de Brocas</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>1</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>$ 40.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* BALANCE CRÍTICO DE 1FN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
        <div style={{ padding: '12px', borderRadius: '8px', background: 'color-mix(in srgb, var(--lime) 8%, var(--surface))', border: '1px solid color-mix(in srgb, var(--lime) 25%, transparent)' }}>
          <strong style={{ color: 'var(--lime)', fontSize: '11px', display: 'block', marginBottom: '4px' }}>✅ Lo que ganamos en 1FN:</strong>
          <span style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Cero arrays o celdas compuestas. Podemos calcular sumas directas con SQL <code>SUM(cant * precio_unit)</code> y hacer filtros exactos.
          </span>
        </div>
        <div style={{ padding: '12px', borderRadius: '8px', background: 'color-mix(in srgb, var(--amber) 8%, var(--surface))', border: '1px solid color-mix(in srgb, var(--amber) 25%, transparent)' }}>
          <strong style={{ color: 'var(--amber)', fontSize: '11px', display: 'block', marginBottom: '4px' }}>⚠️ El grave problema que persiste:</strong>
          <span style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5 }}>
            ¡Redundancia masiva! Carlos Mendoza, su documento y ciudad se repiten 4 veces. La descripción del producto se repite cada vez que se vende. Aquí interviene la 2FN.
          </span>
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="soft-button" onClick={onPrev} style={{ fontSize: '11px' }}>
          Volver a 0FN
        </button>
        <button type="button" className="primary-button" onClick={onNext} style={{ fontSize: '11px' }}>
          Avanzar al Paso 2: Aplicar Segunda Forma Normal (2FN) <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
