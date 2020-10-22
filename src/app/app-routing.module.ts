import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginSiteComponent} from './login-module/login-site/login-site.component';
import {KitchenMainComponent} from './kitchen-dietitian-module/kitchen-main/kitchen-main.component';
import {MovementMainComponent} from './patient-movement-module/movement-main/movement-main.component';
import {DietitianMainComponent} from './ward-dietitian-module/dietitian-main/dietitian-main.component';
import {NurseMainComponent} from './ward-nurse-module/nurse-main/nurse-main.component';
import {NurseMealsOrdersComponent} from './ward-nurse-module/nurse-meals-orders/nurse-meals-orders.component';
import {PatientMovementLogsComponent} from './patient-movement-module/patient-movement-logs/patient-movement-logs.component';
import {PatientMovementWorkersComponent} from './patient-movement-module/patient-movement-workers/patient-movement-workers.component';
import {KitchenGuard} from './login-module/guards/kitchen.guard';
import {MovementGuard} from './login-module/guards/movement.guard';
import {NurseGuard} from './login-module/guards/nurse.guard';
import {DietitianGuard} from './login-module/guards/dietitian.guard';

const routes: Routes = [
  {path: 'login', component: LoginSiteComponent},
  {path: 'kitchenDietitian', component: KitchenMainComponent, canActivate: [KitchenGuard]},
  {path: 'wardDietitian', component: DietitianMainComponent, canActivate: [DietitianGuard]},
  {path: 'wardNurse', component: NurseMainComponent, canActivate: [NurseGuard]},
  {path: 'wardNurseOrders', component: NurseMealsOrdersComponent, canActivate: [NurseGuard]},
  {path: 'patientMovement', component: MovementMainComponent, canActivate: [MovementGuard]},
  {path: 'patientMovementLogs', component: PatientMovementLogsComponent, canActivate: [MovementGuard]},
  {path: 'patientMovementWorkers', component: PatientMovementWorkersComponent, canActivate: [MovementGuard]},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
