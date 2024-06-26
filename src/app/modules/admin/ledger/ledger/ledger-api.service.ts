import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LedgerRecord } from './ledger.types';

@Injectable({
  providedIn: 'root'
})
export class LedgerApiService {

  constructor(private _httpClient: HttpClient) { }

  /**
     * Get the current logged in user data
     */
  getLedgerRecords(): Observable<LedgerRecord[]>
  {
      return this._httpClient.get<LedgerRecord[]>('api/ledger/records');
  }
}
