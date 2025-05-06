import * as Category from '../pages/Category';
import * as Customer from '../pages/Customer';
import * as Item from '../pages/Item';
import Dashboard from '../pages/Dashboard';
import OrderList from '../pages/Order/OrderList';
import OrderDetail from '../pages/Order/OrderDetail';
import Report from '../pages/Report';
import Login from '../pages/Auth/Login';

const privateRoutes = [
    { path: '/', component: Dashboard },
    { path: '/order', component: OrderList },
    { path: '/order/:id', component: OrderDetail },
    { path: '/customers', component: Customer.default },
    { path: '/customers/create', component: Customer.addCustomer },
    { path: '/customers/:id', component: Customer.editCustomer },
    { path: '/category', component: Category.list },
    { path: '/category/create', component: Category.create },
    { path: '/category/:id', component: Category.edit },
    { path: '/items', component: Item.list },
    { path: '/items/create', component: Item.add },
    { path: '/items/:id', component: Item.edit },
    { path: '/report', component: Report },
];

const publicRoutes = [{ path: '/login', component: Login, layout: false }];

export { publicRoutes, privateRoutes };
