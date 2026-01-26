import express from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRouter } from '../modules/Auth/auth.routes';
import { fundSourceRoutes } from '../modules/FundSource/fundSource.route';

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
        path: "/fundSource",
        route: fundSourceRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router