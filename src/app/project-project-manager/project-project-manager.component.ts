import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { PPM } from './model/project-project-manager';

@Component({
  selector: 'app-project-project-manager',
  templateUrl: './project-project-manager.component.html',
  styleUrls: ['./project-project-manager.component.css'],
  providers:[DatePipe]
})
export class ProjectProjectManagerComponent {
ppms:PPM[];
ppm:PPM={ "project_id":"1", "name": "", "manager":"","manager_id":""};
id: any;
ppmss:any=[];
dateToday:any;   
render_dialog = false;
render_dialog1 = false;
render_dialog_already_assigned=false;
project_managers:any;

constructor(private dashboardDataService: DashboardDataService,private datePipe:DatePipe) {
  this.dateToday = this.datePipe.transform(new Date(),'fullDate');
}

ngOnInit() {
  this.getData();
  this.getProjectManagers();
}


// getData(): void {
//   this.dashboardDataService.getPPMData().subscribe((ppms: any) => {
//     this.ppms = ppms
//     console.log('ppms', this.ppms)

//   }, (err: any) => {
//     console.log(err);
//   }
//   );
// }

saveData() {
  this.dashboardDataService.savePPMData(this.ppm!.project_id, this.ppm!.manager_id).subscribe((result: any) => {
    console.log("Project Project Manager saved successfully");
    this.getData();
    this.render_dialog = false;
  }, (err: any) => {
    console.log(err);
  }
  );

}

openPopupPPM(id: any) {
  this.ppm.name = "";
  this.ppm.project_id = "0";
  //this.getProjectManagers();
  this.render_dialog = true;
}

openPopupDelete(id: any) {

this.id = id;

this.render_dialog1 = true;
}

deleteData() {
  this.dashboardDataService.deletePPMData(this.id).subscribe((data: any) => {
    console.log("Project Project Manager data deleted successfully");
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
  this.render_dialog_already_assigned=false;
}

getProjectManagers() {
  this.dashboardDataService.getProjectManagerList().subscribe((project_managers: any) => {
    this.project_managers= project_managers;
    console.log("project_managers",this.project_managers)
  }, (err: any) => {
    console.log(err);
  }
  );
}


onChange(project_id: any, project: any, project_manager_id: any) {
  this.dashboardDataService.updatePPMData(project_id, project,project_manager_id).subscribe((result: any) => {
    console.log("Project Project Manager saved successfully");
    this.getData();
    this.render_dialog = false;
  }, (err: any) => {
    console.log(err);
    if (err.status==404 || err.status==400){
      this.render_dialog_already_assigned=true;
    }
  }
  );

}

getData(){
  this.dashboardDataService.getProjects().subscribe((ppm: any) => {
    this.ppmss=[];
    if(ppm){
      for(let i=0;i<ppm.length;i++){
        console.log("here1")
        if(ppm[i].project_manager){
          console.log("here2")
          for(let j=0;j<ppm[i].project_manager.length;j++){
            console.log("here3")
            console.log(ppm[i].project_id)
            console.log(ppm[i].name)
            console.log(ppm[i].project_manager[0].manager_id)
            console.log(ppm[i].project_manager[0].name)
            if(ppm[i].project_id && ppm[i].name && ppm[i].project_manager[0].manager_id && ppm[i].project_manager[0].name){
              console.log("here4")
              let a={"project_id":ppm[i].project_id,"name":ppm[i].name,"manager_id":ppm[i].project_manager[0].manager_id,"manager":ppm[i].project_manager[0].name};
              this.ppmss.push(a);
            }
          }
        }
      }
    }
    console.log("ppm",ppm);
    console.log("ppmss",this.ppmss)




    console.log("project_managers",this.project_managers);
    }, (err: any) => {
    console.log(err);
}
);
}






}
