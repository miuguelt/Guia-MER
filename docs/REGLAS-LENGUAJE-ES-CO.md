# Reglas globales de lenguaje: español de Colombia

Estas reglas aplican a toda la guía: interfaz, textos de ayuda, mensajes, ejemplos, documentación, pruebas, metadatos y archivos que se entreguen al aprendiz.

## Contrato obligatorio

1. El idioma de la experiencia es `es-CO`.
2. Todo texto natural visible debe estar escrito en español claro, institucional y comprensible para Colombia.
3. La palabra vetada de la solicitud anterior no se escribe ni se cita en fuentes, ejemplos, pruebas, nombres de archivos o mensajes. Cuando se necesite nombrar ese artefacto, se usan únicamente «Portafolio de Evidencias», «Expediente», «Informe» o «Registro Integral de Evidencias».
4. La política automática está en `language-policy.json`. Sus patrones se mantienen codificados para no reproducir términos vetados dentro de la propia regla.
5. Una detección bloquea la compilación. No se acepta como solución ocultar el texto, cambiar mayúsculas, insertar guiones o moverlo a un comentario, metadato, archivo generado o prueba.

## Vocabulario institucional y local

Se prefieren formas habituales en Colombia y en el contexto del SENA: aprendiz, instructor, ficha, competencia, resultado de aprendizaje, evidencia, ambiente de formación, regional, sede, municipio, vereda, computador, archivo, carro o vehículo, hacer clic, firewall, ustedes, celular, correo electrónico, contraseña, parqueadero y plataforma.

La guía evita variantes regionales que puedan distraer al aprendiz. Cuando exista más de una opción válida, se prioriza la forma neutra, directa y usada en la documentación institucional colombiana. No se fuerzan regionalismos en dominios que no los necesiten.

## Excepciones técnicas controladas

No se traducen contratos que deban permanecer exactos: nombres de librerías, paquetes, APIs, URLs, extensiones, clases CSS, identificadores de código, comandos, palabras reservadas de TypeScript, JavaScript, CSS, HTML, SQL y Mermaid, ni acrónimos como API, JSON, SQL, PK, FK, UUID y SENA.

La excepción técnica no permite introducir la palabra vetada en un identificador, comentario, ejemplo, dato de prueba, nombre de archivo o salida generada. Las entidades y los campos del modelo deben nombrarse en español, salvo que el sistema real imponga un contrato externo verificable.

## Flujo de control

Antes de entregar cambios:

1. Redactar la interfaz y la documentación en español de Colombia.
2. Confirmar que `index.html` declare `lang="es-CO"` y que `guide.manifest.json` conserve `language: "es-CO"`.
3. Ejecutar `npm run validate:language`.
4. Ejecutar `npm run build`; la compilación vuelve a revisar el código y, al final, los archivos generados.
5. Si el control falla, reemplazar el término señalado por una alternativa colombiana o por el nombre técnico estrictamente necesario y volver a ejecutar el control.

La revisión humana sigue siendo obligatoria para tono, claridad, contexto cultural y coherencia pedagógica. El control automático cubre la lista vinculante de vocabulario, la declaración regional y la presencia accidental de la palabra vetada en todo el material revisado.
