import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs'
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectListComponent } from './project-list/project-list.component';
import { AvailabilityComponent } from './availability/availability.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { MainComponent } from './main/main.component';
import { ProjectProjectManagerComponent } from './project-project-manager/project-project-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectListComponent,
    AvailabilityComponent,
    RequirementsComponent,
    ProjectManagerComponent,
    LoginComponent,
    MainComponent,
    ProjectProjectManagerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path:'', component: LoginComponent},
      { path: 'main', component: MainComponent /*,canActivate:[AuthGuard]*/}
    ]),
    FormsModule,
    MatTabsModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AvailabilityComponent,ProjectListComponent,ProjectManagerComponent,
    ProjectProjectManagerComponent,DashboardComponent,RequirementsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
