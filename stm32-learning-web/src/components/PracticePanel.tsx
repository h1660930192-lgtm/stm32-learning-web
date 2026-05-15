import { CheckSquare, Code2, Lightbulb, ListChecks, PencilLine, Sparkles } from "lucide-react";
import { useState } from "react";
import type { PracticeExercise } from "../types";
import { CodeBlock } from "./CodeBlock";

interface PracticePanelProps {
  exercises: PracticeExercise[];
}

function PracticeItem({ exercise, index }: { exercise: PracticeExercise; index: number }) {
  const [mode, setMode] = useState<"self" | "hint" | "detail" | "code" | "checklist">("self");

  return (
    <article className="glass-card rounded-3xl p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">练习 {index}</div>
          <h4 className="mt-2 text-lg font-semibold text-white">{exercise.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.prompt}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        <button className="secondary-button" onClick={() => setMode("self")} type="button">
          <PencilLine className="h-4 w-4" aria-hidden />
          我想自己做
        </button>
        <button className="secondary-button" onClick={() => setMode("hint")} type="button">
          <Lightbulb className="h-4 w-4" aria-hidden />
          一点提示
        </button>
        <button className="secondary-button" onClick={() => setMode("detail")} type="button">
          <Sparkles className="h-4 w-4" aria-hidden />
          具体提示
        </button>
        <button className="secondary-button" onClick={() => setMode("code")} type="button">
          <Code2 className="h-4 w-4" aria-hidden />
          参考代码
        </button>
        <button className="secondary-button" onClick={() => setMode("checklist")} type="button">
          <ListChecks className="h-4 w-4" aria-hidden />
          检查清单
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
        {mode === "self" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold text-white">
              <CheckSquare className="h-4 w-4 text-emerald-300" aria-hidden />
              先自己写第一版
            </div>
            <p className="text-sm leading-6 text-slate-300">先写三行伪代码：输入是什么、处理是什么、输出是什么。写完再打开提示，不急着看参考代码。</p>
            <p className="text-sm leading-6 text-cyan-100">变式训练：{exercise.variation}</p>
          </div>
        ) : null}
        {mode === "hint" ? <p className="text-sm leading-6 text-slate-200">{exercise.hint}</p> : null}
        {mode === "detail" ? <p className="text-sm leading-6 text-slate-200">{exercise.detailedHint}</p> : null}
        {mode === "code" ? (
          <CodeBlock code={exercise.referenceCode} title="主动展开的参考代码" note={exercise.codeNote} />
        ) : null}
        {mode === "checklist" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <div className="mb-3 font-semibold text-white">人工式检查清单</div>
              <ul className="space-y-2 text-sm leading-6 text-slate-300">
                {exercise.checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-3 font-semibold text-white">常见错误</div>
              <ul className="space-y-2 text-sm leading-6 text-slate-300">
                {exercise.commonMistakes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function PracticePanel({ exercises }: PracticePanelProps) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="section-title">交互练习</h3>
        <p className="muted mt-1">答案默认隐藏。先写自己的第一版，再按需要逐层打开提示。</p>
      </div>
      {exercises.map((exercise, index) => (
        <PracticeItem key={exercise.id} exercise={exercise} index={index + 1} />
      ))}
    </section>
  );
}

