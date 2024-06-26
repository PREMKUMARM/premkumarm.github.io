import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OneMinuteRecord } from './one-minute.types';

@Injectable({
  providedIn: 'root'
})
export class OneMinuteApiService {

  constructor(private _httpClient: HttpClient) { }

  /**
     * Get the current logged in user data
     */
  getOneMinuteRecords(): Observable<OneMinuteRecord[]>
  {
      return this._httpClient.get<OneMinuteRecord[]>('api/ledger/records');
  }
  /**
   * 
   * curl --location 'https://api.upstox.com/v2/historical-candle/NSE_EQ%7CINE848E01016/1minute/2023-11-13/2023-11-12' \
--header 'Accept: application/json' 
   */
  getHistoricalData(symbol:string = 'NSE_INDEX|Nifty Bank', interval:string = '1minute', startDate: string = '2024-01-05', endDate: string = '2024-01-05'): Observable<any>
  {
      return this._httpClient.get<any>(`https://api.upstox.com/v2/historical-candle/${symbol}/${interval}/${endDate}/${startDate}`);
  }

  getIntradayCandle(symbol:string = 'NSE_INDEX|Nifty Bank', interval:string = '1minute'){
    return this._httpClient.get<any>(`https://api.upstox.com/v2/historical-candle/intraday/${symbol}/${interval}`);
  }
}
