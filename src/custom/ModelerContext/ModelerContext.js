import { createContext, useContext } from 'react';

const ModelerContext = createContext({
    modeler: null,
    previewMode: null,
    setPreviewModel: null,
    isModelerReady: false,
    setModelerReady: null
});

export const ModelerProvider = ModelerContext.Provider;

export function useModeler() {
    return useContext(ModelerContext);
}