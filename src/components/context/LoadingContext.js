import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
}
