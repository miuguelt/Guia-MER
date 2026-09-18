import { AlertCircle, ArrowRight, RotateCcw } from 'lucide-react'

interface Step0FNViewProps {
  anomalyTriggered: 'none' | 'insert' | 'update' | 'delete'
  setAnomalyTriggered: (val: 'none' | 'insert' | 'update' | 'delete') => void
  onNext: () => void
}

export default function Step0FNView({
  anomalyTriggered,
  setAnomalyTriggered,
  onNext,
}: Step0FNViewProps) {
  return (
    <div>
      <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'color-mix(in srgb, var(--rose) 8%, var(--surface-2))', border: '1px solid color-mix(in srgb, var(--rose) 30%, transparent)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rose)', fontWeight: 700, fontSize: '12px' }}>
          <AlertCircle size={16} /> Estado 0FN: Tabla Monstruo sin Normalizar (Facturación Bruta)
        </div>
        <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.5 }}>
          Esta tabla intenta almacenar la factura completa en una sola fila. La columna <code>productos</code> guarda una lista de textos separados por comas.
          ¡Experimenta las 3 anomalías presionando los botones interactivos a continuación!
        </p>
      </div>

      {/* BOTONES DE SIMULACIÓN DE ANOMALÍAS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <button
          type="button"
          className="soft-button"
          onClick={() => setAnomalyTriggered('insert')}
          style={{ color: 'var(--rose)', borderColor: anomalyTriggered === 'insert' ? 'var(--rose)' : 'var(--line)', fontSize: '11px' }}
        >
          ⚡ Probar Anomalía de Inserción
        </button>
        <button
          type="button"
          className="soft-button"
          onClick={() => setAnomalyTriggered('update')}
          style={{ color: 'var(--amber)', borderColor: anomalyTriggered === 'update' ? 'var(--amber)' : 'var(--line)', fontSize: '11px' }}
        >
          ⚡ Probar Anomalía de Actualización
        </button>
        <button
          type="button"
          className="soft-button"
          onClick={() => setAnomalyTriggered('delete')}
          style={{ color: 'var(--rose)', borderColor: anomalyTriggered === 'delete' ? 'var(--rose)' : 'var(--line)', fontSize: '11px' }}
        >
          ⚡ Probar Anomalía de Eliminación
        </button>
        {anomalyTriggered !== 'none' && (
          <button
            type="button"
            className="soft-button"
            onClick={() => setAnomalyTriggered('none')}
            style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <RotateCcw size={13} /> Restablecer
          </button>
        )}
      </div>

      {/* ALERTA DE LA ANOMALÍA DISPARADA */}
      {anomalyTriggered === 'insert' && (
        <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'color-mix(in srgb, var(--rose) 12%, var(--surface))', border: '1px solid var(--rose)', marginBottom: '14px' }}>
          <strong style={{ color: 'var(--rose)', fontSize: '12px', display: 'block' }}>❌ Bloqueo: Anomalía de Inserción</strong>
          <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '4px 0 0', lineHeight: 1.5 }}>
            La ferretería adquirió un nuevo producto: <strong>"Sierra Circular PRD-50"</strong> y desea agregarlo al catálogo.
            ¡Es imposible registrarlo en esta tabla! Como la tabla exige <code>num_factura</code> y <code>cliente_doc</code>, tendríamos que inventar una venta falsa con valores inventados o dejar llaves nulas (NULL), corrompiendo la base de datos.
          </p>
        </div>
      )}

      {anomalyTriggered === 'update' && (
        <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'color-mix(in srgb, var(--amber) 12%, var(--surface))', border: '1px solid var(--amber)', marginBottom: '14px' }}>
          <strong style={{ color: 'var(--amber)', fontSize: '12px', display: 'block' }}>⚠️ Inconsistencia: Anomalía de Actualización</strong>
          <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '4px 0 0', lineHeight: 1.5 }}>
            Carlos Mendoza actualizó su número telefónico a <strong>315 999 0000</strong>. Como sus datos están repetidos en cada factura histórica, si el sistema solo actualiza la fila 1 y no la fila 2, ¡Carlos ahora tiene dos números telefónicos contradictorios en el mismo sistema!
          </p>
        </div>
      )}

      {anomalyTriggered === 'delete' && (
        <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'color-mix(in srgb, var(--rose) 12%, var(--surface))', border: '1px solid var(--rose)', marginBottom: '14px' }}>
          <strong style={{ color: 'var(--rose)', fontSize: '12px', display: 'block' }}>❌ Pérdida Colateral: Anomalía de Eliminación</strong>
          <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '4px 0 0', lineHeight: 1.5 }}>
            Se anula y elimina la factura <strong>FACT-1003</strong> de Luisa Pérez. Al borrar la fila, ¡se borra para siempre del sistema la existencia de Luisa Pérez y el registro del producto "Martillo" si no figuraba en otra venta! Se destruyó información de negocio por accidente.
          </p>
        </div>
      )}

      {/* TABLA 0FN */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '8px' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--surface-3)', color: 'var(--faint)' }}>
            <tr>
              <th style={{ padding: '8px' }}>num_factura</th>
              <th style={{ padding: '8px' }}>fecha</th>
              <th style={{ padding: '8px' }}>cliente_doc</th>
              <th style={{ padding: '8px' }}>cliente_nom</th>
              <th style={{ padding: '8px' }}>telefono</th>
              <th style={{ padding: '8px' }}>ciudad</th>
              <th style={{ padding: '8px' }}>productos_vendidos (lista no atómica)</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>total</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--line)', background: anomalyTriggered === 'update' ? 'color-mix(in srgb, var(--amber) 10%, transparent)' : 'transparent' }}>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--cyan)' }}>FACT-1001</td>
              <td style={{ padding: '8px' }}>2026-09-17</td>
              <td style={{ padding: '8px' }}>10203040</td>
              <td style={{ padding: '8px' }}>Carlos Mendoza</td>
              <td style={{ padding: '8px', color: anomalyTriggered === 'update' ? 'var(--amber)' : 'inherit', fontWeight: anomalyTriggered === 'update' ? 800 : 400 }}>
                {anomalyTriggered === 'update' ? '315 999 0000 (NUEVO)' : '310 555 9876'}
              </td>
              <td style={{ padding: '8px' }}>Medellín</td>
              <td style={{ padding: '8px', color: 'var(--rose)', background: 'color-mix(in srgb, var(--rose) 6%, transparent)' }}>
                [PRD-01: Taladro (1), PRD-05: Brocas (2), PRD-12: Cinta (3)]
              </td>
              <td style={{ padding: '8px', textAlign: 'right' }}>$ 375.000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--line)', background: anomalyTriggered === 'update' ? 'color-mix(in srgb, var(--rose) 8%, transparent)' : 'transparent' }}>
              <td style={{ padding: '8px', fontWeight: 700, color: 'var(--cyan)' }}>FACT-1002</td>
              <td style={{ padding: '8px' }}>2026-09-17</td>
              <td style={{ padding: '8px' }}>10203040</td>
              <td style={{ padding: '8px' }}>Carlos Mendoza</td>
              <td style={{ padding: '8px', color: anomalyTriggered === 'update' ? 'var(--rose)' : 'inherit' }}>
                310 555 9876 {anomalyTriggered === 'update' && '(¡DESACTUALIZADO!)'}
              </td>
              <td style={{ padding: '8px' }}>Medellín</td>
              <td style={{ padding: '8px', color: 'var(--rose)', background: 'color-mix(in srgb, var(--rose) 6%, transparent)' }}>
                [PRD-05: Brocas (1)]
              </td>
              <td style={{ padding: '8px', textAlign: 'right' }}>$ 40.000</td>
            </tr>
            {anomalyTriggered !== 'delete' ? (
              <tr>
                <td style={{ padding: '8px', fontWeight: 700, color: 'var(--cyan)' }}>FACT-1003</td>
                <td style={{ padding: '8px' }}>2026-09-18</td>
                <td style={{ padding: '8px' }}>98765432</td>
                <td style={{ padding: '8px' }}>Luisa Pérez</td>
                <td style={{ padding: '8px' }}>300 123 4567</td>
                <td style={{ padding: '8px' }}>Bogotá</td>
                <td style={{ padding: '8px', color: 'var(--rose)', background: 'color-mix(in srgb, var(--rose) 6%, transparent)' }}>
                  [PRD-01: Taladro (1), PRD-20: Martillo (1)]
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>$ 285.000</td>
              </tr>
            ) : (
              <tr style={{ background: 'color-mix(in srgb, var(--rose) 12%, transparent)' }}>
                <td colSpan={8} style={{ padding: '8px', textAlign: 'center', color: 'var(--rose)', fontStyle: 'italic' }}>
                  [FACT-1003 ELIMINADA] Se perdió el registro de Luisa Pérez y del Martillo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="primary-button" onClick={onNext} style={{ fontSize: '11px' }}>
          Avanzar al Paso 1: Aplicar Primera Forma Normal (1FN) <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
