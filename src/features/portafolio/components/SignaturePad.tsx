import { useState, useRef } from 'react'
import { PenTool, Eraser, Upload, Trash2, Sparkles } from 'lucide-react'

interface SignaturePadProps {
  currentSignature?: string
  onUpdateSignature: (sig: string) => void
  onToast: (msg: string) => void
}

export default function SignaturePad({
  currentSignature,
  onUpdateSignature,
  onToast,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.setPointerCapture(e.pointerId)
    setIsDrawing(true)
    setHasDrawn(true)
    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineWidth = 2.2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#0f172a'
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    setIsDrawing(false)
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId)
    } catch {
      // Ignorar si el puntero ya se liberó
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const applySignature = () => {
    const canvas = canvasRef.current
    if (!canvas || !hasDrawn) {
      onToast('Por favor dibuja tu firma en el recuadro antes de aplicarla.')
      return
    }
    const dataUrl = canvas.toDataURL('image/png')
    onUpdateSignature(dataUrl)
    onToast('Firma digital incorporada exitosamente al documento SENA')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      if (dataUrl) {
        onUpdateSignature(dataUrl)
        onToast('Imagen de firma cargada e incorporada al documento SENA')
      }
    }
    reader.readAsDataURL(file)
  }

  const removeSignature = () => {
    onUpdateSignature('')
    clearCanvas()
    onToast('Firma digital retirada. Espacio listo para firma manual en papel.')
  }

  return (
    <div className="signature-control-panel" style={{ marginTop: '1.5rem' }}>
      <div className="signature-panel-title">
        <PenTool size={18} className="accent-text" />
        <h4>Paso 2 · Área de Firma del Aprendiz (Digital o Manuscrita)</h4>
      </div>
      <p className="signature-panel-subtitle">
        Puedes trazar tu firma digital directamente en el recuadro con el mouse, panel táctil o pantalla táctil, o cargar
        un archivo de imagen (PNG/JPG). Si prefieres imprimir el documento y firmarlo físicamente a mano con
        bolígrafo, déjalo sin firma digital y el formato dejará el recuadro delimitado listo.
      </p>

      <div className="signature-workspace">
        <div className="signature-pad-container">
          <div className="signature-canvas-wrapper">
            <canvas
              ref={canvasRef}
              id="signature-canvas"
              width={360}
              height={120}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
          </div>
          <span className="signature-canvas-hint">Traza tu firma aquí con mouse, lápiz o dedo</span>
        </div>

        <div className="signature-actions-container">
          <div className="signature-status-wrapper">
            <span className={`signature-status-pill ${currentSignature ? 'is-active' : 'is-empty'}`}>
              {currentSignature
                ? '✅ Firma Digital Incorporada al Documento'
                : 'ℹ️ Sin firma digital (Espacio listo para firma manual)'}
            </span>
          </div>

          <div className="signature-buttons-row">
            <button type="button" className="btn btn--primary btn--sm" onClick={applySignature}>
              <Sparkles size={14} /> Aplicar Firma Digital
            </button>
            <button type="button" className="btn btn--secondary btn--sm" onClick={clearCanvas}>
              <Eraser size={14} /> Limpiar Trazo
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={14} /> Cargar Imagen
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            {currentSignature && (
              <button type="button" className="btn btn--danger btn--sm" onClick={removeSignature}>
                <Trash2 size={14} /> Quitar Firma
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
