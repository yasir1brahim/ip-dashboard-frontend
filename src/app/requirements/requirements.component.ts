import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { ProjectList } from '../project-list/model/project-list';
import { Requirements } from './model/requirements';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent {
  requirements:Requirements[]=[];
  requirement:any;
  projects: any;
  resources:any;
  constructor(private dashboardDataService: DashboardDataService){
  }

  id:any;
  displayStyle1="none";
  displayStyle = "none";
  admin:boolean=false;

  ngOnInit(){
    this.getProjects();
    this.getRequirements();
    this.getResources();
  }
  
  
  getProjects(){
    this.dashboardDataService.getProjects().subscribe((projects: any) => {
      this.projects= projects
  }, (err: any) => {
      console.log(err);
  }
  );
  }
  getRequirements(){
    this.dashboardDataService.getRequirements().subscribe((requirements: any) => {
      this.requirements= requirements
  }, (err: any) => {
      console.log(err);
  }
  );
  }

  saveRequirements(){
    this.dashboardDataService.saveRequirements(this.requirement.project,this.requirement.resources,this.requirement.number_of_hours).subscribe((requirements: any) => {
      console.log("requirements saved successfully");
  }, (err: any) => {
      console.log(err);
  }
  );
  window.location.reload();
  }

  getResources(){
    console.log("1");
    this.dashboardDataService.getResources().subscribe((resources: any) => {
      this.resources= resources;
  }, (err: any) => {
      console.log(err);
  }
  );
  }


  openPopupRequirements(id:any) {
    
  
    this.requirement=this.dashboardDataService.getRequirementDataSingleRecord(id);
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    this.displayStyle1 = "none";
  }
  
  openPopupDelete(id: any) {

    this.id=id;

    this.displayStyle1 = "block";
  }

  deleteData(){
    this.dashboardDataService.deleteRequirementData(this.id).subscribe((data: any) => {
      console.log("requirement data deleted successfully");
    }, (err: any) => {
      console.log(err);
    }
    );
    this.displayStyle1="none";
    // this.getRequirements();
    window.location.reload();
  }


}
