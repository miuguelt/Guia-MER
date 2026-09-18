export type TableDestination = 'orden_compra' | 'detalle_orden' | 'insumo' | 'proveedor' | 'ciudad'

export interface TableDefinition {
  id: TableDestination
  name: string
  description: string
  pkLabel: string
  color: string
}

export interface DocumentAttribute {
  id: string
  name: string
  description: string
  correctTable: TableDestination
  anomalyIfWrong: Record<string, string>
}

export const tableDefinitions: TableDefinition[] = [
  {
    id: 'orden_compra',
    name: 'ORDEN_COMPRA',
    description: 'Cabecera transaccional del pedido emitido.',
    pkLabel: 'PK: num_orden',
    color: 'var(--cyan)',
  },
  {
    id: 'detalle_orden',
    name: 'DETALLE_ORDEN',
    description: 'Tabla asociativa N:M que registra cantidades y costos aplicados.',
    pkLabel: 'PK: (num_orden, cod_insumo)',
    color: 'var(--lime)',
  },
  {
    id: 'insumo',
    name: 'INSUMO',
    description: 'Catálogo maestro de materiales y especificaciones.',
    pkLabel: 'PK: cod_insumo',
    color: 'var(--amber)',
  },
  {
    id: 'proveedor',
    name: 'PROVEEDOR',
    description: 'Entidad maestra con datos fiscales de la empresa suministradora.',
    pkLabel: 'PK: proveedor_nit',
    color: 'var(--indigo)',
  },
  {
    id: 'ciudad',
    name: 'CIUDAD',
    description: 'Entidad geográfica independiente para evitar redundancia territorial.',
    pkLabel: 'PK: ciudad_id',
    color: '#ec4899',
  },
]

export const documentAttributes: DocumentAttribute[] = [
  {
    id: 'num_orden',
    name: 'num_orden',
    description: 'Identificador único de la orden (ej. OC-4020)',
    correctTable: 'orden_compra',
    anomalyIfWrong: {
      detalle_orden: 'num_orden es la clave de la cabecera. En detalle_orden actúa como clave foránea, pero su hogar principal es ORDEN_COMPRA.',
      insumo: 'num_orden no describe al material del catálogo; pertenece a la transacción de compra.',
      proveedor: 'num_orden es una transacción, no un atributo del proveedor.',
      ciudad: 'num_orden no tiene relación con la entidad geográfica.',
    },
  },
  {
    id: 'fecha_emision',
    name: 'fecha_emision',
    description: 'Momento en que se emitió el pedido (ej. 2026-09-17)',
    correctTable: 'orden_compra',
    anomalyIfWrong: {
      detalle_orden: 'Dependencia Parcial (2FN): La fecha depende del número de orden, no del insumo específico. Debe estar en la cabecera.',
      insumo: 'Un insumo de almacén no tiene fecha de emisión de orden.',
      proveedor: 'El proveedor existe independientemente de la fecha en que se le compra.',
      ciudad: 'La ciudad no tiene fecha de emisión.',
    },
  },
  {
    id: 'proveedor_nit',
    name: 'proveedor_nit',
    description: 'Identificación tributaria del proveedor (ej. 890.123.456-7)',
    correctTable: 'proveedor',
    anomalyIfWrong: {
      orden_compra: 'En ORDEN_COMPRA viaja únicamente como clave foránea (FK), pero como entidad maestra su clave primaria reside en PROVEEDOR.',
      detalle_orden: 'El proveedor no depende de la combinación de orden e insumo.',
      insumo: 'Un insumo puede ser suministrado por diferentes proveedores a lo largo del tiempo.',
      ciudad: 'El NIT no pertenece a la tabla de ciudades.',
    },
  },
  {
    id: 'proveedor_razon_social',
    name: 'proveedor_razon_social',
    description: 'Nombre comercial de la empresa (ej. Cementos del Valle S.A.)',
    correctTable: 'proveedor',
    anomalyIfWrong: {
      orden_compra: 'Dependencia Transitiva (3FN): La razón social depende del NIT del proveedor (num_orden -> proveedor_nit -> razon_social). Si cambia de nombre, habría que actualizar todas las órdenes históricas.',
      detalle_orden: 'Viola 2FN y 3FN: La razón social no depende de la clave compuesta de los ítems.',
      insumo: 'La razón social describe a la empresa que vende, no al material.',
      ciudad: 'La razón social no describe a una ciudad.',
    },
  },
  {
    id: 'proveedor_telefono',
    name: 'proveedor_telefono',
    description: 'Línea de atención telefónica del proveedor',
    correctTable: 'proveedor',
    anomalyIfWrong: {
      orden_compra: 'Dependencia Transitiva (3FN): El teléfono depende directamente del proveedor_nit, no del num_orden.',
      detalle_orden: 'El teléfono del proveedor no depende de los insumos ordenados.',
      insumo: 'El insumo no tiene número telefónico.',
      ciudad: 'El teléfono pertenece a la empresa, no a la ciudad geográfica.',
    },
  },
  {
    id: 'proveedor_ciudad',
    name: 'ciudad_id (FK)',
    description: 'Referencia foránea a la ciudad de operación del proveedor',
    correctTable: 'proveedor',
    anomalyIfWrong: {
      orden_compra: 'La ubicación fiscal es un atributo del proveedor, no de la orden de compra.',
      detalle_orden: 'No tiene relación con la línea de pedido.',
      insumo: 'El insumo no reside en una ciudad del proveedor.',
      ciudad: 'En CIUDAD esta columna es la Clave Primaria (ciudad_id); en PROVEEDOR se almacena como clave foránea.',
    },
  },
  {
    id: 'departamento_ciudad',
    name: 'departamento',
    description: 'Región político-administrativa (ej. Valle del Cauca)',
    correctTable: 'ciudad',
    anomalyIfWrong: {
      proveedor: 'Dependencia Transitiva (3FN): El departamento depende de la ciudad, no del proveedor. Si varios proveedores están en Cali, repetirías "Valle del Cauca" innecesariamente.',
      orden_compra: 'El departamento no depende de la orden de compra.',
      detalle_orden: 'No depende de la línea de ítem.',
      insumo: 'El insumo no tiene departamento geográfico.',
    },
  },
  {
    id: 'cod_insumo',
    name: 'cod_insumo',
    description: 'Código de inventario o SKU del material (ej. INS-902)',
    correctTable: 'insumo',
    anomalyIfWrong: {
      orden_compra: 'Una orden compra muchos insumos; no puedes colocar un solo código en la cabecera sin violar la 1FN (atomicidad).',
      detalle_orden: 'En DETALLE_ORDEN forma parte de la clave compuesta como FK, pero su tabla maestra de origen es INSUMO.',
      proveedor: 'El código del material no es un atributo del proveedor.',
      ciudad: 'No tiene relación con la ciudad.',
    },
  },
  {
    id: 'descripcion_insumo',
    name: 'descripcion_insumo',
    description: 'Nombre descriptivo del artículo (ej. Cemento Portland Tipo 1 50kg)',
    correctTable: 'insumo',
    anomalyIfWrong: {
      detalle_orden: 'Dependencia Parcial (2FN): La descripción depende únicamente de cod_insumo, NO de la orden. Si se compran 50 sacos en 30 órdenes, el texto se duplicaría 30 veces.',
      orden_compra: 'En la cabecera violaría la 1FN y la 2FN.',
      proveedor: 'El material no describe al proveedor.',
      ciudad: 'No corresponde a ciudad.',
    },
  },
  {
    id: 'cantidad_pedida',
    name: 'cantidad_pedida',
    description: 'Número de unidades o empaques solicitados en el pedido (ej. 120)',
    correctTable: 'detalle_orden',
    anomalyIfWrong: {
      orden_compra: 'Una orden tiene múltiples artículos con distintas cantidades. En la cabecera violaría la 1FN.',
      insumo: 'La cantidad pedida no es fija del catálogo; varía en cada orden de compra.',
      proveedor: 'El proveedor no tiene una cantidad pedida fija.',
      ciudad: 'No corresponde a ciudad.',
    },
  },
  {
    id: 'precio_unitario_acordado',
    name: 'precio_unitario_acordado',
    description: 'Precio de compra pactado en la transacción (Snapshot histórico)',
    correctTable: 'detalle_orden',
    anomalyIfWrong: {
      insumo: '¡Grave error de trazabilidad de costos! Si guardas el precio acordado en el catálogo del insumo, cuando el precio suba alterarás los costos de órdenes emitidas y cerradas en meses anteriores.',
      orden_compra: 'Cada insumo de la orden tiene su propio precio pactado; en la cabecera violaría la 1FN.',
      proveedor: 'El precio es por insumo específico en esa compra, no del proveedor en general.',
      ciudad: 'No corresponde a ciudad.',
    },
  },
]
