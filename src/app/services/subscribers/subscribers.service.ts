import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  private url = 'https://lab.app.invertebrado.co/api/';

  constructor(private http: HttpClient) { }

  getSusbcribers(criteria: string, page?: number, count?: number, sortOrder?: string, sortType?: number): Observable<any> {
    let params = new HttpParams();

    if (criteria) {
      params = params.set('criteria', criteria);
    }
    if (page) {
      params = params.set('page', page.toString());
    }
    if (count) {
      params = params.set('count', count.toString());
    }
    if (sortOrder) {
      params = params.set('sortOrder', sortOrder);
    }
    if (sortType) {
      params = params.set('sortType', sortType.toString());
    }

    return this.http.get<any>(`${this.url}/subscribers`, { params });
  }

  getSubscriberById(id: number): Observable<any>{
    return this.http.get<any>(`${this.url}/subscribers/${id}`);
  }

  createSubscribers(subscribers: any[]): Observable<any> {
    const url = `${this.url}/subscribers`;
    return this.http.post<any>(url, { Subscribers: subscribers });
  }

  deleteSubscriberById(id: number): Observable<any> {
    const url = `${this.url}/subscribers/${id}`;
    return this.http.delete<any>(url);
  }

  updateSubscriberById(id: number, subscriber: {}): Observable<any> {
    const url = `${this.url}/subscribers/${id}`;
    return this.http.put<any>(url, subscriber);
  }

}
