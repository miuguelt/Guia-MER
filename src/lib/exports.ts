import type { DictionaryRow } from '../hooks/useLocalProgress'
import type { AiLogDraft } from '../data/ai'

export function downloadText(filename: string, content: string, type = 'text/plain') {
  const blob = new Blob([content], { type: `${type};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function dictionaryToCsv(rows: DictionaryRow[]) {
  const header = 'Nombre de Tabla,Nombre de Campo,Tipo SQL,Tamaño,NN,Restricción,Descripción'
  const body = rows.map((row) => [row.table, row.field, row.type, row.size, row.nn ? 'Sí' : 'No', row.constraint, row.description]
    .map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
  return [header, ...body].join('\n')
}

export function dictionaryToMarkdown(rows: DictionaryRow[]) {
  const header = '| Nombre de Tabla | Nombre de Campo | Tipo de Dato SQL | Tamaño | NN | Restricción | Descripción |'
  const separator = '|---|---|---|---|---|---|---|'
  const body = rows.map((row) => `| ${row.table} | ${row.field} | ${row.type} | ${row.size} | ${row.nn ? 'Sí' : 'No'} | ${row.constraint} | ${row.description} |`)
  return [header, separator, ...body].join('\n')
}

export function buildSql(rows: DictionaryRow[], policy: 'RESTRICT' | 'CASCADE' | 'SET NULL' = 'RESTRICT') {
  const tables = [...new Set(rows.map((row) => row.table.trim()).filter(Boolean))]

  // Identificar PKs de cada tabla
  const pksByTable: Record<string, string[]> = {}
  tables.forEach((table) => {
    const tableRows = rows.filter((r) => r.table === table)
    const pks = tableRows.filter((r) => r.constraint.includes('PK')).map((r) => r.field)
    pksByTable[table] = pks
  })

  // Detectar dependencias foráneas para emitir padres antes que hijas
  const dependencies: Record<string, string[]> = {}
  tables.forEach((table) => {
    dependencies[table] = []
    const tableRows = rows.filter((r) => r.table === table)
    tableRows.forEach((r) => {
      if (r.constraint.includes('FK')) {
        const candidate = r.field.startsWith('id_') ? r.field.replace('id_', '') : ''
        const targetTable = tables.find((t) => t === candidate || t === `${candidate}s`)
        if (targetTable && targetTable !== table && !dependencies[table].includes(targetTable)) {
          dependencies[table].push(targetTable)
        }
      }
    })
  })

  // Ordenar tablas topológicamente (padres primero)
  const sortedTables: string[] = []
  const visited = new Set<string>()
  const visit = (table: string) => {
    if (visited.has(table)) return
    visited.add(table)
    ;(dependencies[table] || []).forEach((dep) => visit(dep))
    sortedTables.push(table)
  }
  tables.forEach((t) => visit(t))

  const tableSqls = sortedTables.map((table) => {
    const tableRows = rows.filter((r) => r.table === table)
    const pkFields = tableRows.filter((r) => r.constraint.includes('PK')).map((r) => r.field)
    const isCompositePk = pkFields.length > 1

    const fieldLines = tableRows.map((row) => {
      const typeNeedsSize = ['VARCHAR', 'CHAR', 'NUMERIC', 'DECIMAL'].includes(row.type.toUpperCase())
      const sizeParam = typeNeedsSize && row.size && row.size !== '—' && row.size.trim() !== '' ? `(${row.size})` : ''
      const nullable = row.nn ? ' NOT NULL' : ''

      let constraintClause = ''
      if (!isCompositePk && row.constraint.includes('PK') && !row.constraint.includes('FK')) {
        constraintClause = ' PRIMARY KEY'
      } else if (row.constraint.includes('UQ')) {
        constraintClause = ' UNIQUE'
      }

      if (row.constraint.includes('FK')) {
        const candidate = row.field.startsWith('id_') ? row.field.replace('id_', '') : ''
        const targetTable = tables.find((t) => t === candidate || t === `${candidate}s`)
        const targetPk = targetTable && pksByTable[targetTable]?.length === 1 ? pksByTable[targetTable][0] : row.field
        const refTable = targetTable || candidate || 'tabla_padre'
        constraintClause += ` REFERENCES ${refTable}(${targetPk}) ON DELETE ${policy} ON UPDATE CASCADE`
      }

      return `  ${row.field} ${row.type}${sizeParam}${nullable}${constraintClause}`
    })

    if (isCompositePk) {
      fieldLines.push(`  PRIMARY KEY (${pkFields.join(', ')})`)
    }

    return `CREATE TABLE ${table} (\n${fieldLines.join(',\n')}\n);`
  })

  return tableSqls.join('\n\n')
}

export function aiLogToMarkdown(log: AiLogDraft) {
  return [
    '# Bitácora de trabajo con IA',
    '',
    '## Instrucción usada',
    log.prompt || '_Pendiente de registrar._',
    '',
    '## Contexto entregado',
    log.context || '_Pendiente de registrar._',
    '',
    '## Supuestos [POR VALIDAR]',
    log.assumptions || '_Pendiente de registrar._',
    '',
    '## Correcciones humanas',
    log.corrections || '_Pendiente de registrar._',
    '',
    '## Pruebas ejecutadas',
    log.tests || '_Pendiente de registrar._',
  ].join('\n')
}
