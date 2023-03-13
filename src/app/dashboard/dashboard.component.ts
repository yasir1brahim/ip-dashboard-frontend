import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { AuthService } from '../auth.service';
import { DashboardDataService } from '../dashboard-data.service';
import { Dashboard } from './model/dashboard';
import { AvailabilityComponent } from '../availability/availability.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
})
export class DashboardComponent {
  dashboards: Dashboard[] = [];
  dashboard: Dashboard={ "resource_id":"0", "name": "", "projectAssigned": "", "projectManager": "" };
  id: any;
  dateToday:any;
  admin: boolean = false;
  render_dialog = false;
  render_dialog1 = false;
  projects: any;
  projectsPopup:any;
  constructor(private dashboardDataService: DashboardDataService, 
    private authService: AuthService,private datePipe:DatePipe,private availabilityComponent:AvailabilityComponent,private router:Router) {
    this.dateToday = this.datePipe.transform(new Date(),'fullDate');
  }

  ngOnInit() {
    this.getData();
    this.getProjects();
    if (this.authService.getSession('user_role') == "ADMIN") {
      this.admin = true;
    }
  }


  getData(): void {
    this.dashboardDataService.getDashboardData().subscribe((dashboards: any) => {
      this.dashboards = dashboards
      console.log('dash', this.dashboards)

    }, (err: any) => {
      console.log(err);
    }
    );
  }

  saveData() {
      this.dashboardDataService.saveDashboardData(this.dashboard!.name/*, this.dashboard!.projectAssigned,this.dashboard!.projectManager*/).subscribe((result: any) => {
        console.log("dashboard saved successfully");
        this.getData();
        // this.getAvailabilityData();
        this.render_dialog = false;
      }, (err: any) => {
        console.log(err);
      }
      );

  }



  openPopupDashboard() {
    this.dashboard.name = "";
    this.dashboard.projectAssigned = "";
    this.dashboard.projectManager = "";
    this.dashboard.resource_id = "0";
    this.render_dialog = true;
    this.getProjectsPopup();
  }

  openPopupDelete(id: any) {

    this.id = id;

    this.render_dialog1 = true;
  }

  deleteData() {
    this.dashboardDataService.deleteDashboardData(this.id).subscribe((data: any) => {
      console.log("dashboard data deleted successfully");
      this.getData();
      // this.getAvailabilityData();
      this.render_dialog1 = false;
    }, (err: any) => {
      console.log(err);
    }
    );


  }

  closePopup() {
    this.render_dialog = false;
    this.render_dialog1 = false;
  }

  getProjects() {
    this.dashboardDataService.getProjects().subscribe((projects: any) => {
      this.projects = projects;
    }, (err: any) => {
      console.log(err);
    }
    );
  }

  getProjectsPopup() {
    this.dashboardDataService.getProjects().subscribe((projects: any) => {
      this.projectsPopup = projects;
    }, (err: any) => {
      console.log(err);
    }
    );
  }


  onChange(resource_id: any, name: any, projectAssigned: any) {
    this.dashboardDataService.updateDashboardData(resource_id, name, projectAssigned).subscribe((result: any) => {
      console.log("dashboard saved successfully");
      this.getData();
       this.getAvailabilityData();
      this.render_dialog = false;
    }, (err: any) => {
      console.log(err);
    }
    );

  }
   getAvailabilityData(){
    this.availabilityComponent.ngOnInit();
   }
}
