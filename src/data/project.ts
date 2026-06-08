export type RequirementStatus = 'logrado' | 'parcial' | 'pendiente';
export type StageStatus = 'completada' | 'en_progreso' | 'pendiente';
export type RiskLevel = 'critico' | 'alto' | 'medio' | 'bajo';

export interface ProjectData {
  meta: {
    id: string;
    name: string;
    subtitle: string;
    institution: string;
    subject: string;
    teacher: string;
    team: string[];
    director: string;
    manager: string;
    client: string;
    sponsor: string;
    startDate: string;
    endDate: string;
    budget: string;
    driveFolderUrl: string;
    lastUpdated: string;
  };
  driveFiles: {
    name: string;
    type: string;
    fileId: string;
    url: string;
  }[];
  currentStage: {
    name: string;
    description: string;
    index: number;
    total: number;
  };
  kpis: {
    overallProgress: number;
    requirementsProgress: number;
    stageProgress: number;
    totalRisks: number;
    criticalRisks: number;
    highRisks: number;
    mediumRisks: number;
    lowRisks: number;
    activeRisks: number;
    risksIdentified: number;
    daysRemaining: number;
    daysElapsed: number;
    framesProcessed: number;
    incidentThresholdSeconds: number;
    documentsDelivered: number;
    teamMembers: number;
  };
  chartData: {
    requirementCounts: { logrado: number; parcial: number; pendiente: number };
    risksByLevel: Record<RiskLevel, number>;
    risksByCategory: Record<string, number>;
    stageProgress: number[];
    timeline: { labels: string[]; progress: number[] };
  };
  stages: {
    name: string;
    status: StageStatus;
    description: string;
  }[];
  requirements: {
    id: string;
    name: string;
    status: RequirementStatus;
    description: string;
  }[];
  technologies: string[];
  achievements: string[];
  pendingWork: string[];
  risks: {
    id: string;
    name: string;
    category: string;
    probability: string;
    impact: string;
    magnitude: number;
    level: RiskLevel;
    responsible: string;
    status: string;
  }[];
  team: {
    role: string;
    name: string;
    responsibility: string;
  }[];
  context: {
    problem: string;
    solution: string;
    scope: string;
    functionalRequirements: string[];
    nonFunctionalRequirements: string[];
  };
}

function riskLevel(magnitude: number): RiskLevel {
  if (magnitude >= 9) return 'critico';
  if (magnitude >= 6) return 'alto';
  if (magnitude >= 4) return 'medio';
  return 'bajo';
}

export const project: ProjectData = {
  meta: {
    id: 'DROPOFF-2026-01',
    name: 'Sistema Inteligente de Monitoreo Vehicular — Área Drop Off',
    subtitle: 'Gestión de Riesgos mediante IA y Visión Computacional',
    institution: 'Duoc UC',
    subject: 'Gestión de Riesgos',
    teacher: 'Luis Manuel Yagi Figueroa',
    team: ['Matías Riveros', 'Mathias Jara', 'Simón Montaña'],
    director: 'Juan Pérez',
    manager: 'Juan Pérez',
    client: 'Colegio — Patricia Soto',
    sponsor: 'Dirección del Colegio',
    startDate: '2026-04-05',
    endDate: '2026-06-09',
    budget: '100 UF',
    driveFolderUrl:
      'https://drive.google.com/drive/folders/1or_rcS_QDxSFHwuEBb_DQwpOEEhJwtTi?usp=sharing',
    lastUpdated: '2026-06-09',
  },
  driveFiles: [
    {
      name: 'demo_procesada.mp4',
      type: 'Video Demo',
      fileId: '1q-7DPYgfvs5BAx1QWGs_cvudQ3wtVMBl',
      url: 'https://drive.google.com/file/d/1q-7DPYgfvs5BAx1QWGs_cvudQ3wtVMBl/view',
    },
    {
      name: 'colegio_trafico.mp4',
      type: 'Video Fuente',
      fileId: '1hxy32eBO18xfMIL5j2-PJoe9Ehu9wmd2',
      url: 'https://drive.google.com/file/d/1hxy32eBO18xfMIL5j2-PJoe9Ehu9wmd2/view',
    },
    {
      name: 'bitácora de avance',
      type: 'Google Docs',
      fileId: '1mxsVA4_OzjgEnrU4Qe-NKSkzGRHaXbl0eYqqmtESD60',
      url: 'https://docs.google.com/document/d/1mxsVA4_OzjgEnrU4Qe-NKSkzGRHaXbl0eYqqmtESD60/edit',
    },
    {
      name: '2.2.4 Plantilla Registro de Riesgos.xlsx',
      type: 'Excel',
      fileId: '12JoI89lfQh22AYi_iC4vc1t09RL33AF2',
      url: 'https://drive.google.com/file/d/12JoI89lfQh22AYi_iC4vc1t09RL33AF2/view',
    },
    {
      name: 'informe (1).docx',
      type: 'Word',
      fileId: '1nY7gdYxHBwVQmR3Afm8erJTkJXs_Ot3e',
      url: 'https://drive.google.com/file/d/1nY7gdYxHBwVQmR3Afm8erJTkJXs_Ot3e/view',
    },
    {
      name: 'dropoff.ipynb',
      type: 'Notebook Colab',
      fileId: '15GVupUz4LG8aru1vno8TzZjVI7fil6m3',
      url: 'https://drive.google.com/file/d/15GVupUz4LG8aru1vno8TzZjVI7fil6m3/view',
    },
  ],
  currentStage: {
    name: 'Integración y Visualización',
    description:
      'Etapa avanzada enfocada en dashboard visual, formalización de procedimientos y preparación ejecutiva para la evaluación final.',
    index: 4,
    total: 5,
  },
  kpis: {
    overallProgress: 82,
    requirementsProgress: 71,
    stageProgress: 72,
    totalRisks: 28,
    criticalRisks: 3,
    highRisks: 12,
    mediumRisks: 9,
    lowRisks: 4,
    activeRisks: 22,
    risksIdentified: 28,
    daysRemaining: 0,
    daysElapsed: 65,
    framesProcessed: 300,
    incidentThresholdSeconds: 10,
    documentsDelivered: 6,
    teamMembers: 6,
  },
  chartData: {
    requirementCounts: { logrado: 4, parcial: 2, pendiente: 1 },
    risksByLevel: { critico: 3, alto: 12, medio: 9, bajo: 4 },
    risksByCategory: {
      Técnico: 7,
      Gestión: 6,
      Externo: 6,
      Organizacional: 5,
      'Seguridad y Cumplimiento': 5,
    },
    stageProgress: [100, 100, 65, 75, 10],
    timeline: {
      labels: ['Abr 05', 'Abr 15', 'May 01', 'May 15', 'Jun 01', 'Jun 08'],
      progress: [10, 25, 40, 55, 68, 82],
    },
  },
  stages: [
    {
      name: 'Planificación y Gestión de Riesgos',
      status: 'completada',
      description: 'Plantilla de riesgos, matriz probabilidad-impacto y registro formal.',
    },
    {
      name: 'Desarrollo del Sistema IA',
      status: 'completada',
      description: 'YOLOv8 + OpenCV en Colab: detección, tracking y alertas automáticas.',
    },
    {
      name: 'Simulación de Incidentes',
      status: 'en_progreso',
      description: 'Demo funcional con video procesado; falta formalizar protocolo de respuesta.',
    },
    {
      name: 'Dashboard y Visualización',
      status: 'en_progreso',
      description: 'Tablero interactivo con KPIs, gráficos Chart.js y riesgos — desplegado en GitHub Pages.',
    },
    {
      name: 'Presentación Ejecutiva',
      status: 'pendiente',
      description: 'Demo final, métricas consolidadas y entrega para evaluación.',
    },
  ],
  requirements: [
    {
      id: '3.1',
      name: 'Selección y clasificación de riesgos',
      status: 'logrado',
      description: 'Plantilla con identificación, categorías, probabilidad, impacto y magnitud.',
    },
    {
      id: '3.2',
      name: 'Métricas e indicadores',
      status: 'logrado',
      description: 'KPIs en dashboard: permanencia, incidentes, riesgos críticos y avance por etapa.',
    },
    {
      id: '3.3',
      name: 'Responsables y seguimiento',
      status: 'logrado',
      description: 'Responsables asignados, fechas estimadas y control de estado.',
    },
    {
      id: '3.4',
      name: 'Simulación de incidentes',
      status: 'parcial',
      description: 'Detección de permanencia excesiva y alertas automáticas en video.',
    },
    {
      id: '3.5',
      name: 'Dashboard visual de riesgos',
      status: 'parcial',
      description: 'Dashboard interactivo con gráficos de riesgos, requerimientos y timeline.',
    },
    {
      id: '3.6',
      name: 'Planes preventivos y correctivos',
      status: 'pendiente',
      description: 'Acciones de mitigación y continuidad operacional por riesgo.',
    },
    {
      id: '3.7',
      name: 'Presentación ejecutiva',
      status: 'pendiente',
      description: 'Demo, dashboard, métricas y resultados para evaluación final.',
    },
  ],
  technologies: [
    'Ultralytics YOLOv8',
    'OpenCV',
    'Python',
    'Google Colab',
    'Detección de vehículos (clases 2 y 7 COCO)',
    'Tracking persistente con IDs únicos',
    'Procesamiento de video frame a frame',
  ],
  achievements: [
    'Sistema funcional en Colab con detección y seguimiento de vehículos.',
    'Alertas automáticas tipo MULTA al superar umbral de permanencia.',
    'Video demo procesado (demo_procesada.mp4) con 300+ frames analizados.',
    'Plantilla formal de registro y seguimiento de 28 riesgos identificados.',
    'Matriz de probabilidad e impacto con clasificación por criticidad.',
    'Bitácora de avance documentada con logros y trabajo pendiente.',
    'Dashboard interactivo con KPIs y gráficos Chart.js desplegado en GitHub Pages.',
  ],
  pendingWork: [
    'Incorporar planes preventivos y correctivos en la plantilla de riesgos.',
    'Formalizar protocolo de respuesta ante incidentes simulados.',
    'Incorporar planes de mitigación por cada riesgo en la plantilla.',
    'Preparar presentación ejecutiva con demo, métricas y conclusiones.',
  ],
  risks: [
    { id: '1.1', name: 'Fallas de hardware', category: 'Técnico', probability: 'Media', impact: 'Alto', magnitude: 6, level: riskLevel(6), responsible: 'Andrés Muñoz', status: 'Identificado' },
    { id: '1.2', name: 'Errores en IA', category: 'Técnico', probability: 'Alta', impact: 'Alto', magnitude: 9, level: riskLevel(9), responsible: 'Carlos Rojas', status: 'Identificado' },
    { id: '1.3', name: 'Bugs de software', category: 'Técnico', probability: 'Alta', impact: 'Alto', magnitude: 9, level: riskLevel(9), responsible: 'Carlos Rojas', status: 'Identificado' },
    { id: '1.4', name: 'Integración hardware-software deficiente', category: 'Técnico', probability: 'Media', impact: 'Alto', magnitude: 6, level: riskLevel(6), responsible: 'Carlos Rojas / Andrés Muñoz', status: 'Identificado' },
    { id: '1.5', name: 'Pérdida de datos', category: 'Técnico', probability: 'Baja', impact: 'Alto', magnitude: 3, level: riskLevel(3), responsible: 'Carlos Rojas', status: 'Identificado' },
    { id: '1.6', name: 'Baja precisión de detección', category: 'Técnico', probability: 'Alta', impact: 'Medio', magnitude: 6, level: riskLevel(6), responsible: 'Carlos Rojas', status: 'Transferido' },
    { id: '1.7', name: 'Caída del sistema', category: 'Técnico', probability: 'Media', impact: 'Alto', magnitude: 6, level: riskLevel(6), responsible: 'Carlos Rojas', status: 'Eliminado' },
    { id: '2.1', name: 'Mala planificación', category: 'Gestión', probability: 'Media', impact: 'Alto', magnitude: 6, level: riskLevel(6), responsible: 'Juan Pérez', status: 'Registrado' },
    { id: '2.2', name: 'Plazo insuficiente', category: 'Gestión', probability: 'Alta', impact: 'Alto', magnitude: 9, level: riskLevel(9), responsible: 'Juan Pérez', status: 'Registrado' },
    { id: '2.3', name: 'Recursos insuficientes', category: 'Gestión', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'Juan Pérez', status: 'Registrado' },
    { id: '2.4', name: 'Descoordinación del equipo', category: 'Gestión', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'Juan Pérez', status: 'Registrado' },
    { id: '2.5', name: 'Falta de seguimiento de riesgos', category: 'Gestión', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'María González', status: 'Registrado' },
    { id: '2.6', name: 'Cambios en requerimientos', category: 'Gestión', probability: 'Media', impact: 'Alto', magnitude: 6, level: riskLevel(6), responsible: 'Patricia Soto', status: 'Registrado' },
    { id: '3.1', name: 'Retraso de proveedores', category: 'Externo', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'Andrés Muñoz', status: 'Registrado' },
    { id: '3.2', name: 'Equipos defectuosos', category: 'Externo', probability: 'Baja', impact: 'Alto', magnitude: 3, level: riskLevel(3), responsible: 'Andrés Muñoz', status: 'Registrado' },
    { id: '3.3', name: 'Clima adverso', category: 'Externo', probability: 'Baja', impact: 'Medio', magnitude: 2, level: riskLevel(2), responsible: 'Andrés Muñoz', status: 'Registrado' },
    { id: '3.4', name: 'Infraestructura deficiente', category: 'Externo', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'Andrés Muñoz', status: 'Registrado' },
    { id: '3.5', name: 'Costos variables', category: 'Externo', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'Juan Pérez', status: 'Registrado' },
    { id: '3.6', name: 'Fallas de conectividad', category: 'Externo', probability: 'Alta', impact: 'Medio', magnitude: 6, level: riskLevel(6), responsible: 'Andrés Muñoz', status: 'Registrado' },
    { id: '4.1', name: 'Resistencia de usuarios', category: 'Organizacional', probability: 'Alta', impact: 'Medio', magnitude: 6, level: riskLevel(6), responsible: 'Daniela Herrera', status: 'Registrado' },
    { id: '4.2', name: 'Incumplimiento de normas', category: 'Organizacional', probability: 'Alta', impact: 'Medio', magnitude: 6, level: riskLevel(6), responsible: 'Patricia Soto', status: 'Registrado' },
    { id: '4.3', name: 'Uso incorrecto del sistema', category: 'Organizacional', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'Daniela Herrera', status: 'Registrado' },
    { id: '4.4', name: 'Evasión del sistema', category: 'Organizacional', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'Patricia Soto', status: 'Registrado' },
    { id: '4.5', name: 'Sobrecarga operativa', category: 'Organizacional', probability: 'Media', impact: 'Medio', magnitude: 4, level: riskLevel(4), responsible: 'Daniela Herrera', status: 'Registrado' },
    { id: '5.1', name: 'Problemas legales por privacidad', category: 'Seguridad y Cumplimiento', probability: 'Media', impact: 'Alto', magnitude: 6, level: riskLevel(6), responsible: 'María González', status: 'Registrado' },
    { id: '5.2', name: 'Ciberataque', category: 'Seguridad y Cumplimiento', probability: 'Baja', impact: 'Alto', magnitude: 3, level: riskLevel(3), responsible: 'Carlos Rojas', status: 'Registrado' },
    { id: '5.3', name: 'Acceso no autorizado', category: 'Seguridad y Cumplimiento', probability: 'Media', impact: 'Alto', magnitude: 6, level: riskLevel(6), responsible: 'Carlos Rojas', status: 'Registrado' },
    { id: '5.4', name: 'Incumplimiento normativo', category: 'Seguridad y Cumplimiento', probability: 'Media', impact: 'Alto', magnitude: 6, level: riskLevel(6), responsible: 'María González', status: 'Registrado' },
  ],
  team: [
    { role: 'Jefe de Proyecto', name: 'Juan Pérez', responsibility: 'Planificación, ejecución y control general del proyecto.' },
    { role: 'Encargada de Riesgos', name: 'María González', responsibility: 'Identificación, análisis y monitoreo de riesgos.' },
    { role: 'Desarrollo Software', name: 'Carlos Rojas', responsibility: 'Diseño, programación e implementación del sistema IA.' },
    { role: 'Técnico Hardware', name: 'Andrés Muñoz', responsibility: 'Instalación y configuración de cámaras.' },
    { role: 'Cliente', name: 'Patricia Soto', responsibility: 'Validación de requerimientos y entregables.' },
    { role: 'Usuario Final', name: 'Daniela Herrera', responsibility: 'Operación del sistema y gestión de notificaciones.' },
  ],
  context: {
    problem:
      'Apoderados exceden el tiempo permitido (4 min) en el área drop off del colegio, generando congestión vehicular y riesgos para la seguridad de los estudiantes.',
    solution:
      'Sistema de cámaras con IA y software de monitoreo que detecta infracciones, mide permanencia y emite notificaciones automáticas.',
    scope:
      'Diseño, adquisición e implementación de 2 cámaras IA, software de monitoreo, integración HW/SW, pruebas y puesta en marcha. No incluye mantención posterior ni expansión.',
    functionalRequirements: [
      'Detectar presencia de vehículos en zona drop off',
      'Medir tiempo de permanencia',
      'Identificar infracciones (> 4 min en producción, > 10s en demo)',
      'Generar notificaciones automáticas',
      'Emitir reportes para administración',
      'Almacenar historial de eventos',
    ],
    nonFunctionalRequirements: [
      'Disponibilidad mínima del 95%',
      'Tiempo de respuesta < 5 segundos',
      'Seguridad y protección de datos',
      'Interfaz simple para personal administrativo',
    ],
  },
};

export const DEMO_VIDEO_ID = '1q-7DPYgfvs5BAx1QWGs_cvudQ3wtVMBl';
