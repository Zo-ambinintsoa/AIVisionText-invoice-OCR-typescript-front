import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {RouterModule} from "@angular/router";
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ToastComponent } from './component/toast/toast.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
