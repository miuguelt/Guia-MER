import type { QuizItem } from './masterclassTypes'

export const quizItems: QuizItem[] = [
  {
    id: 1,
    question: '¿Por qué almacenar una lista de productos separados por comas en una sola celda viola la Primera Forma Normal (1FN)?',
    options: [
      'Porque los motores SQL prohíben guardar texto con comas en columnas VARCHAR.',
      'Porque viola la regla de atomicidad; cada celda debe guardar un solo dato simple e indivisible.',
      'Porque obliga a crear una clave foránea hacia la tabla de clientes.',
      'Porque los arrays solo están permitidos en bases de datos NoSQL.',
    ],
    correct: 1,
    explanation:
      'La 1FN exige atomicidad absoluta: un solo valor por celda. Si guardas "Taladro, Brocas", no puedes indexar, no puedes hacer WHERE producto = "Brocas" eficientemente, ni puedes forzar tipos de datos numéricos en cantidades.',
  },
  {
    id: 2,
    question: '¿En qué condición una tabla que ya cumple la 1FN se encuentra automáticamente en Segunda Forma Normal (2FN)?',
    options: [
      'Cuando no tiene ninguna clave foránea.',
      'Cuando su clave primaria es simple (compuesta por una sola columna).',
      'Cuando todas sus columnas son de tipo numérico o fecha.',
      'Cuando tiene más de tres tablas relacionadas.',
    ],
    correct: 1,
    explanation:
      'La 2FN prohíbe las dependencias parciales de una clave compuesta. Por lo tanto, si la clave primaria es simple (una sola columna), es matemáticamente imposible que un atributo dependa de "una parte" de la clave. ¡Pasa directo a 2FN!',
  },
  {
    id: 3,
    question: 'En la cabecera de la factura tenemos: (num_factura [PK], cliente_id, nombre_cliente, telefono). ¿Por qué esto viola la 3FN?',
    options: [
      'Porque cliente_id no es un número entero consecutivo.',
      'Porque nombre_cliente y telefono dependen de cliente_id (un campo no clave), generando dependencia transitiva.',
      'Porque una factura solo puede tener un cliente.',
      'Porque falta agregar la clave foránea hacia el producto.',
    ],
    correct: 1,
    explanation:
      'Existe transitividad: num_factura determina cliente_id, y cliente_id determina nombre_cliente. Si el cliente compra 20 veces, su nombre se repite 20 veces. La 3FN exige que todo atributo no clave dependa directa y únicamente de la clave primaria.',
  },
  {
    id: 4,
    question: 'En la tabla detalle_factura guardamos precio_unitario_venta, y en producto guardamos precio_catalogo_base. ¿Viola esto la normalización?',
    options: [
      'Sí, es una redundancia grave que viola la 3FN y debe eliminarse de inmediato.',
      'No, porque precio_unitario_venta es un snapshot histórico inmutable de la venta, mientras que el catálogo guarda el valor actual de estantería.',
      'Sí, porque ningún dato puede repetirse con el mismo tipo numérico en dos tablas.',
      'No, siempre y cuando se actualice el detalle cuando cambie el catálogo.',
    ],
    correct: 1,
    explanation:
      '¡Es la distinción clásica de software! El precio de venta en la factura es un hecho histórico legal y contable: lo que costó el producto ESE día. Si el catálogo sube por inflación, la factura emitida en el pasado no puede cambiar. No es redundancia accidental; es trazabilidad histórica.',
  },
]
