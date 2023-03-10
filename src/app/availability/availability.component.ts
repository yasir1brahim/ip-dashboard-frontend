import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
  providers: [DatePipe]
})
export class AvailabilityComponent {
dateToday:any;
constructor(private dashboardDataService: DashboardDataService, private datePipe:DatePipe){

}
available:any | undefined;
onLeave:any | undefined;
notYetIn:any | undefined;

ngOnInit(){
  this.getAvailability();
  this.dateToday = this.datePipe.transform(new Date(),'fullDate');
}
getAvailability(): void {
    this.dashboardDataService.getAvailability().subscribe((availability: any) => {
      this.available= availability[0].available;
      this.onLeave=availability[0].onLeave;
      this.notYetIn=availability[0].notYetIn;
      console.log(availability[0].available.length);
      let availabilityCount=parseInt(availability[0].available.length)+parseInt(availability[0].onLeave.length)+parseInt(availability[0].notYetIn.length)
      this.dashboardDataService.setAvailabilityCount(availabilityCount);
  }, (err: any) => {
      console.log(err);
  }
  );
  }
}

