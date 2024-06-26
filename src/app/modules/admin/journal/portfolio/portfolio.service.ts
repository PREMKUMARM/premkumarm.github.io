import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from '../websocket.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url: string;
  public portfolio: Subject<any>;

  constructor(private wsService: WebsocketService) {
    
  }

  setUrl(url) {
    this.url = url;
  }

  initiateConnection(){
    this.portfolio = <Subject<any>>this.wsService.connect(this.url).pipe(map(
      (response: any): any => {
        let data = JSON.parse(response.data);
        return data;
      }
    ));
  }
}
