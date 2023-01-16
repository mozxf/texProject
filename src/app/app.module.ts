import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardMainComponent } from './pages/dashboard/dashboard-main/dashboard-main.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, DashboardModule, AuthModuleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
