import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Arenda } from './arenda.service';
import { Kvartira } from './kvartiras.service';


@Injectable()
export class DetailService {
    baseUrl = "";
    Url = 'api/Details';

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }

    getAllDetails(): Observable<Detail[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    createDetail(detail: Detail): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, detail, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    getDetailById(detailId: string): Observable<Detail> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + detailId);
        return this.http.get(this.baseUrl + "/" + detailId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateDetail(detail: Detail): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + detail.id, detail, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    deleteDetailById(detailId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + detailId)
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

export class Detail {
    public id: number;
    public kvartiraId: number;
    public kvartira: Kvartira;
    public arendaId: number;
    public arenda: Arenda;
}