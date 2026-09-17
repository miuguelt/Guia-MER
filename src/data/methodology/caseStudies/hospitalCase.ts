import type { SystemCaseStudy } from '../types'

export const hospitalCase: SystemCaseStudy = {
  id: 'hospital',
  title: 'Sistema Hospitalario y Citas Médicas',
  category: 'Salud y Gestión Clínica',
  narrative: `Un hospital universitario requiere gestionar las consultas médicas de sus pacientes. El centro cuenta con médicos adscritos, cada uno con documento de identidad, nombre, registro médico y una especialidad médica principal (Cardiología, Pediatría, etc.). Los pacientes se registran con su documento único, nombre, fecha de nacimiento, grupo sanguíneo y teléfono de contacto. Los pacientes agendan citas médicas con un médico en una fecha y hora específica. Una cita tiene un estado (programada, atendida, cancelada) y un motivo de consulta. Cuando la cita es atendida, el médico genera una entrada en la historia clínica del paciente con el diagnóstico (código CIE-10 y descripción) y puede prescribir uno o varios medicamentos, especificando la dosis y la duración en días.`,
  entities: [
    {
      name: 'ESPECIALIDAD',
      description: 'Área médica en la que se desempeñan los profesionales.',
      attributes: [
        { name: 'id_especialidad', type: 'INTEGER', role: 'PK', description: 'Identificador técnico.' },
        { name: 'nombre', type: 'VARCHAR(80)', role: 'UQ', description: 'Nombre de la especialidad.' },
      ],
    },
    {
      name: 'MEDICO',
      description: 'Profesional de salud autorizado para atender consultas.',
      attributes: [
        { name: 'id_medico', type: 'UUID', role: 'PK', description: 'Identificador del médico.' },
        { name: 'id_especialidad', type: 'INTEGER', role: 'FK', description: 'Especialidad principal.' },
        { name: 'tarjeta_profesional', type: 'VARCHAR(30)', role: 'UQ', description: 'Registro médico oficial.' },
        { name: 'nombre_completo', type: 'VARCHAR(150)', role: 'ATTR', description: 'Nombre del facultativo.' },
      ],
    },
    {
      name: 'PACIENTE',
      description: 'Persona que recibe atención médica.',
      attributes: [
        { name: 'id_paciente', type: 'UUID', role: 'PK', description: 'Identificador del paciente.' },
        { name: 'documento', type: 'VARCHAR(20)', role: 'UQ', description: 'Documento nacional de identidad.' },
        { name: 'nombre_completo', type: 'VARCHAR(150)', role: 'ATTR', description: 'Nombres y apellidos.' },
        { name: 'fecha_nacimiento', type: 'DATE', role: 'ATTR', description: 'Fecha para derivar la edad.' },
        { name: 'grupo_sanguineo', type: 'VARCHAR(5)', role: 'ATTR', description: 'O+, A+, B-, etc.' },
      ],
    },
    {
      name: 'CITA_MEDICA',
      description: 'Evento de encuentro agendado entre médico y paciente.',
      attributes: [
        { name: 'id_cita', type: 'BIGINT', role: 'PK', description: 'Número de radicado de la cita.' },
        { name: 'id_paciente', type: 'UUID', role: 'FK', description: 'Paciente que asiste.' },
        { name: 'id_medico', type: 'UUID', role: 'FK', description: 'Médico que atiende.' },
        { name: 'fecha_hora', type: 'TIMESTAMPTZ', role: 'ATTR', description: 'Horario programado.' },
        { name: 'estado', type: 'VARCHAR(20)', role: 'ATTR', description: 'PROGRAMADA, ATENDIDA, CANCELADA.' },
        { name: 'motivo_consulta', type: 'TEXT', role: 'ATTR', description: 'Síntoma o solicitud inicial.' },
      ],
    },
    {
      name: 'HISTORIA_CLINICA_ENTRADA',
      description: 'Registro de evolución médica de una cita atendida.',
      attributes: [
        { name: 'id_entrada', type: 'BIGINT', role: 'PK', description: 'Identificador de la evolución.' },
        { name: 'id_cita', type: 'BIGINT', role: 'FK', description: 'Cita en la que se originó (1:1 con cita atendida).' },
        { name: 'diagnostico_cie10', type: 'VARCHAR(10)', role: 'ATTR', description: 'Código estándar diagnóstico.' },
        { name: 'descripcion_diagnostico', type: 'TEXT', role: 'ATTR', description: 'Observaciones del médico.' },
      ],
    },
  ],
  relations: [
    {
      source: 'ESPECIALIDAD',
      target: 'MEDICO',
      verb: 'agrupa',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Una especialidad cuenta con muchos médicos; cada médico pertenece a una especialidad.',
    },
    {
      source: 'PACIENTE',
      target: 'CITA_MEDICA',
      verb: 'solicita',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un paciente puede tener múltiples citas; cada cita corresponde a un solo paciente.',
    },
    {
      source: 'MEDICO',
      target: 'CITA_MEDICA',
      verb: 'atiende',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un médico puede atender muchas citas a lo largo del día; cada cita la atiende un médico.',
    },
    {
      source: 'CITA_MEDICA',
      target: 'HISTORIA_CLINICA_ENTRADA',
      verb: 'origina',
      cardinality: '1:1',
      leftMinMax: '(0,1)',
      rightMinMax: '(1,1)',
      explanation: 'Una cita atendida genera a lo sumo una entrada de historia clínica; la entrada pertenece a una cita específica.',
    },
  ],
  mermaid: `erDiagram
    ESPECIALIDAD ||--o{ MEDICO : "agrupa"
    PACIENTE ||--o{ CITA_MEDICA : "solicita"
    MEDICO ||--o{ CITA_MEDICA : "atiende"
    CITA_MEDICA ||--o| HISTORIA_CLINICA_ENTRADA : "origina"

    ESPECIALIDAD {
        int id_especialidad PK
        varchar nombre UK
    }
    MEDICO {
        uuid id_medico PK
        int id_especialidad FK
        varchar tarjeta_profesional UK
        varchar nombre_completo
    }
    PACIENTE {
        uuid id_paciente PK
        varchar documento UK
        varchar nombre_completo
        date fecha_nacimiento
        varchar grupo_sanguineo
    }
    CITA_MEDICA {
        bigint id_cita PK
        uuid id_paciente FK
        uuid id_medico FK
        timestamptz fecha_hora
        varchar estado
        text motivo_consulta
    }
    HISTORIA_CLINICA_ENTRADA {
        bigint id_entrada PK
        bigint id_cita FK, UK
        varchar diagnostico_cie10
        text descripcion_diagnostico
    }`,
  sqlSample: `CREATE TABLE cita_medica (
  id_cita BIGSERIAL PRIMARY KEY,
  id_paciente UUID NOT NULL REFERENCES paciente(id_paciente) ON DELETE RESTRICT,
  id_medico UUID NOT NULL REFERENCES medico(id_medico) ON DELETE RESTRICT,
  fecha_hora TIMESTAMPTZ NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'PROGRAMADA'
    CHECK (estado IN ('PROGRAMADA', 'ATENDIDA', 'CANCELADA', 'NO_ASISTIO')),
  motivo_consulta TEXT NOT NULL
);

CREATE TABLE historia_clinica_entrada (
  id_entrada BIGSERIAL PRIMARY KEY,
  id_cita BIGINT NOT NULL UNIQUE REFERENCES cita_medica(id_cita) ON DELETE RESTRICT,
  diagnostico_cie10 VARCHAR(10) NOT NULL,
  descripcion_diagnostico TEXT NOT NULL
);`,
}
