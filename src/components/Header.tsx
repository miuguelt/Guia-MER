import { useEffect, useState } from 'react'
import { Menu, Search, Sparkles } from 'lucide-react'
import type { CourseModule, ModuleKey } from '../data/course'

interface HeaderProps { active: ModuleKey; modules: CourseModule[]; onOpenMenu: () => void; onSearch: () => void }

export default function Header({ active, modules, onOpenMenu, onSearch }: HeaderProps) {
  const [isMobileNav, setIsMobileNav] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1100px)')
    const sync = () => setIsMobileNav(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  const current = modules.find((item) => item.key === active)
  const shortcut = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K'
  const title = active === 'home' ? 'Mapa de aprendizaje' : active === 'portafolio' ? 'Portafolio & Lista de Chequeo SENA' : current?.title
  return <header className="topbar">
    <div className="breadcrumb">{isMobileNav && <button className="menu-button" aria-label="Abrir navegación" onClick={onOpenMenu}><Menu size={20} /></button>}<span>DataGenesis</span><i>/</i>{current && <span className="breadcrumb-step">{current.number} / {String(modules.length).padStart(2, '0')}</span>}<strong>{title}</strong></div>
    <div className="top-actions"><button className="search-trigger" onClick={onSearch} aria-label={`Buscar en la guía (${shortcut})`}><Search size={16} /><span>Buscar en la guía</span><kbd>{shortcut}</kbd></button><span className="xp-badge"><Sparkles size={14} /> {active === 'portafolio' ? 'Certificación SENA' : active === 'case' ? 'Transferencia final' : active === 'home' ? 'Modo exploración' : 'Aprendiendo'}</span></div>
  </header>
}
