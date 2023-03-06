import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/login', { email, password })
    // this is just the HTTP call, 
    // we still need to handle the reception of the token;
  }

  public getSession(value:any){
    let role = localStorage.getItem(value);
    //return "ADMIN";
     return role
  }


  //   login(email:string, password:string ) {
  //     return this.http.post<User>('/api/login', {email, password})
  //         .do(res => this.setSession) 
  //         .shareReplay();
  // }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(expiration){
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);}
    return 0;
    
  }

  goToMain(){
    // let headers=new HttpHeaders().set("Authorization",`bearer ${localStorage.getItem('token')}`)
    // return this.http.get<any>('/api/main'/*,{headers}*/).subscribe((result:any)=>{})
  }
}
