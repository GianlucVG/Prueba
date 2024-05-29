import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
