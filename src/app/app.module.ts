import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule , MatMenuModule} from '@angular/material';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainTablesComponent } from './main-tables/main-tables.component';
import { FooterComponent } from './footer/footer.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';


import { BarChartComponent } from './bar-chart/bar-chart.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};

const appRoutes: Routes = [
  { path: "barChart", component: BarChartComponent },
  { path: "mainTables", component: MainTablesComponent },
  { path: "", redirectTo: "mainTables", pathMatch: "full" },
  { path: "**", redirectTo: "mainTables", pathMatch: "full" }
];

@NgModule({
  declarations: [   
    AppComponent,
    SideNavbarComponent,
    NavbarComponent,
    BarChartComponent,
    MainTablesComponent,
    FooterComponent,
    

  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    SocketIoModule.forRoot(config) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
