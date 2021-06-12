export class Items {
    description: string;
    dateCreated: Date;
    type: string;
    value: number;

    constructor
        (
            description: string = '',
            dateCreated: Date = new Date(),
            type: string = '',
            value: number = 0,
        ) {
        this.description = description;
        this.dateCreated = dateCreated;
        this.type = type;
        this.value = value;
    }
}
