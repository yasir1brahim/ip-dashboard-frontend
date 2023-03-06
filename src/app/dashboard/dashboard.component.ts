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
  dashboard: Dashboard;
  id:any;
  admin:boolean=false;
  render_dialog=false;
  render_dialog1=false;
  // dashboard1: Dashboard = { id:'1', developer: 'Waqar', project: 'project1', project_manager: 'daniyal' };
  // dashboard2: Dashboard = { id:'2', developer: 'Osama', project: 'project2', project_manager: 'daniyal' };
  // dashboard3: Dashboard = { id:'3', developer: 'Waqar', project: 'project3', project_manager: 'daniyal' };
  // dashboards: Dashboard[] = [this.dashboard1, this.dashboard2, this.dashboard3];


  projects: any;
  constructor(private dashboardDataService: DashboardDataService,private authService:AuthService) {
  }

  ngOnInit() {
    this.getData();
    if (this.authService.getSession('user_role') == "ADMIN") {
      this.admin = true;
  }
  }

  getData(): void {
    this.dashboardDataService.getDashboardData().subscribe((dashboards: any) => {
      this.dashboards = dashboards
     console.log('dash',this.dashboards)
      
    }, (err: any) => {
      console.log(err);
    }
    );
  }

  saveData(id:any){
    if(id==0){
      this.dashboardDataService.saveDashboardData(this.dashboard!.developer,this.dashboard!.project,this.dashboard!.project_manager).subscribe((result: any) => {
        console.log("dashboard saved successfully");
        this.getData();
        this.render_dialog=false;
      }, (err: any) => {
        console.log(err);
      }
      );
    }
    else{
      this.dashboardDataService.updateDashboardData(id,this.dashboard!.developer,this.dashboard!.project,this.dashboard!.project_manager).subscribe((result: any) => {
        console.log("dashboard saved successfully");
        this.getData();
        this.render_dialog=false;
      }, (err: any) => {
        console.log(err);
      }
      );
    }
    
  }

  

  openPopupDashboard(id: any) {
    if(id==0){
      this.dashboard.developer="";
      this.dashboard.project="";
      this.dashboard.project_manager="";
      this.dashboard.id="0";
    }

    this.getProjects();
    this.dashboardDataService.getDashboardDataSingleRecord(id).subscribe((dashboard: any) => {
      this.dashboard = dashboard;
    }, (err: any) => {
      console.log(err);
    }
    );

    this.render_dialog=true;
  }

  openPopupDelete(id: any) {

    this.id=id;

    this.render_dialog1=true;
  }

  deleteData(){
    this.dashboardDataService.deleteDashboardData(this.id).subscribe((data: any) => {
      console.log("dashboard data deleted successfully");
      this.getData();
      this.render_dialog1=false;
    }, (err: any) => {
      console.log(err);
    }
    );
    
   
  }

  closePopup() {
    this.render_dialog=false;
    this.render_dialog1=false;
  }

  getProjects(){
    this.dashboardDataService.getProjects().subscribe((projects: any) => {
      this.projects = projects;
    }, (err: any) => {
      console.log(err);
    }
    );
  }
}
