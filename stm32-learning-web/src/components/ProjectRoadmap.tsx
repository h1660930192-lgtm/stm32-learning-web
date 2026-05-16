import { CheckCircle2, FileText, GraduationCap, Layers3, MonitorDot, Sparkles } from "lucide-react";
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
            阶段 4 · 综合小项目实战
          </div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">{projectProfile.name}</h1>
          <p className="mt-4 text-base leading-8 text-slate-300">{projectProfile.finalEffect}</p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="glass-card rounded-3xl p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-white">
            <Sparkles className="h-5 w-5 text-cyan-200" aria-hidden />
            项目最终效果
          </div>
          <p className="text-sm leading-7 text-slate-300">{projectProfile.finalEffect}</p>
        </div>
        <div className="glass-card rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.08] p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-white">
            <GraduationCap className="h-5 w-5 text-emerald-200" aria-hidden />
            当前还不会没关系
          </div>
          <p className="text-sm leading-7 text-emerald-50">{projectProfile.reassurance}</p>
        </div>
        <div className="glass-card rounded-3xl p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-white">
            <Layers3 className="h-5 w-5 text-violet-200" aria-hidden />
            需要先学会的基础
          </div>
          <ul className="space-y-2 text-sm leading-6 text-slate-300">
            {projectProfile.prerequisites.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="section-title">分阶段实现</h2>
          <p className="muted mt-1">每一阶段都对应前面已经学过的 Day。勾选任务只是记录进度，不代表你必须一次做完。</p>
        </div>
        {projectPhases.map((phase) => (
          <article key={phase.id} className="glass-card rounded-3xl p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{phase.dayRange}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">{phase.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{phase.goal}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300 lg:max-w-sm">
                <div className="font-semibold text-white">对应先修 Day</div>
                <div className="mt-1 leading-6">{phase.prerequisites.join("；")}</div>
              </div>
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
            <div className="mt-4 rounded-2xl bg-white/[0.05] px-4 py-3 text-sm text-cyan-100">阶段产出：{phase.deliverable}</div>
          </article>
        ))}
      </section>

      <section className="glass-card rounded-3xl p-5">
        <div className="mb-3 flex items-center gap-2 font-semibold text-white">
          <FileText className="h-5 w-5 text-cyan-200" aria-hidden />
          最终简历描述模板
        </div>
        <p className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm leading-7 text-slate-200">{projectProfile.resumeTemplate}</p>
      </section>
    </div>
  );
}
