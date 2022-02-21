import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  InvetoryRecord: any = undefined;
  UpdateInventoryRec = new BehaviorSubject(this.InvetoryRecord);

  constructor(private _http: HttpClient) {}

  // Get Request fro server .
  getData(apiUrl: string, apiName: string) {
    const url = `${apiUrl}${apiName}`;
    return this._http.get(url);
  }

  // Post Data to server .
  postData(apiUrl: string, apiName: string, data: any) {
    const url = `${apiUrl}${apiName}`;
    const body = data;
    return this._http.post(url, body);
  }

  // Update Data for record
  putData(apiUrl: string, apiName: string, data: any) {
    const url = `${apiUrl}${apiName}`;
    const body = data;
    return this._http.put(url, body);
  }

  // Delete Record From database
  deleteData(apiUrl: string, apiName: string) {
    const url = `${apiUrl}${apiName}`;
    return this._http.delete(url);
  }
}
