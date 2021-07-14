export class Category {
    id: number;
    color: string;
    exp: number;
    expPercentage: number;
    incPercentage: number;
    icon: string;
    inc: number;
    name: string;
    visible: boolean;
    items: [];

    constructor
        (
            id: number = 0,
            color: string = '',
            exp: number = 0,
            expPercentage: number = 0,
            incPercentage: number = 0,
            icon: string = '',
            inc: number = 0,
            name: string = '',
            visible: boolean = true,
            items: []
        ) {
        this.id = id;
        this.color = color;
        this.exp = exp;
        this.expPercentage = expPercentage;
        this.incPercentage = incPercentage;
        this.icon = icon;
        this.inc = inc;
        this.name = name;
        this.visible = visible;
        this.items = items;
    }
}