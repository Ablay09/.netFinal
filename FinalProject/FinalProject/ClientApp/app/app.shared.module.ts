import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { BrowserModule } from '@angular/platform-browser';
import { RaionComponent } from './components/raion/raion.component';
import { RaionService } from './services/raion.service';
import { KvartirasService } from './services/kvartiras.service';
import { KvartiraComponent } from './components/kvartira/kvartira.component';
import { ArendaService } from './services/arenda.service';
import { ArendaComponent } from './components/arenda/arenda.component';

import { DetailService } from './services/detail.service';
import { DetailComponent } from './components/detail/detail.component';
import { ReportService } from './services/report.service';
import { ReportComponent } from './components/report/report.component';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        RaionComponent,
        KvartiraComponent,
        DetailComponent,
        ReportComponent,
        ArendaComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'raion', component: RaionComponent },
            { path: 'arenda', component: ArendaComponent },
            { path: 'kvartira', component: KvartiraComponent },
            { path: 'detail', component: DetailComponent },
            { path: 'report', component: ReportComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        RaionService,
        KvartirasService,
        ReportService,
        ArendaService,
        DetailService
    ]
})
export class AppModuleShared {
}
