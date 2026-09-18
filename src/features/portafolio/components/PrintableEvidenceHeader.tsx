import type { ApprenticeProfile } from '../../../hooks/useLocalProgress'

interface PrintableEvidenceHeaderProps {
  profile: ApprenticeProfile
  isFullyApproved: boolean
}

export default function PrintableEvidenceHeader({ profile, isFullyApproved }: PrintableEvidenceHeaderProps) {
  return (
    <table className="evidence-header-table">
      <tbody>
        <tr>
          <td className="evidence-header-logo-cell">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="70" height="70" aria-label="Escudo SENA">
              <circle cx="80" cy="22" r="14" fill="#39A900" />
              <path
                d="M80 44 C74 44 54 58 34 74 C30 77 32 81 36 81 C50 81 66 69 75 62 L75 96 L85 96 L85 62 C94 69 110 81 124 81 C128 81 130 77 126 74 C106 58 86 44 80 44 Z"
                fill="#39A900"
              />
              <rect x="56" y="102" width="48" height="6" rx="3" fill="#39A900" />
              <rect x="44" y="112" width="72" height="6" rx="3" fill="#39A900" />
              <rect x="32" y="122" width="96" height="6" rx="3" fill="#39A900" />
              <text
                x="80"
                y="150"
                textAnchor="middle"
                fontFamily="'Segoe UI', Roboto, Arial, sans-serif"
                fontWeight="900"
                fontSize="22"
                fill="#39A900"
                letterSpacing="2"
              >
                SENA
              </text>
            </svg>
          </td>
          <td className="evidence-header-title-cell">
            <h2>SERVICIO NACIONAL DE APRENDIZAJE — SENA</h2>
            <p>
              <strong>DIRECCIÓN DE FORMACIÓN PROFESIONAL · SISTEMA INTEGRADO DE GESTIÓN Y AUTOCONTROL (SIGA)</strong>
            </p>
            <p>
              <strong>REGISTRO INTEGRAL DE EVIDENCIAS DE APRENDIZAJE Y LISTA DE CHEQUEO</strong>
            </p>
            <p>Programa de Formación: Tecnólogo en Análisis y Desarrollo de Software (ADSO) · Código 228118</p>
          </td>
          <td className="evidence-header-meta-cell">
            <p><strong>Referencia:</strong> GFPI-F-023 (Adaptación Didáctica)</p>
            <p><strong>Versión:</strong> 3.0</p>
            <p><strong>Ficha:</strong> <span>{profile.ficha}</span></p>
            <p><strong>Fecha de Emisión:</strong> <span>{profile.date}</span></p>
            <p>
              <strong>Estado:</strong>{' '}
              <span className={`badge ${isFullyApproved ? 'badge--success' : 'badge--warning'}`}>
                {isFullyApproved ? 'EVIDENCIA CONSOLIDADA' : 'EN PROCESO'}
              </span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
