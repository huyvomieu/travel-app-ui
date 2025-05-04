import { createContext } from 'react';

const ContentScrollContext = createContext(null);

function ContentScrollProvider({ children, contentRef }) {
    return <ContentScrollContext.Provider value={contentRef}>{children}</ContentScrollContext.Provider>;
}

export { ContentScrollProvider, ContentScrollContext };
