import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-search-events',
  templateUrl: './search-events.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, EventCardComponent],
})
export class SearchEventsComponent implements OnInit {
  searchForm!: FormGroup;
  events: any[] = [];
  filteredEvents: any[] = [];
  selectedCategory: string | null = null;
  categorys = [
    'Conference',
    'Seminar',
    'Workshop',
    'Social Gathering',
    'Fundraiser',
    'Other',
  ];

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [''],
    });
    this.loadEvents();
    this.searchForm
      .get('search')!
      .valueChanges.subscribe((value) => this.filterEvents());
  }

  loadEvents(): void {
    this.apiService.getAllEvents().subscribe((events) => {
      this.events = events;
      console.log(events)
      this.filterEvents();
    });
  }

  filterEvents(): void {
    const searchTerm = this.searchForm.get('search')!.value.toLowerCase();
    this.filteredEvents = this.events.filter((event) => {
      return (
        event.title.toLowerCase().includes(searchTerm) &&
        (this.selectedCategory
          ? event.category === this.selectedCategory
          : true)
      );
    });
  }

  selectCategory(category: string | null): void {
    this.selectedCategory = category;
    this.filterEvents();
  }

  onRefreshRequested(): void {
    this.loadEvents();
  }
}
