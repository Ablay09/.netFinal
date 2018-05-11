import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Kvartira, KvartirasService } from '../../services/kvartiras.service';
import { Raion, RaionService } from '../../services/raion.service';

@Component({
    selector: 'app-kvartira',
    templateUrl: './kvartira.component.html',
    styleUrls: ['./kvartira.component.css']
})
/** kvartira component*/
export class KvartiraComponent {

    public kvartiraList: Kvartira[];
    public raionList: Raion[];

    statusCode: number;
    requestProcessing = false;
    kvartiraIdToUpdate = -1;
    processValidation = false;

    kvartiraForm = new FormGroup({
        address: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        raionId: new FormControl('', Validators.required)
    });

    constructor(private kvartirasService: KvartirasService, private raionService: RaionService) { }

    ngOnInit(): void {
        this.getAllKvartiras();
        this.getAllRaions();
    }

    getAllKvartiras() {
        this.kvartirasService.getAllKvartiras().subscribe(data => this.kvartiraList = data,
            errorCode => this.statusCode = errorCode);
    }
    getAllRaions() {
        this.raionService.getAllRaions().subscribe(data => this.raionList = data,
            errorCode => this.statusCode = errorCode);
    }


    onKvartiraFormSubmit() {
        this.processValidation = true;
        if (this.kvartiraForm.invalid) {
            return; //Validation failed, exit from method.
        }
        //Form is valid, now perform create or update
        this.preProcessConfigurations();
        let kvartira = this.kvartiraForm.value;
        console.log(kvartira);
        

        if (this.kvartiraIdToUpdate == -1) {

            this.kvartirasService.createKvartira(kvartira)
                .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllKvartiras();
                    this.backToCreateKvartira();
                },
                    errorCode => this.statusCode = errorCode
                );
                
        } else {

            kvartira.id = this.kvartiraIdToUpdate;
            this.kvartirasService.updateKvartira(kvartira)
                .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllKvartiras();
                    this.backToCreateKvartira();
                },
                errorCode => this.statusCode = errorCode);
        }
    }

    loadKvartiraToEdit(kvartiraId: string) {
        this.preProcessConfigurations();
        this.kvartirasService.getKvartiraById(kvartiraId)
            .subscribe(kvartira => {
                console.log(kvartira)
                this.kvartiraIdToUpdate = kvartira.id;
                this.kvartiraForm.setValue(
                    {
                        address: kvartira.address,
                        price: kvartira.price + (kvartira.price * kvartira.raion.nalog/100),
                        raionId: kvartira.raionId
                    });
                this.processValidation = true;
                this.requestProcessing = false;
            },
            errorCode => this.statusCode = errorCode);
    }
    deleteKvartira(kvartiraId: string) {
        this.preProcessConfigurations();
        this.kvartirasService.deleteKvartiraById(kvartiraId)
            .subscribe(successCode => {

                this.statusCode = 204;
                this.getAllKvartiras();
                this.backToCreateKvartira();
            },
            errorCode => this.statusCode = errorCode);
    }


    preProcessConfigurations() {
        this.statusCode = -1;
        this.requestProcessing = true;
    }

    backToCreateKvartira() {
        this.kvartiraIdToUpdate = -1;
        this.kvartiraForm.reset();
        this.processValidation = false;
    }
}