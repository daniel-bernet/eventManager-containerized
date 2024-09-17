import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CategoryDistributionComponent } from '../category-distribution/category-distribution.component';
import { CategoryParticipationRadarComponent } from '../category-participation-radar/category-participation-radar.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  imports: [
    NavbarComponent,
    CategoryDistributionComponent,
    CategoryParticipationRadarComponent,
  ],
})
export class AnalyticsComponent implements OnInit {
  totalEvents: number = 0;
  totalUsers: number = 0;
  upcomingEvents: number = 0;
  pastEvents: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDashboardSummary().subscribe((data) => {
      this.totalEvents = data.totalEvents;
      this.totalUsers = data.totalUsers;
      this.upcomingEvents = data.upcomingEvents;
      this.pastEvents = data.pastEvents;
    });
  }
}
