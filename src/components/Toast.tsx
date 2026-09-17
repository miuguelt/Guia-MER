import { CheckCircle2, X } from 'lucide-react'

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="toast" role="status" aria-live="polite"><CheckCircle2 size={18} /><span>{message}</span><button onClick={onClose} aria-label="Cerrar aviso"><X size={15} /></button></div>
}
