import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Raion } from './raion.service';

@Injectable()
export class ArendaService {
    baseUrl = "";
    Url = 'api/Arendas';

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }
    getAllArendas(): Observable<Arenda[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createArenda(arenda: Arenda): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, arenda, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    getArendaById(arendaId: string): Observable<Arenda> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + arendaId);
        return this.http.get(this.baseUrl + "/" + arendaId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateArenda(arenda: Arenda): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + arenda.id, arenda, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    deleteArendaById(arendaId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + arendaId)
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
export class Arenda {
    public id: number;
    public start: Date;
    public finish: Date;
    public raionId: number;
    public raion: Raion;
}