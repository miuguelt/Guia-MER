import { BookOpen, Bot, ChevronRight, Database, Download, FileStack, Home, Moon, Network, Sun, Table2, Target, X, ListChecks } from 'lucide-react'
import type { CourseModule, ModuleKey } from '../data/course'

interface SidebarProps {
  modules: CourseModule[]
  active: ModuleKey
  completed: ModuleKey[]
  theme: 'dark' | 'light'
  open: boolean
  onSelect: (key: ModuleKey) => void
  onClose: () => void
  onToggleTheme: () => void
}

const icons = { m0: Database, m1: Target, m2: Network, m3: Table2, m4: BookOpen, m5: Download, m6: Bot, m7: ListChecks, case: FileStack }

export default function Sidebar({ modules, active, completed, theme, open, onSelect, onClose, onToggleTheme }: SidebarProps) {
  const progress = Math.round((completed.length / modules.length) * 100)
  return (
    <>
      {open && <button className="sidebar-backdrop" aria-label="Cerrar navegación" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Ruta de aprendizaje">
        <div className="sidebar-brand">
          <div className="brand-mark"><span>DG</span><i /></div>
          <div><strong>DataGenesis</strong><small>Guía MER · ADSO</small></div>
          {open && <button className="icon-button mobile-close" onClick={onClose} aria-label="Cerrar menú"><X size={18} /></button>}
        </div>
        <div className="sidebar-intro"><span className="eyebrow">Ruta 0 → 100</span><p>De la intuición humana a un esquema que resiste.</p></div>
        <div className="progress-card" aria-label={`Progreso de la ruta: ${progress}%`}>
          <div className="progress-row"><span>Tu exploración</span><strong>{progress}%</strong></div>
          <div className="progress-track"><span style={{ width: `${Math.max(progress, 5)}%` }} /></div>
          <small>{completed.length} de {modules.length} estaciones completadas</small>
        </div>
        <nav className="module-nav">
          <button className={`nav-home ${active === 'home' ? 'active' : ''}`} aria-current={active === 'home' ? 'page' : undefined} onClick={() => onSelect('home')}><Home size={17} /><span>Mapa de aprendizaje</span><ChevronRight size={15} /></button>
          <span className="nav-section-title">Estaciones</span>
          {modules.map((module) => {
            const Icon = icons[module.key]
            const done = completed.includes(module.key)
            return <button key={module.key} className={`module-link ${active === module.key ? 'active' : ''} color-${module.color}`} aria-current={active === module.key ? 'page' : undefined} title={module.description} onClick={() => onSelect(module.key)}>
              <span className="module-number">{done ? '✓' : module.number}</span><Icon size={16} /><span className="module-link-copy"><b>{module.shortTitle}</b><small>{module.eyebrow}</small></span>{active === module.key && <span className="active-dot" />}
            </button>
          })}
          <div className="nav-portafolio-divider">
            <span className="nav-section-title">Cierre y Evaluación</span>
            <button
              className={`module-link sena-nav-item ${active === 'portafolio' ? 'active' : ''}`}
              onClick={() => onSelect('portafolio')}
            >
              <span className="module-number sena-badge-num">📋</span>
              <span className="module-link-copy">
                <b>Lista de Chequeo & Portafolio</b>
                <small>Firmas, rúbrica y PDF institucional</small>
              </span>
              {active === 'portafolio' && <span className="active-dot" />}
            </button>
          </div>
        </nav>
        <div className="sidebar-bottom">
          <button className="theme-button" onClick={onToggleTheme}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}<span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span></button>
          <p className="offline-note"><span className="status-dot" /> Progreso guardado en este dispositivo</p>
        </div>
      </aside>
    </>
  )
}
