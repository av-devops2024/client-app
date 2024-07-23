import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routes';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(AuthRoutes)
  ]
})
export class AuthModule { }
