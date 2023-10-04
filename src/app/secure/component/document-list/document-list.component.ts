import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  title = "Document Lists"

  constructor(private titleService: Title) {
    this.titleService.setTitle(`PRM - ${(this.title)}`)
  }
}
