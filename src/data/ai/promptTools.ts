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
    title: 'Mi Primer Modelo',
    subtitle: 'Entiende un sistema y organiza la información sin jerga técnica',
    category: 'Tu primer paso', bestWhen: 'Cuando estés empezando y todo te parezca confuso. Esta herramienta te guía con lenguaje cotidiano.',
    fileName: 'gema-mi-primer-modelo.md', prompt: architectSeedPrompt,
    usageSteps: [
      { step: 1, action: 'Escribe tu caso', detail: 'Describe en tus palabras qué debe hacer el sistema. No te preocupes por la forma.' },
      { step: 2, action: 'Copia la Gema', detail: 'Usa el botón "Copiar instrucción" para copiar al portapapeles.' },
      { step: 3, action: 'Pega en tu IA', detail: 'Abre Gemini, ChatGPT o Claude. Pega la Gema primero, luego tu caso debajo.' },
      { step: 4, action: 'Lee la respuesta', detail: 'La IA te dará cosas, conexiones y preguntas. ¡Eso es tu primer modelo!' },
      { step: 5, action: 'Anota las preguntas', detail: 'Las preguntas que la IA hace son las que TÚ deberías hacerle al cliente o instructor.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Una tienda de mascotas necesita registrar a sus clientes, las mascotas que venden, y las ventas que hacen cada día.' },
      { role: 'ai', text: '## Cosas importantes del sistema\n\n1. **CLIENTE** — la persona que compra\n   - Nombre, teléfono, dirección\n\n2. **MASCOTA** — el animal que se vende\n   - Nombre, especie, raza, precio\n\n3. **VENTA** — el evento de comprar\n   - Fecha, quién compró, qué mascota, cuánto pagó', annotation: '✅ Identificó 3 cosas principales con sus datos' },
      { role: 'ai', text: '## Conexiones\n- Un CLIENTE puede hacer muchas VENTAS → pero cada VENTA es de un solo CLIENTE\n- Cada VENTA incluye una MASCOTA → ❓ ¿puede incluir varias mascotas?', annotation: '💡 Detectó una pregunta que necesitas validar' },
      { role: 'ai', text: '## Preguntas que faltan\n1. ❓ ¿Una venta puede incluir varias mascotas o solo una?\n2. ❓ ¿La tienda también vende productos (comida, juguetes)?\n3. ❓ ¿Un cliente puede devolver una mascota?', annotation: '🎯 Evita que la IA invente reglas sin confirmar' },
    ],
  },
  {
    id: 'architect-sprout', familyId: 'architect', level: 'sprout',
    title: 'Modelo con Reglas',
    subtitle: 'Agrega cardinalidad, tipos de datos y un diagrama Mermaid',
    category: 'Con más estructura', bestWhen: 'Cuando ya identificas entidades y atributos, pero necesitas aplicar las reglas correctamente.',
    fileName: 'gema-modelo-con-reglas.md', prompt: architectSproutPrompt,
    usageSteps: [
      { step: 1, action: 'Prepara tu caso', detail: 'Escribe el requisito incluyendo actores, cosas y reglas conocidas.' },
      { step: 2, action: 'Copia y pega', detail: 'Instrucción primero, requisito después.' },
      { step: 3, action: 'Revisa la cardinalidad', detail: 'Verifica que cada conexión con (min, max) tenga sentido.' },
      { step: 4, action: 'Copia el Mermaid', detail: 'La IA genera un diagrama. Cópialo para verlo renderizado.' },
      { step: 5, action: 'Valida las preguntas', detail: 'Todo [POR VALIDAR] necesita confirmación antes de continuar.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Una biblioteca registra aprendices, libros y préstamos. Un aprendiz puede pedir varios libros.' },
      { role: 'ai', text: '## Entidades\n- **APRENDIZ** (PK: id_aprendiz UUID) — documento UQ, nombre NN, email UQ\n- **LIBRO** (PK: id_libro BIGSERIAL) — isbn UQ, titulo NN, autor NN\n- **PRESTAMO** (PK: id_prestamo) — FK id_aprendiz, FK id_libro, fecha_salida, fecha_devolucion', annotation: '✅ PK técnica + datos de negocio como UNIQUE' },
      { role: 'ai', text: '## Cardinalidad\n| Par | A → B | B → A | Tipo |\n|---|---|---|---|\n| APRENDIZ → PRESTAMO | (0, N) | (1, 1) | 1:N |\n| LIBRO → PRESTAMO | (0, N) | (1, 1) | 1:N |', annotation: '📊 APRENDIZ y LIBRO son N:M a través de PRESTAMO' },
    ],
  },
  {
    id: 'master-architect', familyId: 'architect', level: 'root',
    title: 'Arquitecto MER & Relacional Completo',
    subtitle: 'De la narrativa del negocio a Mermaid y DDL PostgreSQL 3FN',
    category: 'Gema Maestra de Ingeniería', bestWhen: 'Para diseñar la arquitectura de datos completa de un sistema a partir de requisitos.',
    fileName: 'gema-arquitecto-mer-relacional.md', prompt: architectRootPrompt,
    usageSteps: [
      { step: 1, action: 'Prepara el contexto completo', detail: 'Incluye glosario, alcance, motor SQL, reglas de negocio y ejemplos.' },
      { step: 2, action: 'Copia y ejecuta', detail: 'Pega la Gema en Gemini con archivos, o en cualquier IA.' },
      { step: 3, action: 'Revisa las 5 fases', detail: 'Descomposición, matriz de relaciones, Mermaid, DDL SQL y auditoría.' },
      { step: 4, action: 'Ejecuta pruebas', detail: 'Toma el DDL y prueba INSERT, UPDATE, DELETE.' },
      { step: 5, action: 'Registra la bitácora', detail: 'Documenta supuestos, correcciones y decisiones.' },
    ],
    exampleConversation: [
      { role: 'user', text: 'Un taller mecánico necesita gestionar órdenes de reparación para carros...' },
      { role: 'ai', text: '### 1. Descomposición del sistema\n**Alcance:** Gestión operativa de órdenes de reparación\n**Entidades:** CLIENTE, VEHICULO, MECANICO, ORDEN_REPARACION, REPUESTO, ABONO\n**[POR VALIDAR]:** ¿Un vehículo puede pertenecer a varios clientes?', annotation: 'Separa hechos de supuestos con [POR VALIDAR]' },
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
