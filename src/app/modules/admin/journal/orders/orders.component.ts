import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JournalApiService } from '../journal/journal-api.service';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any = [];

  @Output() updateStatus = new EventEmitter<any>();

  @Output() updateCount = new EventEmitter<any>();

  trades: any = {
    columns: ['scriptName', 'type','buyPrice', 'qty', 'status', 'action']
  };
  constructor(private _journalService: JournalApiService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._journalService.getOrders().subscribe(res=>{
      this.updateCount.emit(0);
      this.orders = [];
      res.data.forEach(r => {
        if(r._status !== 'cancelled' && r._status !== 'failed' && r._status !== 'rejected') {
          this.orders.push(r);
        }
      });

      this.updateCount.emit(this.orders.length);
    });

    this._journalService.getOrdersWsUrl().subscribe(res=>{
      this.ordersService.setUrl(res.data._authorized_redirect_uri);

      this.ordersService.initiateConnection();

      this.ordersService && this.ordersService.orders.subscribe(msg => {
        console.log("Response from orders websocket: " , msg);
      });
    });
  }

  updateTradeStatus(type, order) {
    this.updateStatus.emit({
      type,
      order
    })
  }

  

}
