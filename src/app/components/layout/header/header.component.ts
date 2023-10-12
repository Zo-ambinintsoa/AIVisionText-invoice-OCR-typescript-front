import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getAuthenticatedUser().subscribe((user: any) => {
      this.userInfo = user;
    });
  }


  logout() {
    this.authService.logout().subscribe(
      () => {
        // Logout successful, redirect to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle logout error
        console.error('Logout error:', error);
        // You can show an error message or take other actions based on the error.
      }
    );
  }
}
