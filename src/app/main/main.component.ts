import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
constructor(private authservice:AuthService){}

  ngOnInit(){
    this.authservice.goToMain();
  }
}
