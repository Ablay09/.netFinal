import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class RaionService {
    baseUrl = "";
    Url = 'api/Raions';

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }

    getAllRaions(): Observable<Raion[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    createRaion(raion: Raion): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, raion, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    getRaionById(raionId: string): Observable<Raion> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + raionId);
        return this.http.get(this.baseUrl + "/" + raionId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateRaion(raion: Raion): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + raion.id, raion, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    deleteRaionById(raionId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + raionId)
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
export class Raion {
    public id: number;
    public description: string;
    public nalog: number;
}