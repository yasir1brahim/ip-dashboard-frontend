import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
constructor(private authService:AuthService){}
admin:boolean=false;
  ngOnInit(){
    this.authService.goToMain();
    if (this.authService.getSession('user_role') == "ADMIN") {
      this.admin = true;
    }
  }
}
