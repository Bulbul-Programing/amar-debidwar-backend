import express from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRouter } from '../modules/Auth/auth.routes';

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
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router