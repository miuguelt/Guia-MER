import type { GuidedCaseSource } from './types'

export const guidedCaseSources: GuidedCaseSource[] = [
  {
    id: 'entrevista-recepcion',
    type: 'Entrevista',
    title: 'E01 · Recepción y administración',
    summary: 'La persona de recepción describe el flujo real de ingreso y cierre de una orden.',
    evidence: [
      '“Una persona puede traer varios vehículos. Para abrir una orden necesitamos saber quién solicita el trabajo y qué vehículo ingresa”.',
      '“La placa se consulta todo el tiempo, pero no quiero usarla como identificador interno porque puede corregirse por un error de digitación”.',
      '“Una orden puede tener varios servicios y puede quedar abierta mientras esperamos un repuesto”.',
      '“El precio que cobré debe conservarse aunque mañana cambie la tarifa del catálogo”.',
      '“No debemos borrar una orden cerrada ni un pago; si hay un error, se corrige dejando rastro”.',
    ],
  },
  {
    id: 'entrevista-tecnico',
    type: 'Entrevista',
    title: 'E02 · Técnico líder',
    summary: 'El técnico explica que una orden es un hecho operativo compuesto por varios trabajos y consumos.',
    evidence: [
      '“Una orden puede requerir a más de un técnico. Necesitamos saber quién participó y cuántas horas reportó”.',
      '“El repuesto se descuenta cuando se usa, no cuando se recomienda. Una misma orden puede consumir varias unidades de varios repuestos”.',
      '“En la orden se debe guardar el precio aplicado y el repuesto usado, porque el precio actual puede cambiar”.',
      '“Un trabajo puede estar pendiente, en proceso, terminado o cancelado; no todo se resuelve en la primera visita”.',
    ],
  },
  {
    id: 'encuesta-clientes',
    type: 'Encuesta · 24 respuestas',
    title: 'E03 · Necesidades percibidas por clientes',
    summary: 'Una encuesta corta prioriza las consultas que el sistema debe resolver sin inventar funciones.',
    evidence: [
      '18/24 quieren consultar el historial usando la placa.',
      '16/24 quieren recibir el estado de la orden sin llamar al taller.',
      '14/24 han tenido que repetir sus datos en visitas posteriores.',
      '12/24 han preguntado por el valor pagado en una visita anterior.',
      'La encuesta no define autenticación, notificaciones ni facturación: quedan como necesidades por validar.',
    ],
  },
  {
    id: 'formato-orden',
    type: 'Documento analizado',
    title: 'D01 · Formato físico de orden de servicio',
    summary: 'El formulario muestra qué información se captura hoy y qué problemas de estructura contiene.',
    evidence: [
      'Cabecera: número de orden, fecha de ingreso, cliente, teléfono, placa y kilometraje.',
      'Detalle repetible: descripción del trabajo, técnico, repuesto, cantidad y valor.',
      'Pie: subtotal de servicios, subtotal de repuestos, total, forma de pago y firma.',
      'Hallazgo: “técnico / repuesto / cantidad / valor” se repite en la misma hoja sin una fila identificable por cada hecho.',
    ],
  },
  {
    id: 'lista-precios',
    type: 'Documento analizado',
    title: 'D02 · Lista vigente de servicios y repuestos',
    summary: 'El catálogo entrega precios actuales, pero no debe reescribir los precios históricos.',
    evidence: [
      'Servicio: código, nombre, descripción, tarifa base y activo.',
      'Repuesto: código interno, nombre, unidad de medida, precio vigente y stock mínimo.',
      'Los códigos de catálogo son únicos dentro de su catálogo.',
      'Hallazgo: la tarifa base es una referencia actual; el valor aplicado pertenece a cada detalle de orden o consumo.',
    ],
  },
  {
    id: 'observacion-operacion',
    type: 'Observación',
    title: 'O01 · Recorrido por el taller',
    summary: 'La observación permite distinguir el proceso real de lo que solo aparece en una solicitud.',
    evidence: [
      'La búsqueda comienza casi siempre por placa y luego se revisan órdenes anteriores.',
      'Una orden puede existir sin pago registrado mientras está en proceso.',
      'El inventario se ajusta cuando se registra el consumo; recomendar no equivale a consumir.',
      'Se encontraron nombres de un mismo cliente escritos de tres formas: dato redundante y no controlado.',
    ],
  },
]
