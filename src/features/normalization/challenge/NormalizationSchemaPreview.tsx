import { AlertCircle, Check } from 'lucide-react'
import type { DocumentAttribute, TableDefinition, TableDestination } from './normalizationChallengeData'

interface NormalizationSchemaPreviewProps {
  tableDefinitions: TableDefinition[]
  documentAttributes: DocumentAttribute[]
  placements: Record<string, TableDestination | undefined>
  showResults: boolean
}

export default function NormalizationSchemaPreview({
  tableDefinitions,
  documentAttributes,
  placements,
  showResults,
}: NormalizationSchemaPreviewProps) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>
          Esquema Relacional Destino (Tablas 3FN)
        </span>
        <span style={{ fontSize: '10px', color: 'var(--faint)' }}>
          A cada tabla le corresponden sus atributos
        </span>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {tableDefinitions.map((tbl) => {
          const assignedAttributes = documentAttributes.filter((attr) => placements[attr.id] === tbl.id)

          return (
            <div
              key={tbl.id}
              style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                borderLeft: `4px solid ${tbl.color}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>{tbl.name}</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>
                    {tbl.description}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '9px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--surface-3)',
                    color: tbl.color,
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                  }}
                >
                  {tbl.pkLabel}
                </span>
              </div>

              {/* LISTA DE CAMPOS ASIGNADOS */}
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--faint)', fontWeight: 800, letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                  Columnas Asignadas ({assignedAttributes.length}):
                </span>

                {assignedAttributes.length === 0 ? (
                  <span style={{ fontSize: '10px', color: 'var(--faint)', fontStyle: 'italic' }}>
                    Ningún atributo asignado todavía.
                  </span>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {assignedAttributes.map((attr) => {
                      const isCorrect = showResults && attr.correctTable === tbl.id
                      const isWrong = showResults && attr.correctTable !== tbl.id

                      return (
                        <span
                          key={attr.id}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            background: isCorrect
                              ? 'color-mix(in srgb, var(--lime) 15%, var(--surface))'
                              : isWrong
                              ? 'color-mix(in srgb, var(--rose) 15%, var(--surface))'
                              : 'var(--surface-3)',
                            color: isCorrect
                              ? 'var(--lime)'
                              : isWrong
                              ? 'var(--rose)'
                              : 'var(--ink)',
                            border: '1px solid',
                            borderColor: isCorrect
                              ? 'var(--lime)'
                              : isWrong
                              ? 'var(--rose)'
                              : 'var(--line)',
                          }}
                        >
                          <code>{attr.name}</code>
                          {showResults && (isCorrect ? <Check size={11} /> : <AlertCircle size={11} />)}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
