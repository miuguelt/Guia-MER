# IA y modelado MER: criterio de trabajo y pedagogía interactiva

Fecha de revisión: 2026-09-17. Esta matriz y guía metodológica constituyen orientación educativa y no una garantía de planes, precios o disponibilidad; conviene revisar la documentación oficial antes de seleccionar una herramienta.

## La Gema como mentor interactivo: Pedagogía con el comando `inicia`

Una Gema de modelado no debe actuar como un oráculo que emite bloques de código SQL o diagramas de forma masiva en el primer turno. Cuando una IA entrega una solución completa sin mediación pedagógica, el aprendiz no comprende la razón de las decisiones tomadas y no desarrolla el criterio técnico necesario para resolver problemas reales.

Por esta razón, las Gemas de la guía incorporan un **protocolo de activación guiada mediante la palabra clave `inicia`**:
1. **Activación sin barreras:** El aprendiz pega la instrucción de la Gema en su entorno de IA (Gemini, ChatGPT, Claude) y escribe únicamente `inicia`.
2. **Contrato de entrega transparente:** Desde el primer intercambio, la Gema le declara al estudiante el resultado final esperado:
   - Catálogo de Entidades y Atributos con tipos de datos.
   - Matriz de Cardinalidad bidireccional `(min, max)`.
   - Diagrama Mermaid (`erDiagram`) compilable.
   - Script DDL PostgreSQL con restricciones de integridad (`PK`, `FK`, `UQ`, `CHECK`, `ON DELETE RESTRICT`).
   - Justificación de estabilidad y escalabilidad.
3. **El caso ancla de referencia (Cliente, Producto, Factura y Detalle):**
   La Gema contextualiza el aprendizaje a través del caso canónico de Facturación:
   - `CLIENTE` (maestro) y `PRODUCTO` (maestro con precio actual).
   - `FACTURA` (cabecera transaccional).
   - `DETALLE_FACTURA` (entidad asociativa/débil que resuelve la relación $N:M$ congelando la cantidad y el precio histórico con `ON DELETE RESTRICT`).
4. **Scaffolding (Acompañamiento por hitos):** La Gema conduce al estudiante a través de preguntas reflexivas:
   - *Hito 1:* Delimitación del problema y filtrado de entidades.
   - *Hito 2:* Atributos y elección de claves primarias técnicas (`UUID` o `BIGINT`) para evitar colisiones.
   - *Hito 3:* Cardinalidades bidireccionales y nacimiento de tablas asociativas.
   - *Hito 4:* Reglas de integridad física y análisis de escalabilidad.
   - *Hito 5:* Consolidación del MER definitivo.

---

## Fundamentos de Estabilidad y Escalabilidad desde el MER

Un Modelo Entidad-Relación sólido es la base estructural que determina si un sistema de software puede crecer sin degradarse:
- **Estabilidad Operativa:** La base de datos actúa como el guardián de la verdad. El uso de restricciones `NOT NULL`, `UNIQUE`, `CHECK` y políticas referenciales `ON DELETE RESTRICT` asegura que la contabilidad e historial transaccional permanezcan inmutables, incluso si la interfaz o la lógica de negocio externa fallan.
- **Escalabilidad Vertical (Scale-Up):**
  - Tipos de datos precisos y atómicos (`NUMERIC` para dinero, `TIMESTAMPTZ` para instantes temporales) minimizan el consumo de memoria RAM en el motor.
  - La indexación B-Tree en cada Clave Foránea (`FK`) permite que consultas de unión (`JOIN`) sobre millones de registros se ejecuten en milisegundos sin bloqueos de tabla.
- **Escalabilidad Horizontal (Scale-Out y Microservicios):**
  - Las claves sustitutas universales (`UUID`) desacoplan los registros de la secuencia de una sola máquina, permitiendo distribución entre múltiples nodos o bases de datos sin conflicto de llaves.
  - La segregación en Tercera Forma Normal (3FN) permite particionar tablas transaccionales de alto tráfico (como `DETALLE_FACTURA` o `BITACORA`) por fechas o regiones, y facilita la transición hacia arquitecturas modulares o microservicios.

---

## Flujo metodológico recomendado

1. Extraer hechos, actores, eventos y reglas desde el requisito.
2. Pedir preguntas abiertas y contraejemplos antes de pedir tablas.
3. Validar cardinalidad en ambas direcciones con una persona del dominio.
4. Construir el modelo conceptual y conservar nombres del negocio.
5. Derivar PK, FK y tablas puente al modelo relacional.
6. Renderizar Mermaid, DBML u otra DSL versionable.
7. Probar altas, cambios, borrados, duplicados, FK inexistentes y casos límite.
8. Revisar privacidad, retención, roles, transacciones, índices y migraciones.
9. Registrar la instrucción, el contexto, los supuestos, las correcciones y la decisión final.

DataGenesis permite editar y renderizar Mermaid en vivo. El aprendiz puede observar el estado de compilación, corregir la sintaxis y descargar el texto fuente; la vista SVG no reemplaza el código versionable. La bitácora local conserva el proceso de razonamiento y permite entregarlo como Markdown.

---

## Comparación de herramientas de IA

| Herramienta | Mejor uso | Riesgo o límite educativo |
|---|---|---|
| Gemini Gems | Mentor persistente con instrucciones y archivos de contexto | Puede inventar una cardinalidad si no se obliga a preguntar |
| GPT personalizado | Asistente con instrucciones, Knowledge, capacidades y prueba en Preview | La creación y el uso compartido dependen del plan/espacio |
| Claude Projects | Proyecto con instrucciones y base de conocimiento persistente | Es un buen revisor, no una autoridad del negocio |
| Mermaid | ERD como código en Markdown/Git | Es una representación; no valida por sí sola el dominio |
| dbdiagram + DBML | Editor ligero y SQL/ERD desde una DSL legible | Puede inducir a empezar por tablas antes de pensar en hechos |
| Eraser | ERD técnico editable a partir de instrucciones, archivos o repositorio | Revisar qué código o esquema se comparte con el servicio |
| DrawSQL | Convertir DDL o una propuesta asistida en un ERD compartible | Importar SQL no prueba que el modelo sea correcto |

## Criterio de selección

- Para aprender: DataGenesis + una Gema guiada con `inicia` + Mermaid.
- Para trabajar en equipo: Mermaid/DBML dentro de Git y una revisión de cambios.
- Para explorar visualmente: dbdiagram, DrawSQL o Eraser después de definir el dominio.
- Para un repositorio real: usar un asistente con acceso controlado y documentar qué archivos recibió.
- Para producción: validar el DDL en el motor objetivo, aplicar migraciones reproducibles y hacer revisión humana.

## Fuentes oficiales consultadas

- Gemini Gems: <https://support.google.com/gemini/answer/15235603?hl=es>
- GPTs: <https://help.openai.com/en/articles/8554397-creating-a-gpt/>
- Claude Projects: <https://support.anthropic.com/en/articles/9517075-what-are-projects>
- Mermaid ER diagrams: <https://mermaid.js.org/syntax/entityRelationshipDiagram.html>
- dbdiagram / DBML: <https://docs.dbdiagram.io/> y <https://dbml.dbdiagram.io/docs/>
- Eraser: <https://docs.eraser.io/what-is-eraser>
- DrawSQL AI-to-ERD: <https://drawsql.app/your-ai-to-erd>

## Casos de estudio interactivos asistidos por IA

- **Sesión en vivo en Gemini Canvas (Finca Villa Luz - Ganadería y Trazabilidad)**: Demostración práctica del flujo metodológico de 5 fases ejecutado con la Gema personalizada *Arquitecto MER & Relacional ADSO* (`skid=563a1190-cad0-42ba-9c13-b04bcabea93e`): <https://gemini.google.com/share/c663a17632de?skid=563a1190-cad0-42ba-9c13-b04bcabea93e&hl=es_419>
