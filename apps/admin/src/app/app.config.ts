import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withInterceptorsFromDi()),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		MessageService,
	],
};
