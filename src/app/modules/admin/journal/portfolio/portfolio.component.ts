import { Component, OnInit } from '@angular/core';
import { JournalApiService } from '../journal/journal-api.service';
import { webSocket } from "rxjs/webSocket";
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  positions: any = [];

  constructor(private _journalService: JournalApiService, private portfolioService: PortfolioService) {

    
   }

  ngOnInit(): void {
    this._journalService.getPositions().subscribe(res=>{
      this.positions = res.data;
    });

    this._journalService.getPortfolioWsUrl().subscribe(res=>{
      this.portfolioService.setUrl(res.data._authorized_redirect_uri);

      this.portfolioService.initiateConnection();

      setTimeout(()=>{
        this.portfolioService && this.portfolioService.portfolio.subscribe(msg => {
          console.log("Response from portfolio websocket: " , msg);
        });
      }, 2000);
    });

    
  }

}
