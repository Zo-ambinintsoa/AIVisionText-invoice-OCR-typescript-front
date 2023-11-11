import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activePage: string = '';
  navigationItems: any[] = [
    {
      route: '/dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      i18nKey: 'dashboard',
      title: 'PRM - Dashboard',
    },
    {
      route: '/document/list',
      label: 'Document',
      icon: 'inventory',
      i18nKey: 'document',
      title: 'PRM - Documents Lists',
    },
    {
      route: '/contract/list',
      label: 'Contract',
      icon: 'inventory',
      i18nKey: 'contract',
      title: 'PRM - Contract Lists',
    },
    {
      route: '/receipt/list',
      label: 'Receipt',
      icon: 'inventory',
      i18nKey: 'contract',
      title: 'PRM - Invoice Lists',
    },
    {
      route: '/user/list',
      label: 'User List',
      icon: 'person_outline',
      i18nKey: 'userList',
      title: 'PRM - User Lists',
    },
    {
      route: '/history',
      label: 'History',
      icon: 'receipt_long',
      i18nKey: 'history',
      title: 'PRM - Activities History',
    },
    {
      route: '/analytics',
      label: 'Analytics',
      icon: 'insights',
      i18nKey: 'analytics',
      title: 'PRM - Analytics',
    },
    // {
    //   route: '/logement/list',
    //   label: 'Logement',
    //   icon: 'apartment',
    //   i18nKey: 'logement',
    //   title: 'PRM - Logement Lists',
    // },
    // {
    //   route: '/apartment/list',
    //   label: 'Apartment',
    //   icon: 'apartment',
    //   i18nKey: 'apartment',
    //   title: 'PRM - Apartment Lists',
    // },
    {
      route: '/publish',
      label: 'Publish',
      icon: 'report_gmailerrorred',
      i18nKey: 'publish',
      title: 'PRM - Publish',
    },
    {
      route: '/settings',
      label: 'Settings',
      icon: 'settings',
      i18nKey: 'settings',
      title: 'PRM - Settings',
    },
/*    {
      route: '/new-login',
      label: 'New Login',
      icon: 'add',
      i18nKey: 'newLogin',
      title: 'PRM - New Login',
    },*/
    {
      route: '/logout',
      label: 'Logout',
      icon: 'logout',
      i18nKey: 'logout',
      title: 'Logout',
    }
  ];

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
        this.titleService.setTitle('PRM - Dashboard');
        break;
      case '/user/list':
        this.activePage = 'userList';
        this.titleService.setTitle('PRM - User Lists');
        break;
      case '/history':
        this.activePage = 'history';
        this.titleService.setTitle('PRM - Activities History');
        break;
      case '/analytics':
        this.activePage = 'analytics';
        this.titleService.setTitle('PRM - Analytics');
        break;
      case '/logement/list':
        this.activePage = 'logement';
        this.titleService.setTitle('PRM - Logement Lists');
        break;
      case '/apartment/list':
        this.activePage = 'apartment';
        this.titleService.setTitle('PRM - Apartment Lists');
        break;
      case '/document/list':
        this.activePage = 'document';
        this.titleService.setTitle('PRM - Documents Lists');
        break;
      case '/contract/list':
        this.activePage = 'contract';
        this.titleService.setTitle('PRM - Contract Lists');
        break;
      case '/receipt/list':
        this.activePage = 'Receipt';
        this.titleService.setTitle('PRM - Invoice Lists');
        break;
      case '/publish':
        this.activePage = 'publish';
        this.titleService.setTitle('PRM - Publish');
        break;
      case '/settings':
        this.activePage = 'settings';
        this.titleService.setTitle('PRM - Settings');
        break;
      case '/new-login':
        this.activePage = 'newLogin';
        this.titleService.setTitle('PRM - New Login');
        break;
      default:
        this.activePage = ''; // Default to no active page
    }
  }
}
