import type { ProjectPhase } from "../types";

export const projectProfile = {
  name: "轨道交通设备状态监测小系统",
  finalEffect:
    "系统能读取模拟传感器数据，判断设备状态，异常时点亮 LED 或驱动蜂鸣器，并通过串口输出状态信息。",
  reassurance:
    "现在还不会 ADC、串口、按键和报警完全没关系。项目页不是催你马上做完，而是告诉你前面每一天在为哪个模块做准备。",
  prerequisites: [
    "C 语言：变量、if、循环、函数、结构体",
    "GPIO：输入、输出、高低电平、上拉下拉",
    "STM32：GPIO、串口、定时器、ADC",
    "调试习惯：先做最小实验，再逐步整合",
  ],
  resumeTemplate:
    "基于 STM32 设计并实现轨道交通设备状态监测小系统，完成 GPIO 报警控制、按键输入、ADC 模拟量采集和串口状态输出等功能。通过模块化程序设计实现设备状态判断和报警逻辑，掌握了 STM32CubeMX 配置、HAL 库调用及基础外设调试流程。",
};

export const projectPhases: ProjectPhase[] = [
  {
    id: "analysis",
    dayRange: "Day 29",
    title: "项目需求分析",
    goal: "先说清楚系统要解决什么问题。",
    prerequisites: ["Day 11-17：单片机、GPIO、主循环"],
    tasks: ["写出输入", "写出输出", "列出要用的外设"],
    deliverable: "一张很清楚的项目草图",
  },
  {
    id: "alarm",
    dayRange: "Day 30",
    title: "LED + 蜂鸣器报警模块",
    goal: "先把最容易验证的输出模块做稳。",
    prerequisites: ["Day 19-21：GPIO 输出"],
    tasks: ["LED 常亮", "蜂鸣器开关", "封装 Alarm_On / Alarm_Off"],
    deliverable: "一个能被代码控制的报警模块",
  },
  {
    id: "key",
    dayRange: "Day 31",
    title: "按键控制模块",
    goal: "加入人机输入，让系统能切换状态。",
    prerequisites: ["Day 15、22、23：按键输入"],
    tasks: ["读取按键", "判断按下电平", "加入简单消抖"],
    deliverable: "按键能稳定触发状态切换",
  },
  {
    id: "adc",
    dayRange: "Day 32",
    title: "ADC 采集模块",
    goal: "读取模拟量并做阈值判断。",
    prerequisites: ["Day 7、28：数组和 ADC"],
    tasks: ["读取原始值", "换算电压", "比较阈值"],
    deliverable: "能得到一个可解释的传感器值",
  },
  {
    id: "log",
    dayRange: "Day 33",
    title: "串口日志模块",
    goal: "让系统把内部状态说出来。",
    prerequisites: ["Day 25：USART"],
    tasks: ["输出采样值", "输出报警状态", "规范日志文字"],
    deliverable: "串口里能看到清楚日志",
  },
  {
    id: "integration",
    dayRange: "Day 34",
    title: "系统整合",
    goal: "把输入、判断、输出串成一个完整主循环。",
    prerequisites: ["Day 16、24、26：主循环、中断、定时器"],
    tasks: ["统一状态变量", "组合多个模块", "排查常见 bug"],
    deliverable: "完整系统能稳定运行",
  },
  {
    id: "summary",
    dayRange: "Day 35",
    title: "总结与简历描述",
    goal: "把做过的事情说清楚。",
    prerequisites: ["前面 34 天的学习记录"],
    tasks: ["总结功能", "总结技术栈", "写简历描述"],
    deliverable: "一段可直接使用的项目表达",
  },
];
