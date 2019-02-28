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
import { LoginComponent } from './login/login.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin';
import { AuthGuard } from './_guards';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/helpers';
import { Role } from 'src/app/models';
import {ProgressBarModule} from "angular-progress-bar"
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BingMaps } from './bing-maps/bing-maps.component';
import { Scraping } from './scrap/scrap.component';
import { AgmCoreModule } from '@agm/core';

// used to create fake backend
import { fakeBackendProvider } from 'src/app/helpers';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};

const appRoutes: Routes = [
  {
    path: "",
    component: MainTablesComponent,
    canActivate: [AuthGuard]
  },
  { path: "login",
    component: LoginComponent,
  },
  { 
    path: "barChart",
    component: BarChartComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "bingMaps",
    component: BingMaps,
    canActivate: [AuthGuard]
  },
  { 
    path: "scrap",
    component: Scraping,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [   
    AppComponent,
    SideNavbarComponent,
    NavbarComponent,
    LoginComponent,
    BarChartComponent,
    BingMaps,
    Scraping,
    MainTablesComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    ProgressBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKySFqU4vetducd1PsW77L9cAlElWly-8'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
