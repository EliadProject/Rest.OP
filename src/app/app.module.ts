import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainTablesComponent } from './main-tables/main-tables.component';
import { FooterComponent } from './footer/footer.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LoginComponent } from './login/login.component';
import {NeedAuthGuard} from './auth.guard';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};

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
  declarations: [   
    AppComponent,
    SideNavbarComponent,
    NavbarComponent,
    MainTablesComponent,
    FooterComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SocketIoModule.forRoot(config), 
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
