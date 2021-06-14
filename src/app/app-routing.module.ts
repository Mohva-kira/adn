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



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegisterComponent },
  // { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'adn', component: AdnFormComponent,canActivate: [AuthGuard] },

  { path: 'viewadn', component: AdnComponent,canActivate: [AuthGuard] },
  { path: 'allAdn', component: AllAdnComponent,canActivate: [AuthGuard] },
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
  },
  { path: 'allAdnIncomplet', component: AdnIncompletComponent,canActivate: [AuthGuard] },
  { path: 'allAdnValidate', component: AdnValidatedComponent,canActivate: [AuthGuard] },
  { path: 'allAdnWaiting', component: AdnWaitingComponent,canActivate: [AuthGuard] },

  {
    path: 'detail/:id',
    canActivate: [AuthGuard],
    component: AdnComponent,

  },
  {
    path: 'admin',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    // data: {
    //   roles: [
    //     Role.ADMIN,
    //   ]
    // },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
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
