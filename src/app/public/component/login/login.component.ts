import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = "Login"

  constructor(private titleService: Title) {
    this.titleService.setTitle(`PRM - ${(this.title)}`)
  }
}
