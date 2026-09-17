import type { SystemCaseStudy } from '../types'

export const ecommerceCase: SystemCaseStudy = {
  id: 'ecommerce',
  title: 'Sistema de Comercio Electrónico (E-commerce)',
  category: 'Ventas y Logística Digital',
  narrative: `Una tienda en línea requiere gestionar su catálogo de productos organizados por categorías. Cada producto tiene nombre, descripción, precio actual y stock disponible. Los clientes se registran con su correo, contraseña, nombre y pueden registrar múltiples direcciones de entrega. Un cliente puede realizar múltiples pedidos en distintas fechas. Cada pedido tiene un estado (pendiente, pagado, enviado, cancelado), una fecha y se envía a una dirección específica del cliente. Un pedido contiene uno o más productos, y para cada producto en el pedido se debe registrar la cantidad comprada y el precio unitario pactado al momento de la compra (ya que el precio del catálogo puede cambiar después). Finalmente, cada pedido registra uno o varios intentos de pago con un método (tarjeta, transferencia), monto y fecha.`,
  entities: [
    {
      name: 'CLIENTE',
      description: 'Persona que se registra y realiza compras en la plataforma.',
      attributes: [
        { name: 'id_cliente', type: 'UUID', role: 'PK', description: 'Identificador técnico único.' },
        { name: 'email', type: 'VARCHAR(120)', role: 'UQ', description: 'Correo de acceso y contacto.' },
        { name: 'nombre_completo', type: 'VARCHAR(150)', role: 'ATTR', description: 'Nombre visible del cliente.' },
        { name: 'password_hash', type: 'VARCHAR(255)', role: 'ATTR', description: 'Hash seguro de contraseña.' },
      ],
    },
    {
      name: 'DIRECCION_ENTREGA',
      description: 'Direcciones físicas registradas por el cliente.',
      attributes: [
        { name: 'id_direccion', type: 'BIGINT', role: 'PK', description: 'Identificador de la dirección.' },
        { name: 'id_cliente', type: 'UUID', role: 'FK', description: 'Cliente al que pertenece la dirección.' },
        { name: 'linea_direccion', type: 'VARCHAR(200)', role: 'ATTR', description: 'Calle, carrera o número.' },
        { name: 'ciudad', type: 'VARCHAR(80)', role: 'ATTR', description: 'Ciudad de entrega.' },
        { name: 'es_principal', type: 'BOOLEAN', role: 'ATTR', description: 'Indica si es la dirección favorita.' },
      ],
    },
    {
      name: 'CATEGORIA',
      description: 'Clasificación jerárquica o temática de productos.',
      attributes: [
        { name: 'id_categoria', type: 'INTEGER', role: 'PK', description: 'Identificador de la categoría.' },
        { name: 'nombre', type: 'VARCHAR(60)', role: 'UQ', description: 'Nombre de la categoría.' },
        { name: 'slug', type: 'VARCHAR(60)', role: 'UQ', description: 'URL amigable.' },
      ],
    },
    {
      name: 'PRODUCTO',
      description: 'Artículo disponible para venta en el catálogo.',
      attributes: [
        { name: 'id_producto', type: 'BIGINT', role: 'PK', description: 'Identificador del producto.' },
        { name: 'id_categoria', type: 'INTEGER', role: 'FK', description: 'Categoría a la que pertenece.' },
        { name: 'sku', type: 'VARCHAR(40)', role: 'UQ', description: 'Código único de inventario.' },
        { name: 'nombre', type: 'VARCHAR(150)', role: 'ATTR', description: 'Nombre comercial del producto.' },
        { name: 'precio_actual', type: 'NUMERIC(12,2)', role: 'ATTR', description: 'Precio de venta vigente.' },
        { name: 'stock', type: 'INTEGER', role: 'ATTR', description: 'Unidades en bodega.' },
      ],
    },
    {
      name: 'PEDIDO',
      description: 'Encabezado de la transacción de compra realizada por el cliente.',
      attributes: [
        { name: 'id_pedido', type: 'BIGINT', role: 'PK', description: 'Número único de orden.' },
        { name: 'id_cliente', type: 'UUID', role: 'FK', description: 'Cliente que realizó el pedido.' },
        { name: 'id_direccion', type: 'BIGINT', role: 'FK', description: 'Dirección de destino elegida.' },
        { name: 'fecha_creacion', type: 'TIMESTAMPTZ', role: 'ATTR', description: 'Momento de emisión.' },
        { name: 'estado', type: 'VARCHAR(20)', role: 'ATTR', description: 'PENDIENTE, PAGADO, ENVIADO, etc.' },
        { name: 'total', type: 'NUMERIC(12,2)', role: 'DERIVED', description: 'Suma de detalles calculada.' },
      ],
    },
    {
      name: 'DETALLE_PEDIDO',
      description: 'Tabla asociativa N:M entre Pedido y Producto con datos de la transacción.',
      isWeak: true,
      attributes: [
        { name: 'id_pedido', type: 'BIGINT', role: 'PK', description: 'FK al pedido padre.' },
        { name: 'id_producto', type: 'BIGINT', role: 'PK', description: 'FK al producto comprado.' },
        { name: 'cantidad', type: 'INTEGER', role: 'ATTR', description: 'Número de unidades compradas.' },
        { name: 'precio_unitario', type: 'NUMERIC(12,2)', role: 'ATTR', description: 'Precio pactado en ese instante.' },
        { name: 'subtotal', type: 'NUMERIC(12,2)', role: 'DERIVED', description: 'cantidad * precio_unitario.' },
      ],
    },
    {
      name: 'PAGO',
      description: 'Registro de cobro y liquidación financiera del pedido.',
      attributes: [
        { name: 'id_pago', type: 'BIGINT', role: 'PK', description: 'Identificador del pago.' },
        { name: 'id_pedido', type: 'BIGINT', role: 'FK', description: 'Pedido asociado al pago.' },
        { name: 'metodo', type: 'VARCHAR(30)', role: 'ATTR', description: 'TARJETA, PSE, TRANSFERENCIA.' },
        { name: 'monto', type: 'NUMERIC(12,2)', role: 'ATTR', description: 'Valor cancelado.' },
        { name: 'fecha_pago', type: 'TIMESTAMPTZ', role: 'ATTR', description: 'Fecha y hora del pago.' },
      ],
    },
  ],
  relations: [
    {
      source: 'CLIENTE',
      target: 'DIRECCION_ENTREGA',
      verb: 'registra',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un cliente puede tener 0 o muchas direcciones; cada dirección pertenece obligatoriamente a un cliente.',
    },
    {
      source: 'CATEGORIA',
      target: 'PRODUCTO',
      verb: 'clasifica',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Una categoría agrupa varios productos; cada producto pertenece a una categoría.',
    },
    {
      source: 'CLIENTE',
      target: 'PEDIDO',
      verb: 'realiza',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un cliente puede tener 0 pedidos al inicio y muchos en el tiempo; un pedido pertenece a un solo cliente.',
    },
    {
      source: 'PEDIDO',
      target: 'PRODUCTO',
      verb: 'contiene (vía DETALLE_PEDIDO)',
      cardinality: 'N:M',
      leftMinMax: '(1,N)',
      rightMinMax: '(0,N)',
      explanation: 'Un pedido contiene al menos 1 producto; un producto puede estar en muchos pedidos. Nace tabla puente DETALLE_PEDIDO con precio_unitario histórico.',
      attributes: ['cantidad', 'precio_unitario'],
    },
    {
      source: 'PEDIDO',
      target: 'PAGO',
      verb: 'se liquida con',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un pedido puede tener varios intentos de pago o pagos fraccionados; cada pago corresponde a un pedido.',
    },
  ],
  mermaid: `erDiagram
    CLIENTE ||--o{ DIRECCION_ENTREGA : "registra"
    CLIENTE ||--o{ PEDIDO : "realiza"
    DIRECCION_ENTREGA ||--o{ PEDIDO : "recibe"
    CATEGORIA ||--o{ PRODUCTO : "clasifica"
    PEDIDO ||--|{ DETALLE_PEDIDO : "incluye"
    PRODUCTO ||--o{ DETALLE_PEDIDO : "aparece en"
    PEDIDO ||--o{ PAGO : "liquida con"

    CLIENTE {
        uuid id_cliente PK
        varchar email UK
        varchar nombre_completo
        varchar password_hash
    }
    DIRECCION_ENTREGA {
        bigint id_direccion PK
        uuid id_cliente FK
        varchar linea_direccion
        varchar ciudad
        boolean es_principal
    }
    CATEGORIA {
        int id_categoria PK
        varchar nombre UK
        varchar slug UK
    }
    PRODUCTO {
        bigint id_producto PK
        int id_categoria FK
        varchar sku UK
        varchar nombre
        numeric precio_actual
        int stock
    }
    PEDIDO {
        bigint id_pedido PK
        uuid id_cliente FK
        bigint id_direccion FK
        timestamptz fecha_creacion
        varchar estado
    }
    DETALLE_PEDIDO {
        bigint id_pedido PK, FK
        bigint id_producto PK, FK
        int cantidad
        numeric precio_unitario
    }
    PAGO {
        bigint id_pago PK
        bigint id_pedido FK
        varchar metodo
        numeric monto
        timestamptz fecha_pago
    }`,
  sqlSample: `CREATE TABLE cliente (
  id_cliente UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(120) NOT NULL UNIQUE,
  nombre_completo VARCHAR(150) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE pedido (
  id_pedido BIGSERIAL PRIMARY KEY,
  id_cliente UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE RESTRICT,
  id_direccion BIGINT NOT NULL REFERENCES direccion_entrega(id_direccion) ON DELETE RESTRICT,
  fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE'
);

CREATE TABLE detalle_pedido (
  id_pedido BIGINT NOT NULL REFERENCES pedido(id_pedido) ON DELETE CASCADE,
  id_producto BIGINT NOT NULL REFERENCES producto(id_producto) ON DELETE RESTRICT,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(12,2) NOT NULL CHECK (precio_unitario >= 0),
  PRIMARY KEY (id_pedido, id_producto)
);`,
}
