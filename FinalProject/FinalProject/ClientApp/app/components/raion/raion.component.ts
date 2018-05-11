import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RaionService, Raion } from '../../services/raion.service';


@Component({
    selector: 'app-raion',
    templateUrl: './raion.component.html',
    styleUrls: ['./raion.component.css']
})
/** raion component*/
export class RaionComponent {
    public raionList: Raion[];
    statusCode: number;
    requestProcessing = false;
    raionIdToUpdate = -1;
    processValidation = false;

    raionForm = new FormGroup({
        description: new FormControl('', Validators.required),
        nalog: new FormControl('', Validators.required)
    });

    constructor(private raionService: RaionService) { }

    ngOnInit(): void {
        this.getAllRaions();
    }

    getAllRaions() {
        this.raionService.getAllRaions().subscribe(data => this.raionList = data,
            errorCode => this.statusCode = errorCode);
    }

    onRaionFormSubmit() {
        this.processValidation = true;
        if (this.raionForm.invalid) {
            return
        }
        this.preProcessConfigurations();
        var raion = this.raionForm.value;
        console.log(raion);
        if (this.raionIdToUpdate == -1) {
            this.raionService.createRaion(raion).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllRaions();
                this.backToCreateRaion();
            },
                errorCode => this.statusCode = errorCode);
        }
        else {
            raion.id = this.raionIdToUpdate;
            this.raionService.updateRaion(raion).subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllRaions();
                this.backToCreateRaion();
            },
                errorCode => this.statusCode = errorCode);
        }
    }

    loadRaionToEdit(raionId: string) {
        this.preProcessConfigurations();
        this.raionService.getRaionById(raionId)
            .subscribe(raion => {
                console.log(raion)
                this.raionIdToUpdate = raion.id;
                this.raionForm.setValue(
                    {
                        description: raion.description,
                        nalog: raion.nalog,
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }

    deleteRaion(raionId: string) {
        this.preProcessConfigurations();
        this.raionService.deleteRaionById(raionId)
            .subscribe(successCode => {
                this.statusCode = 204;
                this.getAllRaions();
                this.backToCreateRaion();
            },
            errorCode => this.statusCode = errorCode);
    }

    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }
    backToCreateRaion() {
        this.raionIdToUpdate = -1;
        this.raionForm.reset();
        this.processValidation = false;
    }
}