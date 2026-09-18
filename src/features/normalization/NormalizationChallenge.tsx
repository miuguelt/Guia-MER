import { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import {
  documentAttributes,
  tableDefinitions,
  type TableDestination,
} from './challenge/normalizationChallengeData'
import NormalizationAttributeCard from './challenge/NormalizationAttributeCard'
import NormalizationSchemaPreview from './challenge/NormalizationSchemaPreview'

export default function NormalizationChallenge() {
  const [placements, setPlacements] = useState<Record<string, TableDestination | undefined>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAssign = (attributeId: string, table: TableDestination) => {
    setPlacements((prev) => ({ ...prev, [attributeId]: table }))
    setShowResults(false)
  }

  const handleReset = () => {
    setPlacements({})
    setShowResults(false)
  }

  const handleAutofill = () => {
    const full: Record<string, TableDestination> = {}
    documentAttributes.forEach((attr) => {
      full[attr.id] = attr.correctTable
    })
    setPlacements(full)
    setShowResults(true)
  }

  const assignedCount = Object.keys(placements).filter((k) => placements[k] !== undefined).length
  const totalCount = documentAttributes.length

  const correctCount = documentAttributes.filter((attr) => placements[attr.id] === attr.correctTable).length
  const isAllCorrect = showResults && correctCount === totalCount

  return (
    <div className="nm-challenge-container" style={{ paddingTop: '16px' }}>
      {/* INTRODUCCIÓN Y CONTEXTO DEL DESAFÍO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>Práctica Activa de Descomposición</span>
          <h3 style={{ margin: '4px 0', fontSize: '18px' }}>
            Desafío: Normaliza una Orden de Compra de Almacén (OC-4020)
          </h3>
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', maxWidth: '780px', lineHeight: 1.5 }}>
            Te entregamos los <strong>11 campos crudos</strong> tomados directamente de una orden de compra física de la empresa constructora.
            Tu misión de analista es asignar cada campo a su <strong>tabla relacional correcta en 3FN</strong>, eliminando dependencias parciales (2FN), dependencias transitivas (3FN) y protegiendo el precio histórico.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button type="button" className="soft-button" onClick={handleReset} style={{ fontSize: '11px' }}>
            <RotateCcw size={13} /> Reiniciar
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => setShowResults(true)}
            style={{ fontSize: '11px' }}
            disabled={assignedCount === 0}
          >
            <CheckCircle2 size={14} /> Validar Normalización ({assignedCount}/{totalCount})
          </button>
        </div>
      </div>

      {/* DOCUMENTO FUENTE: ORDEN DE COMPRA FICTICIA */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'var(--surface-2)',
          border: '1px solid var(--line)',
          marginBottom: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ padding: '6px 10px', borderRadius: '6px', background: 'var(--surface-3)', color: 'var(--cyan)', fontWeight: 800, fontSize: '12px' }}>
            DOCUMENTO: OC-4020
          </span>
          <span style={{ fontSize: '12px', color: 'var(--ink)' }}>
            <strong>Constructora Hábitat S.A.S.</strong> · Orden de Adquisición de Materiales
          </span>
        </div>
        <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: 'var(--muted)' }}>
          <span>Proveedor: <strong>Cementos del Valle S.A.</strong></span>
          <span>Ciudad: <strong>Cali, Valle del Cauca</strong></span>
          <span>Ítems: <strong>2 materiales solicitados</strong></span>
        </div>
      </div>

      {/* BANNER DE RESULTADOS DE EVALUACIÓN */}
      {showResults && (
        <div
          style={{
            padding: '16px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid',
            borderColor: isAllCorrect ? 'var(--lime)' : 'var(--amber)',
            background: isAllCorrect ? 'color-mix(in srgb, var(--lime) 12%, var(--surface))' : 'color-mix(in srgb, var(--amber) 10%, var(--surface))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            {isAllCorrect ? <Sparkles size={20} color="var(--lime)" /> : <AlertTriangle size={20} color="var(--amber)" />}
            <strong style={{ fontSize: '14px', color: isAllCorrect ? 'var(--lime)' : 'var(--amber)' }}>
              {isAllCorrect
                ? '¡Extraordinario! Esquema 3FN Completamente Normalizado'
                : `Auditoría del Esquema: ${correctCount} de ${totalCount} atributos en su lugar óptimo`}
            </strong>
          </div>
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--ink)', lineHeight: 1.5 }}>
            {isAllCorrect
              ? 'Has demostrado dominio completo de la técnica de Codd: separaste entidades independientes (CIUDAD, PROVEEDOR, INSUMO), la cabecera de la transacción (ORDEN_COMPRA) y la tabla puente asociativa con el precio histórico inmutable (DETALLE_ORDEN). Tu base de datos no sufrirá anomalías de inserción, actualización ni borrado.'
              : 'Revisa las alertas marcadas en rojo abajo para comprender qué dependencia funcional (parcial o transitiva) está generando riesgo de anomalías o redundancia en tu diseño.'}
          </p>
        </div>
      )}

      {/* GRILLA PRINCIPAL: ATRIBUTOS VS TABLAS DESTINO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {/* COLUMNA IZQUIERDA: ATRIBUTOS A CLASIFICAR */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>
              Atributos Extraídos del Documento ({totalCount})
            </span>
            <button
              type="button"
              className="soft-button"
              onClick={handleAutofill}
              style={{ fontSize: '10px', padding: '3px 8px' }}
            >
              Resolver automáticamente
            </button>
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            {documentAttributes.map((attr) => (
              <NormalizationAttributeCard
                key={attr.id}
                attr={attr}
                currentTable={placements[attr.id]}
                showResults={showResults}
                tableDefinitions={tableDefinitions}
                onAssign={handleAssign}
              />
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: TABLAS RESULTANTES (3FN) */}
        <NormalizationSchemaPreview
          tableDefinitions={tableDefinitions}
          documentAttributes={documentAttributes}
          placements={placements}
          showResults={showResults}
        />
      </div>
    </div>
  )
}
