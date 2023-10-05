import { Component } from '@angular/core';

@Component({
  selector: 'app-logement-list',
  templateUrl: './logement-list.component.html',
  styleUrls: ['./logement-list.component.css', '../../../public/public.component.css']
})
export class LogementListComponent {
  logementList: any[] = [];
}
