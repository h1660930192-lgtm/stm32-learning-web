import type { Lesson, QuizQuestion } from "../types";
import { lessons } from "./lessons";

function keywords(...items: string[]) {
  return items.flatMap((item) => item.split(/[、，, /]+/)).filter(Boolean);
}

function cCodeQuestion(day: number): Pick<QuizQuestion, "code" | "answer" | "keywords" | "explanation" | "review"> {
  const table: Record<number, [string, string, string[]]> = {
    1: ['int t = 65;\nif (t > 60) printf("ALARM\\n");', "输出 ALARM，因为 65 大于 60。", ["ALARM", "65", "大于"]],
    2: ['int sum = 0;\nfor (int i = 1; i <= 3; i++) sum += i;\nprintf("%d\\n", sum);', "输出 6。", ["6"]],
    3: ['int a[3] = {2, 5, 1};\nprintf("%d\\n", a[1]);', "输出 5，因为 a[1] 是第二个元素。", ["5", "第二"]],
    4: ['int add(int a, int b) { return a + b; }\nprintf("%d\\n", add(2, 3));', "输出 5。", ["5"]],
    5: ['int x = 10;\nint *p = &x;\n*p = 20;\nprintf("%d\\n", x);', "输出 20，因为 *p 修改了 x。", ["20", "修改"]],
    6: ['typedef struct { int alarm; } State;\nState s = {1};\nprintf("%d\\n", s.alarm);', "输出 1。", ["1"]],
    7: ["int samples[3] = {10, 20, 30};\n/* 平均值是多少？ */", "平均值是 20。", ["20", "平均"]],
  };
  const [code, explanation, kw] = table[day] ?? table[1];
  return { code, answer: explanation, keywords: kw, explanation, review: "复习变量变化过程和 C 语言基础语法。" };
}

function stm32CodeQuestion(day: number): Pick<QuizQuestion, "code" | "answer" | "keywords" | "explanation" | "review"> {
  const table: Record<number, [string, string, string[]]> = {
    8: ["HAL_Init();\nSystemClock_Config();\nMX_GPIO_Init();", "先初始化 HAL、系统时钟和 GPIO。", ["初始化", "HAL", "时钟", "GPIO"]],
    9: ["HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);\nHAL_Delay(500);", "翻转 LED，然后延时 500ms。", ["翻转", "LED", "500"]],
    10: ["HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin);", "读取按键引脚电平。", ["读取", "按键", "电平"]],
    11: ["void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin) { ... }", "GPIO 外部中断回调函数。", ["中断", "回调", "EXTI"]],
    12: ["HAL_UART_Transmit(&huart1, msg, len, 100);", "通过 huart1 对应串口发送数据。", ["串口", "发送", "huart1"]],
    13: ["HAL_TIM_Base_Start_IT(&htim2);", "启动 TIM2 基本定时器中断。", ["启动", "定时器", "中断"]],
    14: ["__HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, 500);", "设置 PWM 比较值，影响占空比。", ["PWM", "比较", "占空比"]],
  };
  const [code, explanation, kw] = table[day] ?? table[9];
  return { code, answer: explanation, keywords: kw, explanation, review: "复习 HAL 函数参数、CubeMX 配置和 USER CODE 区域。" };
}

function projectCodeQuestion(day: number): Pick<QuizQuestion, "code" | "answer" | "keywords" | "explanation" | "review"> {
  if (day <= 17) {
    return {
      code: "voltage = raw * 3.3f / 4095.0f;",
      answer: "把 ADC 原始值 raw 换算成电压。",
      keywords: ["ADC", "电压", "换算", "raw"],
      explanation: "12 位 ADC 常见范围是 0-4095，乘参考电压后得到实际电压。",
      review: "复习 ADC 原始值、电压换算和平均滤波。",
    };
  }
  if (day <= 20) {
    return {
      code: "page = (page + 1) % 3;",
      answer: "页面编号循环切换到下一页。",
      keywords: ["页面", "切换", "循环"],
      explanation: "page 到 2 后再加 1 会回到 0，适合三页循环显示。",
      review: "复习 OLED 页面状态和按键切换逻辑。",
    };
  }
  if (day <= 23) {
    return {
      code: "alarm = sensor_value > threshold;",
      answer: "判断传感器值是否超过阈值，得到报警状态。",
      keywords: ["报警", "阈值", "超过"],
      explanation: "报警状态应统一保存，显示、蜂鸣器和日志都读取同一份状态。",
      review: "复习阈值判断、蜂鸣器输出和串口日志。",
    };
  }
  return {
    code: "采集 -> 滤波 -> 判断 -> 显示 -> 报警 -> 日志",
    answer: "这是综合项目的数据流。",
    keywords: ["采集", "滤波", "显示", "报警", "日志"],
    explanation: "综合项目要按数据流拆模块，避免功能互相缠在一起。",
    review: "复习综合项目模块拆解和简历表达。",
  };
}

function fillQuestion(day: number): Pick<QuizQuestion, "question" | "answer" | "explanation" | "review"> {
  const table: Record<number, [string, string, string]> = {
    1: ['scanf("%d", ___temperature);', "&", "scanf 读取普通变量要传地址。"],
    2: ["for (int i = 1; i ___ 100; i++)", "<=", "求 1 到 100 包含 100。"],
    3: ["int values[5]; 第一个元素是 values[___]", "0", "数组下标从 0 开始。"],
    4: ["int get_max(int a, int b) { ___ a > b ? a : b; }", "return", "非 void 函数要返回结果。"],
    5: ["swap(___x, ___y);", "&", "交换函数需要传变量地址。"],
    6: ["访问普通结构体变量成员使用符号 ___", ".", "普通结构体变量用点号访问成员。"],
    7: ["sum / (float)len 是为了避免 ___ 除法。", "整数", "强转为 float 可以保留小数。"],
    8: ["用户代码应写在 USER CODE ___ 和 USER CODE END 之间。", "BEGIN", "CubeMX 会保留 USER CODE 区域。"],
    9: ["翻转 GPIO 输出使用 HAL_GPIO_ ___ Pin。", "Toggle", "TogglePin 表示翻转当前电平。"],
    10: ["读取 GPIO 输入使用 HAL_GPIO_ ___ Pin。", "Read", "ReadPin 返回引脚电平。"],
    11: ["外部中断需要在 CubeMX 中启用 ___。", "NVIC", "NVIC 控制中断使能和优先级。"],
    12: ["HAL_UART_Transmit 的第一个参数常写作 ___huart1。", "&", "传入串口句柄地址。"],
    13: ["定时器中断启动函数常用 HAL_TIM_Base_Start_ ___。", "IT", "IT 表示 interrupt。"],
    14: ["PWM 亮度主要由 ___ 值与 ARR 的比例决定。", "比较", "比较值影响占空比。"],
  };
  if (day >= 15 && day <= 17) return { question: "ADC 平均滤波通常需要多次采样后求 ___。", answer: "平均", explanation: "平均值能减小随机抖动。", review: "复习 ADC 采集和滤波。" };
  if (day >= 18 && day <= 20) return { question: "OLED 页面切换常用变量 ___ 保存当前页面编号。", answer: "page", explanation: "page 是页面状态变量。", review: "复习显示页面状态。" };
  if (day >= 21 && day <= 23) return { question: "超过阈值后可用 LED 或 ___ 提醒报警。", answer: "蜂鸣器", explanation: "蜂鸣器是常见声报警输出。", review: "复习报警输出。" };
  if (day >= 24) return { question: "综合项目简历描述应包含外设、数据处理、报警逻辑和 ___ 方法。", answer: "调试", explanation: "串口日志和分模块验证都是调试能力。", review: "复习项目总结。" };
  const [question, answer, explanation] = table[day] ?? table[1];
  return { question, answer, explanation, review: "复习今天的最小代码框架。" };
}

function buildQuiz(lesson: Lesson): QuizQuestion[] {
  const concept = lesson.concepts[0];
  const code = lesson.day <= 7 ? cCodeQuestion(lesson.day) : lesson.day <= 14 ? stm32CodeQuestion(lesson.day) : projectCodeQuestion(lesson.day);
  const fill = fillQuestion(lesson.day);
  const coreReview = lesson.day <= 7 ? "复习 C 语言语法和检查清单。" : lesson.day <= 14 ? "复习 CubeMX 配置和 HAL 调用。" : "复习项目数据流和单模块验证。";

  return [
    {
      id: `d${lesson.day}-q1`,
      type: "single",
      title: "学习策略",
      question: `学习“${lesson.title}”时，最推荐的顺序是？`,
      options: ["先理解概念，再写最小代码，再检查，再变式", "先复制完整答案，再慢慢看", "跳过检查清单", "只背函数名"],
      answer: "A",
      explanation: "这套助手的目标是把你从“看懂”带回“能自己写”，所以顺序比速度更重要。",
      review: coreReview,
    },
    {
      id: `d${lesson.day}-q2`,
      type: "judge",
      title: "是否直接看答案",
      question: "遇到不会写的练习时，直接看参考代码是最高效的做法。",
      answer: "错",
      explanation: "应该先写输入、处理、输出，再逐层看提示。参考代码只在卡住后用于校准。",
      review: "复习分层提示的使用方式。",
    },
    {
      id: `d${lesson.day}-q3`,
      type: "short",
      title: `解释概念：${concept}`,
      question: `用自己的话解释“${concept}”在今天内容中的作用。`,
      answer: `它是 ${lesson.title} 的关键概念，用来支撑今天的目标：${lesson.goal}。`,
      keywords: keywords(concept, lesson.title, lesson.goal),
      explanation: "简答题不要求背术语，能说清它解决什么问题即可。",
      review: coreReview,
    },
    {
      id: `d${lesson.day}-q4`,
      type: "code-reading",
      title: "代码阅读",
      question: "阅读代码，说明它大概做什么或输出什么。",
      ...code,
    },
    {
      id: `d${lesson.day}-q5`,
      type: "fill",
      title: "代码填空",
      ...fill,
    },
  ];
}

export const quizzes = Object.fromEntries(lessons.map((lesson) => [lesson.day, buildQuiz(lesson)])) as Record<number, QuizQuestion[]>;

export function getQuiz(day: number) {
  return quizzes[day] ?? quizzes[1];
}

