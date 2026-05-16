import { CheckCircle2, ChevronLeft, ClipboardCheck, Save, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { getQuiz } from "../data/quizzes";
import type { Lesson, QuizResult } from "../types";
import { CodeBlock } from "./CodeBlock";
import { PracticePanel } from "./PracticePanel";
import { QuizPanel } from "./QuizPanel";

interface LessonDetailProps {
  lesson: Lesson;
  completed: boolean;
  note: string;
  savedQuiz?: QuizResult;
  onBack: () => void;
  onComplete: (day: number) => void;
  onSaveNote: (day: number, note: string) => void;
  onSaveQuiz: (result: QuizResult) => void;
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-card rounded-3xl p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LessonDetail({ lesson, completed, note, savedQuiz, onBack, onComplete, onSaveNote, onSaveQuiz }: LessonDetailProps) {
  const [draftNote, setDraftNote] = useState(note);

  useEffect(() => {
    setDraftNote(note);
  }, [lesson.day, note]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <button className="ghost-button mb-4" onClick={onBack} type="button">
            <ChevronLeft className="h-4 w-4" aria-hidden />
            返回
          </button>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Day {lesson.day} · {lesson.phase}</div>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">{lesson.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{lesson.goal}</p>
        </div>
        <div className="glass-card rounded-3xl p-5 md:min-w-64">
          <div className="text-sm text-slate-400">状态</div>
          <div className="mt-2 flex items-center gap-2 text-lg font-semibold text-white">
            <CheckCircle2 className={completed ? "h-5 w-5 text-emerald-300" : "h-5 w-5 text-slate-500"} aria-hidden />
            {completed ? "已完成" : "进行中"}
          </div>
          <div className="mt-3 text-sm text-slate-400">{lesson.difficulty} · {lesson.duration}</div>
          <button className="mt-4 w-full primary-button" onClick={() => onComplete(lesson.day)} type="button">
            <ClipboardCheck className="h-4 w-4" aria-hidden />
            标记完成
          </button>
        </div>
      </div>

      <section className="glass-card rounded-3xl p-5">
        <h2 className="section-title">今天只要掌握这 3 件事</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {lesson.coreTakeaways.map((item, index) => (
            <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.08] p-4">
              <div className="text-xs font-semibold text-cyan-200">0{index + 1}</div>
              <div className="mt-2 text-sm leading-6 text-white">{item}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <InfoList title="今日目标" items={lesson.objectives} />
        <InfoList title="你需要先理解的概念" items={lesson.concepts} />
        <InfoList title="和 51 / 单片机场景的连接" items={lesson.comparison51} />
        <InfoList title="STM32 中对应的实现方式" items={lesson.stm32Implementation} />
        <InfoList title="CubeMX 配置提示" items={lesson.cubemxTips} />
        <InfoList title="常见错误" items={lesson.commonErrors} />
      </div>

      <section className="glass-card rounded-3xl border border-amber-300/20 bg-amber-300/[0.08] p-5">
        <div className="mb-3 flex items-center gap-2 font-semibold text-white">
          <TriangleAlert className="h-5 w-5 text-amber-200" aria-hidden />
          初学者容易误解
        </div>
        <ul className="space-y-2 text-sm leading-6 text-amber-50">
          {lesson.beginnerMisunderstandings.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="section-title">代码展示</h2>
          <p className="muted mt-1">每段代码都尽量短，并说明它解决什么问题、每一行做什么、关键符号是什么意思。</p>
        </div>
        {lesson.codeExamples.map((example) => (
          <div key={example.title} className="space-y-3">
            <CodeBlock
              code={example.code}
              language={example.kind === "c" ? "C" : "STM32 HAL"}
              title={example.title}
              note={`${example.solves}${example.ownership ? ` ${example.ownership}` : ""}`}
            />
            <div className="grid gap-3 lg:grid-cols-2">
              <InfoList title="逐行解释" items={example.lineByLine} />
              <InfoList title="关键符号" items={example.symbols.length ? example.symbols : ["这段没有额外新符号，先关注整体流程。"]} />
            </div>
          </div>
        ))}
      </section>

      <PracticePanel exercises={lesson.exercises} />

      <section className="grid gap-5 lg:grid-cols-2">
        <InfoList title="自测问题" items={lesson.selfTest} />
        <div className="glass-card rounded-3xl p-5">
          <h3 className="font-semibold text-white">我的学习笔记</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">写今天学到了什么、哪里不懂、遇到的 bug、后面要复习什么。内容会保存到 localStorage。</p>
          <textarea
            className="mt-4 min-h-44 w-full resize-y rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100 placeholder:text-slate-500"
            value={draftNote}
            onChange={(event) => setDraftNote(event.target.value)}
            placeholder="例如：今天终于知道 scanf 的 & 不是装饰，而是在传变量地址。"
          />
          <button className="mt-4 secondary-button" onClick={() => onSaveNote(lesson.day, draftNote)} type="button">
            <Save className="h-4 w-4" aria-hidden />
            保存笔记
          </button>
        </div>
      </section>

      <QuizPanel day={lesson.day} questions={getQuiz(lesson.day)} savedResult={savedQuiz} onSubmit={onSaveQuiz} />
    </div>
  );
}
