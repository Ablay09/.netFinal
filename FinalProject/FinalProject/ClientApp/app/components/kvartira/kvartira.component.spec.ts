/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { KvartiraComponent } from './kvartira.component';

let component: KvartiraComponent;
let fixture: ComponentFixture<KvartiraComponent>;

describe('kvartira component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ KvartiraComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(KvartiraComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});