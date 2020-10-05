import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { CitiesComponent } from './cities/cities.component';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';
import { PrognoseComponent } from './prognose/prognose.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    TableComponent,
    ChartComponent,
    PrognoseComponent,
    FooterComponent,
    HeaderComponent,
    DisclaimerComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
