import express from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRouter } from '../modules/Auth/auth.routes';
import { categoryRouter } from '../modules/Category/category.route';
import { productRouter } from '../modules/Product/product.route';
import { orderRouter } from '../modules/Order/order.route';

type TModuleRoutes = {
    path: string,
    route: express.Router
}

const router = express.Router()

const moduleRoutes: TModuleRoutes[] = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRouter
    },
    {
        path: "/category",
        route: categoryRouter
    },
    {
        path: "/product",
        route: productRouter
    },
    {
        path: "/order",
        route: orderRouter
    },

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router