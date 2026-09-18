import type { FunctionalDependency } from './masterclassTypes'

// Código Mermaid del ERD resultante de 3FN
export const mermaidModel = `erDiagram
    CIUDAD ||--o{ CLIENTE : "ubica a"
    CLIENTE ||--o{ FACTURA : "genera / compra"
    FACTURA ||--|{ DETALLE_FACTURA : "contiene"
    PRODUCTO ||--o{ DETALLE_FACTURA : "es vendido en"

    CIUDAD {
        varchar ciudad_id PK "Código de ciudad"
        varchar nombre_ciudad "Nombre de la ciudad"
        varchar departamento "Departamento o región"
    }

    CLIENTE {
        varchar cliente_id PK "Cédula o NIT del cliente"
        varchar nombre_completo "Nombres y apellidos"
        varchar telefono "Número de contacto"
        varchar direccion "Dirección física"
        varchar ciudad_id FK "Referencia a Ciudad"
    }

    FACTURA {
        varchar num_factura PK "Número de factura"
        date fecha "Fecha de emisión"
        varchar cliente_id FK "Cliente que compró"
    }

    DETALLE_FACTURA {
        varchar num_factura PK,FK "Factura a la que pertenece"
        varchar cod_producto PK,FK "Producto vendido"
        integer cantidad "Unidades vendidas"
        numeric precio_unitario_venta "Precio histórico transaccional"
    }

    PRODUCTO {
        varchar cod_producto PK "Código SKU del producto"
        varchar nombre_producto "Descripción del artículo"
        numeric precio_catalogo_base "Precio vigente en catálogo"
    }`

// Catálogo de dependencias funcionales para el Inspector Didáctico
export const functionalDependencies: Record<string, FunctionalDependency> = {
  nombre_producto: {
    attribute: 'nombre_producto (Descripción del artículo)',
    tableOrigin: 'ventas_1fn (tabla no normalizada)',
    pkCandidate: '(num_factura, cod_producto)',
    arrowNotation: 'cod_producto ──► nombre_producto',
    type: 'partial',
    label: 'Dependencia Parcial (Viola 2FN)',
    problem: 'Depende únicamente de cod_producto, no de num_factura. El nombre del taladro se repetiría en cada factura vendida, causando anomalías de actualización.',
    solution: 'Extraer a la tabla independiente «producto» donde cod_producto sea la clave primaria simple.',
  },
  cantidad: {
    attribute: 'cantidad (Unidades vendidas)',
    tableOrigin: 'detalle_factura',
    pkCandidate: '(num_factura, cod_producto)',
    arrowNotation: '(num_factura, cod_producto) ──► cantidad',
    type: 'total',
    label: 'Dependencia Total (Cumple 2FN y 3FN)',
    problem: 'Para saber cuántas unidades se vendieron, se requiere obligatoriamente saber en qué factura y de qué producto específico se trata.',
    solution: 'Permanece en la tabla asociativa «detalle_factura» con clave primaria compuesta.',
  },
  precio_unitario_venta: {
    attribute: 'precio_unitario_venta (Precio facturado)',
    tableOrigin: 'detalle_factura',
    pkCandidate: '(num_factura, cod_producto)',
    arrowNotation: '(num_factura, cod_producto) ──► precio_unitario_venta',
    type: 'snapshot',
    label: 'Snapshot Histórico Inmutable (Regla de Oro)',
    problem: 'Si solo existiera el precio en producto, una subida de precios por inflación cambiaría el total de facturas emitidas hace 5 años, alterando la contabilidad.',
    solution: 'Se congela como dato transaccional en «detalle_factura». Cumple 3FN porque es un hecho histórico irremplazable.',
  },
  cliente_nombre: {
    attribute: 'cliente_nombre (Nombre del comprador)',
    tableOrigin: 'factura_2fn',
    pkCandidate: 'num_factura',
    arrowNotation: 'num_factura ──► cliente_id ──► cliente_nombre',
    type: 'transitive',
    label: 'Dependencia Transitiva (Viola 3FN)',
    problem: 'num_factura determina quién compró (cliente_id), y este determina el nombre. Carlos Mendoza se repetiría en cada compra suya.',
    solution: 'Extraer a la tabla «cliente» con clave primaria cliente_id, dejando en factura solo la clave foránea (FK).',
  },
  departamento: {
    attribute: 'departamento (Región geográfica)',
    tableOrigin: 'cliente',
    pkCandidate: 'cliente_id',
    arrowNotation: 'cliente_id ──► ciudad_id ──► departamento',
    type: 'transitive',
    label: 'Dependencia Transitiva Geográfica (Viola 3FN)',
    problem: 'El departamento depende de la ciudad, no directamente de la persona. Si hay 10.000 clientes en Medellín, «Antioquia» se repetiría 10.000 veces.',
    solution: 'Extraer a la tabla maestra «ciudad» con ciudad_id como clave primaria.',
  },
}
