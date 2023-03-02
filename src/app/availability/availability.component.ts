import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent {

constructor(private dashboardDataService: DashboardDataService){
this.getAvailability();
}
available:any | undefined;
onLeave:any | undefined;
notYetIn:any | undefined;

getAvailability(): void {
    this.dashboardDataService.getAvailability().subscribe((availability: any) => {
      this.available= availability[0].available;
      this.onLeave=availability[0].onLeave;
      this.notYetIn=availability[0].notYetIn;
      //console.log(availability);
  }, (err: any) => {
      console.log(err);
  }
  );
  }
}

