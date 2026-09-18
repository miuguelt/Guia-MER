import type { ProjectExample } from './types'

export const aiExerciseStatements = [
  { id: 's1', text: 'La IA dijo que CLIENTE y PRODUCTO son N:M; antes de aceptarlo debo preguntar cuántos productos aparecen en un pedido y cuántos pedidos contienen un producto.', answer: true, explanation: 'La cardinalidad se valida en las dos direcciones y depende de los hechos del dominio.' },
  { id: 's2', text: 'La IA generó una tabla TELEFONOS como texto separado por comas; es correcto porque ahorra una tabla.', answer: false, explanation: 'Una lista en una celda rompe atomicidad; modela un teléfono como filas hijas si tiene vida propia.' },
  { id: 's3', text: 'La IA eligió documento como PK porque parece único; debo evaluar un id técnico y dejar el documento como UQ alterna.', answer: true, explanation: 'La identidad técnica desacopla la relación interna de documentos que pueden cambiar o variar por país.' },
]

export const missingTopics = [
  { title: 'Normalización 1FN–3FN', why: 'Evita listas, dependencias parciales y dependencias transitivas que reintroducen anomalías.', exercise: 'Toma una fila de ventas repetida y separa sus grupos hasta que cada celda sea atómica.' },
  { title: 'Datos temporales y auditoría', why: 'El estado actual no siempre explica qué ocurrió, cuándo y quién lo cambió.', exercise: 'Añade created_at, updated_at y una decisión sobre historial para una orden cancelada.' },
  { title: 'Seguridad, privacidad y acceso', why: 'Un modelo correcto también minimiza PII, define roles y limita quién puede leer o modificar.', exercise: 'Clasifica documento, teléfono y dirección; propone enmascaramiento, retención y permisos.' },
  { title: 'Transacciones y concurrencia', why: 'Varias operaciones deben confirmar o revertirse juntas sin perder consistencia.', exercise: 'Describe la transacción de crear pedido + detalle y qué pasa si falla una línea.' },
  { title: 'Índices y planes de consulta', why: 'Las FK y búsquedas frecuentes necesitan soporte físico, pero cada índice tiene costo de escritura.', exercise: 'Elige dos índices justificándolos por una consulta real, no por intuición.' },
  { title: 'Migraciones y versionado', why: 'El esquema cambia; una migración reproducible evita editar producción a mano.', exercise: 'Escribe el plan para agregar un campo NOT NULL sin romper datos existentes.' },
  { title: 'Pruebas y calidad de datos', why: 'Constraints, casos límite y datos de prueba convierten el diseño en evidencia.', exercise: 'Crea casos de alta, duplicado, FK inexistente, borrado padre y actualización de UQ.' },
  { title: 'OLTP, analítica y NoSQL', why: 'El modelo depende del propósito: operación transaccional, reportes, documentos o grafos.', exercise: 'Explica cuándo separarías el esquema operacional de un modelo dimensional.' },
]

export const projectExamples: ProjectExample[] = [
  {
    label: 'Biblioteca',
    text: 'Una biblioteca necesita registrar aprendices, libros, préstamos, fechas de salida y fechas de devolución. Un aprendiz puede tener varios préstamos y un libro puede aparecer en muchos préstamos.',
    diagramCode: `erDiagram
    APRENDIZ ||--o{ PRESTAMO : "solicita"
    LIBRO ||--o{ PRESTAMO : "se entrega en"
    APRENDIZ { uuid id_aprendiz PK\n        varchar documento UK\n        varchar nombre_completo\n        varchar email UK\n        varchar telefono }
    LIBRO { bigint id_libro PK\n        varchar isbn UK\n        varchar titulo\n        varchar autor\n        int ejemplares_disponibles }
    PRESTAMO { bigint id_prestamo PK\n        uuid id_aprendiz FK\n        bigint id_libro FK\n        date fecha_salida\n        date fecha_devolucion_pactada\n        date fecha_devolucion_real\n        varchar estado }`,
    sqlCode: `CREATE TABLE aprendiz (\n  id_aprendiz UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  documento VARCHAR(20) NOT NULL UNIQUE,\n  nombre_completo VARCHAR(150) NOT NULL,\n  email VARCHAR(120) NOT NULL UNIQUE,\n  telefono VARCHAR(25)\n);\n\nCREATE TABLE libro (\n  id_libro BIGSERIAL PRIMARY KEY,\n  isbn VARCHAR(20) NOT NULL UNIQUE,\n  titulo VARCHAR(200) NOT NULL,\n  autor VARCHAR(150) NOT NULL,\n  ejemplares_disponibles INTEGER NOT NULL DEFAULT 1 CHECK (ejemplares_disponibles >= 0)\n);\n\nCREATE TABLE prestamo (\n  id_prestamo BIGSERIAL PRIMARY KEY,\n  id_aprendiz UUID NOT NULL REFERENCES aprendiz(id_aprendiz) ON DELETE RESTRICT,\n  id_libro BIGINT NOT NULL REFERENCES libro(id_libro) ON DELETE RESTRICT,\n  fecha_salida DATE NOT NULL DEFAULT CURRENT_DATE,\n  fecha_devolucion_pactada DATE NOT NULL,\n  fecha_devolucion_real DATE,\n  estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'DEVUELTO', 'MOROSO')),\n  CONSTRAINT chk_fechas CHECK (fecha_devolucion_pactada >= fecha_salida)\n);`,
    requirement: { entity: 'APRENDIZ, LIBRO, PRESTAMO', relation: 'APRENDIZ 1:N PRESTAMO N:1 LIBRO (N:M)', test: 'Registrar préstamo activo y verificar que fecha de devolución sea posterior o igual a la salida' },
  },
  {
    label: 'Veterinaria',
    text: 'Una veterinaria necesita registrar mascotas, propietarios, citas y servicios realizados.',
    diagramCode: `erDiagram
    PROPIETARIO ||--o{ MASCOTA : "posee"
    MASCOTA ||--o{ CITA_VETERINARIA : "recibe"
    CITA_VETERINARIA ||--o{ DETALLE_CITA_SERVICIO : "incluye"
    SERVICIO_VETERINARIO ||--o{ DETALLE_CITA_SERVICIO : "prestado en"
    PROPIETARIO { uuid id_propietario PK\n        varchar documento UK\n        varchar nombre_completo\n        varchar telefono\n        varchar direccion }
    MASCOTA { bigint id_mascota PK\n        uuid id_propietario FK\n        varchar nombre\n        varchar especie\n        varchar raza\n        date fecha_nacimiento }
    CITA_VETERINARIA { bigint id_cita PK\n        bigint id_mascota FK\n        timestamptz fecha_hora\n        varchar motivo\n        varchar estado }
    SERVICIO_VETERINARIO { int id_servicio PK\n        varchar nombre UK\n        numeric precio_base }
    DETALLE_CITA_SERVICIO { bigint id_cita PK, FK\n        int id_servicio PK, FK\n        int cantidad\n        numeric precio_aplicado }`,
    sqlCode: `CREATE TABLE propietario (\n  id_propietario UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  documento VARCHAR(20) NOT NULL UNIQUE,\n  nombre_completo VARCHAR(150) NOT NULL,\n  telefono VARCHAR(25) NOT NULL,\n  direccion VARCHAR(180)\n);\n\nCREATE TABLE mascota (\n  id_mascota BIGSERIAL PRIMARY KEY,\n  id_propietario UUID NOT NULL REFERENCES propietario(id_propietario) ON DELETE RESTRICT,\n  nombre VARCHAR(80) NOT NULL,\n  especie VARCHAR(50) NOT NULL,\n  raza VARCHAR(80),\n  fecha_nacimiento DATE\n);\n\nCREATE TABLE cita_veterinaria (\n  id_cita BIGSERIAL PRIMARY KEY,\n  id_mascota BIGINT NOT NULL REFERENCES mascota(id_mascota) ON DELETE RESTRICT,\n  fecha_hora TIMESTAMPTZ NOT NULL,\n  motivo VARCHAR(200) NOT NULL,\n  estado VARCHAR(20) NOT NULL DEFAULT 'PROGRAMADA' CHECK (estado IN ('PROGRAMADA', 'ATENDIDA', 'CANCELADA'))\n);\n\nCREATE TABLE servicio_veterinario (\n  id_servicio SERIAL PRIMARY KEY,\n  nombre VARCHAR(100) NOT NULL UNIQUE,\n  precio_base NUMERIC(10,2) NOT NULL CHECK (precio_base >= 0)\n);\n\nCREATE TABLE detalle_cita_servicio (\n  id_cita BIGINT NOT NULL REFERENCES cita_veterinaria(id_cita) ON DELETE CASCADE,\n  id_servicio INTEGER NOT NULL REFERENCES servicio_veterinario(id_servicio) ON DELETE RESTRICT,\n  cantidad INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),\n  precio_aplicado NUMERIC(10,2) NOT NULL CHECK (precio_aplicado >= 0),\n  PRIMARY KEY (id_cita, id_servicio)\n);`,
    requirement: { entity: 'PROPIETARIO, MASCOTA, CITA_VETERINARIA', relation: 'PROPIETARIO 1:N MASCOTA 1:N CITA_VETERINARIA', test: 'Agendar cita para mascota registrada y liquidar servicios aplicados con su precio' },
  },
  {
    label: 'Tienda',
    text: 'Una tienda necesita registrar clientes, pedidos y productos. Un pedido tiene varios productos, un producto puede estar en muchos pedidos.',
    diagramCode: `erDiagram
    CLIENTE ||--o{ PEDIDO : "realiza"
    PEDIDO ||--o{ DETALLE_PEDIDO : "contiene"
    PRODUCTO ||--o{ DETALLE_PEDIDO : "incluido en"
    CLIENTE { uuid id_cliente PK\n        varchar documento UK\n        varchar nombre\n        varchar email UK }
    PRODUCTO { bigint id_producto PK\n        varchar codigo UK\n        varchar nombre\n        numeric precio_actual\n        int stock }
    PEDIDO { bigint id_pedido PK\n        uuid id_cliente FK\n        timestamptz fecha_pedido\n        varchar estado\n        numeric total }
    DETALLE_PEDIDO { bigint id_pedido PK, FK\n        bigint id_producto PK, FK\n        int cantidad\n        numeric precio_unitario }`,
    sqlCode: `CREATE TABLE cliente (\n  id_cliente UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  documento VARCHAR(20) NOT NULL UNIQUE,\n  nombre VARCHAR(120) NOT NULL,\n  email VARCHAR(120) NOT NULL UNIQUE\n);\n\nCREATE TABLE producto (\n  id_producto BIGSERIAL PRIMARY KEY,\n  codigo VARCHAR(30) NOT NULL UNIQUE,\n  nombre VARCHAR(120) NOT NULL,\n  precio_actual NUMERIC(12,2) NOT NULL CHECK (precio_actual >= 0),\n  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0)\n);\n\nCREATE TABLE pedido (\n  id_pedido BIGSERIAL PRIMARY KEY,\n  id_cliente UUID NOT NULL REFERENCES cliente(id_cliente) ON DELETE RESTRICT,\n  fecha_pedido TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'PAGADO', 'ENVIADO', 'CANCELADO')),\n  total NUMERIC(12,2) NOT NULL DEFAULT 0.00 CHECK (total >= 0)\n);\n\nCREATE TABLE detalle_pedido (\n  id_pedido BIGINT NOT NULL REFERENCES pedido(id_pedido) ON DELETE CASCADE,\n  id_producto BIGINT NOT NULL REFERENCES producto(id_producto) ON DELETE RESTRICT,\n  cantidad INTEGER NOT NULL CHECK (cantidad > 0),\n  precio_unitario NUMERIC(12,2) NOT NULL CHECK (precio_unitario >= 0),\n  PRIMARY KEY (id_pedido, id_producto)\n);`,
    requirement: { entity: 'CLIENTE, PEDIDO, PRODUCTO', relation: 'CLIENTE 1:N PEDIDO 1:N DETALLE_PEDIDO N:1 PRODUCTO (N:M)', test: 'Registrar pedido con líneas de detalle y validar congelación de precio unitario' },
  },
]
