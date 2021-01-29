import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    {
      path: '',
      component: AppComponent
    },
    {
      path: '*/:truck',
      component: AppComponent,
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
  ];

  export const APP_ROUTES = appRoutes;
