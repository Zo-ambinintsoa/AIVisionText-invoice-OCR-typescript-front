import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = "Register"

  constructor(private titleService: Title) {
    this.titleService.setTitle(`PRM - ${(this.title)}`)
  }
}
