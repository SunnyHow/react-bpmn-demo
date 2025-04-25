import React, { useEffect } from 'react';
import classes from './BpmnToolbar.module.css'; // 引入模块化样式
import { useModeler } from '../ModelerContext/ModelerContext';

const BpmnToolbar = () => {
    const { isModelerReady, modeler } = useModeler();
    console.log(modeler);

    useEffect(() => {
    }, [isModelerReady]);

    if (!modeler) return null;

    console.log("Bpmn toolbar 渲染了");

    // 获取相关服务
    const canvas = modeler.get('canvas');
    const commandStack = modeler.get('commandStack');

    // 放大
    const zoomIn = () => {
        const currentZoom = canvas.zoom();
        canvas.zoom(Math.min(currentZoom + 0.2, 3.0));
    };

    // 缩小
    const zoomOut = () => {
        const currentZoom = canvas.zoom();
        canvas.zoom(Math.max(currentZoom - 0.2, 0.2));
    };

    // 重置视图
    const resetZoom = () => {
        canvas.zoom('fit-viewport', 'auto');
    };

    // 预览
    const preview = () => {
        alert('预览功能，实际项目中可打开预览模态框');
    };

    return (
        <div className={classes.toolbar}>
            <button
                className={classes.button}
                onClick={preview}
                title="预览"
            >
                <span className={classes['bpmn-icon-preview']} />
            </button>

            <div className={classes.divider} />

            <button
                className={classes.button}
                onClick={zoomIn}
                title="放大"
            >
                <span className={classes['bpmn-icon-zoom-in']} />
            </button>

            <div className={classes.divider} />

            <button
                className={classes.button}
                onClick={zoomOut}
                title="缩小"
            >
                <span className={classes['bpmn-icon-zoom-out']} />
            </button>

            <div className={classes.divider} />

            <button
                className={classes.button}
                onClick={resetZoom}
                title="重置视图"
            >
                <span className={classes['bpmn-icon-reset-view']} />
            </button>
        </div>
    );
};

export default BpmnToolbar;
