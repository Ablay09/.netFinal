import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Detail, DetailService } from '../../services/detail.service';
import { Kvartira, KvartirasService } from '../../services/kvartiras.service';
import { Arenda, ArendaService } from '../../services/arenda.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
/** detail component*/
export class DetailComponent {
    public detailList: Detail[];
    public arendaList: Arenda[];
    public kvartiraList: Kvartira[];
    

    statusCode: number;
    requestProcessing = false;
    detailIdToUpdate = -1;
    processValidation = false;

    detailForm = new FormGroup({
        kvartiraId: new FormControl('', Validators.required),
        arendaId: new FormControl('', Validators.required),
    });

    constructor(private detailService: DetailService, private arendaService: ArendaService, private kvartirasService: KvartirasService) { }

    ngOnInit(): void {
        this.getAllDetails();
        this.getAllArendas();
        this.getAllKvartiras();
    }
    getAllDetails() {
        this.detailService.getAllDetails().subscribe(data => this.detailList = data,
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

    onDetailFormSubmit() {
        this.processValidation = true;
        if (this.detailForm.invalid) {
            return
        }
        this.preProcessConfigurations();
        var detail = this.detailForm.value;
        console.log(detail);
        if (this.detailIdToUpdate == -1) {
            this.detailService.createDetail(detail).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllDetails();
                this.backToCreateDetail();
            },
                errorCode => this.statusCode = errorCode);
        }
        else {
            detail.id = this.detailIdToUpdate;
            this.detailService.updateDetail(detail).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllDetails();
                this.backToCreateDetail();
            },
                errorCode => this.statusCode = errorCode);
        }
    }

    loadDetailToEdit(detailId: string) {
        this.preProcessConfigurations();
        this.detailService.getDetailById(detailId)
            .subscribe(detail => {
                console.log(detail)
                this.detailIdToUpdate = detail.id;
                this.detailForm.setValue(
                    {
                        kvartiraId: detail.kvartiraId,
                        arendaId: detail.arendaId,
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }
    deleteDetail(detailId: string) {
        this.preProcessConfigurations();
        this.detailService.deleteDetailById(detailId)
            .subscribe(successCode => {
                this.statusCode = 204;
                this.getAllDetails();
                this.backToCreateDetail();
            },
            errorCode => this.statusCode = errorCode);
    }

    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }
    backToCreateDetail() {
        this.detailIdToUpdate = -1;
        this.detailForm.reset();
        this.processValidation = false;
    }
}