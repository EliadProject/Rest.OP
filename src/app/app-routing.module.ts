import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainTablesComponent }  from './main-tables/main-tables.component';
import { LoginComponent } from './login/login.component';
import {NeedAuthGuard} from './auth.guard';

/*
const routes: Routes = [
  { path: 'mainTables', component: MainTablesComponent },
  { path: '', redirectTo: '/mainTables', pathMatch: 'full' },
   
];
*/

const appRoutes: Routes = [
  {
    path: 'mainTables',
    component: MainTablesComponent,
    canActivate: [NeedAuthGuard]
  },
  {
    path: 'Login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
