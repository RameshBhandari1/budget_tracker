import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {enableProdMode} from "@angular/core";
import {environment} from "./environments/environment.prod";

// Check if the application is running in production mode
if (environment.production) {
  // Enables production mode
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
