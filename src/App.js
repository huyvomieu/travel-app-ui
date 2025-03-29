import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import MainLayout from './layouts/MainLayout';
function App() {
    return (
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
    );
}

export default App;
