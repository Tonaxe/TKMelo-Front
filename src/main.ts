import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { NavigationEnd, provideRouter, Router, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';
import { filter } from 'rxjs';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).then(ref => {
  const router = ref.injector.get(Router);
  router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});