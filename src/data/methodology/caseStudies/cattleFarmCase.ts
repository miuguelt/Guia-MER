import type { SystemCaseStudy } from '../types'

export const cattleFarmCase: SystemCaseStudy = {
  id: 'cattle-farm',
  title: 'Gestión Ganadera y Trazabilidad (Finca Villa Luz)',
  category: 'Agropecuario · Modelado con Gemini Canvas',
  externalUrl: 'https://gemini.google.com/share/c663a17632de?skid=563a1190-cad0-42ba-9c13-b04bcabea93e&hl=es_419',
  externalUrlLabel: 'Abrir caso interactivo en Gemini Canvas',
  externalUrlBadge: 'Gemini Canvas',
  narrative: `Una empresa ganadera de ciclo completo requiere tecnificar y controlar la trazabilidad de sus hatos, potreros y planes de manejo sanitario. El sistema registra animales identificados por su código de chapeta único oficial, raza, sexo, fecha de nacimiento, estado productivo y lote asignado. Los lotes de ganado rotan periódicamente por potreros según el aforo de pastura disponible, registrando la fecha de entrada y salida para evitar sobrepastoreo. A cada animal se le realiza control periódico de pesaje para calcular la ganancia diaria de peso. Asimismo, el equipo veterinario registra tratamientos sanitarios (vacunas, desparasitaciones, antibióticos), asociando el animal, el medicamento aplicado, la dosis, la fecha de administración y el costo operativo. Durante el ciclo reproductivo, se registran eventos de inseminación artificial o monta natural, diagnósticos de preñez y partos con el ternero resultante.`,
  entities: [
    {
      name: 'LOTE',
      description: 'Grupo homogéneo de animales para manejo y rotación.',
      attributes: [
        { name: 'id_lote', type: 'INTEGER', role: 'PK', description: 'Identificador del lote.' },
        { name: 'nombre', type: 'VARCHAR(80)', role: 'UQ', description: 'Nombre descriptivo del lote.' },
        { name: 'proposito', type: 'VARCHAR(40)', role: 'ATTR', description: 'CEBA, CRIA, LECHERIA, LEVANTE.' },
        { name: 'activo', type: 'BOOLEAN', role: 'ATTR', description: 'Estado operativo del lote.' },
      ],
    },
    {
      name: 'POTRERO',
      description: 'División física del terreno destinada al pastoreo.',
      attributes: [
        { name: 'id_potrero', type: 'INTEGER', role: 'PK', description: 'Identificador del potrero.' },
        { name: 'codigo', type: 'VARCHAR(20)', role: 'UQ', description: 'Código único en la finca.' },
        { name: 'nombre', type: 'VARCHAR(80)', role: 'ATTR', description: 'Nombre o referencia del potrero.' },
        { name: 'area_hectareas', type: 'NUMERIC(6,2)', role: 'ATTR', description: 'Superficie para cálculo de aforo.' },
        { name: 'capacidad_ugm', type: 'INTEGER', role: 'ATTR', description: 'Capacidad en unidades gran ganado.' },
      ],
    },
    {
      name: 'ANIMAL',
      description: 'Bovino individual con seguimiento y trazabilidad oficial.',
      attributes: [
        { name: 'id_animal', type: 'UUID', role: 'PK', description: 'Identificador técnico inmutable.' },
        { name: 'id_lote', type: 'INTEGER', role: 'FK', description: 'Lote al que pertenece actualmente.' },
        { name: 'numero_chapeta', type: 'VARCHAR(25)', role: 'UQ', description: 'Código de identificación visual oficial.' },
        { name: 'nombre', type: 'VARCHAR(80)', role: 'ATTR', description: 'Nombre opcional del ejemplar.' },
        { name: 'raza', type: 'VARCHAR(60)', role: 'ATTR', description: 'Brahman, Gyr, Angus, etc.' },
        { name: 'sexo', type: 'CHAR(1)', role: 'ATTR', description: 'M (Macho) o H (Hembra).' },
        { name: 'fecha_nacimiento', type: 'DATE', role: 'ATTR', description: 'Fecha de nacimiento.' },
        { name: 'peso_actual_kg', type: 'NUMERIC(7,2)', role: 'ATTR', description: 'Último peso registrado.' },
      ],
    },
    {
      name: 'ROTACION_POTRERO',
      description: 'Hecho transaccional que registra la estadía de un lote en un potrero.',
      isWeak: true,
      attributes: [
        { name: 'id_rotacion', type: 'BIGINT', role: 'PK', description: 'Identificador consecutivo de rotación.' },
        { name: 'id_lote', type: 'INTEGER', role: 'FK', description: 'Lote que pastorea.' },
        { name: 'id_potrero', type: 'INTEGER', role: 'FK', description: 'Potrero ocupado.' },
        { name: 'fecha_ingreso', type: 'TIMESTAMPTZ', role: 'ATTR', description: 'Día y hora de entrada.' },
        { name: 'fecha_salida', type: 'TIMESTAMPTZ', role: 'ATTR', description: 'Día y hora de salida.' },
      ],
    },
    {
      name: 'CONTROL_PESAJE',
      description: 'Registro histórico de pesajes periódicos de un animal.',
      attributes: [
        { name: 'id_pesaje', type: 'BIGINT', role: 'PK', description: 'Identificador del pesaje.' },
        { name: 'id_animal', type: 'UUID', role: 'FK', description: 'Bovino pesado.' },
        { name: 'fecha_pesaje', type: 'DATE', role: 'ATTR', description: 'Fecha del control de báscula.' },
        { name: 'peso_kg', type: 'NUMERIC(7,2)', role: 'ATTR', description: 'Peso registrado en kilogramos.' },
        { name: 'ganancia_diaria', type: 'NUMERIC(6,3)', role: 'DERIVED', description: 'Cálculo de ganancia de peso (kg/día).' },
      ],
    },
    {
      name: 'TRATAMIENTO_SANITARIO',
      description: 'Procedimiento veterinario o de bioseguridad aplicado al animal.',
      attributes: [
        { name: 'id_tratamiento', type: 'BIGINT', role: 'PK', description: 'Identificador del tratamiento.' },
        { name: 'id_animal', type: 'UUID', role: 'FK', description: 'Animal intervenido.' },
        { name: 'tipo_evento', type: 'VARCHAR(40)', role: 'ATTR', description: 'VACUNACION, DESPARASITACION, TRATAMIENTO.' },
        { name: 'medicamento', type: 'VARCHAR(120)', role: 'ATTR', description: 'Producto veterinario aplicado.' },
        { name: 'dosis', type: 'VARCHAR(60)', role: 'ATTR', description: 'Cantidad y vía de administración.' },
        { name: 'costo', type: 'NUMERIC(10,2)', role: 'ATTR', description: 'Costo del medicamento o aplicación.' },
        { name: 'fecha_aplicacion', type: 'TIMESTAMPTZ', role: 'ATTR', description: 'Momento de administración.' },
      ],
    },
    {
      name: 'EVENTO_REPRODUCTIVO',
      description: 'Registro de servicios de monta/inseminación, chequeos y partos.',
      attributes: [
        { name: 'id_evento', type: 'BIGINT', role: 'PK', description: 'Identificador del evento.' },
        { name: 'id_vaca', type: 'UUID', role: 'FK', description: 'Hembra reproductora.' },
        { name: 'tipo_evento', type: 'VARCHAR(30)', role: 'ATTR', description: 'INSEMINACION, MONTA, DIAGNOSTICO_PRENEZ, PARTO.' },
        { name: 'fecha_evento', type: 'TIMESTAMPTZ', role: 'ATTR', description: 'Fecha y hora del suceso.' },
        { name: 'resultado', type: 'VARCHAR(80)', role: 'ATTR', description: 'EFECTIVO, VACIA, CRIA_VIVA, etc.' },
      ],
    },
  ],
  relations: [
    {
      source: 'LOTE',
      target: 'ANIMAL',
      verb: 'agrupa',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un lote agrupa múltiples animales con propósitos similares; cada animal pertenece a un solo lote a la vez.',
    },
    {
      source: 'LOTE',
      target: 'POTRERO',
      verb: 'rota en (vía ROTACION_POTRERO)',
      cardinality: 'N:M',
      leftMinMax: '(0,N)',
      rightMinMax: '(0,N)',
      explanation: 'Un lote pasa por varios potreros en el año; un potrero recibe diferentes lotes en rotación. Nace ROTACION_POTRERO.',
      attributes: ['fecha_ingreso', 'fecha_salida'],
    },
    {
      source: 'ANIMAL',
      target: 'CONTROL_PESAJE',
      verb: 'acumula',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un animal acumula muchos pesajes a lo largo de su ciclo de vida; cada pesaje corresponde a un solo animal.',
    },
    {
      source: 'ANIMAL',
      target: 'TRATAMIENTO_SANITARIO',
      verb: 'recibe',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Un animal puede recibir múltiples tratamientos sanitarios preventivos o curativos; cada registro detalla una aplicación.',
    },
    {
      source: 'ANIMAL',
      target: 'EVENTO_REPRODUCTIVO',
      verb: 'registra',
      cardinality: '1:N',
      leftMinMax: '(0,N)',
      rightMinMax: '(1,1)',
      explanation: 'Una hembra registra servicios, diagnósticos y partos en su historial reproductivo.',
    },
  ],
  mermaid: `erDiagram
    LOTE ||--o{ ANIMAL : "agrupa"
    LOTE ||--o{ ROTACION_POTRERO : "asigna a"
    POTRERO ||--o{ ROTACION_POTRERO : "recibe"
    ANIMAL ||--o{ CONTROL_PESAJE : "acumula"
    ANIMAL ||--o{ TRATAMIENTO_SANITARIO : "recibe"
    ANIMAL ||--o{ EVENTO_REPRODUCTIVO : "registra"

    LOTE {
        int id_lote PK
        varchar nombre UK
        varchar proposito
        boolean activo
    }
    POTRERO {
        int id_potrero PK
        varchar codigo UK
        varchar nombre
        numeric area_hectareas
        int capacidad_ugm
    }
    ANIMAL {
        uuid id_animal PK
        int id_lote FK
        varchar numero_chapeta UK
        varchar nombre
        varchar raza
        char sexo
        date fecha_nacimiento
        numeric peso_actual_kg
    }
    ROTACION_POTRERO {
        bigint id_rotacion PK
        int id_lote FK
        int id_potrero FK
        timestamptz fecha_ingreso
        timestamptz fecha_salida
    }
    CONTROL_PESAJE {
        bigint id_pesaje PK
        uuid id_animal FK
        date fecha_pesaje
        numeric peso_kg
    }
    TRATAMIENTO_SANITARIO {
        bigint id_tratamiento PK
        uuid id_animal FK
        varchar tipo_evento
        varchar medicamento
        numeric costo
        timestamptz fecha_aplicacion
    }
    EVENTO_REPRODUCTIVO {
        bigint id_evento PK
        uuid id_vaca FK
        varchar tipo_evento
        timestamptz fecha_evento
        varchar resultado
    }`,
  sqlSample: `CREATE TABLE lote (
  id_lote SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE,
  proposito VARCHAR(40) NOT NULL CHECK (proposito IN ('CEBA', 'CRIA', 'LECHERIA', 'LEVANTE')),
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE potrero (
  id_potrero SERIAL PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  area_hectareas NUMERIC(6,2) NOT NULL CHECK (area_hectareas > 0),
  capacidad_ugm INTEGER NOT NULL CHECK (capacidad_ugm > 0)
);

CREATE TABLE animal (
  id_animal UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_lote INTEGER NOT NULL REFERENCES lote(id_lote) ON DELETE RESTRICT,
  numero_chapeta VARCHAR(25) NOT NULL UNIQUE,
  nombre VARCHAR(80),
  raza VARCHAR(60) NOT NULL,
  sexo CHAR(1) NOT NULL CHECK (sexo IN ('M', 'H')),
  fecha_nacimiento DATE NOT NULL,
  peso_actual_kg NUMERIC(7,2) CHECK (peso_actual_kg >= 0),
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rotacion_potrero (
  id_rotacion BIGSERIAL PRIMARY KEY,
  id_lote INTEGER NOT NULL REFERENCES lote(id_lote) ON DELETE RESTRICT,
  id_potrero INTEGER NOT NULL REFERENCES potrero(id_potrero) ON DELETE RESTRICT,
  fecha_ingreso TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  fecha_salida TIMESTAMPTZ
);

CREATE TABLE control_pesaje (
  id_pesaje BIGSERIAL PRIMARY KEY,
  id_animal UUID NOT NULL REFERENCES animal(id_animal) ON DELETE RESTRICT,
  fecha_pesaje DATE NOT NULL DEFAULT CURRENT_DATE,
  peso_kg NUMERIC(7,2) NOT NULL CHECK (peso_kg > 0)
);

CREATE TABLE tratamiento_sanitario (
  id_tratamiento BIGSERIAL PRIMARY KEY,
  id_animal UUID NOT NULL REFERENCES animal(id_animal) ON DELETE RESTRICT,
  tipo_evento VARCHAR(40) NOT NULL,
  medicamento VARCHAR(120) NOT NULL,
  dosis VARCHAR(60) NOT NULL,
  costo NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (costo >= 0),
  fecha_aplicacion TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE evento_reproductivo (
  id_evento BIGSERIAL PRIMARY KEY,
  id_vaca UUID NOT NULL REFERENCES animal(id_animal) ON DELETE RESTRICT,
  tipo_evento VARCHAR(30) NOT NULL CHECK (tipo_evento IN ('INSEMINACION', 'MONTA', 'DIAGNOSTICO_PRENEZ', 'PARTO')),
  fecha_evento TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resultado VARCHAR(80)
);

CREATE INDEX idx_animal_lote ON animal (id_lote);
CREATE INDEX idx_pesaje_animal_fecha ON control_pesaje (id_animal, fecha_pesaje DESC);
CREATE INDEX idx_tratamiento_animal_fecha ON tratamiento_sanitario (id_animal, fecha_aplicacion DESC);`,
}
