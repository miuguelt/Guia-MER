import { Check, CircleHelp, Database, Lock, Search, ShieldCheck, Timer, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { missingTopics } from '../../data/ai'
import LearningToolkit from '../../components/LearningToolkit'
import NormalizationExplorer from './NormalizationExplorer'

interface Props {
  onComplete: () => void
}

const topicIcons = [Database, Timer, Lock, ShieldCheck, Search, Wrench, Check, CircleHelp]

export default function MissingTopicsLab({ onComplete }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const allSelected = selected.length === missingTopics.length
  const toggle = (title: string) =>
    setSelected((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title]
    )

  return (
    <motion.div className="page-shell module-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="module-hero split-hero">
        <div>
          <span className="label-pill lime-pill">MÓDULO 07 · CIERRE PROFESIONAL</span>
          <h1>Un diagrama no vive<br /><em>aislado del sistema real.</em></h1>
          <p>
            El MER es el plano estructural. Para construir software confiable en producción debes dominar la normalización formal, seguridad, transacciones, pruebas y evolución.
          </p>
        </div>
        <div className="lab-score topic-score">
          <div className="score-ring">
            <span>{selected.length}</span>
            <small>/{missingTopics.length}</small>
          </div>
          <span>dimensiones cubiertas</span>
        </div>
      </section>

      <LearningToolkit variant="quality" />

      {/* LABORATORIO INTERACTIVO DE NORMALIZACIÓN 1FN-3FN */}
      <NormalizationExplorer />

      {/* MAPA DE AMPLIACIÓN */}
      <section className="topic-intro panel-card">
        <div className="card-heading">
          <div>
            <span className="eyebrow">Mapa de Ampliación Profesional</span>
            <h2>Dimensiones críticas que acompañan al modelo de datos</h2>
          </div>
          <span className="non-official">Operación · Seguridad · Evolución</span>
        </div>
        <p>
          En proyectos reales de software, una base de datos debe resistir concurrencia, cumplir leyes de privacidad y soportar migraciones de esquema sin tiempo de inactividad. Marca cada dimensión para revisar su práctica:
        </p>
      </section>

      <section className="topics-grid">
        {missingTopics.map((topic, index) => {
          const Icon = topicIcons[index % topicIcons.length]
          const isSelected = selected.includes(topic.title)
          return (
            <article key={topic.title} className={`topic-card ${isSelected ? 'is-selected' : ''}`}>
              <button
                type="button"
                className="topic-select"
                onClick={() => toggle(topic.title)}
                aria-pressed={isSelected}
              >
                <span className="topic-icon"><Icon size={18} /></span>
                <span className="topic-mark">{isSelected ? <Check size={14} /> : index + 1}</span>
              </button>
              <h3>{topic.title}</h3>
              <p>{topic.why}</p>
              <div className="topic-exercise">
                <span>Práctica recomendada</span>
                <strong>{topic.exercise}</strong>
              </div>
            </article>
          )
        })}
      </section>

      <section className="integration-lab panel-card">
        <div>
          <span className="eyebrow">Control Cruzado Pre-Entrega</span>
          <h2>Lista de Chequeo del Arquitecto de Datos</h2>
          <p>
            Antes de entregar tu modelo al instructor o equipo de desarrollo, verifica: ¿puedo insertar, modificar y auditar sin perder la única fuente de verdad (SSoT)?
          </p>
        </div>
        <div className="integration-checks">
          <span><Check size={14} /> Requisitos ↔ Entidades aprobadas</span>
          <span><Check size={14} /> Cardinalidad (Min..Max) ↔ FKs ubicadas</span>
          <span><Check size={14} /> Constraints ↔ Pruebas de borde</span>
          <span><Check size={14} /> 1FN, 2FN, 3FN ↔ Tablas descompuestas</span>
          <span><Check size={14} /> Políticas ON DELETE ↔ Seguridad contable</span>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="eyebrow">Ruta Completa</span>
          <h2>Del mundo real a un modelo defendible.</h2>
          <p>Has recorrido la ruta completa desde el punto cero hasta el diseño relacional profesional con trazabilidad total.</p>
        </div>
        <button className="primary-button" disabled={!allSelected} type="button" onClick={onComplete}>
          {allSelected ? 'Generar Lista de Chequeo y Documento SENA' : `Revisa las ${missingTopics.length} dimensiones`} <Check size={16} />
        </button>
      </section>
    </motion.div>
  )
}
