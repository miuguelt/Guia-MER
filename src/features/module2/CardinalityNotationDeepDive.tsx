import { useState } from 'react'
import { Eye, GitBranch, Layers, ShieldCheck } from 'lucide-react'

interface NotationPattern {
  name: string
  crowsFoot: string
  chenNotation: string
  meaning: string
  example: string
  mandatory: boolean
}

const notationPatterns: NotationPattern[] = [
  {
    name: 'Uno y solo uno (Obligatorio)',
    crowsFoot: '|| (doble barra)',
    chenNotation: '(1, 1)',
    meaning: 'Debe existir exactamente una pareja. Mínimo 1, máximo 1.',
    example: 'Cada pedido pertenece a exactamente un cliente.',
    mandatory: true,
  },
  {
    name: 'Cero o uno (Opcional)',
    crowsFoot: '|o (círculo y barra)',
    chenNotation: '(0, 1)',
    meaning: 'Puede no tener pareja o tener máximo una. Mínimo 0, máximo 1.',
    example: 'Un empleado puede tener o no asignado un vehículo corporativo.',
    mandatory: false,
  },
  {
    name: 'Uno o muchos (Obligatorio)',
    crowsFoot: '}| (pata de gallo y barra)',
    chenNotation: '(1, N)',
    meaning: 'Debe existir al menos una pareja y puede tener muchas. Mínimo 1, máximo N.',
    example: 'Un pedido debe tener al menos un producto en su detalle.',
    mandatory: true,
  },
  {
    name: 'Cero o muchos (Opcional)',
    crowsFoot: '}o (pata de gallo y círculo)',
    chenNotation: '(0, N)',
    meaning: 'Puede no tener ninguna pareja o tener infinitas. Mínimo 0, máximo N.',
    example: 'Un cliente recién registrado tiene 0 pedidos; con el tiempo tendrá N.',
    mandatory: false,
  },
]

export default function CardinalityNotationDeepDive() {
  const [selectedIdx, setSelectedIdx] = useState(3)
  const current = notationPatterns[selectedIdx]

  return (
    <section className="notation-deep-dive panel-card">
      <div className="card-heading">
        <div>
          <span className="eyebrow">Notaciones Industriales</span>
          <h2>Cómo leer Notación Chen vs Pata de Gallo (Crow’s Foot)</h2>
          <p className="card-desc">Los diagramas no son dibujos libres: cada símbolo codifica matemáticamente la participación mínima y máxima.</p>
        </div>
        <span className="accent-icon bg-amber"><Eye size={18} /></span>
      </div>

      <div className="notation-selector-tabs">
        {notationPatterns.map((p, idx) => (
          <button
            key={p.name}
            type="button"
            className={`notation-tab ${selectedIdx === idx ? 'active-tab' : ''}`}
            onClick={() => setSelectedIdx(idx)}
          >
            <span>{p.chenNotation}</span>
            <small>{p.name.split(' ')[0]} {p.mandatory ? '(Oblig.)' : '(Opc.)'}</small>
          </button>
        ))}
      </div>

      <div className="notation-display-grid">
        <div className="notation-badge-box">
          <div className="notation-symbol-large">
            <span className="symbol-label">Pata de Gallo:</span>
            <b className="symbol-val">{current.crowsFoot}</b>
          </div>
          <div className="notation-symbol-large">
            <span className="symbol-label">Notación Chen:</span>
            <b className="symbol-val color-amber">{current.chenNotation}</b>
          </div>
        </div>

        <div className="notation-explanation-box">
          <h3>{current.name}</h3>
          <p className="meaning-text">{current.meaning}</p>
          <div className="example-block">
            <GitBranch size={16} />
            <span><b>Caso real:</b> {current.example}</span>
          </div>
          <div className={`participation-pill ${current.mandatory ? 'mandatory' : 'optional'}`}>
            <ShieldCheck size={14} />
            <span>Participación: <b>{current.mandatory ? 'Total / Obligatoria (NOT NULL)' : 'Parcial / Opcional (Permite NULL)'}</b></span>
          </div>
        </div>
      </div>

      <div className="reflexive-note-card">
        <div className="reflexive-heading">
          <Layers size={16} />
          <strong>Relaciones Especiales: Reflexivas y con Atributos Propios</strong>
        </div>
        <p>
          <b>• Relación Reflexiva:</b> Ocurre cuando una entidad se relaciona consigo misma (ej. <i>Empleado supervisa a Empleados</i>). En la tabla resultante, se crea una columna <code>id_supervisor</code> que es una FK apuntando a la misma tabla.
          <br />
          <b>• Atributos de Relación:</b> Cuando un dato no le pertenece solo a A ni solo a B, sino a su encuentro (ej. en la venta de un producto: <i>cantidad</i> y <i>precio_unitario</i> histórico), ese dato viaja a la tabla intermedia de la relación N:M.
        </p>
      </div>
    </section>
  )
}
