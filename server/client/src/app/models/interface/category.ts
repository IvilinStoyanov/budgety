import { ITransaction } from "./transaction";

export interface ICategory {
    id: number;
    _id: string;
    color: string;
    exp: number;
    expPercentage: number;
    incPercentage: number;
    icon: string;
    inc: number;
    name: string;
    isVisible: boolean;
    items: Array<ITransaction>;
}
