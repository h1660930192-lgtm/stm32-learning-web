import { ArrowRight, BookOpen, CircuitBoard, ClipboardCheck, Cpu, FolderKanban, Gauge, Route, Zap } from "lucide-react";
import { lessons, phaseRanges } from "../data/lessons";
import type { ProgressState, ViewId } from "../types";
import { ProgressBar } from "./ProgressBar";

interface DashboardProps {
  progress: ProgressState;
  stats: {
    completed: number;
    total: number;
    percent: number;
    quizCount: number;
    quizScore: { score: number; total: number };
    projectDone: number;
  };
  onNavigate: (view: ViewId) => void;
  onOpenLesson: (day: number) => void;
}

export function Dashboard({ progress, stats, onNavigate, onOpenLesson }: DashboardProps) {
  const today = lessons.find((lesson) => lesson.day === progress.currentDay) ?? lessons[0];
  const recent = progress.activity.slice(0, 5);
  const currentPhase = phaseRanges.find((phase) => progress.currentDay >= phase.days[0] && progress.currentDay <= phase.days[1]) ?? phaseRanges[0];
  const routePreview = lessons.filter((lesson) => [1, 4, 7, 8, 12, 14, 17, 20, 23, 28].includes(lesson.day));

  const quickActions: Array<{ label: string; icon: typeof Zap; action: () => void }> = [
    { label: "开始今日任务", icon: Zap, action: () => onOpenLesson(progress.currentDay) },
    { label: "C 语言恢复", icon: BookOpen, action: () => onOpenLesson(1) },
    { label: "STM32 外设入门", icon: Cpu, action: () => onOpenLesson(8) },
    { label: "项目实战", icon: FolderKanban, action: () => onNavigate("project") },
    { label: "每日小测", icon: ClipboardCheck, action: () => onNavigate("quiz") },
  ];

  return (
    <div className="space-y-8">
      <section className="circuit-board overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-panel md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
              <CircuitBoard className="h-4 w-4" aria-hidden />
              学习仪表盘 · 本地进度保存
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
              STM32 入门学习助手
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              从 C 语言恢复，到 STM32 外设，再到项目实战。每天按“理解、写代码、检查、变式”推进，不让参考答案抢走你的思考。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {quickActions.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.label} className={item.label === "开始今日任务" ? "primary-button" : "secondary-button"} onClick={item.action} type="button">
                    <Icon className="h-4 w-4" aria-hidden />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="glass-card rounded-[2rem] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-slate-400">今日学习卡片</div>
                <h2 className="mt-2 text-2xl font-semibold text-white">Day {today.day}</h2>
                <p className="mt-1 text-lg text-cyan-100">{today.title}</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-200/20">
                <Gauge className="h-8 w-8" aria-hidden />
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{today.goal}</p>
            <div className="mt-5">
              <ProgressBar value={stats.percent} label="总进度" />
            </div>
            <button className="mt-5 w-full primary-button" onClick={() => onOpenLesson(today.day)} type="button">
              进入 Day {today.day}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "已完成天数", value: `${stats.completed}/${stats.total}`, desc: "完成按钮会更新进度" },
          { label: "当前阶段", value: currentPhase.title, desc: currentPhase.range },
          { label: "小测记录", value: `${stats.quizCount} 次`, desc: stats.quizScore.total ? `累计 ${stats.quizScore.score}/${stats.quizScore.total}` : "还没有小测" },
          { label: "项目任务", value: `${stats.projectDone} 项`, desc: "项目路线中可勾选" },
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-3xl p-5">
            <div className="text-sm text-slate-400">{item.label}</div>
            <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
            <div className="mt-1 text-sm text-slate-400">{item.desc}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-3xl p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="section-title">28 天学习路线预览</h2>
              <p className="muted mt-1">三阶段推进，先找回 C，再上外设，最后做项目。</p>
            </div>
            <button className="ghost-button" onClick={() => onNavigate("roadmap")} type="button">
              完整路线
              <Route className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {routePreview.map((lesson) => {
              const done = progress.completedDays.includes(lesson.day);
              return (
                <button
                  key={lesson.day}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                  onClick={() => onOpenLesson(lesson.day)}
                  type="button"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-cyan-100">Day {lesson.day}</span>
                    <span className={done ? "text-xs text-emerald-200" : "text-xs text-slate-500"}>{done ? "已完成" : lesson.phase.replace(/^第.阶段：/, "")}</span>
                  </div>
                  <div className="mt-2 font-semibold text-white">{lesson.title}</div>
                  <div className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">{lesson.goal}</div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="glass-card rounded-3xl p-5">
          <h2 className="section-title">最近学习记录</h2>
          <div className="mt-4 space-y-3">
            {recent.length ? (
              recent.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                  <div className="text-sm text-white">{item.text}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.date}</div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300">
                还没有记录。完成一次学习、小测或笔记后，这里会显示你的学习轨迹。
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

