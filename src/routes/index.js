import AddCustomer from '../pages/AddCustomer';
import Customer from '../pages/Customer';
import Dashboard from '../pages/Dashboard';
import EditCustomer from '../pages/EditCustomer';
import Order from '../pages/Order';

const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/order', component: Order },
    { path: '/report', component: Dashboard },
    { path: '/customers', component: Customer },
    { path: '/customers/create', component: AddCustomer },
    { path: '/customers/:id', component: EditCustomer },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
