import React from 'react';
import { useModeler } from '../context/ModelerContext';
import TaskProperties from '../properties/TaskProperties';
import StartEventProperties from '../properties/StartEventProperties';
import DefaultProperties from '../properties/DefaultProperties';

const elementTypeToComponent = {
    'bpmn:Task': TaskProperties,
    'bpmn:UserTask': TaskProperties,
    'bpmn:ServiceTask': TaskProperties,
    'bpmn:StartEvent': StartEventProperties,
    // 其他元素类型映射...
};

export default function PropertiesPanel({ selectedElement }) {
    const modeler = useModeler();
    const modeling = modeler ? modeler.get('modeling') : null;

    if (!selectedElement || !modeling) {
        return <div className="no-element-selected">请选择BPMN元素</div>;
    }

    const elementType = selectedElement.type;
    const ElementPanel = elementTypeToComponent[elementType] || DefaultProperties;

    return (
        <div className="properties-panel">
            <div className="panel-header">
                <h3>{getElementTypeLabel(elementType)}属性</h3>
            </div>
            <div className="panel-content">
                <ElementPanel
                    element={selectedElement}
                    modeling={modeling}
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
        'bpmn:StartEvent': '开始事件'
    };
    return labels[type] || type;
}