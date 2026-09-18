import { ArrowRight } from 'lucide-react'

interface HistoricalPriceTabProps {
  catalogPrice: number
  setCatalogPrice: (price: number) => void
  onNext: () => void
}

export default function HistoricalPriceTab({
  catalogPrice,
  setCatalogPrice,
  onNext,
}: HistoricalPriceTabProps) {
  return (
    <div className="nm-tab-pane" style={{ paddingTop: '18px' }}>
      <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--line)', marginBottom: '16px' }}>
        <span className="eyebrow" style={{ color: 'var(--amber)' }}>Pregunta Clásica del Aprendiz</span>
        <h3 style={{ margin: '4px 0 8px', fontSize: '16px' }}>
          ¿Por qué el precio unitario se guarda en <code>detalle_factura</code> si ya existe en <code>producto</code>?
        </h3>
        <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
          A primera vista, parece una duplicación que violaría la normalización. Sin embargo, en la ingeniería de software profesional hay una diferencia vital entre un <strong>Atributo Dinámico</strong> y un <strong>Snapshot Temporal Inmutable</strong>.
          ¡Usa el control deslizante interactivo abajo para comprobarlo tú mismo!
        </p>
      </div>

      {/* SIMULADOR INTERACTIVO DE PRECIO */}
      <div style={{ padding: '18px', borderRadius: '12px', background: 'var(--surface-3)', border: '1px solid var(--line-strong)', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div>
            <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>Simulador de Cambio de Precio por Inflación:</strong>
            <span style={{ fontSize: '11px', color: 'var(--faint)', display: 'block' }}>
              Modifica el precio actual del Taladro en el catálogo y observa cómo reacciona la factura histórica:
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--cyan)' }}>
              $ {catalogPrice.toLocaleString('es-CO')} COP
            </span>
            <button
              type="button"
              className="soft-button"
              onClick={() => setCatalogPrice(250000)}
              style={{ fontSize: '10px', padding: '4px 8px' }}
            >
              Reiniciar a $ 250.000
            </button>
          </div>
        </div>

        <input
          type="range"
          min="150000"
          max="500000"
          step="10000"
          value={catalogPrice}
          onChange={(e) => setCatalogPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--cyan)', cursor: 'pointer', marginBottom: '16px' }}
        />

        {/* COMPARACIÓN DE DOS PANELES LADO A LADO */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* PANEL 1: CATÁLOGO ACTUAL */}
          <div style={{ padding: '14px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
            <span style={{ fontSize: '10px', color: 'var(--lime)', fontWeight: 800, textTransform: 'uppercase' }}>
              1. En la tabla PRODUCTO (Dato Dinámico HOY)
            </span>
            <div style={{ margin: '8px 0', fontSize: '11px' }}>
              <div><strong>Código:</strong> PRD-01</div>
              <div><strong>Descripción:</strong> Taladro Percutor</div>
              <div>
                <strong>precio_catalogo_base: </strong>
                <span style={{ color: 'var(--lime)', fontWeight: 800 }}>$ {catalogPrice.toLocaleString('es-CO')}</span>
              </div>
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', background: 'color-mix(in srgb, var(--lime) 8%, transparent)', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.4 }}>
              💡 <strong>Comportamiento:</strong> Este es el precio vigente en mostrador. Aplica a cualquier cliente que entre a comprar <strong>hoy o mañana</strong>.
            </div>
          </div>

          {/* PANEL 2: FACTURA HISTÓRICA */}
          <div style={{ padding: '14px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
            <span style={{ fontSize: '10px', color: 'var(--cyan)', fontWeight: 800, textTransform: 'uppercase' }}>
              2. En DETALLE_FACTURA (FACT-1001 del 17 de Septiembre)
            </span>
            <div style={{ margin: '8px 0', fontSize: '11px' }}>
              <div><strong>Factura:</strong> FACT-1001 (Emitida a Carlos Mendoza)</div>
              <div><strong>Cantidad:</strong> 1 unidad</div>
              <div>
                <strong>precio_unitario_venta: </strong>
                <span style={{ color: 'var(--cyan)', fontWeight: 800 }}>$ 250.000 COP (¡INMUTABLE!)</span>
              </div>
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', background: 'color-mix(in srgb, var(--cyan) 8%, transparent)', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.4 }}>
              🔒 <strong>Comportamiento:</strong> Aunque el precio de venta suba hoy a ${catalogPrice.toLocaleString('es-CO')}, la factura de Carlos permanece en $250.000. Protege la validez contable, fiscal y legal.
            </div>
          </div>
        </div>
      </div>

      {/* CUADRO COMPARATIVO TÉCNICO */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '8px' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--surface-3)', color: 'var(--faint)' }}>
            <tr>
              <th style={{ padding: '8px' }}>Concepto</th>
              <th style={{ padding: '8px' }}>producto.precio_catalogo_base</th>
              <th style={{ padding: '8px' }}>detalle_factura.precio_unitario_venta</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '8px', fontWeight: 700 }}>Naturaleza del dato</td>
              <td style={{ padding: '8px', color: 'var(--lime)' }}>Dato descriptivo actual del artículo</td>
              <td style={{ padding: '8px', color: 'var(--cyan)' }}>Snapshot histórico inmutable de la transacción</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '8px', fontWeight: 700 }}>¿Cuándo cambia?</td>
              <td style={{ padding: '8px' }}>Cada vez que la empresa actualiza tarifas</td>
              <td style={{ padding: '8px' }}><strong>NUNCA.</strong> Se congela en el momento del INSERT</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', fontWeight: 700 }}>¿Viola la 3FN?</td>
              <td style={{ padding: '8px' }}>No, depende directamente de cod_producto</td>
              <td style={{ padding: '8px' }}>No, porque refleja el precio acordado para esa venta específica</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="primary-button" onClick={onNext} style={{ fontSize: '11px' }}>
          Resolver Desafío Práctico (Orden de Compra) <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
