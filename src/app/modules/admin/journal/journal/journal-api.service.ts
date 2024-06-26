import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LedgerRecord } from './journal.types';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JournalApiService {

  constructor(private _httpClient: HttpClient) { }

  /**
     * Get the current logged in user data
     */
  getAccountBalance(): Observable<any>
  {
      return this._httpClient.get<any>(`${environment.api_host}/getBalance`);
  }

  placeOrder(instrument_key, buy_price, stoploss, qty) : Observable<any>
  {
    let payload = {
      quantity: qty,
      product: 'D',
      validity: 'DAY',
      price: buy_price,
      instrument_token: instrument_key,//'NSE_FO|46344',
      order_type: 'SL',
      transaction_type: 'BUY',
      disclosed_quantity: 0,
      trigger_price: stoploss,
      is_amo: false,
    };

    return this._httpClient.post<any>(`${environment.api_host}/placeOrder`, payload);
  }

  getCandles(instrument_key) {
    return this._httpClient.get<any>(`${environment.api_host}/getCandle/${instrument_key}/1minute/2024-04-15/2024-04-16`);
    
  }

  placeSellOrder(instrument_key, sell_price, qty) : Observable<any>
  {
    let payload = {
      quantity: qty,
      product: 'D',
      validity: 'DAY',
      price: sell_price,
      instrument_token: instrument_key,//'NSE_FO|46344',
      order_type: 'LIMIT',
      trigger_price: sell_price,
      transaction_type: 'SELL',
      disclosed_quantity: 0,
      is_amo: false,
    };

    return this._httpClient.post<any>(`${environment.api_host}/placeOrder`, payload); 
  }

  modifyOrder(orderId, instrument_key, buy_price, stoploss, qty) : Observable<any>
  {
    let payload = {
      orderId: orderId,
      quantity: qty,
      product: 'D',
      validity: 'DAY',
      price: buy_price,
      instrument_token: instrument_key,
      order_type: 'SL',
      transaction_type: 'BUY',
      disclosed_quantity: 0,
      trigger_price: stoploss,
      is_amo: false,
    };

    return this._httpClient.post<any>(`${environment.api_host}/modifyOrder`, payload);
  }

  cancelOrder(orderId) : Observable<any>
  {
    let payload = {
      order_id: Number(orderId)
    };

    return this._httpClient.post<any>(`${environment.api_host}/cancelOrder`, payload);
  }

  getPositions(): Observable<any> {
    return this._httpClient.get<any>(`${environment.api_host}/getPositions`);
  }

  getOrders(): Observable<any> {
    return this._httpClient.get<any>(`${environment.api_host}/getOrders`);
  }

  getOptionChain(instrument_key, token) {
    return this._httpClient.get<any>(`https://api.upstox.com/v2/option/contract?instrument_key=${instrument_key}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  getPortfolioWsUrl() {
    return this._httpClient.get<any>(`${environment.api_host}/ws-portfolio`);
  }

  getOrdersWsUrl() {
    return this._httpClient.get<any>(`${environment.api_host}/ws-orders`);
  }

  getAccessToken() {
    return this._httpClient.get<any>(`${environment.api_host}/access-token`);
  }
}
