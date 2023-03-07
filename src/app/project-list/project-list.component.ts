import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { ProjectList } from './model/project-list';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [DatePipe]
})
export class ProjectListComponent {

projectList:ProjectList[] | undefined;
dateToday:any;
total:number=0;
constructor(private dashboardDataService: DashboardDataService,private datePipe: DatePipe){
  this.dateToday = this.datePipe.transform(new Date(),'fullDate');
}

ngOnInit(){
  this.getData();
}


getData(){
  this.dashboardDataService.getProjectListData().subscribe((projectList: any) => {
    this.projectList= projectList

    for(let i=0;i<projectList.length;i++){
      this.total+=parseInt(projectList[i].resources);
    }
    
}, (err: any) => {
    console.log(err);
}
);
}


}
