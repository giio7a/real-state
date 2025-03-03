import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Tooltip} from 'primeng/tooltip';
import {Divider} from 'primeng/divider';
import {Avatar} from 'primeng/avatar';
import {NgClass} from '@angular/common';

@Component({
  standalone: true,
  selector: 'sri-navbar',
  templateUrl: './navbar.component.html',
  imports: [Tooltip, Divider, Avatar, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  selectedSampleAppsSidebarNav: string;
  sampleAppsSidebarNavs = [
    {icon: 'pi pi-home', title: 'Overview'},
    {icon: 'pi pi-comment', title: 'Chat'},
    {icon: 'pi pi-inbox', title: 'Inbox'},
    {icon: 'pi pi-th-large', title: 'Cards'},
    {icon: 'pi pi-user', title: 'Customers'},
    {icon: 'pi pi-video', title: 'Movies'},
  ];
  sampleAppsSidebarNavsMore = [{icon: 'pi pi-cog', title: 'Settings'}];
  dashboardSidebarVisible: boolean = false;

  setSelectedSampleAppsSidebarNav(title: string) {
    console.log('\x1B[46;30m ', title, '\x1B[0m');
  }

  constructor() {}
}
