import { CheckCircle2, Send, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import type { QuizQuestion, QuizResult } from "../types";
import { CodeBlock } from "./CodeBlock";

interface QuizPanelProps {
  day: number;
  questions: QuizQuestion[];
  savedResult?: QuizResult;
  onSubmit: (result: QuizResult) => void;
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[，。]/g, "");
}

function isCorrect(question: QuizQuestion, answer: string) {
  const value = normalize(answer);
  if (!value) return false;
  if (question.type === "single") return value === normalize(question.answer) || value === normalize(question.answer[0]);
  if (question.type === "judge") return value === normalize(question.answer);
  if (question.type === "fill") {
    const right = normalize(question.answer);
    return value.includes(right) || right.includes(value);
  }
  const keywords = question.keywords?.map(normalize).filter(Boolean) ?? [];
  return keywords.some((keyword) => value.includes(keyword));
}

export function QuizPanel({ day, questions, savedResult, onSubmit }: QuizPanelProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    const wrong = questions.filter((question) => !isCorrect(question, answers[question.id] ?? ""));
    return {
      score: questions.length - wrong.length,
      wrong,
    };
  }, [answers, questions]);

  const submit = () => {
    setSubmitted(true);
    onSubmit({
      day,
      score: result.score,
      total: questions.length,
      wrong: result.wrong.map((item) => item.title),
      date: new Date().toLocaleString("zh-CN", { hour12: false }),
    });
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h3 className="section-title">每日小测</h3>
          <p className="muted mt-1">5 道题覆盖单选、判断、简答、代码阅读和代码填空。简答题按关键词做轻量判断。</p>
        </div>
        {savedResult ? (
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
            上次得分：{savedResult.score}/{savedResult.total}
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          const answer = answers[question.id] ?? "";
          const correct = submitted ? isCorrect(question, answer) : undefined;
          return (
            <article key={question.id} className="glass-card rounded-3xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    {index + 1}. {question.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{question.question}</p>
                </div>
                {submitted ? (
                  correct ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden /> : <XCircle className="h-5 w-5 shrink-0 text-rose-300" aria-hidden />
                ) : null}
              </div>
              {question.code ? <div className="mt-4"><CodeBlock code={question.code} title="题目代码" /></div> : null}
              {question.type === "single" && question.options ? (
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const label = String.fromCharCode(65 + optionIndex);
                    return (
                      <label key={option} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-sm text-slate-200 transition hover:bg-white/[0.08]">
                        <input
                          className="h-4 w-4 accent-cyan-300"
                          name={question.id}
                          type="radio"
                          value={label}
                          checked={answer === label}
                          onChange={() => setAnswers((current) => ({ ...current, [question.id]: label }))}
                        />
                        <span>{label}. {option}</span>
                      </label>
                    );
                  })}
                </div>
              ) : question.type === "judge" ? (
                <div className="mt-4 flex gap-2">
                  {["对", "错"].map((option) => (
                    <button
                      key={option}
                      className={answer === option ? "primary-button" : "secondary-button"}
                      onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  className="mt-4 min-h-24 w-full resize-y rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100 placeholder:text-slate-500"
                  placeholder={question.type === "fill" ? "填写关键字或符号" : "用自己的话回答，不要求背诵"}
                  value={answer}
                  onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                />
              )}
              {submitted ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm leading-6 text-slate-300">
                  <div className={correct ? "font-semibold text-emerald-200" : "font-semibold text-rose-200"}>{correct ? "回答通过" : "需要复习"}</div>
                  <div className="mt-1">解释：{question.explanation}</div>
                  {!correct ? <div className="mt-1 text-cyan-100">建议：{question.review}</div> : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="glass-card rounded-3xl p-5">
        {!submitted ? (
          <button className="primary-button" onClick={submit} type="button">
            <Send className="h-4 w-4" aria-hidden />
            提交小测
          </button>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-semibold text-white">得分：{result.score}/{questions.length}</div>
            {result.wrong.length ? (
              <div>
                <div className="mb-2 font-semibold text-white">错题与复习建议</div>
                <ul className="space-y-2 text-sm leading-6 text-slate-300">
                  {result.wrong.map((item) => (
                    <li key={item.id} className="rounded-2xl bg-white/[0.05] p-3">
                      <span className="font-semibold text-rose-100">{item.title}</span>：{item.explanation} 建议复习：{item.review}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-emerald-100">全部通过。下一步做一道变式题，确认不是只停在“看懂了”。</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

