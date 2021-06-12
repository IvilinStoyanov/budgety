export class Category {
    color: string;
    exp: number;
    expPercentage: number;
    incPercentage: number;
    icon: string;
    inc: number;
    name: string;
    items: [];

    constructor
        (
            color: string = '',
            exp: number = 0,
            expPercentage: number = 0,
            incPercentage: number = 0,
            icon: string = '',
            inc: number = 0,
            name: string = '',
            items: []
        ) {
        this.color = color;
        this.exp = exp;
        this.expPercentage = expPercentage;
        this.incPercentage = incPercentage;
        this.icon = icon;
        this.inc = inc;
        this.name = name;
        this.items = items;
    }
}