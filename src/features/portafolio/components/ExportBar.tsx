import { Printer, Download, Copy } from 'lucide-react'

interface ExportBarProps {
  onPrint: () => void
  onDownloadJson: () => void
  onDownloadMarkdown: () => void
  onCopySummary: () => void
}

export default function ExportBar({
  onPrint,
  onDownloadJson,
  onDownloadMarkdown,
  onCopySummary,
}: ExportBarProps) {
  return (
    <div className="sena-export-bar" style={{ marginTop: '1.5rem' }}>
      <button type="button" className="btn btn--primary" onClick={onPrint}>
        <Printer size={16} /> 🖨️ Imprimir / Guardar en PDF
      </button>
      <button type="button" className="btn btn--secondary" onClick={onDownloadJson}>
        <Download size={16} /> 💾 Descargar Evidencia en JSON
      </button>
      <button type="button" className="btn btn--secondary" onClick={onDownloadMarkdown}>
        <Download size={16} /> 📥 Descargar en Markdown (.md)
      </button>
      <button type="button" className="btn btn--secondary" onClick={onCopySummary}>
        <Copy size={16} /> 📋 Copiar Resumen
      </button>
    </div>
  )
}
