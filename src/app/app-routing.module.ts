import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocumentListComponent} from "./components/document-list/document-list.component";
import {DocumentUploadComponent} from "./components/document-upload/document-upload.component";
import {LoginComponent} from "./public/component/login/login.component";
import {PublicComponent} from "./public/public.component";
import {SecureComponent} from "./secure/secure.component";
import {RegisterComponent} from "./public/component/register/register.component";

const routes: Routes = [
  { path: '', component: SecureComponent },
  { path: 'document', component: DocumentListComponent },
  { path: 'document/upload', component: DocumentUploadComponent },
  { path: '',
        component: PublicComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
