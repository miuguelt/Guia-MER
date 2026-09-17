import { ArrowRight, BookOpen, Check, CircleHelp, HelpCircle, Link2, Minus, Plus, RotateCcw, Table2, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import LearningToolkit from '../../components/LearningToolkit'
import CardinalityNotationDeepDive from './CardinalityNotationDeepDive'

type RelationshipType = '1:1' | '1:N' | 'N:1' | 'N:M'
type MaxValue = '1' | 'N'

interface RelationshipPattern {
  type: RelationshipType
  title: string
  subtitle: string
  left: string
  right: string
  directionLeft: string
  directionRight: string
  example: string
  implementation: string
  accent: 'lime' | 'amber' | 'rose'
}

const relationshipPatterns: RelationshipPattern[] = [
  {
    type: '1:1',
    title: 'Uno a uno',
    subtitle: 'Una instancia encuentra como máximo una pareja.',
    left: 'PERSONA',
    right: 'PASAPORTE',
    directionLeft: 'Una persona tiene como máximo un pasaporte.',
    directionRight: 'Un pasaporte pertenece como máximo a una persona.',
    example: 'Persona ↔ pasaporte',
    implementation: 'Puede vivir una FK en uno de los lados. Antes de decidir, revisa quién existe primero, si la relación es opcional y si ambas entidades tienen ciclos de vida distintos.',
    accent: 'lime',
  },
  {
    type: '1:N',
    title: 'Uno a muchos',
    subtitle: 'Una instancia del lado 1 (padre) se asocia con varias del lado N (hija).',
    left: 'CLIENTE',
    right: 'PEDIDO',
    directionLeft: 'Un cliente puede tener muchos pedidos.',
    directionRight: 'Cada pedido pertenece a un solo cliente.',
    example: 'Cliente (1) → (N) Pedidos',
    implementation: 'La tabla del lado N recibe la FK del lado 1. Por eso pedido guarda id_cliente: muchas filas de pedido pueden apuntar al mismo cliente.',
    accent: 'amber',
  },
  {
    type: 'N:1',
    title: 'Muchos a uno',
    subtitle: 'Múltiples instancias del lado N apuntan a una sola del lado 1.',
    left: 'ORDEN',
    right: 'CLIENTE',
    directionLeft: 'Cada orden pertenece a un único cliente.',
    directionRight: 'Un cliente puede originar múltiples órdenes.',
    example: 'Órdenes (N) → (1) Cliente',
    implementation: 'La tabla izquierda (orden) actúa como lado N e incorpora la FK id_cliente apuntando a la tabla derecha (cliente, lado 1).',
    accent: 'amber',
  },
  {
    type: 'N:M',
    title: 'Muchos a muchos',
    subtitle: 'Ambos lados pueden participar muchas veces.',
    left: 'ESTUDIANTE',
    right: 'CURSO',
    directionLeft: 'Un estudiante puede tomar muchos cursos.',
    directionRight: 'Un curso puede tener muchos estudiantes.',
    example: 'Estudiante ↔ cursos',
    implementation: 'En el modelo relacional nace una tabla puente, por ejemplo matricula, con id_estudiante, id_curso y los datos propios de esa inscripción.',
    accent: 'rose',
  },
]

const practiceScenarios: Array<{ id: number; text: string; answer: RelationshipType; hint: string }> = [
  { id: 1, text: 'Un país tiene muchos municipios. Cada municipio pertenece a un solo país.', answer: '1:N', hint: 'La palabra “cada” fija el lado 1 desde el municipio hacia el país (País 1:N Municipio).' },
  { id: 2, text: 'Una persona puede tener máximo un pasaporte y un pasaporte pertenece a una sola persona.', answer: '1:1', hint: 'En ambos sentidos aparece “uno como máximo”.' },
  { id: 3, text: 'Un estudiante cursa varias asignaturas y una asignatura es cursada por varios estudiantes.', answer: 'N:M', hint: 'Ambos lados pueden repetirse: necesitas representar cada pareja estudiante–asignatura con tabla puente.' },
  { id: 4, text: 'Muchas órdenes de trabajo son atendidas por un único supervisor de planta asignado.', answer: 'N:1', hint: 'Múltiples órdenes del lado izquierdo (N) apuntan al supervisor único (1) a la derecha.' },
]

function RelationshipSketch({ type, left, right, compact = false }: { type: RelationshipType; left: string; right: string; compact?: boolean }) {
  const leftMany = type === 'N:M' || type === 'N:1'
  const rightMany = type === 'N:M' || type === '1:N'
  const leftLabel = leftMany ? 'N' : '1'
  const rightLabel = type === 'N:M' ? 'M' : rightMany ? 'N' : '1'
  return <svg className={`relationship-sketch ${compact ? 'is-compact' : ''}`} viewBox="0 0 360 160" role="img" aria-label={`Diagrama ${type}: ${left} se relaciona con ${right}`}>
    <title>{`${left} ${type} ${right}`}</title>
    <desc>Las marcas en los extremos muestran si cada instancia se relaciona con una o con muchas instancias.</desc>
    <line className="sketch-connection" x1="100" y1="80" x2="260" y2="80" />
    <g className="sketch-entity sketch-left">
      <rect x="16" y="49" width="84" height="62" rx="8" />
      <text x="58" y="75" textAnchor="middle">{left}</text>
      <text className="sketch-caption" x="58" y="94" textAnchor="middle">{leftMany ? 'lado N' : 'lado 1'}</text>
    </g>
    <g className="sketch-entity sketch-right">
      <rect x="260" y="49" width="84" height="62" rx="8" />
      <text x="302" y="75" textAnchor="middle">{right}</text>
      <text className="sketch-caption" x="302" y="94" textAnchor="middle">{rightMany ? (type === 'N:M' ? 'lado M' : 'lado N') : 'lado 1'}</text>
    </g>
    <g className={`sketch-mark sketch-left-mark ${leftMany ? 'many' : 'one'}`}>
      {leftMany ? <>
        <line x1="114" y1="80" x2="130" y2="65" />
        <line x1="114" y1="80" x2="133" y2="80" />
        <line x1="114" y1="80" x2="130" y2="95" />
        <text x="139" y="57">{leftLabel}</text>
      </> : <>
        <line x1="116" y1="67" x2="116" y2="93" />
        <line x1="123" y1="67" x2="123" y2="93" />
        <text x="132" y="57">1</text>
      </>}
    </g>
    <g className={`sketch-mark sketch-right-mark ${rightMany ? 'many' : 'one'}`}>
      {rightMany ? <>
        <line x1="246" y1="80" x2="230" y2="65" />
        <line x1="246" y1="80" x2="227" y2="80" />
        <line x1="246" y1="80" x2="230" y2="95" />
        <text x="216" y="57">{rightLabel}</text>
      </> : <>
        <line x1="237" y1="67" x2="237" y2="93" />
        <line x1="244" y1="67" x2="244" y2="93" />
        <text x="218" y="57">1</text>
      </>}
    </g>
    <text className="sketch-reading" x="180" y="132" textAnchor="middle">lee los dos extremos</text>
  </svg>
}

function BridgeSketch() {
  return <div className="bridge-sketch" role="img" aria-label="Tabla puente entre estudiante y curso">
    <div className="bridge-table"><span>ESTUDIANTE</span><small>id_estudiante</small></div>
    <div className="bridge-connector"><i /><i /><i /></div>
    <div className="bridge-table bridge-focus"><span>MATRÍCULA</span><small>id_estudiante + id_curso</small></div>
    <div className="bridge-connector"><i /><i /><i /></div>
    <div className="bridge-table"><span>CURSO</span><small>id_curso</small></div>
  </div>
}

function MaxChoice({ value, current, label, onSelect }: { value: MaxValue; current: MaxValue; label: string; onSelect: (value: MaxValue) => void }) {
  return <button type="button" className={`max-choice ${current === value ? 'is-selected' : ''}`} aria-pressed={current === value} onClick={() => onSelect(value)}>
    <span className="max-choice-symbol">{value}</span>
    <span>{label}</span>
  </button>
}

interface CardinalityEvidence { relation: string; score: number }

export default function CardinalityLab({ onComplete }: { onComplete: (evidence?: CardinalityEvidence) => void }) {
  const [invoicesPerClient, setInvoicesPerClient] = useState<MaxValue>('N')
  const [clientsPerInvoice, setClientsPerInvoice] = useState<MaxValue>('1')
  const [answers, setAnswers] = useState<Record<number, RelationshipType>>({})

  const relationship: RelationshipType = useMemo(() => {
    if (invoicesPerClient === '1' && clientsPerInvoice === '1') return '1:1'
    if (invoicesPerClient === 'N' && clientsPerInvoice === 'N') return 'N:M'
    if (invoicesPerClient === 'N' && clientsPerInvoice === '1') return '1:N'
    return 'N:1'
  }, [clientsPerInvoice, invoicesPerClient])

  const activePattern = relationshipPatterns.find((pattern) => pattern.type === relationship) ?? relationshipPatterns[1]
  const score = practiceScenarios.filter((scenario) => answers[scenario.id] === scenario.answer).length
  const explain = relationship === '1:1'
    ? 'Cada cliente tiene como máximo una factura y cada factura pertenece como máximo a un cliente.'
    : relationship === 'N:M'
      ? 'Un cliente puede tener muchas facturas y una factura puede asociarse con muchos clientes: en el modelo relacional requieres obligatoriamente una tabla asociativa puente.'
      : relationship === '1:N'
        ? 'Un cliente puede acumular muchas facturas, pero cada factura pertenece obligatoriamente a un solo cliente padre.'
        : 'Múltiples clientes pueden compartir una factura, pero cada cliente se asocia a lo sumo con una factura.'
  return <motion.div className="page-shell module-page cardinality-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <section className="module-hero cardinality-hero">
      <div>
        <span className="label-pill amber-pill">MÓDULO 02 · CONEXIONES</span>
        <h1>No memorices la pata de gallo.<br /><em>Aprende a leer el negocio.</em></h1>
        <p>La cardinalidad responde una pregunta muy concreta: ¿cuántas instancias de una entidad pueden relacionarse con una instancia de la otra? Hazla en los dos sentidos y el diagrama aparece.</p>
        <div className="hero-micro-rule"><Target size={16} /><span><strong>Regla de bolsillo:</strong> pregunta, invierte la mirada y traduce.</span></div>
      </div>
      <figure className="cardinality-hero-visual">
        <img src="/images/cardinalidad-triptych.png" alt="Tres escenas visuales: una relación exclusiva, una relación que se ramifica y una red que necesita un puente" />
        <figcaption><span>exclusivo</span><i>→</i><span>ramifica</span><i>→</i><span>se cruza</span></figcaption>
      </figure>
    </section>

    <LearningToolkit variant="cardinality" />

    <section className="mental-model" aria-labelledby="mental-model-title">
      <div className="section-heading compact-heading"><div><span className="eyebrow">Antes de dibujar</span><h2 id="mental-model-title">Una relación es un contrato, no una línea</h2></div><span className="section-note">máximo primero · mínimo después</span></div>
      <div className="mental-model-grid">
        <div className="mental-step"><span>01</span><strong>Elige una instancia</strong><p>“Un cliente concreto”, no “los clientes” en abstracto.</p></div>
        <div className="mental-arrow"><ArrowRight size={17} /></div>
        <div className="mental-step"><span>02</span><strong>Cuenta sus parejas</strong><p>¿Con cuántos pedidos puede relacionarse?</p></div>
        <div className="mental-arrow"><ArrowRight size={17} /></div>
        <div className="mental-step"><span>03</span><strong>Invierte la mirada</strong><p>¿Cuántos clientes puede tener un pedido?</p></div>
      </div>
      <div className="symbol-legend"><span><b className="one-symbol">||</b> uno como máximo</span><span><b className="many-symbol">⟨&lt;</b> muchos como máximo</span><span><b className="optional-symbol">0..1</b> opcionalidad: se estudia después</span></div>
    </section>

    <section className="relationship-atlas" aria-labelledby="atlas-title">
      <div className="section-heading"><div><span className="eyebrow">Mapa de patrones</span><h2 id="atlas-title">Las tres formas que debes reconocer</h2></div><span className="section-note">mira ambos extremos</span></div>
      <div className="relationship-grid">
        {relationshipPatterns.map((pattern, index) => <article className={`relationship-card accent-${pattern.accent}`} key={pattern.type}>
          <div className="relationship-card-top"><span className="pattern-index">0{index + 1}</span><span className="pattern-code">{pattern.type}</span></div>
          <h3>{pattern.title}</h3>
          <p className="relationship-subtitle">{pattern.subtitle}</p>
          <RelationshipSketch type={pattern.type} left={pattern.left} right={pattern.right} />
          <div className="direction-readings">
            <div><span>Desde {pattern.left}</span><strong>{pattern.directionLeft}</strong></div>
            <div><span>Desde {pattern.right}</span><strong>{pattern.directionRight}</strong></div>
          </div>
          <div className="relationship-example"><BookOpen size={15} /><span><b>Imagen mental:</b> {pattern.example}</span></div>
          <div className="relationship-implementation"><Table2 size={15} /><div><span>Al llevarlo a tablas</span><p>{pattern.implementation}</p></div></div>
          {pattern.type === 'N:M' && <BridgeSketch />}
        </article>)}
      </div>
    </section>

    <section className="cardinality-lab panel-card" aria-labelledby="sandbox-title">
      <div className="lab-head"><div><span className="eyebrow">Sandbox de cardinalidad</span><h2 id="sandbox-title">Cambia un límite y observa cómo cambia el modelo</h2><p className="lab-intro">No estás escogiendo un símbolo por gusto: estás declarando una regla del negocio.</p></div><button className="soft-button" type="button" onClick={() => { setInvoicesPerClient('N'); setClientsPerInvoice('1') }}><RotateCcw size={14} /> Reiniciar</button></div>
      <div className="question-grid">
        <div className="question-control"><div className="question-number">A</div><div><span className="question-label">Toma un CLIENTE</span><strong>¿cuántas FACTURAS puede tener?</strong></div><div className="choice-row"><MaxChoice value="1" current={invoicesPerClient} label="una" onSelect={setInvoicesPerClient} /><MaxChoice value="N" current={invoicesPerClient} label="muchas" onSelect={setInvoicesPerClient} /></div><div className="stepper"><button type="button" onClick={() => setInvoicesPerClient('1')} aria-label="Fijar una factura"><Minus size={14} /></button><span>máximo: <b>{invoicesPerClient}</b></span><button type="button" onClick={() => setInvoicesPerClient('N')} aria-label="Fijar muchas facturas"><Plus size={14} /></button></div></div>
        <div className="question-control"><div className="question-number">B</div><div><span className="question-label">Toma una FACTURA</span><strong>¿cuántos CLIENTES puede tener?</strong></div><div className="choice-row"><MaxChoice value="1" current={clientsPerInvoice} label="uno" onSelect={setClientsPerInvoice} /><MaxChoice value="N" current={clientsPerInvoice} label="muchos" onSelect={setClientsPerInvoice} /></div><div className="stepper"><button type="button" onClick={() => setClientsPerInvoice('1')} aria-label="Fijar un cliente"><Minus size={14} /></button><span>máximo: <b>{clientsPerInvoice}</b></span><button type="button" onClick={() => setClientsPerInvoice('N')} aria-label="Fijar muchos clientes"><Plus size={14} /></button></div></div>
      </div>
      <div className="sandbox-result" aria-live="polite">
        <div className="sandbox-visual"><RelationshipSketch type={relationship} left="CLIENTE" right="FACTURA" compact /></div>
        <div className="sandbox-copy">
          <span className={`relationship-badge relationship-${relationship.replace(':', '-')}`}>{relationship}</span>
          <h3>{activePattern.title}: {activePattern.subtitle}</h3>
          <p>{explain}</p>
          <div className="sandbox-translation">
            <Link2 size={15} />
            <span>
              <b>Traducción técnica:</b>{' '}
              {relationship === '1:N'
                ? 'CLIENTE es Lado 1 (Padre / PK). FACTURA es Lado N (Hija) y recibe la FK id_cliente.'
                : relationship === 'N:1'
                ? 'FACTURA es Lado 1 (Padre / PK). CLIENTE es Lado N (Hija) y recibe la FK id_factura.'
                : relationship === 'N:M'
                ? 'Ambos lados se multiplican: Nace una tabla asociativa puente (ej. cliente_factura) con (id_cliente, id_factura).'
                : 'Relación 1:1 exclusiva: La FK con restricción UNIQUE va en la tabla de existencia dependiente u obligatoria.'}
            </span>
          </div>
          <div className="sandbox-sql-preview">
            <small className="sql-preview-label">DDL SQL Físico resultante:</small>
            <pre data-dbc="omitir"><code>
              {relationship === '1:N'
                ? 'CREATE TABLE factura (\n  id_factura BIGSERIAL PRIMARY KEY,\n  id_cliente UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE RESTRICT,\n  total NUMERIC(12,2) NOT NULL\n);'
                : relationship === 'N:1'
                ? 'CREATE TABLE cliente (\n  id_cliente UUID PRIMARY KEY,\n  id_factura BIGINT NOT NULL REFERENCES factura(id_factura),\n  nombre VARCHAR(120) NOT NULL\n);'
                : relationship === 'N:M'
                ? 'CREATE TABLE cliente_factura (\n  id_cliente UUID REFERENCES cliente(id_cliente) ON DELETE CASCADE,\n  id_factura BIGINT REFERENCES factura(id_factura) ON DELETE RESTRICT,\n  PRIMARY KEY (id_cliente, id_factura)\n);'
                : 'CREATE TABLE factura (\n  id_factura BIGSERIAL PRIMARY KEY,\n  id_cliente UUID NOT NULL UNIQUE REFERENCES cliente(id_cliente),\n  fecha_emision DATE NOT NULL\n);'}
            </code></pre>
          </div>
        </div>
      </div>
    </section>
    <CardinalityNotationDeepDive />

    <section className="build-method" aria-labelledby="build-method-title">
      <div className="section-heading"><div><span className="eyebrow">Método transferible</span><h2 id="build-method-title">Cómo construir tu propio diagrama</h2></div><span className="section-note">del requisito al ERD</span></div>
      <ol className="method-rail">
        <li><span>1</span><strong>Subraya sustantivos</strong><p>Posibles entidades: cliente, pedido, curso.</p></li>
        <li><span>2</span><strong>Escribe el verbo</strong><p>“Cliente realiza pedido”.</p></li>
        <li><span>3</span><strong>Pregunta A y B</strong><p>Cuenta las parejas en ambos sentidos.</p></li>
        <li><span>4</span><strong>Dibuja 1 o N</strong><p>Usa marcas y texto, no solo color.</p></li>
        <li><span>5</span><strong>Traduce a tablas</strong><p>FK en N; puente en N:M.</p></li>
      </ol>
      <div className="method-callout"><HelpCircle size={17} /><div><strong>Una comprobación que evita errores</strong><p>Lee cada extremo como una frase completa: “un ___ puede relacionarse con ___”. Si la frase no describe el negocio real, corrige el requisito antes de tocar SQL.</p></div></div>
    </section>

    <section className="practice-lab" aria-labelledby="practice-title">
      <div className="section-heading"><div><span className="eyebrow">Práctica de transferencia</span><h2 id="practice-title">Clasifica antes de dibujar</h2></div><span className="practice-score">{score}/{practiceScenarios.length} correctas</span></div>
      <p className="practice-intro">Lee la situación, decide los máximos en tu mente y luego elige la forma. La retroalimentación explica la pista, no solo la respuesta.</p>
      <div className="practice-grid">
        {practiceScenarios.map((scenario) => {
          const answer = answers[scenario.id]
          const isCorrect = answer === scenario.answer
          return <article className={`practice-card ${answer ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`} key={scenario.id}>
            <div className="practice-card-top"><span>CASO 0{scenario.id}</span>{answer && (isCorrect ? <Check size={15} /> : <CircleHelp size={15} />)}</div>
            <p>{scenario.text}</p>
            <div className="practice-options">{(['1:1', '1:N', 'N:1', 'N:M'] as RelationshipType[]).map((option) => <button type="button" key={option} className={answer === option ? 'is-selected' : ''} aria-pressed={answer === option} onClick={() => setAnswers((current) => ({ ...current, [scenario.id]: option }))}>{option}</button>)}</div>
            {answer && <small>{isCorrect ? 'Bien leído. ' : `La respuesta es ${scenario.answer}. `}{scenario.hint}</small>}
          </article>
        })}
      </div>
    </section>

    <section className="mistakes-section" aria-labelledby="mistakes-title">
      <div className="section-heading"><div><span className="eyebrow">Radar de errores</span><h2 id="mistakes-title">Tres confusiones que conviene desactivar</h2></div></div>
      <div className="mistakes-grid">
        <article><span>01</span><h3>“N” no significa “muchas filas aquí”</h3><p>Significa muchas instancias relacionadas con una instancia concreta del otro lado. Siempre hay que decir desde qué entidad estás mirando.</p></article>
        <article><span>02</span><h3>N:M no se guarda en una lista</h3><p>Una tabla puente convierte cada pareja en una fila y permite guardar datos de la relación, como fecha, rol o calificación.</p></article>
        <article><span>03</span><h3>1:1 no siempre se fusiona</h3><p>Dos entidades pueden seguir separadas si tienen permisos, ciclos de vida o reglas de obligatoriedad diferentes.</p></article>
      </div>
    </section>

    <button className="primary-button complete-button" type="button" onClick={() => onComplete({ relation: `CLIENTE ${relationship} FACTURA · ${explain}`, score: score / practiceScenarios.length })}>Ya puedo razonar cardinalidades <Check size={16} /></button>
  </motion.div>
}
