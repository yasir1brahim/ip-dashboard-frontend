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
ppm:PPM={ "project_id":"1", "name": "", "project_manager": "" };
id: any;
dateToday:any;
render_dialog = false;
render_dialog1 = false;
project_managers:any;

constructor(private dashboardDataService: DashboardDataService,private datePipe:DatePipe) {
  this.dateToday = this.datePipe.transform(new Date(),'fullDate');
}

ngOnInit() {
  this.getData();
  this.getProjectManagers();
}


getData(): void {
  this.dashboardDataService.getPPMData().subscribe((ppms: any) => {
    this.ppms = ppms
    console.log('ppms', this.ppms)

  }, (err: any) => {
    console.log(err);
  }
  );
}

saveData() {
  this.dashboardDataService.savePPMData(this.ppm!.name, this.ppm!.project_manager).subscribe((result: any) => {
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
  this.ppm.project_manager = "";
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


onChange(id: any, project: any, project_manager_id: any) {
  this.dashboardDataService.updatePPMData(id, project,project_manager_id).subscribe((result: any) => {
    console.log("Project Project Manager saved successfully");
    this.getData();
    this.render_dialog = false;
  }, (err: any) => {
    console.log(err);
  }
  );

}




}
