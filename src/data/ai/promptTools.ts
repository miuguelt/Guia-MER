import type { AiPromptTool } from './types'
import {
  architectSeedPrompt,
  architectSproutPrompt,
  architectRootPrompt,
  deconstructorSeedPrompt,
  deconstructorSproutPrompt,
  deconstructorRootPrompt,
  auditorSeedPrompt,
  auditorSproutPrompt,
  auditorRootPrompt,
  ddlSeedPrompt,
  ddlSproutPrompt,
  ddlRootPrompt,
} from './prompts'

export const aiPromptTools: AiPromptTool[] = [
  // ── Familia 1: Modelo completo ──
  {
    id: 'architect-seed', familyId: 'architect', level: 'seed',
    title: 'Mi Primer Modelo (Mentor Interactivo)',
    subtitle: 'Aprende a pensar y construir el MER paso a paso escribiendo «inicia»',
    category: 'Tu primer paso guiado', bestWhen: 'Cuando estés empezando y necesites un mentor que te guíe con paciencia desde el comando «inicia» hasta obtener tu MER final.',
    fileName: 'gema-mi-primer-modelo.md', prompt: architectSeedPrompt,
    usageSteps: [
      { step: 1, action: 'Copia la instrucción', detail: 'Usa el botón "Copiar instrucción" para llevar la Gema al portapapeles.' },
      { step: 2, action: 'Pega y escribe «inicia»', detail: 'Abre Gemini, ChatGPT o Claude. Pega la Gema y envía la palabra «inicia».' },
      { step: 3, action: 'Conoce tu entregable', detail: 'La Gema te explicará qué van a construir juntos y te mostrará el caso ancla de Facturación.' },
      { step: 4, action: 'Responde cada hito', detail: 'Sigue el diálogo reflexivo: entidades, atributos, claves primarias y conexiones.' },
      { step: 5, action: 'Recibe tu MER final', detail: 'Obtén tu catálogo de entidades, diagrama Mermaid y pautas de estabilidad y escalabilidad.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'inicia' },
      { role: 'ai', text: '¡Hola! Qué alegría acompañarte en este paso. Como tu mentor interactivo, te guiaré para que aprendas a pensar y construir el Modelo Entidad-Relación (MER) completo de tu sistema.\n\n🎯 Al terminar tendrás en tus manos:\n1. Diccionario de Entidades y Atributos con Claves Primarias (PK)\n2. Matriz de Cardinalidad bidireccional explicada paso a paso\n3. Diagrama visual Mermaid (erDiagram) compilable\n4. Fundamentos de estabilidad y escalabilidad (crecimiento vertical y horizontal)\n\n💡 Caso Ancla: Piensa en CLIENTE que compra PRODUCTOS generando una FACTURA con su DETALLE_FACTURA (asociativa con precio histórico congelado). Ese mismo rigor aplicaremos a tu idea.\n\n👉 Para comenzar con el Hito 1: Cuéntame con tus propias palabras, ¿de qué se trata el sistema o negocio que deseas construir?', annotation: '🚀 Activación inmediata con bienvenida, contrato de entrega final, caso ancla y pregunta orientadora' },
      { role: 'user', text: 'Quiero un sistema para una tienda de mascotas donde se registren clientes, las mascotas que se venden y las ventas diarias.' },
      { role: 'ai', text: '¡Excelente proyecto! Vamos con el Hito 1 (Identificación de Entidades y Límites):\n\nAnalizando tu idea, encontramos 3 conceptos centrales con identidad propia:\n- **CLIENTE:** La persona que compra (entidad maestra con cédula, nombre y teléfono).\n- **MASCOTA:** El animal que se ofrece (entidad maestra con especie, raza, edad y precio).\n- **VENTA:** El evento transaccional donde ocurre la compra en una fecha determinada.\n\n❓ Pregunta clave para avanzar: En una misma venta, ¿un cliente puede llevarse varias mascotas a la vez o cada ticket es por una sola mascota? Esto definirá la relación entre VENTA y MASCOTA.', annotation: '✅ Extrae entidades maestras vs transacciones y formula la pregunta reflexiva para descubrir cardinalidad' },
    ],
  },
  {
    id: 'architect-sprout', familyId: 'architect', level: 'sprout',
    title: 'Modelo con Reglas (Copiloto Estructurado)',
    subtitle: 'Agrega cardinalidad (min, max), tipos de datos y diagrama Mermaid',
    category: 'Con más estructura', bestWhen: 'Cuando ya identificas entidades pero necesitas definir reglas de negocio, tipos de datos y cardinalidades formales.',
    fileName: 'gema-modelo-con-reglas.md', prompt: architectSproutPrompt,
    usageSteps: [
      { step: 1, action: 'Copia la instrucción', detail: 'Lleva la Gema Brote a tu portapapeles con un solo clic.' },
      { step: 2, action: 'Pega y escribe «inicia»', detail: 'Abre tu IA favorita, pega la instrucción y envía «inicia».' },
      { step: 3, action: 'Define las reglas', detail: 'Describe tu caso y responde a las preguntas de cardinalidad (min, max).' },
      { step: 4, action: 'Revisa la tabla asociativa', detail: 'Aprende por qué las relaciones N:M requieren una tabla intermedia.' },
      { step: 5, action: 'Copia el Mermaid', detail: 'Visualiza tu diagrama compilable y revisa las políticas de integridad.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'inicia' },
      { role: 'ai', text: '¡Bienvenido! Estructuraremos el Modelo Entidad-Relación de tu proyecto con reglas de negocio, tipos de datos y cardinalidades (min, max).\n\n🎯 Entregable Final: Esquema relacional tipado, Matriz de cardinalidad formal, Diagrama Mermaid compilable, Políticas ON DELETE y análisis de escalabilidad.\n\n💡 Referente de diseño: CLIENTE ↔ PRODUCTO ↔ FACTURA ↔ DETALLE_FACTURA con ON DELETE RESTRICT.\n\n👉 Para comenzar: Describe el sistema o módulo que deseas modelar, sus actores y transacciones principales.', annotation: '🚀 Activación interactiva con contrato de entrega técnica' },
      { role: 'user', text: 'Una biblioteca escolar donde los aprendices piden prestados libros. Un préstamo puede tener varios libros.' },
      { role: 'ai', text: '## Análisis de Entidades y Cardinalidad\n- **APRENDIZ** (PK: id_aprendiz BIGSERIAL, documento VARCHAR UQ, nombre VARCHAR NN)\n- **LIBRO** (PK: id_libro BIGSERIAL, isbn VARCHAR UQ, titulo VARCHAR NN)\n- **PRESTAMO** (PK: id_prestamo BIGSERIAL, FK id_aprendiz, fecha_salida DATE)\n- **DETALLE_PRESTAMO** (Tabla asociativa N:M entre PRESTAMO y LIBRO)\n\n## Cardinalidad bidireccional\n| Par | A → B | B → A | Tipo | Resolución |\n|---|---|---|---|---|\n| APRENDIZ → PRESTAMO | (0, N) | (1, 1) | 1:N | FK id_aprendiz en PRESTAMO |\n| PRESTAMO ↔ LIBRO | (1, N) | (0, N) | N:M | Tabla DETALLE_PRESTAMO (id_prestamo, id_libro) |\n\n🔒 Política: ON DELETE RESTRICT en APRENDIZ y LIBRO para proteger el historial de préstamos.', annotation: '📊 Resuelve N:M con tabla asociativa y aplica política referencial' },
    ],
  },
  {
    id: 'master-architect', familyId: 'architect', level: 'root',
    title: 'Arquitecto MER & Relacional Completo',
    subtitle: 'De la narrativa del negocio a Mermaid, DDL PostgreSQL 3FN y Escalabilidad',
    category: 'Gema Maestra de Ingeniería', bestWhen: 'Para diseñar la arquitectura de datos completa de un sistema a partir de requisitos con rigor de producción.',
    fileName: 'gema-arquitecto-mer-relacional.md', prompt: architectRootPrompt,
    usageSteps: [
      { step: 1, action: 'Copia y ejecuta', detail: 'Pega la Gema en Gemini, ChatGPT o Claude. Escribe «inicia» para modo guiado o incluye tu requerimiento.' },
      { step: 2, action: 'Revisa las 5 fases', detail: 'Descomposición de dominio, matriz (min, max), Mermaid compilable, DDL PostgreSQL y escalabilidad.' },
      { step: 3, action: 'Valida supuestos', detail: 'Todo lo marcado como [POR VALIDAR] se discute con el negocio.' },
      { step: 4, action: 'Audita escalabilidad', detail: 'Analiza el impacto de índices B-Tree en FKs y particionamiento de tablas transaccionales.' },
      { step: 5, action: 'Registra la bitácora', detail: 'Documenta decisiones e historial en la bitácora técnica.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'inicia' },
      { role: 'ai', text: 'Sesión de Arquitectura de Datos iniciada. Modo interactivo guiado activo.\n\n🎯 Entregable Final de Ingeniería:\n1. Descomposición y límites de dominio con supuestos [POR VALIDAR]\n2. Matriz de cardinalidad bidireccional con notación formal (min, max)\n3. Diagrama conceptual / relacional Mermaid compilable\n4. Script DDL PostgreSQL en 3FN con PKs técnicas, FKs, UQ, CHECK e índices B-Tree\n5. Dictamen de Estabilidad y Estrategia de Escalabilidad (Vertical y Horizontal)\n\n💡 Caso Canónico: CLIENTE ↔ PRODUCTO ↔ FACTURA ↔ DETALLE_FACTURA.\n\n👉 Fase 1: Describe el alcance del software, los actores y las transacciones críticas que deben persistir.', annotation: '🏛️ Protocolo interactivo senior con rigor técnico y entregable integral' },
    ],
  },

  // ── Familia 2: Entender el problema ──
  {
    id: 'deconstructor-seed', familyId: 'deconstructor', level: 'seed',
    title: 'Entender el Problema',
    subtitle: 'Descubre qué necesita guardar tu sistema antes de diseñar',
    category: 'Tu primer paso', bestWhen: 'Cuando recibes un enunciado y no sabes por dónde empezar.',
    fileName: 'herramienta-entender-problema.md', prompt: deconstructorSeedPrompt,
    usageSteps: [
      { step: 1, action: 'Copia la descripción', detail: 'Toma el enunciado tal como te lo dieron.' },
      { step: 2, action: 'Pega con la Gema', detail: 'Instrucción primero, luego el enunciado.' },
      { step: 3, action: 'Revisa quiénes participan', detail: 'Verifica que no falte ningún actor.' },
      { step: 4, action: 'Anota las preguntas', detail: 'Son tarea para ti: investígalas antes de modelar.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Un gimnasio necesita controlar los pagos de sus miembros y los horarios de clases.' },
      { role: 'ai', text: '## Resumen: Software para gestionar membresías, pagos y clases de un gimnasio.\n\n## Quiénes: Miembros, Instructores, Administrador\n## Cosas: MIEMBRO, INSTRUCTOR, CLASE, PAGO, HORARIO\n## Preguntas:\n1. ❓ ¿Un miembro puede inscribirse en varias clases?\n2. ❓ ¿Los pagos son mensuales o por clase?', annotation: 'Organizó todo sin jerga técnica' },
    ],
  },
  {
    id: 'deconstructor-sprout', familyId: 'deconstructor', level: 'sprout',
    title: 'Análisis de Dominio',
    subtitle: 'Límites, eventos, actores y ciclo de vida del sistema',
    category: 'Con más estructura', bestWhen: 'Cuando ya entiendes el problema pero necesitas un análisis más formal.',
    fileName: 'herramienta-analisis-dominio.md', prompt: deconstructorSproutPrompt,
    usageSteps: [
      { step: 1, action: 'Escribe el contexto', detail: 'Requisito + reglas de negocio conocidas.' },
      { step: 2, action: 'Ejecuta la Gema', detail: 'Pega instrucción + contexto en la IA.' },
      { step: 3, action: 'Revisa el ciclo de vida', detail: 'Verifica estados y transiciones.' },
      { step: 4, action: 'Investiga las preguntas', detail: 'Los casos límite esconden los errores.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Un hospital necesita gestionar citas médicas e historiales de pacientes.' },
      { role: 'ai', text: '## Límites\n**Dentro:** Citas, historial médico, asignación de consultorios\n**Fuera:** Facturación, farmacia\n\n## Ciclo de vida de CITA:\nAGENDADA → CONFIRMADA → EN CURSO → FINALIZADA / CANCELADA\n\n## Preguntas:\n1. ¿Un médico puede tener citas en paralelo?\n2. ¿Se puede cancelar hasta cuántas horas antes?', annotation: 'Separa dentro/fuera y modela estados' },
    ],
  },
  {
    id: 'domain-deconstructor', familyId: 'deconstructor', level: 'root',
    title: 'Deconstructor de Dominio Completo',
    subtitle: 'Descubrimiento exhaustivo de límites, eventos, actores y ciclo de vida',
    category: 'Herramienta de Diagnóstico', bestWhen: 'Para requerimientos difusos o narrativas complejas antes de modelar.',
    fileName: 'herramienta-deconstructor-dominio.md', prompt: deconstructorRootPrompt,
    usageSteps: [
      { step: 1, action: 'Reúne toda la documentación', detail: 'Historias de usuario, entrevistas, diagramas.' },
      { step: 2, action: 'Ejecuta con contexto rico', detail: 'Cuanto más información, más preciso el análisis.' },
      { step: 3, action: 'Valida límites y estados', detail: 'Confirma fronteras y ciclos de vida.' },
      { step: 4, action: 'Lleva preguntas al negocio', detail: 'Las preguntas críticas deben resolverse antes de modelar.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Un sistema de trazabilidad agropecuaria para controlar ganado y potreros...' },
      { role: 'ai', text: '### Límites\n**Dentro:** Registro de animales, movimientos, pesajes\n**Fuera:** Certificación ICA, comercialización\n\n### Eventos\n- Ingreso de animal → registra identificación, raza, fecha\n- Movimiento → traslada animal entre potreros\n\n### [POR VALIDAR]\n1. ¿Un animal puede estar en dos potreros simultáneamente?', annotation: 'Nivel profesional: separación operativa precisa' },
    ],
  },

  // ── Familia 3: Conexiones ──
  {
    id: 'auditor-seed', familyId: 'auditor', level: 'seed',
    title: '¿Cómo se Conectan?',
    subtitle: 'Descubre las relaciones con preguntas simples en ambas direcciones',
    category: 'Tu primer paso', bestWhen: 'Cuando tienes las entidades pero no sabes cómo se relacionan.',
    fileName: 'herramienta-como-se-conectan.md', prompt: auditorSeedPrompt,
    usageSteps: [
      { step: 1, action: 'Lista tus entidades', detail: 'Las cosas que identificaste.' },
      { step: 2, action: 'Pide el análisis', detail: 'La IA hará las preguntas en ambas direcciones.' },
      { step: 3, action: 'Entiende las conexiones', detail: 'Padre-hijo, lista intermedia o uno-a-uno.' },
      { step: 4, action: 'Valida con tu caso', detail: '¿Las respuestas tienen sentido en tu negocio?' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Tengo: PROFESOR, MATERIA, ESTUDIANTE. ¿Cómo se conectan?' },
      { role: 'ai', text: '## PROFESOR ↔ MATERIA\n- ¿Un profesor da cuántas materias? → Varias ✓\n- ¿Una materia es dada por cuántos profesores? → Varios ✓\n- **Resultado:** Necesitan lista intermedia (ej. ASIGNACION)\n\n## ESTUDIANTE ↔ MATERIA\n- ¿Un estudiante cursa cuántas materias? → Varias ✓\n- ¿Una materia tiene cuántos estudiantes? → Varios ✓\n- **Resultado:** Necesitan lista intermedia (ej. INSCRIPCION)', annotation: 'Detectó dos relaciones N:M sin jerga' },
    ],
  },
  {
    id: 'auditor-sprout', familyId: 'auditor', level: 'sprout',
    title: 'Auditor de Relaciones',
    subtitle: 'Cardinalidad bidireccional con (min, max) y tablas puente',
    category: 'Con más estructura', bestWhen: 'Cuando necesitas analizar formalmente con cardinalidad y políticas de borrado.',
    fileName: 'herramienta-auditor-relaciones.md', prompt: auditorSproutPrompt,
    usageSteps: [
      { step: 1, action: 'Lista entidades y relaciones', detail: 'Presenta las entidades y conexiones identificadas.' },
      { step: 2, action: 'Ejecuta la Gema', detail: 'Analizará cada par con (min, max).' },
      { step: 3, action: 'Revisa tablas puente', detail: 'Verifica que las N:M tengan los atributos correctos.' },
      { step: 4, action: 'Decide políticas', detail: 'RESTRICT o CASCADE — elige y justifica.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Analiza: ORDEN con MECANICO, y ORDEN con REPUESTO.' },
      { role: 'ai', text: '## ORDEN ↔ MECANICO\n- ORDEN → MECANICO: (1, N)\n- MECANICO → ORDEN: (0, N)\n- **N:M** → Tabla: ASIGNACION_MECANICO (horas, rol)\n- ON DELETE RESTRICT\n\n## ORDEN ↔ REPUESTO\n- ORDEN → REPUESTO: (0, N)\n- REPUESTO → ORDEN: (0, N)\n- **N:M** → Tabla: DETALLE_REPUESTO (cantidad, precio_aplicado)\n- ON DELETE RESTRICT', annotation: '(min, max) + atributos del vínculo' },
    ],
  },
  {
    id: 'cardinality-auditor', familyId: 'auditor', level: 'root',
    title: 'Auditor de Cardinalidades Completo',
    subtitle: 'Despeje exhaustivo de vínculos, dimensión temporal e integridad',
    category: 'Herramienta de Topología', bestWhen: 'Cuando existan dudas sobre 1:1, 1:N, N:M o si un vínculo cambia en el tiempo.',
    fileName: 'herramienta-auditor-cardinalidades.md', prompt: auditorRootPrompt,
    usageSteps: [
      { step: 1, action: 'Prepara pares de entidades', detail: 'Lista todas las relaciones a analizar.' },
      { step: 2, action: 'Incluye reglas temporales', detail: 'Indica si alguna relación cambia con el tiempo.' },
      { step: 3, action: 'Ejecuta el análisis', detail: 'Análisis con rigor de producción.' },
      { step: 4, action: 'Valida casos límite', detail: 'Los bordes del modelo esconden los errores.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Analiza EMPLEADO con DEPARTAMENTO considerando cambios en el tiempo.' },
      { role: 'ai', text: '### Análisis bidireccional\n- EMPLEADO → DEPTO: (1,1) actual pero (1,N) histórico\n- DEPTO → EMPLEADO: (0,N)\n\n### Dimensión temporal\nLa relación actual es 1:N pero la histórica es N:M.\n→ Tabla HISTORIAL_DEPTO (id_empleado FK, id_depto FK, fecha_inicio, fecha_fin)\n\n### Política: ON DELETE RESTRICT', annotation: 'Detecta dimensión temporal automáticamente' },
    ],
  },

  // ── Familia 4: SQL ──
  {
    id: 'ddl-seed', familyId: 'ddl', level: 'seed',
    title: 'Mi Primer SQL',
    subtitle: 'Convierte tu modelo en tablas que un computador entiende',
    category: 'Tu primer paso', bestWhen: 'Cuando tienes tu modelo y quieres crear las tablas por primera vez. No necesitas saber SQL.',
    fileName: 'herramienta-mi-primer-sql.md', prompt: ddlSeedPrompt,
    usageSteps: [
      { step: 1, action: 'Prepara tu modelo', detail: 'Necesitas la lista de entidades, datos y conexiones.' },
      { step: 2, action: 'Pide el SQL', detail: 'La IA generará tablas con comentarios explicando cada línea.' },
      { step: 3, action: 'Lee los comentarios', detail: 'Cada línea tiene explicación. Asegúrate de entender.' },
      { step: 4, action: 'Prueba el INSERT', detail: 'Copia el ejemplo y verifica que funcione.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Tengo: CLIENTE (nombre, teléfono) y PEDIDO (fecha, total). Un cliente hace muchos pedidos.' },
      { role: 'ai', text: '```sql\n-- Tabla para guardar los clientes\nCREATE TABLE cliente (\n  id_cliente BIGSERIAL PRIMARY KEY,\n  nombre VARCHAR(120) NOT NULL,       -- obligatorio, máx 120 caracteres\n  telefono VARCHAR(25)                -- opcional\n);\n\n-- Tabla para guardar los pedidos\nCREATE TABLE pedido (\n  id_pedido BIGSERIAL PRIMARY KEY,\n  id_cliente BIGINT NOT NULL           -- referencia al cliente\n    REFERENCES cliente(id_cliente),    -- conexión con la tabla padre\n  fecha DATE NOT NULL,\n  total NUMERIC(10,2) NOT NULL\n);\n```', annotation: 'SQL con comentarios línea por línea' },
    ],
  },
  {
    id: 'ddl-sprout', familyId: 'ddl', level: 'sprout',
    title: 'SQL con Restricciones',
    subtitle: 'Tablas robustas con CHECK, UNIQUE, FK y políticas de borrado',
    category: 'Con más estructura', bestWhen: 'Cuando necesitas tablas SQL que protejan datos con restricciones de integridad.',
    fileName: 'herramienta-sql-restricciones.md', prompt: ddlSproutPrompt,
    usageSteps: [
      { step: 1, action: 'Prepara el modelo con reglas', detail: 'Incluye tipos, restricciones y políticas.' },
      { step: 2, action: 'Genera el DDL', detail: 'Tablas con NOT NULL, UNIQUE, CHECK, FK y ON DELETE.' },
      { step: 3, action: 'Prueba las restricciones', detail: 'La IA incluye INSERTs que deben fallar.' },
      { step: 4, action: 'Revisa los índices', detail: 'Cada FK necesita un índice.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Crea tablas para una tienda. Precios no negativos, estados: PENDIENTE, PAGADO, CANCELADO.' },
      { role: 'ai', text: '```sql\nCREATE TABLE producto (\n  id_producto BIGSERIAL PRIMARY KEY,\n  nombre VARCHAR(120) NOT NULL,\n  precio NUMERIC(12,2) NOT NULL CHECK (precio >= 0)\n);\n\nCREATE TABLE pedido (\n  id_pedido BIGSERIAL PRIMARY KEY,\n  estado VARCHAR(20) NOT NULL DEFAULT \'PENDIENTE\'\n    CHECK (estado IN (\'PENDIENTE\', \'PAGADO\', \'CANCELADO\'))\n);\n\n-- Prueba que FALLA:\nINSERT INTO producto (nombre, precio) VALUES (\'Test\', -5);\n```', annotation: 'Incluye pruebas de fallo para verificar restricciones' },
    ],
  },
  {
    id: 'ddl-integrity-engine', familyId: 'ddl', level: 'root',
    title: 'Motor DDL e Integridad Completo',
    subtitle: 'Esquemas PostgreSQL de alta fidelidad 3FN con pruebas',
    category: 'Herramienta de Producción', bestWhen: 'Para traducir el modelo lógico a scripts SQL listos para migración.',
    fileName: 'herramienta-motor-ddl-integridad.md', prompt: ddlRootPrompt,
    usageSteps: [
      { step: 1, action: 'Entrega el modelo normalizado', detail: 'Debe estar en 3FN con cardinalidades definidas.' },
      { step: 2, action: 'Especifica PostgreSQL', detail: 'Indica el motor y versión.' },
      { step: 3, action: 'Ejecuta el DDL', detail: 'Copia y ejecuta en psql o tu IDE.' },
      { step: 4, action: 'Ejecuta las pruebas', detail: 'Valida que el esquema sea correcto.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Genera el DDL del taller mecánico con todas las restricciones.' },
      { role: 'ai', text: '```sql\nCREATE TABLE cliente (\n  id_cliente UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  documento VARCHAR(20) NOT NULL UNIQUE,\n  nombre VARCHAR(150) NOT NULL\n);\n-- [tablas completas con índices y pruebas]\n\n-- Prueba exitosa:\nINSERT INTO cliente VALUES (gen_random_uuid(), \'1045123456\', \'Camila\');\n-- Prueba de fallo (FK inexistente):\nINSERT INTO orden_servicio (id_cliente, ...) VALUES (\'00000000-...\', ...);\n```', annotation: 'Nivel producción: UUID, pruebas de fallo' },
    ],
  },
]

export const gemPrompt = aiPromptTools.find((t) => t.id === 'master-architect')?.prompt ?? ''
