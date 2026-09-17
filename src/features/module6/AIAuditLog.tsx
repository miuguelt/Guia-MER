import { Check, ClipboardList, Download, Save } from 'lucide-react'
import { useState } from 'react'
import type { AiLogDraft } from '../../data/ai'
import { aiLogToMarkdown, downloadText } from '../../lib/exports'

interface Props { value: AiLogDraft; onSave: (value: AiLogDraft) => void }

const fields: Array<{ key: keyof AiLogDraft; label: string; placeholder: string }> = [
  { key: 'prompt', label: 'Instrucción usada', placeholder: 'Ejemplo: aplica la Fase 1 a este requisito y separa hechos de supuestos.' },
  { key: 'context', label: 'Contexto entregado', placeholder: 'Guía, glosario, motor SQL, alcance, caso de ejemplo o archivos de referencia.' },
  { key: 'assumptions', label: 'Supuestos [POR VALIDAR]', placeholder: 'Ejemplo: se asume que un libro puede prestarse varias veces.' },
  { key: 'corrections', label: 'Correcciones humanas', placeholder: 'Qué cambiaste y por qué después de revisar la salida de IA.' },
  { key: 'tests', label: 'Pruebas ejecutadas', placeholder: 'Alta, duplicado, FK inexistente, borrado, migración o caso límite.' },
]

export default function AIAuditLog({ value, onSave }: Props) {
  const [draft, setDraft] = useState<AiLogDraft>(value)
  const [saved, setSaved] = useState(false)
  const update = (key: keyof AiLogDraft, next: string) => { setDraft((current) => ({ ...current, [key]: next })); setSaved(false) }
  const save = () => { onSave(draft); setSaved(true) }
  return <section className="ai-log panel-card"><div className="card-heading"><div><span className="eyebrow">Evidencia de proceso</span><h2>Bitácora de trabajo con IA</h2></div><ClipboardList size={19} className="muted-icon" /></div><p className="ai-log-intro">Registrar la cadena instrucción → contexto → supuesto → corrección → prueba convierte el uso de IA en una decisión auditable.</p><div className="ai-log-grid">{fields.map((field) => <label key={field.key}>{field.label}<textarea value={draft[field.key]} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} /></label>)}</div><div className="ai-log-footer"><span>{saved ? <><Check size={14} /> Guardado localmente</> : 'La bitácora no sale de este dispositivo.'}</span><div><button className="soft-button" onClick={() => downloadText('bitacora-ia.md', aiLogToMarkdown(draft), 'text/markdown')}><Download size={14} /> Descargar Markdown</button><button className="primary-button small-button" onClick={save}><Save size={14} /> Guardar bitácora</button></div></div></section>
}
