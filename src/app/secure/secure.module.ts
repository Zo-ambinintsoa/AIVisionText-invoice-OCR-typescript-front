import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { SecureComponent } from './secure.component';
import {HeaderComponent} from "../components/layout/header/header.component";
import {SidebarComponent} from "../components/layout/sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import { UserListComponent } from './component/user/user-list.component';
import { HistoryComponent } from './component/history/history.component';
import { LogementListComponent } from './component/logement/logement-list.component';
import { PublishComponent } from './component/publish/publish.component';
import { SettingsComponent } from './component/settings/settings.component';
import {DocumentListComponent} from "./component/document-list/document-list.component";
import {DocumentUploadComponent} from "./component/document-upload/document-upload.component";
import {CategoryManagementComponent} from "./component/category-management/category-management.component";
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { ApartmentComponent } from './component/apartment/apartment.component';
import {FormLogmentComponent} from "./component/logement/form/form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserFormComponent} from "./component/user/form/form.component";
import {ApartmentFormComponent} from "./component/apartment/form/form.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {NgxEditorModule} from "ngx-editor";


@NgModule({
  declarations: [
    SecureComponent,
    SidebarComponent,
    DocumentListComponent,
    DocumentUploadComponent,
    CategoryManagementComponent,
    HeaderComponent,
    UserListComponent,
    HistoryComponent,
    LogementListComponent,
    PublishComponent,
    SettingsComponent,
    AnalyticsComponent,
    ApartmentComponent,
    ApartmentFormComponent,
    FormLogmentComponent,
    UserFormComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgxEditorModule,
  ]
})
export class SecureModule { }
