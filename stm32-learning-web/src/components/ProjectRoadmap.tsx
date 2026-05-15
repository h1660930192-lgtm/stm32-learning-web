import { CheckCircle2, Cpu, FileText, HardDrive, Layers3, ListChecks, MonitorDot, RadioTower } from "lucide-react";
import { projectPhases, projectProfile } from "../data/projects";

interface ProjectRoadmapProps {
  projectTasks: Record<string, boolean>;
  onToggleTask: (id: string) => void;
}

export function ProjectRoadmap({ projectTasks, onToggleTask }: ProjectRoadmapProps) {
  return (
    <div className="space-y-8">
      <section className="circuit-board overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-panel md:p-8">
        <div className="max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-sm text-violet-100">
            <MonitorDot className="h-4 w-4" aria-hidden />
            项目实战路线
          </div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">{projectProfile.name}</h1>
          <p className="mt-4 text-base leading-8 text-slate-300">{projectProfile.background}</p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="glass-card rounded-3xl p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-white">
            <ListChecks className="h-5 w-5 text-cyan-200" aria-hidden />
            系统功能
          </div>
          <ul className="space-y-2 text-sm leading-6 text-slate-300">
            {projectProfile.features.map((item) => (
              <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="glass-card rounded-3xl p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-white">
            <HardDrive className="h-5 w-5 text-emerald-200" aria-hidden />
            硬件模块
          </div>
          <div className="flex flex-wrap gap-2">
            {projectProfile.hardwareModules.map((item) => (
              <span key={item} className="rounded-full bg-white/[0.08] px-3 py-1 text-sm text-slate-200">{item}</span>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-3xl p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-white">
            <Layers3 className="h-5 w-5 text-violet-200" aria-hidden />
            软件模块
          </div>
          <div className="flex flex-wrap gap-2">
            {projectProfile.softwareModules.map((item) => (
              <span key={item} className="rounded-full bg-white/[0.08] px-3 py-1 font-mono text-xs text-slate-200">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card rounded-3xl p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold text-white">
            <Cpu className="h-5 w-5 text-cyan-200" aria-hidden />
            外设对应关系
          </div>
          <div className="space-y-3">
            {projectProfile.peripheralMap.map((item) => (
              <div key={item.peripheral} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <div className="font-mono text-sm text-cyan-100">{item.peripheral}</div>
                <div className="mt-1 text-sm leading-6 text-slate-300">{item.usage}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="section-title">项目分阶段任务</h2>
            <p className="muted mt-1">勾选状态会保存到 localStorage。建议每阶段都留下一条串口日志或照片证据。</p>
          </div>
          {projectPhases.map((phase) => (
            <article key={phase.id} className="glass-card rounded-3xl p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{phase.dayRange}</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{phase.goal}</p>
                </div>
                <div className="rounded-2xl bg-white/[0.08] px-3 py-2 text-sm text-slate-300">{phase.deliverable}</div>
              </div>
              <div className="mt-5 grid gap-2 md:grid-cols-2">
                {phase.tasks.map((task, index) => {
                  const id = `${phase.id}-${index}`;
                  const done = Boolean(projectTasks[id]);
                  return (
                    <button
                      key={id}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left text-sm transition ${
                        done ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                      }`}
                      onClick={() => onToggleTask(id)}
                      type="button"
                    >
                      <CheckCircle2 className={done ? "h-5 w-5 text-emerald-300" : "h-5 w-5 text-slate-500"} aria-hidden />
                      {task}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-3xl p-5">
        <div className="mb-3 flex items-center gap-2 font-semibold text-white">
          <FileText className="h-5 w-5 text-cyan-200" aria-hidden />
          简历描述模板
        </div>
        <p className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm leading-7 text-slate-200">{projectProfile.resumeTemplate}</p>
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
          <RadioTower className="h-5 w-5 shrink-0" aria-hidden />
          简历里不要只写“会用 ADC、OLED、串口”，要写清楚你如何采集、处理、显示、报警和调试。
        </div>
      </section>
    </div>
  );
}

