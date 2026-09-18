import { ArrowRight, Clipboard, Download } from 'lucide-react'
import type { CodeFlavor } from '../masterclassTypes'
import type { CodeSnippet } from '../masterclassSnippets'

interface CodeSnippetsTabProps {
  codeFlavor: CodeFlavor
  setCodeFlavor: (flavor: CodeFlavor) => void
  codeSnippets: Record<CodeFlavor, CodeSnippet>
  copied: string
  onCopy: (text: string, label: string) => void
  onDownloadManual: () => void
  onNext: () => void
}

export default function CodeSnippetsTab({
  codeFlavor,
  setCodeFlavor,
  codeSnippets,
  copied,
  onCopy,
  onDownloadManual,
  onNext,
}: CodeSnippetsTabProps) {
  return (
    <div className="nm-tab-pane" style={{ paddingTop: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Del Modelo a la Implementación de Software</span>
          <h3 style={{ margin: '4px 0', fontSize: '16px' }}>Código Real de Backend para el Esquema Normalizado</h3>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`soft-button ${codeFlavor === 'sql' ? 'is-active' : ''}`}
            onClick={() => setCodeFlavor('sql')}
            style={{ fontSize: '10px', fontWeight: 700 }}
          >
            PostgreSQL DDL
          </button>
          <button
            type="button"
            className={`soft-button ${codeFlavor === 'prisma' ? 'is-active' : ''}`}
            onClick={() => setCodeFlavor('prisma')}
            style={{ fontSize: '10px', fontWeight: 700 }}
          >
            Prisma (TS)
          </button>
          <button
            type="button"
            className={`soft-button ${codeFlavor === 'jpa' ? 'is-active' : ''}`}
            onClick={() => setCodeFlavor('jpa')}
            style={{ fontSize: '10px', fontWeight: 700 }}
          >
            Spring Data JPA (Java)
          </button>
          <button
            type="button"
            className={`soft-button ${codeFlavor === 'rest' ? 'is-active' : ''}`}
            onClick={() => setCodeFlavor('rest')}
            style={{ fontSize: '10px', fontWeight: 700 }}
          >
            API REST Response
          </button>
          <button
            type="button"
            className="soft-button"
            onClick={onDownloadManual}
            style={{ fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Download size={12} /> Manual MD
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--line-strong)', background: '#07101c' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontSize: '11px', color: 'var(--cyan)', fontWeight: 600 }}>
            {codeSnippets[codeFlavor].title}
          </span>
          <button
            type="button"
            className="soft-button"
            onClick={() => onCopy(codeSnippets[codeFlavor].code, codeFlavor)}
            style={{ fontSize: '10px', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <Clipboard size={12} /> {copied === codeFlavor ? '¡Copiado!' : 'Copiar código'}
          </button>
        </div>
        <pre style={{ margin: 0, padding: '16px', maxHeight: '420px', overflowY: 'auto', color: '#a7deda', font: '11px/1.6 "SFMono-Regular", Consolas, monospace', whiteSpace: 'pre' }}>
          {codeSnippets[codeFlavor].code}
        </pre>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="primary-button" onClick={onNext} style={{ fontSize: '11px' }}>
          Poner a prueba mi aprendizaje (Quiz) <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
