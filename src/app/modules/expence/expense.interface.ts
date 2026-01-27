export type Expense = {
    id: string;
    description: string;
    amount: number;
    expenseDate: Date;
    chalanImage?: string | null;
    projectId: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
};
