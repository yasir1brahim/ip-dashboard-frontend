import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css'],
  providers:[DatePipe]
})
export class ProjectManagerComponent {
dateToday:any;
  render_dialog=false;
  availabilityCount:number=0;
  total:number=0;
constructor(private dashboardDataService: DashboardDataService,private authService:AuthService,private datePipe:DatePipe){
  this.dateToday = this.datePipe.transform(new Date(),'fullDate')
}
  projects:any="";
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
      this.getAvailabilityCount();
      this.getTotal();
      }, (err: any) => {
      console.log(err);
  }
  );
  }

  openPopupProjectManager() {

    this.render_dialog=true;
  }
  saveProjectManager(){
    this.dashboardDataService.saveProjectManager(this.name,this.projects).subscribe((requirements: any) => {
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

  getAvailabilityCount(){
   this.availabilityCount= this.dashboardDataService.getAvailabilityCount();
  }

  getTotal(){
    this.total=0;
    for(let i=0;i<this.project_managers.length;i++){
      this.total+=this.project_managers[i].projects.length; 
    }
    this.total+=this.availabilityCount;
    
  }

}
