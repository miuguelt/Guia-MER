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
  { step: '02', title: 'Conversar con el dominio', detail: 'Valida las frases “uno con cuántos” en ambas direcciones y registra mínimos, máximos y obligatoriedad.' },
  { step: '03', title: 'Construir el conceptual', detail: 'Nombra entidades en singular, separa atributos multivalorados y conserva el lenguaje del negocio.' },
  { step: '04', title: 'Derivar el relacional', detail: 'Migra FK en 1:N, crea puente en N:M y decide el lado dependiente en 1:1 con una justificación.' },
  { step: '05', title: 'Renderizar como código', detail: 'Genera Mermaid o DBML, guárdalo en Git y compara cambios; el lienzo visual es una vista, no la fuente de verdad.' },
  { step: '06', title: 'Probar y endurecer', detail: 'Simula alta, cambio y borrado; revisa PK, FK, NN, UQ, índices, privacidad, transacciones y políticas de borrado.' },
  { step: '07', title: 'Revisión humana', detail: 'Entrega supuestos, decisiones y preguntas sin resolver para que el negocio o instructor apruebe el modelo.' },
]

export const gemPrompt = `# Gema: Arquitecto MER & Relacional ADSO

## Rol
Eres mentor senior de ingeniería de requisitos y modelado de datos para aprendices de ADSO. Enseñas con preguntas socráticas y no inventas reglas del negocio.

## Misión
Llevar un enunciado desde el dominio real hasta un MER, modelo relacional, diagrama Mermaid y diccionario de datos verificables.

## Reglas innegociables
1. Usa siempre “aprendiz”, nunca “alumno”. Responde en español claro y técnico.
2. Separa hechos observables, supuestos e información faltante. Marca cada supuesto como [POR VALIDAR].
3. No conviertas automáticamente cada sustantivo en entidad. Pregunta si existen múltiples instancias y si deben persistirse.
4. Prefiere id_entidad UUID o BIGINT como PK técnica. Deja documento, correo o placa como UQ NOT NULL alterna cuando corresponda.
5. No permitas listas dentro de una celda ni atributos derivados persistidos sin una justificación.
6. Toda relación N:M se transforma en una tabla asociativa con las FK de ambos padres antes del diagrama final.
7. No generes el artefacto final hasta recorrer las cuatro fases y listar las preguntas abiertas.

## Protocolo obligatorio
### Fase 1 · Inmersión y Extracción Lingüística (Pasos 0 y 1)
Extrae sustantivos candidatos, hechos/eventos, actores y límites del sistema. Aplica el Filtro de Entidad (¿tiene múltiples instancias y ciclo de vida propio?).

### Fase 2 · Minería de Atributos y Clasificación (Paso 2)
Para cada entidad clasifica atributos simples, compuestos (a aplanar), multivalorados (a separar en tabla hija para 1FN) y derivados (a calcular en consulta). Define PK técnica inmutable.

### Fase 3 · Relaciones y Cardinalidad Bidireccional (Pasos 3 y 4)
Para cada relación identifica el verbo y pregunta en ambas direcciones con (min, max): "un A, ¿con cuántos B mínimo y máximo?" y "un B, ¿con cuántos A mínimo y máximo?".

### Fase 4 · Algoritmo de Derivación Relacional (Paso 5)
Aplica las 7 reglas de oro: migra FK en 1:N al lado muchos, crea tabla puente para N:M con atributos de la relación, y ubica la FK con UNIQUE en 1:1.

### Fase 5 · Normalización (1FN, 2FN, 3FN) y Diccionario Físico (Paso 6)
Verifica que no existan dependencias parciales ni transitivas. Declara tipos de datos precisos (NUMERIC para dinero, TIMESTAMPTZ para fechas), restricciones y políticas ON DELETE.

## Contrato de salida
1. Resumen del dominio y alcance delimitado.
2. Matriz de entidades aprobadas con justificación y descarte.
3. Preguntas socráticas de cardinalidad aún pendientes marcadas con [POR VALIDAR].
4. Esquema relacional con justificación de PKs, FKs y tablas puente N:M.
5. Diagrama Mermaid compilable, DDL SQL PostgreSQL, diccionario de datos y control de calidad 1FN-3FN.

## Control de calidad antes de responder
- ¿Toda FK apunta a una PK/UQ existente y compatible?
- ¿Toda relación N:M tiene su tabla puente con clave compuesta o subrogada?
- ¿El esquema cumple 1FN, 2FN y 3FN sin dependencias transitivas?
- ¿Hay nombres singulares, tipos exactos (NUMERIC vs FLOAT) y nulabilidad coherente?
- ¿Se definieron las políticas ON DELETE (RESTRICT vs CASCADE) justificando el riesgo en producción?
- ¿Se evita exponer datos personales reales en los ejemplos?

Si falta una respuesta del negocio, detente en esa pregunta y no la rellenes con imaginación.`

export const aiExerciseStatements = [
  { id: 's1', text: 'La IA dijo que CLIENTE y PRODUCTO son N:M; antes de aceptarlo debo preguntar cuántos productos aparecen en un pedido y cuántos pedidos contienen un producto.', answer: true, explanation: 'La cardinalidad se valida en las dos direcciones y depende de los hechos del dominio.' },
  { id: 's2', text: 'La IA generó una tabla TELEFONOS como texto separado por comas; es correcto porque ahorra una tabla.', answer: false, explanation: 'Una lista en una celda rompe atomicidad; modela un teléfono como filas hijas si tiene vida propia.' },
  { id: 's3', text: 'La IA eligió documento como PK porque parece único; debo evaluar un id técnico y dejar el documento como UQ alterna.', answer: true, explanation: 'La identidad técnica desacopla la relación interna de documentos que pueden cambiar o variar por país.' },
]

export const missingTopics = [
  { title: 'Normalización 1FN–3FN', why: 'Evita listas, dependencias parciales y dependencias transitivas que reintroducen anomalías.', exercise: 'Toma una fila de ventas repetida y separa sus grupos hasta que cada celda sea atómica.' },
  { title: 'Datos temporales y auditoría', why: 'El estado actual no siempre explica qué ocurrió, cuándo y quién lo cambió.', exercise: 'Añade created_at, updated_at y una decisión sobre historial para una orden cancelada.' },
  { title: 'Seguridad, privacidad y acceso', why: 'Un modelo correcto también minimiza PII, define roles y limita quién puede leer o modificar.', exercise: 'Clasifica documento, teléfono y dirección; propone enmascaramiento, retención y permisos.' },
  { title: 'Transacciones y concurrencia', why: 'Varias operaciones deben confirmar o revertirse juntas sin perder consistencia.', exercise: 'Describe la transacción de crear pedido + detalle y qué pasa si falla una línea.' },
  { title: 'Índices y planes de consulta', why: 'Las FK y búsquedas frecuentes necesitan soporte físico, pero cada índice tiene costo de escritura.', exercise: 'Elige dos índices justificándolos por una consulta real, no por intuición.' },
  { title: 'Migraciones y versionado', why: 'El esquema cambia; una migración reproducible evita editar producción a mano.', exercise: 'Escribe el plan para agregar un campo NOT NULL sin romper datos existentes.' },
  { title: 'Pruebas y calidad de datos', why: 'Constraints, casos límite y datos de prueba convierten el diseño en evidencia.', exercise: 'Crea casos de alta, duplicado, FK inexistente, borrado padre y actualización de UQ.' },
  { title: 'OLTP, analítica y NoSQL', why: 'El modelo depende del propósito: operación transaccional, reportes, documentos o grafos.', exercise: 'Explica cuándo separarías el esquema operacional de un modelo dimensional.' },
]

export interface ProjectExample {
  label: string
  text: string
  diagramCode: string
  sqlCode: string
  requirement: {
    entity: string
    relation: string
    test: string
  }
}

export const projectExamples: ProjectExample[] = [
  {
    label: 'Biblioteca',
    text: 'Una biblioteca necesita registrar aprendices, libros, préstamos, fechas de salida y fechas de devolución. Un aprendiz puede tener varios préstamos y un libro puede aparecer en muchos préstamos.',
    diagramCode: `erDiagram
    APRENDIZ ||--o{ PRESTAMO : "solicita"
    LIBRO ||--o{ PRESTAMO : "se entrega en"

    APRENDIZ {
        uuid id_aprendiz PK
        varchar documento UK
        varchar nombre_completo
        varchar email UK
        varchar telefono
    }
    LIBRO {
        bigint id_libro PK
        varchar isbn UK
        varchar titulo
        varchar autor
        int ejemplares_disponibles
    }
    PRESTAMO {
        bigint id_prestamo PK
        uuid id_aprendiz FK
        bigint id_libro FK
        date fecha_salida
        date fecha_devolucion_pactada
        date fecha_devolucion_real
        varchar estado
    }`,
    sqlCode: `CREATE TABLE aprendiz (
  id_aprendiz UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documento VARCHAR(20) NOT NULL UNIQUE,
  nombre_completo VARCHAR(150) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  telefono VARCHAR(25)
);

CREATE TABLE libro (
  id_libro BIGSERIAL PRIMARY KEY,
  isbn VARCHAR(20) NOT NULL UNIQUE,
  titulo VARCHAR(200) NOT NULL,
  autor VARCHAR(150) NOT NULL,
  ejemplares_disponibles INTEGER NOT NULL DEFAULT 1 CHECK (ejemplares_disponibles >= 0)
);

CREATE TABLE prestamo (
  id_prestamo BIGSERIAL PRIMARY KEY,
  id_aprendiz UUID NOT NULL REFERENCES aprendiz(id_aprendiz) ON DELETE RESTRICT,
  id_libro BIGINT NOT NULL REFERENCES libro(id_libro) ON DELETE RESTRICT,
  fecha_salida DATE NOT NULL DEFAULT CURRENT_DATE,
  fecha_devolucion_pactada DATE NOT NULL,
  fecha_devolucion_real DATE,
  estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'DEVUELTO', 'MOROSO')),
  CONSTRAINT chk_fechas CHECK (fecha_devolucion_pactada >= fecha_salida)
);`,
    requirement: {
      entity: 'APRENDIZ, LIBRO, PRESTAMO',
      relation: 'APRENDIZ 1:N PRESTAMO N:1 LIBRO (N:M)',
      test: 'Registrar préstamo activo y verificar que fecha de devolución sea posterior o igual a la salida',
    },
  },
  {
    label: 'Veterinaria',
    text: 'Una veterinaria necesita registrar mascotas, propietarios, citas y servicios realizados. Una mascota puede tener muchas citas y cada cita pertenece a un propietario y a una mascota.',
    diagramCode: `erDiagram
    PROPIETARIO ||--o{ MASCOTA : "posee"
    MASCOTA ||--o{ CITA_VETERINARIA : "recibe"
    CITA_VETERINARIA ||--o{ DETALLE_CITA_SERVICIO : "incluye"
    SERVICIO_VETERINARIO ||--o{ DETALLE_CITA_SERVICIO : "prestado en"

    PROPIETARIO {
        uuid id_propietario PK
        varchar documento UK
        varchar nombre_completo
        varchar telefono
        varchar direccion
    }
    MASCOTA {
        bigint id_mascota PK
        uuid id_propietario FK
        varchar nombre
        varchar especie
        varchar raza
        date fecha_nacimiento
    }
    CITA_VETERINARIA {
        bigint id_cita PK
        bigint id_mascota FK
        timestamptz fecha_hora
        varchar motivo
        varchar estado
    }
    SERVICIO_VETERINARIO {
        int id_servicio PK
        varchar nombre UK
        numeric precio_base
    }
    DETALLE_CITA_SERVICIO {
        bigint id_cita PK, FK
        int id_servicio PK, FK
        int cantidad
        numeric precio_aplicado
    }`,
    sqlCode: `CREATE TABLE propietario (
  id_propietario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documento VARCHAR(20) NOT NULL UNIQUE,
  nombre_completo VARCHAR(150) NOT NULL,
  telefono VARCHAR(25) NOT NULL,
  direccion VARCHAR(180)
);

CREATE TABLE mascota (
  id_mascota BIGSERIAL PRIMARY KEY,
  id_propietario UUID NOT NULL REFERENCES propietario(id_propietario) ON DELETE RESTRICT,
  nombre VARCHAR(80) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  raza VARCHAR(80),
  fecha_nacimiento DATE
);

CREATE TABLE cita_veterinaria (
  id_cita BIGSERIAL PRIMARY KEY,
  id_mascota BIGINT NOT NULL REFERENCES mascota(id_mascota) ON DELETE RESTRICT,
  fecha_hora TIMESTAMPTZ NOT NULL,
  motivo VARCHAR(200) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'PROGRAMADA' CHECK (estado IN ('PROGRAMADA', 'ATENDIDA', 'CANCELADA'))
);

CREATE TABLE servicio_veterinario (
  id_servicio SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  precio_base NUMERIC(10,2) NOT NULL CHECK (precio_base >= 0)
);

CREATE TABLE detalle_cita_servicio (
  id_cita BIGINT NOT NULL REFERENCES cita_veterinaria(id_cita) ON DELETE CASCADE,
  id_servicio INTEGER NOT NULL REFERENCES servicio_veterinario(id_servicio) ON DELETE RESTRICT,
  cantidad INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),
  precio_aplicado NUMERIC(10,2) NOT NULL CHECK (precio_aplicado >= 0),
  PRIMARY KEY (id_cita, id_servicio)
);`,
    requirement: {
      entity: 'PROPIETARIO, MASCOTA, CITA_VETERINARIA',
      relation: 'PROPIETARIO 1:N MASCOTA 1:N CITA_VETERINARIA',
      test: 'Agendar cita para mascota registrada y liquidar servicios aplicados con su precio',
    },
  },
  {
    label: 'Tienda',
    text: 'Una tienda necesita registrar clientes, pedidos y productos. Un pedido tiene varios productos, un producto puede estar en muchos pedidos y cada línea guarda cantidad y precio acordado.',
    diagramCode: `erDiagram
    CLIENTE ||--o{ PEDIDO : "realiza"
    PEDIDO ||--o{ DETALLE_PEDIDO : "contiene"
    PRODUCTO ||--o{ DETALLE_PEDIDO : "incluido en"

    CLIENTE {
        uuid id_cliente PK
        varchar documento UK
        varchar nombre
        varchar email UK
    }
    PRODUCTO {
        bigint id_producto PK
        varchar codigo UK
        varchar nombre
        numeric precio_actual
        int stock
    }
    PEDIDO {
        bigint id_pedido PK
        uuid id_cliente FK
        timestamptz fecha_pedido
        varchar estado
        numeric total
    }
    DETALLE_PEDIDO {
        bigint id_pedido PK, FK
        bigint id_producto PK, FK
        int cantidad
        numeric precio_unitario
    }`,
    sqlCode: `CREATE TABLE cliente (
  id_cliente UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documento VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE producto (
  id_producto BIGSERIAL PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL,
  precio_actual NUMERIC(12,2) NOT NULL CHECK (precio_actual >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0)
);

CREATE TABLE pedido (
  id_pedido BIGSERIAL PRIMARY KEY,
  id_cliente UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE RESTRICT,
  fecha_pedido TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'PAGADO', 'ENVIADO', 'CANCELADO')),
  total NUMERIC(12,2) NOT NULL DEFAULT 0.00 CHECK (total >= 0)
);

CREATE TABLE detalle_pedido (
  id_pedido BIGINT NOT NULL REFERENCES pedido(id_pedido) ON DELETE CASCADE,
  id_producto BIGINT NOT NULL REFERENCES producto(id_producto) ON DELETE RESTRICT,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(12,2) NOT NULL CHECK (precio_unitario >= 0),
  PRIMARY KEY (id_pedido, id_producto)
);`,
    requirement: {
      entity: 'CLIENTE, PEDIDO, PRODUCTO',
      relation: 'CLIENTE 1:N PEDIDO 1:N DETALLE_PEDIDO N:1 PRODUCTO (N:M)',
      test: 'Registrar pedido con líneas de detalle y validar congelación de precio unitario',
    },
  },
]

