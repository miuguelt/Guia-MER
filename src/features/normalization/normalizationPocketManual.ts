/**
 * Generador del Manual de Bolsillo: Normalización 1FN-3FN para el Desarrollador de Software.
 * Documento de referencia técnica descargable en Markdown para aprendices ADSO y profesionales.
 * Cumple con la política lingüística es-CO y el estándar DevBrain v8.10.
 */

export function buildNormalizationPocketManualMarkdown(): string {
  return `# Manual de Bolsillo: Normalización Relacional (1FN a 3FN)
## Guía Metodológica de Ingeniería de Software: Del Documento Fuente al Esquema de Base de Datos
**Programa:** Análisis y Desarrollo de Software (ADSO) — SENA  
**Área:** Diseño y Modelado de Bases de Datos Relacionales  
**Autor:** DataGenesis · Guía Interactiva MER  
**Versión:** 2.0 (Edición para Desarrolladores)  
**Idioma:** Español (Colombia) — es-CO  

---

## 1. Fundamentos: ¿Por Qué Normalizamos?

En el desarrollo de software moderno, una base de datos mal estructurada no solo desperdicia espacio en disco:
1. **Rompe la integridad transaccional:** Modificar el precio de un artículo en un registro deja inconsistentes los registros históricos.
2. **Genera código frágil:** El backend debe escribir múltiples validaciones y \`UPDATE\` en cascada para evitar datos huérfanos.
3. **Provoca anomalías operativas críticas:**
   - **Anomalía de Inserción:** Imposibilidad de registrar un cliente nuevo hasta que no realice su primera compra.
   - **Anomalía de Modificación:** Si un cliente cambia de teléfono, hay que actualizar decenas de filas; si una falla, los datos quedan desincronizados.
   - **Anomalía de Eliminación:** Si se anula la única factura de un cliente, se pierde su nombre, dirección y existencia en el sistema.

La **Normalización Relacional** (propuesta formalmente por Edgar F. Codd) es la técnica algorítmica para descomponer tablas complejas en esquemas más pequeños y limpios, asegurando que **cada dato se almacene en un único lugar lógico (Single Source of Truth - SSoT)**, sin pérdida de información.

---

## 2. El Viaje Metodológico: Del Documento Físico al Modelo Lógico

Las bases de datos empresariales **no se inventan en el vacío**. Nacen de los documentos administrativos que la empresa utiliza diariamente:
- Facturas de venta y notas de crédito.
- Órdenes de compra y remisiones de entrega.
- Historias clínicas o fichas de pacientes.
- Órdenes de servicio y cotizaciones técnicas.

### Caso de Estudio: Factura Comercial (Ferretería El Tornillo Feliz S.A.S.)
Todo documento comercial presenta cuatro zonas universales:

\`\`\`
+-------------------------------------------------------------------------+
| [ZONA 1: CABECERA]     FACTURA DE VENTA N° FACT-1001                    |
| Fecha: 17/09/2026      Moneda: COP                                      |
+-------------------------------------------------------------------------+
| [ZONA 2: RECEPTOR]     CLIENTE: Carlos Mendoza        NIT/CC: 10203040  |
| Teléfono: 310-555-9876 Dirección: Calle 45 # 12-30    Ciudad: Medellín  |
+-------------------------------------------------------------------------+
| [ZONA 3: CUERPO / ÍTEMS REPETITIVOS]                                    |
| Cód     Descripción           Cant    Vlr. Unitario    Subtotal         |
| PRD-01  Taladro Percutor        1     $ 250.000        $ 250.000        |
| PRD-05  Juego de Brocas         2     $  40.000        $  80.000        |
| PRD-12  Cinta Métrica 5m        3     $  15.000        $  45.000        |
+-------------------------------------------------------------------------+
| [ZONA 4: TOTALES]      TOTAL A PAGAR: $ 375.000                         |
+-------------------------------------------------------------------------+
\`\`\`

---

## 3. Estado Inicial: Forma No Normalizada (0FN)

Cuando se traslada la factura a una hoja de cálculo o a una sola tabla sin procesar, se agrupan todos los campos en una sola fila.

### Representación en 0FN:
| num_factura | fecha | cliente_id | nombre_cliente | telefono | direccion | ciudad | departamento | items_comprados | total |
|---|---|---|---|---|---|---|---|---|---|
| FACT-1001 | 17/09/2026 | 10203040 | Carlos Mendoza | 3105559876 | Cl 45 12-30 | Medellín | Antioquia | [PRD-01 (1), PRD-05 (2), PRD-12 (3)] | 375000 |

### Problemas Graves de 0FN:
- **Grupos Repetitivos:** Los productos comprados están guardados como un arreglo, texto con comas o celdas combinadas.
- **Incapacidad de Consulta:** Imposible hacer \`SELECT * WHERE cod_producto = 'PRD-05'\` con índices rápidos.
- **Cálculos manuales redundantes:** El total es un dato calculado que depende de la suma de subtotales.

---

## 4. Primera Forma Normal (1FN): Atomicidad y Clave Primaria

### Regla Formal de la 1FN:
1. **Atomicidad:** Cada columna debe contener un valor indivisible (un solo dato simple por celda).
2. **Sin grupos repetitivos:** Los conjuntos de valores repetidos deben desplegarse en filas individuales.
3. **Clave Primaria (PK):** Cada fila debe ser identificable de forma única.

### Cirugía Relacional a 1FN:
Desdoblamos los artículos repetitivos en filas independientes. Como \`num_factura\` solo se repite en cada fila de ítem, la Clave Primaria se vuelve compuesta:  
**Clave Primaria Compuesta:** \`(num_factura, cod_producto)\`

| num_factura (PK) | cod_producto (PK) | fecha | cliente_id | nombre_cliente | telefono | ciudad | departamento | nombre_producto | cantidad | precio_unitario_venta |
|---|---|---|---|---|---|---|---|---|---|---|
| FACT-1001 | PRD-01 | 17/09/2026 | 10203040 | Carlos Mendoza | 3105559876 | Medellín | Antioquia | Taladro Percutor | 1 | 250000 |
| FACT-1001 | PRD-05 | 17/09/2026 | 10203040 | Carlos Mendoza | 3105559876 | Medellín | Antioquia | Juego de Brocas | 2 | 40000 |
| FACT-1001 | PRD-12 | 17/09/2026 | 10203040 | Carlos Mendoza | 3105559876 | Medellín | Antioquia | Cinta Métrica 5m | 3 | 15000 |

> **Diagnóstico 1FN:** Logramos atomicidad, pero ahora la información del cliente y de la factura se repite en cada renglón. Además, el nombre del producto se duplicará cada vez que se venda.

---

## 5. Segunda Forma Normal (2FN): Dependencia Funcional Completa

### Regla Formal de la 2FN:
1. La tabla debe cumplir la **1FN**.
2. **Dependencia Funcional Completa:** Todo atributo que no forma parte de la Clave Primaria debe depender de la **totalidad** de la Clave Primaria, **NO de una parte de ella**.
3. *Nota crucial:* Si una tabla tiene una clave primaria simple (de una sola columna), ¡ya cumple automáticamente la 2FN! La 2FN solo es un riesgo cuando hay claves primarias compuestas.

### Detección de Dependencias Parciales en nuestra tabla 1FN:
Clave Compuesta: \`(num_factura, cod_producto)\`
- \`cantidad\`: ¿Depende de la factura? Sí. ¿Depende del producto? Sí.  
  -> **Dependencia Completa:** \`(num_factura, cod_producto) -> cantidad\` (Se queda en la tabla puente).
- \`precio_unitario_venta\`: ¿Depende de la combinación de ambos? Sí, porque es el precio negociado para ese ítem en esa factura.  
  -> **Dependencia Completa:** \`(num_factura, cod_producto) -> precio_unitario_venta\`.
- \`nombre_producto\`: ¿Depende de la factura? **NO**. Depende ÚNICAMENTE de \`cod_producto\`.  
  -> **Dependencia Parcial:** \`cod_producto -> nombre_producto\`. ¡Viola 2FN!
- \`fecha\`, \`cliente_id\`, \`nombre_cliente\`: Dependen ÚNICAMENTE de \`num_factura\`.  
  -> **Dependencia Parcial:** \`num_factura -> fecha, cliente_id...\`. ¡Viola 2FN!

### Cirugía Relacional a 2FN:
Extraemos los atributos con dependencia parcial a sus propias tablas:

1. **TABLA FACTURA (Cabecera):**
   - PK: \`num_factura\`
   - Atributos: \`fecha\`, \`cliente_id\`, \`nombre_cliente\`, \`telefono\`, \`direccion\`, \`ciudad\`, \`departamento\`
2. **TABLA PRODUCTO (Catálogo):**
   - PK: \`cod_producto\`
   - Atributos: \`nombre_producto\`, \`precio_catalogo_base\`
3. **TABLA DETALLE_FACTURA (Tabla Asociativa / Transaccional):**
   - PK Compuesta: \`(num_factura, cod_producto)\`
   - FK 1: \`num_factura\` -> \`factura(num_factura)\`
   - FK 2: \`cod_producto\` -> \`producto(cod_producto)\`
   - Atributos de hecho: \`cantidad\`, \`precio_unitario_venta\`

---

## 6. Tercera Forma Normal (3FN): Eliminación de Dependencias Transitivas

### Regla Formal de la 3FN:
1. La tabla debe cumplir la **2FN**.
2. **Sin Dependencias Transitivas:** Ningún atributo no clave debe depender de otro atributo no clave.
3. Dicho de forma simple: *"Todo atributo debe depender de la clave, de toda la clave y de nada más que de la clave"*.

### Detección de Dependencias Transitivas en TABLA FACTURA (2FN):
- \`num_factura\` (PK) determina funcionalmente a \`cliente_id\`.
- Pero \`cliente_id\` determina funcionalmente a: \`nombre_cliente\`, \`telefono\`, \`direccion\`, \`ciudad\`.
- Y a su vez, \`ciudad\` determina a \`departamento\`.
- Cadena transitiva: \`num_factura -> cliente_id -> (nombre, telefono, direccion) -> ciudad -> departamento\`.

Si Carlos Mendoza cambia su número celular, tendríamos que actualizarlo en todas las facturas históricas donde él compró. Si cometemos un error, el mismo cliente tendrá teléfonos diferentes en el sistema.

### Cirugía Relacional a 3FN:
Descomponemos las entidades maestras e independientes:

1. **TABLA CIUDAD:**
   - PK: \`ciudad_id\`
   - Atributos: \`nombre_ciudad\`, \`departamento\`
2. **TABLA CLIENTE:**
   - PK: \`cliente_id\`
   - Atributos: \`nombre_completo\`, \`telefono\`, \`direccion\`, \`ciudad_id\` (FK)
3. **TABLA FACTURA:**
   - PK: \`num_factura\`
   - Atributos: \`fecha\`, \`cliente_id\` (FK)
4. **TABLA PRODUCTO:**
   - PK: \`cod_producto\`
   - Atributos: \`nombre_producto\`, \`precio_catalogo_base\`
5. **TABLA DETALLE_FACTURA:**
   - PK Compuesta: \`(num_factura, cod_producto)\`
   - Atributos: \`cantidad\`, \`precio_unitario_venta\`

---

## 7. El Gran Dilema Técnico: ¿Por Qué el Precio se Guarda Dos Veces?

Muchos aprendices y desarrolladores novatos cometen el error de decir:  
*"Si ya tengo el precio en la tabla producto, guardarlo en detalle_factura es redundante y viola la 3FN"*.

### Esto es un grave error de arquitectura de software:
1. **\`producto.precio_catalogo_base\`** es un **dato mutable de catálogo**: representa cuánto cuesta el producto hoy en estantería.
2. **\`detalle_factura.precio_unitario_venta\`** es un **hecho transaccional inmutable (Snapshot)**: representa cuánto costó el producto en el instante exacto en que se cerró la venta.

Si el día de mañana la inflación hace subir el Taladro de \$250.000 a \$320.000:
- Si no guardaste el precio en el detalle y haces un \`JOIN\` con el catálogo, ¡la factura emitida hace dos meses cambiará mágicamente su valor contable de \$375.000 a \$445.000!
- Esto constituye fraude contable y altera los balances tributarios de la empresa.
- **Conclusión:** \`precio_unitario_venta\` tiene **Dependencia Funcional Total** de la clave transaccional \`(num_factura, cod_producto)\`. Su presencia es obligatoria y cumple estrictamente la 3FN.

---

## 8. Esquema DDL Listo para Producción (PostgreSQL)

\`\`\`sql
-- 1. Tablas maestras independientes primero (sin dependencias foráneas)
CREATE TABLE ciudad (
  ciudad_id VARCHAR(10) PRIMARY KEY,
  nombre_ciudad VARCHAR(80) NOT NULL,
  departamento VARCHAR(80) NOT NULL
);

CREATE TABLE producto (
  cod_producto VARCHAR(20) PRIMARY KEY,
  nombre_producto VARCHAR(120) NOT NULL,
  precio_catalogo_base NUMERIC(12, 2) NOT NULL CHECK (precio_catalogo_base >= 0)
);

-- 2. Entidad dependiente de Ciudad
CREATE TABLE cliente (
  cliente_id VARCHAR(20) PRIMARY KEY,
  nombre_completo VARCHAR(120) NOT NULL,
  telefono VARCHAR(25) NOT NULL,
  direccion VARCHAR(150) NOT NULL,
  ciudad_id VARCHAR(10) NOT NULL,
  CONSTRAINT fk_cliente_ciudad FOREIGN KEY (ciudad_id)
    REFERENCES ciudad(ciudad_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 3. Entidad transaccional dependiente de Cliente
CREATE TABLE factura (
  num_factura VARCHAR(20) PRIMARY KEY,
  fecha DATE NOT NULL,
  cliente_id VARCHAR(20) NOT NULL,
  CONSTRAINT fk_factura_cliente FOREIGN KEY (cliente_id)
    REFERENCES cliente(cliente_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 4. Tabla asociativa (nace de la resolución N:M en 2FN)
CREATE TABLE detalle_factura (
  num_factura VARCHAR(20) NOT NULL,
  cod_producto VARCHAR(20) NOT NULL,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario_venta NUMERIC(12, 2) NOT NULL CHECK (precio_unitario_venta >= 0),
  PRIMARY KEY (num_factura, cod_producto),
  CONSTRAINT fk_detalle_factura FOREIGN KEY (num_factura)
    REFERENCES factura(num_factura) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_detalle_producto FOREIGN KEY (cod_producto)
    REFERENCES producto(cod_producto) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 5. Índices de aceleración para JOINs frecuentes
CREATE INDEX idx_cliente_ciudad ON cliente(ciudad_id);
CREATE INDEX idx_factura_cliente ON factura(cliente_id);
CREATE INDEX idx_detalle_producto ON detalle_factura(cod_producto);
\`\`\`

---

## 9. Lista de Chequeo Rápida para el Desarrollador

Antes de dar por terminado un modelo relacional en tu proyecto formativo o laboral:

| Pregunta de Auditoría | Forma Normal | Verificación |
|---|---|---|
| ¿Alguna celda contiene listas separadas por comas o arreglos no estructurados? | 1FN | Debe ser NO. Un dato por celda. |
| ¿Existe una Clave Primaria definida en todas las tablas? | 1FN | Debe ser SÍ. |
| ¿Hay tablas con Clave Primaria compuesta donde algún campo dependa solo de una de las columnas? | 2FN | Debe ser NO. Extraer a tabla propia. |
| ¿Hay atributos que dependan de otro atributo que no es la Clave Primaria (ej. ciudad -> depto)? | 3FN | Debe ser NO. Extraer a tabla maestra. |
| ¿Los precios, descuentos o impuestos aplicados en ventas se guardan como hechos históricos? | Integridad Contable | Debe ser SÍ. El catálogo es mutable; la venta es inmutable. |
| ¿Las relaciones muchos a muchos (N:M) cuentan con su tabla asociativa intermedia? | Resolución DER | Debe ser SÍ. Resuelta con claves foráneas. |
| ¿Las restricciones \`ON DELETE\` protegen datos contables (\`RESTRICT\`)? | Integridad Referencial | Debe ser SÍ. Prohibido borrar facturas con clientes activos. |

---

*Manual generado por DataGenesis — Guía Interactiva MER. Plataforma de Aprendizaje Activo de Bases de Datos.*
`
}
