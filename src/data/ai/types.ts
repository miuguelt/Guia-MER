export interface AiTool {
  name: string
  company: string
  category: string
  bestFor: string
  strength: string
  watch: string
  url: string
}

export interface AiLogDraft {
  prompt: string
  context: string
  assumptions: string
  corrections: string
  tests: string
}

export type GemaLevel = 'seed' | 'sprout' | 'root'

export interface GemaLevelInfo {
  id: GemaLevel
  emoji: string
  label: string
  shortLabel: string
  description: string
  color: string
}

export interface BeginnerGuideStep {
  icon: string
  title: string
  detail: string
}

export interface BeginnerGuide {
  title: string
  whatIs: string
  analogy: string
  whatItDoes: string[]
  whatItDoesNot: string[]
  howToStart: BeginnerGuideStep[]
  worksWithAny: string
}

export interface UsageStep {
  step: number
  action: string
  detail: string
}

export interface ExampleMessage {
  role: 'user' | 'ai'
  text: string
  annotation?: string
}

export interface AiPromptTool {
  id: string
  title: string
  subtitle: string
  category: string
  bestWhen: string
  fileName: string
  prompt: string
  level: GemaLevel
  familyId: string
  usageSteps: UsageStep[]
  exampleConversation: ExampleMessage[]
}

export interface ProjectExample {
  label: string
  text: string
  diagramCode: string
  sqlCode: string
  requirement: { entity: string; relation: string; test: string }
}
