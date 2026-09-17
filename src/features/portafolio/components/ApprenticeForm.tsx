import type { ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'
import type { ApprenticeProfile } from '../../../hooks/useLocalProgress'

interface ApprenticeFormProps {
  profile: ApprenticeProfile
  projectDefense: string
  defenseReady: boolean
  onUpdateProfile: (profile: Partial<ApprenticeProfile>) => void
  onUpdateProjectDefense: (defense: string) => void
  children?: ReactNode
}

export default function ApprenticeForm({
  profile,
  projectDefense,
  defenseReady,
  onUpdateProfile,
  onUpdateProjectDefense,
  children,
}: ApprenticeFormProps) {
  return (
    <div className="panel-card sena-form-card">
      <div className="card-heading">
        <div>
          <span className="eyebrow">Paso 1 · Datos Institucionales</span>
          <h3>Identificación para el Registro de Evidencias</h3>
        </div>
        <ShieldCheck size={22} className="accent-text" />
      </div>
      <p className="form-legend">
        Diligencia tus datos personales y de ficha. Se guardan localmente en tu navegador y se reflejan de inmediato
        en la hoja oficial SENA:
      </p>

      <div className="sena-inputs-grid">
        <div className="input-group">
          <label htmlFor="input-name">Nombre Completo del Aprendiz:</label>
          <input
            id="input-name"
            type="text"
            value={profile.name}
            onChange={(e) => onUpdateProfile({ name: e.target.value })}
            placeholder="Ej. Juan Andrés Gómez Rojas"
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-doc">Documento de Identidad (C.C. / T.I.):</label>
          <input
            id="input-doc"
            type="text"
            value={profile.docNumber}
            onChange={(e) => onUpdateProfile({ docNumber: e.target.value })}
            placeholder="Ej. 1.020.345.678"
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-ficha">Número de Ficha ADSO:</label>
          <input
            id="input-ficha"
            type="text"
            value={profile.ficha}
            onChange={(e) => onUpdateProfile({ ficha: e.target.value })}
            placeholder="Ej. 228118-ADSO"
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-centro">Centro de Formación:</label>
          <input
            id="input-centro"
            type="text"
            value={profile.centro}
            onChange={(e) => onUpdateProfile({ centro: e.target.value })}
            placeholder="Ej. Centro de Biotecnología Agropecuaria / CSF"
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-regional">Regional SENA:</label>
          <input
            id="input-regional"
            type="text"
            value={profile.regional}
            onChange={(e) => onUpdateProfile({ regional: e.target.value })}
            placeholder="Ej. Regional Distrito Capital"
          />
        </div>

        <div className="input-group">
          <label htmlFor="input-instructor">Nombre del Instructor Líder:</label>
          <input
            id="input-instructor"
            type="text"
            value={profile.instructor}
            onChange={(e) => onUpdateProfile({ instructor: e.target.value })}
            placeholder="Ej. Ing. Carlos Peña"
          />
        </div>
      </div>

      <div className="input-group full-width" style={{ marginTop: '1rem' }}>
        <label htmlFor="input-obs">Observaciones o Dictamen del Instructor / Aprendiz:</label>
        <textarea
          id="input-obs"
          rows={2}
          value={profile.observations}
          onChange={(e) => onUpdateProfile({ observations: e.target.value })}
        />
      </div>

      <div className="input-group full-width defense-input" style={{ marginTop: '1rem' }}>
        <label htmlFor="input-defense">Defensa técnica del proyecto (mínimo recomendado: 80 caracteres):</label>
        <textarea
          id="input-defense"
          rows={4}
          value={projectDefense}
          onChange={(e) => onUpdateProjectDefense(e.target.value)}
          placeholder="Explica dos decisiones del modelo, una cardinalidad, un riesgo, una corrección y un supuesto pendiente."
        />
        <small className={defenseReady ? 'defense-ready' : ''}>
          {projectDefense.length}/80 · {defenseReady ? 'Defensa registrada' : 'Aún falta una explicación defendible'}
        </small>
      </div>

      {children}
    </div>
  )
}
