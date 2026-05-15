import { Copy, TerminalSquare } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  note?: string;
}

export function CodeBlock({ code, language = "c", title = "最小代码框架", note }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-300/15 bg-slate-950/80 shadow-panel">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <TerminalSquare className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
          <div className="truncate text-sm font-semibold text-slate-100">{title}</div>
          <span className="rounded-full bg-cyan-300/10 px-2 py-0.5 text-xs text-cyan-200">{language}</span>
        </div>
        <button className="ghost-button shrink-0" onClick={handleCopy} type="button" title="复制代码">
          <Copy className="h-4 w-4" aria-hidden />
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <pre className="code-scroll max-h-[440px] overflow-auto p-4 text-sm leading-6 text-cyan-50">
        <code>{code}</code>
      </pre>
      {note ? <div className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-slate-300">{note}</div> : null}
    </div>
  );
}

