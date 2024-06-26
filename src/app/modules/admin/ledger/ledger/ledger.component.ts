import { Component, OnInit } from '@angular/core';
import { LedgerApiService } from './ledger-api.service';
import { LedgerRecord } from './ledger.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  ledger: LedgerRecord;

  ledgerColumns: any = ['date', 'trades','orders', 'openingBalance', 'pnl', 'charges', 'closingBalance', 'actions'];
  ledgerRows: LedgerRecord[] = [];
  constructor(private _ledgerApi: LedgerApiService) {
    this.ledger = {
      date: '',
      id: null,
      trades: 0,
      orders: 0,
      openingBalance: 0,
      pnl: 0,
      closingBalance: 0,
      charges: 0
    }
  }

  ngOnInit(): void {
   this._ledgerApi.getLedgerRecords().subscribe(
    res=>{
      console.log(res);
      this.ledgerRows = res;
    }
   )
  }


}
