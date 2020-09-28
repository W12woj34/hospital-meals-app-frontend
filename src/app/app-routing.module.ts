import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginSiteComponent} from './login-module/login-site/login-site.component';
import {KitchenMainComponent} from './kitchen-dietitian-module/kitchen-main/kitchen-main.component';
import {MovementMainComponent} from './patient-movement-module/movement-main/movement-main.component';
import {DietitianMainComponent} from './ward-dietitian-module/dietitian-main/dietitian-main.component';
import {NurseMainComponent} from './ward-nurse-module/nurse-main/nurse-main.component';
import {ApiService} from './service/api.service';

const routes: Routes = [
  {path: 'login', component: LoginSiteComponent},
  {path: 'kitchenDietitian', component: KitchenMainComponent},
  {path: 'wardDietitian', component: DietitianMainComponent, canActivate: [ApiService]},
  {path: 'wardNurse', component: NurseMainComponent, canActivate: [ApiService]},
  {path: 'patientMovement', component: MovementMainComponent, canActivate: [ApiService]},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
