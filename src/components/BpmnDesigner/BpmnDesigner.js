import React, {useEffect, useRef, useState} from 'react';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css'
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {defaultDiagramXML} from "../../constant/bpmnXml";
import {ModelerProvider} from '../../custom/context/ModelerContext'
import classes from "./BpmnDesigner.module.css";
import PropertiesPanel from '../../custom/propertiespanel/PropertiesPanel'
import KeyboardIcon from "../KeyboardIcon/KeyboardIcon";
import Toolbar from './Toolbar'; // 引入工具栏组件
import '../../custom/sytle/bpmn-custom.css'

const BpmnDesigner = () => {
    console.log("界面刷新了");

    const containerRef = useRef(null);
    const panelRef = useRef(null);
    const [bpmnXML, setBpmnXML] = useState(defaultDiagramXML);
    const bpmnModeler = useRef(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [modeler, setModeler] = useState(null);

    useEffect(() => {
        bpmnModeler.current = new BpmnModeler({
            container: containerRef.current
        });

        // setModeler(bpmnModeler.current);

        // 监听元素选择变化
        bpmnModeler.current.on('selection.changed', (event) => {
            setSelectedElement(event.newSelection[0] || null);
        });

        // 监听元素变化
        bpmnModeler.current.on('element.changed', (event) => {
            const { element } = event;
            if (selectedElement && element.id === selectedElement.id) {
                setSelectedElement(element);
            }
        });

        if (bpmnModeler.current && bpmnXML) {
            bpmnModeler.current.importXML(bpmnXML);
        }

        return () => {
            if (bpmnModeler.current) {
                bpmnModeler.current.destroy();
            }
        };
    }, [bpmnXML]);

    const saveDiagram = () => {
        if (bpmnModeler.current) {
            bpmnModeler.current.saveXML({format: true}).then(({xml}) => {
                console.log(xml);
            });
        }
    };

    const zoomIn = () => {
        if (bpmnModeler.current) {
            bpmnModeler.current.get('canvas').zoom(1.1); // 放大
        }
    };

    const zoomOut = () => {
        if (bpmnModeler.current) {
            bpmnModeler.current.get('canvas').zoom(0.9); // 缩小
        }
    };

    return (
        <ModelerProvider value={bpmnModeler.current}>
            <div>
                <div className={classes.reactBpmnDiagramContainer}>
                    <div ref={containerRef} className={classes.container}>
                        {/* 工具栏组件 */}
                        <Toolbar
                            onZoomIn={zoomIn}
                            onZoomOut={zoomOut}
                            onSave={saveDiagram}
                        />
                        <KeyboardIcon className={classes.keyboardIcon}/>
                    </div>
                    <div className="bpmn-properties-panel-container">
                        <PropertiesPanel selectedElement={selectedElement} />
                    </div>
                </div>
            </div>
        </ModelerProvider>
    );
};

export default BpmnDesigner;