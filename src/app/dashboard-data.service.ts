import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from './dashboard/model/dashboard';
import { ProjectList } from './project-list/model/project-list';
import { Requirements } from './requirements/model/requirements';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

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
    return this.http.get<any[]>(environment.backendBaseAddress+'dashboards');
  }

  getDashboardDataSingleRecord(id:any) :  Observable<any> {

    
    return this.http.get<any>(environment.backendBaseAddress+'dashboards/'+id,{
      /*params: { id: id }*/
    });
   }

  getRequirementDataSingleRecord(id:any) {
    return this.http.get<any>(environment.backendBaseAddress+'requirements/'+id,{
     /* params: { id: id }*/
    });
  }

  getProjects():Observable<any> {
    return this.http.get<any[]>(environment.backendBaseAddress+'projects');
  }

  getProjectListData(): Observable<any> {
  return this.http.get<any[]>(environment.backendBaseAddress+'projectlist');
  }

  getAvailability(): Observable<any>{
    return this.http.get<any[]>(environment.backendBaseAddress+'availability');
  }

  getResources(): Observable<any>{
  return this.http.get<any[]>(environment.backendBaseAddress+'resources');
  }
  getRequirements():Observable<any>{
    return this.http.get<any[]>(environment.backendBaseAddress+'requirements');
  }

  saveDashboardData(developer: any, project: any): Observable<any> {
    const body = { developer:developer, project: project};
    return this.http.post<any>(environment.backendBaseAddress+'dashboards', body);
  }

  saveRequirements(project:any,resource:any,hours:any):Observable<any>{
    const body = { project:project, resource:resource,hours:hours };
    return this.http.post<any>(environment.backendBaseAddress+'requirements', body);
  }

  saveProjectManager(project_manager:any):Observable<any>{
    const body = { name:project_manager };
    return this.http.post<any>(environment.backendBaseAddress+'project_manager', body);
  }


  deleteDashboardData(id:any): Observable<any> {
    return this.http.delete<any>(environment.backendBaseAddress+'dashboards/'+id, {
      /*params: { id: id }  */ } );
  }

  updateDashboardData(id:any,developer:any,project:any): Observable<any> {
    const body = {developer:developer, project:project };
    return this.http.put<any>(environment.backendBaseAddress+'dashboards/'+id, body,
    {/* params:{id:id,developer:developer,project:project,project_manager:project_manager}*/
    }, );
  }

  updateRequirements(id:any,project:any,resource:any,hours:any):Observable<any>{
    const body = { project:project, resource:resource,hours:hours };
    return this.http.put<any>(environment.backendBaseAddress+'requirements/'+id, body);
  }


  deleteRequirementData(id:any): Observable<any> {
    return this.http.delete<any>(environment.backendBaseAddress+'requirements/'+id, {
    /*  params: { id: id } */  } );
  }

  getProjectManagerData():Observable<any>{
    return this.http.get<any>(environment.backendBaseAddress+'project_manager');
  }




}
