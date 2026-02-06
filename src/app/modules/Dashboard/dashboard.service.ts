import { prisma } from "../../DBconfig/db";


const mpDashboardHomeApi = async () => {
    const [
        budgets,
        projects,
        expenses,
        complaints,
        recipients
    ] = await Promise.all([
        prisma.budget.findMany({ where: { isDeleted: false } }),
        prisma.project.findMany({ where: { isDeleted: false } }),
        prisma.expense.findMany(),
        prisma.complain.findMany(),
        prisma.serviceRecipient.findMany(),
    ]);

    const totalBudgetAmount = budgets.reduce((a, b) => a + b.budgetAmount, 0);
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);

    /* ================= BUDGET VS EXPENSE ================= */
    const budgetVsExpense = await prisma.budget.findMany({
        where: { isDeleted: false },
        include: {
            projects: {
                include: { expenses: true }
            }
        }
    });

    const budgetChart = {
        labels: budgetVsExpense.map(b => b.title),
        budget: budgetVsExpense.map(b => b.budgetAmount),
        expense: budgetVsExpense.map(b =>
            b.projects.reduce(
                (sum, p) => sum + p.expenses.reduce((e, ex) => e + ex.amount, 0),
                0
            )
        )
    };

    /* ================= MONTHLY EXPENSE TREND ================= */
    const monthlyExpenseMap: Record<string, number> = {};

    expenses.forEach(exp => {
        const month = exp.expenseDate.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });
        monthlyExpenseMap[month] =
            (monthlyExpenseMap[month] || 0) + exp.amount;
    });

    const monthlyExpenseTrend = {
        labels: Object.keys(monthlyExpenseMap),
        data: Object.values(monthlyExpenseMap),
    };

    /* ================= FUND SOURCE ALLOCATION ================= */
    const fundSources = await prisma.fundSource.findMany({
        where: { isDeleted: false },
        include: { budgets: true }
    });

    const fundSourceAllocation = {
        labels: fundSources.map(f => f.name),
        data: fundSources.map(f =>
            f.budgets.reduce((sum, b) => sum + b.budgetAmount, 0)
        )
    };

    /* ================= COMPLAINT CATEGORY ================= */
    const categories = await prisma.complaintCategory.findMany({
        include: { complaints: true }
    });

    const complaintCategoryDistribution = {
        labels: categories.map(c => c.name),
        data: categories.map(c => c.complaints.length)
    };

    /* ================= UNION WISE RECIPIENTS ================= */
    const unions = await prisma.union.findMany({
        include: { recipients: true }
    });

    const unionWiseRecipients = {
        labels: unions.map(u => u.name),
        data: unions.map(u => u.recipients.length)
    };

    /* ================= PROJECT UTILIZATION ================= */
    const projectUtilization = projects.map(p => ({
        project: p.title,
        percentage: Math.min(
            100,
            ((p.actualCost || 0) / p.estimatedCost) * 100
        )
    }));

    return {
        summary: {
            totalBudgetAmount,
            totalProjects: projects.length,
            totalExpenses,
            totalComplaints: complaints.length,
            totalRecipients: recipients.length
        },

        charts: {
            budgetVsExpense: budgetChart,
            monthlyExpenseTrend,
            fundSourceAllocation,
            complaintCategoryDistribution,
            unionWiseRecipients,
            projectUtilization
        }
    }
};

export const dashboardService = {
    mpDashboardHomeApi
}