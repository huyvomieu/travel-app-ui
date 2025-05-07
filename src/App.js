import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './routes';
import MainLayout from './layouts/MainLayout';
import CustomLayout from './layouts/CustomLayout/CustomLayout';
import { LoadingProvider, useLoading } from './components/context/LoadingContext';
import Spinner from './components//ui/Spinner';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const { loading } = useLoading();

    return (
        <>
            {loading && <Spinner />}
            <BrowserRouter>
                <Routes>
                    {privateRoutes.map((route, key) => {
                        const Page = route.component;
                        let Layout = MainLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        }
                        return (
                            <Route
                                key={key}
                                path={route.path}
                                element={
                                    <PrivateRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </PrivateRoute>
                                }
                            />
                        );
                    })}
                    {publicRoutes.map((route, key) => {
                        const Page = route.component;
                        let Layout = MainLayout;
                        if (!route.layout) {
                            Layout = CustomLayout;
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
