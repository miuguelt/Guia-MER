import {
  Check,
  Code2,
  Database,
  Download,
  HelpCircle,
  Layers,
  Package,
  Receipt,
  Sparkles,
  Split,
  Zap,
} from 'lucide-react'
import type { MainTab } from './masterclassTypes'

interface MasterclassNavigationProps {
  activeTab: MainTab
  selectTab: (tab: MainTab) => void
  visitedTabs: Set<string>
  correctAnswersCount: number
  quizItemsCount: number
  onDownloadManual: () => void
}

const LEARNING_PATH: { key: MainTab; label: string }[] = [
  { key: 'doc', label: '1. Factura Real' },
  { key: 'steps', label: '2. Fases 0FN-3FN' },
  { key: 'deps', label: '3. Inspector de Dependencias' },
  { key: 'price', label: '4. Precio Snapshot' },
  { key: 'challenge', label: '5. Desafío Práctico OC' },
  { key: 'erd', label: '6. DER Mermaid' },
  { key: 'code', label: '7. Código Backend' },
  { key: 'quiz', label: '8. Autoevaluación' },
]

export default function MasterclassNavigation({
  activeTab,
  selectTab,
  visitedTabs,
  correctAnswersCount,
  quizItemsCount,
  onDownloadManual,
}: MasterclassNavigationProps) {
  return (
    <>
      {/* CABECERA PRINCIPAL DEL LABORATORIO */}
      <div className="card-heading" style={{ borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Laboratorio Integral de Ingeniería de Datos</span>
            <span className="label-pill" style={{ background: 'color-mix(in srgb, var(--cyan) 12%, transparent)', color: 'var(--cyan)', borderColor: 'var(--cyan)', fontSize: '9px', padding: '2px 8px' }}>
              De la Evidencia al Código
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', margin: '4px 0' }}>
            Normalización Formal: De la Factura Comercial al DER y al Código
          </h2>
          <p className="card-desc" style={{ maxWidth: '840px', margin: '6px 0 0', color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6 }}>
            Las bases de datos no se inventan con tablas abstractas: se construyen desglosando los <strong>documentos y hechos reales de la empresa</strong>.
            Descubre cómo transformar una factura de venta física a través de <strong>1FN, 2FN y 3FN</strong> hasta generar el DER y las entidades de producción.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <button
            type="button"
            className="soft-button"
            onClick={onDownloadManual}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, padding: '6px 12px' }}
          >
            <Download size={14} /> Descargar Manual (Markdown)
          </button>
          <span className="accent-icon bg-cyan"><Layers size={20} /></span>
        </div>
      </div>

      {/* TIRA DE PROGRESO DE LA MASTERCLASS */}
      <div className="nm-progress-bar-strip">
        <span style={{ fontSize: '10px', color: 'var(--faint)', fontWeight: 800, textTransform: 'uppercase', marginRight: '6px' }}>
          Ruta de Aprendizaje:
        </span>
        {LEARNING_PATH.map((item) => {
          const isCurrent = activeTab === item.key
          const isDone = visitedTabs.has(item.key)
          return (
            <button
              key={item.key}
              type="button"
              className={`nm-progress-step-pill ${isCurrent ? 'is-active' : ''} ${isDone && !isCurrent ? 'is-done' : ''}`}
              onClick={() => selectTab(item.key)}
            >
              {isDone ? <Check size={11} /> : <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />}
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* BARRA DE PESTAÑAS PRINCIPALES */}
      <div className="nm-nav-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
        <button
          type="button"
          className={`soft-button ${activeTab === 'doc' ? 'is-active' : ''}`}
          onClick={() => selectTab('doc')}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontWeight: 600 }}
        >
          <Receipt size={15} /> 1. El Documento Fuente
        </button>
        <button
          type="button"
          className={`soft-button ${activeTab === 'steps' ? 'is-active' : ''}`}
          onClick={() => selectTab('steps')}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontWeight: 600 }}
        >
          <Split size={15} /> 2. Formas Normales (0FN → 3FN)
        </button>
        <button
          type="button"
          className={`soft-button ${activeTab === 'deps' ? 'is-active' : ''}`}
          onClick={() => selectTab('deps')}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontWeight: 600 }}
        >
          <Zap size={15} /> 3. Inspector de Dependencias
        </button>
        <button
          type="button"
          className={`soft-button ${activeTab === 'price' ? 'is-active' : ''}`}
          onClick={() => selectTab('price')}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontWeight: 600 }}
        >
          <Sparkles size={15} /> 4. Dilema del Precio (Snapshot)
        </button>
        <button
          type="button"
          className={`soft-button ${activeTab === 'challenge' ? 'is-active' : ''}`}
          onClick={() => selectTab('challenge')}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontWeight: 600 }}
        >
          <Package size={15} /> 5. Desafío Práctico (OC-4020)
        </button>
        <button
          type="button"
          className={`soft-button ${activeTab === 'erd' ? 'is-active' : ''}`}
          onClick={() => selectTab('erd')}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontWeight: 600 }}
        >
          <Database size={15} /> 6. Diagrama DER en Vivo
        </button>
        <button
          type="button"
          className={`soft-button ${activeTab === 'code' ? 'is-active' : ''}`}
          onClick={() => selectTab('code')}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontWeight: 600 }}
        >
          <Code2 size={15} /> 7. Código de Producción
        </button>
        <button
          type="button"
          className={`soft-button ${activeTab === 'quiz' ? 'is-active' : ''}`}
          onClick={() => selectTab('quiz')}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', fontWeight: 600 }}
        >
          <HelpCircle size={15} /> 8. Autoevaluación ({correctAnswersCount}/{quizItemsCount})
        </button>
      </div>
    </>
  )
}
