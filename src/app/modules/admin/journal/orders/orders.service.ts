import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from '../websocket.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url: string;
  public orders: Subject<any>;

  constructor(private wsService: WebsocketService) {
    
  }

  setUrl(url) {
    this.url = url;
  }

  initiateConnection(){
    this.orders = <Subject<any>>this.wsService.connect(this.url).pipe(map(
      (response: any): any => {
        let data = JSON.parse(response.data);
        return data;
      }
    ));
  }}
