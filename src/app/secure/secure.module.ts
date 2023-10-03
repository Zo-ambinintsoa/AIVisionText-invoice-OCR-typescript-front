import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import {DocumentListComponent} from "../components/document-list/document-list.component";
import {DocumentUploadComponent} from "../components/document-upload/document-upload.component";
import {CategoryManagementComponent} from "../components/category-management/category-management.component";
import {HeaderComponent} from "../components/layout/header/header.component";
import {SidebarComponent} from "../components/layout/sidebar/sidebar.component";



@NgModule({
  declarations: [
    SecureComponent,
    DocumentListComponent,
    DocumentUploadComponent,
    CategoryManagementComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SecureModule { }
