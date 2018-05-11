import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Arenda } from './arenda.service';
import { Kvartira } from './kvartiras.service';
import { Raion } from './raion.service';

@Injectable()
export class ReportService {
    baseUrl = "";
    Url = 'api/Reports';

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + this.Url;
    }
    getAllReports(): Observable<Report[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    createReport(report: Report): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.baseUrl, report, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    getReportById(reportId: string): Observable<Report> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.baseUrl + "/" + reportId);
        return this.http.get(this.baseUrl + "/" + reportId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateReport(report: Report): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.baseUrl + "/" + report.id, report, options)
            .map(success => success.status)
            .catch(this.handleError);
    }
    deleteReportById(reportId: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.baseUrl + "/" + reportId)
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
export class Report {
    public id: number;
    public kvartiraId: number;
    public kvartira: Kvartira;
    public arendaId: number;
    public arenda: Arenda;
    public raionId: number;
    public raion: Raion;
}