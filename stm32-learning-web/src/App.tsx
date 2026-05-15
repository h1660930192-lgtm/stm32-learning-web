import { useMemo, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { LessonCard } from "./components/LessonCard";
import { LessonDetail } from "./components/LessonDetail";
import { ProjectRoadmap } from "./components/ProjectRoadmap";
import { QuizPanel } from "./components/QuizPanel";
import { Sidebar } from "./components/Sidebar";
import { lessons, phaseRanges, getLesson } from "./data/lessons";
import { getQuiz } from "./data/quizzes";
import { useProgress } from "./hooks/useProgress";
import type { ViewId } from "./types";

function RoadmapView({
  currentDay,
  completedDays,
  onOpenLesson,
}: {
  currentDay: number;
  completedDays: number[];
  onOpenLesson: (day: number) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">28 天路线</div>
        <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">从 C 恢复到项目实战</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">每一天都包含目标、概念、51 类比、CubeMX 提示、练习和检查清单。点击任意 Day 进入详情。</p>
      </div>
      {phaseRanges.map((phase) => {
        const phaseLessons = lessons.filter((lesson) => lesson.phaseId === phase.id);
        return (
          <section key={phase.id} className="space-y-4">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <div>
                <h2 className="section-title">{phase.title}</h2>
                <p className="muted mt-1">{phase.range}</p>
              </div>
              <div className={`h-1 w-full rounded-full bg-gradient-to-r ${phase.tone} md:w-64`} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {phaseLessons.map((lesson) => (
                <LessonCard
                  key={lesson.day}
                  lesson={lesson}
                  completed={completedDays.includes(lesson.day)}
                  active={lesson.day === currentDay}
                  onOpen={onOpenLesson}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function QuizView({
  currentDay,
  savedResult,
  onSaveQuiz,
  onSelectDay,
}: {
  currentDay: number;
  savedResult: ReturnType<typeof useProgress>["progress"]["quizScores"][number] | undefined;
  onSaveQuiz: ReturnType<typeof useProgress>["saveQuizResult"];
  onSelectDay: (day: number) => void;
}) {
  const lesson = getLesson(currentDay);
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">每日小测</div>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">Day {currentDay} · {lesson.title}</h1>
        </div>
        <select
          className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100"
          value={currentDay}
          onChange={(event) => onSelectDay(Number(event.target.value))}
        >
          {lessons.map((item) => (
            <option key={item.day} value={item.day}>
              Day {item.day} · {item.title}
            </option>
          ))}
        </select>
      </div>
      <QuizPanel day={currentDay} questions={getQuiz(currentDay)} savedResult={savedResult} onSubmit={onSaveQuiz} />
    </div>
  );
}

export default function App() {
  const { progress, stats, setCurrentDay, completeDay, saveNote, saveQuizResult, toggleProjectTask, resetProgress } = useProgress();
  const [activeView, setActiveView] = useState<ViewId>("dashboard");
  const [selectedDay, setSelectedDay] = useState(progress.currentDay);

  const currentLesson = useMemo(() => getLesson(selectedDay), [selectedDay]);

  const navigate = (view: ViewId) => {
    if (view === "lesson") {
      setSelectedDay(progress.currentDay);
    }
    setActiveView(view);
  };

  const openLesson = (day: number) => {
    setSelectedDay(day);
    setCurrentDay(day);
    setActiveView("lesson");
  };

  const resetWithConfirm = () => {
    if (window.confirm("确认清空 localStorage 中的学习进度吗？")) {
      resetProgress();
      setSelectedDay(1);
      setActiveView("dashboard");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-circuit-grid bg-[length:42px_42px] opacity-40" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-cyan-500/10 to-transparent" />
      <div className="flex min-h-screen">
        <Sidebar activeView={activeView} onNavigate={navigate} />
        <div className="min-w-0 flex-1">
          <Header currentDay={progress.currentDay} activeView={activeView} onNavigate={navigate} onReset={resetWithConfirm} />
          <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
            {activeView === "dashboard" ? <Dashboard progress={progress} stats={stats} onNavigate={navigate} onOpenLesson={openLesson} /> : null}
            {activeView === "roadmap" ? <RoadmapView currentDay={progress.currentDay} completedDays={progress.completedDays} onOpenLesson={openLesson} /> : null}
            {activeView === "lesson" ? (
              <LessonDetail
                lesson={currentLesson}
                completed={progress.completedDays.includes(currentLesson.day)}
                note={progress.notes[currentLesson.day] ?? ""}
                savedQuiz={progress.quizScores[currentLesson.day]}
                onBack={() => setActiveView("roadmap")}
                onComplete={completeDay}
                onSaveNote={saveNote}
                onSaveQuiz={saveQuizResult}
              />
            ) : null}
            {activeView === "quiz" ? (
              <QuizView
                currentDay={selectedDay}
                savedResult={progress.quizScores[selectedDay]}
                onSaveQuiz={saveQuizResult}
                onSelectDay={(day) => {
                  setSelectedDay(day);
                  setCurrentDay(day);
                }}
              />
            ) : null}
            {activeView === "project" ? <ProjectRoadmap projectTasks={progress.projectTasks} onToggleTask={toggleProjectTask} /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}

