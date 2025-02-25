import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloatLabel} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {Select} from 'primeng/select';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Map} from 'ol';
import {MapLocationSelector, NGX_OPEN_LAYERS_CORE_DIRECTIVES} from '@nidiro/ngx-map-core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Coordinate} from 'ol/coordinate';
import {ReportType} from '../models/report';
import {ReportService} from '../api/report/report.service';
import {take} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'srp-report',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabel,
    InputTextModule,
    TextareaModule,
    Select,
    CardModule,
    ButtonModule,
    Ripple,
    NGX_OPEN_LAYERS_CORE_DIRECTIVES,
    ReactiveFormsModule,
    MapLocationSelector,
    Select,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {
  reportTypes: {label: string; value: ReportType}[] = [
    {label: 'Bache', value: 'Bache'},
    {label: 'Problema de agua potable', value: 'Problema_de_agua'},
    {label: 'Luminaria', value: 'Luminaria'},
    {label: 'Otro', value: 'Otro'},
  ];
  map!: Map;

  extent = environment.definedExtents['tlaxcalancingo'];
  reportForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl<ReportType>('Bache', Validators.required),
    location: new FormControl<{lat: number; lng: number} | undefined>(undefined, Validators.required),
  });

  private reportService = inject(ReportService);

  onSelectedLocationChanged(location: Coordinate) {
    this.reportForm.patchValue({location: {lat: location[1], lng: location[0]}});
  }

  onSubmit() {
    this.reportService.createReport(this.reportForm.getRawValue()).pipe(take(1)).subscribe();
  }
}
