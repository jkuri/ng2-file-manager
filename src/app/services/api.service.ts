import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../config';

@Injectable()
export class ApiService {
  private url: string = API_URL;

  constructor(public http: Http) { }

  getFiles(path: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('path', path);

    return this.http.get(`${this.url}/files`, { search: params })
              .map(this.extractData)
              .catch(this.handleError);
  }

  getFolderSize(path: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('path', path);

    return this.http.get(`${this.url}/folder-size`, { search: params })
              .map(this.extractData)
              .catch(this.handleError);
  }

  deleteFileOrFolder(path: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('path', path);

    return this.http.get(`${this.url}/delete`, { search: params })
              .map(this.extractData)
              .catch(this.handleError);
  }

  newFolder(path: string, name: string): Observable<any> {
    let data = { path: path, name: name };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/new-folder`, JSON.stringify(data), options)
              .map(this.extractData)
              .catch(this.handleError);
  }

  renameFolder(newPath: string, oldPath: string): Observable<any> {
    let data = { newPath: newPath, oldPath: oldPath };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/rename`, JSON.stringify(data), options)
              .map(this.extractData)
              .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return { data: body.data, type: body.type || null } || {};
  }

  private handleError(error: any) {
    let errMsg = `Server error`;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

export const ApiProvider = { provide: ApiService, useClass: ApiService };
