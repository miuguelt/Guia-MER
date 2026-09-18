import type { ModuleKey } from '../../../data/course'
import type { ApprenticeProfile } from '../../../hooks/useLocalProgress'
import type { EvidenceItem } from '../types'
import PrintableEvidenceHeader from './PrintableEvidenceHeader'

interface PrintableEvidenceSheetProps {
  profile: ApprenticeProfile
  evidences: EvidenceItem[]
  isFullyApproved: boolean
  progressPercent: number
  defenseReady: boolean
  projectDefense: string
  onNavigate: (module: ModuleKey) => void
}

export default function PrintableEvidenceSheet({
  profile,
  evidences,
  isFullyApproved,
  progressPercent,
  defenseReady,
  projectDefense,
  onNavigate,
}: PrintableEvidenceSheetProps) {
  const currentSignature = profile.signature

  return (
    <div className="sena-printable-wrapper">
      <div className="sena-evidence-sheet" id="sena-evidence-sheet">
        {/* Encabezado Institucional SENA SIGA */}
        <PrintableEvidenceHeader profile={profile} isFullyApproved={isFullyApproved} />

        {/* Sección 1: Datos Generales */}
        <section className="evidence-section">
          <h4 className="evidence-subtitle">1. Datos Generales del Aprendiz y Proceso Formativo</h4>
          <table className="evidence-table">
            <tbody>
              <tr>
                <td className="evidence-table-label">Nombre del Aprendiz:</td>
                <td className="evidence-table-val"><strong>{profile.name}</strong></td>
                <td className="evidence-table-label">Documento de Identidad:</td>
                <td className="evidence-table-val">C.C. {profile.docNumber || '_________________'}</td>
              </tr>
              <tr>
                <td className="evidence-table-label">Centro de Formación:</td>
                <td className="evidence-table-val">{profile.centro}</td>
                <td className="evidence-table-label">Regional SENA:</td>
                <td className="evidence-table-val">{profile.regional}</td>
              </tr>
              <tr>
                <td className="evidence-table-label">Instructor Técnico:</td>
                <td className="evidence-table-val">{profile.instructor}</td>
                <td className="evidence-table-label">Ficha de Caracterización:</td>
                <td className="evidence-table-val">{profile.ficha}</td>
              </tr>
              <tr>
                <td className="evidence-table-label">Competencia Laboral:</td>
                <td className="evidence-table-val" colSpan={3}>
                  <strong>220501098:</strong> Modelar la base de datos de acuerdo con los requisitos del sistema y las reglas de integridad referencial.
                </td>
              </tr>
              <tr>
                <td className="evidence-table-label">Resultados Evaluados (RAPs):</td>
                <td className="evidence-table-val" colSpan={3}>
                  RAP-01: Construir el modelo conceptual entidad-relación, transformar a modelo relacional y generar diccionario de datos técnico con restricciones de integridad; la valoración formal la realiza el instructor evaluador.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Sección 2: Registro Taxativo de Evidencias Técnicas Realizadas */}
        <section className="evidence-section">
          <h4 className="evidence-subtitle">2. Registro Taxativo de Evidencias Técnicas Realizadas</h4>
          <table className="evidence-table">
            <thead>
              <tr>
                <th style={{ width: '10%', textAlign: 'center' }}>Código</th>
                <th style={{ width: '45%' }}>Denominación de la Evidencia Técnica</th>
                <th style={{ width: '25%' }}>Instrumento de Evaluación</th>
                <th style={{ width: '20%', textAlign: 'center' }}>Resultado Real</th>
              </tr>
            </thead>
            <tbody>
              {evidences.map((item) => (
                <tr key={item.code}>
                  <td style={{ textAlign: 'center' }}><strong>{item.code}</strong></td>
                  <td>
                    <strong>{item.name}</strong>
                    <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: '2px' }}>
                      {item.detail}
                    </div>
                  </td>
                  <td>{item.instrument}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${item.isCompleted ? 'badge--success' : 'badge--danger'}`}>
                      {item.isCompleted ? 'CUMPLIDO' : 'PENDIENTE'}
                    </span>
                    {!item.isCompleted && (
                      <div className="no-print" style={{ marginTop: '4px' }}>
                        <button
                          type="button"
                          className="btn btn--xs btn--secondary"
                          onClick={() => onNavigate(item.stationModule)}
                          style={{ fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}
                        >
                          Ir a Estación ➔
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Sección 3: Lista de Chequeo y Criterios de Auto-revisión */}
        <section className="evidence-section">
          <h4 className="evidence-subtitle">3. Lista de Chequeo y Auto-revisión de Criterios Técnicos</h4>
          <table className="evidence-table">
            <thead>
              <tr>
                <th style={{ width: '12%', textAlign: 'center' }}>Código</th>
                <th style={{ width: '48%' }}>Criterio de Evaluación e Indicadores Observables</th>
                <th style={{ width: '15%', textAlign: 'center' }}>Auto-revisión</th>
                <th style={{ width: '25%' }}>Diagnóstico Técnico y Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {evidences.map((item) => (
                <tr key={`chk-${item.code}`}>
                  <td style={{ textAlign: 'center', verticalAlign: 'top' }}>
                    <strong>{item.code}</strong>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>{item.phase}</div>
                  </td>
                  <td>
                    <strong>{item.criterion}</strong>
                    {item.indicators && item.indicators.length > 0 && (
                      <ul style={{ margin: '4px 0 0', paddingLeft: '14px', fontSize: '0.72rem', color: '#334155' }}>
                        {item.indicators.map((ind, i) => (
                          <li key={i} style={{ margin: '2px 0' }}>
                            <span style={{ color: ind.pass ? '#166534' : '#b45309', fontWeight: 700 }}>
                              {ind.pass ? '[✓]' : '[○]'}
                            </span>{' '}
                            {ind.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td style={{ textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    <strong>
                      {item.isCompleted ? '[ X ] SÍ   [   ] NO' : '[   ] SÍ   [ X ] NO'}
                    </strong>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#334155', verticalAlign: 'top' }}>
                    {item.diagnosticObs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Caja de Dictamen Orientativo */}
          <div className={`evidence-verdict-box ${isFullyApproved ? 'is-approved' : ''}`}>
            <div className="verdict-header">
              <span>RESULTADO ORIENTATIVO DEL REGISTRO LOCAL:</span>
              <span style={{ fontSize: '0.8rem', color: '#475569' }}>
                Competencia 220501098 · Avance Técnico: {progressPercent}%
              </span>
            </div>
            <div className="verdict-options">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'default' }}>
                <input type="radio" name="juicio_mer" checked={isFullyApproved} disabled readOnly />
                <strong>APROBADO (A)</strong>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'default' }}>
                <input type="radio" name="juicio_mer" checked={!isFullyApproved} disabled readOnly />
                <strong>NO APROBADO (NA) — {isFullyApproved ? 'Superado' : 'EN PROCESO DE FORMACIÓN'}</strong>
              </label>
            </div>
            <div className="evidence-observations-box">
              <strong>Observaciones y Recomendaciones Formativas:</strong>
              <span>{profile.observations}</span>
            </div>
            <div className={`evidence-observations-box defense-verdict-note ${defenseReady ? 'is-ready' : ''}`}>
              <strong>Defensa técnica:</strong>
              <span>{defenseReady ? projectDefense : 'Pendiente. Explica decisiones, riesgos, correcciones y supuestos del modelo en el campo de defensa.'}</span>
            </div>
          </div>

          {/* Declaración de Autenticidad */}
          <div className="evidence-declaration">
            <strong>Declaración de Autenticidad y Veracidad:</strong> El aprendiz abajo firmante declara bajo la gravedad de juramento académico que el modelo entidad-relación, las reglas de cardinalidad, la derivación a tablas relacionales, el diccionario técnico de datos y la bitácora de auditoría humano-IA presentados en este registro fueron elaborados de forma personal y autónoma, respetando las normas éticas del Servicio Nacional de Aprendizaje SENA.
          </div>

          {/* CUADRO INSTITUCIONAL DE FIRMAS */}
          <div className="evidence-signatures-grid">
            <div className="signature-column">
              <div className="signature-stamp-area">
                {currentSignature ? (
                  <img src={currentSignature} className="signature-stamp-img" alt="Firma Digital del Aprendiz" />
                ) : (
                  <div className="signature-blank-placeholder" title="Espacio para firma física con bolígrafo" />
                )}
              </div>
              <div className="signature-line-bar" />
              <div className="signature-details">
                <strong><span>{profile.name}</span></strong>
                <span>C.C. {profile.docNumber || '_________________'}</span><br />
                <span>Aprendiz SENA — ADSO</span>
                <div style={{ marginTop: '2px' }}>
                  {currentSignature ? (
                    <span className="signature-digital-tag">✓ Firma Digital Registrada</span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>(Firma Manuscrita del Aprendiz)</span>
                  )}
                </div>
              </div>
            </div>

            <div className="signature-column">
              <div className="signature-stamp-area">
                <div className="signature-blank-placeholder" title="Espacio para firma y sello del instructor" />
              </div>
              <div className="signature-line-bar" />
              <div className="signature-details">
                <strong><span>{profile.instructor}</span></strong>
                <span>Instructor Técnico SENA</span><br />
                <span><span>{profile.centro}</span></span>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                  <span>(Firma y Sello del Instructor Evaluador)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
