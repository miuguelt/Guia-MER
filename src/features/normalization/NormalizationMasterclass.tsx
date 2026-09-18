import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { downloadText } from '../../lib/exports'
import { buildNormalizationPocketManualMarkdown } from './normalizationPocketManual'
import NormalizationChallenge from './NormalizationChallenge'
import type {
  CodeFlavor,
  InvoiceHotspot,
  MainTab,
  NormalizationMasterclassProps,
  NormalFormStep,
} from './masterclass/masterclassTypes'
import { functionalDependencies, mermaidModel } from './masterclass/masterclassData'
import { codeSnippets } from './masterclass/masterclassSnippets'
import { quizItems } from './masterclass/masterclassQuiz'
import MasterclassNavigation from './masterclass/MasterclassNavigation'
import InvoiceSourceTab from './masterclass/tabs/InvoiceSourceTab'
import NormalFormsStepsTab from './masterclass/tabs/NormalFormsStepsTab'
import FunctionalDependenciesTab from './masterclass/tabs/FunctionalDependenciesTab'
import HistoricalPriceTab from './masterclass/tabs/HistoricalPriceTab'
import ErdDiagramTab from './masterclass/tabs/ErdDiagramTab'
import CodeSnippetsTab from './masterclass/tabs/CodeSnippetsTab'
import CertificationQuizTab from './masterclass/tabs/CertificationQuizTab'

export default function NormalizationMasterclass({
  onRecordAttempt,
  onCompleteMasterclass,
}: NormalizationMasterclassProps = {}) {
  const [activeTab, setActiveTab] = useState<MainTab>('doc')
  const [currentStep, setCurrentStep] = useState<NormalFormStep>('0FN')
  const [hotspot, setHotspot] = useState<InvoiceHotspot>('all')
  const [codeFlavor, setCodeFlavor] = useState<CodeFlavor>('sql')
  const [copied, setCopied] = useState('')

  // Atributo seleccionado en el Inspector de Dependencias
  const [selectedAttr, setSelectedAttr] = useState<string>('nombre_producto')

  // Estado del simulador de anomalías en 0FN
  const [anomalyTriggered, setAnomalyTriggered] = useState<'none' | 'insert' | 'update' | 'delete'>('none')

  // Estado del simulador de precio histórico
  const [catalogPrice, setCatalogPrice] = useState<number>(320000)

  // Seguimiento de progreso del aprendiz
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set(['doc']))

  // Estado del Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({})

  const selectTab = (tab: MainTab) => {
    setActiveTab(tab)
    setVisitedTabs((prev) => new Set([...prev, tab]))
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    window.setTimeout(() => setCopied(''), 2200)
  }

  const handleSelectQuizOption = (questionId: number, optionIdx: number) => {
    const nextAnswers = { ...quizAnswers, [questionId]: optionIdx }
    setQuizAnswers(nextAnswers)
    setQuizSubmitted((prev) => ({ ...prev, [questionId]: true }))

    const answeredCount = Object.keys(nextAnswers).length
    if (answeredCount === quizItems.length) {
      const score = quizItems.filter((q) => nextAnswers[q.id] === q.correct).length / quizItems.length
      const isMaster = score >= 0.8
      onRecordAttempt?.({
        module: 'm7',
        skillId: 'mer.m7',
        score,
        status: isMaster ? 'mastered' : 'practiced',
        errors: quizItems
          .filter((q) => nextAnswers[q.id] !== q.correct)
          .map((q) => `Pregunta ${q.id}: ${q.question.slice(0, 45)}...`),
      })
      if (isMaster) {
        onCompleteMasterclass?.()
      }
    }
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted({})
  }

  const handleDownloadManual = () => {
    downloadText(
      'manual-de-bolsillo-normalizacion-1fn-3fn.md',
      buildNormalizationPocketManualMarkdown(),
      'text/markdown'
    )
  }

  const correctAnswersCount = quizItems.filter((q) => quizAnswers[q.id] === q.correct).length

  return (
    <section className="normalization-masterclass panel-card" style={{ overflow: 'hidden' }}>
      <MasterclassNavigation
        activeTab={activeTab}
        selectTab={selectTab}
        visitedTabs={visitedTabs}
        correctAnswersCount={correctAnswersCount}
        quizItemsCount={quizItems.length}
        onDownloadManual={handleDownloadManual}
      />

      {/* CONTENIDO SEGÚN LA PESTAÑA ACTIVA */}
      {activeTab === 'doc' && (
        <InvoiceSourceTab
          hotspot={hotspot}
          setHotspot={setHotspot}
          onGoToSteps={() => {
            selectTab('steps')
            setCurrentStep('0FN')
          }}
        />
      )}

      {activeTab === 'steps' && (
        <NormalFormsStepsTab
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          anomalyTriggered={anomalyTriggered}
          setAnomalyTriggered={setAnomalyTriggered}
          onGoToDeps={() => selectTab('deps')}
        />
      )}

      {activeTab === 'deps' && (
        <FunctionalDependenciesTab
          selectedAttr={selectedAttr}
          setSelectedAttr={setSelectedAttr}
          functionalDependencies={functionalDependencies}
          onNext={() => selectTab('price')}
        />
      )}

      {activeTab === 'price' && (
        <HistoricalPriceTab
          catalogPrice={catalogPrice}
          setCatalogPrice={setCatalogPrice}
          onNext={() => selectTab('challenge')}
        />
      )}

      {activeTab === 'challenge' && (
        <div className="nm-tab-pane">
          <NormalizationChallenge />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="primary-button" onClick={() => selectTab('erd')} style={{ fontSize: '11px' }}>
              Continuar al Diagrama Entidad-Relación (DER en Vivo) <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'erd' && (
        <ErdDiagramTab
          mermaidModel={mermaidModel}
          copied={copied}
          onCopy={copyToClipboard}
          onNext={() => selectTab('code')}
        />
      )}

      {activeTab === 'code' && (
        <CodeSnippetsTab
          codeFlavor={codeFlavor}
          setCodeFlavor={setCodeFlavor}
          codeSnippets={codeSnippets}
          copied={copied}
          onCopy={copyToClipboard}
          onDownloadManual={handleDownloadManual}
          onNext={() => selectTab('quiz')}
        />
      )}

      {activeTab === 'quiz' && (
        <CertificationQuizTab
          quizItems={quizItems}
          quizAnswers={quizAnswers}
          quizSubmitted={quizSubmitted}
          correctAnswersCount={correctAnswersCount}
          onSelectQuizOption={handleSelectQuizOption}
          onResetQuiz={resetQuiz}
          onDownloadManual={handleDownloadManual}
        />
      )}
    </section>
  )
}
