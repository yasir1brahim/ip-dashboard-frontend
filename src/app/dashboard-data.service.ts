import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from './dashboard/model/dashboard';
import { ProjectList } from './project-list/model/project-list';
import { Requirements } from './requirements/model/requirements';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(private http:HttpClient) { }
dashboard:Dashboard | undefined;
resource:ProjectList | undefined;

available:string[]=['Name1','Name2'];
on_leave:string[]=['Name4','Name5','Name6'];
not_yet_in:string[]=['Name7','Name8','Name9','Name10'];

//resources:string[]=['Name1','Name2','Name3','Name4','Name5'];

// requirement1:Requirements={id:'1',project:'project1',resource:'name1',hours:'1'};
// requirement2:Requirements={id:'2',project:'project2',resource:'name2',hours:'1'};

// requirements:Requirements[]=[this.requirement1,this.requirement2];

// dashboard1: Dashboard = ;
// dashboard2: Dashboard = ;
// dashboard3: Dashboard = ;
// dashboards: Dashboard[] = [{ id:'1', developer: 'Waqar', project: 'project1', project_manager: 'daniyal' },
//                            { id:'2', developer: 'Osama', project: 'project2', project_manager: 'daniyal' },
//                            { id:'3', developer: 'Waqar', project: 'project3', project_manager: 'daniyal' }];

//projects: string[]=['project1','project2','project3','project4','project5'];

// resource1:ProjectList={id:'1',project:'project1',resources:'3'}
// resource2:ProjectList={id:'1',project:'project2',resources:'5'}
// resource3:ProjectList={id:'1',project:'project3',resources:'7'}

// projectList:ProjectList[]=[this.resource1,this.resource2,this.resource3];


  getDashboardData():  Observable<any> {
    return this.http.get<any[]>('assets/dashboards.json');
  }

  getDashboardDataSingleRecord(id:any) :  Observable<any> {
    return this.http.get<any[]>('assets/dashboard.json',{
      params: { id: id }
    });
   }

  getRequirementDataSingleRecord(id:any) {
    return this.http.get<any[]>('assets/requirement.json',{
      params: { id: id }
    });
  }

  getProjects():Observable<any> {
    return this.http.get<any[]>('assets/projects.json');
  }

  getProjectListData(): Observable<any> {
  return this.http.get<any[]>('assets/projectlist.json');
  }

  getAvailability(): Observable<any>{
    return this.http.get<any[]>('assets/availability.json');
  }

  getResources(): Observable<any>{
  return this.http.get<any[]>('assets/resources.json');
  }
  getRequirements():Observable<any>{
    return this.http.get<any[]>('assets/requirements.json');
  }

  saveDashboardData(developer: any, project: any,project_manager:any): Observable<any> {
    const body = { developer:developer, project: project,project_manager:project_manager };
    return this.http.post<any>('url', body);
  }

  deleteDashboardData(id:any): Observable<any> {
    return this.http.delete<any>('url', {
      params: { id: id }   } );
  }

  deleteRequirementData(id:any): Observable<any> {
    return this.http.delete<any>('url'/*environment.backendBaseAddress+'deleterequirementdata/'+id*/, {
      params: { id: id }   } );
  }

  getProjectManagerData():Observable<any>{
    return this.http.get<any>('assets/projectmanager.json'/*environment.backendBaseAddress+'getprojectmanagerdata'*/);
  }

  saveRequirements(project:any,resources:any,number_of_hours:any):Observable<any>{
    const body = { project:project, resources:resources,number_of_hours:number_of_hours };
    return this.http.post<any>('url', body);
  }

}