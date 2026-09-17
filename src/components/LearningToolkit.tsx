import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  Brain,
  Check,
  CircleHelp,
  Gauge,
  Lightbulb,
  Link2,
  ListChecks,
  MousePointer2,
  RefreshCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { useMemo, useState } from 'react'

type ToolkitVariant = 'anomalies' | 'entities' | 'cardinality' | 'transformation' | 'constraints' | 'requirements' | 'ai' | 'quality'
type Tab = 'analogy' | 'visual' | 'challenge'

interface ToolkitConfig {
  eyebrow: string
  title: string
  description: string
  analogy: string
  bridge: string
  steps: string[]
  accent: string
}

const configs: Record<ToolkitVariant, ToolkitConfig> = {
  anomalies: {
    eyebrow: 'Caja de herramientas · módulo 00',
    title: 'Haz visible el costo de repetir',
    description: 'Aumenta la cantidad de compras y observa cómo crece la superficie de contradicciones.',
    analogy: 'Guardar clientes y compras en una sola hoja es como escribir la dirección de una casa en cada recibo: cuando la dirección cambia, tienes que perseguir todos los papeles.',
    bridge: 'Separar CLIENTE de COMPRA convierte una corrección en un solo cambio confiable.',
    steps: ['Observa qué dato se repite', 'Simula un cambio o borrado', 'Separa entidades y hechos'],
    accent: 'cyan',
  },
  entities: {
    eyebrow: 'Caja de herramientas · módulo 01',
    title: 'Pasa de una historia a piezas con memoria',
    description: 'Cambia el foco para comprobar qué parte del enunciado se vuelve entidad, atributo o identificador.',
    analogy: 'Una entidad es una carpeta de archivo; los atributos son los campos escritos en ella y la llave es el código que evita confundir dos carpetas parecidas.',
    bridge: 'No todo sustantivo merece una tabla: necesita instancias, identidad y una razón para persistir.',
    steps: ['Encuentra cosas que existen', 'Describe una instancia', 'Asigna una huella estable'],
    accent: 'lime',
  },
  cardinality: {
    eyebrow: 'Caja de herramientas · módulo 02',
    title: 'Cuenta las parejas en ambos sentidos',
    description: 'Cambia el máximo de cada extremo y deja que la forma del vínculo se reconfigure.',
    analogy: 'La cardinalidad es como organizar una fiesta: pregunta cuántas invitaciones puede recibir una persona y cuántas personas pueden compartir una invitación.',
    bridge: 'La decisión nace de una frase del negocio, no del símbolo que se vea más bonito.',
    steps: ['Elige una instancia', 'Cuenta sus parejas', 'Invierte la pregunta'],
    accent: 'amber',
  },
  transformation: {
    eyebrow: 'Caja de herramientas · módulo 03',
    title: 'Mira cómo viaja una llave',
    description: 'Avanza por las capas y sigue la misma identidad desde el concepto hasta la FK.',
    analogy: 'Una FK es como anotar en cada pedido el número de la ficha del cliente: el pedido no copia toda la ficha, solo conserva la referencia.',
    bridge: 'En una relación 1:N, la tabla del lado muchos recibe la PK del lado uno.',
    steps: ['Nombra el vínculo', 'Identifica la PK padre', 'Migra y valida la FK'],
    accent: 'violet',
  },
  constraints: {
    eyebrow: 'Caja de herramientas · módulo 04',
    title: 'Prueba la puerta de entrada de una tabla',
    description: 'Introduce datos y comprueba cómo NN, formato y unicidad protegen el significado.',
    analogy: 'Un constraint es el portero de un evento: revisa la entrada, evita duplicados y decide qué hacer cuando se retira un invitado.',
    bridge: 'Una restricción útil traduce una regla del negocio en un comportamiento comprobable.',
    steps: ['Declara la regla', 'Intenta romperla', 'Elige la respuesta segura'],
    accent: 'rose',
  },
  requirements: {
    eyebrow: 'Caja de herramientas · módulo 05',
    title: 'Convierte un enunciado en evidencia',
    description: 'Marca las pistas que ya aparecen en tu requisito y descubre qué preguntas faltan antes de modelar.',
    analogy: 'Modelar es hacer un mapa: los sustantivos son lugares, los verbos son caminos y las reglas son señales que evitan tomar una ruta equivocada.',
    bridge: 'Un requisito corto puede iniciar el modelo; las preguntas abiertas impiden que una suposición se disfrace de diseño.',
    steps: ['Extrae actores y cosas', 'Encuentra hechos y reglas', 'Registra lo que falta'],
    accent: 'blue',
  },
  ai: {
    eyebrow: 'Caja de herramientas · módulo 06',
    title: 'Mide el riesgo de una respuesta rápida',
    description: 'Activa contexto, supuestos y pruebas para ver cómo cambia la confianza de una propuesta de IA.',
    analogy: 'La IA es un copiloto veloz: puede leer el mapa y proponer una ruta, pero solo el equipo que conoce el territorio puede confirmar que el puente existe.',
    bridge: 'Más contexto reduce ambigüedad; más pruebas convierten una sugerencia en evidencia.',
    steps: ['Entrega contexto', 'Expone supuestos', 'Ejecuta pruebas humanas'],
    accent: 'cyan',
  },
  quality: {
    eyebrow: 'Caja de herramientas · módulo 07',
    title: 'Observa el modelo como un sistema',
    description: 'Activa las dimensiones que acompañan al ERD y revisa si tu diseño está listo para operar y evolucionar.',
    analogy: 'El ERD es el plano de una casa: no basta con dibujar habitaciones; también importan las puertas, la seguridad, el mantenimiento y cómo crecerá la vivienda.',
    bridge: 'Un modelo profesional conecta estructura, operación, seguridad, pruebas y evolución.',
    steps: ['Revisa estructura', 'Piensa en operación', 'Prepara el cambio'],
    accent: 'lime',
  },
}

const challengeData: Record<ToolkitVariant, { question: string; options: string[]; answer: number; explanation: string }> = {
  anomalies: { question: '¿Qué anomalía aparece cuando un cliente cambia de teléfono y solo editas una fila?', options: ['Actualización', 'Cardinalidad', 'Tipado'], answer: 0, explanation: 'La misma realidad queda con dos valores distintos: el dato perdió una única fuente de verdad.' },
  entities: { question: '¿Qué pregunta ayuda a decidir si algo merece identidad propia?', options: ['¿Tiene muchas instancias y debe persistir?', '¿Es una palabra larga?', '¿Está al final de la frase?'], answer: 0, explanation: 'La persistencia y la identidad importan más que la categoría gramatical.' },
  cardinality: { question: 'Si ambos lados pueden repetirse, ¿qué aparece al pasar a tablas?', options: ['Una tabla puente', 'Una columna repetida', 'Un JSON con listas'], answer: 0, explanation: 'La tabla puente convierte cada pareja en una fila y puede guardar atributos del vínculo.' },
  transformation: { question: 'En una relación 1:N, ¿dónde queda la FK?', options: ['En el lado N', 'Siempre en el lado 1', 'En una lista dentro del padre'], answer: 0, explanation: 'Muchas filas hijas pueden apuntar a la misma PK del padre.' },
  constraints: { question: 'Si una FK no puede quedar vacía, ¿qué combinación expresa mejor la regla?', options: ['FK + NOT NULL', 'Solo un comentario', 'VARCHAR muy grande'], answer: 0, explanation: 'La FK asegura el vínculo y NOT NULL obliga a que exista para esa fila.' },
  requirements: { question: '¿Qué debe quedar marcado cuando el enunciado no responde una regla?', options: ['Pregunta abierta o supuesto por validar', 'Una tabla inventada', 'Un valor por defecto silencioso'], answer: 0, explanation: 'La trazabilidad protege el modelo de decisiones que nadie confirmó.' },
  ai: { question: '¿Qué aumenta más la confiabilidad de una salida de IA?', options: ['Contexto + supuestos + pruebas', 'Una instrucción más larga sin revisión', 'Aceptar el primer diagrama'], answer: 0, explanation: 'La calidad viene de la evidencia y la revisión, no de la seguridad con que responde el asistente.' },
  quality: { question: '¿Qué dimensión suele faltar cuando solo revisas si el ERD “se ve bien”?', options: ['Pruebas, seguridad y evolución', 'Más colores', 'Más entidades sin requisito'], answer: 0, explanation: 'El modelo debe resistir operaciones reales y cambios futuros, no solo verse ordenado.' },
}

function TabButton({ active, id, children, onClick }: { active: boolean; id: string; children: React.ReactNode; onClick: () => void }) {
  return <button type="button" className={`toolkit-tab ${active ? 'active' : ''}`} role="tab" aria-selected={active} aria-controls={`${id}-panel`} onClick={onClick}>{children}</button>
}

function AnomalyVisual() {
  const [rows, setRows] = useState(4)
  const [separated, setSeparated] = useState(false)
  const contradictions = separated ? 0 : Math.max(1, rows - 1)
  return <div className="toolkit-visual-content">
    <div className="toolkit-controls"><label className="toolkit-range-label" htmlFor="anomaly-rows">Compras del mismo cliente <b>{rows}</b></label><input id="anomaly-rows" className="toolkit-range" type="range" min="2" max="8" value={rows} onChange={(event) => setRows(Number(event.target.value))} /><button type="button" className="soft-button" onClick={() => setSeparated((value) => !value)}>{separated ? 'Volver a hoja única' : 'Separar en tablas'}</button></div>
    <div className="anomaly-visual" aria-live="polite"><div className="anomaly-chart" role="img" aria-label={`${rows} filas repetidas y ${contradictions} puntos de contradicción`}><div className="chart-axis"><span>impacto</span><i style={{ height: `${Math.min(100, rows * 12)}%` }} /><b>{separated ? '0' : contradictions}</b></div>{Array.from({ length: rows }, (_, index) => <div key={index} className={`sheet-bar ${separated ? 'is-separated' : ''}`}><span>fila {index + 1}</span><i style={{ width: `${62 + index * 4}%` }} /></div>)}</div><div className={`anomaly-summary ${separated ? 'is-safe' : ''}`}><span className="toolkit-kicker">{separated ? 'Fuente de verdad' : 'Superficie de riesgo'}</span><strong>{separated ? '1 cambio' : `${contradictions} posibles contradicciones`}</strong><p>{separated ? 'CLIENTE conserva el teléfono una sola vez; COMPRA solo referencia al cliente.' : 'Cada repetición es otra oportunidad para actualizar una fila y olvidar las demás.'}</p></div></div>
  </div>
}

function EntityVisual() {
  const [focus, setFocus] = useState<'story' | 'entity' | 'attribute'>('entity')
  const labels = { story: 'Una historia contiene personas, cosas y hechos.', entity: 'CLIENTE · una cosa con identidad propia.', attribute: 'nombre · describe a una instancia.' }
  return <div className="toolkit-visual-content"><div className="toolkit-controls toolkit-choice-row">{(['story', 'entity', 'attribute'] as const).map((item) => <button type="button" className={`toolkit-choice ${focus === item ? 'active' : ''}`} key={item} onClick={() => setFocus(item)}>{item === 'story' ? 'Historia' : item === 'entity' ? 'Entidad' : 'Atributo'}</button>)}</div><div className="entity-visual" aria-live="polite"><div className={`entity-layer ${focus === 'story' ? 'is-focused' : ''}`}><span>01</span><strong>“Camila lleva su vehículo al taller”</strong><small>requisito</small></div><ArrowRight className="entity-layer-arrow" size={18} /><div className={`entity-layer entity-layer-main ${focus === 'entity' ? 'is-focused' : ''}`}><Boxes size={19} /><strong>CLIENTE</strong><small>instancias + identidad</small></div><ArrowRight className="entity-layer-arrow" size={18} /><div className={`entity-layer ${focus === 'attribute' ? 'is-focused' : ''}`}><span>id</span><strong>nombre</strong><small>dato descriptivo</small></div></div><p className="toolkit-live-copy"><Lightbulb size={15} /> {labels[focus]}</p></div>
}

function CardinalityVisual() {
  const [invoicesPerClient, setInvoicesPerClient] = useState<'1' | 'N'>('N')
  const [clientsPerInvoice, setClientsPerInvoice] = useState<'1' | 'N'>('1')
  const relation =
    invoicesPerClient === 'N' && clientsPerInvoice === 'N'
      ? 'N:M'
      : invoicesPerClient === 'N' && clientsPerInvoice === '1'
      ? '1:N'
      : invoicesPerClient === '1' && clientsPerInvoice === 'N'
      ? 'N:1'
      : '1:1'

  const clientSideCard = clientsPerInvoice
  const invoiceSideCard = invoicesPerClient === 'N' && clientsPerInvoice === 'N' ? 'M' : invoicesPerClient

  return (
    <div className="toolkit-visual-content">
      <div className="toolkit-controls cardinality-controls">
        <div>
          <span className="toolkit-kicker">Un CLIENTE tiene</span>
          <div className="toolkit-choice-group">
            <button
              type="button"
              className={invoicesPerClient === '1' ? 'active' : ''}
              onClick={() => setInvoicesPerClient('1')}
            >
              1 FACTURA
            </button>
            <button
              type="button"
              className={invoicesPerClient === 'N' ? 'active' : ''}
              onClick={() => setInvoicesPerClient('N')}
            >
              N FACTURAS
            </button>
          </div>
        </div>
        <div>
          <span className="toolkit-kicker">Una FACTURA pertenece a</span>
          <div className="toolkit-choice-group">
            <button
              type="button"
              className={clientsPerInvoice === '1' ? 'active' : ''}
              onClick={() => setClientsPerInvoice('1')}
            >
              1 CLIENTE
            </button>
            <button
              type="button"
              className={clientsPerInvoice === 'N' ? 'active' : ''}
              onClick={() => setClientsPerInvoice('N')}
            >
              N CLIENTES
            </button>
          </div>
        </div>
      </div>
      <div className="cardinality-visual" aria-live="polite">
        <div className="toolkit-node">
          CLIENTE
          <small>
            {relation === '1:N'
              ? 'Lado 1 (Padre / PK)'
              : relation === 'N:1'
              ? 'Lado N (Hija / Recibe FK)'
              : relation === '1:1'
              ? 'Lado 1 (Exclusivo)'
              : 'Participante N:M'}
          </small>
        </div>
        <div className="toolkit-relationship-line">
          <b>{clientSideCard}</b>
          <i />
          <b>{invoiceSideCard}</b>
        </div>
        <div className="toolkit-node">
          FACTURA
          <small>
            {relation === '1:N'
              ? 'Lado N (Hija / Recibe FK)'
              : relation === 'N:1'
              ? 'Lado 1 (Padre / PK)'
              : relation === '1:1'
              ? 'Lado 1 (Exclusivo)'
              : 'Participante N:M'}
          </small>
        </div>
      </div>
      <p className="toolkit-live-copy">
        <Link2 size={15} /> Resultado: <strong>{relation}</strong> ·{' '}
        {relation === '1:N'
          ? 'La FK id_cliente va en la tabla FACTURA (lado N) para apuntar a su padre.'
          : relation === 'N:1'
          ? 'La FK id_factura va en la tabla CLIENTE (lado N) para apuntar a la factura.'
          : relation === 'N:M'
          ? 'Relación muchos a muchos: requiere TABLA PUENTE asociativa (ej. CLIENTE_FACTURA).'
          : 'Relación 1:1: la FK va al lado dependiente con restricción UNIQUE.'}
      </p>
    </div>
  )
}

function TransformationVisual() {
  const [stage, setStage] = useState(2)
  const stages = ['Conceptual', 'PK identificada', 'Relacional']
  return <div className="toolkit-visual-content"><div className="toolkit-controls"><label className="toolkit-range-label" htmlFor="transform-stage">Capa observada <b>{stages[stage]}</b></label><input id="transform-stage" className="toolkit-range" type="range" min="0" max="2" value={stage} onChange={(event) => setStage(Number(event.target.value))} /><button type="button" className="soft-button" onClick={() => setStage(0)}><RefreshCcw size={14} /> Reiniciar viaje</button></div><div className="migration-visual" aria-live="polite"><div className={`migration-card ${stage >= 1 ? 'is-focused' : ''}`}><span>PADRE</span><strong>CLIENTE</strong><small>{stage >= 1 ? '🔑 id_cliente' : 'nombre'}</small></div><div className="migration-track"><ArrowRight size={21} /><span>{stage >= 2 ? 'PK → FK' : 'relación 1:N'}</span></div><div className={`migration-card ${stage >= 2 ? 'is-focused' : ''}`}><span>HIJA</span><strong>ORDEN</strong><small>{stage >= 2 ? '🔗 id_cliente' : 'fecha_ingreso'}</small></div></div><p className="toolkit-live-copy"><Workflow size={15} /> {stage === 0 ? 'Todavía estás describiendo el vínculo.' : stage === 1 ? 'La PK identifica al padre.' : 'La FK permite encontrar el padre desde cada orden.'}</p></div>
}

function ConstraintVisual() {
  const [documento, setDocumento] = useState('1045123')
  const [nombre, setNombre] = useState('Camila Rojas')
  const [policy, setPolicy] = useState<'RESTRICT' | 'CASCADE' | 'SET NULL'>('RESTRICT')
  const documentOk = /^\d{7,12}$/.test(documento)
  const nameOk = nombre.trim().length >= 3
  const valid = documentOk && nameOk
  return <div className="toolkit-visual-content"><div className="constraint-form"><label>documento · UQ<input value={documento} onChange={(event) => setDocumento(event.target.value)} inputMode="numeric" /></label><label>nombre · NN<input value={nombre} onChange={(event) => setNombre(event.target.value)} /></label><label>al borrar el cliente<select value={policy} onChange={(event) => setPolicy(event.target.value as typeof policy)}><option>RESTRICT</option><option>CASCADE</option><option>SET NULL</option></select></label></div><div className={`constraint-result ${valid ? 'is-valid' : 'is-invalid'}`} role="status"><span>{valid ? <Check size={15} /> : <AlertTriangle size={15} />}</span><div><strong>{valid ? 'Fila aceptable' : 'Fila bloqueada'}</strong><p>{valid ? `NN y UQ pasan. ON DELETE ${policy} queda como decisión explícita.` : 'Revisa que documento tenga 7–12 dígitos y que nombre no esté vacío.'}</p></div></div></div>
}

function RequirementsVisual() {
  const items = ['actores', 'entidades', 'hechos', 'reglas']
  const [selected, setSelected] = useState<string[]>(['actores', 'entidades'])
  const coverage = Math.round((selected.length / items.length) * 100)
  return <div className="toolkit-visual-content"><div className="requirement-checks">{items.map((item) => <label key={item} className={`requirement-check ${selected.includes(item) ? 'is-checked' : ''}`}><input type="checkbox" checked={selected.includes(item)} onChange={() => setSelected((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])} /><span>{selected.includes(item) ? <Check size={14} /> : <span />}</span>{item}</label>)}</div><div className="coverage-meter" role="progressbar" aria-label="Cobertura del requisito" aria-valuenow={coverage} aria-valuemin={0} aria-valuemax={100}><div><span>pistas convertibles en modelo</span><b>{coverage}%</b></div><i style={{ width: `${coverage}%` }} /></div><p className="toolkit-live-copy"><ListChecks size={15} /> {coverage === 100 ? 'Ya puedes pasar a preguntas de cardinalidad.' : `Faltan ${items.length - selected.length} capas: no dibujes todavía lo que el requisito no dice.`}</p></div>
}

function AiVisual() {
  const [checks, setChecks] = useState({ context: true, assumptions: false, tests: false })
  const score = Object.values(checks).filter(Boolean).length
  const risk = score === 3 ? 'bajo' : score === 2 ? 'medio' : 'alto'
  return <div className="toolkit-visual-content"><div className="ai-risk-controls">{([['context', 'Contexto del dominio'], ['assumptions', 'Supuestos visibles'], ['tests', 'Pruebas ejecutadas']] as const).map(([key, label]) => <label key={key} className={`ai-risk-toggle ${checks[key] ? 'is-on' : ''}`}><input type="checkbox" checked={checks[key]} onChange={() => setChecks((current) => ({ ...current, [key]: !current[key] }))} /><span>{checks[key] ? <Check size={14} /> : <span />}</span>{label}</label>)}</div><div className={`risk-meter risk-${risk}`} role="status"><Gauge size={21} /><div><span>riesgo de aceptar una hipótesis sin validar</span><strong>{risk.toUpperCase()}</strong></div><div className="risk-dots">{[0, 1, 2].map((item) => <i key={item} className={item < score ? 'on' : ''} />)}</div></div><p className="toolkit-live-copy"><Brain size={15} /> {score === 3 ? 'La propuesta todavía requiere criterio, pero ya tiene trazabilidad suficiente para revisarla.' : 'Activa las tres capas para que la respuesta deje de ser solo plausible y pueda auditarse.'}</p></div>
}

function QualityVisual() {
  const layers = ['estructura', 'operación', 'seguridad', 'pruebas', 'evolución']
  const [selected, setSelected] = useState<string[]>(['estructura', 'operación'])
  const coverage = Math.round((selected.length / layers.length) * 100)
  return <div className="toolkit-visual-content"><div className="quality-stack">{layers.map((layer, index) => <button type="button" key={layer} className={selected.includes(layer) ? 'is-on' : ''} onClick={() => setSelected((current) => current.includes(layer) ? current.filter((value) => value !== layer) : [...current, layer])}><span>{String(index + 1).padStart(2, '0')}</span><strong>{layer}</strong><small>{selected.includes(layer) ? 'revisado' : 'pendiente'}</small></button>)}</div><div className="quality-footer"><div className="coverage-meter" role="progressbar" aria-label="Cobertura profesional del modelo" aria-valuenow={coverage} aria-valuemin={0} aria-valuemax={100}><div><span>cobertura del modelo</span><b>{coverage}%</b></div><i style={{ width: `${coverage}%` }} /></div><p className="toolkit-live-copy"><ShieldCheck size={15} /> {coverage === 100 ? 'El ERD ya está acompañado por decisiones operativas.' : 'Un ERD correcto puede fallar si no contempla lo que sucede alrededor de las tablas.'}</p></div></div>
}

function Visual({ variant }: { variant: ToolkitVariant }) {
  if (variant === 'anomalies') return <AnomalyVisual />
  if (variant === 'entities') return <EntityVisual />
  if (variant === 'cardinality') return <CardinalityVisual />
  if (variant === 'transformation') return <TransformationVisual />
  if (variant === 'constraints') return <ConstraintVisual />
  if (variant === 'requirements') return <RequirementsVisual />
  if (variant === 'ai') return <AiVisual />
  return <QualityVisual />
}

function Challenge({ variant }: { variant: ToolkitVariant }) {
  const challenge = challengeData[variant]
  const [answer, setAnswer] = useState<number | null>(null)
  const solved = answer === challenge.answer
  return <div className="toolkit-challenge"><div className="challenge-question"><CircleHelp size={18} /><strong>{challenge.question}</strong></div><div className="challenge-options">{challenge.options.map((option, index) => <button type="button" key={option} className={answer === index ? (solved ? 'is-correct' : 'is-wrong') : ''} onClick={() => setAnswer(index)}>{String.fromCharCode(65 + index)} · {option}</button>)}</div>{answer !== null && <p className={`challenge-feedback ${solved ? 'is-correct' : 'is-wrong'}`}><span>{solved ? <Check size={15} /> : <AlertTriangle size={15} />}</span>{solved ? 'Correcto. ' : 'Aún no. '} {challenge.explanation}</p>}</div>
}

export default function LearningToolkit({ variant }: { variant: ToolkitVariant }) {
  const config = configs[variant]
  const [tab, setTab] = useState<Tab>('visual')
  const TabIcon = tab === 'analogy' ? Lightbulb : tab === 'visual' ? BarChart3 : MousePointer2
  const tabLabel = useMemo(() => tab === 'analogy' ? 'Analogía' : tab === 'visual' ? 'Simulador' : 'Reto rápido', [tab])
  return <section className={`learning-toolkit toolkit-${variant}`} aria-labelledby={`toolkit-${variant}-title`}>
    <div className="toolkit-header"><div><span className="toolkit-eyebrow">{config.eyebrow}</span><h2 id={`toolkit-${variant}-title`}>{config.title}</h2><p>{config.description}</p></div><span className="toolkit-icon"><Sparkles size={18} /></span></div>
    <div className="toolkit-tabs" role="tablist" aria-label={`Herramientas del ${variant}`}><TabButton active={tab === 'analogy'} id={`toolkit-${variant}-analogy`} onClick={() => setTab('analogy')}><Lightbulb size={14} /> Analogía</TabButton><TabButton active={tab === 'visual'} id={`toolkit-${variant}-visual`} onClick={() => setTab('visual')}><SlidersHorizontal size={14} /> Simulador</TabButton><TabButton active={tab === 'challenge'} id={`toolkit-${variant}-challenge`} onClick={() => setTab('challenge')}><MousePointer2 size={14} /> Reto rápido</TabButton></div>
    <div className="toolkit-panel" id={`toolkit-${variant}-${tab}-panel`} role="tabpanel" aria-live="polite" aria-label={tabLabel}>
      {tab === 'analogy' && <div className="toolkit-analogy"><div className="analogy-quote"><Lightbulb size={20} /><p>{config.analogy}</p></div><div className="toolkit-steps"><span className="toolkit-kicker">Método en tres movimientos</span>{config.steps.map((step, index) => <div key={step}><b>0{index + 1}</b><span>{step}</span>{index < config.steps.length - 1 && <ArrowRight size={14} />}</div>)}</div><p className="toolkit-bridge"><Link2 size={15} /> {config.bridge}</p></div>}
      {tab === 'visual' && <Visual variant={variant} />}
      {tab === 'challenge' && <Challenge variant={variant} />}
    </div>
  </section>
}
