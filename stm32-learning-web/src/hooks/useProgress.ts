import { useCallback, useEffect, useMemo, useState } from "react";
import type { ActivityItem, ProgressState, QuizResult } from "../types";

const STORAGE_KEY = "stm32-learning-web-progress-v1";

const defaultProgress: ProgressState = {
  currentDay: 1,
  completedDays: [],
  quizScores: {},
  projectTasks: {},
  notes: {},
  activity: [],
};

function readProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      ...defaultProgress,
      ...parsed,
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
      quizScores: parsed.quizScores ?? {},
      projectTasks: parsed.projectTasks ?? {},
      notes: parsed.notes ?? {},
      activity: Array.isArray(parsed.activity) ? parsed.activity : [],
    };
  } catch {
    return defaultProgress;
  }
}

function activity(text: string, type: ActivityItem["type"]): ActivityItem {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: new Date().toLocaleString("zh-CN", { hour12: false }),
    text,
    type,
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => readProgress());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const update = useCallback((recipe: (draft: ProgressState) => ProgressState) => {
    setProgress((current) => recipe(current));
  }, []);

  const setCurrentDay = useCallback(
    (day: number) => {
      const safeDay = Math.min(28, Math.max(1, day));
      update((current) => ({ ...current, currentDay: safeDay }));
    },
    [update]
  );

  const completeDay = useCallback(
    (day: number) => {
      update((current) => {
        const completed = Array.from(new Set([...current.completedDays, day])).sort((a, b) => a - b);
        return {
          ...current,
          completedDays: completed,
          currentDay: day >= current.currentDay ? Math.min(28, day + 1) : current.currentDay,
          activity: [activity(`完成 Day ${day} 学习任务`, "lesson"), ...current.activity].slice(0, 12),
        };
      });
    },
    [update]
  );

  const saveNote = useCallback(
    (day: number, note: string) => {
      update((current) => ({
        ...current,
        notes: { ...current.notes, [day]: note },
        activity: note.trim() ? [activity(`更新 Day ${day} 学习笔记`, "note"), ...current.activity].slice(0, 12) : current.activity,
      }));
    },
    [update]
  );

  const saveQuizResult = useCallback(
    (result: QuizResult) => {
      update((current) => ({
        ...current,
        quizScores: { ...current.quizScores, [result.day]: result },
        activity: [activity(`完成 Day ${result.day} 小测：${result.score}/${result.total}`, "quiz"), ...current.activity].slice(0, 12),
      }));
    },
    [update]
  );

  const toggleProjectTask = useCallback(
    (id: string) => {
      update((current) => ({
        ...current,
        projectTasks: { ...current.projectTasks, [id]: !current.projectTasks[id] },
        activity: [activity(`更新项目任务：${id}`, "project"), ...current.activity].slice(0, 12),
      }));
    },
    [update]
  );

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  const stats = useMemo(() => {
    const completed = progress.completedDays.length;
    const total = 28;
    const quizCount = Object.keys(progress.quizScores).length;
    const quizScore = Object.values(progress.quizScores).reduce(
      (sum, item) => ({ score: sum.score + item.score, total: sum.total + item.total }),
      { score: 0, total: 0 }
    );
    const projectDone = Object.values(progress.projectTasks).filter(Boolean).length;
    return {
      completed,
      total,
      percent: Math.round((completed / total) * 100),
      quizCount,
      quizScore,
      projectDone,
    };
  }, [progress]);

  return {
    progress,
    stats,
    setCurrentDay,
    completeDay,
    saveNote,
    saveQuizResult,
    toggleProjectTask,
    resetProgress,
  };
}

