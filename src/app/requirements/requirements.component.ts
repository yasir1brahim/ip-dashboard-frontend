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
  requirement:Requirements={"id":"1","project":"project3","resource":"name1","hours":"0"};
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
     console.log('reqs',this.requirements)
  }, (err: any) => {
      console.log(err);
  }
  );
  }

  saveRequirements(id:any){
    if(id==0){
      this.dashboardDataService.saveRequirements(this.requirement.project,this.requirement.resource,this.requirement.hours).subscribe((requirements: any) => {
        console.log("requirements saved successfully");
        this.getRequirements();
       this.displayStyle='none';
    }, (err: any) => {
        console.log(err);
    }
    );
    }
    else{
      this.dashboardDataService.updateRequirements(this.requirement.id,this.requirement.project,this.requirement.resource,this.requirement.hours).subscribe((requirements: any) => {
        console.log("requirements saved successfully");
        this.getRequirements();
       this.displayStyle='none';
    }, (err: any) => {
        console.log(err);
    }
    );
    }

    
  }

  getResources(){
    this.dashboardDataService.getResources().subscribe((resources: any) => {
      this.resources= resources;
  }, (err: any) => {
      console.log(err);
  }
  );
  }


  openPopupRequirements(id:any) {
    if(id==0){
      this.requirement.project='';
      this.requirement.resource='';
      this.requirement.hours='';
      this.requirement.id='0';
    }
    else{
      this.dashboardDataService.getRequirementDataSingleRecord(id).subscribe((requirement: any) => {
        this.requirement = requirement;
      }, (err: any) => {
        console.log(err);
      }
      );
    }
    this.getResources();
    this.getProjects();
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
      this.getRequirements();
      this.displayStyle1="none";
    }, (err: any) => {
      console.log(err);
    }
    );
   

    
  }


}
