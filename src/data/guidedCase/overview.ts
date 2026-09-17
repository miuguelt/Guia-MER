export const guidedCaseTitle = 'Taller Ruta 7 · Gestión de mantenimiento automotor'

export const guidedCaseBrief = `Taller Ruta 7 es un taller independiente que atiende motocicletas y automóviles. Hoy trabaja con formatos de papel, una hoja de cálculo de clientes y mensajes de WhatsApp. La administración quiere un sistema que permita registrar propietarios, vehículos, órdenes de servicio, trabajos realizados, técnicos, repuestos consumidos y pagos, conservando la historia de cada vehículo y evitando que los cambios del catálogo borren la historia de una orden.`

export const guidedCaseScope = {
  in: [
    'Registro de clientes solicitantes y propietarios actuales.',
    'Registro de vehículos y consulta de su historial.',
    'Creación y seguimiento de órdenes de servicio.',
    'Catálogo de servicios y repuestos con precios vigentes.',
    'Asignación de técnicos, consumo de repuestos y pagos.',
    'Consultas operativas básicas por placa, estado y fecha.',
  ],
  out: [
    'Facturación electrónica y obligaciones tributarias.',
    'Compra a proveedores y contabilidad general.',
    'Diagnóstico automático con sensores del vehículo.',
    'Autenticación detallada y diseño de pantallas.',
  ],
}

export const guidedCaseActors = [
  { name: 'Recepción', action: 'registra clientes, vehículos, órdenes y pagos.' },
  { name: 'Técnico', action: 'consulta la orden, registra trabajos y solicita repuestos.' },
  { name: 'Administrador', action: 'mantiene catálogos, consulta indicadores y corrige datos autorizados.' },
  { name: 'Cliente', action: 'entrega datos, autoriza el servicio y recibe el vehículo.' },
]

export const guidedCaseOpenQuestions = [
  '¿Un vehículo puede cambiar de propietario dentro del alcance de la primera versión? Si sí, ¿se requiere historial de propietarios?',
  '¿Se permite abrir una orden sin asignar técnico y en qué momento se vuelve obligatoria la asignación?',
  '¿Una orden puede tener varias visitas o debe existir una entidad adicional de cita/ingreso?',
  '¿El stock se calcula desde movimientos de inventario o basta con almacenar existencias actuales?',
  '¿Los pagos rechazados también se conservan como intentos o solo se registran pagos confirmados?',
  '¿La placa es única para siempre o puede reutilizarse después de retirar un vehículo?',
  '¿Qué roles concretos pueden corregir una orden cerrada y qué auditoría exige el instructor o el negocio?',
]
