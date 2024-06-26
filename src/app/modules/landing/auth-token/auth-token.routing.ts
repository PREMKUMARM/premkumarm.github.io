import { Route } from '@angular/router';
import { AuthTokenComponent } from './auth-token/auth-token.component';

export const authTokenRoutes: Route[] = [
    {
        path     : '',
        component: AuthTokenComponent
    }
];
