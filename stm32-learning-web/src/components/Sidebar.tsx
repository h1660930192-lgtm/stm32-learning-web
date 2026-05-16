import { BarChart3, Blocks, ClipboardCheck, Cpu, Route, Sparkles } from "lucide-react";
import type { ViewId } from "../types";

interface SidebarProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

const items: Array<{ id: ViewId; label: string; desc: string; icon: typeof BarChart3 }> = [
  { id: "dashboard", label: "学习仪表盘", desc: "今日任务与进度", icon: BarChart3 },
  { id: "roadmap", label: "35 天路线", desc: "四阶段学习路径", icon: Route },
  { id: "lesson", label: "每日任务", desc: "概念、练习、笔记", icon: ClipboardCheck },
  { id: "quiz", label: "每日小测", desc: "5 题即时反馈", icon: Sparkles },
  { id: "project", label: "项目路线", desc: "轨交监测小系统", icon: Blocks },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-slate-950 shadow-glow">
          <Cpu className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <div className="font-semibold text-white">STM32 Zero Lab</div>
          <div className="text-xs text-slate-400">从零基础到能上板</div>
        </div>
      </div>
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                active ? "bg-cyan-300 text-slate-950 shadow-glow" : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
              }`}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className={`block text-xs ${active ? "text-slate-800" : "text-slate-500"}`}>{item.desc}</span>
              </span>
            </button>
          );
        })}
      </nav>
      <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
        学习原则：先补稳基础，再碰外设。看懂不等于会写，先写错再改对很正常。
      </div>
    </aside>
  );
}
