import React from "react";
import BpmnDesigner from "./components/BpmnDesigner/BpmnDesigner";
import BpmnToolbar from "./custom/ToolBar/BpmnToolbar";
import PropertiesPanel from "./custom/PropertiesPanel/PropertiesPanel";
import KeyBoard from "./custom/KeyBoard/KeyBoard";
import CustomPaletteModule from "./custom/Palette/CustomPaletteModule";
import CustomContextPadModule from "./custom/ContextPad/CustomContextPadModule";
import {defaultDiagramXML} from "./constant/bpmnXml";

const App = () => {
    return (
        <BpmnDesigner
            toolbar={BpmnToolbar}
            propertiesPanel={PropertiesPanel}
            keyboardShortcuts={KeyBoard}
            additionalModules={[CustomPaletteModule, CustomContextPadModule, CustomPaletteModule]}
            initialBpmnXML={defaultDiagramXML}
        />
    );
};

export default App;
