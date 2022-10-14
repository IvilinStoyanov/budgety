export interface ITransaction {
    id: number;
    _id: number;
    dateCreated: Date;
    description: string;
    type: string;
    value: number;
    _categoryId: string;
}
