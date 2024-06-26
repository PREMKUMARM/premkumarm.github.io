import { NgModule } from '@angular/core';
import { AuthTokenComponent } from './auth-token/auth-token.component';
import { authTokenRoutes } from './auth-token.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AuthTokenComponent
  ],
  imports: [
    RouterModule.forChild(authTokenRoutes),
    MatButtonModule,
    MatIconModule,
    SharedModule
  ]
})
export class AuthTokenModule { }
