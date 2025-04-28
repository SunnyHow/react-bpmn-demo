import React from 'react';
import PropertyInput from '../Property/PropertyInput';
import PropertyTextarea from '../Property/PropertyTextarea';

export default function TaskProperties({ element, modeling }) {

    const getValue = (propertyId) => {
        return element.businessObject.get(propertyId) || '';
    };

    const handleChange = (propertyId, value) => {
        modeling.updateProperties(element, {
            [propertyId]: value
        });
    };

    return (
        <div className="task-properties">
            <PropertyInput
                label="任务名称"
                value={getValue('name')}
                onChange={(value) => handleChange('name', value)}
            />

            <PropertyTextarea
                label="任务描述"
                value={getValue('documentation')}
                onChange={(value) => handleChange('documentation', value)}
            />
        </div>
    );
}