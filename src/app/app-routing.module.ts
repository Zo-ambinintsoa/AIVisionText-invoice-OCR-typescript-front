import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./public/component/login/login.component";
import {PublicComponent} from "./public/public.component";
import {SecureComponent} from "./secure/secure.component";
import {RegisterComponent} from "./public/component/register/register.component";
import {DocumentListComponent} from "./secure/component/document-list/document-list.component";
import {DocumentUploadComponent} from "./secure/component/document-upload/document-upload.component";
import {HistoryComponent} from "./secure/component/history/history.component";
import {UserListComponent} from "./secure/component/user/user-list.component";
import {LogementListComponent} from "./secure/component/logement/logement-list.component";
import {PublishComponent} from "./secure/component/publish/publish.component";
import {SettingsComponent} from "./secure/component/settings/settings.component";
import {CategoryManagementComponent} from "./secure/component/category-management/category-management.component";
import {AnalyticsComponent} from "./secure/component/analytics/analytics.component";
import {NotFoundComponent} from "./public/component/not-found/not-found.component";
import {ApartmentComponent} from "./secure/component/apartment/apartment.component";
import {AuthGuard} from "./guard/auth.guard";
import {ReceiptComponent} from "./secure/component/receipt/receipt.component";
import {FormReceiptComponent} from "./secure/component/receipt/form/form-receipt.component";
import {ContractComponent} from "./secure/component/contract/contract.component";
import {ContactFormComponent} from "./secure/component/contract/contact-form/contact-form.component";
import {DashboardComponent} from "./secure/component/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: SecureComponent,  canActivateChild: [AuthGuard],
    children : [
      { path: '', component: LogementListComponent },
      { path: 'document/list', component: DocumentListComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'document/upload', component: DocumentUploadComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'user/list', component: UserListComponent },
      { path: 'logement/list', component: LogementListComponent },
      { path: 'publish', component: PublishComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'categories', component: CategoryManagementComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'apartment/list', component: ApartmentComponent },
      { path: 'receipt/list', component: ReceiptComponent },
      { path: 'contract/list', component: ContractComponent },
      { path: 'receipt/new', component: FormReceiptComponent },
      { path: 'contract/new', component: ContactFormComponent },
    ] },
  { path: '',
        component: PublicComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ] },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
