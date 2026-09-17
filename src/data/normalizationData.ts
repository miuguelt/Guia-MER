export interface NormalizationStage {
  nf: '1FN' | '2FN' | '3FN'
  name: string
  rule: string
  problemDescription: string
  badTable: {
    name: string
    columns: string[]
    rows: Array<Array<string>>
  }
  anomalyDetected: string
  fixedTables: Array<{
    name: string
    columns: string[]
    rows: Array<Array<string>>
    keyNote: string
  }>
  howToAchieve: string[]
}

export const normalizationStages: NormalizationStage[] = [
  {
    nf: '1FN',
    name: 'Primera Forma Normal: Atomicidad y Sin Grupos Repetitivos',
    rule: 'Cada columna debe contener valores atómicos (indivisibles) y no deben existir listas, arrays o columnas repetitivas (tel1, tel2, tel3).',
    problemDescription: 'Una tabla donde una celda guarda múltiples valores separados por comas, o existen columnas duplicadas para el mismo concepto.',
    badTable: {
      name: 'PEDIDO_NO_ATOMICO',
      columns: ['id_pedido', 'cliente', 'productos_comprados', 'cantidades'],
      rows: [
        ['101', 'Camila Rojas', 'Teclado Mecánico, Mouse Ergonómico', '1, 2'],
        ['102', 'David Torres', 'Monitor 27"', '1'],
        ['103', 'Camila Rojas', 'Cable HDMI, Soporte Portátil', '2, 1'],
      ],
    },
    anomalyDetected: 'No se puede consultar fácilmente si se vendió "Mouse Ergonómico" con un WHERE estándar; no se puede calcular el stock por producto ni forzar tipos de datos numéricos en cantidades.',
    fixedTables: [
      {
        name: 'PEDIDO',
        columns: ['id_pedido', 'cliente'],
        rows: [
          ['101', 'Camila Rojas'],
          ['102', 'David Torres'],
          ['103', 'Camila Rojas'],
        ],
        keyNote: 'Tabla padre con clave primaria id_pedido.',
      },
      {
        name: 'DETALLE_PEDIDO',
        columns: ['id_pedido', 'producto', 'cantidad'],
        rows: [
          ['101', 'Teclado Mecánico', '1'],
          ['101', 'Mouse Ergonómico', '2'],
          ['102', 'Monitor 27"', '1'],
          ['103', 'Cable HDMI', '2'],
          ['103', 'Soporte Portátil', '1'],
        ],
        keyNote: 'Tabla hija donde cada celda es atómica. Clave primaria compuesta (id_pedido, producto).',
      },
    ],
    howToAchieve: [
      'Identifica celdas que contienen listas o datos compuestos.',
      'Crea una fila separada por cada elemento del valor múltiple o descompón a una tabla dependiente.',
      'Asegúrate de que cada columna guarde un solo valor del tipo de dato correspondiente.',
    ],
  },
  {
    nf: '2FN',
    name: 'Segunda Forma Normal: Dependencia Funcional Completa',
    rule: 'Debe estar en 1FN y ningún atributo no clave debe depender parcialmente de una clave primaria compuesta.',
    problemDescription: 'Ocurre en tablas con PK compuesta donde un atributo solo depende de una de las dos partes de la clave, generando redundancia.',
    badTable: {
      name: 'DETALLE_PEDIDO_CON_REDUNDANCIA',
      columns: ['id_pedido', 'id_producto', 'cantidad', 'nombre_producto', 'categoria_producto'],
      rows: [
        ['101', 'PROD-1', '1', 'Teclado Mecánico', 'Periféricos'],
        ['101', 'PROD-2', '2', 'Mouse Ergonómico', 'Periféricos'],
        ['103', 'PROD-1', '3', 'Teclado Mecánico', 'Periféricos'],
      ],
    },
    anomalyDetected: 'nombre_producto y categoria_producto dependen SOLO de id_producto, no de id_pedido. Si el teclado cambia de nombre, hay que actualizarlo en cada pedido (Anomalía de Actualización).',
    fixedTables: [
      {
        name: 'PRODUCTO',
        columns: ['id_producto', 'nombre_producto', 'categoria_producto'],
        rows: [
          ['PROD-1', 'Teclado Mecánico', 'Periféricos'],
          ['PROD-2', 'Mouse Ergonómico', 'Periféricos'],
        ],
        keyNote: 'Los atributos del producto dependen exclusivamente de id_producto (lado 1).',
      },
      {
        name: 'DETALLE_PEDIDO',
        columns: ['id_pedido', 'id_producto', 'cantidad'],
        rows: [
          ['101', 'PROD-1', '1'],
          ['101', 'PROD-2', '2'],
          ['103', 'PROD-1', '3'],
        ],
        keyNote: 'cantidad depende de la combinación completa (id_pedido + id_producto).',
      },
    ],
    howToAchieve: [
      'Revisa cada atributo no clave en tablas con PK compuesta.',
      'Pregúntate: "¿Este dato depende de la clave completa o solo de una de sus partes?".',
      'Si depende solo de una parte, extráelo a la tabla donde esa parte sea la clave primaria completa.',
    ],
  },
  {
    nf: '3FN',
    name: 'Tercera Forma Normal: Sin Dependencias Transitivas',
    rule: 'Debe estar en 2FN y ningún atributo no clave debe depender de otro atributo no clave (X → Y → Z).',
    problemDescription: 'Una tabla donde un atributo depende indirectamente de la clave primaria a través de otro atributo descriptivo.',
    badTable: {
      name: 'CLIENTE_CON_TRANSITIVIDAD',
      columns: ['id_cliente', 'nombre', 'codigo_postal', 'ciudad', 'departamento'],
      rows: [
        ['C-01', 'Camila Rojas', '110111', 'Bogotá', 'Cundinamarca'],
        ['C-02', 'Mateo Gómez', '110111', 'Bogotá', 'Cundinamarca'],
        ['C-03', 'Lucía Parra', '050001', 'Medellín', 'Antioquia'],
      ],
    },
    anomalyDetected: 'ciudad y departamento dependen del codigo_postal, y este depende de id_cliente. Si se registran 10,000 clientes en Bogotá, se repite "Bogotá" y "Cundinamarca" 10,000 veces.',
    fixedTables: [
      {
        name: 'UBICACION_POSTAL',
        columns: ['codigo_postal', 'ciudad', 'departamento'],
        rows: [
          ['110111', 'Bogotá', 'Cundinamarca'],
          ['050001', 'Medellín', 'Antioquia'],
        ],
        keyNote: 'Elimina la duplicación geográfica masiva; una sola fuente de verdad.',
      },
      {
        name: 'CLIENTE',
        columns: ['id_cliente', 'nombre', 'codigo_postal'],
        rows: [
          ['C-01', 'Camila Rojas', '110111'],
          ['C-02', 'Mateo Gómez', '110111'],
          ['C-03', 'Lucía Parra', '050001'],
        ],
        keyNote: 'Cliente solo referencia codigo_postal como FK. Se eliminó la transitividad.',
      },
    ],
    howToAchieve: [
      'Identifica si un campo no clave determina el valor de otro campo no clave.',
      'Separa la entidad intermedia a su propia tabla con su propio identificador.',
      'Deja en la tabla original solo la clave foránea (FK) hacia la nueva tabla.',
    ],
  },
]
