
export type TProject = {
  id: string;
  title: string;
  description: string;
  location: string;
  estimatedCost: number;
  actualCost?: number
  budgetId: string;
};
