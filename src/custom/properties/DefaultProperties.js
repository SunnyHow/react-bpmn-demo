import React from 'react';
import PropertyInput from '../property/PropertyInput';
import PropertyTextarea from '../property/PropertyTextarea';

export default function DefaultProperties({ element, modeling }) {
    const getValue = (propertyId) => {
        return element.businessObject.get(propertyId) || '';
    };

    const handleChange = (propertyId, value) => {
        modeling.updateProperties(element, {
            [propertyId]: value
        });
    };

    return (
        <div className="default-properties">
            <PropertyInput
                label="元素名称"
                value={getValue('name')}
                onChange={(value) => handleChange('name', value)}
            />

            <PropertyTextarea
                label="元素描述"
                value={getValue('documentation')}
                onChange={(value) => handleChange('documentation', value)}
            />

            <div className="element-info">
                <div className="info-row">
                    <span className="info-label">元素类型:</span>
                    <span className="info-value">{element.type}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">元素ID:</span>
                    <span className="info-value">{element.id}</span>
                </div>
            </div>
        </div>
    );
}