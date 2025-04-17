import AddCustomer from '../pages/AddCustomer';
import * as Category from '../pages/Category';
import Customer from '../pages/Customer';
import Dashboard from '../pages/Dashboard';
import EditCustomer from '../pages/EditCustomer';
import Item from '../pages/Item';
import Order from '../pages/Order';

const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/order', component: Order },
    { path: '/report', component: Dashboard },
    { path: '/customers', component: Customer },
    { path: '/customers/create', component: AddCustomer },
    { path: '/customers/:id', component: EditCustomer },
    { path: '/category', component: Category.list },
    { path: '/category/create', component: Category.create },
    { path: '/category/:id', component: Category.edit },
    { path: '/items', component: Item },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
