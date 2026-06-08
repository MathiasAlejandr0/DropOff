import './styles.css';
import { initCharts } from './charts';
import { DEMO_VIDEO_ID, project, type RequirementStatus, type RiskLevel, type StageStatus } from './data/project';

const app = document.getElementById('app');
if (!app) throw new Error('No se encontró el elemento #app');

const statusLabels: Record<RequirementStatus, string> = {
  logrado: 'Logrado',
  parcial: 'Parcial',
  pendiente: 'Pendiente',
};

const stageLabels: Record<StageStatus, string> = {
  completada: 'Completada',
  en_progreso: 'En progreso',
  pendiente: 'Pendiente',
};

const riskLabels: Record<RiskLevel, string> = {
  critico: 'Crítico',
  alto: 'Alto',
  medio: 'Medio',
  bajo: 'Bajo',
};

function formatDate(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const reqCounts = project.chartData.requirementCounts;
const reqDetail = `${reqCounts.logrado} logrados · ${reqCounts.parcial} parciales · ${reqCounts.pendiente} pendientes`;

app.innerHTML = `
  <header class="header">
    <div>
      <div class="header__badge">Etapa ${project.currentStage.index} de ${project.currentStage.total} — ${project.currentStage.name}</div>
      <h1>${project.meta.name}</h1>
      <p class="header__subtitle">${project.meta.subtitle}</p>
    </div>
    <div class="header__meta">
      <span>ID: <strong>${project.meta.id}</strong></span>
      <span>${formatDate(project.meta.startDate)} → ${formatDate(project.meta.endDate)}</span>
      <span>Presupuesto: <strong>${project.meta.budget}</strong></span>
      <span>Actualizado: <strong>${formatDate(project.meta.lastUpdated)}</strong></span>
    </div>
  </header>

  <nav class="nav">
    <a href="#kpis">KPIs</a>
    <a href="#graficos">Gráficos</a>
    <a href="#etapas">Etapas</a>
    <a href="#demo">Demo</a>
    <a href="#requerimientos">Requerimientos</a>
    <a href="#riesgos">Riesgos</a>
    <a href="#proyecto">Proyecto</a>
    <a href="#equipo">Equipo</a>
    <a href="#documentos">Documentos</a>
  </nav>

  <section id="kpis" class="section">
    <h2 class="section__title">Indicadores Clave (KPIs)</h2>
    <div class="kpi-grid">
      <div class="kpi-card kpi-card--accent">
        <div class="kpi-card__label">Avance General</div>
        <div class="kpi-card__value">${project.kpis.overallProgress}%</div>
        <div class="progress-bar"><div class="progress-bar__fill progress-bar__fill--accent" style="width:${project.kpis.overallProgress}%"></div></div>
        <div class="kpi-card__detail">Estimado según bitácora de avance</div>
      </div>
      <div class="kpi-card kpi-card--success">
        <div class="kpi-card__label">Requerimientos Evaluación</div>
        <div class="kpi-card__value">${project.kpis.requirementsProgress}%</div>
        <div class="progress-bar"><div class="progress-bar__fill progress-bar__fill--success" style="width:${project.kpis.requirementsProgress}%"></div></div>
        <div class="kpi-card__detail">${reqDetail}</div>
      </div>
      <div class="kpi-card kpi-card--purple">
        <div class="kpi-card__label">Avance por Etapas</div>
        <div class="kpi-card__value">${project.kpis.stageProgress}%</div>
        <div class="progress-bar"><div class="progress-bar__fill progress-bar__fill--accent" style="width:${project.kpis.stageProgress}%"></div></div>
        <div class="kpi-card__detail">Etapa ${project.currentStage.index}/${project.currentStage.total} en curso</div>
      </div>
      <div class="kpi-card kpi-card--danger">
        <div class="kpi-card__label">Riesgos Críticos</div>
        <div class="kpi-card__value">${project.kpis.criticalRisks}</div>
        <div class="kpi-card__detail">Magnitud ≥ 9 · ${project.kpis.risksIdentified} identificados</div>
      </div>
      <div class="kpi-card kpi-card--warning">
        <div class="kpi-card__label">Riesgos Altos / Medios</div>
        <div class="kpi-card__value">${project.kpis.highRisks + project.kpis.mediumRisks}</div>
        <div class="kpi-card__detail">${project.kpis.highRisks} altos · ${project.kpis.mediumRisks} medios</div>
      </div>
      <div class="kpi-card kpi-card--accent">
        <div class="kpi-card__label">Riesgos en Seguimiento</div>
        <div class="kpi-card__value">${project.kpis.activeRisks}</div>
        <div class="kpi-card__detail">${((project.kpis.activeRisks / project.kpis.totalRisks) * 100).toFixed(0)}% del registro activo</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card__label">Días Transcurridos</div>
        <div class="kpi-card__value">${project.kpis.daysElapsed}</div>
        <div class="kpi-card__detail">Cierre: ${formatDate(project.meta.endDate)}</div>
      </div>
      <div class="kpi-card kpi-card--success">
        <div class="kpi-card__label">Documentos Entregados</div>
        <div class="kpi-card__value">${project.kpis.documentsDelivered}</div>
        <div class="kpi-card__detail">En carpeta Google Drive</div>
      </div>
      <div class="kpi-card kpi-card--warning">
        <div class="kpi-card__label">Umbral Incidente</div>
        <div class="kpi-card__value">${project.kpis.incidentThresholdSeconds}s</div>
        <div class="kpi-card__detail">${project.kpis.framesProcessed}+ frames procesados</div>
      </div>
    </div>
  </section>

  <section id="graficos" class="section">
    <h2 class="section__title">Gráficos Interactivos</h2>
    <div class="charts-grid">
      <div class="card chart-card">
        <h3>Avance general del proyecto</h3>
        <div class="chart-container chart-container--sm"><canvas id="chartProgress"></canvas></div>
      </div>
      <div class="card chart-card">
        <h3>Estado de requerimientos</h3>
        <div class="chart-container chart-container--sm"><canvas id="chartRequirements"></canvas></div>
      </div>
      <div class="card chart-card">
        <h3>Riesgos por nivel de criticidad</h3>
        <div class="chart-container"><canvas id="chartRiskLevel"></canvas></div>
      </div>
      <div class="card chart-card">
        <h3>Riesgos por categoría</h3>
        <div class="chart-container"><canvas id="chartRiskCategory"></canvas></div>
      </div>
      <div class="card chart-card chart-card--wide">
        <h3>Avance por etapa del proyecto</h3>
        <div class="chart-container chart-container--tall"><canvas id="chartStages"></canvas></div>
      </div>
      <div class="card chart-card chart-card--wide">
        <h3>Matriz probabilidad × impacto</h3>
        <p class="chart-hint">Tamaño de burbuja = magnitud del riesgo. Pasa el cursor para ver detalle.</p>
        <div class="chart-container chart-container--tall"><canvas id="chartRiskMatrix"></canvas></div>
      </div>
      <div class="card chart-card chart-card--full">
        <h3>Evolución del avance en el tiempo</h3>
        <div class="chart-container"><canvas id="chartTimeline"></canvas></div>
      </div>
    </div>
  </section>

  <section id="etapas" class="section">
    <h2 class="section__title">Etapas del Proyecto</h2>
    <div class="grid-2">
      <div class="card">
        <h3>Timeline de ejecución</h3>
        <div class="stages">
          ${project.stages
            .map(
              (s, i) => `
            <div class="stage stage--${s.status}">
              <div class="stage__dot">${i + 1}</div>
              <div class="stage__content">
                <h4>${s.name}</h4>
                <p>${s.description}</p>
                <span class="stage__status">${stageLabels[s.status]}</span>
              </div>
            </div>`
            )
            .join('')}
        </div>
      </div>
      <div class="card">
        <h3>Etapa actual</h3>
        <p class="stage-current-name">${project.currentStage.name}</p>
        <p class="stage-current-desc">${project.currentStage.description}</p>
        <div class="stage-stats">
          <div class="stage-stat">
            <span class="stage-stat__value">${project.kpis.overallProgress}%</span>
            <span class="stage-stat__label">Avance total</span>
          </div>
          <div class="stage-stat">
            <span class="stage-stat__value">${project.kpis.criticalRisks}</span>
            <span class="stage-stat__label">Riesgos críticos</span>
          </div>
          <div class="stage-stat">
            <span class="stage-stat__value">${project.kpis.teamMembers}</span>
            <span class="stage-stat__label">Roles asignados</span>
          </div>
        </div>
        <p class="chart-hint" style="margin-top:1rem">Ver gráficos detallados en la sección <a href="#graficos" style="color:var(--accent)">Gráficos Interactivos</a>.</p>
      </div>
    </div>
  </section>

  <section id="demo" class="section">
    <h2 class="section__title">Video Demo — demo_procesada.mp4</h2>
    <div class="grid-2">
      <div class="card" style="grid-column:1/-1">
        <div class="video-wrapper">
          <iframe
            src="https://drive.google.com/file/d/${DEMO_VIDEO_ID}/preview"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="Demo procesada — Sistema DropOff"
          ></iframe>
        </div>
        <p style="margin-top:1rem;font-size:0.85rem;color:var(--text-muted)">
          Video generado con YOLOv8 en Google Colab. Detecta vehículos, mide permanencia y genera alertas MULTA al superar ${project.kpis.incidentThresholdSeconds} segundos.
          Fuente: <code style="font-family:'JetBrains Mono',monospace;color:var(--accent)">colegio_trafico.mp4</code>
        </p>
      </div>
      <div class="card">
        <h3>Tecnologías implementadas</h3>
        <div class="tech-tags">
          ${project.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="card">
        <h3>Logros técnicos</h3>
        <ul class="check-list">
          ${project.achievements.map((a) => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <section id="requerimientos" class="section">
    <h2 class="section__title">Requerimientos de Evaluación</h2>
    <div class="card">
      <ul class="req-list">
        ${project.requirements
          .map(
            (r) => `
          <li class="req-item">
            <span class="req-item__id">${r.id}</span>
            <div class="req-item__body">
              <div class="req-item__name">${r.name}</div>
              <div class="req-item__desc">${r.description}</div>
            </div>
            <span class="badge badge--${r.status}">${statusLabels[r.status]}</span>
          </li>`
          )
          .join('')}
      </ul>
    </div>
  </section>

  <section id="riesgos" class="section">
    <h2 class="section__title">Matriz de Riesgos</h2>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Riesgo</th>
              <th>Categoría</th>
              <th>Prob.</th>
              <th>Impacto</th>
              <th>Magnitud</th>
              <th>Nivel</th>
              <th>Responsable</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${project.risks
              .sort((a, b) => b.magnitude - a.magnitude)
              .map(
                (r) => `
              <tr>
                <td style="font-family:'JetBrains Mono',monospace">${r.id}</td>
                <td>${r.name}</td>
                <td>${r.category}</td>
                <td>${r.probability}</td>
                <td>${r.impact}</td>
                <td style="font-family:'JetBrains Mono',monospace;font-weight:600">${r.magnitude}</td>
                <td><span class="risk-level risk-level--${r.level}">${riskLabels[r.level]}</span></td>
                <td>${r.responsible}</td>
                <td>${r.status}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
      <p style="margin-top:1rem;font-size:0.8rem;color:var(--text-muted)">
        Fuente: Plantilla 2.2.4 Registro de Riesgos — ${project.kpis.totalRisks} riesgos identificados en total.
        Se muestran los ${project.risks.length} de mayor relevancia.
      </p>
    </div>
  </section>

  <section id="proyecto" class="section">
    <h2 class="section__title">Contenido del Proyecto</h2>
    <div class="grid-2">
      <div class="card">
        <h3>Contexto y alcance</h3>
        <div class="context-block">
          <h4>Problemática</h4>
          <p>${project.context.problem}</p>
        </div>
        <div class="context-block">
          <h4>Solución propuesta</h4>
          <p>${project.context.solution}</p>
        </div>
        <div class="context-block">
          <h4>Alcance</h4>
          <p>${project.context.scope}</p>
        </div>
      </div>
      <div class="card">
        <h3>Requerimientos funcionales</h3>
        <ul class="check-list">
          ${project.context.functionalRequirements.map((r) => `<li>${r}</li>`).join('')}
        </ul>
        <h3 style="margin-top:1.25rem">Requerimientos no funcionales</h3>
        <ul class="check-list">
          ${project.context.nonFunctionalRequirements.map((r) => `<li>${r}</li>`).join('')}
        </ul>
      </div>
      <div class="card">
        <h3>Trabajo pendiente</h3>
        <ul class="check-list check-list--pending">
          ${project.pendingWork.map((w) => `<li>${w}</li>`).join('')}
        </ul>
      </div>
      <div class="card">
        <h3>Información académica</h3>
        <div class="context-block">
          <h4>Institución</h4>
          <p>${project.meta.institution} — ${project.meta.subject}</p>
        </div>
        <div class="context-block">
          <h4>Docente</h4>
          <p>${project.meta.teacher}</p>
        </div>
        <div class="context-block">
          <h4>Integrantes</h4>
          <p>${project.meta.team.join(' · ')}</p>
        </div>
        <div class="context-block">
          <h4>Cliente / Sponsor</h4>
          <p>${project.meta.client} · ${project.meta.sponsor}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="equipo" class="section">
    <h2 class="section__title">Equipo y Responsabilidades</h2>
    <div class="team-grid">
      ${project.team
        .map(
          (m) => `
        <div class="team-card">
          <div class="team-card__role">${m.role}</div>
          <div class="team-card__name">${m.name}</div>
          <div class="team-card__desc">${m.responsibility}</div>
        </div>`
        )
        .join('')}
    </div>
  </section>

  <section id="documentos" class="section">
    <h2 class="section__title">Documentos en Google Drive</h2>
    <div class="card">
      <ul class="doc-list">
        ${project.driveFiles
          .map(
            (f) => `
          <li>
            <a href="${f.url}" target="_blank" rel="noopener noreferrer">
              <span class="doc-list__type">${f.type}</span>
              <span>${f.name}</span>
            </a>
          </li>`
          )
          .join('')}
      </ul>
      <p style="margin-top:1rem;font-size:0.85rem;color:var(--text-muted)">
        <a href="${project.meta.driveFolderUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">
          Abrir carpeta completa en Google Drive →
        </a>
      </p>
    </div>
  </section>

  <footer class="footer">
    <p>
      Dashboard generado para <strong>${project.meta.name}</strong> ·
      Datos extraídos de la
      <a href="${project.meta.driveFolderUrl}" target="_blank" rel="noopener noreferrer">carpeta de gestión de riesgos</a>
    </p>
  </footer>
`;

initCharts();
