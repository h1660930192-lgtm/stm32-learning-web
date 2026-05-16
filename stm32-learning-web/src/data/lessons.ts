import type { CodeExample, Difficulty, Lesson, PracticeExercise } from "../types";

const trim = (text: string) => text.trim();

const cChecklist = [
  "是否写了完整的 main 函数",
  "每一行语句末尾是否有分号 ;",
  "printf / scanf 的格式符是否和变量类型对应",
  "scanf 读取普通变量时是否写了 &",
  "if / for / while 的括号和大括号是否成对",
  "数组下标是否从 0 开始，是否越界",
];

const logicChecklist = [
  "是否先写清楚输入、处理、输出",
  "是否能用一句话解释每个变量代表什么",
  "是否至少举了一个正常例子和一个边界例子",
  "是否把复杂任务拆成了小步骤",
];

const stm32Checklist = [
  "先确认硬件接线和高低电平逻辑",
  "CubeMX 配置是否和代码一致",
  "用户代码是否写在 USER CODE BEGIN / END 之间",
  "端口、引脚、句柄、通道是否写对",
  "如果用了中断，NVIC 是否也已经打开",
  "是否先做最小实验，再叠加别的功能",
];

const projectChecklist = [
  ...stm32Checklist,
  "是否能说清输入、处理、输出分别是什么",
  "是否把采集、判断、报警、日志拆成独立模块",
  "是否留下串口日志或测试记录方便排错",
];

function ex(input: Omit<PracticeExercise, "referenceCode"> & { referenceCode: string }): PracticeExercise {
  return { ...input, referenceCode: trim(input.referenceCode) };
}

function code(input: Omit<CodeExample, "code"> & { code: string }): CodeExample {
  return { ...input, code: trim(input.code) };
}

function lesson(input: Omit<Lesson, "difficulty" | "duration"> & { difficulty?: Difficulty; duration?: string }): Lesson {
  return {
    difficulty: input.difficulty ?? "基础",
    duration: input.duration ?? "35-60 分钟",
    ...input,
  };
}

const cCommonErrors = [
  "觉得看懂了就跳过亲手输入",
  "没先跑最小例子就急着写复杂题",
  "把编译错误当成自己不适合编程",
  "不检查分号、括号、变量名这类小问题",
];

const mcuCommonErrors = [
  "把电平、引脚、GPIO 当成一回事",
  "还没理解电路方向就急着写代码",
  "默认高电平一定等于 LED 亮",
  "忘记 GND 是电路共同参考点",
];

const stm32CommonErrors = [
  "还没确认 GPIO 基础就直接抄 HAL 代码",
  "把 CubeMX 自动生成区和用户代码区混在一起",
  "只看函数名，不看参数含义",
  "硬件没接对却一直怀疑程序",
];

const projectCommonErrors = [
  "一开始就想把所有模块一次写完",
  "没有先单独验证 LED、按键、ADC、串口",
  "只做效果，不留调试记录",
  "简历只堆外设名，没有说清解决了什么问题",
];

export const lessons: Lesson[] = [
  lesson({
    day: 1,
    title: "C 程序长什么样",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "先看懂一个最小 C 程序的骨架，不急着写复杂逻辑。",
    difficulty: "入门",
    objectives: ["知道程序从 main 开始", "会用 printf 输出文字", "认识 #include、return 0、分号"],
    coreTakeaways: ["程序入口通常是 main", "printf 负责输出", "分号表示一条语句结束"],
    concepts: ["#include <stdio.h>", "main 函数", "printf 输出", "return 0", "程序入口"],
    beginnerMisunderstandings: [
      "main 不是普通名字，它表示程序从这里开始执行。",
      "return 0 不是输出 0，而是告诉系统程序正常结束。",
    ],
    comparison51: ["以后写单片机程序也会有 main，只是通常不会很快结束。"],
    stm32Implementation: ["STM32 工程里同样从 main 开始，只是 main 里会先做硬件初始化。"],
    cubemxTips: ["今天还不需要 CubeMX。先把电脑端 C 程序看顺眼。"],
    codeExamples: [
      code({
        title: "最小 C 程序",
        kind: "c",
        code: `
#include <stdio.h>

int main(void) {
    printf("Hello C\\n");
    return 0;
}`,
        solves: "这段代码只做一件事：在屏幕上输出一行文字。",
        lineByLine: [
          "#include <stdio.h>：引入 printf 所在的标准输入输出库。",
          "int main(void)：程序从 main 开始执行。",
          'printf("Hello C\\n");：把文字输出到屏幕，\\n 表示换行。',
          "return 0;：表示程序正常结束。",
        ],
        symbols: ["; 表示一条语句结束。", "{} 把一组代码包起来。", "\\n 表示换到下一行。"],
      }),
    ],
    exercises: [
      ex({
        id: "d1-e1",
        title: "输出 Hello C",
        prompt: "写一个程序，在屏幕上输出 Hello C。",
        explanation: "这道题只是在练最小程序结构和 printf，不需要输入。",
        inputExample: "无输入",
        outputExample: "Hello C",
        keyPoint: "main + printf + return 0",
        hint: "先把 Day 1 的最小程序抄一遍，再只改双引号里的文字。",
        detailedHint: "保留 #include、main、return 0，只把 printf 中的内容改成 Hello C。",
        pseudocode: ["引入 stdio.h", "进入 main", "输出 Hello C", "正常结束"],
        referenceCode: `
#include <stdio.h>

int main(void) {
    printf("Hello C\\n");
    return 0;
}`,
        codeNote: "先完整敲一遍。初学时亲手输入比复制更有用。",
        checklist: cChecklist,
        commonMistakes: ["漏写分号", "把 printf 写成 print", "忘记双引号"],
        variation: "把 Hello C 改成自己的名字。",
      }),
      ex({
        id: "d1-e2",
        title: "输出自己的学习目标",
        prompt: "输出一句你自己的学习目标。",
        explanation: "练习只改字符串内容，先把最基础的输出写熟。",
        inputExample: "无输入",
        outputExample: "I want to learn STM32.",
        keyPoint: "字符串要放在双引号里",
        hint: "把想输出的话放进 printf 的双引号中。",
        detailedHint: '例如 printf("I want to learn STM32.\\n");',
        pseudocode: ["进入 main", "输出一句目标", "结束程序"],
        referenceCode: `
int main(void) {
    printf("I want to learn STM32.\\n");
    return 0;
}`,
        codeNote: "中文也能输出，但先用英文更容易避开编码问题。",
        checklist: cChecklist,
        commonMistakes: ["忘记双引号", "把中文引号当成英文引号"],
        variation: "再输出一句今天要完成什么。",
      }),
      ex({
        id: "d1-e3",
        title: "输出三行不同内容",
        prompt: "连续输出三行文字。",
        explanation: "练习多次调用 printf，并观察 \\n 的作用。",
        inputExample: "无输入",
        outputExample: "Line 1\nLine 2\nLine 3",
        keyPoint: "\\n 换行",
        hint: "可以写三句 printf。",
        detailedHint: "每句 printf 的末尾都加 \\n，这样会分成三行。",
        pseudocode: ["输出第一行", "输出第二行", "输出第三行"],
        referenceCode: `
printf("Line 1\\n");
printf("Line 2\\n");
printf("Line 3\\n");`,
        codeNote: "多个 printf 会按顺序执行。",
        checklist: cChecklist,
        commonMistakes: ["忘记 \\n 导致挤成一行"],
        variation: "改成输出今天的 3 个学习关键词。",
      }),
    ],
    selfTest: ["程序从哪里开始执行？", "printf 是做什么的？", "return 0 表示什么？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 2,
    title: "变量和数据类型",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "知道变量就是给数据起名字，并能保存不同类型的值。",
    difficulty: "入门",
    objectives: ["认识 int、float、char", "会定义变量", "会赋值并再次修改"],
    coreTakeaways: ["变量是带名字的数据盒子", "类型决定盒子能装什么", "赋值会改变变量当前保存的值"],
    concepts: ["int", "float", "char", "变量定义", "变量赋值"],
    beginnerMisunderstandings: ["变量不是数学里的未知数，它更像一个可改内容的盒子。", "char 保存一个字符时要用单引号。"],
    comparison51: ["以后保存按键状态、温度值、LED 状态，本质都是用变量。"],
    stm32Implementation: ["STM32 中保存传感器值也常用 int 或 float，保存状态常用 int。"],
    cubemxTips: ["今天还不用 CubeMX。先把变量这个最基础的工具找回来。"],
    codeExamples: [
      code({
        title: "定义并输出变量",
        kind: "c",
        code: `
int age = 18;
float temperature = 26.5f;
char grade = 'A';
printf("%d %.1f %c\\n", age, temperature, grade);`,
        solves: "把年龄、温度、等级分别保存起来，再一起输出。",
        lineByLine: [
          "int age = 18;：定义整数变量 age。",
          "float temperature = 26.5f;：定义带小数的温度。",
          "char grade = 'A';：定义单个字符。",
          "%d、%.1f、%c 分别对应 int、float、char。",
        ],
        symbols: ["= 表示赋值，不是数学里的相等判断。", "单引号用于 char，双引号用于字符串。"],
      }),
    ],
    exercises: [
      ex({
        id: "d2-e1",
        title: "定义年龄、温度、成绩变量",
        prompt: "定义 age、temperature、score 三个变量。",
        explanation: "先不追求输入，只练会给不同数据选类型。",
        inputExample: "无输入",
        outputExample: "可以暂时不输出",
        keyPoint: "整数用 int，小数用 float",
        hint: "年龄和成绩可以先用 int，温度用 float。",
        detailedHint: "例如 int age = 18; float temperature = 25.5f;",
        pseudocode: ["定义 age", "定义 temperature", "定义 score"],
        referenceCode: `
int age = 18;
float temperature = 25.5f;
int score = 90;`,
        codeNote: "先理解类型，再考虑怎么输入。",
        checklist: cChecklist,
        commonMistakes: ["小数变量误写成 int", "变量名里有空格"],
        variation: "再加一个 char grade。",
      }),
      ex({
        id: "d2-e2",
        title: "输出变量值",
        prompt: "把刚才的变量通过 printf 输出。",
        explanation: "练习格式符和变量顺序一一对应。",
        inputExample: "无输入",
        outputExample: "age=18 temperature=25.5 score=90",
        keyPoint: "%d 对应 int，%.1f 对应 float",
        hint: "printf 中先写文字，再把变量放到后面。",
        detailedHint: '例如 printf("age=%d\\n", age);',
        pseudocode: ["准备变量", "按顺序输出变量"],
        referenceCode: `
printf("age=%d temperature=%.1f score=%d\\n",
       age, temperature, score);`,
        codeNote: "如果格式符和变量类型不匹配，输出可能会乱。",
        checklist: cChecklist,
        commonMistakes: ["格式符数量和变量数量不一致"],
        variation: "把每个变量分三行输出。",
      }),
      ex({
        id: "d2-e3",
        title: "修改变量值后再次输出",
        prompt: "先输出一次变量，再把 score 改成 95，重新输出。",
        explanation: "练习变量的值可以被更新。",
        inputExample: "无输入",
        outputExample: "score=90\nscore=95",
        keyPoint: "赋值会覆盖旧值",
        hint: "第二次直接写 score = 95;",
        detailedHint: "先 printf 一次，再重新赋值，再 printf 一次。",
        pseudocode: ["定义 score=90", "输出 score", "改成 95", "再次输出"],
        referenceCode: `
int score = 90;
printf("score=%d\\n", score);
score = 95;
printf("score=%d\\n", score);`,
        codeNote: "变量名不变，里面保存的值变了。",
        checklist: cChecklist,
        commonMistakes: ["把 == 当成赋值使用"],
        variation: "再修改 temperature。",
      }),
    ],
    selfTest: ["int 和 float 有什么区别？", "char 用什么引号？", "= 在 C 里表示什么？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 3,
    title: "printf 和 scanf",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "分清输出和输入，并真正理解 scanf 为什么常常要写 &。",
    difficulty: "入门",
    objectives: ["知道 printf 是输出", "知道 scanf 是输入", "理解 & 是取地址，不是装饰"],
    coreTakeaways: ["printf 把内容显示出来", "scanf 把用户输入放进变量", "scanf 需要地址，所以普通变量前常写 &"],
    concepts: ["printf", "scanf", "& 取地址", "输入", "输出"],
    beginnerMisunderstandings: [
      "scanf 的 & 不是装饰，而是在告诉程序把输入放到哪个地址。",
      "a 是变量里的值，&a 才是变量所在的位置。",
    ],
    comparison51: ["以后读按键或串口，本质也是把外部信息读进变量。"],
    stm32Implementation: ["STM32 中常见的 &huart1 也表示把某个对象的地址传给函数。"],
    cubemxTips: ["今天不用 CubeMX。先把 scanf 的 & 补牢。"],
    codeExamples: [
      code({
        title: "scanf 正确与错误对比",
        kind: "c",
        code: `
int a = 0;
scanf("%d", a);   /* 错误 */
scanf("%d", &a);  /* 正确 */`,
        solves: "专门说明为什么普通变量输入时需要写 &。",
        lineByLine: [
          "int a = 0;：先准备一个变量。",
          'scanf("%d", a);：错误，因为这里给的是 a 的值，不是位置。',
          'scanf("%d", &a);：正确，&a 表示 a 的地址。',
        ],
        symbols: ["& 表示取地址。", "%d 表示按整数格式读写。", "/* ... */ 是注释。"],
      }),
    ],
    exercises: [
      ex({
        id: "d3-e1",
        title: "输入一个整数并输出",
        prompt: "让用户输入一个整数，再把它原样输出。",
        explanation: "题目的重点不是计算，而是建立“用户输入 -> scanf -> 变量 -> printf 输出”的通路。",
        inputExample: "7",
        outputExample: "you entered 7",
        keyPoint: "scanf 读取普通变量时要传地址",
        hint: "先定义 int a = 0;。",
        detailedHint: '输入时写 scanf("%d", &a);，输出时写 printf("%d", a);。',
        pseudocode: ["定义整数 a", "读取用户输入到 a", "输出 a"],
        referenceCode: `
int a = 0;
scanf("%d", &a);
printf("you entered %d\\n", a);`,
        codeNote: "错误写法是 scanf(\"%d\", a);，因为 scanf 不知道该把输入放到哪里。",
        checklist: [...cChecklist, "是否能解释 a 和 &a 的区别"],
        commonMistakes: ["忘记 &", "把 scanf 和 printf 的顺序写反"],
        variation: "把整数改成温度。",
      }),
      ex({
        id: "d3-e2",
        title: "输入温度并判断是否高温",
        prompt: "输入一个温度，超过 35 输出 HOT，否则输出 OK。",
        explanation: "这是第一次把输入和 if 判断接起来。",
        inputExample: "36",
        outputExample: "HOT",
        keyPoint: "输入后的变量可以马上参与判断",
        hint: "先读 temperature，再写 if。",
        detailedHint: "if (temperature > 35) 输出 HOT，否则输出 OK。",
        pseudocode: ["读取 temperature", "如果大于 35", "输出 HOT", "否则输出 OK"],
        referenceCode: `
int temperature = 0;
scanf("%d", &temperature);
if (temperature > 35) {
    printf("HOT\\n");
} else {
    printf("OK\\n");
}`,
        codeNote: "35 这个边界值要自己测试一次。",
        checklist: cChecklist,
        commonMistakes: ["scanf 忘记 &", "把 > 写成 <"],
        variation: "把阈值改成 60，模拟报警温度。",
      }),
      ex({
        id: "d3-e3",
        title: "输入两个数并求和",
        prompt: "输入两个整数，输出它们的和。",
        explanation: "练习一次 scanf 读取多个变量。",
        inputExample: "3 5",
        outputExample: "sum=8",
        keyPoint: "两个普通变量都要写 &",
        hint: "需要 a、b、sum 三个变量。",
        detailedHint: 'scanf("%d %d", &a, &b);',
        pseudocode: ["读取 a 和 b", "计算 sum = a + b", "输出 sum"],
        referenceCode: `
int a = 0;
int b = 0;
scanf("%d %d", &a, &b);
printf("sum=%d\\n", a + b);`,
        codeNote: "如果有两个 %d，就要跟两个变量地址。",
        checklist: cChecklist,
        commonMistakes: ["只给第一个变量写 &", "格式符和变量数量对不上"],
        variation: "改成求差。",
      }),
    ],
    selfTest: ["printf 和 scanf 谁负责输入？", "&a 表示什么？", "为什么 scanf 不能只拿到 a 的值？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 4,
    title: "if / else 判断",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "把“满足条件就做 A，否则做 B”写成代码。",
    difficulty: "入门",
    objectives: ["会写 if", "认识 >、<、==", "会使用 else if 和 else"],
    coreTakeaways: ["判断先写条件", "== 才是比较是否相等", "边界值要自己测"],
    concepts: ["条件判断", "大于小于", "==", "if", "else if", "else"],
    beginnerMisunderstandings: ["= 是赋值，== 才是判断是否相等。", "if 后面不能随手多写一个分号。"],
    comparison51: ["以后判断按键是否按下、温度是否报警，都是 if。"],
    stm32Implementation: ["GPIO 读到的电平也会放进 if 判断里。"],
    cubemxTips: ["今天先不碰外设，只把逻辑判断写稳。"],
    codeExamples: [
      code({
        title: "判断是否及格",
        kind: "c",
        code: `
if (score >= 60) {
    printf("PASS\\n");
} else {
    printf("FAIL\\n");
}`,
        solves: "根据成绩输出两种结果。",
        lineByLine: ["score >= 60：条件。", "条件为真时执行第一组代码。", "否则执行 else 里的代码。"],
        symbols: [">= 表示大于等于。", "== 表示相等判断。", "{} 表示一个代码块。"],
      }),
    ],
    exercises: [
      ex({
        id: "d4-e1",
        title: "判断成绩是否及格",
        prompt: "输入成绩，60 分及以上输出 PASS，否则输出 FAIL。",
        explanation: "练习最基础的二选一判断。",
        inputExample: "75",
        outputExample: "PASS",
        keyPoint: "边界 60 要算及格",
        hint: "先读 score，再判断 score >= 60。",
        detailedHint: "注意这里要用 >=，不是 >。",
        pseudocode: ["读取 score", "如果 score >= 60 输出 PASS", "否则输出 FAIL"],
        referenceCode: `
int score = 0;
scanf("%d", &score);
if (score >= 60) {
    printf("PASS\\n");
} else {
    printf("FAIL\\n");
}`,
        codeNote: "请手动测试 59、60、61。",
        checklist: cChecklist,
        commonMistakes: ["把 >= 写成 >", "if 后面多写 ;"],
        variation: "加入 90 分以上输出 EXCELLENT。",
      }),
      ex({
        id: "d4-e2",
        title: "判断温度是否报警",
        prompt: "输入温度，超过 60 输出 ALARM，否则输出 OK。",
        explanation: "把生活里的阈值变成程序里的条件。",
        inputExample: "61",
        outputExample: "ALARM",
        keyPoint: "超过 60 是 > 60，不是 >= 60",
        hint: "先想清楚 60 本身算不算报警。",
        detailedHint: "题目说“超过”，所以 60 不报警，61 才报警。",
        pseudocode: ["读取温度", "如果温度 > 60 输出 ALARM", "否则输出 OK"],
        referenceCode: `
if (temperature > 60) {
    printf("ALARM\\n");
} else {
    printf("OK\\n");
}`,
        codeNote: "读题时要区分“超过”和“达到”。",
        checklist: cChecklist,
        commonMistakes: ["没看清边界"],
        variation: "把温度改成电压。",
      }),
      ex({
        id: "d4-e3",
        title: "判断两个数哪个大",
        prompt: "输入 a 和 b，输出较大的那个。",
        explanation: "练习比较两个变量。",
        inputExample: "3 8",
        outputExample: "8",
        keyPoint: "比较后输出对应变量",
        hint: "如果 a > b 输出 a，否则输出 b。",
        detailedHint: "相等时输出哪一个都可以，后面可以再扩展 EQUAL。",
        pseudocode: ["读取 a 和 b", "比较 a > b", "输出较大值"],
        referenceCode: `
if (a > b) {
    printf("%d\\n", a);
} else {
    printf("%d\\n", b);
}`,
        codeNote: "先把简单版本写对，再考虑相等情况。",
        checklist: cChecklist,
        commonMistakes: ["比较方向写反"],
        variation: "相等时输出 EQUAL。",
      }),
    ],
    selfTest: ["= 和 == 有什么区别？", "“超过 60”应该写 > 60 还是 >= 60？", "边界值为什么要测试？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 5,
    title: "for 循环",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "当一件事要重复很多次时，不再手写很多遍。",
    difficulty: "入门",
    objectives: ["知道为什么需要循环", "看懂 for 的三个部分", "会写固定次数重复"],
    coreTakeaways: ["for 适合次数明确的重复", "循环变量会变化", "边界条件决定循环次数"],
    concepts: ["为什么需要循环", "for 三部分", "循环变量", "死循环"],
    beginnerMisunderstandings: ["for 不是魔法，它只是把“重复”写得更短。", "少写更新语句可能造成死循环。"],
    comparison51: ["LED 闪烁 5 次，比起写 10 行代码，用循环更自然。"],
    stm32Implementation: ["以后也会在循环里反复读取按键或处理采样。"],
    cubemxTips: ["今天仍然先练纯 C。"],
    codeExamples: [
      code({
        title: "输出 1 到 3",
        kind: "c",
        code: `
for (int i = 1; i <= 3; i++) {
    printf("%d\\n", i);
}`,
        solves: "让程序重复输出三个数字。",
        lineByLine: ["int i = 1：从 1 开始。", "i <= 3：只要没超过 3 就继续。", "i++：每次执行后让 i 加 1。"],
        symbols: ["++ 表示加 1。", "<= 表示小于等于。"],
      }),
    ],
    exercises: [
      ex({
        id: "d5-e1",
        title: "输出 1 到 10",
        prompt: "用 for 循环输出 1 到 10。",
        explanation: "练固定次数循环最经典的一题。",
        inputExample: "无输入",
        outputExample: "1\n2\n...\n10",
        keyPoint: "循环初值、条件、更新",
        hint: "从 i = 1 开始。",
        detailedHint: "条件写 i <= 10，更新写 i++。",
        pseudocode: ["让 i 从 1 开始", "只要 i <= 10 就输出 i", "每轮 i 加 1"],
        referenceCode: `
for (int i = 1; i <= 10; i++) {
    printf("%d\\n", i);
}`,
        codeNote: "请数一数到底输出了几次。",
        checklist: cChecklist,
        commonMistakes: ["写成 i < 10 少输出一次", "忘记 i++"],
        variation: "输出 10 到 1。",
      }),
      ex({
        id: "d5-e2",
        title: "求 1 到 100 的和",
        prompt: "把 1 到 100 累加起来。",
        explanation: "循环负责重复，sum 负责保存累计结果。",
        inputExample: "无输入",
        outputExample: "5050",
        keyPoint: "累加器 sum",
        hint: "先写 int sum = 0;。",
        detailedHint: "每轮执行 sum = sum + i;。",
        pseudocode: ["sum 从 0 开始", "i 从 1 到 100", "每轮把 i 加到 sum", "输出 sum"],
        referenceCode: `
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
printf("%d\\n", sum);`,
        codeNote: "+= 表示在原值基础上继续加。",
        checklist: cChecklist,
        commonMistakes: ["sum 没初始化", "循环边界写错"],
        variation: "求 1 到 10 的和，先手算再验证。",
      }),
      ex({
        id: "d5-e3",
        title: "模拟 LED 闪烁 5 次",
        prompt: "输出 LED ON / LED OFF，重复 5 次。",
        explanation: "电脑上先用文字模拟，后面到单片机上再换成真正的引脚控制。",
        inputExample: "无输入",
        outputExample: "LED ON\nLED OFF\n...",
        keyPoint: "一轮循环里可以有多句代码",
        hint: "循环 5 次，每次输出两行。",
        detailedHint: "for 外层控制次数，printf 负责模拟灯亮和灯灭。",
        pseudocode: ["循环 5 次", "输出 LED ON", "输出 LED OFF"],
        referenceCode: `
for (int i = 0; i < 5; i++) {
    printf("LED ON\\n");
    printf("LED OFF\\n");
}`,
        codeNote: "后面 GPIO 输出时，这两行会换成控制引脚。",
        checklist: cChecklist,
        commonMistakes: ["不清楚一轮循环里执行几句"],
        variation: "给每次闪烁加上编号。",
      }),
    ],
    selfTest: ["for 的三个部分分别是什么？", "为什么 sum 要先等于 0？", "死循环常见原因是什么？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 6,
    title: "while 循环",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "理解“条件满足就一直执行”，为单片机主循环做准备。",
    difficulty: "入门",
    objectives: ["区分 while 和 for", "理解 while(1)", "写简单菜单循环"],
    coreTakeaways: ["while 适合次数不一定明确的重复", "while(1) 表示一直运行", "单片机常常就应该一直运行"],
    concepts: ["while", "条件循环", "while(1)", "菜单循环"],
    beginnerMisunderstandings: ["while(1) 不是程序卡死，而是单片机持续工作的主循环。", "如果条件永远不变，循环就可能停不下来。"],
    comparison51: ["单片机不像普通脚本跑完就退出，它往往要一直看着外界。"],
    stm32Implementation: ["STM32 的 main 中也会有 while(1)。"],
    cubemxTips: ["今天先把主循环思维建立起来。"],
    codeExamples: [
      code({
        title: "while 输出 1 到 3",
        kind: "c",
        code: `
int i = 1;
while (i <= 3) {
    printf("%d\\n", i);
    i++;
}`,
        solves: "和 for 做同一件事，但把初始化、条件、更新拆开写。",
        lineByLine: ["先准备 i。", "条件满足时执行循环体。", "最后 i++，让循环有机会结束。"],
        symbols: ["while 后面的小括号里是条件。"],
      }),
    ],
    exercises: [
      ex({
        id: "d6-e1",
        title: "用 while 输出 1 到 10",
        prompt: "不用 for，只用 while 输出 1 到 10。",
        explanation: "帮助你看到 while 和 for 只是写法不同，逻辑并不神秘。",
        inputExample: "无输入",
        outputExample: "1 到 10",
        keyPoint: "更新变量不能漏",
        hint: "先定义 i = 1。",
        detailedHint: "循环里输出后别忘了 i++。",
        pseudocode: ["i = 1", "当 i <= 10 时输出 i", "i 加 1"],
        referenceCode: `
int i = 1;
while (i <= 10) {
    printf("%d\\n", i);
    i++;
}`,
        codeNote: "忘记 i++ 会让程序一直输出 1。",
        checklist: cChecklist,
        commonMistakes: ["忘记更新 i"],
        variation: "改成输出偶数。",
      }),
      ex({
        id: "d6-e2",
        title: "模拟 while(1) 主循环",
        prompt: "用文字模拟一个会持续运行的主循环。",
        explanation: "单片机后面就靠这种主循环不断检测输入。",
        inputExample: "无输入",
        outputExample: "checking...\nchecking...\n...",
        keyPoint: "持续运行",
        hint: "写 while (1)。",
        detailedHint: "为了不真的刷屏太快，可以先只看懂结构。",
        pseudocode: ["永远循环", "每轮输出 checking"],
        referenceCode: `
while (1) {
    printf("checking...\\n");
}`,
        codeNote: "在电脑上这会一直运行；在单片机里，这是正常工作方式。",
        checklist: logicChecklist,
        commonMistakes: ["把 while(1) 当成错误"],
        variation: "把 checking 改成 read key。",
      }),
      ex({
        id: "d6-e3",
        title: "菜单循环程序",
        prompt: "输入 0 才退出，否则一直显示 menu。",
        explanation: "这是 while 适合“次数不确定”场景的例子。",
        inputExample: "1\n2\n0",
        outputExample: "menu 会显示多次，直到输入 0",
        keyPoint: "循环条件来自变量",
        hint: "准备 choice 变量。",
        detailedHint: "当 choice != 0 时继续循环。",
        pseudocode: ["choice 初始为 1", "当 choice 不是 0", "显示 menu", "读取 choice"],
        referenceCode: `
int choice = 1;
while (choice != 0) {
    printf("menu\\n");
    scanf("%d", &choice);
}`,
        codeNote: "这个例子已经很接近真实的人机交互。",
        checklist: cChecklist,
        commonMistakes: ["忘记读取新的 choice"],
        variation: "输入 1 输出 LED ON，输入 2 输出 LED OFF。",
      }),
    ],
    selfTest: ["for 和 while 的区别是什么？", "while(1) 为什么不是错误？", "循环条件不更新会怎样？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 7,
    title: "数组入门",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "用一个名字保存一组同类型数据。",
    objectives: ["理解为什么需要数组", "知道下标从 0 开始", "把数组和传感器数据联系起来"],
    coreTakeaways: ["数组适合存一组数据", "第一个元素下标是 0", "越界会访问不该访问的地方"],
    concepts: ["数组", "数组下标", "越界", "传感器数据"],
    beginnerMisunderstandings: ["长度为 5 的数组，合法下标是 0 到 4，不是 1 到 5。", "数组不是 5 个不同变量名，而是一组连续位置。"],
    comparison51: ["多次温度采样、多个按键状态，都可以用数组保存。"],
    stm32Implementation: ["ADC 多次采样后求平均值，最常见的起点就是数组。"],
    cubemxTips: ["今天仍然不碰 CubeMX，先把数组弄清。"],
    codeExamples: [
      code({
        title: "保存 3 个温度",
        kind: "c",
        code: `
int temperatures[3] = {25, 26, 27};
printf("%d\\n", temperatures[0]);`,
        solves: "用一个数组保存多次温度。",
        lineByLine: ["[3] 表示有 3 个位置。", "{25, 26, 27} 是初始值。", "temperatures[0] 是第一个元素。"],
        symbols: ["[] 用于数组下标。", "{} 也可用于数组初始化。"],
      }),
    ],
    exercises: [
      ex({
        id: "d7-e1",
        title: "保存 5 个成绩",
        prompt: "定义一个数组，保存 5 个成绩。",
        explanation: "先练数组定义，不急着输入。",
        inputExample: "无输入",
        outputExample: "可以暂时不输出",
        keyPoint: "数组长度写在 [] 里",
        hint: "可以写 int scores[5]。",
        detailedHint: "初始化时可以写 {90, 85, 88, 92, 76}。",
        pseudocode: ["定义一个长度为 5 的 int 数组"],
        referenceCode: `
int scores[5] = {90, 85, 88, 92, 76};`,
        codeNote: "这 5 个数依次对应下标 0 到 4。",
        checklist: cChecklist,
        commonMistakes: ["误以为第一个下标是 1"],
        variation: "输出第一个和最后一个成绩。",
      }),
      ex({
        id: "d7-e2",
        title: "保存 5 个温度",
        prompt: "定义 5 个温度值，并逐个输出。",
        explanation: "数组经常要配合循环一起使用。",
        inputExample: "无输入",
        outputExample: "25\n26\n27\n28\n29",
        keyPoint: "数组 + for",
        hint: "循环下标从 0 开始。",
        detailedHint: "条件写 i < 5，不要写 i <= 5。",
        pseudocode: ["定义 temperatures 数组", "i 从 0 到 4", "输出 temperatures[i]"],
        referenceCode: `
int temperatures[5] = {25, 26, 27, 28, 29};
for (int i = 0; i < 5; i++) {
    printf("%d\\n", temperatures[i]);
}`,
        codeNote: "i < 5 才不会越界。",
        checklist: cChecklist,
        commonMistakes: ["写成 i <= 5"],
        variation: "改成输入 5 个温度。",
      }),
      ex({
        id: "d7-e3",
        title: "求温度平均值",
        prompt: "把 5 个温度加起来，再求平均值。",
        explanation: "这是后面 ADC 平均滤波的雏形。",
        inputExample: "25 26 27 28 29",
        outputExample: "27.0",
        keyPoint: "循环累加后再除",
        hint: "先准备 sum = 0。",
        detailedHint: "平均值可以用 sum / 5.0。",
        pseudocode: ["sum = 0", "遍历数组并累加", "用 sum / 5.0 求平均"],
        referenceCode: `
int temperatures[5] = {25, 26, 27, 28, 29};
int sum = 0;
for (int i = 0; i < 5; i++) {
    sum += temperatures[i];
}
printf("%.1f\\n", sum / 5.0);`,
        codeNote: "除以 5.0 能保留小数。",
        checklist: cChecklist,
        commonMistakes: ["整数除法丢掉小数"],
        variation: "改成 10 次 ADC 数据平均。",
      }),
    ],
    selfTest: ["长度为 5 的数组最后一个下标是多少？", "数组越界是什么意思？", "数组为什么适合传感器数据？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 8,
    title: "函数入门",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "把一段重复逻辑起名字，之后直接调用。",
    objectives: ["理解为什么写函数", "会看懂函数定义和调用", "知道参数和返回值"],
    coreTakeaways: ["函数是有名字的一段动作", "参数是送进去的数据", "返回值是拿回来的结果"],
    concepts: ["函数定义", "函数调用", "参数", "返回值"],
    beginnerMisunderstandings: ["函数不是为了让代码变难，而是为了少重复。", "定义函数和调用函数不是同一件事。"],
    comparison51: ["以后 LED_On、LED_Off、ReadKey 都可以做成函数。"],
    stm32Implementation: ["HAL 库本身就是别人写好供你调用的一组函数。"],
    cubemxTips: ["今天先会写小函数，后面 STM32 才不会全塞进 main。"],
    codeExamples: [
      code({
        title: "add 函数",
        kind: "c",
        code: `
int add(int a, int b) {
    return a + b;
}

int result = add(2, 3);`,
        solves: "把求和动作封装起来。",
        lineByLine: ["int add(...)：定义函数。", "a、b 是参数。", "return a + b：返回结果。", "add(2, 3)：调用函数。"],
        symbols: ["() 用于参数列表。", "return 把结果交回去。"],
      }),
    ],
    exercises: [
      ex({
        id: "d8-e1",
        title: "写 add 函数",
        prompt: "写一个函数，返回两个整数之和。",
        explanation: "这是最基础的“输入参数 -> 返回结果”。",
        inputExample: "add(2, 3)",
        outputExample: "5",
        keyPoint: "参数和返回值",
        hint: "函数名叫 add，返回类型 int。",
        detailedHint: "函数体里只需要 return a + b;",
        pseudocode: ["接收 a 和 b", "返回 a + b"],
        referenceCode: `
int add(int a, int b) {
    return a + b;
}`,
        codeNote: "先写小函数，能减少后面主程序的混乱。",
        checklist: cChecklist,
        commonMistakes: ["忘记 return"],
        variation: "写一个 sub 函数。",
      }),
      ex({
        id: "d8-e2",
        title: "写 getMax 函数",
        prompt: "返回两个数中较大的一个。",
        explanation: "把 if 判断封装到函数里。",
        inputExample: "getMax(3, 8)",
        outputExample: "8",
        keyPoint: "函数里也能写 if",
        hint: "先比较 a > b。",
        detailedHint: "如果 a 大就 return a，否则 return b。",
        pseudocode: ["比较 a 和 b", "返回较大值"],
        referenceCode: `
int getMax(int a, int b) {
    if (a > b) return a;
    return b;
}`,
        codeNote: "一旦函数写好，以后可以多次调用。",
        checklist: cChecklist,
        commonMistakes: ["只在一个分支里 return"],
        variation: "写 getMin。",
      }),
      ex({
        id: "d8-e3",
        title: "写 checkAlarm 函数",
        prompt: "温度超过阈值返回 1，否则返回 0。",
        explanation: "后面报警项目会直接用到这种函数。",
        inputExample: "checkAlarm(65, 60)",
        outputExample: "1",
        keyPoint: "用 1 / 0 表示真假",
        hint: "比较 value > threshold。",
        detailedHint: "可以直接 return value > threshold;",
        pseudocode: ["接收 value 和 threshold", "如果超过阈值返回 1", "否则返回 0"],
        referenceCode: `
int checkAlarm(int value, int threshold) {
    return value > threshold;
}`,
        codeNote: "C 中真值常用 1，假值常用 0。",
        checklist: cChecklist,
        commonMistakes: ["忘记阈值参数"],
        variation: "加入低于下限也报警。",
      }),
    ],
    selfTest: ["定义函数和调用函数有什么区别？", "参数是什么？", "返回值是什么？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 9,
    title: "地址和指针最基础",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "不求深入，只求看懂最常见的地址和指针写法。",
    objectives: ["知道变量在内存里有位置", "理解 & 和 *", "看懂 scanf 与 HAL 中常见传地址"],
    coreTakeaways: ["变量既有值，也有地址", "& 取地址", "* 通过地址访问数据"],
    concepts: ["地址", "指针变量", "&", "*", "scanf(\"%d\", &a)", "&huart1"],
    beginnerMisunderstandings: ["指针不是玄学，它只是保存地址的变量。", "&a 和 a 不是同一个东西。"],
    comparison51: ["以后外设句柄也要按地址传给 HAL 函数。"],
    stm32Implementation: ["HAL_UART_Transmit(&huart1, ...) 里的 &huart1 就是传地址。"],
    cubemxTips: ["今天还不碰真实外设，只建立认知。"],
    codeExamples: [
      code({
        title: "地址与指针",
        kind: "c",
        code: `
int a = 10;
int *p = &a;
*p = 20;`,
        solves: "展示值、地址、指针三者关系。",
        lineByLine: ["a 保存值 10。", "p 保存 a 的地址。", "*p 代表通过这个地址找到的数据，所以会把 a 改成 20。"],
        symbols: ["& 取地址。", "* 在声明里表示指针，在使用时表示取出地址中的值。"],
      }),
    ],
    exercises: [
      ex({
        id: "d9-e1",
        title: "输出变量地址",
        prompt: "输出变量 a 的地址。",
        explanation: "先看到“变量有位置”这件事。",
        inputExample: "无输入",
        outputExample: "每台电脑显示的地址都可能不同",
        keyPoint: "&a 是地址",
        hint: "格式符可以用 %p。",
        detailedHint: "输出地址时常把 &a 转成 void *。",
        pseudocode: ["定义 a", "输出 &a"],
        referenceCode: `
int a = 10;
printf("%p\\n", (void *)&a);`,
        codeNote: "地址每次运行可能不同，这很正常。",
        checklist: cChecklist,
        commonMistakes: ["想把地址当普通整数死记"],
        variation: "同时输出 a 的值。",
      }),
      ex({
        id: "d9-e2",
        title: "用指针修改变量",
        prompt: "让 p 指向 a，再通过 *p 把 a 改成 20。",
        explanation: "这是看懂指针最关键的一步。",
        inputExample: "无输入",
        outputExample: "20",
        keyPoint: "*p 能访问 p 指向的数据",
        hint: "先写 int *p = &a;",
        detailedHint: "再写 *p = 20;，最后输出 a。",
        pseudocode: ["定义 a", "p 保存 a 的地址", "通过 *p 修改值", "输出 a"],
        referenceCode: `
int a = 10;
int *p = &a;
*p = 20;
printf("%d\\n", a);`,
        codeNote: "a 变了，是因为 *p 操作的就是 a 那个位置里的数据。",
        checklist: cChecklist,
        commonMistakes: ["未初始化指针就使用"],
        variation: "把 20 改成 99。",
      }),
      ex({
        id: "d9-e3",
        title: "解释 &a 和 a 的区别",
        prompt: "用一句话解释 a 与 &a。",
        explanation: "这道题不写代码，练口头解释。",
        inputExample: "无输入",
        outputExample: "a 是值，&a 是地址",
        keyPoint: "值和地址分开",
        hint: "想象 a 是盒子里的内容，&a 是盒子的门牌号。",
        detailedHint: "scanf 需要的是门牌号，才能把新数据放进去。",
        pseudocode: ["a -> 值", "&a -> 地址"],
        referenceCode: `
/* a 是变量保存的值，&a 是变量所在的地址。 */`,
        codeNote: "把这个说顺，scanf 的 & 就不再靠死记。",
        checklist: logicChecklist,
        commonMistakes: ["把 & 当成装饰符"],
        variation: "再解释 &huart1。",
      }),
    ],
    selfTest: ["a 和 &a 有什么区别？", "指针变量保存的是什么？", "为什么 scanf 需要地址？"],
    commonErrors: cCommonErrors,
  }),
  lesson({
    day: 10,
    title: "结构体入门",
    phase: "阶段 1：C 语言重新入门",
    phaseId: "c",
    goal: "把一组相关数据打包，理解 HAL 为什么大量使用结构体。",
    objectives: ["知道结构体解决什么问题", "会定义简单结构体", "看懂 HAL 句柄本质"],
    coreTakeaways: ["结构体把相关数据放一起", "成员用 . 访问", "HAL 句柄本质也是结构体"],
    concepts: ["结构体", "打包多个数据", "Student", "SensorData", "UART_HandleTypeDef", "GPIO_InitTypeDef"],
    beginnerMisunderstandings: ["结构体不是高级魔法，只是多个字段打包。", "UART_HandleTypeDef 看起来长，本质还是一个结构体类型。"],
    comparison51: ["如果项目里状态越来越多，结构体比一堆散变量更好管。"],
    stm32Implementation: ["HAL 中的 UART_HandleTypeDef、GPIO_InitTypeDef 都在保存配置和状态。"],
    cubemxTips: ["后面看到 Init 结构体别害怕，先把它理解成配置表。"],
    codeExamples: [
      code({
        title: "Student 结构体",
        kind: "c",
        code: `
typedef struct {
    int age;
    int score;
} Student;

Student s = {18, 95};`,
        solves: "把一个学生的多个信息放进同一个变量。",
        lineByLine: ["struct 开始定义一组字段。", "age 和 score 是成员。", "Student s 表示定义一个 Student 变量。"],
        symbols: [". 用来访问结构体成员。", "{} 也用于结构体初始化。"],
      }),
    ],
    exercises: [
      ex({
        id: "d10-e1",
        title: "定义 Student 结构体",
        prompt: "包含 age 和 score 两个成员。",
        explanation: "先练结构体最基本的定义。",
        inputExample: "无输入",
        outputExample: "可以暂时不输出",
        keyPoint: "多个字段打包",
        hint: "用 typedef struct。",
        detailedHint: "结构体定义最后别忘记分号。",
        pseudocode: ["定义 age 成员", "定义 score 成员", "给结构体起名 Student"],
        referenceCode: `
typedef struct {
    int age;
    int score;
} Student;`,
        codeNote: "结构体定义结束后也需要分号。",
        checklist: cChecklist,
        commonMistakes: ["末尾忘记 ;"],
        variation: "加入 char grade。",
      }),
      ex({
        id: "d10-e2",
        title: "定义 SensorData 结构体",
        prompt: "保存 temperature、voltage、alarm。",
        explanation: "这就是后面项目状态的雏形。",
        inputExample: "无输入",
        outputExample: "可以暂时不输出",
        keyPoint: "把相关状态放在一起",
        hint: "温度、电压可以用 float，报警用 int。",
        detailedHint: "字段名最好一眼能看懂。",
        pseudocode: ["定义 temperature", "定义 voltage", "定义 alarm"],
        referenceCode: `
typedef struct {
    float temperature;
    float voltage;
    int alarm;
} SensorData;`,
        codeNote: "一个结构体就像一个小数据包。",
        checklist: cChecklist,
        commonMistakes: ["成员名含义不清"],
        variation: "定义一个变量并赋初值。",
      }),
      ex({
        id: "d10-e3",
        title: "定义 LedState 结构体",
        prompt: "保存 LED 是否亮、闪烁次数。",
        explanation: "让你看到结构体也适合保存状态。",
        inputExample: "无输入",
        outputExample: "可以暂时不输出",
        keyPoint: "状态集中管理",
        hint: "可以用 isOn 和 blinkCount。",
        detailedHint: "名字本身就尽量说明用途。",
        pseudocode: ["定义 isOn", "定义 blinkCount"],
        referenceCode: `
typedef struct {
    int isOn;
    int blinkCount;
} LedState;`,
        codeNote: "后面项目里状态一多，结构体会越来越有用。",
        checklist: cChecklist,
        commonMistakes: ["把相关状态分散到太多独立变量"],
        variation: "尝试输出 led.isOn。",
      }),
    ],
    selfTest: ["结构体解决什么问题？", "访问成员常用什么符号？", "HAL 句柄为什么常是结构体？"],
    commonErrors: cCommonErrors,
  }),
];

const foundationLessons: Lesson[] = [
  lesson({
    day: 11,
    title: "什么是单片机",
    phase: "阶段 2：单片机与 GPIO 基础",
    phaseId: "mcu",
    goal: "先知道单片机到底是什么，再谈怎么控制东西。",
    objectives: ["区分单片机和电脑", "认识 CPU、Flash、RAM、外设", "知道它为什么能控制设备"],
    coreTakeaways: ["单片机是一台很小的专用电脑", "程序放在 Flash，运行时会用 RAM", "外设让它能和外界打交道"],
    concepts: ["CPU", "Flash", "RAM", "外设", "单片机"],
    beginnerMisunderstandings: ["单片机不是只能点灯，它也能读取、判断、通信。", "外设不是额外附件，也可以是芯片内部模块。"],
    comparison51: ["51 和 STM32 都是单片机，只是能力和资源不同。"],
    stm32Implementation: ["STM32 里有 GPIO、USART、TIM、ADC 等片上外设。"],
    cubemxTips: ["今天不配置工程，先把地图看清。"],
    codeExamples: [
      code({
        title: "单片机工作流程伪代码",
        kind: "c",
        code: `
while (1) {
    read_input();
    make_decision();
    control_output();
}`,
        solves: "用伪代码表达单片机最常见的工作节奏。",
        lineByLine: ["先读取输入。", "再根据规则判断。", "最后控制输出。"],
        symbols: ["while(1) 表示持续运行。"],
      }),
    ],
    exercises: [
      ex({
        id: "d11-e1",
        title: "用自己的话解释单片机",
        prompt: "写一句话说明单片机是什么。",
        explanation: "先能说人话，再去学术语。",
        inputExample: "无输入",
        outputExample: "单片机是一台能读取输入并控制输出的小电脑。",
        keyPoint: "输入、处理、输出",
        hint: "把 CPU、存储、外设想成一个小系统。",
        detailedHint: "不要只说“一个芯片”，要说它能做什么。",
        pseudocode: ["单片机 = 小电脑", "能读取输入", "能控制输出"],
        referenceCode: `单片机是一台体积很小、能运行程序并控制外设的小电脑。`,
        codeNote: "这是概念题，不需要写 C 代码。",
        checklist: logicChecklist,
        commonMistakes: ["只背定义，不知道用途"],
        variation: "再举两个生活中的例子。",
      }),
    ],
    selfTest: ["Flash 和 RAM 大概有什么区别？", "为什么单片机能控制 LED？", "哪些家电可能有单片机？"],
    commonErrors: mcuCommonErrors,
  }),
  lesson({
    day: 12,
    title: "什么是引脚",
    phase: "阶段 2：单片机与 GPIO 基础",
    phaseId: "mcu",
    goal: "认识芯片和外界连接的“门口”。",
    objectives: ["理解引脚", "认识高低电平", "知道 3.3V、5V、GND"],
    coreTakeaways: ["引脚是芯片和外界连接的位置", "引脚可以输入也可以输出", "GND 是共同参考点"],
    concepts: ["引脚", "输入", "输出", "高电平", "低电平", "3.3V", "5V", "GND"],
    beginnerMisunderstandings: ["高电平不等于永远 5V，STM32 常见是 3.3V。", "GND 不是“没用的线”，它是电路共同参考。"],
    comparison51: ["51 的 P1.0、STM32 的 PA0，本质都对应芯片引脚。"],
    stm32Implementation: ["STM32 会把引脚配置成输入、输出或别的复用功能。"],
    cubemxTips: ["后面 CubeMX 配置的每一个 GPIO，本质都落在具体引脚上。"],
    codeExamples: [
      code({
        title: "电平判断伪代码",
        kind: "c",
        code: `
if (pinLevel == 1) {
    printf("HIGH\\n");
} else {
    printf("LOW\\n");
}`,
        solves: "先用变量模拟引脚读到的电平。",
        lineByLine: ["pinLevel 表示当前电平。", "1 代表高，0 代表低。"],
        symbols: ["== 表示比较。"],
      }),
    ],
    exercises: [
      ex({
        id: "d12-e1",
        title: "判断 LED 亮灭和电平关系",
        prompt: "根据电路描述判断 GPIO 输出高电平时 LED 是否会亮。",
        explanation: "开始把代码和电路关系接起来。",
        inputExample: "LED 正极接 GPIO，负极接 GND",
        outputExample: "GPIO 输出高电平时 LED 亮",
        keyPoint: "电流要形成回路",
        hint: "想想 GPIO 高时，电流能否从 GPIO 流向 GND。",
        detailedHint: "如果 LED 正极在 GPIO 一侧，高电平通常会让它亮。",
        pseudocode: ["看接线方向", "判断是否形成电流", "得出亮灭"],
        referenceCode: `GPIO 高 -> LED 正极高 -> 电流流向 GND -> LED 亮`,
        codeNote: "这是电路逻辑题，不是 C 代码题。",
        checklist: logicChecklist,
        commonMistakes: ["只背高亮低灭，不看接法"],
        variation: "换成 LED 正极接 3.3V、负极接 GPIO。",
      }),
    ],
    selfTest: ["引脚可以做什么？", "GND 的意义是什么？", "STM32 常见 IO 电平是多少伏？"],
    commonErrors: mcuCommonErrors,
  }),
  lesson({
    day: 13,
    title: "GPIO 是什么",
    phase: "阶段 2：单片机与 GPIO 基础",
    phaseId: "mcu",
    goal: "把 GPIO 先理解成“引脚的通用输入输出功能”。",
    objectives: ["知道 GPIO 的全称", "区分输入与输出", "理解它为什么是第一核心知识点"],
    coreTakeaways: ["GPIO 不是一个单独零件", "输出用于控制外界", "输入用于读取外界"],
    concepts: ["General Purpose Input Output", "GPIO 输出", "GPIO 输入", "LED", "按键"],
    beginnerMisunderstandings: ["GPIO 不是一个具体零件，而是单片机引脚的输入输出功能。", "同一个引脚不能同时随意既当输入又当输出。"],
    comparison51: ["51 的端口口线和 STM32 GPIO 思路相通。"],
    stm32Implementation: ["GPIO 输出常控制 LED，GPIO 输入常读取按键。"],
    cubemxTips: ["后面会在 CubeMX 里把某个引脚选成 GPIO_Output 或 GPIO_Input。"],
    codeExamples: [
      code({
        title: "输入到输出的数据方向",
        kind: "c",
        code: `
buttonState = read_button();
ledState = buttonState;`,
        solves: "说明按键是输入，LED 是输出。",
        lineByLine: ["先读按键。", "再把结果用于控制 LED。"],
        symbols: ["= 表示把右边结果保存到左边。"],
      }),
    ],
    exercises: [
      ex({
        id: "d13-e1",
        title: "区分输入和输出",
        prompt: "判断按键、LED、蜂鸣器、温度传感器分别属于输入还是输出。",
        explanation: "先分清数据是进来还是出去。",
        inputExample: "按键、LED、蜂鸣器、温度传感器",
        outputExample: "按键输入，LED 输出，蜂鸣器输出，温度传感器输入",
        keyPoint: "看数据方向",
        hint: "问自己：它是在告诉单片机信息，还是被单片机控制？",
        detailedHint: "告诉单片机的是输入，被单片机控制的是输出。",
        pseudocode: ["逐个判断数据方向"],
        referenceCode: `按键/传感器 -> 输入；LED/蜂鸣器 -> 输出。`,
        codeNote: "这是 GPIO 思维的第一步。",
        checklist: logicChecklist,
        commonMistakes: ["把会发光的东西都叫输入"],
        variation: "加入电机、红外接收头再判断。",
      }),
    ],
    selfTest: ["GPIO 的全称是什么？", "按键是输入还是输出？", "GPIO 为什么是 STM32 入门第一站？"],
    commonErrors: mcuCommonErrors,
  }),
  lesson({
    day: 14,
    title: "LED 点亮的原理",
    phase: "阶段 2：单片机与 GPIO 基础",
    phaseId: "mcu",
    goal: "明白 LED 为什么有时高电平亮，有时低电平亮。",
    objectives: ["认识正负极", "知道限流电阻", "理解低电平点亮"],
    coreTakeaways: ["LED 有方向", "限流电阻保护 LED", "亮不亮取决于接法，不只看高低电平"],
    concepts: ["LED 正负极", "限流电阻", "高电平点亮", "低电平点亮"],
    beginnerMisunderstandings: ["高电平不一定代表 LED 亮，因为有些板子是低电平点亮。", "没有限流电阻可能会损坏 LED 或引脚。"],
    comparison51: ["开发板常把 LED 接成低电平点亮，51 和 STM32 都可能这样。"],
    stm32Implementation: ["写 LED 代码前先确认板子的有效电平。"],
    cubemxTips: ["后面设置默认输出电平时，也要先看清 LED 接法。"],
    codeExamples: [
      code({
        title: "低电平点亮逻辑",
        kind: "c",
        code: `
if (gpioLevel == 0) {
    printf("LED ON\\n");
}`,
        solves: "用变量模拟低电平有效 LED。",
        lineByLine: ["gpioLevel 为 0 表示低电平。", "在低电平有效接法下，0 反而让 LED 亮。"],
        symbols: ["0 / 1 只是电平表示，不直接等于灭 / 亮。"],
      }),
    ],
    exercises: [
      ex({
        id: "d14-e1",
        title: "判断高电平点亮还是低电平点亮",
        prompt: "根据接线描述判断 LED 的有效电平。",
        explanation: "先学会看接法，再写代码。",
        inputExample: "LED 正极接 3.3V，负极接 GPIO",
        outputExample: "GPIO 输出低电平时 LED 亮",
        keyPoint: "看电流方向",
        hint: "当 GPIO 拉低时，电流能从 3.3V 流向 GPIO。",
        detailedHint: "这种接法叫低电平有效。",
        pseudocode: ["看 LED 两端接线", "判断哪种电平形成回路"],
        referenceCode: `正极接 3.3V、负极接 GPIO -> GPIO 拉低时亮。`,
        codeNote: "以后看到板载 LED 不亮，先怀疑有效电平。",
        checklist: logicChecklist,
        commonMistakes: ["只背高亮低灭"],
        variation: "再判断正极接 GPIO、负极接 GND。",
      }),
    ],
    selfTest: ["为什么需要限流电阻？", "低电平点亮是怎么回事？", "高电平一定等于 LED 亮吗？"],
    commonErrors: mcuCommonErrors,
  }),
  lesson({
    day: 15,
    title: "按键输入原理",
    phase: "阶段 2：单片机与 GPIO 基础",
    phaseId: "mcu",
    goal: "知道按键按下和松开时，GPIO 为什么会读到不同电平。",
    objectives: ["理解上拉下拉", "知道按键抖动", "会判断按下时读到 0 还是 1"],
    coreTakeaways: ["上拉让默认值稳定为高", "下拉让默认值稳定为低", "机械按键会抖动"],
    concepts: ["按下和松开", "上拉电阻", "下拉电阻", "消抖"],
    beginnerMisunderstandings: ["没有上拉或下拉，输入可能会飘。", "按一次键，电气上可能会快速抖很多次。"],
    comparison51: ["51 按键常见也是上拉输入、按下接地。"],
    stm32Implementation: ["CubeMX 中会选择 Pull-up、Pull-down 或 No pull。"],
    cubemxTips: ["后面读按键之前，先问清楚按下时到底是 0 还是 1。"],
    codeExamples: [
      code({
        title: "上拉按键逻辑",
        kind: "c",
        code: `
if (buttonLevel == 0) {
    printf("PRESSED\\n");
}`,
        solves: "模拟上拉输入、按下接地的常见情况。",
        lineByLine: ["松开时被上拉到 1。", "按下后接地，读到 0。"],
        symbols: ["0 不一定表示坏，它可能正是按下。"],
      }),
    ],
    exercises: [
      ex({
        id: "d15-e1",
        title: "判断按键按下时读到什么",
        prompt: "上拉输入，按键按下接 GND，按下时 GPIO 读到几？",
        explanation: "这是后面写按键判断前必须先想清楚的事。",
        inputExample: "上拉 + 按下接 GND",
        outputExample: "0",
        keyPoint: "上拉默认高，按下接地变低",
        hint: "想想松开时谁把它拉到高电平。",
        detailedHint: "按下后直接接 GND，所以读到 0。",
        pseudocode: ["默认高", "按下接地", "读到低"],
        referenceCode: `按下时 GPIO 读到 0。`,
        codeNote: "这就是很多按键代码里判断 RESET 的原因。",
        checklist: logicChecklist,
        commonMistakes: ["把默认电平和按下电平混淆"],
        variation: "换成下拉输入再判断。",
      }),
    ],
    selfTest: ["上拉的作用是什么？", "按键为什么要消抖？", "按下读 0 一定是错的吗？"],
    commonErrors: mcuCommonErrors,
  }),
  lesson({
    day: 16,
    title: "单片机程序的主循环思维",
    phase: "阶段 2：单片机与 GPIO 基础",
    phaseId: "mcu",
    goal: "把 while(1) 和“不断检测输入、控制输出”真正连起来。",
    objectives: ["理解主循环", "知道延时和状态变量", "会写简单伪代码"],
    coreTakeaways: ["主循环不断重复", "先读输入再做判断", "状态变量记录当前情况"],
    concepts: ["while(1)", "检测输入", "控制输出", "延时", "状态变量"],
    beginnerMisunderstandings: ["while(1) 不是卡死，而是持续服务。", "状态变量能帮你记住上一次发生了什么。"],
    comparison51: ["很多 51 小程序也是在主循环里读键、点灯、延时。"],
    stm32Implementation: ["STM32 的 main 里也会有这个核心结构。"],
    cubemxTips: ["今天先会写伪代码，后面再换成 HAL 函数。"],
    codeExamples: [
      code({
        title: "主循环伪代码",
        kind: "c",
        code: `
while (1) {
    key = read_key();
    if (key == 1) {
        led_on();
    }
}`,
        solves: "展示单片机不断检测再控制的节奏。",
        lineByLine: ["每轮先读按键。", "再根据按键状态控制 LED。"],
        symbols: ["函数名先当成动作读，不必急着实现。"],
      }),
    ],
    exercises: [
      ex({
        id: "d16-e1",
        title: "写伪代码：按键控制 LED",
        prompt: "不用真实 C 语法也行，写出按键控制 LED 的步骤。",
        explanation: "先把流程想顺，再写代码会轻松很多。",
        inputExample: "按键状态",
        outputExample: "LED 亮或灭",
        keyPoint: "输入 -> 判断 -> 输出",
        hint: "先读按键，再判断，再控制 LED。",
        detailedHint: "按下时亮，松开时灭。",
        pseudocode: ["循环", "读取按键", "如果按下则 LED 亮", "否则 LED 灭"],
        referenceCode: `
while (1) {
    read key;
    if key pressed -> LED on;
    else -> LED off;
}`,
        codeNote: "伪代码不是偷懒，它是在保护你的思路。",
        checklist: logicChecklist,
        commonMistakes: ["还没理清流程就急着搜代码"],
        variation: "把 LED 换成蜂鸣器。",
      }),
    ],
    selfTest: ["主循环里通常会做哪三类事？", "状态变量有什么用？", "为什么先写伪代码？"],
    commonErrors: mcuCommonErrors,
  }),
  lesson({
    day: 17,
    title: "从 C 语言过渡到 GPIO 逻辑",
    phase: "阶段 2：单片机与 GPIO 基础",
    phaseId: "mcu",
    goal: "把前面的 if、变量、函数，接到 GPIO 思维上。",
    objectives: ["用变量模拟按键和 LED", "把 LED_On / LED_Off 封装成函数", "完成纯 C 版报警逻辑"],
    coreTakeaways: ["GPIO 逻辑先可以在电脑端模拟", "按键状态就是输入变量", "函数让硬件动作更清楚"],
    concepts: ["按键变量", "LED 状态", "函数封装", "蜂鸣器报警"],
    beginnerMisunderstandings: ["上板之前先用纯 C 想明白逻辑，不是浪费时间。", "LED_On 这样的函数名能让主流程更像人话。"],
    comparison51: ["这和以后真实板子上的按键控制 LED 是同一套逻辑。"],
    stm32Implementation: ["后面只需要把变量读写替换成 HAL_GPIO_ReadPin / WritePin。"],
    cubemxTips: ["明天开始进入 STM32 环境。今天把过渡桥搭好。"],
    codeExamples: [
      code({
        title: "纯 C 模拟 LED 控制",
        kind: "c",
        code: `
void LED_On(void) { printf("LED ON\\n"); }
void LED_Off(void) { printf("LED OFF\\n"); }

if (keyPressed) LED_On();
else LED_Off();`,
        solves: "先在电脑端把硬件动作抽象成函数。",
        lineByLine: ["LED_On / LED_Off 先用 printf 模拟。", "主逻辑只关心 keyPressed。"],
        symbols: ["void 表示函数不返回结果。"],
      }),
    ],
    exercises: [
      ex({
        id: "d17-e1",
        title: "纯 C 模拟按键控制 LED",
        prompt: "用变量 keyPressed 模拟按键，按下时输出 LED ON。",
        explanation: "这是进入真实 GPIO 前的最后一座桥。",
        inputExample: "keyPressed = 1",
        outputExample: "LED ON",
        keyPoint: "变量模拟输入",
        hint: "先定义 keyPressed。",
        detailedHint: "if (keyPressed) 调用 LED_On，否则 LED_Off。",
        pseudocode: ["定义按键状态", "如果按下，调用 LED_On", "否则调用 LED_Off"],
        referenceCode: `
int keyPressed = 1;
if (keyPressed) {
    LED_On();
} else {
    LED_Off();
}`,
        codeNote: "真实板子上，keyPressed 会来自 GPIO 读取。",
        checklist: [...cChecklist, ...logicChecklist],
        commonMistakes: ["把输入和输出方向写反"],
        variation: "改成蜂鸣器报警。",
      }),
    ],
    selfTest: ["为什么先用纯 C 模拟？", "LED_On 封装有什么好处？", "真实 GPIO 时要替换哪部分？"],
    commonErrors: mcuCommonErrors,
  }),
];

const stm32Lessons: Lesson[] = [
  lesson({
    day: 18,
    title: "STM32 开发环境和工程结构",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "先看懂 CubeIDE、CubeMX、HAL 和 main.c，再开始点灯。",
    objectives: ["知道三者各做什么", "认识 main.c", "区分自动生成和用户代码"],
    coreTakeaways: ["CubeMX 配置，CubeIDE 编写和调试", "HAL 是库函数", "用户代码要写在保留区域"],
    concepts: ["STM32CubeIDE", "STM32CubeMX", "HAL", "main.c", "USER CODE BEGIN / END"],
    beginnerMisunderstandings: ["CubeMX 不是替你写完整项目，它只生成基础骨架。", "自动生成区乱改，重新生成时可能被覆盖。"],
    comparison51: ["51 工程也有初始化，只是 STM32 工程更完整。"],
    stm32Implementation: ["HAL_Init、SystemClock_Config、MX_GPIO_Init 都会先执行。"],
    cubemxTips: ["今天先创建工程并读 main.c，不急着接硬件。"],
    codeExamples: [
      code({
        title: "CubeMX 自动生成骨架",
        kind: "hal",
        code: `
HAL_Init();
SystemClock_Config();
MX_GPIO_Init();`,
        solves: "说明程序启动后的初始化顺序。",
        lineByLine: ["HAL_Init：初始化 HAL。", "SystemClock_Config：配置系统时钟。", "MX_GPIO_Init：初始化 GPIO。"],
        symbols: ["函数名后面的 () 表示调用。"],
        ownership: "这部分通常由 CubeMX 自动生成，先读懂，不要随意删。",
      }),
    ],
    exercises: [],
    selfTest: ["CubeMX 和 CubeIDE 分别做什么？", "HAL 是什么？", "用户代码应该写在哪里？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 19,
    title: "CubeMX 配置 GPIO 输出",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "把某个引脚配置成 GPIO_Output，并让 LED 亮起来。",
    objectives: ["会选芯片", "会配置 GPIO_Output", "完成 LED 常亮和闪烁"],
    coreTakeaways: ["先配引脚，再写代码", "输出模式用于控制外界", "LED 有效电平要先确认"],
    concepts: ["芯片选择", "GPIO_Output", "生成代码", "while(1) 控制 LED"],
    beginnerMisunderstandings: ["选了 GPIO_Output 不代表 LED 一定亮，代码和接线还要对。"],
    comparison51: ["相当于先把口线配置好，再去控制它。"],
    stm32Implementation: ["用户在 while(1) 中写控制 LED 的代码。"],
    cubemxTips: ["给 LED 引脚起标签，后面代码更好读。"],
    codeExamples: [
      code({
        title: "用户写的 LED 控制",
        kind: "hal",
        code: `
/* USER CODE BEGIN WHILE */
while (1) {
    HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);
}
/* USER CODE END WHILE */`,
        solves: "让 LED 保持某个输出电平。",
        lineByLine: ["while(1) 持续运行。", "WritePin 设置 LED 引脚电平。"],
        symbols: ["GPIO_PIN_SET 表示输出高电平。"],
        ownership: "while(1) 外框由 CubeMX 生成，里面这行 WritePin 是用户自己写。",
      }),
    ],
    exercises: [
      ex({
        id: "d19-e1",
        title: "LED 常亮",
        prompt: "把 LED 对应引脚配置成输出，并写出常亮代码。",
        explanation: "这是 STM32 入门第一块砖。",
        inputExample: "无输入",
        outputExample: "LED 常亮",
        keyPoint: "配置和代码要一致",
        hint: "先确认你的 LED 是高电平亮还是低电平亮。",
        detailedHint: "如果是低电平亮，常亮可能要写 GPIO_PIN_RESET。",
        pseudocode: ["CubeMX 配输出", "主循环里写固定电平"],
        referenceCode: `
HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);`,
        codeNote: "请根据板子有效电平决定 SET 还是 RESET。",
        checklist: stm32Checklist,
        commonMistakes: ["没看板子原理图就默认 SET 会亮"],
        variation: "改成常灭。",
      }),
    ],
    selfTest: ["GPIO_Output 用于什么？", "为什么要先确认 LED 有效电平？", "标签有什么好处？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 20,
    title: "HAL_GPIO_WritePin",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "把一行 HAL 代码拆开看懂。",
    objectives: ["理解函数参数", "区分端口和引脚", "知道 SET / RESET"],
    coreTakeaways: ["端口和引脚缺一不可", "SET / RESET 表示电平", "函数名要结合参数一起看"],
    concepts: ["GPIO 端口", "GPIO 引脚", "GPIO_PIN_SET", "GPIO_PIN_RESET"],
    beginnerMisunderstandings: ["PA5 里的 A 是端口，5 是引脚编号，不是一整个名字随便抄。"],
    comparison51: ["以前可能写 P1^0，现在 STM32 明确写端口和引脚。"],
    stm32Implementation: ["HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET)。"],
    cubemxTips: ["用标签后，生成代码会出现 LED_GPIO_Port 和 LED_Pin。"],
    codeExamples: [
      code({
        title: "拆开 WritePin",
        kind: "hal",
        code: `
HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);`,
        solves: "让 GPIOA 的 5 号引脚输出高电平。",
        lineByLine: ["GPIOA：端口。", "GPIO_PIN_5：端口里的第 5 个引脚。", "GPIO_PIN_SET：输出高电平。"],
        symbols: [", 用来分隔函数参数。"],
        ownership: "这行通常由用户写在 USER CODE 区域。",
      }),
    ],
    exercises: [
      ex({
        id: "d20-e1",
        title: "看懂一行 HAL_GPIO_WritePin",
        prompt: "解释 GPIOA、GPIO_PIN_5、GPIO_PIN_SET 分别是什么意思。",
        explanation: "先会读，才谈会写。",
        inputExample: "HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);",
        outputExample: "GPIOA 端口的 5 号引脚输出高电平",
        keyPoint: "函数参数逐个读",
        hint: "按从左到右顺序拆。",
        detailedHint: "第一个参数是端口，第二个是引脚，第三个是输出电平。",
        pseudocode: ["找到端口", "找到引脚", "找到电平"],
        referenceCode: `GPIOA 端口，第 5 号引脚，输出高电平。`,
        codeNote: "这是读 HAL 代码的基本方法。",
        checklist: stm32Checklist,
        commonMistakes: ["只记函数名，不看参数"],
        variation: "把 SET 改成 RESET 后重新解释。",
      }),
    ],
    selfTest: ["端口和引脚有什么区别？", "SET 表示什么？", "低电平点亮 LED 时该写什么？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 21,
    title: "HAL_GPIO_TogglePin 和 HAL_Delay",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "让 LED 周期性翻转，看到最直观的反馈。",
    objectives: ["理解翻转", "会用延时", "知道阻塞延时的缺点"],
    coreTakeaways: ["Toggle 是翻转当前状态", "HAL_Delay 按毫秒延时", "阻塞期间程序做不了别的事"],
    concepts: ["TogglePin", "HAL_Delay", "阻塞延时"],
    beginnerMisunderstandings: ["翻转不是固定亮或灭，而是每次变成相反状态。"],
    comparison51: ["这和早期软件延时闪灯很像。"],
    stm32Implementation: ["TogglePin + Delay 可以快速做出闪烁效果。"],
    cubemxTips: ["先用它建立反馈，再慢慢理解更好的定时方式。"],
    codeExamples: [
      code({
        title: "500ms 闪烁",
        kind: "hal",
        code: `
while (1) {
    HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    HAL_Delay(500);
}`,
        solves: "让 LED 每 500ms 改变一次状态。",
        lineByLine: ["TogglePin 翻转 LED 当前状态。", "Delay 让程序暂停 500ms。"],
        symbols: ["500 表示 500 毫秒。"],
        ownership: "这两行是用户代码，通常写在 while(1) 中。",
      }),
    ],
    exercises: [
      ex({
        id: "d21-e1",
        title: "LED 每 500ms 闪烁",
        prompt: "让 LED 每半秒翻转一次。",
        explanation: "这是最经典的 STM32 入门实验。",
        inputExample: "无输入",
        outputExample: "LED 周期闪烁",
        keyPoint: "Toggle + Delay",
        hint: "先翻转，再延时。",
        detailedHint: "把 500 改成 1000 会更慢。",
        pseudocode: ["一直循环", "翻转 LED", "等待 500ms"],
        referenceCode: `
HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
HAL_Delay(500);`,
        codeNote: "能闪起来，说明 GPIO 输出基本跑通了。",
        checklist: stm32Checklist,
        commonMistakes: ["只写 Delay 没写 Toggle"],
        variation: "改成 100ms 快闪。",
      }),
    ],
    selfTest: ["Toggle 是什么意思？", "HAL_Delay 的单位是什么？", "阻塞延时有什么缺点？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 22,
    title: "CubeMX 配置 GPIO 输入",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "把按键引脚配置为输入，并理解上拉下拉选项。",
    objectives: ["认识 GPIO_Input", "理解 Pull-up / Pull-down / No pull", "完成按键控制 LED"],
    coreTakeaways: ["输入用于读取外界", "上下拉决定默认电平", "按键逻辑要和接线一致"],
    concepts: ["GPIO_Input", "Pull-up", "Pull-down", "No pull"],
    beginnerMisunderstandings: ["No pull 不是更高级，它可能让输入漂浮。"],
    comparison51: ["和前面学的上拉按键逻辑完全接上了。"],
    stm32Implementation: ["CubeMX 中要把按键脚设成输入模式。"],
    cubemxTips: ["先查板子原理图，再决定 Pull-up 还是 Pull-down。"],
    codeExamples: [
      code({
        title: "按键控制 LED",
        kind: "hal",
        code: `
if (HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin) == GPIO_PIN_RESET) {
    HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);
}`,
        solves: "读取按键状态，再控制 LED。",
        lineByLine: ["ReadPin 读取输入电平。", "RESET 可能表示上拉按键被按下。", "WritePin 控制 LED。"],
        symbols: ["== 表示判断相等。"],
        ownership: "CubeMX 负责初始化，if 判断由用户写。",
      }),
    ],
    exercises: [
      ex({
        id: "d22-e1",
        title: "按键按下 LED 亮",
        prompt: "按键按下时让 LED 亮，松开时灭。",
        explanation: "这是输入和输出第一次真正联动。",
        inputExample: "按键按下",
        outputExample: "LED 亮",
        keyPoint: "先确认按下读到几",
        hint: "如果按键上拉，按下通常读到 RESET。",
        detailedHint: "写 if / else，按下写亮，松开写灭。",
        pseudocode: ["读取按键", "如果按下则 LED 亮", "否则 LED 灭"],
        referenceCode: `
if (HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin) == GPIO_PIN_RESET) {
    HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);
} else {
    HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET);
}`,
        codeNote: "如果你的 LED 是低电平亮，还要把 LED 输出反过来。",
        checklist: stm32Checklist,
        commonMistakes: ["按键逻辑和 LED 有效电平都没确认"],
        variation: "改成按下蜂鸣器响。",
      }),
    ],
    selfTest: ["GPIO_Input 是做什么的？", "Pull-up 的默认电平是什么？", "No pull 可能带来什么问题？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 23,
    title: "HAL_GPIO_ReadPin",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "把读取输入这件事真正读懂。",
    objectives: ["知道 ReadPin 的返回值", "会写按键判断语句", "会修正高低电平相反问题"],
    coreTakeaways: ["ReadPin 读的是电平", "SET / RESET 不是自动等于松开 / 按下", "逻辑要和接线一致"],
    concepts: ["HAL_GPIO_ReadPin", "GPIO_PIN_SET", "GPIO_PIN_RESET", "按键逻辑"],
    beginnerMisunderstandings: ["ReadPin 返回的是电平，不是“按下”这个中文意思。"],
    comparison51: ["读到 0 还是 1，要看实际硬件接法。"],
    stm32Implementation: ["按键代码必须把电平翻译成人类想要的状态。"],
    cubemxTips: ["如果结果反了，优先检查上拉下拉和接线。"],
    codeExamples: [
      code({
        title: "按键判断语句",
        kind: "hal",
        code: `
GPIO_PinState state = HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin);
if (state == GPIO_PIN_RESET) {
    /* pressed */
}`,
        solves: "先保存输入电平，再判断。",
        lineByLine: ["ReadPin 返回一个电平状态。", "RESET 在某些按键电路里代表按下。"],
        symbols: ["GPIO_PinState 是 HAL 定义的状态类型。"],
        ownership: "这是用户逻辑代码。",
      }),
    ],
    exercises: [
      ex({
        id: "d23-e1",
        title: "修正高低电平相反的问题",
        prompt: "如果按下按键时 LED 反而灭，应该先检查什么？",
        explanation: "真实调试里，逻辑反了比代码复杂更常见。",
        inputExample: "按下读到 SET",
        outputExample: "判断条件改成 == GPIO_PIN_SET",
        keyPoint: "电平和语义要重新对应",
        hint: "先用调试或串口看按下时到底读到什么。",
        detailedHint: "不要凭猜测，把读取结果和实际按键状态对照。",
        pseudocode: ["读取按键真实电平", "确认按下对应值", "修改判断条件"],
        referenceCode: `如果按下时读到 SET，就把判断条件改为 == GPIO_PIN_SET。`,
        codeNote: "先测再改，调试才有依据。",
        checklist: stm32Checklist,
        commonMistakes: ["不测电平就盲改代码"],
        variation: "写出上拉和下拉两种情况。",
      }),
    ],
    selfTest: ["ReadPin 返回的是什么？", "为什么 SET 不一定代表按下？", "逻辑反了先查什么？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 24,
    title: "外部中断 EXTI 入门",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "理解为什么有时不想一直轮询，而是等事件来了再处理。",
    objectives: ["区分轮询和中断", "认识 NVIC", "知道回调函数"],
    coreTakeaways: ["中断是事件来了再响应", "NVIC 管理中断", "回调函数写用户逻辑"],
    concepts: ["EXTI", "轮询", "中断", "NVIC", "回调函数"],
    beginnerMisunderstandings: ["中断不是神秘跳转，本质是事件触发的处理流程。"],
    comparison51: ["51 也有外部中断，思路类似。"],
    stm32Implementation: ["按键中断可在回调里翻转 LED。"],
    cubemxTips: ["配置 EXTI 时别忘了启用 NVIC。"],
    codeExamples: [
      code({
        title: "EXTI 回调",
        kind: "hal",
        code: `
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin) {
    if (GPIO_Pin == KEY_Pin) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }
}`,
        solves: "按键触发后翻转 LED。",
        lineByLine: ["HAL 在中断发生后调用回调。", "先判断是哪一个引脚触发。", "再执行用户动作。"],
        symbols: ["uint16_t 是无符号 16 位整数类型。"],
        ownership: "回调函数框架按 HAL 约定命名，里面的逻辑由用户写。",
      }),
    ],
    exercises: [],
    selfTest: ["轮询和中断有什么区别？", "NVIC 做什么？", "为什么回调里不宜写很长延时？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 25,
    title: "串口 USART 入门",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "学会让单片机把信息说出来。",
    objectives: ["知道串口是什么", "认识 TX / RX / 波特率", "会发 Hello STM32"],
    coreTakeaways: ["TX 发，RX 收", "两端波特率要一致", "串口日志是调试利器"],
    concepts: ["USART", "TX", "RX", "波特率", "串口调试助手", "HAL_UART_Transmit"],
    beginnerMisunderstandings: ["串口不是只能拿来下载程序，它更常用于看日志。"],
    comparison51: ["51 也常用串口调试，只是 HAL 写法不同。"],
    stm32Implementation: ["HAL_UART_Transmit(&huart1, ...) 发送数据。"],
    cubemxTips: ["记得 TX/RX 交叉并共地。"],
    codeExamples: [
      code({
        title: "发送 Hello STM32",
        kind: "hal",
        code: `
uint8_t msg[] = "Hello STM32\\r\\n";
HAL_UART_Transmit(&huart1, msg, sizeof(msg) - 1, 100);`,
        solves: "让开发板向串口助手发一句话。",
        lineByLine: ["msg 保存要发送的字节。", "&huart1 是串口句柄地址。", "sizeof(msg)-1 避免把字符串结尾也发出去。"],
        symbols: ["\\r\\n 常用于串口换行。", "& 仍然表示取地址。"],
        ownership: "USART 初始化通常由 CubeMX 生成，这两行由用户写。",
      }),
    ],
    exercises: [],
    selfTest: ["TX 和 RX 分别是什么？", "波特率不一致会怎样？", "&huart1 你现在能解释了吗？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 26,
    title: "定时器 TIM 入门",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "理解比 HAL_Delay 更正规的时间工具。",
    objectives: ["知道为什么需要定时器", "认识 PSC 和 ARR", "能算简单周期"],
    coreTakeaways: ["PSC 先分频", "ARR 决定数到多少", "定时器适合周期任务"],
    concepts: ["TIM", "PSC", "ARR", "定时周期", "定时器中断"],
    beginnerMisunderstandings: ["PSC 和 ARR 常常都要加 1 再参与计算。"],
    comparison51: ["和 51 定时器一样，都是计数到某个点触发。"],
    stm32Implementation: ["TIM 中断可以周期性翻转 LED。"],
    cubemxTips: ["先学会看 CubeMX 里的 Prescaler 和 Counter Period。"],
    codeExamples: [
      code({
        title: "定时器中断回调",
        kind: "hal",
        code: `
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
    if (htim->Instance == TIM2) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }
}`,
        solves: "定时器到期后翻转 LED。",
        lineByLine: ["回调会在定时器周期到达时执行。", "判断是不是 TIM2 触发。", "再翻转 LED。"],
        symbols: ["-> 用于访问结构体指针成员。"],
        ownership: "回调函数由用户补充逻辑，TIM 初始化由 CubeMX 生成。",
      }),
    ],
    exercises: [],
    selfTest: ["为什么需要定时器？", "PSC 和 ARR 各干什么？", "定时器比 Delay 好在哪里？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 27,
    title: "PWM 入门",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "理解为什么快速开关也能控制亮度。",
    objectives: ["认识 PWM", "理解频率和占空比", "知道如何控制 LED 亮度"],
    coreTakeaways: ["PWM 是快速开关", "占空比决定平均效果", "亮度可由比较值改变"],
    concepts: ["PWM", "频率", "占空比", "LED 亮度"],
    beginnerMisunderstandings: ["PWM 不是把电压真的改成一半，而是快速开关后的平均效果。"],
    comparison51: ["以前也可用软件模拟 PWM，STM32 定时器能更稳定地做。"],
    stm32Implementation: ["改变比较值可改变占空比。"],
    cubemxTips: ["TIM 通道要配置为 PWM Generation。"],
    codeExamples: [
      code({
        title: "设置 PWM 占空比",
        kind: "hal",
        code: `
HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
__HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, 500);`,
        solves: "启动 PWM，并给出一个中等占空比。",
        lineByLine: ["先启动 PWM。", "再设置比较值。", "若 ARR 约为 999，500 大约是 50%。"],
        symbols: ["__HAL_TIM_SET_COMPARE 是宏封装。"],
        ownership: "初始化由 CubeMX 生成，这两行通常由用户写。",
      }),
    ],
    exercises: [],
    selfTest: ["PWM 是什么？", "占空比越大，LED 一般越怎样？", "频率和占空比分别影响什么？"],
    commonErrors: stm32CommonErrors,
  }),
  lesson({
    day: 28,
    title: "ADC 入门",
    phase: "阶段 3：STM32 基础外设",
    phaseId: "stm32",
    goal: "把真实世界的连续电压变成程序能处理的数字。",
    objectives: ["区分模拟量和数字量", "知道 ADC 是什么", "会算 3.3V / 4095 的关系"],
    coreTakeaways: ["ADC 把模拟量变数字", "12 位 ADC 常见范围 0 到 4095", "电位器适合做入门采集"],
    concepts: ["模拟量", "数字量", "ADC", "分辨率", "4095", "电位器"],
    beginnerMisunderstandings: ["4095 不是魔法数字，它来自 12 位 ADC 的最大值。"],
    comparison51: ["51 若没有片上 ADC，常要接额外芯片；STM32 常有片上 ADC。"],
    stm32Implementation: ["原始值 raw 可换算成 voltage = raw * 3.3 / 4095。"],
    cubemxTips: ["先接电位器做最直观实验。"],
    codeExamples: [
      code({
        title: "ADC 原始值转电压",
        kind: "c",
        code: `
float voltage = raw * 3.3f / 4095.0f;
if (voltage > 2.5f) {
    printf("HIGH\\n");
}`,
        solves: "把数字量换回人能理解的电压。",
        lineByLine: ["raw 是 ADC 原始值。", "乘 3.3 再除 4095 得到电压。", "然后可以继续判断阈值。"],
        symbols: ["f 表示浮点常量。"],
      }),
    ],
    exercises: [],
    selfTest: ["模拟量和数字量有什么区别？", "12 位 ADC 最大值为什么是 4095？", "raw=4095 时约等于多少伏？"],
    commonErrors: stm32CommonErrors,
  }),
];

function quickStm32Ex(
  id: string,
  title: string,
  prompt: string,
  keyPoint: string,
  pseudocode: string[],
  referenceCode: string,
  outputExample: string
): PracticeExercise {
  return ex({
    id,
    title,
    prompt,
    explanation: "先只完成这一小步，确认理解和硬件都没问题。",
    inputExample: "按题目条件",
    outputExample,
    keyPoint,
    hint: "先把输入、判断、输出拆开。",
    detailedHint: "如果已经有最小代码，先只改一个参数或一行逻辑。",
    pseudocode,
    referenceCode,
    codeNote: "先能解释每一行，再去改参数。",
    checklist: stm32Checklist,
    commonMistakes: ["直接复制但说不清每个参数", "还没验证硬件就叠加复杂逻辑"],
    variation: "改一个参数，再观察现象是否符合预期。",
  });
}

enrichStm32Exercises();

function enrichStm32Exercises() {
  const byDay = Object.fromEntries(stm32Lessons.map((item) => [item.day, item])) as Record<number, Lesson>;
  byDay[19].exercises.push(
    quickStm32Ex("d19-e2", "LED 闪烁", "在常亮基础上加入翻转和延时。", "输出模式 + 翻转", ["配置输出", "翻转 LED", "延时"], `
HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
HAL_Delay(500);`, "LED 周期闪烁")
  );
  byDay[20].exercises.push(
    quickStm32Ex("d20-e2", "修改 LED 亮灭逻辑", "把 SET 和 RESET 调换，观察 LED 变化。", "有效电平", ["找到第三个参数", "把 SET 改成 RESET", "观察结果"], `
HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET);`, "LED 状态改变")
  );
  byDay[21].exercises.push(
    quickStm32Ex("d21-e2", "修改闪烁频率", "把 500ms 改成 100ms 或 1000ms。", "延时参数", ["找到 HAL_Delay", "修改毫秒数", "比较快慢"], `
HAL_Delay(100);`, "闪烁速度变化")
  );
  byDay[23].exercises.push(
    quickStm32Ex("d23-e2", "写出按键判断语句", "根据按下时的真实电平写 if 判断。", "ReadPin 返回电平", ["读取引脚", "比较真实按下电平"], `
if (HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin) == GPIO_PIN_RESET) {
    /* pressed */
}`, "判断进入 pressed 分支")
  );
  byDay[24].exercises.push(
    quickStm32Ex("d24-e1", "按键中断翻转 LED", "在 EXTI 回调中翻转 LED。", "中断回调", ["配置 EXTI", "打开 NVIC", "回调中翻转 LED"], `
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin) {
    if (GPIO_Pin == KEY_Pin) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }
}`, "按键触发后 LED 翻转"),
    quickStm32Ex("d24-e2", "解释中断", "用自己的话解释轮询和中断的区别。", "轮询 vs 中断", ["先想谁在主动检查", "再想谁在事件发生时通知"], `轮询：我一直去问。\n中断：事件来了再通知我。`, "能说清两者区别")
  );
  byDay[25].exercises.push(
    quickStm32Ex("d25-e1", "串口输出 Hello STM32", "向串口助手发送一句话。", "USART 发送", ["准备字符串", "调用 Transmit"], `
uint8_t msg[] = "Hello STM32\\r\\n";
HAL_UART_Transmit(&huart1, msg, sizeof(msg) - 1, 100);`, "串口看到 Hello STM32"),
    quickStm32Ex("d25-e2", "按键后输出 LED 状态", "按键触发后，在串口打印当前 LED 状态。", "输入事件日志", ["读按键", "判断状态", "发字符串"], `
if (keyPressed) {
    uint8_t msg[] = "LED ON\\r\\n";
    HAL_UART_Transmit(&huart1, msg, sizeof(msg) - 1, 100);
}`, "串口出现 LED 状态")
  );
  byDay[26].exercises.push(
    quickStm32Ex("d26-e1", "用定时器实现 LED 闪烁", "在定时器回调里翻转 LED。", "周期任务", ["启动定时器中断", "回调里翻转 LED"], `
HAL_TIM_Base_Start_IT(&htim2);`, "LED 按定时周期闪烁"),
    quickStm32Ex("d26-e2", "计算简单定时周期", "根据 PSC 和 ARR 说出周期计算思路。", "周期公式", ["先写公式", "再代入数值"], `周期 ≈ (PSC + 1) × (ARR + 1) / 定时器时钟`, "能算出大致周期")
  );
  byDay[27].exercises.push(
    quickStm32Ex("d27-e1", "改变占空比", "把比较值改小或改大，观察亮度。", "占空比", ["启动 PWM", "修改 compare 值"], `
__HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, 200);`, "LED 亮度变化"),
    quickStm32Ex("d27-e2", "呼吸灯思路", "说明如何让占空比逐步增大再减小。", "渐变", ["准备 duty", "逐步增减", "到边界后反向"], `duty 从 0 增到最大，再从最大减回 0。`, "能说清呼吸灯逻辑")
  );
  byDay[28].exercises.push(
    quickStm32Ex("d28-e1", "计算 ADC 对应电压", "raw=2048 时大约是多少伏？", "ADC 换算", ["写公式", "代入 raw"], `voltage = 2048 * 3.3 / 4095`, "约 1.65V"),
    quickStm32Ex("d28-e2", "判断电压是否超过阈值", "若阈值是 2.5V，判断当前电压是否报警。", "阈值判断", ["先换算电压", "再用 if 比较"], `
if (voltage > 2.5f) {
    alarm = 1;
}`, "得到报警状态")
  );
}

const projectLessons: Lesson[] = [
  ["项目需求分析", "系统要解决什么问题，输入和输出分别是什么。"],
  ["LED + 蜂鸣器报警模块", "先把最直接的报警输出做稳。"],
  ["按键控制模块", "加入输入，让系统能被人操作。"],
  ["ADC 采集模块", "让系统开始感知模拟量。"],
  ["串口日志模块", "让系统把状态说出来。"],
  ["系统整合", "让多个模块一起协作。"],
  ["项目总结和简历描述", "把成果整理成能表达能力的项目。"],
].map(([title, goal], index) => {
  const day = 29 + index;
  return lesson({
    day,
    title,
    phase: "阶段 4：综合小项目实战",
    phaseId: "project",
    goal,
    difficulty: day === 35 ? "综合" : "进阶",
    duration: "60-90 分钟",
    objectives: [goal, "只做当前阶段的最小闭环", "留下测试和复盘记录"],
    coreTakeaways:
      day === 29
        ? ["先定义问题", "先分清输入输出", "先列出要用的外设"]
        : day === 35
          ? ["总结功能", "总结技术栈", "把过程写成简历语言"]
          : ["先单模块跑通", "再封装函数", "最后再和主循环整合"],
    concepts:
      day === 29
        ? ["需求分析", "输入", "输出", "外设映射"]
        : day === 30
          ? ["GPIO 输出", "报警逻辑", "函数封装"]
          : day === 31
            ? ["GPIO 输入", "按键切换", "消抖"]
            : day === 32
              ? ["ADC", "电压计算", "阈值判断"]
              : day === 33
                ? ["串口日志", "采集值", "报警信息"]
                : day === 34
                  ? ["主循环", "状态变量", "模块协作", "bug 排查"]
                  : ["项目总结", "技术栈", "简历描述", "扩展方向"],
    beginnerMisunderstandings: ["项目不是一口气写完，而是一层一层叠出来。"],
    comparison51: ["即使换成 51，输入、判断、输出这条主线也不会变。"],
    stm32Implementation: ["围绕 GPIO、按键、ADC、USART 逐步组合。"],
    cubemxTips: ["保持一次只新增一个模块，方便定位问题。"],
    codeExamples: [
      code({
        title: day === 35 ? "简历描述模板" : "模块化伪代码",
        kind: day === 35 ? "c" : "hal",
        code:
          day === 35
            ? `
基于 STM32 设计并实现轨道交通设备状态监测小系统，
完成 GPIO 报警控制、按键输入、ADC 模拟量采集和串口状态输出等功能。`
            : `
while (1) {
    app_read_input();
    app_update_state();
    app_control_output();
}`,
        solves: day === 35 ? "把做过的事写成别人能看懂的项目描述。" : "把系统流程拆成几个模块动作。",
        lineByLine:
          day === 35
            ? ["先写清平台。", "再写功能和能力。"]
            : ["先读输入。", "再更新状态。", "最后控制输出。"],
        symbols: day === 35 ? [] : ["函数名表达职责。"],
        ownership: day === 35 ? undefined : "项目主流程由用户设计，CubeMX 只负责底层初始化。",
      }),
    ],
    exercises: [
      ex({
        id: `d${day}-e1`,
        title,
        prompt: goal,
        explanation: "今天只完成一个小闭环，不追求一次做完整个项目。",
        inputExample: "根据当天主题",
        outputExample: "得到一个可验证的小结果",
        keyPoint: "模块化推进",
        hint: "先写出输入、处理、输出。",
        detailedHint: "如果还不会真实代码，先写伪代码和测试方法。",
        pseudocode: ["定义输入", "完成处理", "验证输出"],
        referenceCode: `
/* 先完成今天的最小闭环，再继续下一天。 */`,
        codeNote: "项目训练里，能验证比看起来复杂更重要。",
        checklist: projectChecklist,
        commonMistakes: ["跳过单模块验证", "没有记录测试结果"],
        variation: "写一句今天完成了什么、卡在哪里、下一步是什么。",
      }),
    ],
    selfTest: ["今天的输入是什么？", "今天的输出是什么？", "你准备怎么验证它真的工作？"],
    commonErrors: projectCommonErrors,
  });
});

lessons.push(...foundationLessons, ...stm32Lessons, ...projectLessons);

export const lessonMap = Object.fromEntries(lessons.map((item) => [item.day, item])) as Record<number, Lesson>;

export const phaseRanges = [
  { id: "c" as const, title: "C 语言重新入门", range: "Day 1-10", days: [1, 10], tone: "from-cyan-300 to-sky-400" },
  { id: "mcu" as const, title: "单片机与 GPIO 基础", range: "Day 11-17", days: [11, 17], tone: "from-emerald-300 to-cyan-300" },
  { id: "stm32" as const, title: "STM32 基础外设", range: "Day 18-28", days: [18, 28], tone: "from-blue-300 to-indigo-400" },
  { id: "project" as const, title: "综合小项目实战", range: "Day 29-35", days: [29, 35], tone: "from-violet-300 to-fuchsia-400" },
];

export function getLesson(day: number): Lesson {
  return lessonMap[day] ?? lessonMap[1];
}
