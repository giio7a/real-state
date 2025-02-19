import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Report} from '../../models/report';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private httpClient = inject(HttpClient);

  createReport(reportPayload: Report) {
    return this.httpClient.post<void>(`${environment.serverUrl}/reports`, reportPayload);
  }
}
