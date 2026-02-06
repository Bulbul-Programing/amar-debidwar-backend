import express from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRouter } from '../modules/Auth/auth.routes';
import { fundSourceRoutes } from '../modules/FundSource/fundSource.route';
import { donationSectionRoutes } from '../modules/DonactionSection/donationSection.route';
import { projectRoute } from '../modules/Project/project.route';
import { BudgetRoutes } from '../modules/Budge/budge.route';
import { expenseCategoryRoutes } from '../modules/expenseCategory/expenseCategory.route';
import { expenseRoutes } from '../modules/expence/expense.route';
import { serviceRecipientRoutes } from '../modules/serviceRecipient/serviceRecipient.route';
import { villageRoutes } from '../modules/village/village.route';
import { unionRoutes } from '../modules/Union/union.route';
import { complaintCategoryRoutes } from '../modules/ComplainCategory/complainCategory.routes';
import { complainRoutes } from '../modules/Complain/complain.routes';
import { dashboardRouter } from '../modules/Dashboard/router';

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
    },
    {
        path: "/budget",
        route: BudgetRoutes
    },
    {
        path: "/project",
        route: projectRoute
    },
    {
        path: "/expenseCategory",
        route: expenseCategoryRoutes
    },
    {
        path: "/expense",
        route: expenseRoutes
    },
    {
        path: "/union",
        route: unionRoutes
    },
    {
        path: "/village",
        route: villageRoutes
    },
    {
        path: "/donationSection",
        route: donationSectionRoutes
    },
    {
        path: "/serviceRecipient",
        route: serviceRecipientRoutes
    },
    {
        path: "/complainCategory",
        route: complaintCategoryRoutes
    },
    {
        path: "/complain",
        route: complainRoutes
    },
    {
        path: "/dashboard",
        route: dashboardRouter
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router