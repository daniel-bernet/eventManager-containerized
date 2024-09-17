import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [NavbarComponent]
})
export class UserComponent {
    constructor(private apiService: ApiService, private router: Router) {}

    deleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        this.apiService.deleteAccount().subscribe({
          next: (response) => {
            alert('Your account has been successfully deleted.');
            this.router.navigateByUrl('login')
          },
          error: (error) => {
            alert('An error occurred while deleting your account.');
            console.error('Error:', error);
          }
        });
      }
    }
}
