import { Component } from '@angular/core';

@Component({
  selector: 'app-logement-list',
  templateUrl: './logement-list.component.html',
  styleUrls: ['./logement-list.component.css']
})
export class LogementListComponent {
  logementList: any[] = [];
}
