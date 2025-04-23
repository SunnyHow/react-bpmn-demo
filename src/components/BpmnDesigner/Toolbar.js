import React from 'react';
import classes from './BpmnDesigner.module.css';

const Toolbar = ({ onZoomIn, onZoomOut, onSave }) => {
    return (
        <div className={classes.toolbar}>
            <button onClick={onZoomIn}>放大</button>
            <button onClick={onZoomOut}>缩小</button>
            <button onClick={onSave}>保存</button>
        </div>
    );
};

export default Toolbar;