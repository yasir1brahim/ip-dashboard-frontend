import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DashboardDataService } from '../dashboard-data.service';
import { Dashboard } from './model/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dashboards: Dashboard[] = [];
  dashboard: Dashboard={ "id":"1", "developer": "", "project": "", "project_manager": "" };
  id: any;
  admin: boolean = false;
  render_dialog = false;
  render_dialog1 = false;
  projects: any;
  constructor(private dashboardDataService: DashboardDataService, private authService: AuthService) {
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
      this.dashboardDataService.saveDashboardData(this.dashboard!.developer, this.dashboard!.project).subscribe((result: any) => {
        console.log("dashboard saved successfully");
        this.getData();
        this.render_dialog = false;
      }, (err: any) => {
        console.log(err);
      }
      );

  }



  openPopupDashboard(id: any) {
      this.dashboard.developer = "";
      this.dashboard.project = "";
      this.dashboard.project_manager = "";
      this.dashboard.id = "0";
    this.getProjects();
    this.render_dialog = true;
  }

  openPopupDelete(id: any) {

    this.id = id;

    this.render_dialog1 = true;
  }

  deleteData() {
    this.dashboardDataService.deleteDashboardData(this.id).subscribe((data: any) => {
      console.log("dashboard data deleted successfully");
      this.getData();
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


  onChange(id: any, developer: any, project: any) {
    this.dashboardDataService.updateDashboardData(id, developer, project).subscribe((result: any) => {
      console.log("dashboard saved successfully");
      this.getData();
      this.render_dialog = false;
    }, (err: any) => {
      console.log(err);
    }
    );

  }
}
