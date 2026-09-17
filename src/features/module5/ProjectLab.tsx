import { Check, Clipboard, Code2, Download, FileCode2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { mermaidCode, sqlCode } from '../../data/course'
import { projectExamples, type ProjectExample } from '../../data/ai'
import { realWorldCaseStudies } from '../../data/methodologyData'
import MermaidPreview from '../../components/MermaidPreview'
import { downloadText } from '../../lib/exports'
import LearningToolkit from '../../components/LearningToolkit'
import MethodologyMasterStepper from './MethodologyMasterStepper'
import type { ProjectState } from '../../hooks/useLocalProgress'

interface Props {
  text: string
  projectState: ProjectState
  onTextChange: (text: string) => void
  onProjectStateChange: (patch: Partial<ProjectState>) => void
  onComplete: () => void
}

export default function ProjectLab({ text, projectState, onTextChange, onProjectStateChange, onComplete }: Props) {
  const [copied, setCopied] = useState('')
  const [validated, setValidated] = useState(false)
  const [diagramCode, setDiagramCode] = useState(projectState.diagramCode || mermaidCode)
  const [activeSqlCode, setActiveSqlCode] = useState(projectState.sqlCode || sqlCode)

  const checks = useMemo(
    () => [
      {
        label: 'Hay al menos 2 entidades candidatas identificadas',
        pass: /cliente|veh[ií]culo|orden|producto|usuario|biblioteca|libro|aprendiz|pr[eé]stamo|paciente|m[eé]dico|cita|curso|animal|lote|potrero|mascota|propietario|servicio|tienda|pedido/i.test(text),
      },
      {
        label: 'Aparece al menos un verbo de relación o hecho',
        pass: /necesita|registra|tiene|solicita|pertenece|vende|atiende|cursa|matricula|rota|acumula|aplica|presta|realiza|guarda|posee|incluye|entrega/i.test(text),
      },
      { label: 'El enunciado describe el problema con contexto suficiente', pass: text.trim().length > 60 },
      {
        label: 'Cada requisito conecta entidad, relación y prueba',
        pass:
          projectState.requirements.length > 0 &&
          projectState.requirements.every((requirement) => requirement.entity.trim() && requirement.relation.trim() && requirement.test.trim()),
      },
    ],
    [projectState.requirements, text]
  )
  const passed = checks.filter((item) => item.pass).length
  const artifactChecks = [
    { label: 'Mermaid contiene un ERD y al menos dos entidades', pass: diagramCode.includes('erDiagram') && (diagramCode.match(/^\s*[A-Z][A-Z0-9_]*\s*\{/gm) || []).length >= 2 },
    { label: 'SQL contiene al menos dos tablas declaradas', pass: (activeSqlCode.match(/CREATE\s+TABLE/gi) || []).length >= 2 },
    { label: 'El expediente tiene campos para revisar en el esquema', pass: projectState.schema.split('\n').filter(Boolean).length >= 3 },
  ]

  const copy = async (value: string, name: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(name)
      window.setTimeout(() => setCopied(''), 1800)
    } catch {
      setCopied('Selecciona y copia el bloque')
    }
  }

  const loadCaseStudy = (caseId: string) => {
    const study = realWorldCaseStudies.find((c) => c.id === caseId)
    if (study) {
      onTextChange(study.narrative)
      setDiagramCode(study.mermaid)
      setActiveSqlCode(study.sqlSample)
      const topEntities = study.entities.slice(0, 3).map((e) => e.name).join(', ')
      const mainRel = study.relations[0] ? `${study.relations[0].source} ${study.relations[0].cardinality} ${study.relations[0].target}` : ''
      const mainTest = `Registrar ${study.entities[0]?.name || 'entidad'} y verificar integridad referencial con sus relaciones asociadas`
      onProjectStateChange({
        diagramCode: study.mermaid,
        sqlCode: study.sqlSample,
        requirements: [{
          id: 'REQ-01',
          text: study.narrative,
          entity: topEntities,
          relation: mainRel,
          test: mainTest,
          evidence: [],
          status: 'covered',
          source: 'learner'
        }]
      })
      setValidated(true)
    }
  }

  const loadExample = (example: ProjectExample) => {
    onTextChange(example.text)
    setDiagramCode(example.diagramCode)
    setActiveSqlCode(example.sqlCode)
    onProjectStateChange({
      diagramCode: example.diagramCode,
      sqlCode: example.sqlCode,
      requirements: [{
        id: 'REQ-01',
        text: example.text,
        entity: example.requirement.entity,
        relation: example.requirement.relation,
        test: example.requirement.test,
        evidence: [],
        status: 'covered',
        source: 'learner'
      }]
    })
    setValidated(true)
  }

  return (
    <motion.div className="page-shell module-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="module-hero split-hero">
        <div>
          <span className="label-pill blue-pill">MÓDULO 05 · TRANSFERENCIA</span>
          <h1>Ahora analiza y modela<br /><em>cualquier sistema real.</em></h1>
          <p>
            Aplica el Método Maestro de 6 Pasos para deducir qué tablas necesita el sistema, qué atributos llevará cada tabla y cómo se van a relacionar.
          </p>
        </div>
        <div className="lab-score">
          <div className="score-ring">
            <span>{validated ? passed : '—'}</span>
            <small>/{checks.length}</small>
          </div>
          <span>criterios validados</span>
        </div>
      </section>

      <LearningToolkit variant="requirements" />

      {/* EL FRAMEWORK UNIVERSAL Y CASOS DE ESTUDIO COMPLETOS */}
      <MethodologyMasterStepper />

      {/* SELECTOR DE PLANTILLAS Y REQUISITO */}
      <section className="example-briefs panel-card">
        <div className="card-heading">
          <div>
            <span className="eyebrow">Práctica Guiada con Requisitos Reales</span>
            <h2>Cargar un sistema completo en el editor en vivo</h2>
            <p className="card-desc">Selecciona un dominio para analizar su narrativa y ver su modelo Mermaid y SQL compilable en tiempo real:</p>
          </div>
        </div>
        <div className="example-buttons">
          {realWorldCaseStudies.map((c) => (
            <button key={c.id} type="button" className="soft-button" onClick={() => loadCaseStudy(c.id)}>
              <Sparkles size={14} /> Cargar {c.title.split('(')[0]}
            </button>
          ))}
          {projectExamples.map((example) => (
            <button
              key={example.label}
              type="button"
              className="soft-button"
              onClick={() => loadExample(example)}
            >
              <Sparkles size={14} /> Cargar {example.label}
            </button>
          ))}
        </div>
      </section>

      {/* EDITOR DEL ENUNCIADO DEL PROYECTO */}
      <section className="project-grid">
        <div className="brief-editor panel-card">
          <span className="eyebrow">Entrada del analista</span>
          <h3>Narrativa o Requisitos del Negocio</h3>
          <label htmlFor="project-text">Escribe o edita los requerimientos de tu sistema:</label>
          <textarea
            id="project-text"
            value={text}
            onChange={(event) => {
              onTextChange(event.target.value)
              setValidated(false)
            }}
            placeholder="Describe qué personas, cosas y hechos registra el sistema..."
          />
          <div className="editor-footer">
            <button className="primary-button small-button" type="button" onClick={() => setValidated(true)}>
              Validar señales del requisito <Check size={14} />
            </button>
            <span>{text.length} caracteres</span>
          </div>
        </div>

        <div className="validator-card panel-card">
          <span className="eyebrow">Diagnóstico del Enunciado</span>
          <h3>Filtro de señales detectadas</h3>
          <div className="validation-list">
            {checks.map((item, idx) => (
              <div key={idx} className={`validation-item ${validated ? (item.pass ? 'pass' : 'warn') : 'pending'}`}>
                <span>{item.pass ? '✓' : '○'}</span>
                <span>{item.label}</span>
                <small>{item.pass ? 'Encontrado' : 'Revisar'}</small>
              </div>
            ))}
          </div>
          <p className="validator-note">
            El validador busca entidades maestras y verbos de acción para confirmar que el texto tiene suficiente contexto antes de dibujar.
          </p>
        </div>
      </section>

      <section className="coverage-matrix panel-card" aria-labelledby="coverage-title">
        <div className="card-heading">
          <div>
            <span className="eyebrow">Trazabilidad del proyecto</span>
            <h2 id="coverage-title">Requisito → modelo → prueba</h2>
            <p className="card-desc">Una frase de negocio no queda cubierta hasta que puedes señalar qué parte del modelo la representa y cómo comprobarás que funciona.</p>
          </div>
          <span className="non-official">Guardado local</span>
        </div>
        <div className="coverage-table-wrap">
          <table className="coverage-table">
            <thead><tr><th>Requisito</th><th>Entidad / tabla</th><th>Relación / regla</th><th>Prueba observable</th></tr></thead>
            <tbody>
              {projectState.requirements.map((requirement) => <tr key={requirement.id}>
                <td><code>{requirement.id}</code><span>{requirement.text || 'Escribe el requisito arriba'}</span></td>
                <td><input value={requirement.entity} onChange={(event) => { onProjectStateChange({ requirements: projectState.requirements.map((item) => item.id === requirement.id ? { ...item, entity: event.target.value, status: 'covered' } : item) }); setValidated(false) }} aria-label={`Entidad o tabla para ${requirement.id}`} placeholder="CLIENTE, ORDEN…" /></td>
                <td><input value={requirement.relation} onChange={(event) => { onProjectStateChange({ requirements: projectState.requirements.map((item) => item.id === requirement.id ? { ...item, relation: event.target.value, status: 'covered' } : item) }); setValidated(false) }} aria-label={`Relación o regla para ${requirement.id}`} placeholder="CLIENTE 1:N ORDEN" /></td>
                <td><input value={requirement.test} onChange={(event) => { onProjectStateChange({ requirements: projectState.requirements.map((item) => item.id === requirement.id ? { ...item, test: event.target.value, status: 'validated' } : item) }); setValidated(false) }} aria-label={`Prueba para ${requirement.id}`} placeholder="Alta, cambio o borrado…" /></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="coverage-note">La matriz no decide si tu modelo es correcto; hace visible qué debes revisar con el negocio o el instructor.</p>
      </section>

      {/* ARTEFACTOS MERMAID Y SQL EN VIVO */}
      <section className="artifacts-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Artefactos de Transferencia</span>
            <h2>Diagrama ERD y Esquema SQL en Vivo</h2>
          </div>
          <span className="non-official">Editable · Descargable</span>
        </div>

        <section className="live-mermaid panel-card">
          <div className="live-mermaid-copy">
            <span className="eyebrow">Editor de Diagrama Mermaid</span>
            <h3>Código Mermaid ERD</h3>
            <p>Modifica el texto para agregar o quitar tablas y observa el renderizado instantáneo:</p>
            <textarea
              id="mermaid-editor"
              value={diagramCode}
              onChange={(event) => { setDiagramCode(event.target.value); onProjectStateChange({ diagramCode: event.target.value }) }}
              aria-label="Código Mermaid ERD"
            />
          </div>
          <MermaidPreview code={diagramCode} />
        </section>

        <div className="artifact-grid">
          <article className="artifact-card">
            <div className="artifact-card-head">
              <span className="artifact-icon cyan"><FileCode2 size={16} /></span>
              <span>Diagrama Mermaid (.mmd)</span>
              <button type="button" onClick={() => copy(diagramCode, 'Mermaid')} aria-label="Copiar Mermaid">
                <Clipboard size={14} />
              </button>
            </div>
            <pre>{diagramCode}</pre>
            <footer>
              <button type="button" onClick={() => downloadText('modelo.mmd', diagramCode, 'text/plain')}>
                <Download size={13} /> Descargar .mmd
              </button>
              <span>{copied === 'Mermaid' ? 'Copiado' : 'Mermaid ERD'}</span>
            </footer>
          </article>

          <article className="artifact-card">
            <div className="artifact-card-head">
              <span className="artifact-icon violet"><Code2 size={16} /></span>
              <span>Modelo Físico SQL (.sql)</span>
              <button type="button" onClick={() => copy(activeSqlCode, 'SQL')} aria-label="Copiar SQL">
                <Clipboard size={14} />
              </button>
            </div>
            <pre data-dbc="omitir">{activeSqlCode}</pre>
            <footer>
              <button type="button" onClick={() => downloadText('modelo.sql', activeSqlCode, 'text/sql')}>
                <Download size={13} /> Descargar .sql
              </button>
              <span>{copied === 'SQL' ? 'Copiado' : 'PostgreSQL DDL'}</span>
            </footer>
          </article>
        </div>
      </section>

      <section className="artifact-coherence panel-card" aria-labelledby="artifact-coherence-title">
        <div className="card-heading"><div><span className="eyebrow">Validación determinista local</span><h2 id="artifact-coherence-title">Los artefactos deben poder revisarse</h2></div><span className="non-official">Sin enviar datos</span></div>
        <p className="coherence-intro">Estas señales no juzgan la semántica completa, pero detectan rápidamente si el expediente tiene las piezas mínimas para una revisión humana.</p>
        <div className="coherence-list">{artifactChecks.map((item) => <div key={item.label} className={`coherence-item ${item.pass ? 'pass' : 'pending'}`}><span>{item.pass ? '✓' : '○'}</span><strong>{item.label}</strong><small>{item.pass ? 'Listo para revisar' : 'Pendiente'}</small></div>)}</div>
      </section>

      <section className="final-cta">
        <div>
          <span className="eyebrow">Cierre del Laboratorio</span>
          <h2>Has completado el proceso de modelado profesional.</h2>
          <p>Tienes el método para analizar cualquier problema, extraer tablas y atributos, y derivar relaciones sólidas.</p>
        </div>
        <button className="primary-button" type="button" disabled={!validated || passed < checks.length} onClick={onComplete}>
          {validated && passed === checks.length ? 'Guardar mi avance y continuar' : 'Completa la validación y la trazabilidad'} <Check size={16} />
        </button>
      </section>
    </motion.div>
  )
}
