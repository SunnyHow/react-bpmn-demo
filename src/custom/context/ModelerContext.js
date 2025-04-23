import { createContext, useContext } from 'react';

const ModelerContext = createContext(null);

export const ModelerProvider = ModelerContext.Provider;

export function useModeler() {
    return useContext(ModelerContext);
}