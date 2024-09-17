import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-my-events',
  standalone: true,
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
  imports: [NavbarComponent, EventCardComponent],
})
export class MyEventsComponent implements OnInit {
  events: any;
  myEvents: any;
  participatingEvents: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents(): void {
    this.apiService.getAllEvents().subscribe((events) => {
      this.events = events;
      this.filterMyEvents();
      this.filterParticipatingEvents();
    });
  }

  filterMyEvents() {
    const myUserId = this.apiService.userId;
    this.myEvents = this.events.filter(
      (event: any) => event.creator.id === myUserId
    );
  }

  filterParticipatingEvents() {
    const myUserId = this.apiService.userId;
    this.participatingEvents = this.events.filter((event: any) =>
      event.attendees.some((attendee: any) => attendee === myUserId)
    );
  }

  onRefreshRequested(): void {
    this.loadEvents();
  }
}
