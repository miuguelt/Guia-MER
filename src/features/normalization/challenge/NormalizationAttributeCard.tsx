import type { DocumentAttribute, TableDefinition, TableDestination } from './normalizationChallengeData'

interface NormalizationAttributeCardProps {
  attr: DocumentAttribute
  currentTable: TableDestination | undefined
  showResults: boolean
  tableDefinitions: TableDefinition[]
  onAssign: (attributeId: string, table: TableDestination) => void
}

export default function NormalizationAttributeCard({
  attr,
  currentTable,
  showResults,
  tableDefinitions,
  onAssign,
}: NormalizationAttributeCardProps) {
  const isAssigned = currentTable !== undefined
  const isCorrect = showResults && isAssigned && currentTable === attr.correctTable
  const isWrong = showResults && isAssigned && currentTable !== attr.correctTable

  return (
    <div
      style={{
        padding: '12px',
        borderRadius: '8px',
        background: 'var(--surface-2)',
        border: '1px solid',
        borderColor: isCorrect
          ? 'var(--lime)'
          : isWrong
          ? 'var(--rose)'
          : isAssigned
          ? 'var(--line-strong)'
          : 'var(--line)',
        transition: 'border-color .2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
        <div>
          <code style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cyan)' }}>
            {attr.name}
          </code>
          <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>
            {attr.description}
          </span>
        </div>

        {showResults && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px',
              background: isCorrect ? 'var(--lime)' : 'var(--rose)',
              color: '#000',
              flexShrink: 0,
            }}
          >
            {isCorrect ? 'Correcto' : 'Revisar'}
          </span>
        )}
      </div>

      {/* SELECTOR DE TABLA DESTINO */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
        {tableDefinitions.map((tbl) => {
          const isSelected = currentTable === tbl.id
          return (
            <button
              key={tbl.id}
              type="button"
              onClick={() => onAssign(attr.id, tbl.id)}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: isSelected ? tbl.color : 'var(--line)',
                background: isSelected ? `color-mix(in srgb, ${tbl.color} 20%, var(--surface))` : 'var(--surface)',
                color: isSelected ? 'var(--ink)' : 'var(--muted)',
              }}
            >
              {tbl.name}
            </button>
          )
        })}
      </div>

      {/* EXPLICACIÓN DE LA ANOMALÍA SI FUE INCORRECTO */}
      {isWrong && currentTable && (
        <div
          style={{
            marginTop: '10px',
            padding: '8px 10px',
            borderRadius: '6px',
            background: 'color-mix(in srgb, var(--rose) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--rose) 30%, transparent)',
            fontSize: '10px',
            color: 'var(--ink)',
            lineHeight: 1.4,
          }}
        >
          <strong style={{ color: 'var(--rose)', display: 'block', marginBottom: '2px' }}>
            Motivo del error de diseño:
          </strong>
          {attr.anomalyIfWrong[currentTable] ||
            `El atributo ${attr.name} no debe ubicarse en ${currentTable.toUpperCase()} porque genera redundancia y viola la forma normal.`}
        </div>
      )}
    </div>
  )
}
