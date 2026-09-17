import { AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, Pencil, PlusCircle, RotateCcw, Trash2, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import LearningToolkit from '../../components/LearningToolkit'

type DomainKey = 'tech' | 'clinic' | 'academy'

interface RowData {
  col1: string
  col1Sub: string
  col2: string
  col3: string
  col4: string
}

const domainData: Record<
  DomainKey,
  {
    title: string
    filename: string
    headers: string[]
    rows: RowData[]
    newCandidate: string
    modifiedVal: string
    contactLabel: string
  }
> = {
  tech: {
    title: 'Tienda de Tecnología',
    filename: 'ventas_2026.xlsx',
    headers: ['cliente', 'teléfono', 'producto', 'valor'],
    newCandidate: 'Nuevo Producto: "Audífonos Bluetooth"',
    modifiedVal: '315 999 4422 (MODIFICADO)',
    contactLabel: 'teléfono',
    rows: [
      { col1: 'Camila Rojas', col1Sub: 'CC 1045', col2: '315 221 4422', col3: 'Teclado mecánico', col4: '$180.000' },
      { col1: 'Camila Rojas', col1Sub: 'CC 1045', col2: '315 221 4422', col3: 'Mouse ergonómico', col4: '$90.000' },
      { col1: 'Mateo Vargas', col1Sub: 'CC 1098', col2: '310 888 1234', col3: 'Base para portátil', col4: '$75.000' },
    ],
  },
  clinic: {
    title: 'Clínica de Citas Médicas',
    filename: 'citas_marzo.xlsx',
    headers: ['paciente', 'contacto', 'médico', 'especialidad'],
    newCandidate: 'Nuevo Especialista: "Dra. Ortiz (Neurología)"',
    modifiedVal: '300 999 8811 (MODIFICADO)',
    contactLabel: 'contacto telefónico',
    rows: [
      { col1: 'Lucía Parra', col1Sub: 'ID 501', col2: '300 444 7788', col3: 'Dr. Morales', col4: 'Cardiología' },
      { col1: 'Lucía Parra', col1Sub: 'ID 501', col2: '300 444 7788', col3: 'Dra. Silva', col4: 'Dermatología' },
      { col1: 'Carlos Ruiz', col1Sub: 'ID 502', col2: '311 555 9900', col3: 'Dr. Morales', col4: 'Cardiología' },
    ],
  },
  academy: {
    title: 'Matrículas Académicas',
    filename: 'matriculas_adso.xlsx',
    headers: ['aprendiz', 'correo', 'curso', 'instructor'],
    newCandidate: 'Nuevo Curso: "Arquitectura Cloud"',
    modifiedVal: 'andres.nuevo@sena.edu.co (MODIFICADO)',
    contactLabel: 'correo institucional',
    rows: [
      { col1: 'Andrés Gil', col1Sub: 'ADSO-1', col2: 'andres@sena.edu', col3: 'Bases de Datos', col4: 'Ing. Peña' },
      { col1: 'Andrés Gil', col1Sub: 'ADSO-1', col2: 'andres@sena.edu', col3: 'JavaScript Moderno', col4: 'Lic. Vega' },
      { col1: 'Sofia Cano', col1Sub: 'ADSO-2', col2: 'sofia@sena.edu', col3: 'Bases de Datos', col4: 'Ing. Peña' },
    ],
  },
}

export default function SpreadsheetLab({ onComplete }: { onComplete: () => void }) {
  const [domain, setDomain] = useState<DomainKey>('tech')
  const [phoneChanged, setPhoneChanged] = useState(false)
  const [purchaseDeleted, setPurchaseDeleted] = useState(false)
  const [insertionAttempted, setInsertionAttempted] = useState(false)

  const active = domainData[domain]
  const anomalyCount = (phoneChanged ? 1 : 0) + (purchaseDeleted ? 1 : 0) + (insertionAttempted ? 1 : 0)

  const reset = () => {
    setPhoneChanged(false)
    setPurchaseDeleted(false)
    setInsertionAttempted(false)
  }

  const switchDomain = (next: DomainKey) => {
    setDomain(next)
    reset()
  }

  return (
    <motion.div className="page-shell module-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="module-hero">
        <div>
          <span className="label-pill cyan-pill">MÓDULO 00 · SENSIBILIZACIÓN</span>
          <h1>¿Por qué no usamos<br /><em>un Excel gigante?</em></h1>
          <p>Antes de escribir código o diagramas, descubre las tres trampas destructivas que ocurren cuando forzamos el mundo real dentro de una sola cuadrícula plana.</p>
        </div>
        <div className="module-hero-stat">
          <span>Anomalías activas</span>
          <strong>{anomalyCount}/3</strong>
          <small>detectadas en la hoja</small>
        </div>
      </section>

      <LearningToolkit variant="anomalies" />

      <section className="domain-switcher-row">
        <span className="eyebrow">Prueba el mismo dolor en tres dominios:</span>
        <div className="domain-buttons">
          {(['tech', 'clinic', 'academy'] as DomainKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`soft-button ${domain === key ? 'active-domain' : ''}`}
              onClick={() => switchDomain(key)}
            >
              {domainData[key].title}
            </button>
          ))}
        </div>
      </section>

      <div className="lesson-grid">
        <section className="lesson-copy">
          <div className="step-tag">01 · Diagnóstico en vivo</div>
          <h2>Una fila mezcla tres historias distintas</h2>
          <p>
            En esta hoja única, los datos del sujeto se repiten en cada transacción. Ejecuta las tres acciones interactivas para experimentar cómo se corrompe la información:
          </p>

          <div className="callout info-callout">
            <span className="callout-icon">!</span>
            <div>
              <strong>Las tres anomalías clásicas de Codd (1970)</strong>
              <p>
                <b>1. Actualización:</b> cambiar un dato repetido deja inconsistencias.
                <br />
                <b>2. Borrado:</b> borrar una transacción elimina la entidad por accidente.
                <br />
                <b>3. Inserción:</b> no se puede registrar un objeto nuevo si nadie lo ha referenciado aún.
              </p>
            </div>
          </div>

          <div className="mini-checklist">
            <span><CheckCircle2 size={15} /> Redundancia sin control</span>
            <span><CheckCircle2 size={15} /> Pérdida accidental de historia</span>
            <span><CheckCircle2 size={15} /> Inconsistencia garantizada</span>
          </div>
        </section>

        <section className="sheet-card panel-card">
          <div className="sheet-toolbar">
            <span className="sheet-dot red" />
            <span className="sheet-dot yellow" />
            <span className="sheet-dot green" />
            <strong>{active.filename}</strong>
            <span className="sheet-toolbar-meta">{active.rows.length} registros · datos sin normalizar</span>
          </div>

          <div className="sheet-table-wrap">
            <table className="sheet-table">
              <thead>
                <tr>
                  {active.headers.map((h) => <th key={h}>{h}</th>)}
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>{active.rows[0].col1}</b><small>{active.rows[0].col1Sub}</small></td>
                  <td className={phoneChanged ? 'cell-changed' : ''}>
                    {phoneChanged ? active.modifiedVal : active.rows[0].col2}
                  </td>
                  <td>{active.rows[0].col3}</td>
                  <td>{active.rows[0].col4}</td>
                  <td>
                    <button className="table-action" onClick={() => setPhoneChanged(true)} aria-label="Modificar celda" title={`Modificar ${active.contactLabel}`}>
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>

                <tr>
                  <td><b>{active.rows[1].col1}</b><small>{active.rows[1].col1Sub}</small></td>
                  <td className={phoneChanged ? 'cell-warning' : ''}>
                    {active.rows[1].col2} {phoneChanged && <small>(¡Quedó con el valor viejo!)</small>}
                  </td>
                  <td>{active.rows[1].col3}</td>
                  <td>{active.rows[1].col4}</td>
                  <td>
                    <button className="table-action" onClick={() => setPhoneChanged(true)} aria-label="Modificar celda" title={`Modificar ${active.contactLabel}`}>
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>

                <tr className={purchaseDeleted ? 'row-deleted' : ''}>
                  <td><b>{active.rows[2].col1}</b><small>{active.rows[2].col1Sub}</small></td>
                  <td>{active.rows[2].col2}</td>
                  <td>{active.rows[2].col3}</td>
                  <td>{active.rows[2].col4}</td>
                  <td>
                    <button className="table-action danger" onClick={() => setPurchaseDeleted(true)} aria-label="Borrar fila" title="Borrar registro">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {phoneChanged && (
            <div className="table-alert update-alert">
              <AlertTriangle size={17} />
              <span><b>Anomalía de Actualización:</b> Modificaste el {active.contactLabel} en la fila 1 pero la fila 2 conserva el valor viejo. El sistema ahora tiene dos verdades contradictorias para la misma entidad.</span>
            </div>
          )}

          {purchaseDeleted && (
            <div className="table-alert delete-alert">
              <XCircle size={17} />
              <span><b>Anomalía de Borrado:</b> Al eliminar este registro, también desapareció por completo el registro de la persona. ¡No podemos volver a contactarla porque su existencia dependía de una sola fila transaccional!</span>
            </div>
          )}

          {insertionAttempted && (
            <div className="table-alert update-alert">
              <HelpCircle size={17} />
              <span><b>Anomalía de Inserción:</b> Deseas registrar {active.newCandidate}. Pero como la hoja exige persona y transacción en la misma fila, tendrías que inventar datos falsos (o llenar de NULLs) los campos obligatorios.</span>
            </div>
          )}

          <div className="sheet-footer">
            <button className="soft-button" onClick={() => setInsertionAttempted(true)}>
              <PlusCircle size={14} /> Intentar registrar catálogo nuevo
            </button>
            <button className="soft-button" onClick={reset}>
              <RotateCcw size={14} /> Reiniciar hoja
            </button>
          </div>
        </section>
      </div>

      <section className="insight-panel">
        <div className="insight-number">00</div>
        <div>
          <span className="eyebrow">Principio Arquitectónico</span>
          <h2>Separar lo que existe (Entidades) de lo que sucede (Hechos).</h2>
          <p>
            El Modelo Entidad-Relación nació para solucionar esto: divide la realidad en tablas independientes que guardan cada dato una sola vez (fuente única de verdad) y las conecta mediante relaciones gobernadas por llaves.
          </p>
        </div>
        <button className="primary-button small-button" onClick={onComplete}>
          Entendí las anomalías y quiero modelar <ArrowRight size={15} />
        </button>
      </section>
    </motion.div>
  )
}
