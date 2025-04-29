import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import MainLayout from './layouts/MainLayout';

import { LoadingProvider, useLoading } from './components/context/LoadingContext';
import Spinner from './components//ui/Spinner';

function App() {
    const { loading } = useLoading();

    return (
        <>
            {loading && <Spinner />}
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, key) => {
                        const Page = route.component;
                        const Layout = MainLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        }
                        return (
                            <Route
                                key={key}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </>
    );
}
function WrapperApp() {
    return (
        <LoadingProvider>
            <App />
        </LoadingProvider>
    );
}

export default WrapperApp;
