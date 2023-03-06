import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { ProjectList } from '../project-list/model/project-list';
import { Requirements } from './model/requirements';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent {
  requirements:Requirements[]=[];
  requirement:Requirements={"id":"1","project":"","resource":"","hours":""};
  projects: any;
  resources:any;
  constructor(private dashboardDataService: DashboardDataService, private authService:AuthService){
  }

  id:any;
  render_dialog=false;
  render_dialog1=false;
  admin:boolean=false;

  ngOnInit(){
    this.getProjects();
    this.getRequirements();
    this.getResources();
    if (this.authService.getSession('user_role') == "ADMIN") {
      this.admin = true;
  }
  }
  
  
  getProjects(){
    this.dashboardDataService.getProjects().subscribe((projects: any) => {
      this.projects= projects
      console.log(projects)
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
       this.render_dialog=false
    }, (err: any) => {
        console.log(err);
    }
    );
    }
    else{
      this.dashboardDataService.updateRequirements(this.requirement.id,this.requirement.project,this.requirement.resource,this.requirement.hours).subscribe((requirements: any) => {
        console.log("requirements saved successfully");
        this.getRequirements();
       this.render_dialog=false;
    }, (err: any) => {
        console.log(err);
    }
    );
    }

    
  }

  getResources(){
    this.dashboardDataService.getResources().subscribe((resources: any) => {
      //console.log("resources",resources)
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
    this.render_dialog=true;
  }
  closePopup() {
    this.render_dialog=false;
    this.render_dialog1=false;
  }
  
  openPopupDelete(id: any) {

    this.id=id;

    this.render_dialog1=true;
  }

  deleteData(){
    this.dashboardDataService.deleteRequirementData(this.id).subscribe((data: any) => {
      console.log("requirement data deleted successfully");
      this.getRequirements();
      this.render_dialog1=false;
    }, (err: any) => {
      console.log(err);
    }
    );
   

    
  }


}
