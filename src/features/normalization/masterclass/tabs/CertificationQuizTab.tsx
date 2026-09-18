import { Check, Download } from 'lucide-react'
import type { QuizItem } from '../masterclassTypes'

interface CertificationQuizTabProps {
  quizItems: QuizItem[]
  quizAnswers: Record<number, number>
  quizSubmitted: Record<number, boolean>
  correctAnswersCount: number
  onSelectQuizOption: (questionId: number, optionIdx: number) => void
  onResetQuiz: () => void
  onDownloadManual: () => void
}

export default function CertificationQuizTab({
  quizItems,
  quizAnswers,
  quizSubmitted,
  correctAnswersCount,
  onSelectQuizOption,
  onResetQuiz,
  onDownloadManual,
}: CertificationQuizTabProps) {
  return (
    <div className="nm-tab-pane" style={{ paddingTop: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>Autochequeo Formativo de Conocimientos</span>
          <h3 style={{ margin: '4px 0', fontSize: '16px' }}>Reto del Aprendiz: ¿Dominas la Normalización?</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            Aciertos: <strong style={{ color: 'var(--lime)' }}>{correctAnswersCount}</strong> de {quizItems.length}
          </span>
          {Object.keys(quizSubmitted).length > 0 && (
            <button type="button" className="soft-button" onClick={onResetQuiz} style={{ fontSize: '10px' }}>
              Reiniciar respuestas
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '14px' }}>
        {quizItems.map((item, idx) => {
          const answered = quizSubmitted[item.id]
          const chosen = quizAnswers[item.id]
          const isCorrect = answered && chosen === item.correct

          return (
            <div
              key={item.id}
              style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'var(--surface-2)',
                border: '1px solid',
                borderColor: answered ? (isCorrect ? 'color-mix(in srgb, var(--lime) 45%, var(--line))' : 'color-mix(in srgb, var(--rose) 45%, var(--line))') : 'var(--line)',
                transition: 'border-color .2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--surface-3)', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>
                  {idx + 1}
                </span>
                <strong style={{ fontSize: '12px', color: 'var(--ink)', lineHeight: 1.4 }}>
                  {item.question}
                </strong>
              </div>

              {/* OPCIONES */}
              <div style={{ display: 'grid', gap: '6px', marginLeft: '32px' }}>
                {item.options.map((opt, optIdx) => {
                  const isSelected = answered && chosen === optIdx
                  const isAnswerCorrect = answered && optIdx === item.correct

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => onSelectQuizOption(item.id, optIdx)}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        border: '1px solid',
                        borderColor: isAnswerCorrect
                          ? 'var(--lime)'
                          : isSelected
                          ? 'var(--rose)'
                          : 'var(--line)',
                        background: isAnswerCorrect
                          ? 'color-mix(in srgb, var(--lime) 10%, transparent)'
                          : isSelected
                          ? 'color-mix(in srgb, var(--rose) 10%, transparent)'
                          : 'var(--surface)',
                        color: 'var(--ink)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{opt}</span>
                      {isAnswerCorrect && <Check size={14} color="var(--lime)" />}
                    </button>
                  )
                })}
              </div>

              {/* RETROALIMENTACIÓN FORMATIVA */}
              {answered && (
                <div style={{ marginTop: '10px', marginLeft: '32px', padding: '8px 12px', borderRadius: '6px', background: isCorrect ? 'color-mix(in srgb, var(--lime) 8%, transparent)' : 'color-mix(in srgb, var(--amber) 8%, transparent)', fontSize: '10px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  <strong style={{ color: isCorrect ? 'var(--lime)' : 'var(--amber)', display: 'block', marginBottom: '2px' }}>
                    {isCorrect ? '¡Excelente análisis!' : 'Reflexión de aprendizaje:'}
                  </strong>
                  {item.explanation}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {correctAnswersCount === quizItems.length && (
        <div style={{ marginTop: '18px', padding: '16px', borderRadius: '10px', background: 'color-mix(in srgb, var(--lime) 12%, var(--surface))', border: '1px solid var(--lime)', textAlign: 'center' }}>
          <span style={{ fontSize: '24px', display: 'block', marginBottom: '6px' }}>🎉</span>
          <strong style={{ color: 'var(--lime)', fontSize: '14px', display: 'block' }}>
            ¡Felicitaciones! Has dominado los conceptos de 1FN, 2FN y 3FN
          </strong>
          <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '4px auto 0', maxWidth: '600px', lineHeight: 1.5 }}>
            Ahora tienes la capacidad de tomar cualquier documento administrativo del mundo real (remisión, orden de compra, historia clínica) y transformarlo con rigor técnico en un modelo relacional indestructible.
          </p>
          <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
              type="button"
              className="primary-button"
              onClick={onDownloadManual}
              style={{ fontSize: '11px' }}
            >
              <Download size={14} /> Descargar Manual de Bolsillo (Markdown)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
