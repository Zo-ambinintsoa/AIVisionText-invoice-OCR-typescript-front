import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activePage: string = ''; // Initialize with an empty string

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.setActivePage(this.router.url);
    });
  }

  setActivePage(route: string): void {
    switch (route) {
      case '/dashboard':
        this.activePage = 'dashboard';
        break;
      case '/user/list':
        this.activePage = 'userList';
        break;
      case '/history':
        this.activePage = 'history';
        break;
      case '/analytics':
        this.activePage = 'analytics';
        break;
      case '/logement/list':
        this.activePage = 'logement';
        break;
      case '/document/list':
        this.activePage = 'document';
        break;
      case '/publish':
        this.activePage = 'publish';
        break;
      case '/settings':
        this.activePage = 'settings';
        break;
      case '/new-login':
        this.activePage = 'newLogin';
        break;
      default:
        this.activePage = ''; // Default to no active page
    }
  }

}
