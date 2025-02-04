import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {NGX_OPEN_LAYERS_CORE_DIRECTIVES} from '@nidiro/ngx-map-core';

@Component({
  selector: 'srp-report',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CardModule,
    ButtonDirective,
    Ripple,
    NGX_OPEN_LAYERS_CORE_DIRECTIVES,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {
  private localOffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  today = new Date(Date.now() - this.localOffset).toISOString().slice(0, 16);
}
