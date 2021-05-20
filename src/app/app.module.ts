
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdnFormComponent } from './adn-form/adn-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button';

import {MatListModule} from '@angular/material/list';
import { AdnComponent } from './view/adn/adn.component';
import { AllAdnComponent } from './view/all-adn/all-adn.component';
import { AdnWaitingComponent } from './view/adn-waiting/adn-waiting.component';
import { AdnValidatedComponent } from './view/adn-validated/adn-validated.component';
// import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { AdnBtwdatesReportDetailComponent } from './admin/adn-btwdates-report-detail/adn-btwdates-report-detail.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { NewAdnComponent } from './admin/new-adn/new-adn.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { IsGrantedDirective } from './manager/is-granted.directive';
import { AdnIncompletComponent } from './view/adn-incomplet/adn-incomplet.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { NgxPrintModule } from 'ngx-print';
import {MatTableModule} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    // DashboardComponent,
    AdnFormComponent,
    AdnComponent,
    AllAdnComponent,
    AdnWaitingComponent,
    AdnValidatedComponent,
    // DashbordComponent,
    AdnBtwdatesReportDetailComponent,
    ChangePasswordComponent,
    NewAdnComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    IsGrantedDirective,
    AdnIncompletComponent,
    PrintLayoutComponent,
    SearchbarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    NgxPrintModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule






  ],
  providers: [
    DatePipe,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
