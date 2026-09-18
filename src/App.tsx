import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Toast from './components/Toast'
import HomeView from './features/home/HomeView'
import SpreadsheetLab from './features/module0/SpreadsheetLab'
import EntityHunt from './features/module1/EntityHunt'
import CardinalityLab from './features/module2/CardinalityLab'
import TransformationLab from './features/module3/TransformationLab'
import DictionaryLab from './features/module4/DictionaryLab'
import ProjectLab from './features/module5/ProjectLab'
import AIWorkflowLab from './features/module6/AIWorkflowLab'
import MissingTopicsLab from './features/module7/MissingTopicsLab'
import GuidedCase from './features/guidedCase/GuidedCase'
import MasteryCheck from './features/assessment/MasteryCheck'
import SenaChecklistPortafolio from './features/portafolio/SenaChecklistPortafolio'
import { courseModules, type ModuleKey, type StationKey } from './data/course'
import { useLocalProgress } from './hooks/useLocalProgress'
import type { ProjectState } from './hooks/useLocalProgress'

function App() {
  const {
    state,
    setCurrent,
    completeModule,
    setTheme,
    setProjectText,
    setDictionary,
    setAiLog,
    updateProjectState,
    commitProjectEvidence,
    recordAttempt,
    setAssessment,
    setApprenticeProfile,
    setSignature,
  } = useLocalProgress()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [query, setQuery] = useState('')

  const projectCommitInfo: Record<StationKey, { label: string; evidence: string }> = {
    m0: { label: 'Anomalías identificadas', evidence: 'Inserción, actualización y borrado observados en un dominio.' },
    m1: { label: 'Candidatos de entidad', evidence: 'Sustantivos, atributos y llaves separados con el filtro de entidad.' },
    m2: { label: 'Matriz de cardinalidad', evidence: 'Relaciones leídas en ambos sentidos antes de derivar tablas.' },
    m3: { label: 'Reglas de derivación', evidence: 'PK, FK y tabla puente elegidas con una regla explícita.' },
    m4: { label: 'Diccionario físico', evidence: `${state.dictionary.length} campo(s) con tipo y restricción en el borrador.` },
    m5: { label: 'Caso de transferencia', evidence: 'Requisito conectado con entidad, relación y prueba observable.' },
    m6: { label: 'Bitácora de IA', evidence: 'Instrucción, contexto, supuestos, correcciones y pruebas registrados.' },
    m7: { label: 'Revisión de calidad', evidence: 'Riesgos de normalización, seguridad, pruebas y evolución revisados.' },
    case: { label: 'Caso integrador resuelto', evidence: 'Expediente de evidencia, requisitos, cardinalidades y MER defendible revisados.' },
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) } if (event.key === 'Escape') { setSearchOpen(false); setSidebarOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navigate = (key: ModuleKey) => { setCurrent(key); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const complete = (key: ModuleKey, next: ModuleKey = 'home', projectPatch: Partial<ProjectState> = {}) => {
    completeModule(key)
    if (Object.keys(projectPatch).length) {
      const append = (existing: string[], incoming: string[]) => Array.from(new Set([...existing, ...incoming]))
      updateProjectState({
        ...projectPatch,
        ...(projectPatch.entities ? { entities: append(state.projectState.entities, projectPatch.entities) } : {}),
        ...(projectPatch.attributes ? { attributes: append(state.projectState.attributes, projectPatch.attributes) } : {}),
        ...(projectPatch.relations ? { relations: append(state.projectState.relations, projectPatch.relations) } : {}),
      })
    }
    if (key !== 'home' && key !== 'portafolio') {
      const commit = projectCommitInfo[key]
      commitProjectEvidence({ module: key, ...commit })
    }
    if (key !== 'home' && key !== 'portafolio') {
      recordAttempt({ module: key, skillId: `mer.${key}`, score: 0, status: 'practiced', errors: [] })
    }
    setToast('Estación guardada como práctica; el dominio se demuestra con transferencia')
    window.setTimeout(() => setToast(''), 2800)
    if (next !== 'home') navigate(next)
  }
  const renderView = () => {
    switch (state.current) {
      case 'm0': return <SpreadsheetLab onComplete={() => complete('m0', 'm1')} />
      case 'm1': return <EntityHunt onComplete={(evidence) => complete('m1', 'm2', evidence ? { entities: evidence.entities, attributes: evidence.attributes } : undefined)} />
      case 'm2': return <CardinalityLab onComplete={(evidence) => complete('m2', 'm3', evidence ? { relations: [evidence.relation] } : undefined)} />
      case 'm3': return <TransformationLab onComplete={() => complete('m3', 'm4')} />
      case 'm4': return <DictionaryLab savedRows={state.dictionary} onSave={(rows) => { setDictionary(rows); setToast('Borrador del diccionario guardado'); window.setTimeout(() => setToast(''), 2400) }} onComplete={() => complete('m4', 'm5')} />
      case 'm5': return <ProjectLab text={state.projectText} projectState={state.projectState} onTextChange={setProjectText} onProjectStateChange={updateProjectState} onComplete={() => complete('m5', 'm6')} />
      case 'm6': return <AIWorkflowLab savedLog={state.aiLog} onSaveLog={setAiLog} onComplete={() => complete('m6', 'm7')} />
      case 'm7': return <MissingTopicsLab onComplete={() => complete('m7', 'case')} />
      case 'case': return <GuidedCase onComplete={() => complete('case', 'portafolio')} />
      case 'portafolio': return (
        <SenaChecklistPortafolio
          progressState={state}
          onUpdateProfile={setApprenticeProfile}
          onUpdateProjectState={updateProjectState}
          onUpdateSignature={setSignature}
          onNavigate={navigate}
          onToast={(msg) => {
            setToast(msg)
            window.setTimeout(() => setToast(''), 2500)
          }}
        />
      )
      default: return <>
        <HomeView completed={state.completed} skillProgress={state.skillProgress} projectState={state.projectState} onStart={navigate} />
        <div className="page-shell home-assessment-shell"><MasteryCheck assessment={state.assessment} onAssessmentChange={setAssessment} onRecordAttempt={recordAttempt} /></div>
      </>
    }
  }
  const results = query.trim() ? courseModules.filter((module) => `${module.title} ${module.shortTitle} ${module.description} ${module.eyebrow}`.toLowerCase().includes(query.toLowerCase())) : courseModules
  return <div className="app-shell"><Sidebar modules={courseModules} active={state.current} completed={state.completed} theme={state.theme} open={sidebarOpen} onSelect={navigate} onClose={() => setSidebarOpen(false)} onToggleTheme={() => setTheme(state.theme === 'dark' ? 'light' : 'dark')} /><main className="main-content"><Header active={state.current} modules={courseModules} onOpenMenu={() => setSidebarOpen(true)} onSearch={() => setSearchOpen(true)} /><AnimatePresence mode="wait">{renderView()}</AnimatePresence></main>{toast && <Toast message={toast} onClose={() => setToast('')} />}{searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Buscar en la guía"><button className="search-overlay-backdrop" onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda" /><motion.div className="search-modal" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}><div className="search-input-wrap"><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca una estación o idea…" /><button onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda"><X size={17} /></button></div><div className="search-results">{results.map((module) => <button key={module.key} onClick={() => { navigate(module.key); setSearchOpen(false) }}><span className={`result-number color-${module.color}`}>{module.number}</span><span><b>{module.title}</b><small>{module.description}</small></span></button>)}{!results.length && <p className="empty-search">No encontramos esa idea. Prueba con “llave”, “relación” o “tabla”.</p>}</div><span className="search-hint">Esc para cerrar · ⌘ K para abrir</span></motion.div></div>}</div>
}

export default App
