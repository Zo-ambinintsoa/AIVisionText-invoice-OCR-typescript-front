import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import {HeaderComponent} from "../components/layout/header/header.component";
import {SidebarComponent} from "../components/layout/sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import { UserListComponent } from './component/user-list/user-list.component';
import { HistoryComponent } from './component/history/history.component';
import { LogementListComponent } from './component/logement-list/logement-list.component';
import { PublishComponent } from './component/publish/publish.component';
import { SettingsComponent } from './component/settings/settings.component';
import {DocumentListComponent} from "./component/document-list/document-list.component";
import {DocumentUploadComponent} from "./component/document-upload/document-upload.component";
import {CategoryManagementComponent} from "./component/category-management/category-management.component";
import { AnalyticsComponent } from './component/analytics/analytics.component';

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
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SecureModule { }
