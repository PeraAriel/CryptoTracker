import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

  constructor(private http: HttpClient) {}

  getCryptos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
