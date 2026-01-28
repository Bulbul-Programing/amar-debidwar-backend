export type TExpense = {
    id: string;
    description: string;
    amount: number;
    expenseDate: Date;
    chalanImage?: string | null;
    projectId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
};
