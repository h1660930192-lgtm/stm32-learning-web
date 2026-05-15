import type { Difficulty, Lesson, PhaseId, PracticeExercise } from "../types";

const trim = (text: string) => text.trim();

const cChecklist = [
  "是否包含必要的 #include，例如 #include <stdio.h>",
  "main 函数是否完整，变量是否先定义后使用",
  "scanf 读取普通变量时是否使用了 &",
  "if / else、for / while 的大括号是否完整",
  "数组下标是否从 0 开始，是否越界",
  "函数是否有返回值，声明和调用是否一致",
  "是否至少测试了正常值、边界值和异常值",
];

const stm32Checklist = [
  "代码是否写在 USER CODE BEGIN 和 USER CODE END 之间",
  "CubeMX 的 GPIO / USART / TIM / ADC 配置是否和代码一致",
  "HAL 函数里的端口、引脚、通道、句柄是否写对",
  "中断功能是否同时配置了外设和 NVIC",
  "串口波特率是否一致，TX/RX 是否交叉，GND 是否共地",
  "while(1) 里是否避免了无意义的长时间阻塞",
];

const projectChecklist = [
  ...stm32Checklist,
  "是否先画出数据流：采集 -> 处理 -> 显示 -> 报警 -> 日志",
  "是否先单模块验证，再合并到主程序",
  "阈值、页面编号、滤波窗口是否集中管理",
  "是否留下串口日志，方便定位问题",
];

function exercise(
  id: string,
  title: string,
  prompt: string,
  hint: string,
  detailedHint: string,
  referenceCode: string,
  codeNote: string,
  checklist = cChecklist,
  commonMistakes: string[] = [],
  variation = "完成后换一个阈值、次数或输入方式，再独立写一遍。"
): PracticeExercise {
  return {
    id,
    title,
    prompt,
    hint,
    detailedHint,
    referenceCode: trim(referenceCode),
    codeNote,
    checklist,
    commonMistakes,
    variation,
  };
}

function lesson(input: Omit<Lesson, "difficulty" | "duration"> & { difficulty?: Difficulty; duration?: string }): Lesson {
  return {
    difficulty: input.difficulty ?? "基础",
    duration: input.duration ?? "45-70 分钟",
    ...input,
  };
}

const cCommon = ["先理解输入、处理、输出，再写代码", "不要一上来照抄参考代码", "写完后用检查清单过一遍", "至少做一个小变式"];
const stm32Common = ["先确认 CubeMX 配置，再写 HAL 代码", "先做最小实验，再加复杂逻辑", "遇到问题先看串口日志或单步验证", "注意用户代码区域"];

const projectCommon = ["先拆模块，不要把所有功能堆进 while(1)", "每个外设先单独跑通", "把调试过程记录成项目素材", "项目描述要写清输入、处理和输出"];

export const lessons: Lesson[] = [
  lesson({
    day: 1,
    title: "变量、输入输出、if 判断",
    phase: "第一阶段：C 语言恢复训练",
    phaseId: "c",
    goal: "恢复 C 语言基本书写能力",
    difficulty: "入门",
    objectives: ["重新熟悉 C 程序结构", "能用 scanf / printf 完成输入输出", "能用 if / else 做阈值判断"],
    concepts: ["变量类型 int / float / char", "scanf 的 &", "if / else if / else", "阈值与边界值"],
    comparison51: ["51 里判断按键、温度报警，本质都是 if 判断", "电脑端先把逻辑写顺，后面把输入换成 ADC 或 GPIO 即可"],
    stm32Implementation: ["STM32 中报警逻辑仍然是 if，只是数据来自 ADC、GPIO 或串口", "HAL 负责读写外设，业务判断仍靠 C"],
    cubemxTips: ["今天先不需要 CubeMX", "把温度、成绩、阈值这些纯 C 逻辑练熟"],
    codeFramework: trim(`
#include <stdio.h>

int main(void) {
    int value = 0;
    scanf("%d", &value);

    if (value > 0) {
        printf("positive\\n");
    } else {
        printf("not positive\\n");
    }
    return 0;
}`),
    codeExplanation: "这段代码演示输入一个整数，然后根据条件分支输出结果。迁移到 STM32 时，scanf 通常会被 ADC 或 GPIO 读取替代。",
    exercises: [
      exercise("d1-e1", "输入温度，判断是否报警", "输入一个温度值，超过 60 输出 ALARM，否则输出 OK。", "先写出输入、阈值、两种输出。", "定义 temperature，用 scanf 读取；if (temperature > 60) 输出 ALARM，否则输出 OK。", `
#include <stdio.h>

int main(void) {
    int temperature = 0;
    scanf("%d", &temperature);
    if (temperature > 60) {
        printf("ALARM\\n");
    } else {
        printf("OK\\n");
    }
    return 0;
}`, "解决固定阈值报警。你需要自己改阈值、输出文字和变量名。", cChecklist, ["scanf 忘记 &", "if 后面误写分号", "没有测试 60 和 61"], "把阈值改成用户输入。"),
      exercise("d1-e2", "输入成绩，判断等级", "输入 0-100 分，>=90 为 A，>=80 为 B，>=60 为 C，否则为 D。", "多个等级适合从高到低写 else if。", "先判断非法输入，再按 90、80、60 的边界往下判断。", `
int score = 0;
scanf("%d", &score);
if (score >= 90) {
    printf("A\\n");
} else if (score >= 80) {
    printf("B\\n");
} else if (score >= 60) {
    printf("C\\n");
} else {
    printf("D\\n");
}`, "重点是边界条件。90、80、60 都要手动测试。", cChecklist, ["把 >= 写成 >", "多个 if 导致重复判断"], "加入非法输入：小于 0 或大于 100 输出 INVALID。"),
      exercise("d1-e3", "输入两个数，输出较大值", "输入两个整数，输出其中较大的一个。", "需要两个变量 a、b。", "if (a > b) 输出 a，否则输出 b；相等时输出任意一个即可。", `
int a = 0;
int b = 0;
scanf("%d %d", &a, &b);
printf("%d\\n", a > b ? a : b);`, "这是最小版本，也可以用普通 if / else 写。", cChecklist, ["忘记读两个数", "格式控制符和变量数量不一致"], "相等时输出 EQUAL。"),
    ],
    selfTest: ["scanf 为什么要加 &？", "else if 和多个独立 if 有什么区别？", "阈值判断最容易漏测哪个边界？"],
    commonErrors: cCommon,
  }),
  lesson({
    day: 2,
    title: "for / while 循环",
    phase: "第一阶段：C 语言恢复训练",
    phaseId: "c",
    goal: "恢复循环控制能力",
    difficulty: "入门",
    objectives: ["能写固定次数循环", "能理解 while(1) 的单片机意义", "能用循环统计和累加"],
    concepts: ["for 的初值、条件、更新", "while 的条件循环", "计数器与累加器", "死循环"],
    comparison51: ["51 点灯闪烁常在 while(1) 里反复翻转 IO", "轮询按键也是循环不断读取输入"],
    stm32Implementation: ["STM32 的 while(1) 是主循环", "LED 闪烁会把 printf 换成 HAL_GPIO_TogglePin"],
    cubemxTips: ["今天先在电脑端练循环", "后续 GPIO 输出会直接复用这个节奏"],
    codeFramework: trim(`
for (int i = 0; i < 10; i++) {
    printf("i=%d\\n", i);
}

while (1) {
    /* 单片机主循环 */
}`),
    codeExplanation: "循环负责重复执行。单片机程序通常不会自然结束，而是在 while(1) 中持续运行。",
    exercises: [
      exercise("d2-e1", "求 1 到 100 的和", "用 for 循环计算 1+2+...+100。", "sum 初值为 0。", "for 从 1 到 100，每次 sum += i。", `
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
printf("%d\\n", sum);`, "解决固定范围累加。你需要重点检查 i <= 100。", cChecklist, ["sum 未初始化", "循环少一次或多一次"], "把 100 改成用户输入 n。"),
      exercise("d2-e2", "模拟 LED ON / LED OFF 闪烁", "循环 5 次，输出 LED ON 和 LED OFF。", "电脑端用 printf 模拟硬件状态。", "一轮循环里先输出 ON，再输出 OFF。", `
for (int i = 0; i < 5; i++) {
    printf("LED ON\\n");
    printf("LED OFF\\n");
}`, "后续在 STM32 中会把两句 printf 换成写 GPIO 和延时。", cChecklist, ["循环次数和需求不一致", "输出顺序反了"], "输出 Blink 1、Blink 2 这样的编号。"),
      exercise("d2-e3", "统计 1 到 100 中偶数个数", "统计 1 到 100 之间有多少个偶数。", "偶数条件是 i % 2 == 0。", "循环 i=1 到 100，满足条件就 count++。", `
int count = 0;
for (int i = 1; i <= 100; i++) {
    if (i % 2 == 0) {
        count++;
    }
}
printf("%d\\n", count);`, "这段代码训练条件判断嵌入循环。", cChecklist, ["把 = 当成 ==", "count 未初始化"], "同时统计奇数个数。"),
    ],
    selfTest: ["for 的三个表达式分别做什么？", "while(1) 为什么在单片机中常见？", "如何判断循环边界是否正确？"],
    commonErrors: cCommon,
  }),
  lesson({
    day: 3,
    title: "数组",
    phase: "第一阶段：C 语言恢复训练",
    phaseId: "c",
    goal: "掌握采样数据的基本处理",
    objectives: ["能用数组保存多次数据", "能遍历数组计算平均值", "能找最大值和最小值"],
    concepts: ["同类型数据连续存储", "下标从 0 开始", "数组长度与循环边界", "采样缓存"],
    comparison51: ["51 数码管段码表、按键表、采样缓存都常用数组", "数组越界在单片机上可能破坏别的变量"],
    stm32Implementation: ["ADC 多次采样、串口接收缓冲区、OLED 显示缓存都会用数组", "DMA 也常把数据搬到数组里"],
    cubemxTips: ["今天不用 CubeMX", "后面的 ADC 平均滤波会直接使用数组"],
    codeFramework: trim(`
int values[5] = {0};
for (int i = 0; i < 5; i++) {
    scanf("%d", &values[i]);
}`),
    codeExplanation: "数组适合保存一组同类型数据。注意 values[5] 只有 0 到 4 这 5 个合法下标。",
    exercises: [
      exercise("d3-e1", "输入 5 个温度值，求平均值", "用数组保存 5 个温度值，输出平均值。", "先读入数组，再求 sum。", "sum / 5.0 可以保留小数。", `
int t[5] = {0};
int sum = 0;
for (int i = 0; i < 5; i++) {
    scanf("%d", &t[i]);
    sum += t[i];
}
printf("%.2f\\n", sum / 5.0);`, "这是 ADC 平均滤波的电脑端雏形。", cChecklist, ["整数除法丢小数", "数组越界"], "去掉最大值和最小值后求平均。"),
      exercise("d3-e2", "找最大值和最小值", "输入 5 个数，输出最大值和最小值。", "max/min 初始化为第一个元素最稳。", "从 i=1 开始比较，遇到更大或更小就更新。", `
int values[5] = {3, 8, 2, 6, 4};
int max = values[0];
int min = values[0];
for (int i = 1; i < 5; i++) {
    if (values[i] > max) max = values[i];
    if (values[i] < min) min = values[i];
}`, "不要把 max 初值随便写成 0，遇到负数数据会出错。", cChecklist, ["max/min 初值不合理", "从 i=0 重复比较也能跑但不清晰"], "输出最大值所在下标。"),
      exercise("d3-e3", "模拟 10 次 ADC 采样并求平均值", "输入 10 个 ADC 原始值，计算平均值。", "ADC 原始值常见范围是 0-4095。", "读 10 次，累加后除以 10.0。", `
int adc[10] = {0};
int sum = 0;
for (int i = 0; i < 10; i++) {
    scanf("%d", &adc[i]);
    sum += adc[i];
}
printf("avg=%.2f\\n", sum / 10.0);`, "后续会把 scanf 换成 HAL_ADC_GetValue。", cChecklist, ["数组长度和循环次数不一致"], "把平均 ADC 值换算成电压。"),
    ],
    selfTest: ["为什么数组下标不能写到 length？", "为什么平均值常用 float？", "ADC 平均滤波能解决什么问题？"],
    commonErrors: cCommon,
  }),
  lesson({
    day: 4,
    title: "函数",
    phase: "第一阶段：C 语言恢复训练",
    phaseId: "c",
    goal: "学会把重复逻辑封装成函数",
    objectives: ["理解参数和返回值", "能拆分小函数", "让 main 更像流程图"],
    concepts: ["函数名表达动作", "参数是输入", "返回值是输出", "声明、定义、调用"],
    comparison51: ["51 程序常见 Delay、KeyScan、Display", "函数让主循环更清楚"],
    stm32Implementation: ["CubeMX 生成的 MX_GPIO_Init、SystemClock_Config 都是函数", "HAL 库本质也是大量函数调用"],
    cubemxTips: ["后续可以在 USER CODE 区域写自己的业务函数", "不要把所有逻辑都塞进 while(1)"],
    codeFramework: trim(`
int get_max(int a, int b) {
    return a > b ? a : b;
}`),
    codeExplanation: "函数把“求最大值”这件事封装起来，主流程只需要调用它。",
    exercises: [
      exercise("d4-e1", "get_max 函数", "写 get_max(int a, int b)，返回较大的数。", "两个 int 参数，一个 int 返回值。", "函数内部可以用 if，也可以用三目运算符。", `
int get_max(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}`, "解决两个数比较。后续可扩展成三个数或数组最大值。", cChecklist, ["非 void 函数忘记 return"], "改成 get_max3。"),
      exercise("d4-e2", "calc_average 函数", "写 calc_average(int values[], int len)，返回数组平均值。", "数组作为参数时，通常还要传长度。", "返回值用 float，内部循环 sum。", `
float calc_average(int values[], int len) {
    int sum = 0;
    for (int i = 0; i < len; i++) {
        sum += values[i];
    }
    return sum / (float)len;
}`, "这是项目里平均滤波函数的基础版。", cChecklist, ["len 为 0 时除零", "数组长度写死"], "len <= 0 时返回 0。"),
      exercise("d4-e3", "check_alarm 函数", "写 check_alarm(value, threshold)，超过阈值返回 1。", "报警判断适合封装成 1/0。", "主函数根据返回值控制输出。", `
int check_alarm(int value, int threshold) {
    return value > threshold;
}`, "STM32 里可以用它决定 LED 或蜂鸣器是否打开。", cChecklist, ["函数名和功能不一致"], "加入低阈值报警。"),
    ],
    selfTest: ["参数和返回值分别是什么？", "为什么数组参数要传 len？", "函数拆分对调试有什么帮助？"],
    commonErrors: cCommon,
  }),
  lesson({
    day: 5,
    title: "指针基础",
    phase: "第一阶段：C 语言恢复训练",
    phaseId: "c",
    goal: "理解地址、指针、函数传参",
    objectives: ["理解 & 和 *", "能用指针修改外部变量", "看懂 &huart1 这类 HAL 写法"],
    concepts: ["变量地址", "指针变量", "& 取地址", "* 访问地址里的值", "传地址"],
    comparison51: ["51 里也有地址，只是入门代码常把它藏起来", "缓冲区、寄存器、外设句柄都离不开地址概念"],
    stm32Implementation: ["HAL_UART_Transmit(&huart1, ...) 把串口句柄地址交给 HAL", "HAL 通过这个地址知道操作哪个外设"],
    cubemxTips: ["今天先理解语义，不需要 CubeMX", "看到 &hadc1、&htim2，都读成“把这个外设对象的地址传进去”"],
    codeFramework: trim(`
int value = 10;
int *p = &value;
*p = 20;  /* value 变成 20 */
`),
    codeExplanation: "p 保存 value 的地址，*p 表示通过地址访问真实变量。",
    exercises: [
      exercise("d5-e1", "用函数交换两个变量", "写 swap(int *a, int *b)，交换两个整数变量。", "普通参数只能改副本，指针能改外部变量。", "调用时 swap(&x, &y)，函数内用 *a 和 *b。", `
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`, "这段代码解决“函数修改外部变量”的问题。", cChecklist, ["调用时忘记 &", "混淆 p 和 *p"], "写 add_one(int *value)。"),
      exercise("d5-e2", "用指针遍历数组", "用指针方式遍历数组并输出每个元素。", "数组名可以理解为首元素地址。", "p 从 arr 开始，每次 p++ 指向下一个元素。", `
int arr[3] = {10, 20, 30};
int *p = arr;
for (int i = 0; i < 3; i++) {
    printf("%d\\n", *(p + i));
}`, "不要求炫技，目的是理解数组和地址的关系。", cChecklist, ["指针越界", "未初始化指针"], "改成用 p++ 写法。"),
      exercise("d5-e3", "解释 &huart1 的意义", "用自己的话解释 HAL_UART_Transmit(&huart1, data, len, 100) 中 &huart1 的意义。", "huart1 是串口配置和状态的结构体变量。", "&huart1 是把这个变量的地址传给 HAL 函数。", `
/* 参考表达：
   huart1 是 USART1 的句柄变量。
   &huart1 表示把这个句柄的地址传给 HAL，
   HAL 通过它知道要操作哪个串口。
*/`, "这是 STM32 HAL 里非常常见的传参方式。", cChecklist, ["只背答案，不知道句柄是对象"], "再解释 &hadc1 和 &htim2。"),
    ],
    selfTest: ["& 和 * 分别做什么？", "为什么 swap 必须传地址？", "HAL 句柄为什么常用 &？"],
    commonErrors: cCommon,
  }),
  lesson({
    day: 6,
    title: "结构体",
    phase: "第一阶段：C 语言恢复训练",
    phaseId: "c",
    goal: "理解 STM32 HAL 里大量结构体的原因",
    objectives: ["会定义结构体", "知道 . 和 -> 的区别", "理解外设句柄的组织方式"],
    concepts: ["struct 打包相关数据", "typedef 简化类型名", ". 访问成员", "-> 访问结构体指针成员"],
    comparison51: ["51 小程序常用很多全局变量，规模一大容易乱", "结构体能把一个设备的状态放在一起"],
    stm32Implementation: ["GPIO_InitTypeDef、UART_HandleTypeDef 都是结构体", "CubeMX 会帮你填很多结构体字段"],
    cubemxTips: ["看到 Init 结构体不要慌，它就是配置集合", "先会用，再逐步理解字段"],
    codeFramework: trim(`
typedef struct {
    float temperature;
    float voltage;
    int alarm;
} SensorData;
`),
    codeExplanation: "结构体把传感器的多个属性放在一个变量里，便于传参和维护。",
    exercises: [
      exercise("d6-e1", "定义 SensorData 结构体", "包含 temperature、voltage、alarm 三个成员。", "温度和电压用 float，报警用 int。", "定义变量后用 data.temperature 访问。", `
typedef struct {
    float temperature;
    float voltage;
    int alarm;
} SensorData;`, "后续项目状态可以直接扩展这个结构体。", cChecklist, ["typedef 末尾忘分号", "成员名拼错"], "加入 sensor_id。"),
      exercise("d6-e2", "定义 LED 状态结构体", "保存 LED 是否亮、闪烁次数。", "is_on 用 0/1，blink_count 用 int。", "每次翻转后更新状态。", `
typedef struct {
    int is_on;
    int blink_count;
} LedState;`, "结构体能让状态集中，不散落在多个变量里。", cChecklist, ["状态变量分散"], "写 toggle_led_state 函数。"),
      exercise("d6-e3", "结构体作为函数参数", "写 print_sensor(SensorData data) 输出传感器状态。", "只读可以传值；要修改通常传指针。", "修改结构体时用 SensorData *data 和 data->alarm。", `
void print_sensor(SensorData data) {
    printf("T=%.1f V=%.2f alarm=%d\\n",
           data.temperature, data.voltage, data.alarm);
}`, "这是把显示逻辑从 main 中拆出来。", cChecklist, ["该传指针时传了值，修改无效"], "写 update_alarm(SensorData *data)。"),
    ],
    selfTest: ["结构体和数组有什么区别？", ". 和 -> 怎么选？", "HAL 为什么用结构体保存外设配置？"],
    commonErrors: cCommon,
  }),
  lesson({
    day: 7,
    title: "C 语言综合训练",
    phase: "第一阶段：C 语言恢复训练",
    phaseId: "c",
    goal: "模拟一个温度监测系统",
    difficulty: "综合",
    duration: "70-100 分钟",
    objectives: ["组合数组、函数和结构体", "从需求拆出小模块", "为 STM32 项目逻辑打底"],
    concepts: ["采样数组", "平均值函数", "状态结构体", "阈值报警"],
    comparison51: ["51 温控报警项目也可以这样拆模块", "先在电脑端模拟，比直接上板更容易排错"],
    stm32Implementation: ["后续把输入换成 ADC，把输出换成 OLED、串口、蜂鸣器", "业务逻辑可以先脱离硬件验证"],
    cubemxTips: ["今天不用 CubeMX", "明天开始看 STM32 工程结构"],
    codeFramework: trim(`
typedef struct {
    float average;
    int alarm;
} MonitorState;

float calc_average(int values[], int len);
int check_alarm(float value, float threshold);
`),
    codeExplanation: "综合题的重点不是代码长，而是把数据、计算、状态和输出拆清楚。",
    exercises: [
      exercise("d7-e1", "模拟温度监测系统", "数组保存 10 次数据，函数计算平均值，结构体保存状态，超过阈值报警。", "先写结构体，再写两个函数，最后写 main 串起来。", "主流程：输入 10 个数 -> 算平均 -> 判断报警 -> 打印状态。", `
typedef struct {
    float average;
    int alarm;
} MonitorState;

float calc_average(int values[], int len) {
    int sum = 0;
    for (int i = 0; i < len; i++) sum += values[i];
    return sum / (float)len;
}

int check_alarm(float value, float threshold) {
    return value > threshold;
}`, "这是 STM32 传感器报警项目的电脑端模型。", cChecklist, ["一上来全写进 main", "函数参数设计不清"], "加入最大值、最小值和任意一次超阈值报警。"),
    ],
    selfTest: ["需求可以拆成哪几个函数？", "为什么先电脑端模拟？", "结构体保存状态有什么好处？"],
    commonErrors: cCommon,
  }),
  lesson({
    day: 8,
    title: "STM32 工程结构",
    phase: "第二阶段：STM32 基础外设入门",
    phaseId: "stm32",
    goal: "理解 STM32 工程基本组成",
    objectives: ["看懂 main.c", "理解 HAL_Init、SystemClock_Config、MX_GPIO_Init", "知道 USER CODE 区域"],
    concepts: ["main.c", "while(1)", "HAL_Init", "SystemClock_Config", "MX_GPIO_Init", "USER CODE BEGIN / END"],
    comparison51: ["51 程序也是初始化后进入 while(1)", "STM32 初始化更多，CubeMX 帮你生成一部分"],
    stm32Implementation: ["HAL_Init 初始化 HAL 和 SysTick", "SystemClock_Config 配置时钟", "MX_GPIO_Init 初始化 GPIO"],
    cubemxTips: ["新建 STM32F103 工程", "先保持默认时钟也可以", "观察 main.c 中哪些区域可以写用户代码"],
    codeFramework: trim(`
int main(void) {
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();

    while (1) {
        /* USER CODE BEGIN WHILE */
        /* USER CODE END WHILE */
    }
}`),
    codeExplanation: "这是一切 STM32 HAL 工程的骨架。先初始化，再进入永不退出的主循环。",
    exercises: [
      exercise("d8-e1", "标注 main.c 初始化流程", "用自己的话说明 HAL_Init、SystemClock_Config、MX_GPIO_Init、while(1) 各做什么。", "按“HAL -> 时钟 -> 外设 -> 主循环”理解。", "不要急着改工程，先读懂启动顺序和用户代码区域。", `
HAL_Init：初始化 HAL 库和 SysTick。
SystemClock_Config：配置系统时钟。
MX_GPIO_Init：初始化 GPIO。
while(1)：主循环，持续执行任务。`, "这是读工程的第一步。看懂骨架，后面调试会少很多慌。", stm32Checklist, ["把用户代码写到会被覆盖的位置"], "找出工程中所有 USER CODE BEGIN/END。"),
    ],
    selfTest: ["为什么 CubeMX 需要 USER CODE 区域？", "while(1) 和电脑程序结束有什么不同？", "SystemClock_Config 大概负责什么？"],
    commonErrors: stm32Common,
  }),
  lesson({
    day: 9,
    title: "GPIO 输出",
    phase: "第二阶段：STM32 基础外设入门",
    phaseId: "stm32",
    goal: "实现 LED 点灯",
    objectives: ["理解 GPIO 输出模式", "会用 WritePin 和 TogglePin", "完成 LED 闪烁"],
    concepts: ["GPIO 输出模式", "GPIO_PIN_SET / RESET", "HAL_GPIO_WritePin", "HAL_GPIO_TogglePin"],
    comparison51: ["51 点灯常操作 P1^0", "STM32 写引脚要给端口 GPIOx 和引脚 GPIO_PIN_x"],
    stm32Implementation: ["WritePin 设置固定电平", "TogglePin 翻转当前电平", "HAL_Delay 做毫秒延时"],
    cubemxTips: ["把 LED 引脚设为 GPIO_Output", "给引脚起 LED_Pin 标签", "确认板载 LED 是高电平亮还是低电平亮"],
    codeFramework: trim(`
while (1) {
    HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    HAL_Delay(500);
}`),
    codeExplanation: "每 500ms 翻转一次 LED。端口和引脚名来自 CubeMX 用户标签。",
    exercises: [
      exercise("d9-e1", "LED 每 500ms 翻转一次", "在 while(1) 中让 LED 每 500ms 翻转一次。", "需要 TogglePin 和 HAL_Delay。", "确认 LED_GPIO_Port、LED_Pin 和 CubeMX 标签一致。", `
while (1) {
    HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    HAL_Delay(500);
}`, "这段代码解决基础闪烁。你需要根据自己的板子改引脚名。", stm32Checklist, ["端口和引脚写反", "LED 有源电平判断反了"], "改成 100ms 快闪和 1000ms 慢闪。"),
    ],
    selfTest: ["WritePin 和 TogglePin 有什么区别？", "为什么需要端口和引脚两个参数？", "HAL_Delay(500) 是多久？"],
    commonErrors: stm32Common,
  }),
  lesson({
    day: 10,
    title: "GPIO 输入",
    phase: "第二阶段：STM32 基础外设入门",
    phaseId: "stm32",
    goal: "实现按键读取",
    objectives: ["理解输入模式", "理解上拉下拉", "完成按键控制 LED"],
    concepts: ["上拉", "下拉", "输入模式", "按键抖动", "HAL_GPIO_ReadPin"],
    comparison51: ["51 按键常用上拉，按下接地读 0", "STM32 也要先确认默认电平和按下电平"],
    stm32Implementation: ["ReadPin 返回 GPIO_PIN_SET 或 RESET", "根据按键状态 WritePin 控制 LED"],
    cubemxTips: ["按键引脚设为 GPIO_Input", "按硬件选择 Pull-up 或 Pull-down", "LED 引脚保持输出"],
    codeFramework: trim(`
if (HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin) == GPIO_PIN_RESET) {
    HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);
} else {
    HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET);
}`),
    codeExplanation: "常见按键按下接地，所以按下读 RESET。你的板子如果相反，需要改判断条件。",
    exercises: [
      exercise("d10-e1", "按键按下 LED 亮，松开 LED 灭", "读取按键状态，控制 LED。", "先确认按下时读 0 还是 1。", "如果按键接地并启用上拉，按下通常是 GPIO_PIN_RESET。", `
while (1) {
    if (HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin) == GPIO_PIN_RESET) {
        HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);
    } else {
        HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET);
    }
}`, "这段代码解决轮询按键。真实项目中还要考虑消抖。", stm32Checklist, ["没有配置上下拉", "按下电平判断反了"], "加入 20ms 简单消抖。"),
    ],
    selfTest: ["上拉和下拉解决什么问题？", "按键为什么会抖动？", "ReadPin 返回什么？"],
    commonErrors: stm32Common,
  }),
  lesson({
    day: 11,
    title: "外部中断 EXTI",
    phase: "第二阶段：STM32 基础外设入门",
    phaseId: "stm32",
    goal: "理解中断思想",
    objectives: ["理解中断和轮询的区别", "知道 NVIC 的作用", "会写 EXTI 回调"],
    concepts: ["EXTI", "NVIC", "触发沿", "回调函数", "中断里保持短小"],
    comparison51: ["51 有 INT0/INT1 外部中断", "STM32 配置更细：引脚、触发沿、NVIC、回调"],
    stm32Implementation: ["HAL_GPIO_EXTI_Callback 处理 GPIO 外部中断", "判断 GPIO_Pin 决定是哪一个引脚触发"],
    cubemxTips: ["按键引脚设为 GPIO_EXTI", "选择下降沿或上升沿", "启用对应 EXTI 的 NVIC"],
    codeFramework: trim(`
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin) {
    if (GPIO_Pin == KEY_Pin) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }
}`),
    codeExplanation: "中断发生后 HAL 会调用回调函数。回调里先判断引脚，避免多个中断混淆。",
    exercises: [
      exercise("d11-e1", "按键中断控制 LED 翻转", "按键触发 EXTI，中断回调中翻转 LED。", "回调不是你在 main 中手动调用的。", "CubeMX 里要同时配置 EXTI 和 NVIC。", `
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin) {
    if (GPIO_Pin == KEY_Pin) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }
}`, "这段代码解决事件触发，不需要 while(1) 一直轮询。", stm32Checklist, ["忘记开 NVIC", "回调函数名字写错"], "加入按键次数计数。"),
    ],
    selfTest: ["中断和轮询有什么区别？", "NVIC 负责什么？", "为什么中断里不要长延时？"],
    commonErrors: stm32Common,
  }),
  lesson({
    day: 12,
    title: "串口 USART",
    phase: "第二阶段：STM32 基础外设入门",
    phaseId: "stm32",
    goal: "实现串口输出",
    objectives: ["理解 TX/RX 和波特率", "会用串口输出日志", "结合按键输出状态"],
    concepts: ["TX / RX", "波特率", "8N1", "HAL_UART_Transmit", "&huart1"],
    comparison51: ["51 串口常接触 SBUF、TI、RI", "STM32 入门先用 HAL_UART_Transmit 跑通发送"],
    stm32Implementation: ["HAL_UART_Transmit(&huart1, data, len, timeout)", "串口日志是嵌入式调试基本功"],
    cubemxTips: ["启用 USART1 Asynchronous", "设置 115200 8N1", "USB-TTL 要 TX/RX 交叉并共地"],
    codeFramework: trim(`
uint8_t msg[] = "Hello STM32\\r\\n";
HAL_UART_Transmit(&huart1, msg, sizeof(msg) - 1, 100);
`),
    codeExplanation: "初始化后发送一次字符串。sizeof(msg)-1 避免把字符串结束符也发出去。",
    exercises: [
      exercise("d12-e1", "串口输出 Hello STM32", "程序启动后通过串口发送 Hello STM32。", "放在初始化之后、while(1) 之前可以只发一次。", "确认串口助手波特率和 CubeMX 一致。", `
uint8_t msg[] = "Hello STM32\\r\\n";
HAL_UART_Transmit(&huart1, msg, sizeof(msg) - 1, 100);`, "这段代码解决最小串口发送。你需要改 huart 和波特率配置。", stm32Checklist, ["TX/RX 没交叉", "波特率不一致"], "改成每秒发送计数值。"),
      exercise("d12-e2", "按键后串口输出状态", "按键按下时串口输出 KEY PRESSED。", "可以先用轮询按键，不急着结合中断。", "为了避免刷屏，按下后加短延时或等待松手。", `
if (HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin) == GPIO_PIN_RESET) {
    uint8_t msg[] = "KEY PRESSED\\r\\n";
    HAL_UART_Transmit(&huart1, msg, sizeof(msg) - 1, 100);
    HAL_Delay(200);
}`, "这段代码解决输入事件日志。真实项目里可以记录 NORMAL / ALARM。", stm32Checklist, ["一直按住导致刷屏"], "输出 LED 当前状态。"),
    ],
    selfTest: ["波特率不一致会怎样？", "&huart1 是什么意思？", "为什么串口调试比只看 LED 更有信息量？"],
    commonErrors: stm32Common,
  }),
  lesson({
    day: 13,
    title: "定时器 TIM",
    phase: "第二阶段：STM32 基础外设入门",
    phaseId: "stm32",
    goal: "理解定时器周期",
    objectives: ["理解 PSC 和 ARR", "启动定时器中断", "用定时器闪烁 LED"],
    concepts: ["PSC 预分频", "ARR 自动重装载", "定时中断", "PeriodElapsed 回调"],
    comparison51: ["51 定时器也有装初值和溢出中断", "STM32 用 PSC/ARR 配周期更直观"],
    stm32Implementation: ["HAL_TIM_Base_Start_IT 启动中断", "HAL_TIM_PeriodElapsedCallback 处理溢出"],
    cubemxTips: ["启用 TIM2 Internal Clock", "设置 Prescaler 和 Counter Period", "打开 TIM2 global interrupt"],
    codeFramework: trim(`
HAL_TIM_Base_Start_IT(&htim2);

void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
    if (htim->Instance == TIM2) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }
}`),
    codeExplanation: "定时器到周期后触发中断，在回调里翻转 LED。多个定时器共用回调时要判断来源。",
    exercises: [
      exercise("d13-e1", "用定时器中断实现 LED 闪烁", "启动 TIM2 中断，在周期回调里翻转 LED。", "Start_IT 要放在初始化之后。", "回调里判断 htim->Instance，避免多个定时器混在一起。", `
HAL_TIM_Base_Start_IT(&htim2);

void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
    if (htim->Instance == TIM2) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }
}`, "这段代码解决稳定周期任务，比在 while(1) 里 Delay 更适合扩展。", stm32Checklist, ["忘记 Start_IT", "没开 NVIC", "PSC/ARR 差 1"], "把闪烁周期改为 200ms。"),
    ],
    selfTest: ["PSC 和 ARR 分别控制什么？", "定时器比 HAL_Delay 好在哪里？", "htim->Instance 有什么作用？"],
    commonErrors: stm32Common,
  }),
  lesson({
    day: 14,
    title: "PWM",
    phase: "第二阶段：STM32 基础外设入门",
    phaseId: "stm32",
    goal: "理解频率和占空比",
    objectives: ["理解 PWM 平均效果", "控制 LED 亮度", "实现简单呼吸灯"],
    concepts: ["PWM 频率", "占空比", "比较值", "HAL_TIM_PWM_Start"],
    comparison51: ["51 可用定时器软件模拟 PWM", "STM32 定时器硬件 PWM 更稳定"],
    stm32Implementation: ["HAL_TIM_PWM_Start 启动通道", "__HAL_TIM_SET_COMPARE 修改比较值", "比较值与 ARR 的比例决定占空比"],
    cubemxTips: ["TIM 通道设为 PWM Generation", "设置 ARR 例如 999", "GPIO 会变成复用输出"],
    codeFramework: trim(`
HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
__HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, 500);
`),
    codeExplanation: "如果 ARR 是 999，比较值 500 约等于 50% 占空比。",
    exercises: [
      exercise("d14-e1", "PWM 控制 LED 亮度", "启动 PWM，把比较值设为 ARR 的一半。", "先固定亮度，跑通后再动态变化。", "如果 ARR=999，50% 占空比约写 500。", `
HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
__HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, 500);`, "这段代码解决固定亮度。你需要改定时器句柄和通道。", stm32Checklist, ["PWM 没 Start", "比较值超过 ARR"], "改成 10%、50%、90% 三档亮度。"),
      exercise("d14-e2", "实现简单呼吸灯", "逐步增加和减少比较值，让 LED 亮度变化。", "需要 duty 和 step。", "到达上限后 step 取反，到达下限后再取反。", `
int duty = 0;
int step = 10;
while (1) {
    __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, duty);
    duty += step;
    if (duty >= 999 || duty <= 0) {
        step = -step;
    }
    HAL_Delay(10);
}`, "这段代码展示呼吸思路。真实工程中可用定时器中断更新 duty。", stm32Checklist, ["边界判断导致 duty 越界"], "调节 step 和 delay 改变呼吸速度。"),
    ],
    selfTest: ["占空比是什么意思？", "PWM 为什么能调亮度？", "比较值和 ARR 有什么关系？"],
    commonErrors: stm32Common,
  }),
];

const projectConfigs: Array<{
  day: number;
  title: string;
  goal: string;
  concepts: string[];
  cubemxTips: string[];
  codeFramework: string;
  exerciseTitle: string;
  exercisePrompt: string;
  referenceCode: string;
  codeNote: string;
}> = [
  {
    day: 15,
    title: "ADC 采集项目：读取原始值",
    goal: "采集电位器电压，串口输出 ADC 原始值",
    concepts: ["ADC 原始值", "采样时间", "轮询转换", "串口日志"],
    cubemxTips: ["启用 ADC1 通道", "启用 USART1", "电位器中间脚接 ADC 输入"],
    codeFramework: "uint32_t raw = read_adc_raw();",
    exerciseTitle: "封装 read_adc_raw",
    exercisePrompt: "写一个函数读取 ADC 原始值，先通过串口观察数值是否随电位器变化。",
    referenceCode: `
uint32_t read_adc_raw(void) {
    HAL_ADC_Start(&hadc1);
    if (HAL_ADC_PollForConversion(&hadc1, 10) == HAL_OK) {
        return HAL_ADC_GetValue(&hadc1);
    }
    return 0;
}`,
    codeNote: "先跑通 raw，再谈电压换算。不要一开始就加太多功能。",
  },
  {
    day: 16,
    title: "ADC 采集项目：计算电压值",
    goal: "把 0-4095 原始值换算为 0-3.3V 电压",
    concepts: ["12 位 ADC", "参考电压", "浮点换算", "格式化输出"],
    cubemxTips: ["确认 ADC 分辨率为 12 bit", "参考电压按板子实际供电估算", "串口输出保留两位小数"],
    codeFramework: "float voltage = raw * 3.3f / 4095.0f;",
    exerciseTitle: "ADC 原始值转电压",
    exercisePrompt: "把 ADC 原始值换算为电压，并通过串口输出。",
    referenceCode: `
float adc_to_voltage(uint32_t raw) {
    return raw * 3.3f / 4095.0f;
}`,
    codeNote: "这段代码解决单位换算。你需要根据参考电压修改 3.3f。",
  },
  {
    day: 17,
    title: "ADC 采集项目：平均滤波",
    goal: "连续采样多次，计算平均值降低抖动",
    concepts: ["采样数组", "平均滤波", "噪声抖动", "采样窗口"],
    cubemxTips: ["先保持单通道 ADC", "采样间隔不要太短", "串口对比滤波前后数值"],
    codeFramework: "uint32_t filtered = read_adc_average(10);",
    exerciseTitle: "加入平均滤波",
    exercisePrompt: "连续读取 10 次 ADC，返回平均值。",
    referenceCode: `
uint32_t read_adc_average(uint8_t times) {
    uint32_t sum = 0;
    for (uint8_t i = 0; i < times; i++) {
        sum += read_adc_raw();
        HAL_Delay(2);
    }
    return sum / times;
}`,
    codeNote: "平均滤波能减小随机抖动，但会牺牲一点响应速度。",
  },
  {
    day: 18,
    title: "OLED 显示项目：显示基础数据",
    goal: "显示温度、电压、状态",
    concepts: ["OLED 驱动", "显示坐标", "刷新频率", "字符串格式化"],
    cubemxTips: ["根据 OLED 模块启用 I2C 或 SPI", "检查 SCL/SDA 接线和上拉", "先显示固定字符串"],
    codeFramework: "show_sensor_page(voltage, alarm);",
    exerciseTitle: "显示电压和状态",
    exercisePrompt: "在 OLED 上显示电压值和 NORMAL/ALARM 状态。",
    referenceCode: `
void show_sensor_page(float voltage, int alarm) {
    OLED_Clear();
    OLED_ShowString(0, 0, "Voltage:");
    OLED_ShowString(0, 2, alarm ? "ALARM" : "NORMAL");
    OLED_Update();
}`,
    codeNote: "OLED 函数名要按你的驱动库替换，先把页面结构想清楚。",
  },
  {
    day: 19,
    title: "OLED 显示项目：页面切换逻辑",
    goal: "设计 page 变量和不同页面内容",
    concepts: ["页面状态", "状态机雏形", "页面编号", "显示刷新"],
    cubemxTips: ["显示外设保持不变", "按键可先用变量模拟", "每个页面只显示核心信息"],
    codeFramework: "page = (page + 1) % 3;",
    exerciseTitle: "设计三页显示",
    exercisePrompt: "设计 page=0/1/2 三个页面，分别显示实时值、阈值、系统状态。",
    referenceCode: `
void show_page(uint8_t page) {
    if (page == 0) show_value_page();
    else if (page == 1) show_threshold_page();
    else show_status_page();
}`,
    codeNote: "页面逻辑要简单清楚，不要把所有显示内容挤在一页。",
  },
  {
    day: 20,
    title: "OLED 显示项目：按键切换页面",
    goal: "用按键改变 page 并刷新显示",
    concepts: ["按键消抖", "页面切换", "边沿触发", "状态更新"],
    cubemxTips: ["按键配置为输入或 EXTI", "先轮询实现，再考虑中断", "按下后等待松手避免连跳"],
    codeFramework: "if (key_pressed()) page = (page + 1) % 3;",
    exerciseTitle: "按键切换 OLED 页面",
    exercisePrompt: "按键每按一次切换到下一页。",
    referenceCode: `
if (HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin) == GPIO_PIN_RESET) {
    HAL_Delay(20);
    if (HAL_GPIO_ReadPin(KEY_GPIO_Port, KEY_Pin) == GPIO_PIN_RESET) {
        page = (page + 1) % 3;
        show_page(page);
    }
}`,
    codeNote: "这是简单消抖版。真实项目中还要处理等待松手。",
  },
  {
    day: 21,
    title: "传感器 + 报警系统：采集与阈值",
    goal: "温度或光敏传感器采集，设置报警阈值",
    concepts: ["传感器采集", "阈值判断", "状态变量", "标定"],
    cubemxTips: ["传感器可先接 ADC", "阈值先写成宏或常量", "串口输出原始值方便标定"],
    codeFramework: "alarm = sensor_value > threshold;",
    exerciseTitle: "封装报警判断",
    exercisePrompt: "根据传感器值和阈值更新报警状态。",
    referenceCode: `
int check_alarm(float value, float threshold) {
    return value > threshold;
}`,
    codeNote: "阈值不是拍脑袋，先观察正常值范围再设置。",
  },
  {
    day: 22,
    title: "传感器 + 报警系统：蜂鸣器报警",
    goal: "超过阈值后驱动蜂鸣器或 LED",
    concepts: ["GPIO 输出", "报警动作", "有源/无源蜂鸣器", "恢复条件"],
    cubemxTips: ["蜂鸣器引脚设为 GPIO_Output", "确认高电平响还是低电平响", "先用 LED 替代蜂鸣器验证"],
    codeFramework: "set_alarm_output(alarm);",
    exerciseTitle: "控制蜂鸣器输出",
    exercisePrompt: "alarm 为 1 时打开蜂鸣器，否则关闭。",
    referenceCode: `
void set_alarm_output(int alarm) {
    HAL_GPIO_WritePin(BEEP_GPIO_Port, BEEP_Pin,
                      alarm ? GPIO_PIN_SET : GPIO_PIN_RESET);
}`,
    codeNote: "如果你的蜂鸣器低电平响，需要把 SET/RESET 反过来。",
  },
  {
    day: 23,
    title: "传感器 + 报警系统：串口状态日志",
    goal: "周期输出正常/报警状态日志",
    concepts: ["运行日志", "状态文本", "周期输出", "调试证据"],
    cubemxTips: ["USART 保持 115200", "日志不要刷太快", "输出 raw、voltage、alarm 三类信息"],
    codeFramework: "log_state(value, alarm);",
    exerciseTitle: "输出状态日志",
    exercisePrompt: "每秒通过串口输出当前传感器值和报警状态。",
    referenceCode: `
void log_state(float value, int alarm) {
    char buf[64];
    snprintf(buf, sizeof(buf), "value=%.2f status=%s\\r\\n",
             value, alarm ? "ALARM" : "NORMAL");
    HAL_UART_Transmit(&huart1, (uint8_t *)buf, strlen(buf), 100);
}`,
    codeNote: "日志是项目调试的眼睛。没有日志，很多问题只能猜。",
  },
  {
    day: 24,
    title: "综合项目：需求拆解",
    goal: "拆解轨道交通设备状态监测小系统模块",
    concepts: ["项目需求", "模块拆解", "外设映射", "数据流"],
    cubemxTips: ["先列出 ADC、OLED、USART、GPIO、KEY", "一次只配置一个新增外设", "保留每个模块的最小验证代码"],
    codeFramework: "采集 -> 滤波 -> 判断 -> 显示 -> 报警 -> 日志",
    exerciseTitle: "画出系统数据流",
    exercisePrompt: "用文字画出输入、处理、输出和每个外设的职责。",
    referenceCode: `
/*
输入：模拟传感器 ADC、按键
处理：平均滤波、阈值判断、页面状态
输出：OLED、串口日志、LED/蜂鸣器
*/`,
    codeNote: "今天重点不是写长代码，而是把系统边界想清楚。",
  },
  {
    day: 25,
    title: "综合项目：数据采集与滤波",
    goal: "实现模拟传感器采集和平均滤波",
    concepts: ["采集函数", "滤波函数", "数据结构", "周期任务"],
    cubemxTips: ["复用 ADC 项目配置", "串口输出滤波前后数值", "先不接 OLED，降低变量"],
    codeFramework: "state.filtered_value = read_adc_average(10);",
    exerciseTitle: "更新设备状态数据",
    exercisePrompt: "把采集值和滤波值保存到 DeviceState 结构体。",
    referenceCode: `
typedef struct {
    float sensor_value;
    float filtered_value;
    int alarm;
    uint8_t page;
} DeviceState;`,
    codeNote: "结构体让项目状态集中，后续显示、报警、日志都读同一份状态。",
  },
  {
    day: 26,
    title: "综合项目：显示与页面",
    goal: "OLED 显示设备状态，按键切换页面",
    concepts: ["页面状态", "显示函数", "按键切换", "信息层级"],
    cubemxTips: ["OLED 和按键先单独跑通", "页面刷新不要太频繁", "页面内容保持可读"],
    codeFramework: "app_display(&state);",
    exerciseTitle: "封装 app_display",
    exercisePrompt: "根据 state.page 显示不同页面。",
    referenceCode: `
void app_display(const DeviceState *state) {
    if (state->page == 0) show_value_page(state);
    else if (state->page == 1) show_alarm_page(state);
    else show_log_page(state);
}`,
    codeNote: "显示函数只负责显示，不要在里面采集 ADC。",
  },
  {
    day: 27,
    title: "综合项目：报警与日志",
    goal: "阈值报警，LED/蜂鸣器动作，串口输出运行日志",
    concepts: ["报警状态", "日志节流", "输出控制", "联调"],
    cubemxTips: ["GPIO 输出、USART、ADC 都要复测", "串口日志每 500ms 或 1s 一次", "报警输出先用 LED 验证"],
    codeFramework: "app_alarm(&state); app_log(&state);",
    exerciseTitle: "联动报警和日志",
    exercisePrompt: "超过阈值后打开报警输出，并通过串口输出 ALARM 日志。",
    referenceCode: `
void app_alarm(DeviceState *state, float threshold) {
    state->alarm = state->filtered_value > threshold;
    HAL_GPIO_WritePin(ALARM_GPIO_Port, ALARM_Pin,
                      state->alarm ? GPIO_PIN_SET : GPIO_PIN_RESET);
}`,
    codeNote: "报警、显示、日志都读 state->alarm，避免三处判断不一致。",
  },
  {
    day: 28,
    title: "综合项目：整理与简历总结",
    goal: "生成适合写进简历的项目描述",
    concepts: ["项目复盘", "测试记录", "简历表达", "可扩展方向"],
    cubemxTips: ["截图保留 CubeMX 配置", "记录串口日志和 OLED 效果", "整理外设清单和调试问题"],
    codeFramework: "项目描述 = 背景 + 外设 + 算法 + 调试 + 结果",
    exerciseTitle: "写简历项目描述",
    exercisePrompt: "用 5 行以内描述轨道交通设备状态监测小系统。",
    referenceCode: `
基于 STM32F103 与 HAL 库实现设备状态监测小系统：
使用 ADC 采集模拟传感器数据，加入平均滤波；
通过 OLED 显示状态，USART 输出运行日志；
超过阈值后驱动 LED/蜂鸣器报警；
支持按键切换页面，完成模块化联调。`,
    codeNote: "简历描述要写你解决了什么问题，而不是堆外设名字。",
  },
];

for (const item of projectConfigs) {
  const isAdc = item.day <= 17;
  const isOled = item.day >= 18 && item.day <= 20;
  const isAlarm = item.day >= 21 && item.day <= 23;
  const comparison51 = isAdc
    ? ["51 也可以接外部 ADC，本质都是把模拟量变成数字量", "STM32F103 常见 ADC 是 12 位，数据范围通常是 0-4095"]
    : isOled
      ? ["51 也常接 OLED、1602 或数码管，页面思想完全通用", "STM32 只是接口和库函数更丰富"]
      : isAlarm
        ? ["51 报警项目也是采样、判断、输出", "STM32 项目更适合用结构体和串口日志管理状态"]
        : ["51 项目也要先拆模块，否则功能一多就乱", "STM32 综合项目更强调工程结构、调试日志和可维护性"];

  const stm32Implementation = isAdc
    ? ["HAL_ADC_Start", "HAL_ADC_PollForConversion", "HAL_ADC_GetValue", "USART 输出采样日志"]
    : isOled
      ? ["调用 OLED 驱动库显示字符串和数值", "用 page 变量选择页面", "按键改变 page 后刷新"]
      : isAlarm
        ? ["ADC 或 GPIO 获取传感器值", "if 判断阈值", "GPIO 控制蜂鸣器/LED", "USART 输出状态"]
        : ["ADC 采集模拟传感器", "OLED 显示状态", "USART 输出日志", "GPIO 报警", "按键切换页面"];

  lessons.push(
    lesson({
      day: item.day,
      title: item.title,
      phase: "第三阶段：STM32 项目式训练",
      phaseId: "project" as PhaseId,
      goal: item.goal,
      difficulty: item.day >= 24 ? "综合" : "进阶",
      duration: item.day >= 24 ? "80-120 分钟" : "60-90 分钟",
      objectives: [item.goal, "坚持先理解，再写代码，再检查，再变式练习", "把结果记录成项目素材"],
      concepts: item.concepts,
      comparison51,
      stm32Implementation,
      cubemxTips: item.cubemxTips,
      codeFramework: trim(item.codeFramework),
      codeExplanation: item.codeNote,
      exercises: [
        exercise(
          `d${item.day}-e1`,
          item.exerciseTitle,
          item.exercisePrompt,
          "先做最小可验证版本，不要一开始合并全部模块。",
          "写清楚输入、处理、输出，再决定函数参数和返回值。",
          item.referenceCode,
          item.codeNote,
          projectChecklist,
          ["跳过单模块验证", "没有串口日志", "变量命名和模块职责不清"],
          "把今天成果写成 3 行项目日志：完成了什么、遇到什么问题、下一步做什么。"
        ),
      ],
      selfTest: ["今天的输入、处理、输出分别是什么？", "如果功能不工作，你会先验证哪一层？", "这一天的成果能否写进项目日志？"],
      commonErrors: projectCommon,
    })
  );
}

export const lessonMap = Object.fromEntries(lessons.map((item) => [item.day, item])) as Record<number, Lesson>;

export const phaseRanges = [
  { id: "c" as const, title: "C 语言恢复训练", range: "Day 1-7", days: [1, 7], tone: "from-sky-400 to-cyan-300" },
  { id: "stm32" as const, title: "STM32 基础外设入门", range: "Day 8-14", days: [8, 14], tone: "from-indigo-400 to-blue-300" },
  { id: "project" as const, title: "STM32 项目式训练", range: "Day 15-28", days: [15, 28], tone: "from-violet-400 to-emerald-300" },
];

export function getLesson(day: number): Lesson {
  return lessonMap[day] ?? lessonMap[1];
}

