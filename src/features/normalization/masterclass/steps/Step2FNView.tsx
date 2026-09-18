import { ArrowRight, CheckCircle2, Database } from 'lucide-react'

interface Step2FNViewProps {
  onPrev: () => void
  onNext: () => void
}

export default function Step2FNView({ onPrev, onNext }: Step2FNViewProps) {
  return (
    <div>
      <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'color-mix(in srgb, var(--amber) 8%, var(--surface-2))', border: '1px solid color-mix(in srgb, var(--amber) 30%, transparent)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--amber)', fontWeight: 700, fontSize: '12px' }}>
          <CheckCircle2 size={16} /> Regla de la 2FN: Dependencia Funcional Completa
        </div>
        <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.5 }}>
          En tablas con clave compuesta <code>(num_factura, cod_producto)</code>, <strong>ningún campo puede depender de solo una parte de la clave</strong>.
          La descripción del producto depende únicamente de <code>cod_producto</code>. La fecha depende solo de <code>num_factura</code>.
          ¡Extraemos el producto a su propia tabla maestra!
        </p>
      </div>

      {/* LAS 3 TABLAS RESULTANTES DE 2FN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {/* TABLA 1: PRODUCTO */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--lime)', fontWeight: 700, fontSize: '11px', marginBottom: '8px' }}>
            <Database size={13} /> TABLA: producto (PK simple: cod_producto)
          </div>
          <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--faint)', borderBottom: '1px solid var(--line)' }}>
                <th style={{ textAlign: 'left', padding: '4px' }}>cod_producto (PK)</th>
                <th style={{ textAlign: 'left', padding: '4px' }}>nombre_producto</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '4px', color: 'var(--lime)', fontWeight: 700 }}>PRD-01</td><td style={{ padding: '4px' }}>Taladro Percutor</td></tr>
              <tr><td style={{ padding: '4px', color: 'var(--lime)', fontWeight: 700 }}>PRD-05</td><td style={{ padding: '4px' }}>Juego de Brocas</td></tr>
              <tr><td style={{ padding: '4px', color: 'var(--lime)', fontWeight: 700 }}>PRD-12</td><td style={{ padding: '4px' }}>Cinta Métrica 5m</td></tr>
            </tbody>
          </table>
          <small style={{ color: 'var(--faint)', display: 'block', marginTop: '8px', fontSize: '9px' }}>
            ✔ Ya no se repite el nombre del taladro en cada venta.
          </small>
        </div>

        {/* TABLA 2: DETALLE_FACTURA (ASOCIATIVA) */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyan)', fontWeight: 700, fontSize: '11px', marginBottom: '8px' }}>
            <Database size={13} /> TABLA: detalle_factura (PK compuesta: num_factura + cod_producto)
          </div>
          <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--faint)', borderBottom: '1px solid var(--line)' }}>
                <th style={{ textAlign: 'left', padding: '4px' }}>num_factura (PK,FK)</th>
                <th style={{ textAlign: 'left', padding: '4px' }}>cod_producto (PK,FK)</th>
                <th style={{ textAlign: 'center', padding: '4px' }}>cantidad</th>
                <th style={{ textAlign: 'right', padding: '4px' }}>precio_unit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '4px' }}>FACT-1001</td><td style={{ padding: '4px' }}>PRD-01</td><td style={{ textAlign: 'center', padding: '4px' }}>1</td><td style={{ textAlign: 'right', padding: '4px' }}>$ 250.000</td></tr>
              <tr><td style={{ padding: '4px' }}>FACT-1001</td><td style={{ padding: '4px' }}>PRD-05</td><td style={{ textAlign: 'center', padding: '4px' }}>2</td><td style={{ textAlign: 'right', padding: '4px' }}>$ 40.000</td></tr>
              <tr><td style={{ padding: '4px' }}>FACT-1001</td><td style={{ padding: '4px' }}>PRD-12</td><td style={{ textAlign: 'center', padding: '4px' }}>3</td><td style={{ textAlign: 'right', padding: '4px' }}>$ 15.000</td></tr>
              <tr><td style={{ padding: '4px' }}>FACT-1002</td><td style={{ padding: '4px' }}>PRD-05</td><td style={{ textAlign: 'center', padding: '4px' }}>1</td><td style={{ textAlign: 'right', padding: '4px' }}>$ 40.000</td></tr>
            </tbody>
          </table>
          <small style={{ color: 'var(--faint)', display: 'block', marginTop: '8px', fontSize: '9px' }}>
            ✔ Cantidad y precio dependen de ambos identificadores.
          </small>
        </div>

        {/* TABLA 3: FACTURA CABECERA */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber)', fontWeight: 700, fontSize: '11px', marginBottom: '8px' }}>
            <Database size={13} /> TABLA: factura_2fn (PK simple: num_factura)
          </div>
          <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--faint)', borderBottom: '1px solid var(--line)' }}>
                <th style={{ textAlign: 'left', padding: '4px' }}>num_factura (PK)</th>
                <th style={{ textAlign: 'left', padding: '4px' }}>fecha</th>
                <th style={{ textAlign: 'left', padding: '4px' }}>cliente_doc</th>
                <th style={{ textAlign: 'left', padding: '4px' }}>cliente_nom</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '4px', color: 'var(--cyan)', fontWeight: 700 }}>FACT-1001</td><td style={{ padding: '4px' }}>2026-09-17</td><td style={{ padding: '4px' }}>10203040</td><td style={{ padding: '4px' }}>Carlos Mendoza</td></tr>
              <tr><td style={{ padding: '4px', color: 'var(--cyan)', fontWeight: 700 }}>FACT-1002</td><td style={{ padding: '4px' }}>2026-09-17</td><td style={{ padding: '4px' }}>10203040</td><td style={{ padding: '4px' }}>Carlos Mendoza</td></tr>
            </tbody>
          </table>
          <small style={{ color: 'var(--amber)', display: 'block', marginTop: '8px', fontSize: '9px' }}>
            ⚠️ ¡Atención! cliente_nom depende de cliente_doc, no de la factura. ¡Falta la 3FN!
          </small>
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="soft-button" onClick={onPrev} style={{ fontSize: '11px' }}>
          Volver a 1FN
        </button>
        <button type="button" className="primary-button" onClick={onNext} style={{ fontSize: '11px' }}>
          Avanzar al Paso 3: Aplicar Tercera Forma Normal (3FN) <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
