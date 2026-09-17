import { AlertTriangle, Check, Download, FileText, LockKeyhole, Plus, Settings2, ShieldCheck, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { dictionarySeed } from '../../data/course'
import type { DictionaryRow } from '../../hooks/useLocalProgress'
import { buildSql, dictionaryToCsv, dictionaryToMarkdown, downloadText } from '../../lib/exports'
import LearningToolkit from '../../components/LearningToolkit'
import SqlDataTypeCheatSheet from './SqlDataTypeCheatSheet'

interface Props {
  savedRows: DictionaryRow[]
  onSave: (rows: DictionaryRow[]) => void
  onComplete: () => void
}

export default function DictionaryLab({ savedRows, onSave, onComplete }: Props) {
  const [rows, setRows] = useState<DictionaryRow[]>(savedRows.length ? savedRows : dictionarySeed)
  const [policy, setPolicy] = useState<'RESTRICT' | 'CASCADE' | 'SET NULL'>('RESTRICT')
  const [toast, setToast] = useState('')

  const update = (index: number, patch: Partial<DictionaryRow>) =>
    setRows((previous) => previous.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row)))

  const addRow = () =>
    setRows((previous) => [
      ...previous,
      {
        table: 'nueva_tabla',
        field: 'nuevo_campo',
        type: 'VARCHAR',
        size: '80',
        nn: true,
        constraint: '—',
        description: 'Describe qué representa este campo.',
      },
    ])

  const removeRow = (index: number) => setRows((previous) => previous.filter((_, rowIndex) => rowIndex !== index))

  const groupedTables = useMemo(() => new Set(rows.map((row) => row.table)).size, [rows])

  const save = () => {
    onSave(rows)
    setToast('Diccionario guardado en este dispositivo')
    window.setTimeout(() => setToast(''), 2400)
  }

  return (
    <motion.div className="page-shell module-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="module-hero">
        <div>
          <span className="label-pill rose-pill">MÓDULO 04 · MODELO FÍSICO</span>
          <h1>Un buen modelo también<br /><em>se documenta y se protege.</em></h1>
          <p>
            El Diccionario de Datos hace explícitas las decisiones que una simple columna esconde: tipos físicos precisos, restricciones obligatorias y políticas de integridad referencial.
          </p>
        </div>
        <div className="constraint-orbit">
          <div>
            <ShieldCheck size={18} />
            <b>100%</b>
            <span>Integridad</span>
          </div>
          <div>
            <Settings2 size={18} />
            <b>{groupedTables}</b>
            <span>tablas base</span>
          </div>
        </div>
      </section>

      <LearningToolkit variant="constraints" />

      {/* GUÍA DE TIPOS Y RESTRICCIONES */}
      <SqlDataTypeCheatSheet />

      {/* WORKSPACE DEL DICCIONARIO */}
      <section className="dictionary-workspace panel-card">
        <div className="workspace-header">
          <div>
            <span className="eyebrow">Constructor guiado</span>
            <h2>Diccionario de Datos Activo</h2>
            <p>Define cada campo con su tipo, tamaño, obligatoriedad (NN) y restricción para generar el DDL.</p>
          </div>
          <div className="workspace-actions">
            <button className="soft-button" type="button" onClick={addRow}>
              <Plus size={14} /> Agregar campo
            </button>
            <button className="primary-button small-button" type="button" onClick={save}>
              <Check size={15} /> Guardar borrador
            </button>
          </div>
        </div>

        <div className="dictionary-table-wrap">
          <table className="dictionary-table">
            <thead>
              <tr>
                <th>Tabla</th>
                <th>Campo</th>
                <th>Tipo SQL</th>
                <th>Tamaño</th>
                <th>NN</th>
                <th>Restricción</th>
                <th>Descripción del Atributo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.table}-${row.field}-${index}`}>
                  <td>
                    <input
                      aria-label={`Tabla ${index + 1}`}
                      value={row.table}
                      onChange={(event) => update(index, { table: event.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      aria-label={`Campo ${index + 1}`}
                      value={row.field}
                      onChange={(event) => update(index, { field: event.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      aria-label={`Tipo ${index + 1}`}
                      value={row.type}
                      onChange={(event) => update(index, { type: event.target.value })}
                    >
                      <option>UUID</option>
                      <option>BIGINT</option>
                      <option>BIGSERIAL</option>
                      <option>INTEGER</option>
                      <option>VARCHAR</option>
                      <option>TEXT</option>
                      <option>NUMERIC</option>
                      <option>DATE</option>
                      <option>TIMESTAMPTZ</option>
                      <option>BOOLEAN</option>
                    </select>
                  </td>
                  <td>
                    <input
                      aria-label={`Tamaño ${index + 1}`}
                      value={row.size}
                      onChange={(event) => update(index, { size: event.target.value })}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`toggle-check ${row.nn ? 'on' : ''}`}
                      onClick={() => update(index, { nn: !row.nn })}
                      aria-label={`Alternar not null ${index + 1}`}
                    >
                      {row.nn && <Check size={13} />}
                    </button>
                  </td>
                  <td>
                    <select
                      aria-label={`Restricción ${index + 1}`}
                      value={row.constraint}
                      onChange={(event) => update(index, { constraint: event.target.value })}
                    >
                      <option>—</option>
                      <option>PK</option>
                      <option>FK</option>
                      <option>UQ</option>
                      <option>PK AI</option>
                      <option>PK, FK</option>
                      <option>CHECK</option>
                    </select>
                  </td>
                  <td>
                    <input
                      aria-label={`Descripción ${index + 1}`}
                      value={row.description}
                      onChange={(event) => update(index, { description: event.target.value })}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete-row"
                      onClick={() => removeRow(index)}
                      aria-label={`Eliminar fila ${index + 1}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* POLÍTICAS DE INTEGRIDAD REFERENCIAL */}
        <div className="referential-row">
          <div>
            <span className="eyebrow">Política de Integridad Referencial</span>
            <strong>¿Qué debe hacer la base de datos al eliminar un registro padre?</strong>
          </div>
          <div className="policy-buttons">
            {(['RESTRICT', 'CASCADE', 'SET NULL'] as const).map((item) => (
              <button key={item} type="button" className={policy === item ? 'active' : ''} onClick={() => setPolicy(item)}>
                ON DELETE {item}
              </button>
            ))}
          </div>
          <p>
            <LockKeyhole size={15} />
            {policy === 'RESTRICT'
              ? 'RESTRICT (Por Defecto y Recomendado): Prohíbe borrar el padre mientras tenga hijos. Si un cliente tiene órdenes o facturas, la base de datos bloquea el borrado para proteger la historia contable.'
              : policy === 'CASCADE'
              ? 'CASCADE (¡Peligro en Producción!): Borra automáticamente todas las filas hijas vinculadas. Úsalo SOLO cuando la hija no tenga sentido sin el padre (ej. borrar un Detalle al borrar el Pedido). Nunca uses CASCADE entre Cliente y Factura.'
              : 'SET NULL: Conserva la fila hija pero deja su clave foránea en NULL. Exige que la FK permita valores nulos (no compatible con NOT NULL).'}
          </p>
        </div>

        {/* VISTA PREVIA DDL SQL EN VIVO */}
        <div className="sql-live-preview-box" style={{ marginTop: '20px', padding: '16px', borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className="eyebrow" style={{ color: 'var(--violet)' }}>Compilación DDL en tiempo real (PostgreSQL)</span>
            <small style={{ color: 'var(--muted)' }}>Actualizado automáticamente con ON DELETE {policy}</small>
          </div>
          <pre data-dbc="omitir" style={{ margin: 0, padding: '14px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--line)', overflowX: 'auto', fontSize: '11px', fontFamily: '"SFMono-Regular", Consolas, monospace', lineHeight: 1.5 }}>
            <code>{buildSql(rows, policy)}</code>
          </pre>
        </div>
      </section>

      {/* EXPORTACIÓN */}
      <section className="export-panel">
        <div>
          <span className="eyebrow">Exportación de Artefactos</span>
          <h2>Tu modelo listo para llevar a producción o revisión</h2>
          <p>Exporta el diccionario como Markdown para documentación, CSV para hojas técnicas o DDL SQL ejecutable con política {policy}.</p>
        </div>
        <div className="export-buttons">
          <button type="button" onClick={() => downloadText('diccionario-datos.md', dictionaryToMarkdown(rows), 'text/markdown')}>
            <FileText size={16} /> Diccionario Markdown
          </button>
          <button type="button" onClick={() => downloadText('diccionario-datos.csv', dictionaryToCsv(rows), 'text/csv')}>
            <Download size={16} /> Hoja CSV
          </button>
          <button type="button" onClick={() => downloadText('esquema.sql', buildSql(rows, policy), 'text/sql')}>
            <Settings2 size={16} /> DDL SQL ({policy})
          </button>
        </div>
      </section>

      {toast && (
        <div className="inline-success" role="status">
          <Check size={15} /> {toast}
        </div>
      )}

      <button className="primary-button complete-button" type="button" onClick={onComplete}>
        Comprendo los tipos de datos, restricciones y políticas referenciales <Check size={16} />
      </button>
    </motion.div>
  )
}
