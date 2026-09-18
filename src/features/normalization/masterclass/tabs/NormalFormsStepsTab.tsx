import type { NormalFormStep } from '../masterclassTypes'
import Step0FNView from '../steps/Step0FNView'
import Step1FNView from '../steps/Step1FNView'
import Step2FNView from '../steps/Step2FNView'
import Step3FNView from '../steps/Step3FNView'

interface NormalFormsStepsTabProps {
  currentStep: NormalFormStep
  setCurrentStep: (step: NormalFormStep) => void
  anomalyTriggered: 'none' | 'insert' | 'update' | 'delete'
  setAnomalyTriggered: (val: 'none' | 'insert' | 'update' | 'delete') => void
  onGoToDeps: () => void
}

export default function NormalFormsStepsTab({
  currentStep,
  setCurrentStep,
  anomalyTriggered,
  setAnomalyTriggered,
  onGoToDeps,
}: NormalFormsStepsTabProps) {
  return (
    <div className="nm-tab-pane" style={{ paddingTop: '18px' }}>
      {/* SELECTOR DE FORMA NORMAL */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['0FN', '1FN', '2FN', '3FN'] as NormalFormStep[]).map((step) => (
            <button
              key={step}
              type="button"
              className={`soft-button ${currentStep === step ? 'is-active' : ''}`}
              onClick={() => setCurrentStep(step)}
              style={{
                padding: '6px 14px',
                fontWeight: 700,
                fontSize: '11px',
                color: currentStep === step ? (step === '0FN' ? 'var(--rose)' : step === '1FN' ? 'var(--cyan)' : step === '2FN' ? 'var(--amber)' : 'var(--lime)') : 'var(--muted)',
                borderColor: currentStep === step ? 'currentColor' : 'var(--line)',
              }}
            >
              {step === '0FN' ? '0FN (Desnormalizada)' : step}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
          {currentStep === '0FN' && 'Estado inicial: Todos los datos en una sola cuadrícula plana.'}
          {currentStep === '1FN' && 'Paso 1: Atomicidad absoluta y llave primaria.'}
          {currentStep === '2FN' && 'Paso 2: Eliminar dependencias de llaves compuestas.'}
          {currentStep === '3FN' && 'Paso 3: Eliminar dependencias transitivas entre atributos.'}
        </span>
      </div>

      {/* RENDERIZADO DEL SUB-PASO CORRESPONDIENTE */}
      {currentStep === '0FN' && (
        <Step0FNView
          anomalyTriggered={anomalyTriggered}
          setAnomalyTriggered={setAnomalyTriggered}
          onNext={() => setCurrentStep('1FN')}
        />
      )}

      {currentStep === '1FN' && (
        <Step1FNView
          onPrev={() => setCurrentStep('0FN')}
          onNext={() => setCurrentStep('2FN')}
        />
      )}

      {currentStep === '2FN' && (
        <Step2FNView
          onPrev={() => setCurrentStep('1FN')}
          onNext={() => setCurrentStep('3FN')}
        />
      )}

      {currentStep === '3FN' && (
        <Step3FNView
          onPrev={() => setCurrentStep('2FN')}
          onNext={onGoToDeps}
        />
      )}
    </div>
  )
}
