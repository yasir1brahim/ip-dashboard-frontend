import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent {

  displayStyle='none';

constructor(private dashboardDataService: DashboardDataService){}

  project_managers:any;
  name:any;
  ngOnInit(){
    this.getData();
  }
  
  
  getData(){
    this.dashboardDataService.getProjectManagerData().subscribe((project_managers: any) => {
      this.project_managers=project_managers
      // console.log("length");
      console.log(this.project_managers[0]);
  }, (err: any) => {
      console.log(err);
  }
  );
  }

  openPopupProjectManager() {

    this.displayStyle = "block";
  }
  saveProjectManager(){
    this.dashboardDataService.saveProjectManager(this.name).subscribe((requirements: any) => {
      console.log("Project Manager saved successfully");
      this.getData();
      this.displayStyle='none';
  }, (err: any) => {
      console.log(err);
  }
  );
  }
  closePopup() {
    this.displayStyle = "none";
  }


}
