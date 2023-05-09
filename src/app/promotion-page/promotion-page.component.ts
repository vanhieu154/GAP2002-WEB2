import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrls: ['./promotion-page.component.css']
})
export class PromotionPageComponent implements OnInit {
  days: string | number = '00';
  hours: string | number = '00';
  minutes: string | number = '00';
  seconds: string | number = '00';

  private launchDate: number = new Date("2023-05-12T00:00:00.000Z").getTime();

  ngOnInit() {
    setInterval(() => {
      this.tick();
    }, 1000);
  }

  private tick(): void {
    // Get current time
    const now: number = new Date().getTime();

    // Get the difference in time to get time left until reaches 0
    const t: number = this.launchDate - now;

    // Check if time is above 0
    if (t > 0) {
      // Algorithm to calculate days...
      this.days = Math.floor(t / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');

      // Algorithm to calculate hours
      this.hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');

      // Algorithm to calculate minutes
      this.minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');

      // Algorithm to calculate seconds
      this.seconds = Math.floor((t % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
  }
}
