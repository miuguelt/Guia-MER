export type StationKey = 'm0' | 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6' | 'm7' | 'case'
export type ModuleKey = 'home' | StationKey | 'portafolio'

export interface CourseModule {
  key: StationKey
  number: string
  eyebrow: string
  title: string
  shortTitle: string
  description: string
  color: 'cyan' | 'lime' | 'amber' | 'violet' | 'rose' | 'blue'
}

export const courseModules: CourseModule[] = [
  {
    key: 'm0', number: '00', eyebrow: 'Sensibilización', title: 'El Excel gigante se rompe', shortTitle: 'El Excel gigante',
    description: 'Descubre las anomalías que hacen necesaria una base de datos relacional.', color: 'cyan',
  },
  {
    key: 'm1', number: '01', eyebrow: 'Fundamentos', title: 'Anatomía del mundo real', shortTitle: 'Entidades y atributos',
    description: 'Convierte sustantivos, datos e identificadores en un modelo conceptual.', color: 'lime',
  },
  {
    key: 'm2', number: '02', eyebrow: 'Conexiones', title: 'El lenguaje de las relaciones', shortTitle: 'Cardinalidad',
    description: 'Razona cardinalidades con dos preguntas simples y un diagrama vivo.', color: 'amber',
  },
  {
    key: 'm3', number: '03', eyebrow: 'Transformación', title: 'Del MER a las tablas', shortTitle: 'Reglas de derivación',
    description: 'Observa cómo las llaves viajan hasta convertirse en claves foráneas.', color: 'violet',
  },
  {
    key: 'm4', number: '04', eyebrow: 'Modelo físico', title: 'Diccionario y constraints', shortTitle: 'Diccionario de datos',
    description: 'Decide tipos, restricciones y políticas de integridad referencial.', color: 'rose',
  },
  {
    key: 'm5', number: '05', eyebrow: 'Transferencia', title: 'Laboratorio de proyecto', shortTitle: 'Tu proyecto',
    description: 'Lleva el método a tus propios requisitos y exporta un primer artefacto.', color: 'blue',
  },
  {
    key: 'm6', number: '06', eyebrow: 'IA con criterio', title: 'La IA como copiloto', shortTitle: 'IA paso a paso',
    description: 'Aprende a usar la IA como copiloto desde cero: empieza con preguntas simples y avanza hasta construir modelos completos.', color: 'cyan',
  },
  {
    key: 'm7', number: '07', eyebrow: 'Cierre profesional', title: 'Lo que completa el modelo', shortTitle: 'Temas que faltan',
    description: 'Conecta el diagrama con normalización, seguridad, pruebas, rendimiento y evolución.', color: 'lime',
  },
  {
    key: 'case', number: '08', eyebrow: 'Caso integrador', title: 'De la evidencia al MER defendible', shortTitle: 'Caso práctico final',
    description: 'Analiza entrevistas, encuestas y documentos; consolida requisitos y construye un MER completo.', color: 'blue',
  },
]

export const huntTokens = [
  { id: 'taller', label: 'taller', kind: 'entity', hint: 'Entidad: un lugar o concepto con varias instancias.' },
  { id: 'vehiculo', label: 'vehículo', kind: 'entity', hint: 'Entidad: el objeto que el taller atiende.' },
  { id: 'placa', label: 'placa', kind: 'key', hint: 'Atributo identificador, aunque conviene un id técnico.' },
  { id: 'marca', label: 'marca', kind: 'attribute', hint: 'Atributo simple del vehículo.' },
  { id: 'cliente', label: 'cliente', kind: 'entity', hint: 'Entidad: quien solicita el servicio.' },
  { id: 'nombre', label: 'nombre', kind: 'attribute', hint: 'Atributo descriptivo del cliente.' },
  { id: 'orden', label: 'orden de servicio', kind: 'entity', hint: 'Entidad: el hecho que conecta cliente y vehículo.' },
  { id: 'fecha', label: 'fecha de ingreso', kind: 'attribute', hint: 'Atributo temporal de la orden.' },
]

export const dictionarySeed = [
  { table: 'cliente', field: 'id_cliente', type: 'UUID', size: '—', nn: true, constraint: 'PK', description: 'Identificador técnico estable del cliente.' },
  { table: 'cliente', field: 'documento', type: 'VARCHAR', size: '20', nn: true, constraint: 'UQ', description: 'Documento alterno, único pero no usado como PK.' },
  { table: 'cliente', field: 'nombre', type: 'VARCHAR', size: '120', nn: true, constraint: '—', description: 'Nombre visible del cliente.' },
  { table: 'orden_servicio', field: 'id_orden', type: 'BIGINT', size: '—', nn: true, constraint: 'PK AI', description: 'Identificador de la orden de servicio.' },
  { table: 'orden_servicio', field: 'id_cliente', type: 'UUID', size: '—', nn: true, constraint: 'FK', description: 'Cliente que origina la orden.' },
  { table: 'orden_servicio', field: 'fecha_ingreso', type: 'DATE', size: '—', nn: true, constraint: '—', description: 'Día en que el vehículo ingresa al taller.' },
]

export const mermaidCode = `erDiagram
    CLIENTE ||--o{ ORDEN_SERVICIO : "solicita"
    VEHICULO ||--o{ ORDEN_SERVICIO : "recibe"
    ORDEN_SERVICIO ||--o{ DETALLE_SERVICIO : "contiene"
    SERVICIO ||--o{ DETALLE_SERVICIO : "aparece en"

    CLIENTE {
        uuid id_cliente PK
        varchar documento UK
        varchar nombre
    }
    VEHICULO {
        bigint id_vehiculo PK
        varchar placa UK
        varchar marca
    }
    ORDEN_SERVICIO {
        bigint id_orden PK
        uuid id_cliente FK
        bigint id_vehiculo FK
        date fecha_ingreso
    }
    SERVICIO {
        bigint id_servicio PK
        varchar nombre
        numeric tarifa
    }
    DETALLE_SERVICIO {
        bigint id_orden PK, FK
        bigint id_servicio PK, FK
        integer cantidad
    }`

export const sqlCode = `CREATE TABLE cliente (
  id_cliente UUID PRIMARY KEY,
  documento VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL
);

CREATE TABLE orden_servicio (
  id_orden BIGSERIAL PRIMARY KEY,
  id_cliente UUID NOT NULL REFERENCES cliente(id_cliente)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  fecha_ingreso DATE NOT NULL
);`
