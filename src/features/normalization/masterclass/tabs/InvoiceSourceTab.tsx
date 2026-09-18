import { ArrowRight } from 'lucide-react'
import type { InvoiceHotspot } from '../masterclassTypes'

interface InvoiceSourceTabProps {
  hotspot: InvoiceHotspot
  setHotspot: (val: InvoiceHotspot) => void
  onGoToSteps: () => void
}

export default function InvoiceSourceTab({
  hotspot,
  setHotspot,
  onGoToSteps,
}: InvoiceSourceTabProps) {
  return (
    <div className="nm-tab-pane" style={{ paddingTop: '18px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(280px, 0.85fr)', gap: '20px', alignItems: 'start' }}>
        {/* FACTURA ESTILIZADA */}
        <div className="nm-invoice-paper">
          {/* CABECERA FACTURA */}
          <div
            onClick={() => setHotspot('header')}
            className="nm-hotspot-zone"
            style={{
              border: hotspot === 'header' ? '2px solid var(--cyan)' : '1px dashed var(--line)',
              background: hotspot === 'header' ? 'color-mix(in srgb, var(--cyan) 10%, transparent)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block' }}>FERRETERÍA EL TORNILLO FELIZ S.A.S.</strong>
                <span style={{ fontSize: '10px', color: 'var(--muted)' }}>NIT: 900.876.543-1 · Régimen Común</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: 'var(--surface-3)', color: 'var(--cyan)', fontSize: '11px', fontWeight: 800 }}>
                  FACTURA: FACT-1001
                </span>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: '10px', marginTop: '3px' }}>Fecha: 2026-09-17</small>
              </div>
            </div>
          </div>

          {/* DATOS DEL CLIENTE */}
          <div
            onClick={() => setHotspot('client')}
            className="nm-hotspot-zone"
            style={{
              border: hotspot === 'client' ? '2px solid var(--amber)' : '1px dashed var(--line)',
              background: hotspot === 'client' ? 'color-mix(in srgb, var(--amber) 10%, transparent)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--amber)', letterSpacing: '.05em' }}>
                Datos del Comprador (Cliente)
              </span>
              <span style={{ fontSize: '9px', color: 'var(--faint)' }}>Hacer clic para analizar</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
              <div><strong style={{ color: 'var(--muted)' }}>Identificación:</strong> CC 10203040</div>
              <div><strong style={{ color: 'var(--muted)' }}>Nombre:</strong> Carlos Mendoza</div>
              <div><strong style={{ color: 'var(--muted)' }}>Teléfono:</strong> 310 555 9876</div>
              <div><strong style={{ color: 'var(--muted)' }}>Dirección:</strong> Calle 45 # 12-30</div>
              <div><strong style={{ color: 'var(--muted)' }}>Ciudad:</strong> Medellín</div>
              <div><strong style={{ color: 'var(--muted)' }}>Departamento:</strong> Antioquia</div>
            </div>
          </div>

          {/* DETALLE DE PRODUCTOS */}
          <div
            onClick={() => setHotspot('items')}
            className="nm-hotspot-zone"
            style={{
              border: hotspot === 'items' ? '2px solid var(--lime)' : '1px dashed var(--line)',
              background: hotspot === 'items' ? 'color-mix(in srgb, var(--lime) 10%, transparent)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--lime)', letterSpacing: '.05em' }}>
                Cuerpo de Productos Vendidos (Detalle)
              </span>
              <span style={{ fontSize: '9px', color: 'var(--faint)' }}>Hacer clic para analizar</span>
            </div>
            <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)', color: 'var(--faint)' }}>
                  <th style={{ padding: '4px 2px' }}>Cód.</th>
                  <th style={{ padding: '4px 2px' }}>Descripción</th>
                  <th style={{ padding: '4px 2px', textAlign: 'center' }}>Cant.</th>
                  <th style={{ padding: '4px 2px', textAlign: 'right' }}>Unitario</th>
                  <th style={{ padding: '4px 2px', textAlign: 'right' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid color-mix(in srgb, var(--line) 40%, transparent)' }}>
                  <td style={{ padding: '6px 2px', color: 'var(--lime)', fontWeight: 700 }}>PRD-01</td>
                  <td style={{ padding: '6px 2px' }}>Taladro Percutor</td>
                  <td style={{ padding: '6px 2px', textAlign: 'center' }}>1</td>
                  <td style={{ padding: '6px 2px', textAlign: 'right' }}>$ 250.000</td>
                  <td style={{ padding: '6px 2px', textAlign: 'right' }}>$ 250.000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid color-mix(in srgb, var(--line) 40%, transparent)' }}>
                  <td style={{ padding: '6px 2px', color: 'var(--lime)', fontWeight: 700 }}>PRD-05</td>
                  <td style={{ padding: '6px 2px' }}>Juego de Brocas</td>
                  <td style={{ padding: '6px 2px', textAlign: 'center' }}>2</td>
                  <td style={{ padding: '6px 2px', textAlign: 'right' }}>$ 40.000</td>
                  <td style={{ padding: '6px 2px', textAlign: 'right' }}>$ 80.000</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 2px', color: 'var(--lime)', fontWeight: 700 }}>PRD-12</td>
                  <td style={{ padding: '6px 2px' }}>Cinta Métrica 5m</td>
                  <td style={{ padding: '6px 2px', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '6px 2px', textAlign: 'right' }}>$ 15.000</td>
                  <td style={{ padding: '6px 2px', textAlign: 'right' }}>$ 45.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PIE DE FACTURA */}
          <div
            onClick={() => setHotspot('totals')}
            className="nm-hotspot-zone"
            style={{
              border: hotspot === 'totals' ? '2px solid var(--violet)' : '1px dashed var(--line)',
              background: hotspot === 'totals' ? 'color-mix(in srgb, var(--violet) 10%, transparent)' : 'transparent',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 0,
            }}
          >
            <div>
              <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block' }}>Forma de pago:</span>
              <strong style={{ fontSize: '11px', color: 'var(--ink)' }}>Transferencia Bancaria</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block' }}>TOTAL LIQUIDADO:</span>
              <strong style={{ fontSize: '16px', color: 'var(--cyan)' }}>$ 375.000 COP</strong>
            </div>
          </div>
        </div>

        {/* PANEL EXPLICATIVO DEL ANÁLISIS DOCUMENTAL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
            <span className="eyebrow" style={{ color: 'var(--cyan)' }}>El Origen en el Mundo Real</span>
            <h3 style={{ margin: '6px 0 10px', fontSize: '16px' }}>¿Por qué los documentos no caben en una sola tabla?</h3>
            <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Una factura comercial es un <strong>contrato consolidado</strong> diseñado para que una persona pueda leerlo en un solo vistazo.
              Contiene simultáneamente:
            </p>
            <ul style={{ margin: '10px 0', paddingLeft: '18px', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6 }}>
              <li>Un <strong>Hecho Transaccional</strong> (la venta con su número y fecha).</li>
              <li>Un <strong>Sujeto</strong> (el cliente con sus datos personales y ubicación).</li>
              <li>Múltiples <strong>Objetos del Inventario</strong> (los productos vendidos).</li>
              <li>Una <strong>Relación Muchos a Muchos</strong> (cada factura tiene varios productos, y cada producto se vende en muchas facturas).</li>
            </ul>
            <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Si un programador intenta crear una tabla llamada <code>factura</code> con 20 columnas o arrays de texto, el sistema sufrirá de inmediato las <strong>tres anomalías destructivas</strong> de datos.
            </p>
          </div>

          {/* FICHA TÉCNICA DE LA ZONA SELECCIONADA */}
          <div style={{ padding: '16px', borderRadius: '10px', background: 'color-mix(in srgb, var(--surface) 80%, var(--surface-2))', border: '1px solid var(--line-strong)' }}>
            <span className="eyebrow" style={{ color: hotspot === 'client' ? 'var(--amber)' : hotspot === 'items' ? 'var(--lime)' : hotspot === 'totals' ? 'var(--violet)' : 'var(--cyan)' }}>
              Inspección de Zona: {hotspot === 'header' ? 'Cabecera' : hotspot === 'client' ? 'Comprador (Cliente)' : hotspot === 'items' ? 'Cuerpo de Ítems' : hotspot === 'totals' ? 'Totales' : 'Documento Completo'}
            </span>
            <p style={{ fontSize: '11px', color: 'var(--ink)', lineHeight: 1.5, margin: '8px 0 6px' }}>
              {hotspot === 'header' && 'Representa la entidad Factura. Sus atributos propios son el número identificador y la fecha de expedición. No debe guardar nombres de clientes ni de productos.'}
              {hotspot === 'client' && 'Representa la entidad Cliente y su ubicación geográfica. Carlos Mendoza existe como persona independientemente de si compra hoy o no. No debe duplicarse en cada factura.'}
              {hotspot === 'items' && 'Es una relación N:M resuelta como DetalleFactura. Cada línea vincula una factura con un producto específico, guardando la cantidad y el precio congelado en ese instante.'}
              {hotspot === 'totals' && '¡Regla de Oro! El subtotal y el total son datos calculados (derivados). No necesitan guardarse como columnas independientes porque se obtienen de SUM(cantidad * precio_unitario).'}
              {hotspot === 'all' && 'Haz clic en cualquier sección de la factura a la izquierda para analizar qué entidad representa y cómo se separará en la normalización formal.'}
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                type="button"
                className="primary-button"
                onClick={onGoToSteps}
                style={{ fontSize: '11px', padding: '8px 14px' }}
              >
                Ver cómo se normaliza en 1FN, 2FN y 3FN <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
