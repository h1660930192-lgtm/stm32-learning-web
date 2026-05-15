export type PhaseId = "c" | "stm32" | "project";
export type ViewId = "dashboard" | "roadmap" | "lesson" | "quiz" | "project";
export type Difficulty = "入门" | "基础" | "进阶" | "综合";

export interface PracticeExercise {
  id: string;
  title: string;
  prompt: string;
  hint: string;
  detailedHint: string;
  referenceCode: string;
  codeNote: string;
  checklist: string[];
  commonMistakes: string[];
  variation: string;
}

export interface Lesson {
  day: number;
  title: string;
  phase: string;
  phaseId: PhaseId;
  goal: string;
  difficulty: Difficulty;
  duration: string;
  objectives: string[];
  concepts: string[];
  comparison51: string[];
  stm32Implementation: string[];
  cubemxTips: string[];
  codeFramework: string;
  codeExplanation: string;
  exercises: PracticeExercise[];
  selfTest: string[];
  commonErrors: string[];
}

export type QuizType = "single" | "judge" | "short" | "code-reading" | "fill";

export interface QuizQuestion {
  id: string;
  type: QuizType;
  title: string;
  question: string;
  options?: string[];
  answer: string;
  keywords?: string[];
  code?: string;
  explanation: string;
  review: string;
}

export interface QuizResult {
  day: number;
  score: number;
  total: number;
  wrong: string[];
  date: string;
}

export interface ActivityItem {
  id: string;
  date: string;
  text: string;
  type: "lesson" | "quiz" | "note" | "project";
}

export interface ProgressState {
  currentDay: number;
  completedDays: number[];
  quizScores: Record<number, QuizResult>;
  projectTasks: Record<string, boolean>;
  notes: Record<number, string>;
  activity: ActivityItem[];
}

export interface ProjectPhase {
  id: string;
  dayRange: string;
  title: string;
  goal: string;
  tasks: string[];
  deliverable: string;
}

