export interface ITransaction {
    id: number;
    dateCreated: Date;
    description: string;
    type: string;
    value: number;
}
