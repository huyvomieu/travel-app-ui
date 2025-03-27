import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';

const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/order', component: Order },
    { path: '/report', component: Dashboard },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
