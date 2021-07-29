import { User } from './manager/user';
import { ProfileComponent } from './profile/profile.component';
import { AdnWaitingComponent } from './view/adn-waiting/adn-waiting.component';
import { AdnValidatedComponent } from './view/adn-validated/adn-validated.component';
import { AdnIncompletComponent } from './view/adn-incomplet/adn-incomplet.component';
import { AllAdnComponent } from './view/all-adn/all-adn.component';
import { AuthService } from './auth.service';
import { AdnComponent } from './view/adn/adn.component';
import { AdnFormComponent } from './adn-form/adn-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { Role } from './manager/role';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoletComponent } from './view/volet/volet.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'registration', component: RegisterComponent,},
   { path: 'dashboard', component: DashboardComponent,    },
  { path: 'adn', component: AdnFormComponent,},

  { path: 'viewadn', component: AdnComponent,  },
  { path: 'allAdn', component: AllAdnComponent,},
  {
    path: 'allAdnWaiting',
    component: AdnWaitingComponent,
    data: {
      title: 'Les Adn',
      breadcrumb: [
        {
          label: 'Les ADN',
          url: ''
        }
      ]
    },
    canActivate: [AuthGuard]
  },
  { path:'profil/:id', component: ProfileComponent, canActivate: [AuthGuard]},


  {
    path: 'detail/:id',
    canActivate: [AuthGuard],
    component: AdnComponent,

  },
  {
    path: 'volet-adn/:id',

    component: VoletComponent,

  },

  {
    path: 'admin',
    // canLoad: [AuthGuard],
     canActivate: [AuthGuard],
    // data: {
    //   roles: [
    //     Role.ADMIN,
    //   ]
    // },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'mch',
    // canLoad: [AuthGuard],
     canActivate: [AuthGuard],
    // data: {
    //   roles: [
    //     Role.ADMIN,
    //   ]
    // },
    loadChildren: () => import('./mch/mch.module').then(m => m.MchModule)
  },
  { path: '*', redirectTo:'home', pathMatch: 'full' },

  { path: '**', redirectTo:'admin', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
