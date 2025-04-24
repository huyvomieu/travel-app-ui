import * as Category from '../pages/Category';
import * as Customer from '../pages/Customer';
import * as Item from '../pages/Item';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';

const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/order', component: Order },
    { path: '/report', component: Dashboard },
    { path: '/customers', component: Customer.default },
    { path: '/customers/create', component: Customer.addCustomer },
    { path: '/customers/:id', component: Customer.editCustomer },
    { path: '/category', component: Category.list },
    { path: '/category/create', component: Category.create },
    { path: '/category/:id', component: Category.edit },
    { path: '/items', component: Item.list },
    { path: '/items/create', component: Item.add },
    { path: '/items/:id', component: Item.edit },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
