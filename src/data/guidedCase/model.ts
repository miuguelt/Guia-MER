export const guidedCaseCandidateInventory = [
  { word: 'cliente', decision: 'Entidad', reason: 'Tiene varias instancias, identidad propia y ciclo de vida.' },
  { word: 'vehículo', decision: 'Entidad', reason: 'Tiene identidad, atributos propios e historial consultable.' },
  { word: 'orden de servicio', decision: 'Entidad transaccional', reason: 'Es un hecho persistente que conecta solicitante, vehículo y trabajo.' },
  { word: 'servicio', decision: 'Entidad maestra', reason: 'Existe en un catálogo y se reutiliza en muchas órdenes.' },
  { word: 'detalle de servicio', decision: 'Entidad asociativa', reason: 'Resuelve N:M y guarda cantidad y tarifa histórica.' },
  { word: 'técnico', decision: 'Entidad', reason: 'Puede participar en muchas órdenes y requiere identificación.' },
  { word: 'asignación de técnico', decision: 'Entidad asociativa', reason: 'Resuelve N:M y guarda rol, horas y fecha de participación.' },
  { word: 'repuesto', decision: 'Entidad maestra', reason: 'Existe en inventario y puede consumirse en varias órdenes.' },
  { word: 'consumo de repuesto', decision: 'Entidad asociativa', reason: 'Resuelve N:M y conserva cantidad y precio aplicado.' },
  { word: 'pago', decision: 'Entidad transaccional', reason: 'Puede haber varios abonos por orden y tiene atributos propios.' },
  { word: 'teléfono', decision: 'Atributo inicial', reason: 'La evidencia no exige múltiples teléfonos; si aparece la regla, se separa.' },
  { word: 'historial', decision: 'Consulta, no entidad', reason: 'Se obtiene recorriendo órdenes del vehículo; no es un registro independiente.' },
  { word: 'total', decision: 'Dato derivado', reason: 'Se calcula desde detalles, consumos y pagos; no debe duplicarse sin justificación.' },
]

export const guidedCaseRelations = [
  { pair: 'CLIENTE — VEHICULO', verb: 'posee', cardinality: '1:N', left: '(0,N)', right: '(1,1)', rule: 'Un cliente puede tener cero o varios vehículos; cada vehículo tiene un propietario actual.' },
  { pair: 'CLIENTE — ORDEN_SERVICIO', verb: 'solicita', cardinality: '1:N', left: '(0,N)', right: '(1,1)', rule: 'Un cliente puede solicitar muchas órdenes; cada orden registra un solicitante.' },
  { pair: 'VEHICULO — ORDEN_SERVICIO', verb: 'recibe', cardinality: '1:N', left: '(0,N)', right: '(1,1)', rule: 'Un vehículo puede acumular historial; cada orden corresponde a un vehículo.' },
  { pair: 'ORDEN_SERVICIO — SERVICIO', verb: 'incluye mediante DETALLE_SERVICIO', cardinality: 'N:M', left: '(1,N)', right: '(0,N)', rule: 'La línea guarda cantidad y tarifa aplicada; nace una tabla puente.' },
  { pair: 'ORDEN_SERVICIO — TECNICO', verb: 'requiere mediante ASIGNACION_TECNICO', cardinality: 'N:M', left: '(0,N)', right: '(0,N)', rule: 'La asignación guarda rol, horas y fecha; puede estar vacía al abrir la orden.' },
  { pair: 'ORDEN_SERVICIO — REPUESTO', verb: 'consume mediante CONSUMO_REPUESTO', cardinality: 'N:M', left: '(0,N)', right: '(0,N)', rule: 'Solo el consumo efectivo crea la fila y registra cantidad y precio aplicado.' },
  { pair: 'ORDEN_SERVICIO — PAGO', verb: 'recibe', cardinality: '1:N', left: '(0,N)', right: '(1,1)', rule: 'Una orden puede no tener pago o recibir varios abonos; cada pago pertenece a una orden.' },
]

export const guidedCaseMermaid = `erDiagram
    CLIENTE ||--o{ VEHICULO : "posee"
    CLIENTE ||--o{ ORDEN_SERVICIO : "solicita"
    VEHICULO ||--o{ ORDEN_SERVICIO : "recibe"
    ORDEN_SERVICIO ||--|{ DETALLE_SERVICIO : "incluye"
    SERVICIO ||--o{ DETALLE_SERVICIO : "aparece en"
    ORDEN_SERVICIO ||--o{ ASIGNACION_TECNICO : "requiere"
    TECNICO ||--o{ ASIGNACION_TECNICO : "participa"
    ORDEN_SERVICIO ||--o{ CONSUMO_REPUESTO : "consume"
    REPUESTO ||--o{ CONSUMO_REPUESTO : "se usa en"
    ORDEN_SERVICIO ||--o{ PAGO : "recibe"

    CLIENTE {
        uuid id_cliente PK
        varchar documento UK
        varchar nombre_completo
        varchar telefono
        varchar correo
    }
    VEHICULO {
        bigint id_vehiculo PK
        uuid id_cliente_propietario FK
        varchar placa UK
        varchar tipo
        varchar marca
        varchar modelo
        integer anio
    }
    ORDEN_SERVICIO {
        bigint id_orden PK
        uuid id_cliente_solicitante FK
        bigint id_vehiculo FK
        timestamptz fecha_ingreso
        varchar estado
        integer kilometraje_ingreso
    }
    SERVICIO {
        integer id_servicio PK
        varchar codigo UK
        varchar nombre
        numeric tarifa_base
        boolean activo
    }
    DETALLE_SERVICIO {
        bigint id_orden PK, FK
        integer id_servicio PK, FK
        integer cantidad
        numeric tarifa_aplicada
    }
    TECNICO {
        bigint id_tecnico PK
        varchar documento UK
        varchar nombre_completo
        boolean activo
    }
    ASIGNACION_TECNICO {
        bigint id_orden PK, FK
        bigint id_tecnico PK, FK
        varchar rol
        numeric horas_reportadas
        timestamptz asignado_en
    }
    REPUESTO {
        bigint id_repuesto PK
        varchar codigo UK
        varchar nombre
        varchar unidad_medida
        numeric precio_vigente
        integer stock_actual
        integer stock_minimo
        boolean activo
    }
    CONSUMO_REPUESTO {
        bigint id_orden PK, FK
        bigint id_repuesto PK, FK
        numeric cantidad
        numeric precio_aplicado
        timestamptz consumido_en
    }
    PAGO {
        bigint id_pago PK
        bigint id_orden FK
        timestamptz pagado_en
        numeric monto
        varchar medio_pago
        varchar estado
    }`

export const guidedCaseSql = `-- Modelo esperado orientativo · PostgreSQL
CREATE TABLE cliente (
  id_cliente UUID PRIMARY KEY,
  documento VARCHAR(20) NOT NULL UNIQUE,
  nombre_completo VARCHAR(150) NOT NULL,
  telefono VARCHAR(30),
  correo VARCHAR(150),
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE vehiculo (
  id_vehiculo BIGSERIAL PRIMARY KEY,
  id_cliente_propietario UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE RESTRICT,
  placa VARCHAR(12) NOT NULL UNIQUE,
  tipo VARCHAR(30) NOT NULL,
  marca VARCHAR(60) NOT NULL,
  modelo VARCHAR(60) NOT NULL,
  anio INTEGER CHECK (anio BETWEEN 1950 AND 2100)
);

CREATE TABLE orden_servicio (
  id_orden BIGSERIAL PRIMARY KEY,
  id_cliente_solicitante UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE RESTRICT,
  id_vehiculo BIGINT NOT NULL REFERENCES vehiculo(id_vehiculo) ON DELETE RESTRICT,
  fecha_ingreso TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('INGRESADO', 'EN_PROCESO', 'FINALIZADO', 'CANCELADO')),
  kilometraje_ingreso INTEGER CHECK (kilometraje_ingreso >= 0)
);

CREATE TABLE servicio (
  id_servicio SERIAL PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL UNIQUE,
  tarifa_base NUMERIC(12,2) NOT NULL CHECK (tarifa_base >= 0),
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE detalle_servicio (
  id_orden BIGINT NOT NULL REFERENCES orden_servicio(id_orden) ON DELETE RESTRICT,
  id_servicio INTEGER NOT NULL REFERENCES servicio(id_servicio) ON DELETE RESTRICT,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  tarifa_aplicada NUMERIC(12,2) NOT NULL CHECK (tarifa_aplicada >= 0),
  PRIMARY KEY (id_orden, id_servicio)
);

CREATE TABLE tecnico (
  id_tecnico BIGSERIAL PRIMARY KEY,
  documento VARCHAR(20) NOT NULL UNIQUE,
  nombre_completo VARCHAR(150) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE asignacion_tecnico (
  id_orden BIGINT NOT NULL REFERENCES orden_servicio(id_orden) ON DELETE RESTRICT,
  id_tecnico BIGINT NOT NULL REFERENCES tecnico(id_tecnico) ON DELETE RESTRICT,
  rol VARCHAR(60) NOT NULL,
  horas_reportadas NUMERIC(6,2) CHECK (horas_reportadas >= 0),
  asignado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id_orden, id_tecnico)
);

CREATE TABLE repuesto (
  id_repuesto BIGSERIAL PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL,
  unidad_medida VARCHAR(20) NOT NULL,
  precio_vigente NUMERIC(12,2) NOT NULL CHECK (precio_vigente >= 0),
  stock_actual NUMERIC(12,2) NOT NULL CHECK (stock_actual >= 0),
  stock_minimo NUMERIC(12,2) NOT NULL CHECK (stock_minimo >= 0),
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE consumo_repuesto (
  id_orden BIGINT NOT NULL REFERENCES orden_servicio(id_orden) ON DELETE RESTRICT,
  id_repuesto BIGINT NOT NULL REFERENCES repuesto(id_repuesto) ON DELETE RESTRICT,
  cantidad NUMERIC(12,2) NOT NULL CHECK (cantidad > 0),
  precio_aplicado NUMERIC(12,2) NOT NULL CHECK (precio_aplicado >= 0),
  consumido_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id_orden, id_repuesto)
);

CREATE TABLE pago (
  id_pago BIGSERIAL PRIMARY KEY,
  id_orden BIGINT NOT NULL REFERENCES orden_servicio(id_orden) ON DELETE RESTRICT,
  pagado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  monto NUMERIC(12,2) NOT NULL CHECK (monto > 0),
  medio_pago VARCHAR(30) NOT NULL,
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('CONFIRMADO', 'ANULADO'))
);

-- Índice alineado con RNF-01; validar con el motor y el volumen real.
CREATE INDEX idx_orden_vehiculo_fecha ON orden_servicio (id_vehiculo, fecha_ingreso DESC);`
