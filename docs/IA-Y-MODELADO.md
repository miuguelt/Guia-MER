# IA y modelado MER: criterio de trabajo

Fecha de revisión: 2026-09-09. Esta matriz es orientación educativa y no una garantía de planes, precios o disponibilidad; conviene revisar la documentación oficial antes de seleccionar una herramienta.

## Flujo recomendado

1. Extraer hechos, actores, eventos y reglas desde el requisito.
2. Pedir preguntas abiertas y contraejemplos antes de pedir tablas.
3. Validar cardinalidad en ambas direcciones con una persona del dominio.
4. Construir el modelo conceptual y conservar nombres del negocio.
5. Derivar PK, FK y tablas puente al modelo relacional.
6. Renderizar Mermaid, DBML u otra DSL versionable.
7. Probar altas, cambios, borrados, duplicados, FK inexistentes y casos límite.
8. Revisar privacidad, retención, roles, transacciones, índices y migraciones.
9. Registrar la instrucción, el contexto, los supuestos, las correcciones y la decisión final.

DataGenesis ahora permite editar y renderizar Mermaid en vivo. El aprendiz puede observar el estado de compilación, corregir la sintaxis y descargar el texto fuente; la vista SVG no reemplaza el código versionable. La bitácora local conserva el proceso de razonamiento y permite entregarlo como Markdown.

## Comparación de alto nivel

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

- Para aprender: DataGenesis + una Gema + Mermaid.
- Para trabajar en equipo: Mermaid/DBML dentro de Git y una revisión de cambios.
- Para explorar visualmente: dbdiagram, DrawSQL o Eraser después de definir el dominio.
- Para un repositorio real: usar un asistente con acceso controlado y documentar qué archivos recibió.
- Para producción: validar el DDL en el motor objetivo, aplicar migraciones reproducibles y hacer revisión humana.

## Sobre “Poden”

No se identificó en la revisión una herramienta consolidada con ese nombre dedicada al modelado ERD. Si el término se refería a otra aplicación, se debe sustituir el nombre en la matriz y evaluar la misma lista: exportación, versionado, privacidad, importación SQL, restricciones, colaboración y trazabilidad de cambios.

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

