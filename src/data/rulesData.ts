export interface TransformationRule {
  id: string
  number: string
  title: string
  merConcept: string
  relationalMapping: string
  explanation: string
  exampleCode: string
  badge: 'Entidad' | 'Atributo' | '1:1' | '1:N' | 'N:M' | 'Reflexiva' | 'Herencia'
}

export const transformationRules: TransformationRule[] = [
  {
    id: 'rule-entity',
    number: '01',
    title: 'Entidades Regulares (Fuertes)',
    merConcept: 'Cada entidad fuerte del diagrama conceptual.',
    relationalMapping: 'Se convierte en una Tabla independiente con su identificador como PRIMARY KEY (PK).',
    explanation: 'La entidad mantiene todas sus propiedades simples como columnas. Se recomienda que la PK sea técnica (UUID o BIGSERIAL/IDENTITY).',
    badge: 'Entidad',
    exampleCode: `CREATE TABLE cliente (
  id_cliente UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(120) NOT NULL
);`,
  },
  {
    id: 'rule-compound',
    number: '02',
    title: 'Atributos Compuestos',
    merConcept: 'Un atributo formado por sub-partes (ej. Dirección = Calle + Ciudad + CP).',
    relationalMapping: 'Se aplana en columnas atómicas independientes dentro de la misma tabla.',
    explanation: 'El modelo relacional no admite estructuras anidadas en 1FN. Cada componente se convierte en una columna atómica.',
    badge: 'Atributo',
    exampleCode: `-- En lugar de "direccion TEXT":
CREATE TABLE sede (
  id_sede INT PRIMARY KEY,
  direccion_calle VARCHAR(100) NOT NULL,
  direccion_numero VARCHAR(30) NOT NULL,
  direccion_ciudad VARCHAR(60) NOT NULL
);`,
  },
  {
    id: 'rule-multivalued',
    number: '03',
    title: 'Atributos Multivalorados',
    merConcept: 'Un atributo que puede tener múltiples valores para una sola instancia (ej. teléfonos, emails, etiquetas).',
    relationalMapping: 'Se extrae a una NUEVA tabla hija con FK a la entidad padre.',
    explanation: 'Para no violar 1FN ni inventar columnas fijas (tel1, tel2), cada valor se convierte en una fila de una tabla hija vinculada.',
    badge: 'Atributo',
    exampleCode: `CREATE TABLE cliente_telefono (
  id_telefono BIGSERIAL PRIMARY KEY,
  id_cliente UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE CASCADE,
  numero_telefono VARCHAR(25) NOT NULL,
  tipo VARCHAR(15) NOT NULL DEFAULT 'MOVIL'
);`,
  },
  {
    id: 'rule-one-to-many',
    number: '04',
    title: 'Relaciones Uno a Muchos (1:N)',
    merConcept: 'Una instancia de A se asocia con muchas de B, y una de B se asocia con una de A.',
    relationalMapping: 'La PRIMARY KEY del lado 1 migra como FOREIGN KEY (FK) a la tabla del lado N.',
    explanation: 'La tabla hija (lado N) es la que necesita saber a qué padre pertenece. Por eso Pedido guarda id_cliente.',
    badge: '1:N',
    exampleCode: `CREATE TABLE pedido (
  id_pedido BIGSERIAL PRIMARY KEY,
  id_cliente UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE RESTRICT,
  fecha DATE NOT NULL
);`,
  },
  {
    id: 'rule-many-to-many',
    number: '05',
    title: 'Relaciones Muchos a Muchos (N:M)',
    merConcept: 'Ambos lados pueden asociarse con múltiples instancias del otro lado.',
    relationalMapping: 'Nace obligatoriamente una TABLA ASOCIATIVA (puente) con las FKs de ambas tablas.',
    explanation: 'La clave primaria de la tabla puente suele ser compuesta (id_a + id_b) o un id técnico propio. Aquí viven los atributos del vínculo.',
    badge: 'N:M',
    exampleCode: `CREATE TABLE orden_repuesto (
  id_orden BIGINT NOT NULL REFERENCES orden_servicio(id_orden),
  id_repuesto BIGINT NOT NULL REFERENCES repuesto(id_repuesto),
  cantidad INT NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (id_orden, id_repuesto)
);`,
  },
  {
    id: 'rule-one-to-one',
    number: '06',
    title: 'Relaciones Uno a Uno (1:1)',
    merConcept: 'Una instancia de A se asocia como máximo con una de B y viceversa.',
    relationalMapping: 'La FK viaja a la entidad con participación obligatoria y se le añade restricción UNIQUE.',
    explanation: 'Si Persona puede o no tener Pasaporte, Pasaporte (que siempre pertenece a una persona) recibe id_persona UNIQUE NOT NULL.',
    badge: '1:1',
    exampleCode: `CREATE TABLE pasaporte (
  id_pasaporte BIGSERIAL PRIMARY KEY,
  id_persona UUID NOT NULL UNIQUE REFERENCES persona(id_persona) ON DELETE CASCADE,
  numero_pasaporte VARCHAR(20) NOT NULL UNIQUE,
  fecha_expedicion DATE NOT NULL
);`,
  },
  {
    id: 'rule-reflexive',
    number: '07',
    title: 'Relaciones Reflexivas (Recursivas)',
    merConcept: 'Una entidad que se relaciona consigo misma (ej. Empleado supervisa Empleados, Categoría padre).',
    relationalMapping: 'La tabla incluye una FK que referencia a la misma tabla (auto-referencia), normalmente nullable.',
    explanation: 'Permite modelar árboles y jerarquías sin crear múltiples tablas idénticas. El nodo raíz tiene la FK en NULL.',
    badge: 'Reflexiva',
    exampleCode: `CREATE TABLE empleado (
  id_empleado UUID PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  id_supervisor UUID REFERENCES empleado(id_empleado) ON DELETE SET NULL
);`,
  },
]

export interface SqlDataTypeGuide {
  category: string
  types: Array<{
    name: string
    bestFor: string
    example: string
    warning?: string
  }>
}

export const sqlDataTypesGuide: SqlDataTypeGuide[] = [
  {
    category: 'Identificadores y Enteros',
    types: [
      { name: 'UUID', bestFor: 'Claves primarias distribuidas, microservicios, seguridad.', example: 'gen_random_uuid()' },
      { name: 'BIGINT / BIGSERIAL', bestFor: 'Tablas transaccionales de alto volumen (pedidos, logs, eventos).', example: 'BIGSERIAL PRIMARY KEY' },
      { name: 'INTEGER', bestFor: 'Catálogos pequeños, cantidades, códigos postales numéricos.', example: 'INT' },
      { name: 'SMALLINT', bestFor: 'Valores en rango corto (-32k a 32k), días de semana, meses, créditos.', example: 'SMALLINT' },
    ],
  },
  {
    category: 'Números Exactos vs Flotantes',
    types: [
      { name: 'NUMERIC(p, s) / DECIMAL', bestFor: 'Dinero, precios, saldos, porcentajes financieros exactos.', example: 'NUMERIC(12, 2)', warning: 'Nunca uses FLOAT o REAL para dinero debido a errores de redondeo binario.' },
      { name: 'DOUBLE PRECISION', bestFor: 'Cálculos científicos, coordenadas GPS, lecturas de sensores.', example: 'DOUBLE PRECISION' },
    ],
  },
  {
    category: 'Cadenas de Texto',
    types: [
      { name: 'VARCHAR(n)', bestFor: 'Textos con límite natural (nombres, correos, documentos).', example: 'VARCHAR(120)' },
      { name: 'TEXT', bestFor: 'Descripciones largas, observaciones, notas sin límite estricto.', example: 'TEXT' },
      { name: 'CHAR(n)', bestFor: 'Códigos de longitud exactamente fija (código ISO país "CO", "US").', example: 'CHAR(2)' },
    ],
  },
  {
    category: 'Fechas y Tiempos',
    types: [
      { name: 'TIMESTAMPTZ', bestFor: 'Eventos del mundo real con zona horaria (pedidos, pagos, auditoría).', example: 'TIMESTAMPTZ DEFAULT NOW()' },
      { name: 'DATE', bestFor: 'Fechas puras sin hora (fecha de nacimiento, fecha de expedición).', example: 'DATE' },
      { name: 'TIME', bestFor: 'Horas del día sin fecha (horario de apertura 08:00:00).', example: 'TIME' },
    ],
  },
]
