import { Check, CircleHelp, Database, Lock, Search, ShieldCheck, Timer, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { missingTopics } from '../../data/ai'
import type { AttemptRecord } from '../../hooks/useLocalProgress'
import LearningToolkit from '../../components/LearningToolkit'
import NormalizationExplorer from './NormalizationExplorer'

interface Props {
  onComplete: () => void
  onRecordAttempt?: (attempt: Omit<AttemptRecord, 'id' | 'timestamp'>) => void
}

const topicIcons = [Database, Timer, Lock, ShieldCheck, Search, Wrench, Check, CircleHelp]

export default function MissingTopicsLab({ onComplete, onRecordAttempt }: Props) {
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
      <NormalizationExplorer onRecordAttempt={onRecordAttempt} />

      {/* MAPA DE AMPLIACIÓN */}
      <section className="topic-intro panel-card">
        <div className="card-heading">
          <div>
            <span className="eyebrow">Mapa de Ampliación Profesional</span>
            <h2>Dimensiones críticas que acompañan al modelo de datos</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="non-official">Operación · Seguridad · Evolución</span>
            <button
              type="button"
              className="soft-button"
              onClick={() => setSelected(allSelected ? [] : missingTopics.map((t) => t.title))}
              style={{ fontSize: '10px', padding: '4px 8px' }}
            >
              {allSelected ? 'Limpiar marcas' : 'Marcar las 8 como revisadas'}
            </button>
          </div>
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
        <div className="card-heading">
          <div>
            <span className="eyebrow">Control Cruzado Pre-Entrega</span>
            <h2>Lista de Chequeo del Arquitecto de Datos</h2>
          </div>
          <span className="section-note">Auditoría formativa de calidad</span>
        </div>
        <p>
          Antes de entregar tu modelo al instructor o equipo de desarrollo, hazte estas 5 preguntas fundamentales. En una base de datos profesional, cada decisión protege la única fuente de verdad (SSoT, <i>Single Source of Truth</i>):
        </p>

        <div className="beginner-audit-grid">
          <div className="beginner-audit-item">
            <div className="audit-item-header">
              <span className="audit-number">01</span>
              <h4>Requisitos ↔ Entidades aprobadas</h4>
            </div>
            <p className="audit-desc">
              ¿Cada sustantivo clave del problema tiene su propia tabla y no quedaron datos aislados?
            </p>
            <div className="audit-tip">
              <strong>Tip de principiante:</strong> Si el taller registra repuestos o mecánicos, cada uno debe tener su propia tabla con varias filas, no ser una simple nota de texto dentro de la orden.
            </div>
          </div>

          <div className="beginner-audit-item">
            <div className="audit-item-header">
              <span className="audit-number">02</span>
              <h4>Cardinalidad (Min..Max) ↔ FKs ubicadas</h4>
            </div>
            <p className="audit-desc">
              ¿Las llaves foráneas (FK) quedaron en la tabla hija (lado N) y toda relación N:M tiene su tabla puente?
            </p>
            <div className="audit-tip">
              <strong>Tip de principiante:</strong> La llave foránea siempre viaja hacia el lado de los «muchos». Jamás coloques la FK en la tabla padre (lado 1).
            </div>
          </div>

          <div className="beginner-audit-item">
            <div className="audit-item-header">
              <span className="audit-number">03</span>
              <h4>Restricciones (Constraints) ↔ Pruebas de borde</h4>
            </div>
            <p className="audit-desc">
              ¿Definiste <code>NOT NULL</code> en campos obligatorios, <code>UNIQUE</code> en documentos y <code>CHECK</code> en valores válidos?
            </p>
            <div className="audit-tip">
              <strong>Tip de principiante:</strong> Las restricciones protegen la base de datos de usuarios distraídos o errores en el frontend. Si un precio no puede ser negativo, añade <code>CHECK (tarifa &gt; 0)</code>.
            </div>
          </div>

          <div className="beginner-audit-item">
            <div className="audit-item-header">
              <span className="audit-number">04</span>
              <h4>1FN, 2FN, 3FN ↔ Tablas descompuestas</h4>
            </div>
            <p className="audit-desc">
              ¿Eliminaste listas separadas por comas (1FN), atributos dependientes de parte de la clave (2FN) y datos calculables (3FN)?
            </p>
            <div className="audit-tip">
              <strong>Tip de principiante:</strong> Si actualizar el nombre de una categoría te obliga a modificar 100 productos, tu modelo viola 3FN y requiere una tabla aparte para la categoría.
            </div>
          </div>

          <div className="beginner-audit-item">
            <div className="audit-item-header">
              <span className="audit-number">05</span>
              <h4>Políticas ON DELETE ↔ Seguridad contable</h4>
            </div>
            <p className="audit-desc">
              ¿Protegiste los registros transaccionales con <code>ON DELETE RESTRICT</code> para no borrar historiales por error?
            </p>
            <div className="audit-tip">
              <strong>Tip de principiante:</strong> En sistemas reales, casi nunca se usa <code>CASCADE</code> en clientes o pedidos: si borras un cliente, no puedes borrar mágicamente sus facturas ya pagadas.
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="eyebrow">Siguiente Paso</span>
          <h2>Aplica todo en un caso real del entorno productivo.</h2>
          <p>
            Has completado la arquitectura conceptual, el algoritmo de derivación, el diccionario de datos y las dimensiones operativas. Es momento de resolver el <strong>Caso Integrador: Taller Ruta 7</strong> para consolidar todas tus evidencias de aprendizaje.
          </p>
        </div>
        <button className="primary-button" disabled={!allSelected} type="button" onClick={onComplete}>
          {allSelected ? 'Avanzar al Caso Integrador (Estación 08)' : `Revisa las ${missingTopics.length} dimensiones`} <Check size={16} />
        </button>
      </section>
    </motion.div>
  )
}
