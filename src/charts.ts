import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  DoughnutController,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  type ChartConfiguration,
  type ChartTypeRegistry,
} from 'chart.js';
import { project, type RiskLevel } from './data/project';

Chart.register(
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  DoughnutController,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
);

const COLORS = {
  accent: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#a78bfa',
  muted: '#8b9cb3',
  surface: '#1a2330',
  text: '#e8edf4',
};

const riskLevelColors: Record<RiskLevel, string> = {
  critico: COLORS.danger,
  alto: COLORS.warning,
  medio: COLORS.accent,
  bajo: COLORS.success,
};

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: COLORS.text, font: { family: 'DM Sans' } },
    },
    tooltip: {
      backgroundColor: COLORS.surface,
      titleColor: COLORS.text,
      bodyColor: COLORS.muted,
      borderColor: '#243044',
      borderWidth: 1,
      padding: 12,
    },
  },
};

function createChart<T extends keyof ChartTypeRegistry>(
  canvasId: string,
  config: ChartConfiguration<T>,
): Chart<T> | null {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return null;
  return new Chart(canvas, config);
}

export function initCharts(): void {
  const reqCounts = project.chartData.requirementCounts;
  const riskLevels = project.chartData.risksByLevel;
  const riskCats = project.chartData.risksByCategory;

  createChart('chartProgress', {
    type: 'doughnut',
    data: {
      labels: ['Completado', 'Pendiente'],
      datasets: [
        {
          data: [project.kpis.overallProgress, 100 - project.kpis.overallProgress],
          backgroundColor: [COLORS.accent, COLORS.surface],
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      ...chartDefaults,
      cutout: '68%',
      plugins: {
        ...chartDefaults.plugins,
        legend: { position: 'bottom', labels: chartDefaults.plugins.legend.labels },
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
          },
        },
      },
    },
  });

  createChart('chartRequirements', {
    type: 'bar',
    data: {
      labels: ['Logrado', 'Parcial', 'Pendiente'],
      datasets: [
        {
          label: 'Requerimientos',
          data: [reqCounts.logrado, reqCounts.parcial, reqCounts.pendiente],
          backgroundColor: [COLORS.success, COLORS.warning, COLORS.danger],
          borderRadius: 6,
        },
      ],
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { ticks: { color: COLORS.muted }, grid: { color: 'rgba(36,48,68,0.5)' } },
        y: {
          ticks: { color: COLORS.muted, stepSize: 1 },
          grid: { color: 'rgba(36,48,68,0.5)' },
          beginAtZero: true,
          max: 7,
        },
      },
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
      },
    },
  });

  createChart('chartRiskLevel', {
    type: 'bar',
    data: {
      labels: ['Crítico', 'Alto', 'Medio', 'Bajo'],
      datasets: [
        {
          label: 'Riesgos',
          data: [riskLevels.critico, riskLevels.alto, riskLevels.medio, riskLevels.bajo],
          backgroundColor: [
            riskLevelColors.critico,
            riskLevelColors.alto,
            riskLevelColors.medio,
            riskLevelColors.bajo,
          ],
          borderRadius: 6,
        },
      ],
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { ticks: { color: COLORS.muted }, grid: { display: false } },
        y: {
          ticks: { color: COLORS.muted, stepSize: 2 },
          grid: { color: 'rgba(36,48,68,0.5)' },
          beginAtZero: true,
        },
      },
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            afterLabel: (ctx) => {
              const pct = ((ctx.parsed.y as number) / project.kpis.totalRisks) * 100;
              return `${pct.toFixed(1)}% del total`;
            },
          },
        },
      },
    },
  });

  createChart('chartRiskCategory', {
    type: 'doughnut',
    data: {
      labels: Object.keys(riskCats),
      datasets: [
        {
          data: Object.values(riskCats),
          backgroundColor: [COLORS.accent, COLORS.purple, COLORS.warning, COLORS.success, COLORS.danger],
          borderWidth: 2,
          borderColor: COLORS.surface,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { position: 'right', labels: chartDefaults.plugins.legend.labels },
      },
    },
  });

  createChart('chartStages', {
    type: 'bar',
    data: {
      labels: project.stages.map((s) => s.name),
      datasets: [
        {
          label: '% Avance',
          data: project.chartData.stageProgress,
          backgroundColor: project.stages.map((s) =>
            s.status === 'completada'
              ? COLORS.success
              : s.status === 'en_progreso'
                ? COLORS.accent
                : COLORS.muted,
          ),
          borderRadius: 6,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      ...chartDefaults,
      scales: {
        x: {
          max: 100,
          ticks: { color: COLORS.muted, callback: (v) => `${v}%` },
          grid: { color: 'rgba(36,48,68,0.5)' },
        },
        y: { ticks: { color: COLORS.muted, font: { size: 11 } }, grid: { display: false } },
      },
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
      },
    },
  });

  const probMap: Record<string, number> = { Baja: 1, Media: 2, Alta: 3 };
  const impactMap: Record<string, number> = { Bajo: 1, Medio: 2, Alto: 3 };

  createChart('chartRiskMatrix', {
    type: 'bubble',
    data: {
      datasets: project.risks.map((r) => ({
        label: `${r.id} — ${r.name}`,
        data: [
          {
            x: probMap[r.probability] ?? 2,
            y: impactMap[r.impact] ?? 2,
            r: Math.max(r.magnitude * 1.8, 6),
          },
        ],
        backgroundColor: `${riskLevelColors[r.level]}99`,
        borderColor: riskLevelColors[r.level],
        borderWidth: 2,
      })),
    },
    options: {
      ...chartDefaults,
      scales: {
        x: {
          min: 0.5,
          max: 3.5,
          ticks: {
            color: COLORS.muted,
            callback: (v) => (v === 1 ? 'Baja' : v === 2 ? 'Media' : v === 3 ? 'Alta' : ''),
            stepSize: 1,
          },
          title: { display: true, text: 'Probabilidad', color: COLORS.muted },
          grid: { color: 'rgba(36,48,68,0.5)' },
        },
        y: {
          min: 0.5,
          max: 3.5,
          ticks: {
            color: COLORS.muted,
            callback: (v) => (v === 1 ? 'Bajo' : v === 2 ? 'Medio' : v === 3 ? 'Alto' : ''),
            stepSize: 1,
          },
          title: { display: true, text: 'Impacto', color: COLORS.muted },
          grid: { color: 'rgba(36,48,68,0.5)' },
        },
      },
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            label: (ctx) => {
              const r = project.risks[ctx.datasetIndex];
              return [
                `${r.id}: ${r.name}`,
                `Magnitud: ${r.magnitude}`,
                `Categoría: ${r.category}`,
              ];
            },
          },
        },
      },
    },
  });

  createChart('chartTimeline', {
    type: 'line',
    data: {
      labels: project.chartData.timeline.labels,
      datasets: [
        {
          label: 'Avance acumulado (%)',
          data: project.chartData.timeline.progress,
          borderColor: COLORS.accent,
          backgroundColor: 'rgba(59,130,246,0.15)',
          fill: true,
          tension: 0.35,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: COLORS.accent,
        },
      ],
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { ticks: { color: COLORS.muted }, grid: { color: 'rgba(36,48,68,0.3)' } },
        y: {
          min: 0,
          max: 100,
          ticks: { color: COLORS.muted, callback: (v) => `${v}%` },
          grid: { color: 'rgba(36,48,68,0.5)' },
        },
      },
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
      },
    },
  });
}
