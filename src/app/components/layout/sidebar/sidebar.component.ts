import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activePage: string = ''; // Initialize with an empty string

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.setActivePage(this.router.url);
    });
  }

  setActivePage(route: string): void {
    switch (route) {
      case '/dashboard':
        this.activePage = 'dashboard';
        this.titleService.setTitle(`PRM - Dashboard`)
        break;
      case '/user/list':
        this.activePage = 'userList';
        this.titleService.setTitle(`PRM - User Lists`)
        break;
      case '/history':
        this.activePage = 'history';
        this.titleService.setTitle(`PRM - Activities History`)
        break;
      case '/analytics':
        this.activePage = 'analytics';
        this.titleService.setTitle(`PRM - Analytics`)
        break;
      case '/logement/list':
        this.activePage = 'logement';
        this.titleService.setTitle(`PRM - Logement Lists`)
        break;
      case '/document/list':
        this.activePage = 'document';
        this.titleService.setTitle(`PRM - Documents Lists`)
        break;
      case '/publish':
        this.activePage = 'publish';
        this.titleService.setTitle(`PRM - Publish`)
        break;
      case '/settings':
        this.activePage = 'settings';
        this.titleService.setTitle(`PRM - Settings`)
        break;
      case '/new-login':
        this.activePage = 'newLogin';
        this.titleService.setTitle(`PRM - New Login`)
        break;
      default:
        this.activePage = ''; // Default to no active page
    }
  }

}
