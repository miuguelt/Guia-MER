import { useState } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, ExternalLink, Layers, Sparkles } from 'lucide-react'
import { methodologySteps, realWorldCaseStudies } from '../../data/methodologyData'

export default function MethodologyMasterStepper() {
  const [activeStepId, setActiveStepId] = useState(0)
  const [selectedCaseId, setSelectedCaseId] = useState('ecommerce')
  const [activeTab, setActiveTab] = useState<'method' | 'caseStudies'>('method')

  const currentStep = methodologySteps[activeStepId]
  const currentCase = realWorldCaseStudies.find((c) => c.id === selectedCaseId) ?? realWorldCaseStudies[0]

  return (
    <section className="methodology-master-stepper panel-card">
      <div className="card-heading">
        <div>
          <span className="eyebrow">El Framework Universal del Analista</span>
          <h2>Cómo analizar CUALQUIER sistema desde el punto cero</h2>
          <p className="card-desc">Sigue esta secuencia metódica para deducir qué tablas necesita el sistema, qué atributos lleva cada tabla y cómo se relacionan entre sí.</p>
        </div>
        <div className="view-toggle-group">
          <button
            type="button"
            className={`toggle-tab-btn ${activeTab === 'method' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('method')}
          >
            Los 7 Pasos Maestros
          </button>
          <button
            type="button"
            className={`toggle-tab-btn ${activeTab === 'caseStudies' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('caseStudies')}
          >
            {realWorldCaseStudies.length} Casos Reales Completos
          </button>
        </div>
      </div>

      {activeTab === 'method' ? (
        <div className="method-layout">
          {/* BARRA DE NAVEGACIÓN DE PASOS */}
          <div className="method-steps-nav">
            {methodologySteps.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`step-nav-item ${activeStepId === s.id ? 'is-active' : ''}`}
                onClick={() => setActiveStepId(s.id)}
              >
                <span className="step-num">0{s.id}</span>
                <span className="step-title">{s.shortTitle}</span>
                <ChevronRight size={14} className="step-chevron" />
              </button>
            ))}
          </div>

          {/* CONTENIDO DEL PASO ACTIVO */}
          <div className="step-content-display">
            <div className="step-header">
              <span className="step-badge-pill">Fase 0{currentStep.id}</span>
              <h3>{currentStep.title}</h3>
              <p className="step-obj"><b>Objetivo clave:</b> {currentStep.objective}</p>
            </div>

            <div className="step-columns-grid">
              <div className="step-col">
                <span className="col-title color-cyan">¿Cómo se ejecuta paso a paso?</span>
                <ul className="step-list">
                  {currentStep.howTo.map((item, idx) => (
                    <li key={idx}><CheckCircle2 size={15} /><span>{item}</span></li>
                  ))}
                </ul>
              </div>

              <div className="step-col">
                <span className="col-title color-rose">Trampas comunes a evitar:</span>
                <ul className="step-list pitfalls">
                  {currentStep.pitfalls.map((item, idx) => (
                    <li key={idx}><span>⚠️</span><span>{item}</span></li>
                  ))}
                </ul>

                <span className="col-title color-lime" style={{ marginTop: '16px', display: 'block' }}>Criterio de éxito:</span>
                <ul className="step-list checklist">
                  {currentStep.checklist.map((item, idx) => (
                    <li key={idx}><span>✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="step-nav-footer">
              <span className="footer-hint">Paso {activeStepId + 1} de {methodologySteps.length}</span>
              <div className="nav-buttons">
                {activeStepId > 0 && (
                  <button type="button" className="soft-button" onClick={() => setActiveStepId((p) => p - 1)}>
                    Anterior
                  </button>
                )}
                {activeStepId < methodologySteps.length - 1 ? (
                  <button type="button" className="primary-button small-button" onClick={() => setActiveStepId((p) => p + 1)}>
                    Siguiente paso <ArrowRight size={14} />
                  </button>
                ) : (
                  <button type="button" className="primary-button small-button" onClick={() => setActiveTab('caseStudies')}>
                    Ver casos de estudio resueltos <Sparkles size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CASOS DE ESTUDIO COMPLETOS */
        <div className="case-studies-layout">
          <div className="case-selector-bar">
            {realWorldCaseStudies.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`case-tab-btn ${selectedCaseId === c.id ? 'is-active' : ''} ${c.externalUrl ? 'is-gemini-case' : ''}`}
                onClick={() => setSelectedCaseId(c.id)}
              >
                <div className="case-tab-title-row">
                  <b>{c.title}</b>
                  {c.externalUrlBadge && (
                    <span className="case-gemini-badge">
                      <Sparkles size={11} /> {c.externalUrlBadge}
                    </span>
                  )}
                </div>
                <small>{c.category}</small>
              </button>
            ))}
          </div>

          <div className="case-study-details">
            {currentCase.externalUrl && (
              <div className="case-interactive-banner">
                <div className="interactive-banner-content">
                  <div className="interactive-badge-row">
                    <span className="label-pill cyan-pill"><Sparkles size={12} /> Sesión interactiva en vivo</span>
                    <span className="interactive-domain-tag">Google Gemini Canvas</span>
                  </div>
                  <h4>{currentCase.externalUrlLabel || 'Abrir caso interactivo en Gemini Canvas'}</h4>
                  <p>
                    Este caso cuenta con una sesión viva en Google Gemini Canvas asistida por la Gema de Arquitecto MER &amp; Relacional. Ábrela para observar el análisis morfosintáctico paso a paso, formular preguntas socráticas de cardinalidad y comprobar la derivación a tablas relacionales en tiempo real.
                  </p>
                </div>
                <a
                  href={currentCase.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button small-button case-external-btn"
                >
                  <Sparkles size={14} /> Abrir en Gemini Canvas <ExternalLink size={14} />
                </a>
              </div>
            )}

            <div className="case-narrative-box">
              <div className="narrative-top"><BookOpen size={16} /><strong>Narrativa del Negocio:</strong></div>
              <p>{currentCase.narrative}</p>
            </div>

            <div className="case-breakdown-grid">
              {/* TABLAS Y ATRIBUTOS DEDUCIDOS */}
              <div className="case-entities-section">
                <span className="eyebrow">Tablas y Atributos Identificados ({currentCase.entities.length})</span>
                <div className="case-entities-list">
                  {currentCase.entities.map((ent) => (
                    <article key={ent.name} className="entity-breakdown-card">
                      <div className="entity-card-header">
                        <strong>{ent.name}</strong>
                        {ent.isWeak && <span className="weak-badge">Tabla Puente N:M</span>}
                      </div>
                      <small className="entity-desc">{ent.description}</small>
                      <div className="attrs-mini-list">
                        {ent.attributes.map((attr) => (
                          <div key={attr.name} className="attr-row">
                            <span className={`attr-role role-${attr.role.toLowerCase()}`}>{attr.role}</span>
                            <span className="attr-name">{attr.name}</span>
                            <span className="attr-type">{attr.type}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* RELACIONES Y CARDINALIDADES */}
              <div className="case-relations-section">
                <span className="eyebrow">Relaciones y Cardinalidades Razonadas</span>
                <div className="case-relations-list">
                  {currentCase.relations.map((rel, idx) => (
                    <article key={idx} className="relation-breakdown-card">
                      <div className="relation-header-row">
                        <span className="relation-entities"><b>{rel.source}</b> → <i>{rel.verb}</i> → <b>{rel.target}</b></span>
                        <span className="relation-badge-type">{rel.cardinality}</span>
                      </div>
                      <div className="min-max-reading">
                        <span>{rel.source}: <b>{rel.leftMinMax}</b></span>
                        <i>↔</i>
                        <span>{rel.target}: <b>{rel.rightMinMax}</b></span>
                      </div>
                      <p className="relation-expl">{rel.explanation}</p>
                      {rel.attributes && (
                        <div className="rel-attrs-tag">
                          <Layers size={13} />
                          <span>Atributos propios de la relación: <b>{rel.attributes.join(', ')}</b></span>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
