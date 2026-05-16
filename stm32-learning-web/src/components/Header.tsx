import { BookOpenCheck, Menu, RotateCcw } from "lucide-react";
import type { ViewId } from "../types";

interface HeaderProps {
  currentDay: number;
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
  onReset: () => void;
}

export function Header({ currentDay, activeView, onNavigate, onReset }: HeaderProps) {
  const mobileNav: Array<{ id: ViewId; label: string }> = [
    { id: "dashboard", label: "首页" },
    { id: "roadmap", label: "路线" },
    { id: "quiz", label: "小测" },
    { id: "project", label: "项目" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 ring-1 ring-cyan-200/20">
            <BookOpenCheck className="h-5 w-5 text-cyan-200" aria-hidden />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white md:text-base">STM32 零基础入门学习助手</div>
            <div className="text-xs text-slate-400">当前 Day {currentDay} · 浏览器本地保存</div>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button className="secondary-button" onClick={() => onNavigate("lesson")} type="button">
            开始今日任务
          </button>
          <button className="ghost-button" onClick={onReset} type="button" title="重置本地进度">
            <RotateCcw className="h-4 w-4" aria-hidden />
            重置
          </button>
        </div>
        <Menu className="h-5 w-5 text-slate-400 md:hidden" aria-hidden />
      </div>
      <nav className="thin-scroll flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {mobileNav.map((item) => (
          <button
            key={item.id}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeView === item.id ? "bg-cyan-300 text-slate-950" : "bg-white/[0.08] text-slate-200"
            }`}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
