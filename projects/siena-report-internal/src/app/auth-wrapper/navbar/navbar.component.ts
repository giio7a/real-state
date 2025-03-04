import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Tooltip} from 'primeng/tooltip';
import {Divider} from 'primeng/divider';
import {Avatar} from 'primeng/avatar';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'sri-navbar',
  templateUrl: './navbar.component.html',
  imports: [Tooltip, Divider, Avatar, NgClass, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  selectedItem: string; // TODO Enrique: The active route is not marked in the navbar yet.

  sidebarNavItems: {icon: string; title: string; route: string}[] = [
    {icon: 'pi pi-home', title: 'Overview', route: '/a/home'},
    {icon: 'pi pi-comment', title: 'Chat', route: '/a/settings'},
    {icon: 'pi pi-inbox', title: 'Inbox', route: '/a/home'},
    {icon: 'pi pi-th-large', title: 'Cards', route: '/a/home'},
    {icon: 'pi pi-user', title: 'Customers', route: '/a/home'},
    {icon: 'pi pi-video', title: 'Movies', route: '/a/home'},
  ];

  // TODO Enrique: These are not doing anything yet.
  sampleAppsSidebarNavsMore = [{icon: 'pi pi-cog', title: 'Settings'}];
  dashboardSidebarVisible: boolean = false;

  constructor() {}
}
