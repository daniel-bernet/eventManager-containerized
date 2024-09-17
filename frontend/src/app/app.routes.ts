import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UserComponent } from './user/user.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SearchEventsComponent } from './search-events/search-events.component';
import { MyEventsComponent } from './my-events/my-events.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'search-events', component: SearchEventsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
