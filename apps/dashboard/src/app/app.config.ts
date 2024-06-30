import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		importProvidersFrom(BrowserAnimationsModule),
	],
};
