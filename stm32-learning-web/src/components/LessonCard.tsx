import { CheckCircle2, Clock3, LockKeyhole, PlayCircle } from "lucide-react";
import type { Lesson } from "../types";

interface LessonCardProps {
  lesson: Lesson;
  completed: boolean;
  active: boolean;
  onOpen: (day: number) => void;
}

const phaseTone = {
  c: "from-cyan-300/20 to-sky-400/10 text-cyan-100",
  mcu: "from-emerald-300/20 to-cyan-300/10 text-emerald-100",
  stm32: "from-blue-300/20 to-indigo-400/10 text-blue-100",
  project: "from-violet-300/20 to-emerald-300/10 text-violet-100",
};

export function LessonCard({ lesson, completed, active, onOpen }: LessonCardProps) {
  return (
    <button
      className={`group glass-card flex h-full flex-col rounded-3xl p-5 text-left transition hover:-translate-y-1 hover:border-cyan-300/40 ${
        active ? "ring-2 ring-cyan-300/60" : ""
      }`}
      onClick={() => onOpen(lesson.day)}
      type="button"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Day {lesson.day}</div>
          <h3 className="mt-2 text-lg font-semibold leading-tight text-white">{lesson.title}</h3>
        </div>
        <div className={`rounded-2xl p-2 ${completed ? "bg-emerald-300/15 text-emerald-200" : active ? "bg-cyan-300/15 text-cyan-200" : "bg-white/[0.08] text-slate-400"}`}>
          {completed ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : active ? <PlayCircle className="h-5 w-5" aria-hidden /> : <LockKeyhole className="h-5 w-5" aria-hidden />}
        </div>
      </div>
      <p className="min-h-12 text-sm leading-6 text-slate-300">{lesson.goal}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs ${phaseTone[lesson.phaseId]}`}>{lesson.phase.replace(/^阶段 \d：/, "")}</span>
        <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-slate-300">{lesson.difficulty}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-3 py-1 text-xs text-slate-300">
          <Clock3 className="h-3.5 w-3.5" aria-hidden />
          {lesson.duration}
        </span>
      </div>
      <div className="mt-5 border-t border-white/10 pt-4 text-sm text-cyan-100 opacity-80 transition group-hover:opacity-100">
        查看每日任务
      </div>
    </button>
  );
}
