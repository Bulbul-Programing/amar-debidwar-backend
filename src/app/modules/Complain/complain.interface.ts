export type TComplain = {
  id: string;
  title: string;
  description: string;
  photo?: string | null;
  location: string;
  complainCategory: string;
  createdAt: Date;
  updateAt: Date;
};