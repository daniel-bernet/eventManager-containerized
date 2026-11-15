import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
import { syncfusionLicenseKey } from './syncfusion-license';

// Without a key, Syncfusion shows a licence banner on the page.
if (syncfusionLicenseKey) {
  registerLicense(syncfusionLicenseKey);
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
