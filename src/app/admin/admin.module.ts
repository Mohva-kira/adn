import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DashbordComponent } from './dashbord/dashbord.component';
import { Router, RouterModule } from '@angular/router';
import { routes, AdminRoutingModule } from './admin-routing.module';

import { MairieConfComponent } from './mairie-conf/mairie-conf.component';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    DashbordComponent,

    MairieConfComponent
  ],
  imports: [
    RouterModule,
    AdminRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatButtonModule,
    CommonModule,
    ToastrModule



  ],
  providers: []
})
export class AdminModule { }
