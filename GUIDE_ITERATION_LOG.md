# Iteration Log · DataGenesis

## 2026-09-09 · Iteración 01

- **Objetivo:** construir el recorrido web inicial para aprender MER y modelo relacional desde cero.
- **Decisión:** usar una SPA local con seis estaciones, `localStorage` y exportaciones en navegador; no se agrega backend en esta fase.
- **Resultado esperado:** cada estación produce una decisión observable y el laboratorio final entrega artefactos editables.
- **Verificación pendiente:** auditoría web con la aplicación levantada y recorrido de primera vez con un aprendiz.

## 2026-09-09 · Iteración 02

- **Necesidad detectada:** la ruta inicial enseñaba a construir el modelo, pero no explicitaba cómo usar asistentes de IA sin convertir una propuesta en verdad.
- **Cambio:** se añadieron las estaciones 06 y 07, la Gema `gema-arquitecto-mer-relacional.md`, una matriz de herramientas, un flujo con artefactos versionables y una auditoría de afirmaciones generadas por IA.
- **Cobertura ampliada:** normalización, datos temporales, privacidad, transacciones, índices, migraciones, pruebas, OLTP/analítica/NoSQL.
- **Evidencia nueva:** `ai-method` y `missing-topics`, registradas en `deliverables.registry.json` y montadas en `index.html`.
- **Decisión pedagógica:** la Gema pregunta y marca `[POR VALIDAR]` antes de producir Mermaid/SQL; el aprendiz conserva la decisión final.
- **Herramientas revisadas:** Gemini Gems, GPTs personalizados, Claude Projects, Mermaid, DBML/dbdiagram, Eraser y DrawSQL. “Poden” quedó como nombre no identificado, con instrucción para sustituirlo si se refería a otra herramienta.

## 2026-09-10 · Iteración 03

- **Necesidad detectada:** el laboratorio exportaba Mermaid, pero el aprendiz no podía comprobar visualmente si su edición compilaba; el uso de IA tampoco dejaba una bitácora local.
- **Cambio:** se añadió renderizado Mermaid en vivo con estado de carga y error, tres requisitos precargables (biblioteca, veterinaria y tienda) y una bitácora de IA con instrucción, contexto, supuestos, correcciones y pruebas.
- **Decisión técnica:** Mermaid se carga de forma diferida para no convertir su motor completo en parte del arranque inicial de la guía.
- **Persistencia:** la bitácora se guarda en `localStorage` y se puede descargar como Markdown; no se envía a un servidor.
- **Verificación:** compilación Vite/TypeScript y recorrido visual del editor, renderizado, ejemplos y guardado local.

## 2026-09-09 20:22 -05:00 - validated

- Iteración: datagenesis-mer-2026-20260909202250619
- Estándar: 2.4.0
- Resumen: Renderizado Mermaid en vivo, ejemplos de requisitos y bitácora local de IA para la evolución de DataGenesis.
- Evidencia: npm run build; Test-DevBrainEducationalGuide.ps1 -Strict; Test-GuideDeliverables.ps1 -Strict; Test-DevBrainCodePresentation.ps1 -FailOnViolations; web-audit axe=0 overflow=0 screenshots=8; Test-DevBrainModularity.ps1 Errors=0 Warnings=0
- Retroalimentación: Se verificó el laboratorio en navegador: Mermaid compila, la bitácora se guarda localmente y los ejemplos cambian el requisito.
- Reglas candidatas: 

## 2026-09-10 · Iteración 04

- **Necesidad detectada:** la explicación de 1:1, 1:N y N:M necesitaba una representación mental más explícita y más práctica de transferencia.
- **Cambio:** el módulo 02 ahora incluye una ilustración tripartita, diagramas SVG editables con marcas 1/N/M, explicación en ambos sentidos, traducción a FK o tabla puente, simulador binario, método de cinco pasos, ejercicios con retroalimentación y radar de errores.
- **Decisión pedagógica:** se enseña primero el máximo de cada extremo; la opcionalidad queda visible como una segunda capa para no mezclar preguntas distintas.
- **Recurso generado:** `public/images/cardinalidad-triptych.png`, usado como ancla visual sin texto.
- **Verificación:** `npm run build` y recorrido visual en navegador; se comprobó el cambio de 1:N a N:M y la retroalimentación del primer ejercicio.

## 2026-09-10 · Iteración 05

- **Necesidad detectada:** los módulos tenían actividades aisladas; faltaba una capa común que conectara explicación, representación visual y comprobación inmediata.
- **Cambio:** se añadió `LearningToolkit`, reutilizable en los módulos 00–07, con tres pestañas: analogía contextual, simulador manipulable y reto rápido con retroalimentación.
- **Cobertura:** anomalías con gráfico de repetición, entidades con foco por capas, cardinalidad con máximos en ambos sentidos, migración PK→FK, validación de constraints, cobertura de requisitos, riesgo de respuestas de IA y revisión sistémica del modelo.
- **Accesibilidad:** controles nativos, estados `aria-live`, pestañas con roles ARIA, botones con estados visibles y retroalimentación textual además del color.
- **Verificación:** `npm run build`, revisión visual de los módulos 00, 01, 02, 03, 04, 05, 06 y 07 en navegador, prueba del reto rápido y comprobación de overflow horizontal en viewport de escritorio.

## 2026-09-10 · Iteración 06

- **Necesidad detectada:** El aprendiz requería un método paso a paso que partiese desde el punto cero (narrativa sin procesar) para analizar cualquier sistema real y deducir: qué tablas llevará, qué atributos llevará cada tabla y cómo se relacionarán. Faltaban la tríada completa de anomalías (incluyendo inserción), taxonomía exhaustiva de atributos (simples, compuestos, multivalorados, derivados, PKs y UQs), cardinalidad mínima/máxima (participación obligatoria vs opcional), el catálogo de las 7 reglas de derivación relacional, normalización práctica (1FN-3FN) antes/después y casos de estudio completos de extremo a extremo.
- **Cambios realizados:**
  - **Módulo 00:** Tríada de anomalías de Codd completa (actualización, borrado e inserción interactiva) con selector multi-dominio (Tecnología, Clínica, Academia).
  - **Módulo 01:** Incorporación del Método Morfosintáctico (Sustantivos = Entidades, Adjetivos = Atributos, Verbos = Relaciones) + Filtro de Entidades + Laboratorio interactivo `AttributeClassifierLab` (simples, compuestos, multivalorados, derivados, claves).
  - **Módulo 02:** Componente `CardinalityNotationDeepDive` con comparación entre notación Chen `(min, max)` y Pata de Gallo (Crow's Foot), participación obligatoria/opcional y relaciones reflexivas con atributos propios.
  - **Módulo 03:** Catálogo interactivo de las 7 Reglas de Oro de Derivación Relacional con código SQL DDL correspondiente y simulación 1:N.
  - **Módulo 04:** Catálogo interactivo `SqlDataTypeCheatSheet` con tipos de datos SQL precisos (NUMERIC vs FLOAT, TIMESTAMPTZ, UUID), las 6 restricciones de integridad y políticas `ON DELETE` con advertencias de producción.
  - **Módulo 05:** Integración de `MethodologyMasterStepper` con el Framework Universal de 6 Pasos Maestros y 4 Casos de Estudio Reales Completos (E-commerce, Hospitalario, Académico y Taller Automotriz) con precarga directa al renderizador Mermaid en vivo.
  - **Módulo 07:** Integración del Laboratorio `NormalizationExplorer` con demostración visual antes/después de 1FN (atomicidad), 2FN (dependencias parciales) y 3FN (dependencias transitivas).
- **Verificación:** `npm run build` exitoso (código 0, 4090 módulos transformados, 0 errores de TypeScript), respeto al presupuesto modular (archivos <= 250 líneas) y diseño responsive verificado.

## 2026-09-12 · Iteración 07

- **Necesidad detectada:** la ruta mostraba módulos completados, pero no distinguía exploración, práctica, dominio y transferencia; además, el proyecto y sus requisitos no tenían una trazabilidad persistente única.
- **Cambio:** se documentó la estrategia ARCO-IA en `ESTRATEGIA-DEFINITIVA-GUIAS-IA.md` y se añadió al estado local `projectState`, `skillProgress` e historial de `attempts`.
- **Experiencia:** la pantalla inicial incorpora un “Expediente vivo” y las estaciones ya no muestran “Se desbloquea al avanzar” cuando la navegación es exploratoria; el progreso distingue “Practicado · pendiente transferencia”.
- **Transferencia:** el módulo 05 incorpora una matriz persistente requisito → entidad/tabla → relación/regla → prueba observable. El cierre queda deshabilitado hasta validar las señales del requisito y completar esa trazabilidad.
- **Verificación:** `npm run build` exitoso; `python -m pytest -q` reporta 3 pruebas correctas; recorrido visual confirmado en navegador local.

## 2026-09-12 · Iteración 08

- **Necesidad detectada:** el progreso necesitaba una línea base y una comprobación posterior de recuperación; completar pantallas no permite estimar ganancia ni retención.
- **Cambio:** se añadió `MasteryCheck` con pretest y postest de variantes equivalentes, retroalimentación por criterio y registro local de resultados e ítems fallados.
- **Decisión pedagógica:** el pretest no penaliza; el postest puede elevar la habilidad de recuperación a “Dominado”, pero no sustituye la transferencia en un caso nuevo.
- **Persistencia:** `AssessmentState` guarda respuestas, puntajes y fechas dentro del mismo estado local versionable.
- **Verificación:** `tsc -b` y `pytest` pasan. La compilación Vite no pudo repetirse en esta sesión porque el entorno devolvió `spawn EPERM` al crear el proceso interno de esbuild.

## 2026-09-12 · Iteración 09

- **Necesidad detectada:** las estaciones se marcaban como completadas, pero el proyecto no mostraba qué evidencia había producido cada una.
- **Cambio:** se añadió `commitProjectEvidence`; cada estación registra un único hito reemplazable en `projectState.commits`, con etiqueta, evidencia y fecha.
- **Experiencia:** el expediente vivo muestra prácticas registradas y commits acumulados. Los commits son hitos de trabajo, no equivalen automáticamente a dominio.
- **Verificación:** el contrato de tipos se mantiene válido con `tsc -b`; las pruebas Python continúan pasando.

## 2026-09-12 · Iteración 10

- **Necesidad detectada:** el expediente vivo tenía estructura y commits, pero las decisiones de las estaciones 01, 02 y 04 aún no alimentaban sus colecciones principales.
- **Cambio:** la estación 01 persiste entidades y atributos seleccionados; la 02 persiste la relación razonada; la 04 agrega los campos del diccionario al esquema y al conjunto de atributos.
- **Trazabilidad:** los commits de estación se reemplazan por módulo para conservar la última evidencia sin duplicar hitos al reintentar.
- **Verificación:** `tsc -b` y `pytest` pasan; se mantienen las advertencias de permisos del caché de pytest y el bloqueo ambiental de esbuild/Vite documentado en la iteración 08.

## 2026-09-12 · Iteración 11

- **Necesidad detectada:** el portafolio podía declarar la ruta completa sin incorporar una explicación personal del diseño ni el expediente técnico acumulado.
- **Cambio:** se añadió una defensa técnica persistente de mínimo recomendado de 80 caracteres; el estado “APROBADO” exige ahora las cinco evidencias y una defensa registrada.
- **Exportación:** JSON y Markdown incluyen evaluación, pretest/postest, dominio por habilidad, intentos, commits, entidades, relaciones, esquema, bitácora de IA y defensa.
- **Calidad:** la evidencia MER-EV01 exige trazabilidad completa; MER-EV02 usa las relaciones registradas; MER-EV04 reconoce decisiones de IA corregidas.
- **Verificación:** `tsc -b` y `pytest` pasan; la limitación ambiental de Vite/esbuild permanece documentada.

## 2026-09-12 · Iteración 12

- **Necesidad detectada:** Mermaid y SQL se editaban dentro del laboratorio, pero no formaban parte persistente del expediente ni tenían señales mínimas de revisión conjunta.
- **Cambio:** `projectState` ahora conserva `diagramCode` y `sqlCode`; al cargar un caso de estudio los artefactos se guardan junto con el requisito.
- **Calidad:** el módulo 05 muestra validaciones locales de ERD, tablas SQL y campos del esquema. Son detectores de integridad básica, no una aprobación semántica automática.
- **Verificación:** `tsc -b` y `pytest` pasan; se mantiene pendiente la compilación Vite por el `spawn EPERM` ambiental.

## 2026-09-17 · Iteración 13

- **Necesidad detectada:** Los prompts contenían meta-instrucciones docentes improductivas (como «Usa siempre aprendiz, nunca alumno») que carecían de sentido cuando el aprendiz las copiaba para analizar un sistema real. Asimismo, los prompts no debían convertirse en generadores de documentación burocrática inflada, sino en herramientas activas de ingeniería de software enfocadas en comprender a fondo el sistema bajo análisis (actores, límites, eventos, ciclo de vida, invariantes de datos, cardinalidad bidireccional y DDL ejecutable).
- **Cambios realizados:**
  - **Eliminación de meta-instrucciones:** Se purgó cualquier instrucción de estilo interno de los prompts (`gema-arquitecto-mer-relacional.md`, `src/data/ai.ts`, etc.).
  - **Suite de 4 herramientas de ingeniería:** Se modularizó la asistencia en una suite técnica especializada:
    1. *Arquitecto MER & Relacional:* De la narrativa del negocio a Mermaid y PostgreSQL DDL 3FN.
    2. *Deconstructor de Dominio y Procesos:* Descubrimiento de límites del sistema, eventos, actores y máquinas de estado.
    3. *Auditor de Cardinalidades y Reglas Ocultas:* Análisis bidireccional `(min, max)` y dimensión temporal del vínculo.
    4. *Motor DDL e Integridad Operacional:* Generación de esquemas PostgreSQL blindados con restricciones `CHECK`, políticas `ON DELETE` e índices, libres de texto burocrático.
  - **Laboratorio interactivo de IA (`AIWorkflowLab.tsx`):** Se implementó un selector de pestañas para alternar entre las 4 herramientas de ingeniería, con copiado al portapapeles, descarga individual en `.md` y visualización del momento de uso en el ciclo de desarrollo.
  - **Registro de entregables (`deliverables.registry.json`):** Se actualizaron las instrucciones de asistencia técnica (`aiAssist`) de `MER-EV01` a `MER-EV06` para orientarlas a la resolución de problemas de ingeniería sin fricción documental.
- **Verificación:** Validación de lenguaje es-CO (`scripts/validate-language.mjs`), pruebas unitarias `pytest` y compilación completa de producción `npm run build`.
