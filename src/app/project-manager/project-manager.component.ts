import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent {


constructor(private dashboardDataService: DashboardDataService){}

  project_managers:any
  ngOnInit(){
    this.getData();
  }
  
  
  getData(){
    this.dashboardDataService.getProjectManagerData().subscribe((project_managers: any) => {
      this.project_managers=project_managers
      console.log("length");
      console.log(this.project_managers[0]);
  }, (err: any) => {
      console.log(err);
  }
  );
  }

}
