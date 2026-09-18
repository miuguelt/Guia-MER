import { ArrowRight, Clipboard } from 'lucide-react'
import MermaidPreview from '../../../../components/MermaidPreview'

interface ErdDiagramTabProps {
  mermaidModel: string
  copied: string
  onCopy: (text: string, label: string) => void
  onNext: () => void
}

export default function ErdDiagramTab({
  mermaidModel,
  copied,
  onCopy,
  onNext,
}: ErdDiagramTabProps) {
  return (
    <div className="nm-tab-pane" style={{ paddingTop: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Modelo Conceptual y Lógico</span>
          <h3 style={{ margin: '4px 0', fontSize: '16px' }}>Diagrama Entidad-Relación (DER) Derivado del Modelo 3FN</h3>
        </div>
        <button
          type="button"
          className="soft-button"
          onClick={() => onCopy(mermaidModel, 'Mermaid ERD')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}
        >
          <Clipboard size={14} /> {copied === 'Mermaid ERD' ? '¡Copiado al portapapeles!' : 'Copiar código Mermaid'}
        </button>
      </div>

      {/* RENDERIZADOR MERMAID EN VIVO */}
      <div style={{ marginBottom: '16px' }}>
        <MermaidPreview code={mermaidModel} />
      </div>

      {/* EXPLICACIÓN DE CARDINALIDADES Y DERIVACIÓN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <strong style={{ color: 'var(--cyan)', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
            CIUDAD ||--o&#123; CLIENTE (1 a N)
          </strong>
          <p style={{ margin: 0, fontSize: '10px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Una ciudad puede albergar a muchos clientes (0..N). Un cliente reside en exactamente una ciudad (1..1).
            La llave foránea <code>ciudad_id</code> viaja hacia la tabla <code>cliente</code>.
          </p>
        </div>

        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <strong style={{ color: 'var(--amber)', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
            CLIENTE ||--o&#123; FACTURA (1 a N)
          </strong>
          <p style={{ margin: 0, fontSize: '10px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Un cliente puede realizar muchas compras a lo largo del tiempo (0..N). Cada factura le pertenece a un único cliente (1..1).
            La llave foránea <code>cliente_id</code> viaja hacia <code>factura</code>.
          </p>
        </div>

        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <strong style={{ color: 'var(--lime)', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
            FACTURA ||--|&#123; DETALLE_FACTURA &amp; PRODUCTO (N a M)
          </strong>
          <p style={{ margin: 0, fontSize: '10px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Una factura tiene varios productos, y un producto se vende en varias facturas.
            Esta relación de muchos a muchos se resuelve físicamente con la tabla puente <code>DETALLE_FACTURA</code>, que une ambas PKs.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="primary-button" onClick={onNext} style={{ fontSize: '11px' }}>
          Ver Código de Producción (SQL &amp; ORM) <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
