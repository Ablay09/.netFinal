import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Raion } from './raion.service';

@Injectable()
export class KvartirasService {
    baseUrl = "";
    Url = 'api/Kvartiras';
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }
    getAllKvartiras(): Observable<Kvartira[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createKvartira(kvartira: Kvartira): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, kvartira, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    getKvartiraById(kvartiraId: string): Observable<Kvartira> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + kvartiraId);
        return this.http.get(this.baseUrl + "/" + kvartiraId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateKvartira(kvartira: Kvartira): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + kvartira.id, kvartira, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    deleteKvartiraById(kvartiraId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + kvartiraId)
            .map(success => success.status)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}
export class Kvartira {
    public id: number;
    public address: string;
    public price: number;
    public raionId: number;
    public raion: Raion;
}