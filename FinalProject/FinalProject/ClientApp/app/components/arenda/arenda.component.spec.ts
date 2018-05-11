/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ArendaComponent } from './arenda.component';

let component: ArendaComponent;
let fixture: ComponentFixture<ArendaComponent>;

describe('arenda component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ArendaComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ArendaComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});