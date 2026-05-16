import type { Lesson, QuizQuestion } from "../types";
import { lessons } from "./lessons";

function q(
  day: number,
  index: number,
  input: Omit<QuizQuestion, "id">
): QuizQuestion {
  return { id: `d${day}-q${index}`, ...input };
}

function beginnerQuiz(day: number): QuizQuestion[] {
  const table: Record<number, QuizQuestion[]> = {
    1: [
      q(1, 1, { type: "single", title: "程序入口", question: "C 程序通常从哪里开始执行？", options: ["printf", "main", "return", "#include"], answer: "B", explanation: "程序通常从 main 函数开始执行。", review: "复习 Day 1 的最小程序骨架。" }),
      q(1, 2, { type: "judge", title: "printf", question: "printf 的作用是把内容输出到屏幕。", answer: "对", explanation: "printf 负责输出。", review: "复习 printf。" }),
      q(1, 3, { type: "short", title: "return 0", question: "return 0 大概表示什么？", answer: "程序正常结束", keywords: ["正常", "结束"], explanation: "return 0 表示程序正常结束。", review: "复习 main 函数。" }),
      q(1, 4, { type: "code-reading", title: "读代码", question: "下面代码会输出什么？", code: 'printf("Hello C\\n");', answer: "Hello C", keywords: ["hello c"], explanation: "双引号里的文字会被输出。", review: "复习 printf。" }),
      q(1, 5, { type: "fill", title: "代码填空", question: "一条普通 C 语句常常以符号 ___ 结束。", answer: ";", explanation: "分号表示一条语句结束。", review: "复习关键符号。" }),
    ],
    2: [
      q(2, 1, { type: "single", title: "数据类型", question: "保存整数年龄更适合用哪种类型？", options: ["int", "float", "char", "main"], answer: "A", explanation: "年龄通常用 int。", review: "复习 int / float / char。" }),
      q(2, 2, { type: "judge", title: "赋值", question: "在 C 里，= 常用于把右边的值保存到左边变量。", answer: "对", explanation: "= 表示赋值。", review: "复习变量赋值。" }),
      q(2, 3, { type: "short", title: "float", question: "温度 26.5 更适合用 int 还是 float？", answer: "float", keywords: ["float"], explanation: "带小数的温度更适合 float。", review: "复习数据类型。" }),
      q(2, 4, { type: "code-reading", title: "读代码", question: "下面代码输出什么？", code: "int a = 10;\nprintf(\"%d\", a);", answer: "10", keywords: ["10"], explanation: "a 保存 10，所以输出 10。", review: "复习变量和值。" }),
      q(2, 5, { type: "fill", title: "代码填空", question: "保存单个字符 A 可以写 char grade = ___;", answer: "'A'", explanation: "char 使用单引号。", review: "复习 char。" }),
    ],
    3: [
      q(3, 1, { type: "judge", title: "scanf 与 &", question: "scanf 输入普通变量时，通常需要在变量名前加 &。", answer: "对", explanation: "& 表示变量地址，scanf 需要知道把输入放到哪里。", review: "重点复习 scanf 与 &。" }),
      q(3, 2, { type: "single", title: "&a", question: "&a 表示什么？", options: ["变量 a 的值", "变量 a 的地址", "变量 a 的类型", "删除变量 a"], answer: "B", explanation: "&a 表示 a 的地址。", review: "复习值和地址。" }),
      q(3, 3, { type: "short", title: "printf / scanf", question: "printf 和 scanf 谁负责输入？", answer: "scanf", keywords: ["scanf"], explanation: "scanf 负责输入，printf 负责输出。", review: "复习输入输出。" }),
      q(3, 4, { type: "code-reading", title: "正确写法", question: "哪一行更适合读取普通整数变量 a？", code: 'scanf("%d", a);\nscanf("%d", &a);', answer: "第二行", keywords: ["第二", "&a"], explanation: "第二行传入了 a 的地址。", review: "复习 scanf 的正确写法。" }),
      q(3, 5, { type: "fill", title: "代码填空", question: 'scanf("%d", ___a);', answer: "&", explanation: "普通变量前需要 &。", review: "复习 &。" }),
    ],
    4: [
      q(4, 1, { type: "single", title: "相等判断", question: "判断 a 是否等于 10，应该用哪个符号？", options: ["=", "==", ">", "<"], answer: "B", explanation: "== 表示比较是否相等。", review: "复习判断符号。" }),
      q(4, 2, { type: "judge", title: "边界", question: "“及格线 60 分及以上”可以写成 score >= 60。", answer: "对", explanation: "及以上包含 60。", review: "复习边界值。" }),
      q(4, 3, { type: "short", title: "else", question: "if 条件不成立时，常用哪个分支处理另一种情况？", answer: "else", keywords: ["else"], explanation: "else 处理条件不成立时的逻辑。", review: "复习 if / else。" }),
      q(4, 4, { type: "code-reading", title: "读代码", question: "score=59 时输出什么？", code: 'if (score >= 60) printf("PASS"); else printf("FAIL");', answer: "FAIL", keywords: ["fail"], explanation: "59 小于 60。", review: "复习 if 判断。" }),
      q(4, 5, { type: "fill", title: "代码填空", question: "条件不成立时可进入 ___ 分支。", answer: "else", explanation: "else 表示否则。", review: "复习 if / else。" }),
    ],
    5: [
      q(5, 1, { type: "single", title: "for 三部分", question: "for 循环中常负责让 i 每轮加 1 的是？", options: ["i = 1", "i <= 10", "i++", "printf"], answer: "C", explanation: "i++ 负责更新循环变量。", review: "复习 for 的三部分。" }),
      q(5, 2, { type: "judge", title: "死循环", question: "如果循环变量一直不更新，程序可能停不下来。", answer: "对", explanation: "条件一直满足就会持续循环。", review: "复习死循环。" }),
      q(5, 3, { type: "short", title: "sum", question: "求和前，sum 常常应该先初始化成多少？", answer: "0", keywords: ["0"], explanation: "累加器通常从 0 开始。", review: "复习累加器。" }),
      q(5, 4, { type: "code-reading", title: "读代码", question: "下面循环会输出几次？", code: "for (int i = 0; i < 3; i++) printf(\"Hi\\n\");", answer: "3", keywords: ["3"], explanation: "i 为 0、1、2 时各执行一次。", review: "复习循环边界。" }),
      q(5, 5, { type: "fill", title: "代码填空", question: "for 循环里 i++ 表示 i 每轮 ___ 1。", answer: "加", explanation: "++ 表示自增 1。", review: "复习 ++。" }),
    ],
    6: [
      q(6, 1, { type: "single", title: "while", question: "while 更适合哪类场景？", options: ["次数完全不确定的重复", "永远不执行", "只能输出文字", "定义结构体"], answer: "A", explanation: "while 适合条件驱动的循环。", review: "复习 while。" }),
      q(6, 2, { type: "judge", title: "while(1)", question: "while(1) 在单片机里通常表示持续运行的主循环。", answer: "对", explanation: "单片机常常需要一直工作。", review: "复习主循环。" }),
      q(6, 3, { type: "short", title: "更新变量", question: "while 循环里如果忘了更新 i，可能发生什么？", answer: "死循环", keywords: ["死循环", "停不下来"], explanation: "条件一直满足就可能死循环。", review: "复习循环更新。" }),
      q(6, 4, { type: "code-reading", title: "读代码", question: "i 初始为 1，下面代码第一次输出什么？", code: "while (i <= 3) {\n  printf(\"%d\", i);\n  i++;\n}", answer: "1", keywords: ["1"], explanation: "第一次循环时 i 还是 1。", review: "复习 while 执行顺序。" }),
      q(6, 5, { type: "fill", title: "代码填空", question: "单片机持续运行的主循环常写成 while(___)。", answer: "1", explanation: "while(1) 表示条件恒真。", review: "复习 while(1)。" }),
    ],
    7: [
      q(7, 1, { type: "single", title: "数组下标", question: "长度为 5 的数组，第一个元素下标是？", options: ["0", "1", "4", "5"], answer: "A", explanation: "数组下标从 0 开始。", review: "复习数组下标。" }),
      q(7, 2, { type: "judge", title: "越界", question: "数组 int a[5] 的合法下标是 0 到 4。", answer: "对", explanation: "a[5] 已经越界。", review: "复习数组边界。" }),
      q(7, 3, { type: "short", title: "应用", question: "数组为什么适合保存多次温度采样？", answer: "可以保存一组同类型数据", keywords: ["一组", "同类型", "多次"], explanation: "数组能保存一组同类型数据。", review: "复习数组用途。" }),
      q(7, 4, { type: "code-reading", title: "读代码", question: "下面代码输出什么？", code: "int a[3] = {10, 20, 30};\nprintf(\"%d\", a[0]);", answer: "10", keywords: ["10"], explanation: "a[0] 是第一个元素。", review: "复习下标。" }),
      q(7, 5, { type: "fill", title: "代码填空", question: "访问数组第一个元素常写成 a[___]。", answer: "0", explanation: "第一个下标是 0。", review: "复习数组。" }),
    ],
    8: [
      q(8, 1, { type: "single", title: "函数调用", question: "下面哪一个像函数调用？", options: ["int add", "return", "add(2, 3)", "int a"], answer: "C", explanation: "add(2, 3) 是调用函数。", review: "复习定义和调用。" }),
      q(8, 2, { type: "judge", title: "return", question: "函数可以通过 return 把结果交回去。", answer: "对", explanation: "return 用于返回结果。", review: "复习函数返回值。" }),
      q(8, 3, { type: "short", title: "参数", question: "add(int a, int b) 里的 a、b 叫什么？", answer: "参数", keywords: ["参数"], explanation: "a、b 是参数。", review: "复习函数参数。" }),
      q(8, 4, { type: "code-reading", title: "读代码", question: "add(2, 3) 返回什么？", code: "int add(int a, int b) {\n  return a + b;\n}", answer: "5", keywords: ["5"], explanation: "2 + 3 = 5。", review: "复习函数调用。" }),
      q(8, 5, { type: "fill", title: "代码填空", question: "把结果交回去常用关键字 ___。", answer: "return", explanation: "return 表示返回。", review: "复习 return。" }),
    ],
    9: [
      q(9, 1, { type: "single", title: "地址", question: "&a 表示什么？", options: ["a 的值", "a 的地址", "a 的类型", "a 的长度"], answer: "B", explanation: "&a 表示地址。", review: "复习地址概念。" }),
      q(9, 2, { type: "judge", title: "指针", question: "指针变量可以用来保存地址。", answer: "对", explanation: "这是指针最基础的定义。", review: "复习指针。" }),
      q(9, 3, { type: "short", title: "*p", question: "*p 大概表示什么？", answer: "通过地址访问数据", keywords: ["地址", "数据"], explanation: "*p 用来通过地址访问数据。", review: "复习 *。" }),
      q(9, 4, { type: "code-reading", title: "读代码", question: "最终 a 的值是多少？", code: "int a = 10;\nint *p = &a;\n*p = 20;", answer: "20", keywords: ["20"], explanation: "*p 修改的就是 a 所在位置的数据。", review: "复习指针修改变量。" }),
      q(9, 5, { type: "fill", title: "代码填空", question: "scanf 读取普通变量 a 时常写 scanf(\"%d\", ___a);", answer: "&", explanation: "需要传地址。", review: "复习 scanf 与地址。" }),
    ],
    10: [
      q(10, 1, { type: "single", title: "结构体", question: "结构体主要用来做什么？", options: ["打包多个相关数据", "删除变量", "替代 main", "只保存字符"], answer: "A", explanation: "结构体能把相关字段放在一起。", review: "复习结构体。" }),
      q(10, 2, { type: "judge", title: "HAL 句柄", question: "UART_HandleTypeDef 本质上也是结构体类型。", answer: "对", explanation: "HAL 中大量使用结构体。", review: "复习 HAL 与结构体。" }),
      q(10, 3, { type: "short", title: "成员访问", question: "普通结构体变量访问成员常用什么符号？", answer: ".", keywords: ["."], explanation: "普通结构体变量常用点号访问成员。", review: "复习成员访问。" }),
      q(10, 4, { type: "code-reading", title: "读代码", question: "s.score 的值是多少？", code: "typedef struct { int score; } Student;\nStudent s = {95};", answer: "95", keywords: ["95"], explanation: "初始化时 score 被设成 95。", review: "复习结构体初始化。" }),
      q(10, 5, { type: "fill", title: "代码填空", question: "把 age 和 score 放在一起，可以定义一个 ___。", answer: "结构体", explanation: "结构体适合打包多个相关数据。", review: "复习结构体用途。" }),
    ],
  };
  return table[day];
}

function laterQuiz(lesson: Lesson): QuizQuestion[] {
  const concept = lesson.concepts[0];
  const review =
    lesson.phaseId === "mcu"
      ? "复习单片机与 GPIO 基础概念。"
      : lesson.phaseId === "stm32"
        ? "复习本日 STM32 外设最小知识点。"
        : "复习项目输入、处理、输出和模块化思维。";

  return [
    q(lesson.day, 1, {
      type: "single",
      title: "今日重点",
      question: `今天最该先掌握的是哪一项？`,
      options: [lesson.coreTakeaways[0], "直接复制整段代码", "跳过基础解释", "只背函数名"],
      answer: "A",
      explanation: "零基础路线先抓最小核心，不急着扩展。",
      review,
    }),
    q(lesson.day, 2, {
      type: "judge",
      title: "学习方法",
      question: "看懂不等于会写，每天仍然需要自己动手写一点。",
      answer: "对",
      explanation: "真正的熟悉来自亲手写和亲手改。",
      review: "复习学习原则。",
    }),
    q(lesson.day, 3, {
      type: "short",
      title: `解释概念：${concept}`,
      question: `用一句话解释“${concept}”。`,
      answer: concept,
      keywords: [concept],
      explanation: `今天的核心概念之一就是 ${concept}。`,
      review,
    }),
    q(lesson.day, 4, {
      type: "code-reading",
      title: "代码阅读",
      question: "这段代码和今天主题有什么关系？",
      code: lesson.codeExamples[0]?.code ?? "",
      answer: lesson.codeExamples[0]?.solves ?? lesson.goal,
      keywords: [lesson.title, concept],
      explanation: lesson.codeExamples[0]?.solves ?? lesson.goal,
      review,
    }),
    q(lesson.day, 5, {
      type: "fill",
      title: "关键字填空",
      question: `今天的主题是“${lesson.title}”，请填写一个关键词：___`,
      answer: concept,
      explanation: `可从今天概念中记住 ${concept}。`,
      review,
    }),
  ];
}

export const quizzes = Object.fromEntries(
  lessons.map((lesson) => [lesson.day, lesson.day <= 10 ? beginnerQuiz(lesson.day) : laterQuiz(lesson)])
) as Record<number, QuizQuestion[]>;

export function getQuiz(day: number) {
  return quizzes[day] ?? quizzes[1];
}
