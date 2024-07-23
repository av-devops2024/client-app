import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AuthModule } from '../auth/auth.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      closeButton: true,
    }),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AuthModule
  ],
  // providers:[
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true
  //   }
  // ]
})
export class SharedModule { }
