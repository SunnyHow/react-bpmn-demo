import React, { useEffect, useState } from 'react';
import { useModeler } from '../ModelerContext/ModelerContext';

export default function TaskProperties({ element }) {
    const [name, setName] = useState('');
    const [documentation, setDocumentation] = useState('');
    const modeler = useModeler();

    // 初始化属性值
    useEffect(() => {
        if (element) {
            setName(element.businessObject.name || '');
            setDocumentation(element.businessObject.documentation || '');
        }
    }, [element]);

    const handleNameChange = (value) => {
        setName(value);
        if (modeler && element) {
            const modeling = modeler.get('modeling');
            modeling.updateProperties(element, { name: value });
        }
    };

    const handleDocumentationChange = (value) => {
        setDocumentation(value);
        if (modeler && element) {
            const modeling = modeler.get('modeling');
            modeling.updateProperties(element, { documentation: value });
        }
    };


    return (
        <div className="task-properties">
            <div className="property-control">
                <label>任务名称</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                />
            </div>

            <div className="property-control">
                <label>任务描述</label>
                <textarea
                    value={documentation}
                    onChange={(e) => handleDocumentationChange(e.target.value)}
                    rows={3}
                />
            </div>
        </div>
    );
}