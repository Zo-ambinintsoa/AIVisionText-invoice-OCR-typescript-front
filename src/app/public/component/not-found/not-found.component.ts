import { Component } from '@angular/core';

import {Location} from "@angular/common";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['../../public.component.css']
})
export class NotFoundComponent {

  title = "Not found"
  constructor(private router: Location, private titleService: Title) {
    this.titleService.setTitle(`PRM - ${(this.title)}`)
  }

  goBack(): void {
    this.router.back(); // Replace '/' with the appropriate route to navigate back to.
  }
}
