class Order {
    from: Date = new Date(0);
    to: Date = new Date(0);
    id: string = '';
    index: number = 0;

    constructor(id: string, from: Date, to: Date = new Date(), index: number = 0) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.index = index;
    }
}

export { Order };