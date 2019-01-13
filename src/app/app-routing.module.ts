import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainTablesComponent }  from './main-tables/main-tables.component';


const routes: Routes = [
  { path: 'mainTables', component: MainTablesComponent },
  { path: '', redirectTo: '/mainTables', pathMatch: 'full' },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
