import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "@bpmn-io/properties-panel/dist/assets/properties-panel.css";
import BpmnModeler from "bpmn-js/lib/Modeler";
import {ModelerProvider} from "../../custom/ModelerContext/ModelerContext";
import classes from "./BpmnDesigner.module.css";

const BpmnDesigner = ({
                          toolbar: Toolbar,
                          propertiesPanel: PropertiesPanel,
                          keyboardShortcuts: KeyboardShortcuts,
                          additionalModules = [],
                          initialBpmnXML = "",
                      }) => {
    const containerRef = useRef(null);
    const [bpmnXML, setBpmnXML] = useState(initialBpmnXML);
    const bpmnModeler = useRef(null);
    const [isModelerReady, setModelerReady] = useState(false);

    useEffect(() => {
        bpmnModeler.current = new BpmnModeler({
            container: containerRef.current,
            additionalModules,
        });

        setModelerReady(true);

        if (bpmnModeler.current && bpmnXML) {
            bpmnModeler.current.importXML(bpmnXML);
        }

        return () => {
            if (bpmnModeler.current) {
                bpmnModeler.current.destroy();
            }
        };
    }, [bpmnXML, additionalModules]);

    const contextValue = {
        modeler: bpmnModeler.current,
        isModelerReady,
    };

    return (
        <ModelerProvider value={contextValue}>
            <div>
                <div className={classes.reactBpmnDiagramContainer}>
                    <div ref={containerRef} className={classes.container}>
                        {KeyboardShortcuts && <KeyboardShortcuts/>}
                        {Toolbar && <Toolbar/>}
                    </div>
                    {PropertiesPanel && (
                        <div className={classes.propertiesPanel}>
                            <PropertiesPanel/>
                        </div>
                    )}
                </div>
            </div>
        </ModelerProvider>
    );
};

BpmnDesigner.propTypes = {
    toolbar: PropTypes.elementType,
    propertiesPanel: PropTypes.elementType,
    keyboardShortcuts: PropTypes.elementType,
    additionalModules: PropTypes.array,
    initialBpmnXML: PropTypes.string,
};

export default BpmnDesigner;
