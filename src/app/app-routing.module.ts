import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./public/component/login/login.component";
import {PublicComponent} from "./public/public.component";
import {SecureComponent} from "./secure/secure.component";
import {RegisterComponent} from "./public/component/register/register.component";
import {DocumentListComponent} from "./secure/component/document-list/document-list.component";
import {DocumentUploadComponent} from "./secure/component/document-upload/document-upload.component";
import {HistoryComponent} from "./secure/component/history/history.component";
import {UserListComponent} from "./secure/component/user-list/user-list.component";
import {LogementListComponent} from "./secure/component/logement-list/logement-list.component";
import {PublishComponent} from "./secure/component/publish/publish.component";
import {SettingsComponent} from "./secure/component/settings/settings.component";
import {CategoryManagementComponent} from "./secure/component/category-management/category-management.component";
import {AnalyticsComponent} from "./secure/component/analytics/analytics.component";
import {NotFoundComponent} from "./public/component/not-found/not-found.component";
import {ApartmentComponent} from "./secure/component/apartment/apartment.component";

const routes: Routes = [
  { path: '', component: SecureComponent, children : [
      { path: 'document/list', component: DocumentListComponent },
      { path: 'document/upload', component: DocumentUploadComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'user/list', component: UserListComponent },
      { path: 'logement/list', component: LogementListComponent },
      { path: 'publish', component: PublishComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'categories', component: CategoryManagementComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'apartment/list', component: ApartmentComponent },
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
