import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Truck } from 'src/models/Trucks';
import { filter, map } from 'rxjs/operators'
import { Order } from 'src/models/Order';
import { CommonService } from './common.service';

@Injectable()
export class TruckService {

  trucks:BehaviorSubject<Array<Truck>> = new BehaviorSubject(new Array<Truck>());

  constructor(private http: HttpClient, private common:CommonService) {
    this.http.get("./assets/trucktimeline.json")
       .subscribe((timeLineDate: any) => {
         if (!timeLineDate)
           return;
         let trucks = new Array<Truck>();
         for (let truck of timeLineDate.trucks) {
           let newTruck = new Truck(truck.name);
           let orders = new Array<Order>();
           let i = 0;
           for (let order of timeLineDate.orders) {
             if (truck.assignedOrderId.includes(order.id)) {
               i += 1;
               orders.push(new Order(order.id, new Date(order.from), new Date(order.to), i));
             }
           }
           newTruck.orders = orders;
           trucks.push(newTruck);
         }
         this.trucks.next(trucks);
       }, error => {
         console.error('Cannot load trucktimeline');
         common.addError(error);
       });
  }

  getTrucks(): BehaviorSubject<Array<Truck>> {
    return this.trucks;
  }

}

