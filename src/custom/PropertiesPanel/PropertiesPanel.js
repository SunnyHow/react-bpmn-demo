import React, { useEffect, useState } from 'react';
import { useModeler } from '../ModelerContext/ModelerContext';
import TaskProperties from '../Properties/TaskProperties';
import StartEventProperties from '../Properties/StartEventProperties';
import DefaultProperties from '../Properties/DefaultProperties';
import classes from './PropertiesPanel.module.css';

const elementTypeToComponent = {
    'bpmn:Task': TaskProperties,
    'bpmn:UserTask': TaskProperties,
    'bpmn:ServiceTask': TaskProperties,
    'bpmn:StartEvent': StartEventProperties,
    'bpmn:Process': DefaultProperties, // 添加流程根元素映射
    // 其他元素类型映射...
};

export default function PropertiesPanel() {
    const { modeler } = useModeler();
    const [selectedElement, setSelectedElement] = useState(null);

    useEffect(() => {
        if (!modeler) return;

        // 获取流程根元素
        const canvas = modeler.get('canvas');
        const rootElement = canvas.getRootElement();

        const handleSelectionChanged = (event) => {
            console.log("selection.changed");
            const newSelection = event.newSelection[0] || rootElement;
            setSelectedElement(newSelection);
        };

        const handleElementChanged = (event) => {
            console.log("element.changed");
            const { element } = event;
            if (selectedElement && selectedElement.id === element.id) {
                setSelectedElement(element);
            }
        };

        modeler.on('selection.changed', handleSelectionChanged);
        modeler.on('element.changed', handleElementChanged);

        return () => {
            modeler.off('selection.changed', handleSelectionChanged);
            modeler.off('element.changed', handleElementChanged);
        };
    }, [modeler, selectedElement]);

    if (!selectedElement) {
        return (
            <div className={classes.propertiesPanel}>
                <div className={classes.panelHeader}>
                    <h3>属性</h3>
                </div>
                <div className={classes.panelContent}>
                    <DefaultProperties />
                </div>
            </div>
        );
    }

    const elementType = selectedElement.type;
    const ElementPanel = elementTypeToComponent[elementType] || DefaultProperties;

    return (
        <div className={classes.propertiesPanel}>
            <div className={classes.panelHeader}>
                <h3>{getElementTypeLabel(elementType)}属性</h3>
            </div>
            <div className={classes.panelContent}>
                <ElementPanel
                    element={selectedElement}
                    modeling={modeler.get('modeling')}
                />
            </div>
        </div>
    );
}

function getElementTypeLabel(type) {
    const labels = {
        'bpmn:Task': '任务',
        'bpmn:UserTask': '用户任务',
        'bpmn:ServiceTask': '服务任务',
        'bpmn:StartEvent': '开始事件',
        'bpmn:Process': '流程' // 添加流程根元素标签
    };
    return labels[type] || type;
}
