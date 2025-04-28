import React from 'react';
import PropertyInput from '../Property/PropertyInput';
import PropertySelect from '../Property/PropertyTextarea';

export default function StartEventProperties({element, modeling}) {
    const getValue = (propertyId) => {
        return element.businessObject.get(propertyId) || '';
    };

    const handleChange = (propertyId, value) => {
        modeling.updateProperties(element, {
            [propertyId]: value
        });
    };

    // 开始事件特定选项
    const initiatorTypes = [
        {value: 'user', label: '用户'},
        {value: 'system', label: '系统'},
        {value: 'external', label: '外部'}
    ];

    const eventTypes = [
        {value: 'none', label: '无'},
        {value: 'timer', label: '定时'},
        {value: 'message', label: '消息'},
        {value: 'signal', label: '信号'}
    ];

    return (
        <div className="start-event-properties">
            <PropertyInput
                label="事件名称"
                value={getValue('name')}
                onChange={(value) => handleChange('name', value)}
            />

            <PropertySelect
                label="事件类型"
                value={getValue('eventType')}
                options={eventTypes}
                onChange={(value) => handleChange('eventType', value)}
            />

            <PropertySelect
                label="发起人类型"
                value={getValue('initiatorType')}
                options={initiatorTypes}
                onChange={(value) => handleChange('initiatorType', value)}
            />
        </div>
    );
}