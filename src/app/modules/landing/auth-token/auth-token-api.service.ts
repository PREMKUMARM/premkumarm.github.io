import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenApiService {

  constructor(private _httpClient: HttpClient) { }

  /**
     * Get the current logged in user data
     */
  getAccessToken(code): Observable<any>
  {

    let payload = {
      'code': code,
      'client_id': 'da8937b6-0ec9-4cdb-ab52-805f0d48817b',
      'client_secret': 'p4p2t9hjgi',
      'redirect_uri': 'https://www.tradehandler.com/auth-token',
      'grant_type': 'authorization_code',
    };

      return this._httpClient.post('https://api.upstox.com/v2/login/authorization/token', new URLSearchParams(payload),
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
  }

  setAccessToken(token): Observable<any>
  {

    let payload = {
      'access-token': token
    };

      return this._httpClient.post('https://api.tradehandler.com/set-token', (payload),
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
  }
}
