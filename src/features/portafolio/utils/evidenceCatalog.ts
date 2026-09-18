import type { ModuleKey } from '../../../data/course'

export interface EvidenceCatalogEntry {
  id: string
  code: string
  name: string
  phase: string
  type: 'conocimiento' | 'desempeño' | 'producto'
  instrument: string
  criterion: string
  stationModule: ModuleKey
  beginnerExplanation: string
  recoveryAction: string
  indicatorTemplates: Array<{ label: string; tip: string }>
}

export const EVIDENCE_CATALOG: Record<string, EvidenceCatalogEntry> = {
  'MER-EV01': {
    id: 'requirements-check',
    code: 'MER-EV01',
    name: 'Autochequeo y Especificación de Requisitos del Sistema',
    phase: 'Transferencia',
    type: 'conocimiento',
    instrument: 'Lista de Chequeo y Preguntas Socráticas',
    criterion: 'El texto tiene contexto suficiente, al menos dos entidades candidatas y un hecho transaccional relacionable.',
    stationModule: 'm5',
    beginnerExplanation:
      'Antes de dibujar tablas, debes entender qué necesita el sistema. Este criterio revisa que identifiques sustantivos independientes con múltiples registros (entidades) y cómo comprobarás que se guardan bien.',
    recoveryAction: 'Ve a la Estación 05 y escribe el requisito de tu sistema con sus entidades y una prueba simple de inserción.',
    indicatorTemplates: [
      {
        label: 'Contexto del problema descripto con claridad (mínimo 50 caracteres)',
        tip: 'Explica qué servicio, producto o hecho necesita registrar la organización.',
      },
      {
        label: 'Al menos dos entidades candidatas separadas de simples atributos',
        tip: 'Distingue cosas con vida propia (como CLIENTE) de datos simples (como teléfono).',
      },
      {
        label: 'Prueba observable de inserción y preguntas abiertas visibles',
        tip: 'Declara cómo verificarás que el requisito se cumplió sin asumir reglas dudosas.',
      },
    ],
  },
  'MER-EV02': {
    id: 'mermaid-erd',
    code: 'MER-EV02',
    name: 'Diagrama Conceptual Entidad-Relación (Mermaid ERD)',
    phase: 'Apropiación',
    type: 'desempeño',
    instrument: 'Rúbrica de Notación y Transformación ERD',
    criterion: 'El modelo utiliza sintaxis erDiagram, cardinalidades (min, max) bidireccionales y tabla puente en relaciones N:M.',
    stationModule: 'm5',
    beginnerExplanation:
      'El diagrama ERD es el plano visual del sistema. Comprueba que las flechas indiquen si la relación es 1:N o N:M y que ninguna tabla quede aislada sin conexión justificada.',
    recoveryAction: 'Revisa las cardinalidades en la Estación 02 o genera tu diagrama en la Estación 05.',
    indicatorTemplates: [
      {
        label: 'Estructura válida con sintaxis estándar Mermaid (erDiagram)',
        tip: 'Asegura que el bloque comience con erDiagram y declare bloques con llaves { }.',
      },
      {
        label: 'Cardinalidades razonadas con preguntas en ambos sentidos',
        tip: 'Pregunta: ¿Un registro de A cuántos de B puede tener? Y viceversa.',
      },
      {
        label: 'Relaciones N:M resueltas mediante tabla asociativa (puente)',
        tip: 'Nunca enlaces dos tablas N:M directamente en el modelo físico; crea la tabla intermedia.',
      },
    ],
  },
  'MER-EV03': {
    id: 'data-dictionary',
    code: 'MER-EV03',
    name: 'Diccionario de Datos Físico y Restricciones de Integridad',
    phase: 'Apropiación',
    type: 'producto',
    instrument: 'Lista de Chequeo Técnica de Modelo Físico',
    criterion: 'Cada campo tiene tipo SQL nativo, nulabilidad (NOT NULL), clave (PK/FK/UQ) y política de integridad referencial.',
    stationModule: 'm4',
    beginnerExplanation:
      'El diccionario es la receta técnica que entregas al motor SQL. Cada columna debe tener su tipo (UUID, BIGINT, VARCHAR, DATE), decir si es obligatoria (NOT NULL) y proteger la clave primaria.',
    recoveryAction: 'Entra a la Estación 04 y agrega o revisa al menos 3 campos con tipos y restricciones.',
    indicatorTemplates: [
      {
        label: 'Tipos SQL nativos precisos (ej. UUID/BIGINT para llaves, NUMERIC para dinero)',
        tip: 'Evita FLOAT para moneda; usa siempre NUMERIC para evitar pérdidas de centavos.',
      },
      {
        label: 'Nulabilidad estricta (NOT NULL) y definición explícita de PK/FK/UQ',
        tip: 'Toda tabla necesita su Primary Key inmutable para identificar cada registro.',
      },
      {
        label: 'Política de integridad referencial elegida conscientemente (ON DELETE RESTRICT)',
        tip: 'Elige RESTRICT para tablas maestras y facturas para evitar borrados accidentales.',
      },
    ],
  },
  'MER-EV04': {
    id: 'ai-method',
    code: 'MER-EV04',
    name: 'Auditoría y Bitácora de Modelado Asistido por IA (Protocolo V.E.R.A.)',
    phase: 'Apropiación',
    type: 'conocimiento',
    instrument: 'Ejercicio Formativo de Auditoría Humano-IA',
    criterion: 'Distingue propuesta generativa de IA, verificación rigurosa, supuestos críticos y decisión técnica humana.',
    stationModule: 'm6',
    beginnerExplanation:
      'La IA es un asistente, no quien toma las decisiones. Este criterio evalúa que aprendas a pedirle ayuda con contexto claro, detectes cuándo inventa datos y decidas tú la arquitectura final.',
    recoveryAction: 'En la Estación 06 completa la bitácora de auditoría anotando un encargo y los supuestos identificados.',
    indicatorTemplates: [
      {
        label: 'Encargo estructurado con contexto, reglas y restricciones del sistema',
        tip: 'No uses prompts vagos; dale a la IA límites del sistema y casos límite.',
      },
      {
        label: 'Identificación y marcado explícito de supuestos o alucinaciones de la IA',
        tip: 'Anota cada relación o campo que la IA asumió sin que el cliente lo pidiera.',
      },
      {
        label: 'Decisión técnica humana documentada antes de implementar cambios (V.E.R.A.)',
        tip: 'Tú eres el responsable del modelo: registra qué corregiste y qué descartaste.',
      },
    ],
  },
  'MER-EV05': {
    id: 'missing-topics',
    code: 'MER-EV05',
    name: 'Plan de Cierre Profesional: Normalización, Seguridad y Evolución',
    phase: 'Transferencia',
    type: 'producto',
    instrument: 'Lista de Chequeo de Cierre Profesional',
    criterion: 'El diseño contempla 1FN-3FN, protección de datos (PII), suites de pruebas e historial de migraciones.',
    stationModule: 'm7',
    beginnerExplanation:
      'Tu base de datos vivirá en un servidor real. Este criterio revisa que apliques las tres formas normales (1FN, 2FN, 3FN), protejas datos personales (cédulas, claves) y pienses en cómo cambiará el esquema a futuro.',
    recoveryAction: 'Explora las 8 dimensiones operativas y el simulador 1FN-3FN en la Estación 07.',
    indicatorTemplates: [
      {
        label: 'Normalización formal (1FN atomicidad, 2FN dependencia total, 3FN sin transitividad)',
        tip: 'Ninguna celda con listas separadas por coma y ningún dato que dependa de otro no-clave.',
      },
      {
        label: 'Protección de datos sensibles y privacidad por diseño (Habeas Data / PII)',
        tip: 'Identifica campos sensibles para aplicar políticas de acceso y cifrado.',
      },
      {
        label: 'Estrategia de pruebas límite y evolución mediante scripts de migración',
        tip: 'Prueba qué pasa si se duplica un documento o se intenta borrar un registro con hijos.',
      },
    ],
  },
  'MER-EV06': {
    id: 'guided-case-package',
    code: 'MER-EV06',
    name: 'Caso Integrador: Expediente de Análisis y MER Defendible',
    phase: 'Transferencia',
    type: 'producto',
    instrument: 'Ejercicio Guiado y Defensa Técnica',
    criterion: 'Traza entrevistas, encuesta y documentos hasta requisitos, entidades, cardinalidades, tablas asociativas y un MER verificable.',
    stationModule: 'case',
    beginnerExplanation:
      'Es el reto integrador final: demuestras que sabes tomar entrevistas confusas y notas desordenadas de un negocio real (Taller Ruta 7), extraer sus requisitos y construir un MER completo defendible.',
    recoveryAction: 'Recorre los pasos del Caso Integrador Taller Ruta 7 en la Estación 08.',
    indicatorTemplates: [
      {
        label: 'Triangulación de fuentes primarias (entrevistas, encuestas y formatos físicos)',
        tip: 'Cruza lo que dijo el mecánico con lo que anotó la recepcionista para no inventar reglas.',
      },
      {
        label: 'Trazabilidad de Requisitos Funcionales (RF) y No Funcionales (RNF) hacia el MER',
        tip: 'Cada tabla y campo debe responder a un requisito explícito del expediente.',
      },
      {
        label: 'Modelo conceptual ERD y DDL SQL orientativo listos para sustentar ante el instructor',
        tip: 'Verifica que puedas defender cada tabla, relación y política de integridad con solidez.',
      },
    ],
  },
}
