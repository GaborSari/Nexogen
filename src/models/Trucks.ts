import { Order } from "./Order";

class Truck {
    name: string = '';
    orders: Array<Order> = new Array<Order>();

    constructor(name:string, orders:Array<Order> = new Array<Order>()) {
        this.name = name;
        this.orders = orders;
    }
}

export { Truck };