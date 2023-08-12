import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';

import { AppModule } from './app.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);


//https://stackoverflow.com/questions/41339979/reduce-boot-time-in-ionic-2-app