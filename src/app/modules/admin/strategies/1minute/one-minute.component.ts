import { Component, OnInit } from '@angular/core';
import { OneMinuteApiService } from './one-minute-api.service';
import { OneMinuteRecord } from './one-minute.types';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { StrategyUtilsService } from '../services/strategy-utils.service';

@Component({
  selector: 'app-one-minute',
  templateUrl: './one-minute.component.html',
  styleUrls: ['./one-minute.component.scss']
})
export class OneMinuteComponent implements OnInit {

  symbol:string = 'NSE_INDEX|Nifty Bank';
  interval:string = '1minute'; 

  dayOHLC: any = {};

  tradeConditions = {
    'CE': {
      buy: 0,
      stoploss: 0,
      risk: null,
      target: null,
      reward: null,
      orderCompleted: false
    },
    'PE': {
      buy: 0,
      stoploss: 0,
      risk: null,
      target: null,
      reward: null,
      orderCompleted: false
    }
  };
  strategyConfig: FormGroup;
  ledgerColumns: any = ['dateTime', 'open', 'high', 'low', 'close', 'status'];
  reportArr: OneMinuteRecord[] = [];

  days = [];

  statistics = {
    totalDays : 0,
    tradedDays: 0,
    targetHit: 0,
    stoplossHit: 0,
    error: 0
  };

  constructor(private _ledgerApi: OneMinuteApiService, private _utils: StrategyUtilsService) {

    this.strategyConfig = new FormGroup({
      start: new FormControl(new Date(2024, 0, 1)),
      end: new FormControl(new Date(2024, 0, 31)),
    });

  }

  ngOnInit(): void {
  }

  transformOHLC(data) {
    let ohlcArr = [];
    let reversedArray = data.slice().reverse();
    reversedArray.forEach((obj, index) => {

      let tObj = this._utils.createOHLCobj(obj);

      if (index == 0) {
        this.tradeConditions.CE = this._utils.createCElogic(tObj);
        this.tradeConditions.PE = this._utils.createPElogic(tObj);
        console.log('PE logic::', this.tradeConditions.PE);
      }

      if (index > 0) {
        tObj = this._utils.generateCEStatus(tObj, ohlcArr , this.tradeConditions.CE, index);
      }

      ohlcArr.push(tObj);

    });

    return this._utils.trimOutputArr(ohlcArr);

  }

  fetchRecords(startDate, endDate){
    this.days = [];
    this._ledgerApi.getHistoricalData(this.symbol, this.interval, startDate, endDate).subscribe(res => {
      this.dayOHLC = this._utils.splitDays(res.data.candles)
      console.log(this.dayOHLC);
      this.days =  Object.keys(this.dayOHLC);
      console.log('days::', this.days);
      this.days.forEach((obj, index) => {
        let d = this.transformOHLC(this.dayOHLC[obj]);
        this.dayOHLC[obj].limits = this.tradeConditions;
        this.dayOHLC[obj].output = d;
      });

      this.statistics = this._utils.generateStatistics(this.dayOHLC);
      
    }, err => {
      console.log(err);
    });
  }

  analyse(){

    let selectedDate = this.strategyConfig.getRawValue();

    let startDate = this._utils.generateDateString(selectedDate.start);
    let endDate = this._utils.generateDateString(selectedDate.end);

    this.fetchRecords(startDate, endDate);

  }

}
