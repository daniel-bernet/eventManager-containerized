import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
  imports: [ReactiveFormsModule, NavbarComponent],
})
export class CreateEventComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      timestamp: ['', [Validators.required, this.futureDateValidator]],
      duration: ['', [Validators.required, this.positiveNumberValidator]],
      category: ['', Validators.required],
    });
  }

  positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
    const isPositive = Number(control.value) > 0;
    return isPositive ? null : { nonPositiveDuration: true };
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const now = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate > now ? null : { pastDate: true };
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.apiService.createEvent(this.eventForm.value).subscribe({
        next: (response) => {
          console.log('Event created successfully:', response);
          this.eventForm.reset()
          this.router.navigateByUrl('/my-events');
        },
        error: (error) => console.error('Failed to create event:', error),
      });
    }
  }
}
