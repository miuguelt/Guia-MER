import { Check, RotateCcw, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { AssessmentState, AttemptRecord } from '../../hooks/useLocalProgress'

interface AssessmentQuestion {
  id: string
  prompt: string
  options: string[]
  answer: string
  explanation: string
}

const pretest: AssessmentQuestion[] = [
  { id: 'p1', prompt: 'Un cliente puede realizar muchos pedidos y cada pedido pertenece a un solo cliente. ¿Qué forma tiene la relación?', options: ['1:1', '1:N', 'N:M'], answer: '1:N', explanation: 'Un cliente se repite en muchos pedidos; cada pedido apunta a un solo cliente.' },
  { id: 'p2', prompt: 'Un pedido contiene varios productos y un producto aparece en varios pedidos. ¿Qué falta en el modelo relacional?', options: ['Una tabla puente', 'Un campo con una lista', 'Eliminar PRODUCTO'], answer: 'Una tabla puente', explanation: 'La relación N:M se representa con una tabla asociativa, que también puede guardar cantidad o precio pactado.' },
  { id: 'p3', prompt: 'Una persona tiene varios teléfonos. ¿Cuál es la opción más coherente con 1FN?', options: ['tel1, tel2 en una celda', 'Una fila por teléfono', 'Guardar solo el último'], answer: 'Una fila por teléfono', explanation: 'Cada celda debe conservar un valor atómico; los teléfonos pueden vivir en una tabla hija.' },
]

const posttest: AssessmentQuestion[] = [
  { id: 'q1', prompt: 'Una paciente puede tener muchas citas y cada cita corresponde a una sola paciente. ¿Qué relación debes derivar?', options: ['1:1', '1:N', 'N:M'], answer: '1:N', explanation: 'La tabla CITA queda en el lado N y recibe la FK de PACIENTE.' },
  { id: 'q2', prompt: 'Un aprendiz cursa muchos cursos y cada curso tiene muchos aprendices. ¿Cómo lo llevas a tablas?', options: ['FK solo en CURSO', 'FK solo en APRENDIZ', 'Tabla MATRICULA con ambas FK'], answer: 'Tabla MATRICULA con ambas FK', explanation: 'Ambos extremos son N; la tabla puente representa cada inscripción.' },
  { id: 'q3', prompt: 'El sistema debe consultar cada teléfono de una persona por separado. ¿Qué diseño conserva atomicidad?', options: ['Una columna con teléfonos separados por coma', 'Tabla TELEFONO con una fila por número', 'Un JSON obligatorio sin estructura'], answer: 'Tabla TELEFONO con una fila por número', explanation: 'Una fila por valor permite buscar, validar y relacionar cada teléfono de forma independiente.' },
]

interface Props {
  assessment: AssessmentState
  onAssessmentChange: (patch: Partial<AssessmentState>) => void
  onRecordAttempt: (attempt: Omit<AttemptRecord, 'id' | 'timestamp'>) => void
}

export default function MasteryCheck({ assessment, onAssessmentChange, onRecordAttempt }: Props) {
  const phase = assessment.posttestCompletedAt ? 'done' : assessment.pretestCompletedAt ? 'posttest' : 'pretest'
  const questions = phase === 'posttest' ? posttest : pretest
  const storedAnswers = phase === 'posttest' ? assessment.posttestAnswers : assessment.pretestAnswers
  const [answers, setAnswers] = useState<Record<string, string>>(storedAnswers)

  useEffect(() => setAnswers(storedAnswers), [phase, storedAnswers])

  const submit = () => {
    const score = questions.filter((question) => answers[question.id] === question.answer).length
    const completedAt = new Date().toISOString()
    if (phase === 'pretest') {
      onAssessmentChange({ pretestAnswers: answers, pretestScore: score, pretestCompletedAt: completedAt })
    } else if (phase === 'posttest') {
      onAssessmentChange({ posttestAnswers: answers, posttestScore: score, posttestCompletedAt: completedAt })
    }
    onRecordAttempt({
      module: 'm2',
      skillId: `mer.retrieval.${phase}`,
      score: score / questions.length,
      status: phase === 'posttest' && score / questions.length >= 0.8 ? 'mastered' : 'practiced',
      errors: questions.filter((question) => answers[question.id] !== question.answer).map((question) => question.id),
    })
  }

  if (phase === 'done') {
    const gain = (assessment.posttestScore ?? 0) - (assessment.pretestScore ?? 0)
    return <section className="mastery-check panel-card" aria-labelledby="mastery-check-title">
      <div className="card-heading"><div><span className="eyebrow">Medición de aprendizaje</span><h2 id="mastery-check-title">Recuperación completada</h2></div><Target size={19} className="muted-icon" /></div>
      <div className="assessment-result"><strong>{assessment.pretestScore}/{pretest.length} → {assessment.posttestScore}/{posttest.length}</strong><span>{gain > 0 ? `Ganancia: +${gain} respuestas` : 'Vuelve a practicar los conceptos que aún cuestan.'}</span></div>
      <p className="assessment-note">Este resultado mide recuperación de conceptos, no reemplaza la transferencia de un proyecto nuevo ni la revisión del instructor.</p>
    </section>
  }

  const title = phase === 'pretest' ? '¿Qué puedes recuperar sin ayuda?' : 'Comprueba qué quedó después de practicar'
  const intro = phase === 'pretest' ? 'Responde antes de recorrer la ruta. No es una nota: es una línea base para comparar.' : 'Responde una variante equivalente. El objetivo es recordar el criterio, no reconocer la misma frase.'
  const allAnswered = questions.every((question) => answers[question.id])

  return <section className="mastery-check panel-card" aria-labelledby="mastery-check-title">
    <div className="card-heading"><div><span className="eyebrow">{phase === 'pretest' ? 'Pretest · 3 min' : 'Postest · 3 min'}</span><h2 id="mastery-check-title">{title}</h2></div><span className="route-counter">{phase === 'pretest' ? 'Línea base' : 'Recuperación'}</span></div>
    <p className="assessment-intro">{intro}</p>
    <div className="assessment-grid">
      {questions.map((question, index) => <article className="assessment-question" key={question.id}>
        <span className="assessment-number">0{index + 1}</span>
        <p>{question.prompt}</p>
        <div className="assessment-options">
          {question.options.map((option) => <button key={option} type="button" aria-pressed={answers[question.id] === option} className={answers[question.id] === option ? 'is-selected' : ''} onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}>{option}</button>)}
        </div>
        {answers[question.id] && <small>{answers[question.id] === question.answer ? 'Criterio recuperado. ' : 'Revisa el criterio. '}{question.explanation}</small>}
      </article>)}
    </div>
    <div className="assessment-footer"><span>{Object.keys(answers).length}/{questions.length} respuestas</span><button className="primary-button small-button" type="button" disabled={!allAnswered} onClick={submit}>{phase === 'pretest' ? 'Guardar línea base' : 'Guardar recuperación'} <Check size={14} /></button></div>
    {phase === 'posttest' && <p className="assessment-note"><RotateCcw size={13} /> Si fallas, conserva el error: se convierte en una próxima práctica, no en una penalización.</p>}
  </section>
}
