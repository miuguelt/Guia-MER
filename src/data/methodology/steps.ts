import type { MethodologyStep } from './types'

export const methodologySteps: MethodologyStep[] = [
  {
    id: 0,
    title: 'Paso 0 · Inmersión y Levantamiento del Dominio',
    shortTitle: '0. Dominio y Alcance',
    objective: 'Delimitar las fronteras del sistema, entender los objetivos del negocio y recopilar la narrativa.',
    howTo: [
      'Entrevista a los usuarios clave (stakeholders) y lee documentos reales (facturas, formatos, planillas).',
      'Define qué entra en el alcance y qué queda explícitamente por fuera para evitar el sobrediseño.',
      'Crea un glosario inicial de términos del negocio para evitar sinonimias (ej. ¿Cliente es lo mismo que Usuario?).',
    ],
    pitfalls: [
      'Empezar a diseñar tablas en SQL sin entender la regla del negocio.',
      'Asumir reglas que el cliente nunca mencionó sin marcarlas como [POR VALIDAR].',
    ],
    checklist: [
      'Narrativa del problema documentada',
      'Límites del sistema definidos',
      'Glosario de términos unificado',
    ],
  },
  {
    id: 1,
    title: 'Paso 1 · Extracción Lingüística y Filtro de Entidades',
    shortTitle: '1. Detectar Entidades',
    objective: 'Identificar los sustantivos del texto y filtrarlos para determinar cuáles son verdaderas entidades.',
    howTo: [
      'Subraya todos los sustantivos del texto (personas, lugares, objetos, eventos o transacciones).',
      'Aplica el Filtro de Entidad: ¿Tiene múltiples instancias? ¿Tiene ciclo de vida propio? ¿Requiere varios atributos para describirse?',
      'Descarta sustantivos que son atributos (ej. "precio", "nombre") o actores externos sin persistencia en el sistema.',
    ],
    pitfalls: [
      'Confundir un atributo con una entidad (ej. crear una tabla "Color" cuando solo es un texto simple en Producto).',
      'Olvidar las entidades transaccionales (los hechos como Pedido, Venta, Cita, Matrícula).',
    ],
    checklist: [
      'Sustantivos candidatos listados',
      'Filtro de instancias y persistencia aplicado',
      'Entidades maestras y transaccionales separadas',
    ],
  },
  {
    id: 2,
    title: 'Paso 2 · Minería y Clasificación de Atributos',
    shortTitle: '2. Minar Atributos',
    objective: 'Asignar a cada entidad sus propiedades, clasificarlas y definir su clave primaria (PK).',
    howTo: [
      'Determina las propiedades atómicas que describen cada entidad (simples vs compuestos).',
      'Si un atributo es compuesto (ej. Dirección), divídelo en partes atómicas: calle, número, ciudad, código postal.',
      'Si un atributo puede tener múltiples valores (ej. varios teléfonos o emails), márcalo: requerirá una tabla hija.',
      'Si un dato se puede calcular (ej. total = precio * cantidad, o edad desde fecha_nacimiento), no lo persistas o justifícalo como derivado.',
      'Elige la Clave Primaria (PK): prefiere una clave técnica/subrogada (UUID o BIGINT autoincremental) sobre claves naturales que pueden cambiar.',
    ],
    pitfalls: [
      'Guardar listas separadas por comas en un campo de texto (violación de 1FN).',
      'Usar cédula, placa o email como PK absoluta sin evaluar su mutabilidad o formato externo.',
    ],
    checklist: [
      'Atributos descompuestos a su forma atómica',
      'Multivalorados identificados para separar',
      'Clave primaria técnica (PK) asignada a cada entidad',
      'Claves candidatas naturales protegidas con UNIQUE (UQ)',
    ],
  },
  {
    id: 3,
    title: 'Paso 3 · Identificación de Relaciones y Verbos de Acción',
    shortTitle: '3. Encontrar Relaciones',
    objective: 'Descubrir las conexiones lógicas entre las entidades mediante los verbos de la narrativa.',
    howTo: [
      'Busca los verbos que conectan a dos entidades: "Cliente realiza Pedido", "Médico atiende Cita", "Estudiante cursa Asignatura".',
      'Construye una matriz de relaciones para verificar qué entidades interactúan entre sí y evitar islas desconectadas.',
      'Revisa si la relación tiene atributos propios (ej. cantidad en una venta, calificación en una matrícula, fecha de asignación).',
    ],
    pitfalls: [
      'Relacionar entidades que no tienen vínculo directo en el negocio (crear dependencias artificiales).',
      'Perder los atributos que pertenecen al vínculo y forzarlos incorrectamente en una de las dos entidades.',
    ],
    checklist: [
      'Verbos de negocio identificados',
      'Pares de entidades conectadas explícitas',
      'Atributos propios de la relación identificados',
    ],
  },
  {
    id: 4,
    title: 'Paso 4 · Análisis Bidireccional de Cardinalidad y Participación',
    shortTitle: '4. Cardinalidad (Min..Max)',
    objective: 'Formular las dos preguntas sagradas en ambas direcciones para determinar mínimos y máximos.',
    howTo: [
      'Pregunta A (de Izquierda a Derecha): "Una instancia concreta de [Entidad A], ¿con cuántas instancias de [Entidad B] se relaciona como MÍNIMO y como MÁXIMO?"',
      'Pregunta B (de Derecha a Izquierda): "Una instancia concreta de [Entidad B], ¿con cuántas instancias de [Entidad A] se relaciona como MÍNIMO y como MÁXIMO?"',
      'Mínimo = 0 significa Participación Opcional (puede existir sin la otra). Mínimo = 1 significa Participación Obligatoria.',
      'Máximo = 1 o N determina el tipo de relación: 1:1, 1:N o N:M.',
    ],
    pitfalls: [
      'Hacer la pregunta solo en un sentido y asumir el reverso por intuición.',
      'Pensar en el plural ("los clientes compran productos") en lugar de una instancia aislada ("un cliente concreto").',
    ],
    checklist: [
      'Pregunta formulada en sentido A → B con (min, max)',
      'Pregunta formulada en sentido B → A con (min, max)',
      'Tipo de cardinalidad resultante: 1:1, 1:N o N:M',
    ],
  },
  {
    id: 5,
    title: 'Paso 5 · Derivación al Modelo Relacional (Tablas y Llaves)',
    shortTitle: '5. Mapear a Tablas',
    objective: 'Aplicar las reglas formales de transformación del modelo conceptual al modelo lógico/relacional.',
    howTo: [
      'Cada entidad regular se convierte en una Tabla.',
      'En relaciones 1:N: la PK de la tabla padre (lado 1) viaja como Llave Foránea (FK) a la tabla hija (lado N).',
      'En relaciones N:M: se crea obligatoriamente una Tabla Asociativa/Puente, cuya PK está compuesta por las FKs de ambas tablas (o una PK subrogada) y contiene los atributos propios de la relación.',
      'En relaciones 1:1: la FK viaja a la entidad con participación obligatoria y se le añade restricción UNIQUE.',
    ],
    pitfalls: [
      'Intentar implementar una relación N:M directamente en una de las dos tablas con arreglos o texto.',
      'Colocar la FK en el lado incorrecto de una relación 1:N (poner la FK del pedido en la tabla cliente).',
    ],
    checklist: [
      'Tablas creadas con sus respectivas PKs',
      'FKs ubicadas en el lado correcto con tipos compatibles',
      'Tablas puente creadas para todas las relaciones N:M',
    ],
  },
  {
    id: 6,
    title: 'Paso 6 · Normalización (1FN, 2FN, 3FN) e Integridad Física',
    shortTitle: '6. Normalizar y Endurecer',
    objective: 'Verificar la ausencia de redundancia y definir tipos de datos, restricciones y políticas de borrado.',
    howTo: [
      'Aplica 1FN: garantiza que todos los atributos sean atómicos y no haya columnas repetitivas ni listas.',
      'Aplica 2FN: verifica que todo atributo no clave dependa funcionalmente de TODA la clave primaria (en PKs compuestas).',
      'Aplica 3FN: elimina dependencias transitivas (ningún atributo no clave debe depender de otro atributo no clave).',
      'Define restricciones físicas en el Diccionario: NOT NULL, UNIQUE, CHECK, DEFAULT y políticas ON DELETE / ON UPDATE.',
    ],
    pitfalls: [
      'Dejar datos como "ciudad" y "departamento" duplicados en cada fila de Cliente sin evaluar la dependencia transitiva.',
      'No configurar las políticas de borrado (ON DELETE RESTRICT vs CASCADE), dejando huérfanos o borrados accidentales en producción.',
    ],
    checklist: [
      'Esquema validado en 1FN, 2FN y 3FN',
      'Diccionario de datos con tipos precisos y restricciones',
      'Políticas de integridad referencial justificadas',
    ],
  },
]
