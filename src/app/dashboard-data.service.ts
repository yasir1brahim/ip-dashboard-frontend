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
availabilityCount:number=0;

  getDashboardData():  Observable<any> {
    return this.http.get<any[]>(environment.backendBaseAddress+'api/getResources');
  }

  getPPMData():  Observable<any> {
    return this.http.get<any>(environment.backendBaseAddress+'api/activeProjects');
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
    return this.http.get<any>(environment.backendBaseAddress+'api/activeProjects');
  }

  getProjectListData(): Observable<any> {
  return this.http.get<any[]>(environment.backendBaseAddress+'api/activeProjects');
  }

  getAvailability(): Observable<any>{
    return this.http.get<any[]>(environment.backendBaseAddress+'availability');
  }

  getResources(): Observable<any>{
  return this.http.get<any[]>(environment.backendBaseAddress+'api/getResources');
  }
  getRequirements():Observable<any>{
    return this.http.get<any[]>(environment.backendBaseAddress+'requirements');
  }

  saveDashboardData(name: any/*, projectAssigned: any,projectManager:any*/): Observable<any> {
  const body = { name:name/*, projectAssigned: projectAssigned,projectManager:projectManager*/};
    return this.http.post<any>(environment.backendBaseAddress+'addResource', body);
  }

  savePPMData(name: any,project_manager:any): Observable<any> {
    const body = { name: name,project_manager:project_manager};
    return this.http.post<any>(environment.backendBaseAddress+'api/createProjects', body);
  }

  saveRequirements(project:any,resource:any,hours:any):Observable<any>{
    const body = { project:project, resource:resource,hours:hours };
    return this.http.post<any>(environment.backendBaseAddress+'requirements', body);
  }

  saveProjectManager(name:any/*,projects:any*/):Observable<any>{
    const body = { name:name/*,projects:projects*/ };
    return this.http.post<any>(environment.backendBaseAddress+'addManagers', body);
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

  updatePPMData(id:any,project:any,project_manager_id:any): Observable<any> {
    const body = {project_manager_id:project_manager_id };
    return this.http.put<any>(environment.backendBaseAddress+'updateppms/'+id, body,
    {/* params:{id:id,developer:developer,project:project,project_manager:project_manager}*/
    }, );
  }

  deletePPMData(id:any): Observable<any> {
    return this.http.delete<any>(environment.backendBaseAddress+'ppms/'+id, {
      /*params: { id: id }  */ } );
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
    return this.http.get<any>(environment.backendBaseAddress+'api/getManager');
  }

  getProjectManagerList():Observable<any>{
    return this.http.get<any>(environment.backendBaseAddress+'api/getManager');
  }

  setAvailabilityCount(count:number){
    this.availabilityCount=count;
    console.log('availablitycount',count,this.availabilityCount)
  }
  getAvailabilityCount(){
    console.log('availablitycount1',this.availabilityCount)
    return this.availabilityCount;
  }

}
