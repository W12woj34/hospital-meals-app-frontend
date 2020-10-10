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

const routes: Routes = [
  {path: 'login', component: LoginSiteComponent},
  {path: 'kitchenDietitian', component: KitchenMainComponent},
  {path: 'wardDietitian', component: DietitianMainComponent},
  {path: 'wardNurse', component: NurseMainComponent},
  {path: 'wardNurseOrders', component: NurseMealsOrdersComponent},
  {path: 'patientMovement', component: MovementMainComponent},
  {path: 'patientMovementLogs', component: PatientMovementLogsComponent},
  {path: 'patientMovementWorkers', component: PatientMovementWorkersComponent},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
