import type { AiTool, BeginnerGuide, GemaLevelInfo } from './types'

export const gemaLevels: GemaLevelInfo[] = [
  {
    id: 'seed', emoji: '🌱', label: 'Semilla', shortLabel: 'Semilla',
    description: 'Tu primer contacto con la IA como copiloto. Sin jerga, con analogías y preguntas simples.',
    color: 'lime',
  },
  {
    id: 'sprout', emoji: '🌿', label: 'Brote', shortLabel: 'Brote',
    description: 'Ya conoces entidades y atributos. Ahora agregas reglas, cardinalidad y un diagrama Mermaid.',
    color: 'amber',
  },
  {
    id: 'root', emoji: '🌳', label: 'Raíz', shortLabel: 'Raíz',
    description: 'Nivel profesional completo. DDL SQL, normalización 3FN, políticas de integridad y auditoría.',
    color: 'violet',
  },
]

export const beginnerGuide: BeginnerGuide = {
  title: '¿Qué es una Gema?',
  whatIs: 'Una Gema es una instrucción detallada que le das a una IA para que te ayude de una forma específica. En vez de escribir todo desde cero cada vez, copias la Gema, la pegas en tu IA favorita y ella ya sabe exactamente cómo ayudarte.',
  analogy: 'Imagina que contratas a un asistente nuevo. Si solo le dices "ayúdame", no sabe por dónde empezar. Pero si le entregas un manual con instrucciones claras —qué preguntar, cómo organizar y qué errores evitar— te va a ayudar mucho mejor. La Gema es ese manual.',
  whatItDoes: [
    'Te guía para analizar un problema paso a paso',
    'Te ayuda a identificar qué información necesita guardar un sistema',
    'Te hace preguntas cuando algo no está claro',
    'Genera diagramas y código que puedes usar directamente',
  ],
  whatItDoesNot: [
    'No piensa por ti: tú decides si la respuesta es correcta',
    'No inventa reglas del negocio: solo trabaja con lo que tú le das',
    'No reemplaza hablar con el cliente o el instructor',
    'No garantiza que el resultado sea perfecto sin revisión',
  ],
  howToStart: [
    { icon: '📋', title: 'Elige tu nivel', detail: 'Empieza con Semilla si es tu primera vez. Sube a Brote cuando te sientas cómodo.' },
    { icon: '📝', title: 'Copia la instrucción', detail: 'Usa el botón "Copiar" para llevar la Gema a tu portapapeles.' },
    { icon: '🤖', title: 'Abre tu IA favorita', detail: 'Funciona con Gemini, ChatGPT, Claude o cualquier IA de conversación.' },
    { icon: '📌', title: 'Pega y escribe tu caso', detail: 'Primero pega la Gema, luego escribe la descripción de tu sistema debajo.' },
    { icon: '✅', title: 'Revisa y registra', detail: 'Lee la respuesta, marca lo que aceptas y lo que necesitas verificar.' },
  ],
  worksWithAny: 'Las Gemas funcionan con cualquier IA de conversación: Gemini, ChatGPT, Claude, Copilot y más. No estás atado a una herramienta.',
}

export const aiTools: AiTool[] = [
  {
    name: 'Gemini Gems', company: 'Google', category: 'Gema / mentor configurable',
    bestFor: 'Crear un mentor persistente con instrucciones y archivos de contexto.',
    strength: 'Permite guardar una identidad, tarea, contexto y formato; puede usar archivos de conocimiento.',
    watch: 'La Gema puede sonar segura aunque falte una regla del negocio: obliga a pedir supuestos y fuentes.',
    url: 'https://support.google.com/gemini/answer/15235603?hl=es',
  },
  {
    name: 'GPT personalizado', company: 'OpenAI', category: 'Asistente / flujo repetible',
    bestFor: 'Diseñar un asistente con instrucciones, archivos, capacidades y starters de conversación.',
    strength: 'Separa comportamiento de conocimiento y permite probar el resultado en la vista previa antes de compartirlo.',
    watch: 'La disponibilidad para crear o compartir depende del plan y del espacio de trabajo.',
    url: 'https://help.openai.com/en/articles/8554397-creating-a-gpt/',
  },
  {
    name: 'Claude Projects', company: 'Anthropic', category: 'Proyecto / base de contexto',
    bestFor: 'Mantener requisitos, glosario, decisiones y conversaciones de un proyecto en un mismo espacio.',
    strength: 'Las instrucciones y archivos del proyecto sirven como contexto persistente para sus chats.',
    watch: 'Es útil como revisor, pero no convierte automáticamente una hipótesis en una regla validada.',
    url: 'https://support.anthropic.com/en/articles/9517075-what-are-projects',
  },
  {
    name: 'Mermaid', company: 'Código abierto', category: 'Diagrama como código',
    bestFor: 'Versionar un ERD en Git, documentación Markdown y revisión por cambios.',
    strength: 'El texto es portable, auditable y soporta erDiagram, atributos, PK, FK y operadores de cardinalidad.',
    watch: 'No reemplaza una herramienta de modelado físico ni detecta por sí sola reglas de negocio ausentes.',
    url: 'https://mermaid.js.org/syntax/entityRelationshipDiagram.html',
  },
  {
    name: 'dbdiagram + DBML', company: 'Holistics', category: 'Editor ERD / DSL',
    bestFor: 'Pasar rápidamente de DBML a un diagrama editable y generar SQL para explorar alternativas.',
    strength: 'DBML es legible, abierto y permite relaciones, índices, enums y notas.',
    watch: 'Úsalo después del modelo conceptual: si empiezas con tablas, puedes esconder decisiones de dominio.',
    url: 'https://docs.dbdiagram.io/',
  },
  {
    name: 'Eraser', company: 'Eraser', category: 'Diagrama técnico con IA',
    bestFor: 'Generar y refinar ERD editables desde lenguaje natural, archivos, esquemas o repositorios.',
    strength: 'Combina instrucciones, editor visual, diagramas como código e integraciones con agentes/MCP.',
    watch: 'Confirma qué archivos compartes y revisa el resultado: la generación sigue siendo asistida, no normativa.',
    url: 'https://docs.eraser.io/what-is-eraser',
  },
  {
    name: 'DrawSQL', company: 'DrawSQL', category: 'Editor / SQL a ERD',
    bestFor: 'Convertir DDL o una propuesta de IA en un diagrama compartible y editable.',
    strength: 'Ofrece un flujo explícito de AI-to-ERD y exportaciones para continuar la revisión.',
    watch: 'La importación desde SQL dibuja lo que ya existe; no valida si el modelo expresa bien el negocio.',
    url: 'https://drawsql.app/your-ai-to-erd',
  },
]

export const aiWorkflow = [
  { step: '01', title: 'Descubrir antes de dibujar', detail: 'Pide a la IA que extraiga hechos, actores, eventos, reglas y preguntas abiertas; todavía no tablas.' },
  { step: '02', title: 'Conversar con el dominio', detail: 'Valida las frases "uno con cuántos" en ambas direcciones y registra mínimos, máximos y obligatoriedad.' },
  { step: '03', title: 'Construir el conceptual', detail: 'Nombra entidades en singular, separa atributos multivalorados y conserva el lenguaje del negocio.' },
  { step: '04', title: 'Derivar el relacional', detail: 'Migra FK en 1:N, crea puente en N:M y decide el lado dependiente en 1:1 con una justificación.' },
  { step: '05', title: 'Renderizar como código', detail: 'Genera Mermaid o DBML, guárdalo en Git y compara cambios; el lienzo visual es una vista, no la fuente de verdad.' },
  { step: '06', title: 'Probar y endurecer', detail: 'Simula alta, cambio y borrado; revisa PK, FK, NN, UQ, índices, privacidad, transacciones y políticas de borrado.' },
  { step: '07', title: 'Revisión humana', detail: 'Entrega supuestos, decisiones y preguntas sin resolver para que el negocio o instructor apruebe el modelo.' },
]
