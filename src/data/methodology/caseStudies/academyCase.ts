import type { SystemCaseStudy } from '../types'

export const academyCase: SystemCaseStudy = {
  id: 'academy',
  title: 'Plataforma Académica y Cursos',
  category: 'Educación Superior y E-learning',
  narrative: `Una institución educativa necesita registrar a sus aprendices, instructores y cursos de formación. Los aprendices tienen documento de identidad, nombre, correo y fecha de ingreso. Los instructores cuentan con cédula, nombre, especialidad y título. Un curso tiene código único, nombre, número de créditos y horas de duración. Un instructor puede dictar varios cursos en un período, pero cada curso está a cargo de un instructor líder. Un aprendiz puede matricularse en múltiples cursos, y en cada curso se matriculan múltiples aprendices. Para cada matrícula, la institución registra la fecha de inscripción, el estado (activa, aprobada, reprobada) y una calificación definitiva final de 0.0 a 5.0 calculada al cierre.`,
  entities: [
    {
      name: 'INSTRUCTOR',
      description: 'Docente responsable del proceso pedagógico.',
      attributes: [
        { name: 'id_instructor', type: 'UUID', role: 'PK', description: 'Identificador del docente.' },
        { name: 'documento', type: 'VARCHAR(20)', role: 'UQ', description: 'Cédula de ciudadanía.' },
        { name: 'nombre_completo', type: 'VARCHAR(150)', role: 'ATTR', description: 'Nombres y apellidos.' },
        { name: 'titulo', type: 'VARCHAR(100)', role: 'ATTR', description: 'Formación académica principal.' },
      ],
    },
    {
      name: 'CURSO',
      description: 'Programa o asignatura impartida.',
      attributes: [
        { name: 'id_curso', type: 'INTEGER', role: 'PK', description: 'Identificador del curso.' },
        { name: 'id_instructor_lider', type: 'UUID', role: 'FK', description: 'Docente a cargo.' },
        { name: 'codigo', type: 'VARCHAR(15)', role: 'UQ', description: 'Código curricular (ej. ADSO-101).' },
        { name: 'nombre', type: 'VARCHAR(120)', role: 'ATTR', description: 'Nombre de la materia.' },
        { name: 'creditos', type: 'SMALLINT', role: 'ATTR', description: 'Créditos académicos.' },
      ],
    },
    {
      name: 'APRENDIZ',
      description: 'Estudiante matriculado en la institución.',
      attributes: [
        { name: 'id_aprendiz', type: 'UUID', role: 'PK', description: 'Identificador del estudiante.' },
        { name: 'documento', type: 'VARCHAR(20)', role: 'UQ', description: 'Documento de identidad.' },
        { name: 'nombre_completo', type: 'VARCHAR(150)', role: 'ATTR', description: 'Nombres y apellidos.' },
        { name: 'email_institucional', type: 'VARCHAR(120)', role: 'UQ', description: 'Correo para notificaciones.' },
      ],
    },
    {
      name: 'MATRICULA',
      description: 'Tabla asociativa N:M entre Aprendiz y Curso con datos de la relación.',
      isWeak: true,
      attributes: [
        { name: 'id_aprendiz', type: 'UUID', role: 'PK', description: 'FK al estudiante.' },
        { name: 'id_curso', type: 'INTEGER', role: 'PK', description: 'FK al curso matriculado.' },
        { name: 'periodo', type: 'VARCHAR(10)', role: 'PK', description: 'Período académico (ej. 2026-1).' },
        { name: 'fecha_matricula', type: 'DATE', role: 'ATTR', description: 'Día de registro.' },
        { name: 'estado', type: 'VARCHAR(15)', role: 'ATTR', description: 'ACTIVA, APROBADA, REPROBADA.' },
        { name: 'calificacion_final', type: 'NUMERIC(3,1)', role: 'ATTR', description: 'Nota de 0.0 a 5.0.' },
      ],
    },
  ],
  relations: [
    {
      source: 'INSTRUCTOR',
      target: 'CURSO',
      verb: 'dicta',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un instructor puede dictar varios cursos; cada curso tiene un instructor líder.',
    },
    {
      source: 'APRENDIZ',
      target: 'CURSO',
      verb: 'se matricula en (vía MATRICULA)',
      cardinality: 'N:M',
      leftMinMax: '(1,N)',
      rightMinMax: '(0,N)',
      explanation: 'Un aprendiz se matricula en varios cursos; un curso recibe muchos aprendices. Nace tabla MATRICULA con período y calificación.',
      attributes: ['periodo', 'fecha_matricula', 'estado', 'calificacion_final'],
    },
  ],
  mermaid: `erDiagram
    INSTRUCTOR ||--o{ CURSO : "dicta"
    APRENDIZ ||--|{ MATRICULA : "cursa"
    CURSO ||--o{ MATRICULA : "matricula a"

    INSTRUCTOR {
        uuid id_instructor PK
        varchar documento UK
        varchar nombre_completo
        varchar titulo
    }
    CURSO {
        int id_curso PK
        uuid id_instructor_lider FK
        varchar codigo UK
        varchar nombre
        smallint creditos
    }
    APRENDIZ {
        uuid id_aprendiz PK
        varchar documento UK
        varchar nombre_completo
        varchar email_institucional UK
    }
    MATRICULA {
        uuid id_aprendiz PK, FK
        int id_curso PK, FK
        varchar periodo PK
        date fecha_matricula
        varchar estado
        numeric calificacion_final
    }`,
  sqlSample: `CREATE TABLE matricula (
  id_aprendiz UUID NOT NULL REFERENCES aprendiz(id_aprendiz) ON DELETE RESTRICT,
  id_curso INTEGER NOT NULL REFERENCES curso(id_curso) ON DELETE RESTRICT,
  periodo VARCHAR(10) NOT NULL,
  fecha_matricula DATE NOT NULL DEFAULT CURRENT_DATE,
  estado VARCHAR(15) NOT NULL DEFAULT 'ACTIVA' CHECK (estado IN ('ACTIVA', 'APROBADA', 'REPROBADA', 'CANCELADA')),
  calificacion_final NUMERIC(3,1) CHECK (calificacion_final >= 0.0 AND calificacion_final <= 5.0),
  PRIMARY KEY (id_aprendiz, id_curso, periodo)
);`,
}
