import { ArrowRight, ShieldCheck } from 'lucide-react'

interface Step3FNViewProps {
  onPrev: () => void
  onNext: () => void
}

export default function Step3FNView({ onPrev, onNext }: Step3FNViewProps) {
  return (
    <div>
      <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'color-mix(in srgb, var(--lime) 8%, var(--surface-2))', border: '1px solid color-mix(in srgb, var(--lime) 30%, transparent)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--lime)', fontWeight: 700, fontSize: '12px' }}>
          <ShieldCheck size={16} /> Regla de la 3FN: Eliminación de Dependencias Transitivas
        </div>
        <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.5 }}>
          En <code>factura_2fn</code>, <code>num_factura</code> determina a <code>cliente_doc</code>, y <code>cliente_doc</code> determina el nombre, teléfono y ciudad.
          Esto es una <strong>dependencia transitiva</strong> ($A \to B \to C$). Separamos al <code>cliente</code> y a la <code>ciudad</code> en sus propias tablas.
          ¡El esquema queda 100% limpio, desacoplado y en Tercera Forma Normal!
        </p>
      </div>

      {/* MATRIZ DE TABLAS EN 3FN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
        {/* CIUDAD */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <span style={{ fontSize: '10px', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 800 }}>
            Entidad Geográfica
          </span>
          <strong style={{ display: 'block', fontSize: '12px', color: 'var(--cyan)', margin: '2px 0 6px' }}>
            CIUDAD
          </strong>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.6 }}>
            <li><code style={{ color: 'var(--cyan)' }}>ciudad_id</code> <strong>(PK)</strong></li>
            <li><code>nombre_ciudad</code></li>
            <li><code>departamento</code></li>
          </ul>
        </div>

        {/* CLIENTE */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <span style={{ fontSize: '10px', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 800 }}>
            Entidad Sujeto
          </span>
          <strong style={{ display: 'block', fontSize: '12px', color: 'var(--amber)', margin: '2px 0 6px' }}>
            CLIENTE
          </strong>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.6 }}>
            <li><code style={{ color: 'var(--amber)' }}>cliente_id</code> <strong>(PK)</strong></li>
            <li><code>nombre_completo</code></li>
            <li><code>telefono</code></li>
            <li><code>direccion</code></li>
            <li><code style={{ color: 'var(--cyan)' }}>ciudad_id</code> <strong>(FK)</strong></li>
          </ul>
        </div>

        {/* FACTURA */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <span style={{ fontSize: '10px', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 800 }}>
            Entidad Hecho / Documento
          </span>
          <strong style={{ display: 'block', fontSize: '12px', color: 'var(--violet)', margin: '2px 0 6px' }}>
            FACTURA
          </strong>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.6 }}>
            <li><code style={{ color: 'var(--violet)' }}>num_factura</code> <strong>(PK)</strong></li>
            <li><code>fecha</code></li>
            <li><code style={{ color: 'var(--amber)' }}>cliente_id</code> <strong>(FK)</strong></li>
          </ul>
        </div>

        {/* DETALLE_FACTURA */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <span style={{ fontSize: '10px', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 800 }}>
            Entidad Asociativa (N:M)
          </span>
          <strong style={{ display: 'block', fontSize: '12px', color: 'var(--lime)', margin: '2px 0 6px' }}>
            DETALLE_FACTURA
          </strong>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.6 }}>
            <li><code style={{ color: 'var(--violet)' }}>num_factura</code> <strong>(PK, FK)</strong></li>
            <li><code style={{ color: 'var(--rose)' }}>cod_producto</code> <strong>(PK, FK)</strong></li>
            <li><code>cantidad</code></li>
            <li><code>precio_unitario_venta</code></li>
          </ul>
        </div>

        {/* PRODUCTO */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <span style={{ fontSize: '10px', color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 800 }}>
            Entidad Catálogo
          </span>
          <strong style={{ display: 'block', fontSize: '12px', color: 'var(--rose)', margin: '2px 0 6px' }}>
            PRODUCTO
          </strong>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.6 }}>
            <li><code style={{ color: 'var(--rose)' }}>cod_producto</code> <strong>(PK)</strong></li>
            <li><code>nombre_producto</code></li>
            <li><code>precio_catalogo_base</code></li>
          </ul>
        </div>
      </div>

      {/* REGLA MNEMOTÉCNICA DE KENT */}
      <div style={{ marginTop: '16px', padding: '14px', borderRadius: '8px', background: 'color-mix(in srgb, var(--cyan) 6%, var(--surface))', borderLeft: '3px solid var(--cyan)' }}>
        <strong style={{ color: 'var(--ink)', fontSize: '11px', display: 'block', marginBottom: '3px' }}>
          💡 La Regla Mnemotécnica de Bill Kent:
        </strong>
        <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
          "Cada atributo no clave debe aportar un hecho sobre <strong>la clave</strong> (1FN), <strong>toda la clave</strong> (2FN), y <strong>nada más que la clave</strong> (3FN); ¡que Codd me ayude!"
        </p>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="soft-button" onClick={onPrev} style={{ fontSize: '11px' }}>
          Volver a 2FN
        </button>
        <button type="button" className="primary-button" onClick={onNext} style={{ fontSize: '11px' }}>
          Siguiente: Usar el Inspector de Dependencias <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
