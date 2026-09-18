import { ArrowRight, Check, CircleHelp, Compass, FileCode2, Gauge, Layers, Play, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { courseModules, type ModuleKey } from '../../data/course'
import type { ProjectState, SkillProgress } from '../../hooks/useLocalProgress'

interface HomeViewProps {
  completed: ModuleKey[]
  skillProgress: Record<string, SkillProgress>
  projectState: ProjectState
  onStart: (key: ModuleKey) => void
}

export default function HomeView({ completed, skillProgress, projectState, onStart }: HomeViewProps) {
  const next = courseModules.find((item) => !completed.includes(item.key)) ?? courseModules[0]
  const practicedSkills = courseModules.filter((module) => skillProgress[`mer.${module.key}`]?.status !== undefined || completed.includes(module.key)).length
  const commitCount = projectState.commits.length
  const schemaFields = projectState.schema ? projectState.schema.split('\n').filter(Boolean).length : 0
  const requirementReady = projectState.requirements.some((requirement) => requirement.text.trim().length >= 25)

  return (
    <motion.div className="page-shell home-page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      {/* HERO PRINCIPAL */}
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="label-pill">
            <Sparkles size={13} /> Ruta Integral · {courseModules.length} estaciones interactivas
          </span>
          <h1>Las bases de datos<br /><em>empiezan con una historia.</em></h1>
          <p>
            Aprende a analizar cualquier sistema de información desde el punto cero (enunciado en lenguaje natural) hasta construir tablas relacionales robustas, normalizadas y con integridad garantizada.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => onStart(next.key)}>
              <Play size={16} fill="currentColor" /> {completed.length ? 'Continuar la ruta' : 'Comenzar desde el punto cero'}
              <ArrowRight size={16} />
            </button>
            <span className="hero-meta">
              <span className="status-dot" /> Guardado local · 100% interactivo
            </span>
          </div>
        </div>

        <div className="hero-diagram" aria-label="Diagrama visual conceptual y relacional">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="diagram-line line-one" />
          <span className="diagram-line line-two" />
          <div className="diagram-node node-client">
            <span>01</span><b>ENTIDAD</b><small>Identidad + Atributos</small>
          </div>
          <div className="diagram-node node-order">
            <span>02</span><b>CARDINALIDAD</b><small>(Min..Max) Bidireccional</small>
          </div>
          <div className="diagram-node node-service">
            <span>03</span><b>TABLAS SQL</b><small>PK + FK + 1FN..3FN</small>
          </div>
          <div className="diagram-center">MER<span>→</span>SQL</div>
        </div>
      </section>

      {/* HIGHLIGHTS / NOVEDADES METODOLÓGICAS */}
      <div className="home-grid">
        <section className="next-card panel-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">Tu Próxima Estación</span>
              <h2>{next.number} · {next.title}</h2>
            </div>
            <span className={`accent-icon bg-${next.color}`}><Compass size={18} /></span>
          </div>
          <p>{next.description}</p>
          <div className="next-footer">
            <span><Gauge size={15} /> 12 min aprox.</span>
            <button className="text-button" type="button" onClick={() => onStart(next.key)}>
              Ir a la estación <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <section className="learning-contract panel-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">Competencias del Aprendiz</span>
              <h2>Al finalizar podrás modelar cualquier sistema</h2>
            </div>
            <CircleHelp size={19} className="muted-icon" />
          </div>
          <ul>
            <li>
              <Check size={15} />
              <b>Analizar desde cero:</b> Extraer tablas y atributos desde una narrativa con el Método Morfosintáctico.
            </li>
            <li>
              <Check size={15} />
              <b>Razonar conexiones:</b> Determinar cardinalidad mínima/máxima `(min, max)` y aplicar las 7 reglas de derivación.
            </li>
            <li>
              <Check size={15} />
              <b>Normalizar y proteger:</b> Erradicar anomalías con 1FN, 2FN y 3FN, definiendo tipos SQL y políticas ON DELETE.
            </li>
          </ul>
        </section>
      </div>

      {/* BANNER DESTACADO: MASTERCLASS DE NORMALIZACIÓN 1FN-3FN */}
      <section
        className="normalization-featured-banner panel-card"
        style={{
          marginTop: '20px',
          padding: '18px 22px',
          border: '1px solid color-mix(in srgb, var(--cyan) 35%, var(--line))',
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--cyan) 8%, var(--surface)), var(--surface))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', maxWidth: '780px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'color-mix(in srgb, var(--cyan) 15%, transparent)',
              border: '1px solid var(--cyan)',
              color: 'var(--cyan)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <Layers size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Laboratorio Maestro Interactivo</span>
              <span className="label-pill" style={{ background: 'color-mix(in srgb, var(--cyan) 15%, transparent)', color: 'var(--cyan)', borderColor: 'var(--cyan)', fontSize: '9px', padding: '1px 7px' }}>
                1FN · 2FN · 3FN
              </span>
            </div>
            <strong style={{ fontSize: '15px', color: 'var(--ink)', display: 'block', margin: '3px 0' }}>
              De la Factura Comercial al Modelo Relacional y al Código
            </strong>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '11px', lineHeight: 1.5 }}>
              Descubre con un caso práctico cómo desglosar un documento real de empresa, resolver el dilema del precio histórico, compilar el DER en Mermaid y generar las entidades en PostgreSQL, Prisma y Spring Boot.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => onStart('m7')}
          style={{ fontSize: '11px', padding: '9px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          Explorar Normalización <ArrowRight size={14} />
        </button>
      </section>

      <section className="project-ledger panel-card" aria-labelledby="project-ledger-title">
        <div className="card-heading">
          <div>
            <span className="eyebrow">Expediente vivo</span>
            <h2 id="project-ledger-title">El aprendizaje deja evidencia acumulada</h2>
          </div>
          <span className="route-counter">{practicedSkills}/{courseModules.length} prácticas · {commitCount} commits</span>
        </div>
        <p className="project-ledger-intro">Tu requisito, tus decisiones y tus artefactos deben crecer juntos. “Practicado” no significa todavía “transferido”.</p>
        <div className="ledger-grid">
          <div className={`ledger-item ${requirementReady ? 'is-ready' : ''}`}><FileCode2 size={17} /><span><b>Requisito</b><small>{requirementReady ? 'Capturado y listo para analizar' : 'Pendiente de contexto suficiente'}</small></span></div>
          <div className={`ledger-item ${projectState.entities.length ? 'is-ready' : ''}`}><Layers size={17} /><span><b>Modelo conceptual</b><small>{projectState.entities.length ? `${projectState.entities.length} entidades registradas` : 'Se completa durante las estaciones'}</small></span></div>
          <div className={`ledger-item ${schemaFields ? 'is-ready' : ''}`}><Gauge size={17} /><span><b>Esquema</b><small>{schemaFields ? `${schemaFields} campos en el expediente` : 'Aún no hay campos persistidos'}</small></span></div>
          <div className={`ledger-item ${projectState.decisions.length ? 'is-ready' : ''}`}><CircleHelp size={17} /><span><b>Decisiones</b><small>{projectState.decisions.length ? `${projectState.decisions.length} decisiones trazadas` : 'Registra por qué aceptas o corriges una propuesta'}</small></span></div>
        </div>
      </section>

      {/* RUTA DE LAS ESTACIONES */}
      <section className="route-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Mapa Pedagógico</span>
            <h2>{courseModules.length} estaciones, un solo hilo conductor</h2>
          </div>
          <span className="route-counter">{completed.length}/{courseModules.length} completadas</span>
        </div>

        <div className="module-grid">
          {courseModules.map((module, index) => {
            const done = completed.includes(module.key)
            return (
              <button
                key={module.key}
                type="button"
                className={`module-card color-${module.color} ${done ? 'done' : ''}`}
                onClick={() => onStart(module.key)}
              >
                <div className="module-card-top">
                  <span className="module-card-number">{done ? <Check size={15} /> : module.number}</span>
                  <span className="module-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <span className="eyebrow">{module.eyebrow}</span>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <span className="module-status">
                  {skillProgress[`mer.${module.key}`]?.status === 'transferred'
                    ? 'Transferido'
                    : skillProgress[`mer.${module.key}`]?.status === 'mastered'
                      ? 'Dominado'
                      : skillProgress[`mer.${module.key}`]?.status === 'practiced' || done
                        ? 'Practicado · pendiente transferencia'
                        : index === 0 ? 'Listo para comenzar' : 'Disponible para explorar'}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ARTEFACTO FINAL Y LISTA DE CHEQUEO SENA */}
      <section className="evidence-strip" onClick={() => onStart('portafolio')} style={{ cursor: 'pointer' }}>
        <FileCode2 size={19} />
        <div style={{ flex: 1 }}>
          <strong>Tu resultado: Portafolio de Evidencias, Lista de Chequeo SENA y Documento con Firmas.</strong>
          <span>Revisa tu progreso real, audita los 6 criterios contra el estándar institucional, estampa tu firma y genera el PDF listo para la plataforma LMS.</span>
        </div>
        <button type="button" className="text-button" style={{ color: '#39a900', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          Ver Portafolio SENA <ArrowRight size={15} />
        </button>
      </section>
    </motion.div>
  )
}
