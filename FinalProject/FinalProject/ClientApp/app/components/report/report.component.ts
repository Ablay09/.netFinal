import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Report, ReportService } from '../../services/report.service';
import { Kvartira, KvartirasService } from '../../services/kvartiras.service';
import { Arenda, ArendaService } from '../../services/arenda.service';
import { Raion, RaionService } from '../../services/raion.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
/** report component*/
export class ReportComponent {
    public reportList: Report[];
    public arendaList: Arenda[];
    public kvartiraList: Kvartira[];
    public raionList: Raion[];


    statusCode: number;
    requestProcessing = false;
    reportIdToUpdate = -1;
    processValidation = false;

    reportForm = new FormGroup({
        kvartiraId: new FormControl('', Validators.required),
        arendaId: new FormControl('', Validators.required),
        raionId: new FormControl('', Validators.required),
    });

    constructor(private reportService: ReportService, private arendaService: ArendaService, private kvartirasService: KvartirasService, private raionService: RaionService) { }

    ngOnInit(): void {
        this.getAllReports();
        this.getAllArendas();
        this.getAllKvartiras();
        this.getAllRaions();
    }
    getAllReports() {
        this.reportService.getAllReports().subscribe(data => this.reportList = data,
            errorCode => this.statusCode = errorCode);
    }
    getAllRaions() {
        this.raionService.getAllRaions().subscribe(data => this.raionList = data,
            errorCode => this.statusCode = errorCode);
    }

    getAllArendas() {
        this.arendaService.getAllArendas().subscribe(data => this.arendaList = data,
            errorCode => this.statusCode = errorCode);
    }
    getAllKvartiras() {
        this.kvartirasService.getAllKvartiras().subscribe(data => this.kvartiraList = data,
            errorCode => this.statusCode = errorCode);
    }

    onReportFormSubmit() {
        this.processValidation = true;
        if (this.reportForm.invalid) {
            return
        }
        this.preProcessConfigurations();
        var report = this.reportForm.value;
        console.log(report);
        if (this.reportIdToUpdate == -1) {
            this.reportService.createReport(report).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllReports();
                this.backToCreateReport();
            },
                errorCode => this.statusCode = errorCode);
        }
        else {
            report.id = this.reportIdToUpdate;
            this.reportService.updateReport(report).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllReports();
                this.backToCreateReport();
            },
                errorCode => this.statusCode = errorCode);
        }
    }

    loadReportToEdit(reportId: string) {
        this.preProcessConfigurations();
        this.reportService.getReportById(reportId)
            .subscribe(report => {
                console.log(report)
                this.reportIdToUpdate = report.id;
                this.reportForm.setValue(
                    {
                        kvartiraId: report.kvartiraId,
                        arendaId: report.arendaId,
                        raionId: report.raionId,
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }
    deleteReport(reportId: string) {
        this.preProcessConfigurations();
        this.reportService.deleteReportById(reportId)
            .subscribe(successCode => {
                this.statusCode = 204;
                this.getAllReports();
                this.backToCreateReport();
            },
            errorCode => this.statusCode = errorCode);
    }

    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }
    backToCreateReport() {
        this.reportIdToUpdate = -1;
        this.reportForm.reset();
        this.processValidation = false;
    }
}