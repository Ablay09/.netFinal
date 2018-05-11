import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Arenda, ArendaService } from '../../services/arenda.service';
import { Raion, RaionService  } from '../../services/raion.service';

@Component({
    selector: 'app-arenda',
    templateUrl: './arenda.component.html',
    styleUrls: ['./arenda.component.css']
})
/** arenda component*/
export class ArendaComponent {
    public arendaList: Arenda[];
    public raionList: Raion[];

    statusCode: number;
    requestProcessing = false;
    arendaIdToUpdate = -1;
    processValidation = false;

    arendaForm = new FormGroup({
        start: new FormControl('', Validators.required),
        finish: new FormControl('', Validators.required),
        raionId: new FormControl('', Validators.required),
    });

    constructor(private arendaService: ArendaService, private raionService: RaionService) { }

    ngOnInit(): void {
        this.getAllArendas();
        this.getAllRaions();
    }

    getAllArendas() {
        this.arendaService.getAllArendas().subscribe(data => this.arendaList = data,
            errorCode => this.statusCode = errorCode);
    }
    getAllRaions() {
        this.raionService.getAllRaions().subscribe(data => this.raionList = data,
            errorCode => this.statusCode = errorCode);
    }
    onArendaFormSubmit() {
        this.processValidation = true;
        if (this.arendaForm.invalid) {
            return;
        }
        this.preProcessConfigurations();
        let arenda = this.arendaForm.value;
        console.log(arenda);
        if (this.arendaIdToUpdate == -1) {
            this.arendaService.createArenda(arenda)
                .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllArendas();
                    this.backToCreateArenda();
                },
                errorCode => this.statusCode = errorCode
                );
        } else {
            arenda.id = this.arendaIdToUpdate;
            this.arendaService.updateArenda(arenda)
                .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllArendas();
                    this.backToCreateArenda();
                },
                errorCode => this.statusCode = errorCode);
        }
    }

    loadArendaToEdit(arendaId: string) {
        this.preProcessConfigurations();
        this.arendaService.getArendaById(arendaId)
            .subscribe(arenda => {
                console.log(arenda)
                this.arendaIdToUpdate = arenda.id;
                var datePipe = new DatePipe("en-US");
                var st = datePipe.transform(arenda.start, 'yyyy-MM-dd');
                console.log(st)
                var et = datePipe.transform(arenda.finish, 'yyyy-MM-dd');
                this.arendaForm.setValue(
                    {
                        raionId: arenda.raionId,
                        start: st,
                        finish: et
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }
    deleteArenda(arendaId: string) {
        this.preProcessConfigurations();
        this.arendaService.deleteArendaById(arendaId)
            .subscribe(successCode => {
                this.statusCode = 204;
                this.getAllArendas();
                this.backToCreateArenda();
            },
            errorCode => this.statusCode = errorCode);
    }

    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }

    backToCreateArenda() {
        this.arendaIdToUpdate = -1;
        this.arendaForm.reset();
        this.processValidation = false;
    }
}