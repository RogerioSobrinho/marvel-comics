import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class HttpStatusService {

  private url = '';
  private publicKey = ''; // set enviroment (WIP)
  private privateKey = ''; // set enviroment (WIP)

  constructor(private http: HttpClient) { }

  configure(url: string) {
      this.url = url;
  }

  // tslint:disable-next-line: variable-name
  setUrl(_url: string) {
      this.url = _url;
  }

  private getPublicKey() {
     return this.publicKey;
  }

  private getPrivateKey() {
    return this.privateKey;
  }

  private getTS() {
    const date = new Date();
    return date.getTime() * 1000;
  }

  private generateHash(ts: any) {
    const md5 = new Md5();
    const stringToHash = ts + this.getPrivateKey() + this.getPublicKey();
    md5.appendStr(stringToHash);
    return md5.end();
  }

  private setUrlPublicKey(url, auth) {
      if (!auth) { return url; }

      const ts = this.getTS();
      if (url.indexOf('?') > -1) {
          return `${url}&ts=${ts}&apikey=${this.getPublicKey()}&hash=${this.generateHash(ts)}`;
      }
      return `${url}?ts=${ts}&apikey=${this.getPublicKey()}&hash=${this.generateHash(ts)}`;
  }

  post(url: string, data: any, auth: boolean = false): Observable<any> {
      return this.http.post(this.setUrlPublicKey(this.url + url, auth), data, {observe: 'response'});
  }

  get(url: string, auth: boolean = false): Observable<any> {
      if (url.indexOf('http') > -1) {
          return this.http.get(url, {observe: 'response'});
      }
      return this.http.get(this.setUrlPublicKey(this.url + url, auth), {observe: 'response'});
  }

  delete(url: string, auth: boolean = false): Observable<any> {
      return this.http.delete(this.setUrlPublicKey(this.url + url, auth), {observe: 'response'});
  }

  put(url: string, data: any, auth: boolean = false): Observable<any> {
      return this.http.put(this.setUrlPublicKey(this.url + url, auth), data, {observe: 'response'});
  }
}
