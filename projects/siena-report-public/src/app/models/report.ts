export type ReportType = 'Bache' | 'Problema_de_agua' | 'Luminaria' | 'Otro';

export interface Report {
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  type: ReportType;
}
