import { DeclarationComponent } from './declaration/declaration.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MchRoutingModule } from './mch-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Router, RouterModule } from '@angular/router';

import { UserRoleDirective } from '../manager/user-role.directive';
import { UserDirective } from '../manager/user.directive';

import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { NgxPrintModule } from 'ngx-print';
import {MatSelectModule} from '@angular/material/select';
import { VoletComponent } from './volet/volet.component';
import { DetailVoletComponent } from './detail-volet/detail-volet.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DeclarationComponent,
    VoletComponent,
    DetailVoletComponent,
    ConfirmDeleteComponent

  ],
  imports: [
    CommonModule,
    MchRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    NgxPrintModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule

  ]
})
export class MchModule { }
