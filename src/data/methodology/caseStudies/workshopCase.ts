import type { SystemCaseStudy } from '../types'

export const workshopCase: SystemCaseStudy = {
  id: 'workshop',
  title: 'Taller Automotriz y Órdenes de Servicio',
  category: 'Mantenimiento y Servicios Mecánicos',
  narrative: `Un taller de mecánica automotriz especializado atiende vehículos de diversos clientes. Cada cliente se registra con su número de documento único, nombre completo y teléfono. Un cliente puede ser propietario de uno o varios vehículos, pero cada vehículo tiene una placa única nacional, marca, modelo y año. Cuando un vehículo ingresa por una falla o mantenimiento preventivo, se abre una Orden de Servicio con número consecutivo, fecha y hora de recepción, y kilometraje actual. Una orden de servicio pertenece a un vehículo y a su respectivo cliente. Durante la atención, se aplican uno o varios servicios estandarizados (ej. cambio de aceite, alineación, sincronización), registrando para cada servicio realizado la cantidad de horas o unidades y la tarifa unitaria aplicada al momento del servicio.`,
  entities: [
    {
      name: 'CLIENTE',
      description: 'Persona natural o jurídica propietaria de los vehículos.',
      attributes: [
        { name: 'id_cliente', type: 'UUID', role: 'PK', description: 'Identificador técnico único.' },
        { name: 'documento', type: 'VARCHAR(20)', role: 'UQ', description: 'Cédula o NIT único.' },
        { name: 'nombre', type: 'VARCHAR(120)', role: 'ATTR', description: 'Nombre completo.' },
        { name: 'telefono', type: 'VARCHAR(25)', role: 'ATTR', description: 'Contacto móvil o fijo.' },
      ],
    },
    {
      name: 'VEHICULO',
      description: 'Automóvil, camión o moto que recibe la atención mecánica.',
      attributes: [
        { name: 'id_vehiculo', type: 'BIGINT', role: 'PK', description: 'Identificador del vehículo.' },
        { name: 'id_cliente', type: 'UUID', role: 'FK', description: 'Propietario del vehículo.' },
        { name: 'placa', type: 'VARCHAR(10)', role: 'UQ', description: 'Placa alfanumérica única.' },
        { name: 'marca', type: 'VARCHAR(50)', role: 'ATTR', description: 'Fabricante del vehículo.' },
        { name: 'modelo', type: 'VARCHAR(50)', role: 'ATTR', description: 'Línea o referencia comercial.' },
      ],
    },
    {
      name: 'ORDEN_SERVICIO',
      description: 'Hecho transaccional que registra la estadía y trabajo en el taller.',
      attributes: [
        { name: 'id_orden', type: 'BIGINT', role: 'PK', description: 'Número consecutivo de orden.' },
        { name: 'id_cliente', type: 'UUID', role: 'FK', description: 'Cliente que autoriza el trabajo.' },
        { name: 'id_vehiculo', type: 'BIGINT', role: 'FK', description: 'Vehículo ingresado al taller.' },
        { name: 'fecha_ingreso', type: 'TIMESTAMPTZ', role: 'ATTR', description: 'Fecha y hora de entrada.' },
        { name: 'estado', type: 'VARCHAR(20)', role: 'ATTR', description: 'INGRESADO, EN_PROCESO, FINALIZADO.' },
      ],
    },
    {
      name: 'SERVICIO',
      description: 'Catálogo de procedimientos y mano de obra ofrecidos.',
      attributes: [
        { name: 'id_servicio', type: 'INTEGER', role: 'PK', description: 'Código del servicio.' },
        { name: 'nombre', type: 'VARCHAR(100)', role: 'UQ', description: 'Nombre del procedimiento.' },
        { name: 'tarifa_base', type: 'NUMERIC(10,2)', role: 'ATTR', description: 'Tarifa comercial de lista.' },
      ],
    },
    {
      name: 'DETALLE_SERVICIO',
      description: 'Tabla asociativa N:M entre Orden de Servicio y Servicios ejecutados.',
      isWeak: true,
      attributes: [
        { name: 'id_orden', type: 'BIGINT', role: 'PK', description: 'FK a la orden padre.' },
        { name: 'id_servicio', type: 'INTEGER', role: 'PK', description: 'FK al servicio realizado.' },
        { name: 'cantidad', type: 'INTEGER', role: 'ATTR', description: 'Horas o unidades de servicio.' },
        { name: 'tarifa_aplicada', type: 'NUMERIC(10,2)', role: 'ATTR', description: 'Precio congelado en la orden.' },
      ],
    },
  ],
  relations: [
    {
      source: 'CLIENTE',
      target: 'VEHICULO',
      verb: 'posee',
      cardinality: '1:N',
      leftMinMax: '(1,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un cliente puede poseer varios vehículos registrados; cada vehículo pertenece a un solo cliente.',
    },
    {
      source: 'CLIENTE',
      target: 'ORDEN_SERVICIO',
      verb: 'solicita',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un cliente solicita múltiples órdenes a lo largo del tiempo; cada orden tiene un cliente responsable.',
    },
    {
      source: 'VEHICULO',
      target: 'ORDEN_SERVICIO',
      verb: 'recibe',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un vehículo puede tener muchas órdenes de servicio históricas; cada orden se practica sobre un vehículo.',
    },
    {
      source: 'ORDEN_SERVICIO',
      target: 'SERVICIO',
      verb: 'incluye (vía DETALLE_SERVICIO)',
      cardinality: 'N:M',
      leftMinMax: '(1,N)',
      rightMinMax: '(0,N)',
      explanation: 'Una orden contiene al menos un servicio; un tipo de servicio se realiza en muchas órdenes. Nace DETALLE_SERVICIO.',
      attributes: ['cantidad', 'tarifa_aplicada'],
    },
  ],
  mermaid: `erDiagram
    CLIENTE ||--o{ VEHICULO : "posee"
    CLIENTE ||--o{ ORDEN_SERVICIO : "solicita"
    VEHICULO ||--o{ ORDEN_SERVICIO : "recibe"
    ORDEN_SERVICIO ||--|{ DETALLE_SERVICIO : "incluye"
    SERVICIO ||--o{ DETALLE_SERVICIO : "aparece en"

    CLIENTE {
        uuid id_cliente PK
        varchar documento UK
        varchar nombre
        varchar telefono
    }
    VEHICULO {
        bigint id_vehiculo PK
        uuid id_cliente FK
        varchar placa UK
        varchar marca
        varchar modelo
    }
    ORDEN_SERVICIO {
        bigint id_orden PK
        uuid id_cliente FK
        bigint id_vehiculo FK
        timestamptz fecha_ingreso
        varchar estado
    }
    SERVICIO {
        int id_servicio PK
        varchar nombre UK
        numeric tarifa_base
    }
    DETALLE_SERVICIO {
        bigint id_orden PK, FK
        int id_servicio PK, FK
        integer cantidad
        numeric tarifa_aplicada
    }`,
  sqlSample: `CREATE TABLE orden_servicio (
  id_orden BIGSERIAL PRIMARY KEY,
  id_cliente UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE RESTRICT,
  id_vehiculo BIGINT NOT NULL REFERENCES vehiculo(id_vehiculo) ON DELETE RESTRICT,
  fecha_ingreso TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  estado VARCHAR(20) NOT NULL DEFAULT 'INGRESADO'
);

CREATE TABLE detalle_servicio (
  id_orden BIGINT NOT NULL REFERENCES orden_servicio(id_orden) ON DELETE CASCADE,
  id_servicio INTEGER NOT NULL REFERENCES servicio(id_servicio) ON DELETE RESTRICT,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  tarifa_aplicada NUMERIC(10,2) NOT NULL CHECK (tarifa_aplicada >= 0),
  PRIMARY KEY (id_orden, id_servicio)
);`,
}
