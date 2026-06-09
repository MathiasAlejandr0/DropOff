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
    problemPoints: string[];
    solution: string;
    scope: string;
    functionalRequirements: string[];
    nonFunctionalRequirements: string[];
  };
  architecture: { component: string; description: string }[];
  incidentFlow: { step: string; title: string; description: string }[];
  mitigationPlans: { risk: string; riskId: string; preventive: string; corrective: string }[];
  simulations: {
    title: string;
    date: string;
    description: string;
    actions: string[];
    outcome: string;
  }[];
  conclusions: string[];
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
      name: 'Presentación ejecutiva.pptx',
      type: 'PowerPoint',
      fileId: '18aLdvsS-Cs3VQjDhdU8OX5f0Rhk3Ew9K',
      url: 'https://drive.google.com/file/d/18aLdvsS-Cs3VQjDhdU8OX5f0Rhk3Ew9K/view',
    },
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
    name: 'Presentación Ejecutiva y Cierre',
    description:
      'Presentación PPT completada con arquitectura, simulaciones, planes de mitigación y conclusiones del proyecto.',
    index: 5,
    total: 5,
  },
  kpis: {
    overallProgress: 90,
    requirementsProgress: 93,
    stageProgress: 96,
    totalRisks: 29,
    criticalRisks: 3,
    highRisks: 12,
    mediumRisks: 9,
    lowRisks: 4,
    activeRisks: 22,
    risksIdentified: 29,
    daysRemaining: 0,
    daysElapsed: 65,
    framesProcessed: 300,
    incidentThresholdSeconds: 10,
    documentsDelivered: 7,
    teamMembers: 6,
  },
  chartData: {
    requirementCounts: { logrado: 6, parcial: 1, pendiente: 0 },
    risksByLevel: { critico: 3, alto: 12, medio: 9, bajo: 4 },
    risksByCategory: {
      Técnico: 7,
      Gestión: 6,
      Externo: 6,
      Organizacional: 5,
      'Seguridad y Cumplimiento': 5,
    },
    stageProgress: [100, 100, 95, 95, 90],
    timeline: {
      labels: ['Abr 05', 'Abr 15', 'May 01', 'May 15', 'Jun 01', 'Jun 08', 'Jun 09'],
      progress: [10, 25, 40, 55, 68, 82, 90],
    },
  },
  stages: [
    {
      name: 'Planificación y Gestión de Riesgos',
      status: 'completada',
      description: '29 riesgos identificados, matriz probabilidad-impacto y responsables asignados.',
    },
    {
      name: 'Desarrollo del Sistema IA',
      status: 'completada',
      description: 'YOLOv8 + OpenCV: detección, tracking persistente y alertas MULTA automáticas.',
    },
    {
      name: 'Simulación de Incidentes',
      status: 'completada',
      description: 'Escenarios simulados: infracción vehicular en video y caída del sistema (30 jul 2026).',
    },
    {
      name: 'Dashboard y Visualización',
      status: 'completada',
      description: 'Dashboard interactivo con KPIs, gráficos Chart.js — publicado en GitHub Pages.',
    },
    {
      name: 'Presentación Ejecutiva',
      status: 'completada',
      description: 'Presentación PPT con arquitectura, mitigación, simulaciones y conclusiones.',
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
      status: 'logrado',
      description: 'Escenario de infracción vehicular en video y simulación de caída del sistema documentados.',
    },
    {
      id: '3.5',
      name: 'Dashboard visual de riesgos',
      status: 'logrado',
      description: 'Dashboard interactivo con KPIs, gráficos, riesgos y timeline en GitHub Pages.',
    },
    {
      id: '3.6',
      name: 'Planes preventivos y correctivos',
      status: 'parcial',
      description: 'Planes definidos para 4 riesgos críticos (IA, software, caída sistema, ciberataque).',
    },
    {
      id: '3.7',
      name: 'Presentación ejecutiva',
      status: 'logrado',
      description: 'Presentación PPT de 10 diapositivas con demo, KPIs, simulaciones y conclusiones.',
    },
  ],
  technologies: [
    'Ultralytics YOLOv8',
    'OpenCV',
    'Python',
    'Google Colab',
    'Chart.js',
    'GitHub Pages',
    'Detección de vehículos (clases 2 y 7 COCO)',
    'Tracking persistente con IDs únicos',
    'Procesamiento de video en tiempo real (300+ frames)',
  ],
  achievements: [
    'Sistema IA funcional con detección, tracking y alertas MULTA automáticas.',
    'Video demo procesado (demo_procesada.mp4) con 300+ frames en tiempo real.',
    '29 riesgos identificados y clasificados con matriz cuantitativa.',
    'Dashboard interactivo publicado en GitHub Pages con KPIs y gráficos.',
    'Simulación de infracción vehicular con respuesta automática del sistema.',
    'Simulación de caída del sistema con plan correctivo ejecutado (30 jul 2026).',
    'Planes de mitigación definidos para riesgos críticos del proyecto.',
    'Presentación ejecutiva PPT completada para evaluación final.',
  ],
  pendingWork: [
    'Completar planes preventivos y correctivos para los riesgos restantes en la plantilla.',
    'Escalar la solución a otros contextos institucionales según conclusiones del proyecto.',
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
  architecture: [
    { component: 'Cámara', description: 'Captura video en tiempo real del área drop-off.' },
    { component: 'Detección', description: 'YOLOv8 y OpenCV detectan vehículos con bounding boxes precisos.' },
    { component: 'Tracking', description: 'Asigna IDs únicos y mide permanencia de cada vehículo.' },
    { component: 'Alerta', description: 'Genera alerta tipo MULTA al superar el umbral de tiempo.' },
    { component: 'Dashboard', description: 'Muestra KPIs, incidentes y métricas operacionales.' },
  ],
  incidentFlow: [
    { step: '01', title: 'Vehículo ingresa al área', description: 'Detección inicial con asignación de ID único.' },
    { step: '02', title: 'Inicio del cronómetro', description: 'Medición de permanencia en tiempo real.' },
    { step: '03', title: 'Superación del umbral', description: 'El sistema detecta la infracción automáticamente.' },
    { step: '04', title: 'Alerta y registro', description: 'Generación de alerta MULTA e historial del incidente.' },
  ],
  mitigationPlans: [
    {
      riskId: '1.2',
      risk: 'Errores en IA',
      preventive: 'Validar modelo con datos reales del entorno.',
      corrective: 'Reentrenar IA con nuevos casos detectados.',
    },
    {
      riskId: '1.3',
      risk: 'Bugs de software',
      preventive: 'Testing continuo e iterativo del pipeline.',
      corrective: 'Actualización y parches del sistema.',
    },
    {
      riskId: '1.7',
      risk: 'Caída del sistema',
      preventive: 'Mantención preventiva programada.',
      corrective: 'Recuperación de servicios críticos.',
    },
    {
      riskId: '5.2',
      risk: 'Ciberataque',
      preventive: 'Firewalls y control de permisos de acceso.',
      corrective: 'Restaurar desde respaldos seguros.',
    },
  ],
  simulations: [
    {
      title: 'Infracción vehicular — permanencia excesiva',
      date: '2026-06-07',
      description:
        'Escenario real donde un vehículo excede el tiempo permitido en el área drop-off. El sistema respondió de forma completamente automática.',
      actions: [
        'Vehículo ingresa y recibe ID único de tracking.',
        'Cronómetro mide permanencia en tiempo real.',
        'Al superar umbral, se detecta infracción automáticamente.',
        'Se genera alerta MULTA y registro del incidente.',
      ],
      outcome: 'Respuesta automática ante eventos críticos validada en video demo_procesada.mp4.',
    },
    {
      title: 'Caída del sistema de monitoreo',
      date: '2026-07-30',
      description:
        'Durante pruebas finales, el servidor presenta falla inesperada interrumpiendo monitoreo de cámaras y envío de notificaciones.',
      actions: [
        'Usuario final informa la falla al Jefe de Proyecto.',
        'Equipo de Desarrollo verifica la causa del problema.',
        'Se activa el plan correctivo definido para este riesgo.',
        'Se reinician servicios y se restauran procesos necesarios.',
        'Pruebas confirman correcto funcionamiento del sistema.',
      ],
      outcome:
        'Servicio restablecido en tiempo reducido, minimizando impacto en cronograma y permitiendo continuar pruebas.',
    },
  ],
  conclusions: [
    'Inteligencia Artificial: detección y tracking de vehículos con YOLOv8 y OpenCV en tiempo real.',
    'Gestión de Riesgos: 29 riesgos identificados, clasificados y monitoreados con matriz cuantitativa.',
    'Dashboard Interactivo: monitoreo visual con KPIs, alertas y métricas operacionales.',
    'Seguridad Operacional: reducción de congestión, mayor seguridad estudiantil y control automatizado.',
    'La solución integra IA y Gestión de Riesgos en un entorno real, con potencial de escalabilidad institucional.',
  ],
  context: {
    problem:
      'El área drop-off presenta uso inadecuado que compromete la seguridad y la fluidez del tránsito. Sin control automatizado, los incidentes se acumulan sin respuesta oportuna.',
    problemPoints: [
      'Apoderados exceden el tiempo permitido de permanencia.',
      'Congestión vehicular recurrente en horas punta.',
      'Riesgos directos para la seguridad de estudiantes.',
      'Necesidad urgente de monitoreo automatizado en tiempo real.',
    ],
    solution:
      'Arquitectura basada en visión computacional y aprendizaje automático: YOLOv8 para detección, OpenCV para procesamiento, tracking persistente, alertas automáticas y dashboard interactivo.',
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
