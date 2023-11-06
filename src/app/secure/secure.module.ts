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
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {FooterModule} from "../components/layout/footer/footer.module";
import {GoogleMapsModule} from "@angular/google-maps";
import {NgChartsModule} from "ng2-charts";
import { ReceiptComponent } from './component/receipt/receipt.component';
import {FormReceiptComponent} from "./component/receipt/form/form-receipt.component";


@NgModule({
  declarations: [
    SecureComponent,
    SidebarComponent,
    DocumentListComponent,
    HistoryComponent,
    DocumentUploadComponent,
    CategoryManagementComponent,
    HeaderComponent,
    UserListComponent,
    LogementListComponent,
    PublishComponent,
    SettingsComponent,
    AnalyticsComponent,
    ApartmentComponent,
    ApartmentFormComponent,
    FormLogmentComponent,
    UserFormComponent,
    ReceiptComponent,
    FormReceiptComponent,

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
    SweetAlert2Module,
    FooterModule,
    GoogleMapsModule,
    NgChartsModule
  ]
})
export class SecureModule { }
