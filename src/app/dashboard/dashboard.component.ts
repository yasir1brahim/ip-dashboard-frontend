import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { Dashboard } from './model/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dashboards: Dashboard[] = [];
  dashboard: Dashboard={ "id":"1", "developer": "Waqar", "project": "project1", "project_manager": "daniyal" };
  id:any;
  admin:boolean=false;

  displayStyle = "none";
  displayStyle1= "none";
  // dashboard1: Dashboard = { id:'1', developer: 'Waqar', project: 'project1', project_manager: 'daniyal' };
  // dashboard2: Dashboard = { id:'2', developer: 'Osama', project: 'project2', project_manager: 'daniyal' };
  // dashboard3: Dashboard = { id:'3', developer: 'Waqar', project: 'project3', project_manager: 'daniyal' };
  // dashboards: Dashboard[] = [this.dashboard1, this.dashboard2, this.dashboard3];


  projects: any;
  constructor(private dashboardDataService: DashboardDataService) {
  }

  ngOnInit() {
    this.getData();
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
        this.displayStyle='none'
      }, (err: any) => {
        console.log(err);
      }
      );
    }
    else{
      this.dashboardDataService.updateDashboardData(id,this.dashboard!.developer,this.dashboard!.project,this.dashboard!.project_manager).subscribe((result: any) => {
        console.log("dashboard saved successfully");
        this.getData();
        this.displayStyle='none';
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

    this.displayStyle = "block";
  }

  openPopupDelete(id: any) {

    this.id=id;

    this.displayStyle1 = "block";
  }

  deleteData(){
    this.dashboardDataService.deleteDashboardData(this.id).subscribe((data: any) => {
      console.log("dashboard data deleted successfully");
      this.getData();
      this.displayStyle1="none";
    }, (err: any) => {
      console.log(err);
    }
    );
    
   
  }

  closePopup() {
    this.displayStyle = "none";
    this.displayStyle1="none";
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
