import AddCustomer from '../pages/AddCustomer/AddCustomer';
import Customer from '../pages/Customer';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';

const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/order', component: Order },
    { path: '/report', component: Dashboard },
    { path: '/customers', component: Customer },
    { path: '/customers/create', component: AddCustomer },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
