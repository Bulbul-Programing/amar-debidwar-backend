
export type TUnion = {
    id: string;
    name: string;
    population?: number | null;
    createdAt: Date;
};

export type TVillage = {
    id: string;
    name: string;
    population?: number | null;
    unionId: string;
};