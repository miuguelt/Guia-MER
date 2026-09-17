# Estrategia definitiva para construir guías de aprendizaje con inteligencia artificial

## Decisión ejecutiva

La estrategia recomendada no es elegir una única moda pedagógica. Para guías técnicas que enseñan a construir sistemas de información, la mejor apuesta es un modelo híbrido: **aprendizaje basado en proyectos como columna vertebral, instrucción explícita y ejemplos trabajados para iniciar, práctica activa y espaciada para consolidar, retroalimentación accionable para corregir, metacognición para transferir y una IA con límites, trazabilidad y revisión humana**.

En este documento llamo a esa combinación **ARCO-IA**:

- **Alineación:** se diseña desde el desempeño final observable hacia atrás.
- **Reto auténtico:** todo el recorrido alimenta un proyecto que resuelve una necesidad real.
- **Ciclos de práctica:** cada concepto pasa por ejemplo, intento guiado, ejercicio independiente, variación y reintento.
- **Observabilidad:** cada avance deja evidencia, no solo una marca de “completado”.
- **IA:** actúa como tutor, generador controlado, crítico y analista de errores; nunca como autoridad silenciosa.

La Guía MER actual ya contiene buena parte de esta arquitectura. Su siguiente evolución no consiste principalmente en agregar más teoría: consiste en conectar cada estación con un mismo proyecto, medir dominio por habilidad, forzar reintentos y demostrar transferencia independiente.

## Alcance y supuestos

Se interpreta “MERT” como la guía MER/DataGenesis que existe en esta carpeta: `datagenesis-mer-2026`, titulada “Modelado Entidad-Relación y Relacional”. El término “Edxena” no tiene una ficha educativa pública verificable bajo ese nombre en la búsqueda realizada; por ello, su análisis se basa en la descripción disponible: estrategia por proyectos, ejemplos y ejercicios de manera constante. No se atribuyen a Edxena resultados cuantitativos que no estén publicados.

El público de referencia es el aprendiz de ADSO o de formación técnica que necesita pasar de una necesidad expresada en lenguaje natural a un sistema de información defendible. La estrategia también aplica a guías de programación, análisis, diseño, bases de datos, automatización y otros temas donde el resultado debe ser un artefacto funcional o verificable.

## 1. Qué muestra la evidencia

### La conclusión importante

No hay una estrategia universal que produzca el mayor impacto en todos los contextos. El impacto depende de la calidad de implementación, el conocimiento previo, la duración, la naturaleza de la tarea y la forma de evaluar. La propia EEF recomienda usar su evidencia como “mejores apuestas” y combinarla con juicio profesional, no como garantía mecánica.

La evidencia sí permite priorizar componentes:

| Componente | Señal de evidencia | Decisión para una guía técnica |
|---|---|---|
| Aprendizaje activo | Un metaanálisis de 225 estudios STEM encontró una mejora media de 0,47 desviaciones estándar y menor probabilidad de reprobación frente a la clase expositiva tradicional. [Freeman et al., PNAS](https://doi.org/10.1073/pnas.1319030111) | El aprendiz debe tomar decisiones, manipular artefactos y explicar su razonamiento durante la estación. |
| Retroalimentación de calidad | La EEF estima seis meses adicionales de progreso en promedio; la retroalimentación debe decir qué se logró, qué está mal y cuál es el siguiente movimiento. [EEF: Retroalimentación](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback) | Cada ejercicio debe responder inmediatamente y permitir corregir; una nota sin explicación no basta. |
| Metacognición y autorregulación | La EEF estima ocho meses adicionales en promedio y destaca planear, monitorear, evaluar, modelar el pensamiento y aplicar estas estrategias dentro de la materia. [EEF: Metacognition and self-regulation](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation) | La guía debe hacer visibles las decisiones, supuestos, errores, criterios de éxito y reflexión de cierre. |
| Recuperación y práctica espaciada | Una revisión de 50 experimentos en aulas encontró beneficios robustos de la práctica de recuperación; 57 % de los efectos fueron medianos o grandes, aunque solo 6 % de los experimentos se realizó fuera de países WEIRD. [Agarwal, Nunes y Blunt](https://doi.org/10.1007/s10648-021-09595-9) | Reaparecerán cardinalidad, PK/FK, normalización y validación de IA en estaciones posteriores y en una revisión diferida. |
| Ejemplos trabajados y desvanecimiento | La investigación sobre carga cognitiva muestra que los ejemplos resueltos ayudan especialmente a novatos; el apoyo debe retirarse gradualmente. [Cognitive Load Theory review](https://link.springer.com/article/10.1007/s10648-010-9145-4) | Usar “yo lo muestro → lo hacemos juntos → completas una parte → lo resuelves solo”. |
| Colaboración estructurada | La EEF estima cinco meses adicionales; los grupos de 3 a 5 con un resultado común son una condición prometedora. [EEF: Collaborative learning](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/collaborative-learning-approaches) | Incorporar revisión por pares o pareja técnica con roles y rúbrica; sentar estudiantes juntos sin estructura no es suficiente. |
| Aprendizaje por proyectos | Los metaanálisis suelen mostrar dirección positiva. Chen y Yang reportaron un efecto medio ponderado de 0,71, pero la evidencia varía por dominio y contexto. [Chen y Yang](https://www.sciencedirect.com/science/article/pii/S1747938X19300211) | Usar el proyecto para integrar y transferir, no para abandonar la enseñanza guiada de fundamentos. |
| Límites del ABP | Un ensayo de la EEF sobre “Learning through REAL Projects” no encontró mejora de logro y reportó -2 meses; la EEF señalaba evidencia limitada para PBL. [EEF: PBL trial](https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/project-based-learning) | El proyecto necesita estructura, checkpoints, ejemplos, práctica y criterios de calidad; no debe ser una consigna abierta al inicio. |
| Calidad del ABP | PBLWorks propone problema retador, indagación sostenida, autenticidad, voz y elección, reflexión, crítica y revisión, y producto público. [PBLWorks Gold Standard](https://www.pblworks.org/what-is-pbl/gold-standard-project-design) | Cada proyecto debe tener audiencia, revisión de versiones y una defensa final, aunque sea individual. |
| Gamificación | Un metaanálisis de 41 estudios encontró un efecto global positivo, pero también moderadores importantes de diseño, duración, disciplina y entorno. [Li, Ma y Shi](https://doi.org/10.3389/fpsyg.2023.1253549) | Usar progreso, retos y logros para sostener la práctica; no convertir puntos, insignias o rankings en el objetivo del aprendizaje. |

### Qué significa “mejor impacto” en este caso

Para una guía de MER, el resultado de mayor valor no es que el aprendiz recuerde la definición de entidad. Es que pueda recibir un dominio nuevo, formular preguntas, producir un modelo, detectar sus propios errores, justificar restricciones y defender el diseño ante una persona. Por eso la métrica principal debe ser **transferencia de desempeño**, no tiempo en pantalla ni cantidad de estaciones completadas.

La recomendación es, entonces, **ABP con andamiaje de dominio y práctica de maestría**. El proyecto provee significado y transferencia; los ejemplos y ejercicios evitan que un novato se pierda; la recuperación mantiene los conceptos disponibles; la retroalimentación permite corregir; la metacognición convierte la experiencia en criterio.

## 2. Qué ofrece hoy el mercado educativo

El mercado no vende una sola estrategia. Vende combinaciones recurrentes de contenido, práctica, proyecto, personalización y credenciales.

| Patrón de mercado | Ejemplos observables | Fortaleza | Riesgo para una guía propia |
|---|---|---|---|
| MOOC/LMS modular | edX, Coursera y plataformas similares | Escala, secuencia, reutilización, evaluaciones y rutas | Puede quedarse en consumo pasivo si el proyecto aparece solo al final. |
| Guided Projects y laboratorios | Coursera Guided Projects; ofrece práctica en un entorno dividido y proyectos de menos de dos horas. [Coursera](https://blog.coursera.org/coursera-white-paper-details-the-pedagogy-underlying-guided-projects-on-coursera/) | Reduce la distancia entre ver y hacer; combina demostración, guía y herramienta | El entorno guiado puede no preparar para un problema nuevo si no hay transferencia independiente. |
| Learn-by-doing y portafolio | Codecademy separa proyectos de práctica y proyectos de portafolio, con duraciones y niveles de guía diferentes. [Codecademy Projects](https://www.codecademy.com/projects) | Entrega un producto visible y crea progresión de apoyo a independencia | Puede priorizar el procedimiento de la herramienta por encima del razonamiento del dominio. |
| Mastery y tutor adaptativo | Khan Academy/Khanmigo guía con preguntas y pistas y relaciona la ayuda con dominio y prerrequisitos. [Khanmigo](https://www.khanacademy.org/khan-labs) | Personaliza la ayuda y evita entregar la respuesta de inmediato | La calidad depende de datos de dominio, guardas, privacidad y pruebas del tutor. |
| PBL, capstone y bootcamp | Capstones de edX, proyectos de portafolio, academias intensivas | Alta conexión con empleo y producto real | Es costoso en tiempo; sin fundamentos y checkpoints aumenta carga cognitiva y abandono. |
| Espacio de IA configurable | Gemini Gems, GPTs y Claude Projects permiten separar instrucciones, conocimiento, archivos y pruebas. [Gems](https://support.google.com/gemini/answer/15235603?hl=es), [GPTs](https://help.openai.com/en/articles/8554397-creating-a-gpt), [Claude Projects](https://support.anthropic.com/en/articles/9519177-how-can-i-create-and-manage-projects) | Hace reutilizable un mentor con contexto persistente | Una buena instrucción no es un currículo: no garantiza práctica, evaluación, fuentes ni transferencia. |
| Artefacto como código | Mermaid, DBML y herramientas de ERD | Versionado, exportación, revisión por cambios y portabilidad | La herramienta puede dibujar un modelo técnicamente válido pero semánticamente equivocado. |

El patrón de mercado más pertinente para este computador y estas guías es el que combina **editor local + artefactos descargables + práctica guiada + proyecto de portafolio + tutor IA opcional**. La guía no necesita competir como un LMS masivo; puede diferenciarse como una herramienta local de aprendizaje aplicado y construcción de sistemas.

## 3. Análisis de la estrategia descrita de Edxena

### Núcleo pedagógico

La estrategia descrita —proyecto real, ejemplo inmediato, ejercicio constante y acumulación de conocimiento— es valiosa porque organiza el aprendizaje alrededor de una necesidad concreta. El aprendiz no estudia “cardinalidades” en abstracto: necesita decidir cómo modelar una relación para que su sistema funcione. Cada concepto se convierte en una pieza del producto.

Su versión fuerte debería tener este ciclo:

1. Presentar una situación auténtica y una pregunta guía.
2. Mostrar un ejemplo completo y verbalizar el razonamiento.
3. Pedir una decisión pequeña al aprendiz.
4. Dar retroalimentación específica y permitir un segundo intento.
5. Retirar parte del apoyo y cambiar el contexto.
6. Incorporar la decisión corregida al proyecto.
7. Volver a recuperar el concepto más adelante.
8. Presentar el producto a una audiencia y defenderlo.

### Lo que Edxena hace especialmente bien, según la descripción

- Da sentido a la teoría mediante una misión concreta.
- Mantiene una alta densidad de acción: el aprendiz produce, prueba y modifica.
- Usa los ejemplos como puente entre una explicación y una situación nueva.
- Convierte el conocimiento acumulado en un artefacto que puede mostrar.
- Hace visible el aprendizaje porque el proyecto deja huellas y versiones.

### Lo que debe añadirse para que sea de alto impacto

El riesgo de una estrategia por proyectos es suponer que hacer el producto implica dominar los principios. Para evitarlo, Edxena/ARCO-IA necesita cinco controles:

- **Diagnóstico inicial:** detectar prerrequisitos antes de asignar una tarea compleja.
- **Andamiaje graduado:** ejemplo trabajado, ejemplo incompleto y luego problema abierto.
- **Microejercicios de discriminación:** contrastar casos parecidos, no practicar siempre el mismo patrón.
- **Rúbrica de proceso y producto:** valorar razonamiento, decisiones, evidencia y resultado.
- **Prueba de transferencia:** cambiar dominio, datos o restricciones para comprobar que no se memorizó la plantilla.

En otras palabras, la mejor versión de Edxena no es “proyectos en lugar de clases”; es **proyectos como hilo conductor y micropráctica como motor cognitivo**.

## 4. Auditoría de la Guía MER actual

### Lo que ya está bien resuelto

La guía actual tiene una base superior a la de una guía documental tradicional:

- El manifiesto define un reto real, cinco checkpoints, productos y una secuencia de reflexión, contextualización, apropiación y transferencia. [Manifesto](./guide.manifest.json)
- La ruta tiene ocho estaciones desde anomalías de una hoja gigante hasta calidad, IA y portafolio.
- El proyecto integra cuatro dominios: comercio electrónico, hospital, academia y taller automotriz.
- El registro de entregables distingue conocimiento, desempeño y producto, y asigna criterios a `MER-EV01`–`MER-EV05`. [Deliverables registry](./deliverables.registry.json)
- `LearningToolkit` reutiliza en cada módulo una analogía, un simulador y un reto rápido con retroalimentación.
- Hay actividades para anomalías de inserción, actualización y borrado; entidades, atributos, cardinalidad mínima/máxima, transformación PK→FK, constraints, normalización y riesgos de IA.
- La Gema separa hechos, supuestos e información faltante, marca `[POR VALIDAR]`, exige preguntas bidireccionales de cardinalidad y evita convertir listas en campos. [Gema](./gema-arquitecto-mer-relacional.md)
- La bitácora conserva la instrucción, el contexto, los supuestos, las correcciones y las pruebas; el registro queda local y es exportable.
- Mermaid se renderiza en vivo y el código se puede descargar; el producto no queda encerrado en una imagen.
- Hay ejemplos completos de extremo a extremo y una salida institucional con portafolio, checklist y firma.
- El proyecto es local primero y funciona sin conexión: favorece privacidad, portabilidad y uso aun sin red.
- La bitácora de iteraciones muestra una práctica sana de diseño: necesidad detectada, cambio, cobertura y verificación. [Iteration log](./GUIDE_ITERATION_LOG.md)
- La compilación actual es correcta: `npm run build` terminó con código 0 el 12 de septiembre de 2026. El build sí emite una advertencia de chunks grandes, por lo que rendimiento y carga progresiva siguen siendo una decisión pendiente.

### Brechas que limitan el impacto pedagógico

1. **El proyecto aparece tarde.** Las primeras estaciones enseñan componentes aislados y el proyecto propio se concentra en el módulo 05. El aprendiz debería mantener desde el inicio un “proyecto sombra” cuyo artefacto se actualiza en cada estación.

2. **La navegación parece tener desbloqueo, pero no lo aplica.** La interfaz muestra “Se desbloquea al avanzar”, pero `navigate` acepta cualquier módulo y cada tarjeta puede abrirse directamente. [App](./src/App.tsx:43)

3. **Completado no equivale a dominio.** La mayoría de estaciones llama a `onComplete` sin exigir un umbral de desempeño. El módulo 05 puede guardarse aunque no se haya validado el requisito ni se haya hecho una transferencia independiente.

4. **El progreso no es un modelo de habilidades.** `useLocalProgress` guarda módulos completados, texto, diccionario, bitácora y perfil, pero no conserva intentos, errores por concepto, respuestas, nivel de dominio ni fecha de revisión. [Progreso local](./src/hooks/useLocalProgress.ts)

5. **El validador del requisito es superficial.** En `ProjectLab` se usan expresiones regulares para detectar palabras, verbos y longitud. Eso sirve como señal inicial, pero no prueba cobertura semántica, relaciones, cardinalidades ni requisitos faltantes. [ProjectLab](./src/features/module5/ProjectLab.tsx:25)

6. **La narrativa y los artefactos no forman todavía una única fuente de verdad.** El texto del proyecto puede editarse, mientras Mermaid y SQL permanecen en estados separados o se cargan desde casos precargados. Falta un modelo de proyecto que conecte requisito → entidad → relación → tabla → restricción → prueba.

7. **La IA está bien planteada, pero no integrada en el bucle.** El módulo 06 ofrece la Gema y la bitácora, pero el aprendiz debe salir a otra herramienta, copiar y regresar. Eso protege el diseño local, pero agrega fricción y deja la calidad de la respuesta fuera de la aplicación.

8. **La validación técnica es desigual.** Mermaid se comprueba visualmente; el DDL no se ejecuta contra un motor SQL ni se compara automáticamente con el ERD y el diccionario. Una vista correcta no garantiza un esquema ejecutable.

9. **Falta una prueba de defensa.** La guía entrega archivos, pero todavía no exige explicar por qué una entidad existe, por qué una FK está en ese lado, qué ocurre al borrar un padre o qué supuestos siguen abiertos.

10. **El cierre de m7 puede medir selección, no elaboración.** Marcar las ocho dimensiones como seleccionadas demuestra recorrido, pero no demuestra que el aprendiz haya ejecutado cada práctica.

11. **La alineación curricular aún está pendiente.** El manifiesto usa `POR-CONFIRMAR` para programa, competencia y resultado de aprendizaje. Mientras no se verifique con la ficha o el instructor, el producto debe llamarse adaptación local y no certificación.

12. **La duración declarada es de exploración, no de dominio.** Noventa a ciento veinte minutos pueden servir como primera visita; construir, revisar y defender un modelo nuevo requiere una ruta de práctica adicional.

### Diagnóstico resumido

La Guía MER está aproximadamente en una fase de **prototipo pedagógico interactivo sólido**. Tiene el diseño visual y la lógica conceptual de un Guided Project, pero aún debe convertirse en un **sistema de maestría trazable**. La prioridad no es aumentar el número de tarjetas: es cerrar la relación entre actividad, habilidad, error, evidencia, reintento y transferencia.

## 5. Estrategia ARCO-IA definitiva

### Fase A — Alineación hacia atrás

Antes de generar pantallas, la IA debe producir una ficha de diseño:

| Campo | Pregunta obligatoria |
|---|---|
| Público | ¿Quién aprenderá, con qué conocimientos previos y con qué restricciones de tiempo, conectividad y accesibilidad? |
| Desempeño final | ¿Qué podrá construir, probar, explicar o defender sin ayuda? |
| Criterios de éxito | ¿Cómo sabremos que el resultado es correcto, seguro, completo y útil? |
| Evidencia | ¿Qué archivo, decisión, explicación, prueba o demostración lo demuestra? |
| Transferencia | ¿Qué variante nueva obligará a usar el principio y no a repetir una plantilla? |
| Límites | ¿Qué no cubre la guía y qué requiere instructor, cliente o especialista? |

Regla: si un objetivo no tiene evidencia observable, todavía no es un objetivo listo para la guía.

### Fase R — Reto auténtico y proyecto incremental

El proyecto debe aparecer en la primera pantalla y crecer por incrementos. Cada estación añade una pieza al mismo expediente:

1. Problema, contexto y límites.
2. Requisitos y glosario.
3. Decisiones conceptuales.
4. Modelo o diseño intermedio.
5. Pruebas de comportamiento.
6. Producto funcional o ejecutable.
7. Revisión y corrección.
8. Presentación, defensa y plan de evolución.

El proyecto debe reunir las características de un buen PBL: pregunta retadora, indagación sostenida, autenticidad, alguna elección del aprendiz, reflexión, crítica/revisión y producto público o defendible.

### C — Ciclo de aprendizaje dentro de cada estación

Toda estación debe cumplir el mismo contrato:

1. **Activar:** una pregunta de recuperación sobre la estación anterior.
2. **Contextualizar:** un caso corto, no una definición aislada.
3. **Modelar:** ejemplo completo con pensamiento visible.
4. **Guiar:** ejercicio con pasos o ejemplo incompleto.
5. **Comprobar:** reto independiente con retroalimentación inmediata.
6. **Variar:** nuevo dominio, datos, restricción o contraejemplo.
7. **Aplicar:** actualizar el artefacto del proyecto.
8. **Reflexionar:** explicar la decisión, el error corregido y la próxima duda.
9. **Recuperar después:** reabrir el concepto en una estación posterior o en una cola de revisión.

La retroalimentación debe evitar “correcto/incorrecto” como única respuesta. Debe señalar el criterio, la evidencia y el siguiente paso. La IA puede producir la primera retroalimentación; las reglas deterministas y las pruebas deben verificar los aspectos que no dependen de interpretación.

### O — Observabilidad, evidencia y maestría

La aplicación debe separar cuatro estados:

- **Explorado:** el aprendiz abrió el contenido.
- **Practicado:** realizó al menos un intento.
- **Dominado:** superó dos o más ítems variados y uno independiente.
- **Transferido:** resolvió un caso nuevo y explicó la decisión.

Umbral inicial recomendado, para calibrar en un piloto:

- al menos 80 % en ejercicios de una habilidad;
- ningún error crítico abierto;
- una respuesta correcta en una variante no idéntica al ejemplo;
- artefacto actualizado y consistente con el criterio;
- explicación breve en lenguaje propio;
- reintento registrado cuando hubo error.

La guía debe medir también, sin convertirlo en vigilancia invasiva: intento inicial, ayuda solicitada, tipo de error, tiempo hasta la primera acción, reintento, transferencia y calidad del producto. Los datos deben permanecer locales por defecto y exportarse solo de forma intencional.

### IA como capa de apoyo, no como fuente de verdad

La IA de la guía debe tener cinco roles separados:

| Rol | Puede hacer | No debe hacer |
|---|---|---|
| Tutor | Formular preguntas, dar pistas graduadas, recuperar prerrequisitos | Resolver de inmediato o ocultar la respuesta detrás de un discurso largo |
| Ejemplificador | Mostrar un caso resuelto, un contraejemplo y el razonamiento | Presentar una decisión de negocio inventada como hecho |
| Crítico | Comparar el trabajo con la rúbrica, detectar inconsistencias y priorizar riesgos | Reescribir silenciosamente el artefacto del aprendiz |
| Generador | Crear variantes, datos ficticios, casos límite y esqueletos después del intento | Producir el entregable final antes de que exista una decisión humana |
| Investigador | Buscar fuentes actuales, citar y señalar vigencia o incertidumbre | Inventar bibliografía, ocultar la fecha o mezclar fuentes de distinta autoridad |

La investigación reciente sobre IA educativa es prometedora pero heterogénea. Un metaanálisis de ChatGPT reportó un efecto medio global de `g = 0,573`, pero también señaló que la base era reciente y se concentraba en universitarios. Una revisión de 2026 sobre IA generativa en STEM encontró heterogeneidad extrema (`I² = 96,32 %`), un intervalo de predicción que incluía efectos negativos y señales de sesgo de publicación. [Doo y Park](https://www.irrodl.org/index.php/irrodl/article/view/8775), [Boolzen et al.](https://link.springer.com/article/10.1007/s10462-026-11665-9)

Por eso la guía debe medir si la IA mejora una actividad de aprendizaje específica, no asumir que “usar IA” es la intervención. UNESCO recomienda un enfoque humano, apropiado para la edad, con protección de privacidad y validación pedagógica; el Departamento de Educación de Estados Unidos insiste en mantener a las personas dentro del circuito de decisión. [UNESCO](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research), [U.S. Department of Education](https://www.ed.gov/sites/ed/files/documents/ai-report/ai-report.pdf)

## 6. Cómo debe construirse cualquier guía con IA

### Paso 1 — Crear el paquete de conocimiento canónico

La IA debe recibir un paquete delimitado, con versión y autoridad:

```text
domain/
  00-contexto-y-alcance.md
  01-glosario.json
  02-reglas-del-dominio.json
  03-ejemplos-resueltos.json
  04-contraejemplos-y-errores.json
  05-casos-de-transferencia.json
  06-fuentes-y-vigencia.md
```

Cada afirmación debe clasificarse como `[HECHO]`, `[REGLA DE FUENTE]`, `[INFERENCIA]` o `[POR VALIDAR]`. Los archivos de conocimiento deben contener el contenido de referencia; las instrucciones deben contener comportamiento, límites, tono y formato. Esta separación es coherente con la documentación actual de GPTs, Gems y Claude Projects.

### Paso 2 — Construir el grafo de habilidades

Para cada habilidad se registran prerrequisitos, errores frecuentes, ejemplos positivos, no-ejemplos, ítems fáciles, ítems variados y una tarea de transferencia.

```json
{
  "id": "mer.cardinality.bidirectional",
  "outcome": "Determina min y max en ambas direcciones y lo justifica con hechos",
  "prerequisites": ["mer.entity.filter", "mer.business.verb"],
  "misconceptions": ["leer el plural como N:M", "confundir opcionalidad con máximo"],
  "mastery": { "practice": 0.8, "transfer": 1, "explanation": true },
  "evidence": ["relation-matrix", "oral-defense"],
  "reviewAfterDays": [1, 7, 21]
}
```

### Paso 3 — Diseñar estaciones, no capítulos

Una estación es una unidad de decisión. Debe poder responder: “¿qué cambió en la mente o en el producto del aprendiz después de diez o veinte minutos?”. Si una pantalla solo explica, todavía no es una estación completa.

Contrato mínimo de una estación:

```json
{
  "id": "m02-cardinality",
  "outcome": "Determina cardinalidad y participación con dos preguntas",
  "projectCommit": "Actualiza la matriz de relaciones del proyecto",
  "workedExample": "Cliente realiza muchas órdenes; una orden pertenece a un cliente",
  "guidedExercise": "Completa el min y max de cada dirección",
  "independentVariant": "Aprendiz y curso con matrícula",
  "feedback": "Explica el error y muestra el criterio, no solo la respuesta",
  "exitEvidence": ["relation-matrix", "reasoning-note"],
  "criticalErrors": ["FK en lado incorrecto", "N:M sin tabla puente"],
  "aiRole": "tutor-critic"
}
```

### Paso 4 — Generar ejercicios con variación

Para cada concepto, generar al menos:

- un ejemplo trabajado;
- un caso casi igual para consolidar;
- un caso con un distractor;
- un contraejemplo;
- una variante de otro dominio;
- un caso límite;
- un reto de transferencia sin plantilla.

La IA debe explicar por qué las alternativas incorrectas son tentadoras. Esto crea un banco de errores, no solo un banco de respuestas.

### Paso 5 — Construir la evaluación antes de la interfaz

La evaluación se diseña en tres capas:

- **Formativa:** microdecisiones y retroalimentación sin penalización.
- **De desempeño:** el aprendiz construye o modifica un artefacto.
- **De transferencia:** resuelve un caso nuevo, con defensa breve y criterios públicos.

La rúbrica debe separar proceso y producto. Para un sistema de información: cobertura del requisito, coherencia semántica, integridad estructural, pruebas, privacidad, mantenibilidad y explicación humana.

### Paso 6 — Implementar primero local-first

Para el tipo de proyecto que se desarrolla en este computador, la arquitectura base recomendada es:

- React/Vite o una SPA equivalente para la experiencia.
- Datos de contenido separados del código de componentes.
- Manifest JSON versionado como contrato de guía.
- Estado local por proyecto, habilidad, intento y artefacto.
- Exportación completa a JSON/Markdown/CSV/SQL.
- Sin datos reales por defecto; ejemplos ficticios y sanitizados.
- Integración externa de IA opcional, con copia de contexto explícita.
- Validadores locales para sintaxis, reglas y consistencia.

La nube solo se agrega cuando haya una necesidad clara de colaboración, revisión docente, analítica agregada o sincronización. La decisión debe considerar privacidad, costo, conectividad y gobernanza.

### Paso 7 — Auditar la guía en cuatro niveles

1. **Contenido:** exactitud, fuentes, vigencia, terminología y límites.
2. **Pedagogía:** objetivo observable, práctica, retroalimentación, transferencia y reintento.
3. **Sistema:** persistencia, exportación, accesibilidad, rendimiento y recuperación.
4. **IA:** contexto fundamentado, etiquetas de incertidumbre, privacidad, inyección de instrucciones, trazabilidad y revisión humana.

Una guía solo se libera si cada nivel tiene pruebas. El `npm run build` verifica compilación, pero no demuestra aprendizaje; debe acompañarse con recorrido de novato, auditoría de contenido y prueba de transferencia.

## 7. Aplicación concreta a la Guía MER: MER 2.0

### Arquitectura pedagógica propuesta

No es necesario eliminar las ocho estaciones. Se debe hacer que todas escriban en un mismo proyecto y que cada una tenga un criterio de dominio.

| Estación actual | Commit del proyecto | Dominio que debe demostrarse |
|---|---|---|
| 00 · El Excel gigante | Problema, contexto y tres casos de prueba de anomalías | Explica inserción, actualización y borrado con datos concretos |
| 01 · Entidades y atributos | Glosario y matriz de entidades candidatas | Justifica inclusión, descarte, PK, atributo compuesto, multivalorado y derivado |
| 02 · Cardinalidad | Matriz de relaciones con min/max y preguntas abiertas | Razona ambas direcciones; distingue máximo y participación |
| 03 · Transformación | Esquema lógico inicial | Ubica FK y tablas puente; explica el lado dependiente |
| 04 · Diccionario | Diccionario y reglas de integridad | Declara tipo, nulabilidad, UQ, CHECK, FK, DEFAULT y borrado |
| 05 · Proyecto | ERD, SQL y diccionario del caso propio | Integra el dominio nuevo sin copiar el caso de ejemplo |
| 06 · IA | Registro de propuesta, fuente, supuesto, corrección y prueba | Muestra qué aportó la IA y qué decidió la persona |
| 07 · Calidad | Matriz de pruebas, privacidad, migración, rendimiento y defensa | Prueba alta/cambio/borrado, evolución y explicación pública |

### Cambios P0: imprescindibles

- Crear `projectState` con requisitos, glosario, entidades, relaciones, atributos, esquema, pruebas y decisiones; cada estación lo actualiza.
- Convertir “desbloqueado” en una regla real: permitir exploración libre, pero exigir dominio o una justificación para avanzar en la ruta certificable.
- Añadir pretest de 8–12 ítems y postest equivalente; incluir una prueba diferida de recuperación.
- Guardar intentos y errores por habilidad, no solo módulos completados.
- Exigir una variante independiente en m1–m5 y una transferencia final en m7.
- Reemplazar el validador regex de requisitos por una matriz de cobertura editable: requisito → evidencia → entidad/relación → prueba.
- Comparar automáticamente Mermaid, diccionario y SQL en las reglas que sí pueden verificarse localmente.
- Convertir la selección de temas de m7 en prácticas ejecutadas o respuestas justificadas, no únicamente en casillas marcadas.
- Añadir una defensa de 3–5 minutos: “explica dos decisiones, un riesgo, una corrección y un supuesto pendiente”. Puede ser grabación opcional, texto o conversación con instructor.

### Cambios P1: alto valor

- Cola de recuperación a 1, 7 y 21 días.
- Banco de variantes por dominio y por error.
- Modo “pista” con cuatro niveles: pregunta, pista conceptual, paso parcial, ejemplo completo.
- Revisión entre pares con roles: analista de dominio, modelador, tester y auditor de IA.
- Adaptación por dificultad: novato recibe más ejemplos trabajados; quien domina recibe restricciones y casos límite.
- Validador local de DDL o ejecución en un sandbox controlado; nunca ejecutar automáticamente SQL destructivo.
- Exportación de un paquete reproducible: `project.json`, `requirements.md`, `model.mmd`, `schema.sql`, `dictionary.csv`, `tests.md`, `ai-log.md` y `README.md`.

### Cambios P2: escala y producto

- Adaptador de IA para proveedores externos, manteniendo el mismo contrato de tutor y auditor.
- Panel local de progreso por habilidades y errores, sin ranking público.
- Catálogo de guías hermanas que reutilicen el mismo motor y cambien solo manifest, contenido y validadores.
- Instrumentación anónima y opt-in para medir qué ejercicios realmente ayudan.
- Sistema de versiones de guía y migración del estado cuando cambie el manifest.

### Ejemplo de una estación MER con el ciclo completo

**Objetivo:** decidir y justificar la relación entre `CLIENTE` y `ORDEN_SERVICIO`.

**Ejemplo trabajado:** una persona cliente puede solicitar varias órdenes; cada orden pertenece a un cliente. Se muestran las dos preguntas, `(0,N)` y `(1,1)` según la regla confirmada, y se deriva `id_cliente` al lado muchos.

**Ejercicio guiado:** se entrega la relación entre `APRENDIZ` y `CURSO` y se deja incompleta la segunda pregunta. El sistema pide elegir entre `1:N`, `N:M` y `1:1`, y explica por qué “varios cursos” no basta para decidir sin preguntar por el sentido inverso.

**Ejercicio independiente:** el aprendiz recibe `PEDIDO` y `PRODUCTO`, con precio pactado y cantidad. Debe detectar `N:M`, crear `DETALLE_PEDIDO` y ubicar allí los atributos del vínculo.

**Transferencia:** una veterinaria registra mascotas, propietarios, citas y tratamientos. No se permite cargar la solución; se entrega una rúbrica y una lista de preguntas.

**Commit:** se actualizan la matriz de relaciones, el ERD, el diccionario y un caso de prueba.

**Reflexión:** “¿Qué dato confundí con entidad? ¿Qué supuesto sigue sin validar? ¿Qué ocurriría al borrar el propietario?”.

## 8. Instrucción maestra para crear nuevas guías con IA

Esta instrucción es una plantilla de autoría. Debe recibir el paquete de dominio como contexto y producir una especificación revisable antes de generar código.

```text
Actúa como arquitecto instruccional, experto del dominio y diseñador de sistemas de aprendizaje.

OBJETIVO
Crear una guía interactiva local-first para que una persona pase de [SITUACIÓN REAL]
a [DESEMPEÑO O PRODUCTO FINAL] y pueda defenderlo ante [AUDIENCIA].

CONTEXTO
- Público: [NIVEL, PRERREQUISITOS, IDIOMA]
- Tiempo de exploración: [MINUTOS]
- Tiempo de dominio: [HORAS O SESIONES]
- Entorno: [SIN CONEXIÓN, WEB, MÓVIL, SENA, EMPRESA]
- Restricciones: [PRIVACIDAD, ACCESIBILIDAD, MOTOR, PRESUPUESTO]
- Fuentes canónicas: [ARCHIVOS Y URL]

REGLAS DE EVIDENCIA
1. Separa [HECHO], [REGLA DE FUENTE], [INFERENCIA] y [POR VALIDAR].
2. No inventes requisitos, cifras, bibliografía ni decisiones de negocio.
3. Cada objetivo debe tener evidencia observable y una prueba de transferencia.
4. Cada afirmación actualizable debe tener fuente, fecha y nivel de confianza.
5. La IA propone; la persona decide y registra la corrección.

ENTREGABLES OBLIGATORIOS
1. Ficha de público, contexto, límites y resultados de aprendizaje.
2. Grafo de habilidades con prerrequisitos, errores y umbral de dominio.
3. Proyecto auténtico con pregunta guía, entregables incrementales, audiencia y rúbrica.
4. Entre 5 y 9 estaciones; cada una debe incluir:
   - objetivo observable;
   - recuperación de un prerrequisito;
   - explicación breve;
   - ejemplo trabajado con razonamiento visible;
   - ejercicio guiado con andamiaje;
   - ejercicio independiente;
   - variante o contraejemplo;
   - retroalimentación accionable y reintento;
   - commit al proyecto;
   - reflexión y evidencia de salida;
   - errores críticos y ayudas graduadas.
5. Banco de evaluación formativa, desempeño y transferencia.
6. Rúbrica de proceso, producto, explicación y uso responsable de IA.
7. Prompts separados para tutor, ejemplificador, crítico, generador e investigador.
8. Manifest JSON, esquema de estado local y contrato de exportación.
9. Plan de pruebas de contenido, pedagogía, UX, accesibilidad, rendimiento y seguridad.
10. Lista de preguntas que requieren validación humana antes de publicar.

FORMATO
Entrega primero la especificación y espera aprobación conceptual.
No generes código hasta que el mapa de habilidades, la rúbrica y el proyecto
sean coherentes. Si hay conflicto entre comodidad, rigor y privacidad, expón
la decisión y ofrece opciones.
```

### Instrucción de tutor para el aprendiz

```text
Eres tutor de [TEMA]. Tu meta es que la persona razone y produzca, no que copie.
Antes de responder identifica el objetivo de la estación y el intento de la persona.

Usa esta escalera de ayuda:
1. Haz una pregunta que oriente.
2. Da una pista sobre el criterio.
3. Muestra solo el siguiente paso.
4. Si ya hubo intento, enseña un ejemplo paralelo.
5. Solo entrega una solución completa si la persona la solicita después de intentar.

En cada respuesta separa:
- Qué está respaldado por la guía o la fuente.
- Qué es una inferencia.
- Qué falta validar.
- Qué debe hacer ahora la persona.

No inventes reglas de negocio, no marques como correcto algo que no se probó,
no reescribas el artefacto sin mostrar el cambio y pide una explicación en
lenguaje propio antes de cerrar la estación.
```

## 9. Criterios de publicación

Una nueva guía debe pasar estos gates:

### Gate pedagógico

- Cada resultado se puede demostrar con un producto, una decisión o una explicación.
- Cada estación tiene ejemplo, práctica, retroalimentación, variación y reintento.
- El proyecto aparece temprano y recibe commits acumulativos.
- Existe una prueba de transferencia que no puede resolverse copiando el ejemplo.
- La rúbrica valora proceso y producto.

### Gate de contenido

- Las fuentes están identificadas, fechadas y clasificadas por autoridad.
- Las reglas del dominio están separadas de opiniones de diseño.
- Los ejemplos contienen datos ficticios y contraejemplos.
- Las ambigüedades están marcadas y no se presentan como certezas.

### Gate de IA

- El tutor tiene una política de pistas y no responde siempre con la solución.
- El contexto y las instrucciones están separados.
- La salida incluye supuestos, fuentes y nivel de confianza cuando aplica.
- El aprendiz puede ver, corregir y exportar el rastro de IA.
- La decisión final permanece en la persona o en el instructor.

### Gate de sistema

- El estado se recupera tras cerrar y abrir la aplicación.
- El paquete completo de evidencias se puede exportar.
- La navegación no promete bloqueos que el código no aplica.
- Teclado, lector de pantalla, contraste, mensajes de error y viewport móvil están probados.
- El contenido y los validadores están desacoplados de los componentes.

## 10. Métricas del piloto

Estas son metas iniciales recomendadas, no resultados ya demostrados. Deben calibrarse con 5–10 aprendices y una comparación pre/post:

- **Aprendizaje:** mejora entre pretest y postest; al menos 80 % en la habilidad objetivo.
- **Retención:** al menos 80 % en una recuperación diferida a 7 días.
- **Transferencia:** desempeño de 3/4 o superior en una rúbrica de caso nuevo.
- **Calidad de producto:** 100 % de relaciones críticas trazadas a requisito y prueba; cero errores críticos abiertos.
- **Uso de IA:** 100 % de las decisiones generadas por IA registradas como aceptadas, corregidas o pendientes.
- **Reintento:** proporción de errores que termina en una corrección, no solo en abandono.
- **Experiencia:** tiempo hasta la primera acción significativa, puntos de abandono y claridad percibida de la siguiente acción.

No se debe declarar que una guía “funciona” solo porque se ve moderna, porque el usuario termina la ruta o porque una IA produce un diagrama convincente. Se debe observar si el aprendiz puede hacer algo nuevo, con menos ayuda y con una explicación defendible.

## Estado de implementación en esta guía

La primera iteración de MER 2.0 ya aplica parte de ARCO-IA en el código local:

- `useLocalProgress` conserva `projectState`, progreso por habilidad e historial de intentos, con migración compatible con el estado anterior.
- La pantalla inicial muestra un expediente vivo con el estado del requisito, modelo conceptual, esquema y decisiones.
- La interfaz diferencia una estación practicada de una habilidad transferida y dejó de presentar bloqueos ficticios.
- El módulo 05 incluye la matriz requisito → entidad/tabla → relación/regla → prueba, guardada localmente.
- El cierre del módulo 05 exige validar las señales del requisito y completar la trazabilidad antes de continuar.
- Las estaciones 01, 02 y 04 envían al mismo expediente las entidades/atributos clasificados, la relación razonada y los campos del diccionario; cada estación también deja un commit de evidencia con fecha.
- El pretest/postest de recuperación guarda respuestas, puntajes y errores sin convertir la línea base en una calificación sancionatoria.
- El portafolio incluye una defensa técnica persistente; el dictamen local solo puede aparecer como aprobado cuando las evidencias y la explicación defendible están completas.
- Las exportaciones de evidencia incluyen el expediente, evaluación, intentos, commits, decisiones de IA y defensa, para que el aprendizaje sea auditable fuera de la interfaz.
- Mermaid y SQL ya se conservan dentro del expediente; el laboratorio muestra señales deterministas de integridad básica sin confundirlas con validación completa del significado del negocio.

Esto es infraestructura de observabilidad, no una certificación automática de dominio. El siguiente incremento de alto valor es construir la variante de transferencia independiente y conectar validadores deterministas de Mermaid, SQL, diccionario y pruebas.

## Cierre

La Guía MER ya posee la semilla correcta: aprendizaje activo, laboratorios, proyecto, artefactos portables, IA auditable y evolución por iteraciones. La estrategia definitiva es convertir esa semilla en un sistema coherente de maestría:

**un proyecto desde el inicio, una decisión observable por estación, un ciclo repetido de ejemplo–práctica–retroalimentación–variación, una evidencia acumulativa, una prueba de transferencia y una IA que hace visible la incertidumbre.**

Esa arquitectura es reusable para crear sistemas de información y guías especializadas en cualquier tema sin depender de una plataforma educativa específica.

## Fuentes consultadas

1. Freeman et al. “Active learning increases student performance in science, engineering, and mathematics.” PNAS, 2014. [DOI](https://doi.org/10.1073/pnas.1319030111)
2. Education Endowment Foundation. “Feedback.” [Toolkit](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback)
3. Education Endowment Foundation. “Metacognition and self-regulation.” [Toolkit](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation)
4. Agarwal, Nunes y Blunt. “Retrieval Practice Consistently Benefits Student Learning.” Educational Psychology Review, 2021. [DOI](https://doi.org/10.1007/s10648-021-09595-9)
5. Chen y Yang. “Revisiting the effects of project-based learning on students’ academic achievement.” Educational Research Review, 2019. [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1747938X19300211)
6. Zhang y Ma. “A study of the impact of project-based learning on student learning effects.” Frontiers in Psychology, 2023. [DOI](https://doi.org/10.3389/fpsyg.2023.1202728)
7. Education Endowment Foundation. “Project-Based Learning – trial.” [Evaluation](https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/project-based-learning)
8. PBLWorks. “Gold Standard: Project Design Elements.” [Framework](https://www.pblworks.org/what-is-pbl/gold-standard-project-design)
9. Education Endowment Foundation. “Collaborative learning approaches.” [Toolkit](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/collaborative-learning-approaches)
10. Li, Ma y Shi. “Examining the effectiveness of gamification as a tool promoting teaching and learning.” Frontiers in Psychology, 2023. [DOI](https://doi.org/10.3389/fpsyg.2023.1253549)
11. Doo y Park. “A Meta-Analysis of ChatGPT’s Influence on Learning Achievement.” International Review of Research in Open and Distributed Learning, 2026. [Artículo](https://www.irrodl.org/index.php/irrodl/article/view/8775)
12. Boolzen et al. “Evidence of impact and interpretational limits of generative AI in STEM education.” Artificial Intelligence Review, 2026. [DOI](https://doi.org/10.1007/s10462-026-11665-9)
13. UNESCO. “Guidance for generative AI in education and research.” 2023, actualización de página 2026. [Guía](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research)
14. U.S. Department of Education. “Artificial Intelligence and the Future of Teaching and Learning.” [PDF](https://www.ed.gov/sites/ed/files/documents/ai-report/ai-report.pdf)
15. Coursera. “Coursera White Paper Details the Pedagogy Underlying Guided Projects.” [Artículo](https://blog.coursera.org/coursera-white-paper-details-the-pedagogy-underlying-guided-projects-on-coursera/)
16. Codecademy. “Projects.” [Catálogo](https://www.codecademy.com/projects)
17. Khan Academy. “Meet Khanmigo.” [Producto](https://www.khanacademy.org/khan-labs)
18. Google. “Tips for creating custom Gems.” [Ayuda oficial](https://support.google.com/gemini/answer/15235603?hl=es)
19. OpenAI. “Creating and editing GPTs.” [Ayuda oficial](https://help.openai.com/en/articles/8554397-creating-a-gpt)
20. Anthropic. “How can I create and manage projects?” [Ayuda oficial](https://support.anthropic.com/en/articles/9519177-how-can-i-create-and-manage-projects)
21. Mermaid. “Entity Relationship Diagrams.” [Documentación](https://mermaid.js.org/syntax/entityRelationshipDiagram)
22. Colombia Aprende. “El ABP como estrategia pedagógica en la educación a distancia.” [Experiencia](https://contactomaestro.colombiaaprende.edu.co/experiencias-significativas/el-abp-como-estrategia-pedagogica-en-la-educacion-distancia)
