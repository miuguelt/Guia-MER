import type { AiTool, BeginnerGuide, GemaLevelInfo } from './types'

export const gemaLevels: GemaLevelInfo[] = [
  {
    id: 'seed', emoji: '🌱', label: 'Semilla', shortLabel: 'Semilla',
    description: 'Tu mentor interactivo paso a paso. Escribe «inicia» y la Gema te guía con preguntas reflexivas y sin jerga.',
    color: 'lime',
  },
  {
    id: 'sprout', emoji: '🌿', label: 'Brote', shortLabel: 'Brote',
    description: 'Estructuración con reglas. Cardinalidad bidireccional (min, max), tipos de datos y diagrama Mermaid.',
    color: 'amber',
  },
  {
    id: 'root', emoji: '🌳', label: 'Raíz', shortLabel: 'Raíz',
    description: 'Arquitecto Senior completo. DDL PostgreSQL 3FN, integridad física ON DELETE y escalabilidad.',
    color: 'violet',
  },
]

export const beginnerGuide: BeginnerGuide = {
  title: '¿Cómo te ayuda una Gema a pensar y construir el MER?',
  whatIs: 'Una Gema es un mentor interactivo de arquitectura de datos configurado con instrucciones pedagógicas. No es un oráculo que te arroja código de golpe; te enseña a razonar el sistema paso a paso, descubriendo entidades, relaciones y reglas antes de dibujar el diagrama.',
  analogy: 'Imagina que tienes a un Arquitecto Senior sentado a tu lado. En lugar de hacer la tarea por ti o darte un bloque incomprensible de SQL, te hace preguntas clave para que entiendas el negocio y te ayuda a convertir esa comprensión en una base de datos profesional y escalable.',
  triggerWord: 'inicia',
  triggerExplanation: 'Solo debes pegar la instrucción en tu IA favorita (Gemini, ChatGPT, Claude) y escribir la palabra «inicia». La Gema tomará el control pedagógico: te saludará, te dirá qué van a construir juntos y te hará la primera pregunta.',
  whatItDoes: [
    'Te guía paso a paso desde el comando «inicia» para que aprendas a pensar el modelo',
    'Te ayuda a diferenciar entidades reales con ciclo de vida de simples atributos',
    'Resuelve relaciones complejas (muchos a muchos) mediante tablas asociativas',
    'Genera el diagrama visual Mermaid y el script SQL DDL con integridad referencial',
    'Te explica cómo hacer tu sistema estable y preparado para escalar vertical y horizontalmente',
  ],
  whatItDoesNot: [
    'No te arroja un montón de código sin que entiendas las decisiones de diseño',
    'No asume reglas que el negocio no ha confirmado: marca todo con [POR VALIDAR]',
    'No guarda listas de datos en una sola celda (respeta la Primera Forma Normal)',
    'No reemplaza tu criterio: tú eres quien aprueba el modelo final',
  ],
  finalDeliverables: [
    'Diccionario formal de Entidades y Atributos con tipos de datos estándar',
    'Matriz de Cardinalidad bidireccional con notación (min, max)',
    'Diagrama visual Mermaid (erDiagram) compilable y listo para renderizar',
    'Script DDL SQL en PostgreSQL con restricciones (PK, FK, CHECK, ON DELETE RESTRICT)',
    'Estrategia de Estabilidad y Escalabilidad (crecimiento vertical y horizontal)',
  ],
  anchorExample: {
    title: 'El caso ancla canónico: Facturación (Cliente, Producto, Factura y Detalle)',
    description: 'Un Cliente compra Productos generando una Factura. Como un producto puede venderse en muchas facturas y una factura tiene muchos productos (N:M), creamos la entidad intermedia DETALLE_FACTURA.',
    entities: [
      'CLIENTE: Entidad independiente (quién realiza la compra)',
      'PRODUCTO: Catálogo maestro (qué se ofrece, con precio actual)',
      'FACTURA: Evento transaccional de cabecera (cuándo se compró y total)',
      'DETALLE_FACTURA: Entidad asociativa (unidades y precio histórico congelado al momento de venta)',
    ],
    resolution: 'Esta estructura resuelve la relación N:M, congela el valor histórico de la venta y protege la contabilidad con ON DELETE RESTRICT.',
  },
  scalability: [
    {
      type: 'vertical',
      title: 'Escalabilidad Vertical (Scale-Up)',
      description: 'Tipos de datos atómicos y precisos (NUMERIC para dinero, TIMESTAMPTZ) con índices B-Tree en cada clave foránea (FK). Permite que el servidor procese millones de registros por segundo sin saturar la memoria RAM.',
    },
    {
      type: 'horizontal',
      title: 'Escalabilidad Horizontal (Scale-Out)',
      description: 'Claves técnicas inmutables (UUID o BIGSERIAL) que permiten distribuir registros entre múltiples servidores o separar módulos (inventario, facturación, envíos) en microservicios independientes sin conflicto de identidades.',
    },
  ],
  howToStart: [
    { icon: '📋', title: '1. Elige tu nivel', detail: 'Empieza con 🌱 Semilla si estás aprendiendo. Pasa a 🌿 Brote o 🌳 Raíz para más rigor.' },
    { icon: '📝', title: '2. Copia la instrucción', detail: 'Usa el botón "Copiar instrucción" para llevar la Gema al portapapeles.' },
    { icon: '🤖', title: '3. Abre tu IA favorita', detail: 'Funciona en Gemini, ChatGPT, Claude o Copilot sin configuraciones adicionales.' },
    { icon: '💬', title: '4. Pega y escribe «inicia»', detail: 'Pega la instrucción y envía la palabra «inicia». La Gema arrancará la mentoría guiada.' },
    { icon: '🏆', title: '5. Construye tu MER final', detail: 'Responde a las preguntas de cada hito y recibe tu diagrama, DDL y análisis de escalabilidad.' },
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
  { step: '01', title: 'Activar con «inicia»', detail: 'Pega la instrucción en la IA y escribe «inicia». La Gema se presenta y declara el entregable final.' },
  { step: '02', title: 'Delimitar el negocio', detail: 'Describe tu idea. La Gema filtra entidades reales con ciclo de vida frente a simples atributos.' },
  { step: '03', title: 'Atributos y PK técnica', detail: 'Define tipos atómicos y asigna claves primarias técnicas (UUID o BIGSERIAL) para garantizar estabilidad.' },
  { step: '04', title: 'Cardinalidad bidireccional', detail: 'Formula las preguntas (min, max) en ambos sentidos y resuelve relaciones N:M con tablas asociativas.' },
  { step: '05', title: 'Integridad y escalabilidad', detail: 'Aplica ON DELETE RESTRICT, normalización 1FN-3FN y verifica cómo el modelo soporta crecimiento vertical y horizontal.' },
  { step: '06', title: 'Recibir el MER definitivo', detail: 'Copia el diccionario de datos, el diagrama compilable en Mermaid y el script SQL DDL ejecutable.' },
  { step: '07', title: 'Revisión humana y bitácora', detail: 'Valida con tu instructor o cliente las dudas marcadas con [POR VALIDAR] y registra tus decisiones.' },
]
