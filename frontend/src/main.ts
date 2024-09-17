import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2U1hhQlJBfV5CQmJPYVF2R2dJd1R1d19GaEwxOX1dQl9nSXdScEdjXHxbcnFQQGM=');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
