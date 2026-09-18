import { CheckCircle2, ChevronDown, ChevronUp, Cpu, Database, HelpCircle, Layers, Sparkles, Terminal } from 'lucide-react'
import { useState } from 'react'
import { beginnerGuide } from '../../../data/ai'

export default function AIOnboardingSection() {
  const [open, setOpen] = useState(true)

  return (
    <section className="gem-onboarding panel-card">
      <button type="button" className="gem-onboarding-toggle" onClick={() => setOpen((v) => !v)}>
        <div>
          <span className="label-pill lime-pill">Mentoría interactiva</span>
          <h2>{beginnerGuide.title}</h2>
        </div>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div className="gem-onboarding-content">
          <div className="gem-onboarding-analogy">
            <HelpCircle size={20} className="color-cyan" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p>{beginnerGuide.analogy}</p>
          </div>
          <p className="gem-onboarding-what-is">{beginnerGuide.whatIs}</p>

          {/* ── Disparador 'inicia' ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(181,235,100,.10)',
              border: '1px solid rgba(181,235,100,.35)',
            }}
          >
            <Terminal size={22} className="color-lime" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>
                🚀 El comando de arranque interactivo: escribe «{beginnerGuide.triggerWord}»
              </strong>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                {beginnerGuide.triggerExplanation}
              </p>
            </div>
          </div>

          {/* ── Entregable Final & Caso Ancla ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {/* Entregable Final */}
            <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--surface-sunken)', border: '1px solid var(--line)' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', marginBottom: '10px', fontSize: '14px' }}>
                <CheckCircle2 size={16} className="color-cyan" /> 🎯 Entregable Final Garantizado
              </strong>
              <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: 'var(--muted)' }}>
                {beginnerGuide.finalDeliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Caso Ancla */}
            <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--surface-sunken)', border: '1px solid var(--line)' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', marginBottom: '6px', fontSize: '14px' }}>
                <Layers size={16} className="color-amber" /> 🛒 {beginnerGuide.anchorExample.title}
              </strong>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 8px', lineHeight: 1.4 }}>
                {beginnerGuide.anchorExample.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {beginnerGuide.anchorExample.entities.map((e) => (
                  <span key={e} style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)' }}>
                    {e}
                  </span>
                ))}
              </div>
              <small style={{ display: 'block', fontSize: '11.5px', color: 'var(--accent)', fontStyle: 'italic' }}>
                💡 {beginnerGuide.anchorExample.resolution}
              </small>
            </div>
          </div>

          {/* ── Escalabilidad Vertical y Horizontal ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {beginnerGuide.scalability.map((item) => (
              <div
                key={item.type}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: item.type === 'vertical' ? 'rgba(100,200,255,.05)' : 'rgba(200,100,255,.05)',
                  border: `1px solid ${item.type === 'vertical' ? 'rgba(100,200,255,.2)' : 'rgba(200,100,255,.2)'}`,
                }}
              >
                <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text)', marginBottom: '4px' }}>
                  {item.type === 'vertical' ? <Cpu size={16} className="color-cyan" /> : <Database size={16} className="color-violet" />}
                  {item.title}
                </strong>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)', lineHeight: 1.45 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── Columnas de Lo que hace vs Lo que NO hace ── */}
          <div className="gem-onboarding-columns">
            <div className="gem-onboarding-does">
              <strong>✅ Lo que hace una Gema</strong>
              <ul>
                {beginnerGuide.whatItDoes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="gem-onboarding-does-not">
              <strong>⚠️ Lo que NO hace</strong>
              <ul>
                {beginnerGuide.whatItDoesNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Pasos para empezar ── */}
          <div className="gem-onboarding-steps">
            <strong>🚀 Cómo empezar en 5 pasos</strong>
            <div className="gem-onboarding-steps-grid">
              {beginnerGuide.howToStart.map((step, i) => (
                <div key={step.title} className="gem-onboarding-step">
                  <span className="gem-step-number">{i + 1}</span>
                  <div>
                    <strong>{step.icon} {step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="gem-onboarding-any-ai">
            <Sparkles size={14} /> {beginnerGuide.worksWithAny}
          </p>
        </div>
      )}
    </section>
  )
}
