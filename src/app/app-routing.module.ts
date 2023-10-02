import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocumentListComponent} from "./components/document-list/document-list.component";
import {DocumentUploadComponent} from "./components/document-upload/document-upload.component";

const routes: Routes = [
  {path: 'document', component: DocumentListComponent},
  {path: 'document/upload', component: DocumentUploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
