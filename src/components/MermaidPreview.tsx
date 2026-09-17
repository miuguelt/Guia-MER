import { AlertCircle, Eye, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props { code: string }

let renderSequence = 0

export default function MermaidPreview({ code }: Props) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let active = true
    const render = async () => {
      setLoading(true)
      setError('')
      try {
        const { default: mermaid } = await import('mermaid')
        const isLight = theme === 'light'
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: {
            primaryColor: isLight ? '#dceaf2' : '#12283a',
            primaryTextColor: isLight ? '#152b43' : '#f4f8fc',
            primaryBorderColor: isLight ? '#087f83' : '#41d9d1',
            lineColor: isLight ? '#36556d' : '#b8c7d9',
            background: isLight ? '#ffffff' : '#0d1727',
            mainBkg: isLight ? '#ffffff' : '#12283a',
            nodeBkg: isLight ? '#ffffff' : '#12283a',
            nodeBorder: isLight ? '#087f83' : '#41d9d1',
            nodeTextColor: isLight ? '#152b43' : '#f4f8fc',
            textColor: isLight ? '#152b43' : '#f4f8fc',
            labelTextColor: isLight ? '#152b43' : '#f4f8fc',
            edgeLabelBackground: isLight ? '#eaf2f6' : '#0f2335',
            rowOdd: isLight ? '#e8f1f5' : '#19364b',
            rowEven: isLight ? '#ffffff' : '#10283b',
          },
        })
        const result = await mermaid.render(`datagenesis-mermaid-${renderSequence += 1}`, code)
        if (active) setSvg(result.svg)
      } catch {
        if (active) { setSvg(''); setError('El diagrama aún no compila. Revisa la sintaxis Mermaid y las cardinalidades.') }
      } finally {
        if (active) setLoading(false)
      }
    }
    void render()
    return () => { active = false }
  }, [code, theme])
  return <div className="mermaid-preview"><div className="mermaid-preview-head"><span><Eye size={14} /> Vista previa en vivo</span><small>erDiagram</small></div>{loading && <div className="mermaid-state"><LoaderCircle size={18} className="spin-icon" /> Renderizando…</div>}{!loading && error && <div className="mermaid-state error"><AlertCircle size={18} /> {error}</div>}{!loading && !error && <div className="mermaid-canvas" dangerouslySetInnerHTML={{ __html: svg }} />}</div>
}
