import { BookOpenText, CheckSquare, Code2, FileCode2, Lightbulb, ListChecks, Sparkles } from "lucide-react";
import { useState } from "react";
import type { PracticeExercise } from "../types";
import { CodeBlock } from "./CodeBlock";

interface PracticePanelProps {
  exercises: PracticeExercise[];
}

type Mode = "meaning" | "hint" | "detail" | "pseudo" | "code" | "checklist";

function PracticeItem({ exercise, index }: { exercise: PracticeExercise; index: number }) {
  const [mode, setMode] = useState<Mode>("meaning");

  return (
    <article className="glass-card rounded-3xl p-5">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">练习 {index}</div>
        <h4 className="mt-2 text-lg font-semibold text-white">{exercise.title}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.prompt}</p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-xs text-slate-400">输入示例</div>
          <div className="mt-1 whitespace-pre-line text-sm text-white">{exercise.inputExample}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-xs text-slate-400">输出示例</div>
          <div className="mt-1 whitespace-pre-line text-sm text-white">{exercise.outputExample}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-xs text-slate-400">关键知识点</div>
          <div className="mt-1 text-sm text-white">{exercise.keyPoint}</div>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-6">
        <button className="secondary-button" onClick={() => setMode("meaning")} type="button">
          <BookOpenText className="h-4 w-4" aria-hidden />
          解释题意
        </button>
        <button className="secondary-button" onClick={() => setMode("hint")} type="button">
          <Lightbulb className="h-4 w-4" aria-hidden />
          一点提示
        </button>
        <button className="secondary-button" onClick={() => setMode("detail")} type="button">
          <Sparkles className="h-4 w-4" aria-hidden />
          具体提示
        </button>
        <button className="secondary-button" onClick={() => setMode("pseudo")} type="button">
          <FileCode2 className="h-4 w-4" aria-hidden />
          伪代码
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
        {mode === "meaning" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold text-white">
              <CheckSquare className="h-4 w-4 text-emerald-300" aria-hidden />
              我完全不会，先看懂题目
            </div>
            <p className="text-sm leading-6 text-slate-300">{exercise.explanation}</p>
            <p className="text-sm leading-6 text-cyan-100">完成后再试一个变式：{exercise.variation}</p>
          </div>
        ) : null}
        {mode === "hint" ? <p className="text-sm leading-6 text-slate-200">{exercise.hint}</p> : null}
        {mode === "detail" ? <p className="text-sm leading-6 text-slate-200">{exercise.detailedHint}</p> : null}
        {mode === "pseudo" ? (
          <ol className="space-y-2 text-sm leading-6 text-slate-200">
            {exercise.pseudocode.map((item, itemIndex) => (
              <li key={item} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-xs text-cyan-100">{itemIndex + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        ) : null}
        {mode === "code" ? <CodeBlock code={exercise.referenceCode} title="主动展开的参考代码" note={exercise.codeNote} /> : null}
        {mode === "checklist" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <div className="mb-3 font-semibold text-white">检查清单</div>
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
  if (!exercises.length) return null;

  return (
    <section className="space-y-4">
      <div>
        <h3 className="section-title">交互练习</h3>
        <p className="muted mt-1">先看懂题意，再逐层要提示。AI 可以陪你走，但不能替你直接跳到答案。</p>
      </div>
      {exercises.map((exercise, index) => (
        <PracticeItem key={exercise.id} exercise={exercise} index={index + 1} />
      ))}
    </section>
  );
}
