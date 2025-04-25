import React, { useEffect, useRef } from "react";
import { useModeler } from "../ModelerContext/ModelerContext";
import "./custom-palette.css";

const CustomPalette = () => {
    const paletteRef = useRef(null);
    const { modeler, isModelerReady } = useModeler();

    useEffect(() => {
        if (!modeler || !paletteRef.current) return;

        // 获取注入的模块
        const create = modeler.get("create");
        const elementFactory = modeler.get("elementFactory");
        const handTool = modeler.get("handTool");
        const globalConnect = modeler.get("globalConnect");
        const translate = modeler.get("translate");

        // 检查模块是否可用
        if (!create || !elementFactory || !handTool || !globalConnect || !translate) {
            console.error("Required modules are not available");
            return;
        }

        // 生成 entries 配置
        const entries = {
            "hand-tool": {
                group: "tools",
                className: "bpmn-icon-hand-tool",
                title: translate("Activate hand tool"),
                action: {
                    click: (event) => {
                        try {
                            console.log("hand-tool");
                            handTool.activateHand(event);
                        } catch (error) {
                            console.error("Error in hand-tool click handler:", error);
                        }
                    },
                },
            },
            "global-connect-tool": {
                group: "tools",
                className: "bpmn-icon-connection-multi",
                title: translate("Activate global connect tool"),
                action: {
                    click: (event) => {
                        try {
                            globalConnect.start(event);
                        } catch (error) {
                            console.error("Error in global-connect-tool click handler:", error);
                        }
                    },
                },
            },
            "tool-separator": {
                group: "tools",
                separator: true,
            },
            "create.start-event": {
                group: "event",
                className: "bpmn-icon-start-event-none",
                title: translate("Create start event"),
                action: {
                    dragstart: (event) => {
                        try {
                            const shape = elementFactory.createShape({ type: "bpmn:StartEvent" });
                            create.start(event, shape);
                        } catch (error) {
                            console.error("Error in start-event dragstart handler:", error);
                        }
                    },
                    click: (event) => {
                        try {
                            const shape = elementFactory.createShape({ type: "bpmn:StartEvent" });
                            create.start(event, shape);
                        } catch (error) {
                            console.error("Error in start-event click handler:", error);
                        }
                    },
                },
            },
            "create.task": {
                group: "activity",
                className: "bpmn-icon-task",
                title: translate("Create task"),
                action: {
                    dragstart: (event) => {
                        try {
                            const shape = elementFactory.createShape({ type: "bpmn:Task" });
                            create.start(event, shape);
                        } catch (error) {
                            console.error("Error in task dragstart handler:", error);
                        }
                    },
                    click: (event) => {
                        try {
                            const shape = elementFactory.createShape({ type: "bpmn:Task" });
                            create.start(event, shape);
                        } catch (error) {
                            console.error("Error in task click handler:", error);
                        }
                    },
                },
            },
        };

        const renderPaletteEntries = (container, entries) => {
            container.innerHTML = ""; // 清空容器
            Object.entries(entries).forEach(([key, entry]) => {
                console.log(key, entry);
                const button = document.createElement("div");
                button.className = `entry ${entry.className}`;
                button.title = entry.title;
                button.onclick = (event) => {
                    try {
                        if (entry.action && entry.action.click) {
                            entry.action.click(event);
                        }
                    } catch (error) {
                        console.error("Error in click handler:", error);
                    }
                };
                button.ondragstart = (event) => {
                    try {
                        if (entry.action && entry.action.dragstart) {
                            entry.action.dragstart(event);
                        }
                    } catch (error) {
                        console.error("Error in dragstart handler:", error);
                    }
                };
                container.appendChild(button);
            });
        };

        // 渲染 Palette 元素
        renderPaletteEntries(paletteRef.current, entries);

        // 清理函数
        return () => {
            if (paletteRef.current) {
                paletteRef.current.innerHTML = ""; // 清空容器
            }
        };
    }, [modeler, isModelerReady]);

    return <div ref={paletteRef} className="djs-palette"></div>;
};

export default CustomPalette;
