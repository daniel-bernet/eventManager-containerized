import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
  imports: [DatePipe],
  standalone: true,
})
export class EventCardComponent {
  @Input() event!: any;
  @Input() showDeleteButton: boolean = false;
  @Input() showSignUpButton: boolean = false;
  @Input() showSignOutButton: boolean = false;
  @Output() refreshRequested = new EventEmitter<void>();

  constructor(private apiService: ApiService) {}

  deleteEvent() {
    this.apiService.deleteEvent(this.event._id).subscribe({
      next: (response) => {
        console.log('Event deleted successfully', response);
        this.refreshRequested.emit();
      },
      error: (error) => console.error('Failed to delete event', error),
    });
  }

  signInEvent() {
    this.apiService.signInEvent(this.event._id).subscribe({
      next: (response) => {
        console.log('Signed in to event successfully', response);
        this.refreshRequested.emit();
      },
      error: (error) => console.error('Failed to sign in to event', error),
    });
  }

  signOutEvent() {
    this.apiService.signOutEvent(this.event._id).subscribe({
      next: (response) => {
        console.log('Signed out of event successfully', response);
        this.refreshRequested.emit();
      },
      error: (error) => console.error('Failed to sign out of event', error),
    });
  }
}
