import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent {

  render_dialog=false;

constructor(private dashboardDataService: DashboardDataService,private authService:AuthService){}

  project_managers:any;
  name:any;
  admin:boolean=false;
  ngOnInit(){
    this.getData();
    if (this.authService.getSession('user_role') == "ADMIN") {
      this.admin = true;
  }
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

    this.render_dialog=true;
  }
  saveProjectManager(){
    this.dashboardDataService.saveProjectManager(this.name).subscribe((requirements: any) => {
      console.log("Project Manager saved successfully");
      this.getData();
      this.render_dialog=false;
  }, (err: any) => {
      console.log(err);
  }
  );
  }
  closePopup() {
    this.render_dialog=false;
  }


}
