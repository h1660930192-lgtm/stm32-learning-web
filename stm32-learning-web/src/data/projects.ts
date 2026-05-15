import type { ProjectPhase } from "../types";

export const projectProfile = {
  name: "轨道交通设备状态监测小系统",
  background:
    "模拟轨道交通设备运行中的状态监测场景：采集模拟传感器数据，判断是否异常，并通过显示、日志和报警输出让状态可见。",
  features: [
    "采集模拟传感器数据",
    "OLED 显示设备状态",
    "串口输出运行日志",
    "超过阈值后 LED 或蜂鸣器报警",
    "按键切换显示页面",
    "整理为可写进简历的小项目",
  ],
  hardwareModules: ["STM32F103 或常见入门板", "电位器 / 温度 / 光敏传感器", "OLED 显示屏", "蜂鸣器或 LED", "独立按键", "USB-TTL 串口模块"],
  softwareModules: ["adc_service", "filter_service", "alarm_service", "display_service", "key_service", "log_service", "app_state"],
  peripheralMap: [
    { peripheral: "ADC", usage: "采集模拟传感器数据" },
    { peripheral: "I2C / SPI", usage: "驱动 OLED 显示" },
    { peripheral: "USART", usage: "输出运行日志和调试信息" },
    { peripheral: "GPIO Output", usage: "控制 LED 或蜂鸣器报警" },
    { peripheral: "GPIO Input / EXTI", usage: "按键切换显示页面" },
    { peripheral: "TIM / SysTick", usage: "周期采样、日志节流、简单消抖" },
  ],
  resumeTemplate:
    "基于 STM32F103 与 HAL 库实现轨道交通设备状态监测小系统，使用 ADC 采集模拟传感器数据并进行平均滤波，通过 OLED 显示设备状态、USART 输出运行日志，超过阈值后驱动 LED/蜂鸣器报警，并支持按键切换页面。项目采用模块化结构完成采集、显示、报警和日志联调。",
};

export const projectPhases: ProjectPhase[] = [
  {
    id: "adc",
    dayRange: "Day 15-17",
    title: "ADC 采集项目",
    goal: "从电位器或模拟传感器读取原始值，换算电压并加入平均滤波。",
    tasks: ["读取 ADC 原始值", "串口输出 raw 数据", "换算电压值", "加入 10 次平均滤波"],
    deliverable: "能通过串口看到稳定变化的传感器数据。",
  },
  {
    id: "oled",
    dayRange: "Day 18-20",
    title: "OLED 显示项目",
    goal: "把传感器值、阈值和设备状态做成可切换页面。",
    tasks: ["显示固定字符串", "显示电压和状态", "设计 page 页面变量", "按键切换页面"],
    deliverable: "OLED 能显示实时值和 NORMAL / ALARM 状态。",
  },
  {
    id: "alarm",
    dayRange: "Day 21-23",
    title: "传感器 + 报警系统",
    goal: "根据阈值判断异常，触发蜂鸣器或 LED，并输出串口日志。",
    tasks: ["设置阈值", "封装 check_alarm", "驱动蜂鸣器或 LED", "周期输出状态日志"],
    deliverable: "传感器超过阈值后能报警，并在串口看到状态记录。",
  },
  {
    id: "final",
    dayRange: "Day 24-28",
    title: "综合项目整合",
    goal: "整合采集、显示、日志、报警和按键，整理成简历项目。",
    tasks: ["画出系统数据流", "统一 DeviceState", "联调显示和报警", "记录测试过程", "写简历描述"],
    deliverable: "一个可演示、可复盘、可写进简历的 STM32 入门项目。",
  },
];

