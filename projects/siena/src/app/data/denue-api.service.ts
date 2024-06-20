import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import OXXO_DATA from './oxxo.dummy.json';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DENUEApiService {
  private readonly DENUE_URL = 'https://www.inegi.org.mx/app/api/denue/v1';
  private readonly DENUE_TOKEN = environment.denueApiToken;

  constructor(private httpClient: HttpClient) {}

  /**
   * TODO: {@link https://github.com/nidiro/codename-siena/issues/16}
   * @param params
   */
  buscarAreaAct(params: IDENUESearchRequestParams): Observable<DENUESearchResponseItem[]> {
    const validParams = new DENUESearchRequestParams(params);
    console.log(
      '\x1B[46;30m Simulating: ',
      `${this.DENUE_URL}/consulta/BuscarAreaAct/${validParams.stateId}/${validParams.municipalityId}/${validParams.localityId}/${validParams.agebId}/${validParams.blockId}/${validParams.sectorId}/${validParams.subSectorId}/${validParams.branchId}/${validParams.classId}/${validParams.name}/${validParams.initialRecord}/${validParams.lastRecord}/${validParams.id}/${this.DENUE_TOKEN}`,
    );
    return of(OXXO_DATA);
    // return this.httpClient.get<DENUESearchResponseItem[]>(`${this.DENUE_URL}/consulta/BuscarAreaAct/${validParams.stateId}/${validParams.municipalityId}/${validParams.localityId}/${validParams.agebId}/${validParams.blockId}/${validParams.sectorId}/${validParams.subSectorId}/${validParams.branchId}/${validParams.classId}/${validParams.name}/${validParams.initialRecord}/${validParams.lastRecord}/${validParams.id}/${this.DENUE_TOKEN}`, {
    //   headers: {
    //     'Authorization': `Bearer ${this.DENUE_TOKEN}`
    //   }
    // });
  }
}

interface IDENUESearchRequestParams {
  /**
   * Entidad federativa - Clave de dos dígitos de la entidad federativa (01 a 32). Para incluir todas las entidades se especifica 00.
   */
  stateId: string;
  /**
   * Municipio - Clave de tres dígitos del municipio (ej. 001). Para incluir todos los municipios se especifica 0.
   */
  municipalityId: string;
  /**
   * Localidad - Clave de cuatro dígitos de la localidad (ej. 0001 ). Para incluir todas las localidades se especifica 0.
   */
  localityId?: string;
  /**
   *  AGEB - Clave de cuatro dígitos AGEB(ej. 2000 ).Para incluir todas las AGEBS se especifica 0
   */
  agebId?: string;
  /**
   *  Manzana - Clave de tres dígitos de la manzana (ej. 043 ). Para incluir todas las manzanas se especifica 0.
   */
  blockId?: string;
  /**
   *  Sector - Clave de dos dígitos del sector de la actividad económica (ej. 46 ). Para incluir todos los sectores se especifica 0.
   */
  sectorId?: string;
  /**
   *  Subsector - Clave de tres dígitos del subsector de la actividad económica ( ej. 464 ). Para incluir todos los subsectores se especifica 0.
   */
  subSectorId?: string;
  /**
   *  Rama - Clave de cuatro dígitos de la rama de la actividad económica (ej. 4641 ). Para incluir todas las ramas se especifica 0.
   */
  branchId?: string;
  /**
   *  Clase - Clave de seis dígitos de la clase (ej. 464112 ). Para incluir todas las actividades se especifica 0.
   */
  classId?: string;
  /**
   *  Nombre del establecimiento - Nombre del establecimiento a buscar. Para incluir todos los establecimientos se especifica 0.
   */
  name?: string;
  /**
   *  Registro inicial - Número de registro a partir del cuál se mostrarán los resultados de la búsqueda.
   */
  initialRecord: number;
  /**
   *  Registro final - Número de registro final que se mostrará en resultados de la búsqueda.
   */
  lastRecord: number;
  /**
   *  Id - Clave única del establecimiento. Para incluir todos los establecimientos se especifica 0.
   */
  id?: string;
}

class DENUESearchRequestParams {
  constructor(private params: IDENUESearchRequestParams) {}

  get stateId() {
    return this.params.stateId || '00';
  }

  get municipalityId() {
    return this.params.municipalityId || '0';
  }

  get localityId() {
    return this.params.localityId || '0';
  }

  get agebId() {
    return this.params.agebId || '0';
  }

  get blockId() {
    return this.params.blockId || '0';
  }

  get sectorId() {
    return this.params.sectorId || '0';
  }

  get subSectorId() {
    return this.params.subSectorId || '0';
  }

  get branchId() {
    return this.params.branchId || '0';
  }

  get classId() {
    return this.params.classId || '0';
  }

  get name() {
    return this.params.name || '0';
  }

  get initialRecord() {
    return this.params.initialRecord || '1';
  }

  get lastRecord() {
    return this.params.lastRecord || '10';
  }

  get id() {
    return this.params.id || '0';
  }
}

export interface DENUESearchResponseItem {
  // Campo 1: Clave CLEE
  CLEE: string;
  // Campo 2: Id de establecimiento
  Id: string;
  // Campo 3: Nombre del establecimiento
  Nombre: string;
  // Campo 4: Razón social
  Razon_social: string;
  // Campo 5: Clase de la actividad económica
  Clase_actividad: string;
  // Campo 6: Estrato (Personal ocupado)
  Estrato: string;
  // Campo 7: Tipo de la vialidad
  Tipo_vialidad: string;
  // Campo 8: Calle
  Calle: string;
  // Campo 9: Número exterior
  Num_Exterior: string;
  // Campo 10: Número interior
  Num_Interior: string;
  // Campo 11: Colonia
  Colonia: string;
  // Campo 12: Código postal
  CP: string;
  // Campo 13: Localidad, municipio y entidad federativa
  Ubicacion: string;
  // Campo 14: Teléfono
  Telefono: string;
  // Campo 15: Correo electrónico
  Correo_e: string;
  // Campo 16: Página de internet
  Sitio_internet: string;
  // Campo 17: Tipo de establecimiento
  Tipo: string;
  // Campo 18: Longitud
  Longitud: string;
  // Campo 19: Latitud
  Latitud: string;
  // Campo 20: Tipo de corredor industrial
  tipo_corredor_industrial: string;
  // Campo 21: Nombre del corredor industrial
  nom_corredor_industrial: string;
  // Campo 22: Número de local
  numero_local: string;
  // Campo 23: AGEB
  AGEB: string;
  // Campo 24: Manzana
  Manzana: string;
  // Campo 25: Edificio
  EDIFICIO: string;
  // Campo 26: Id clase de la actividad económica
  CLASE_ACTIVIDAD_ID: string;
  // Campo 27: Id sector de la actividad económica
  SECTOR_ACTIVIDAD_ID: string;
  // Campo 28: Id subsector de la actividad económica
  SUBSECTOR_ACTIVIDAD_ID: string;
  // Campo 29: Id rama de la actividad económica
  RAMA_ACTIVIDAD_ID: string;
  // The Tipo_Asentamiento field
  Tipo_Asentamiento: string;
  // The Fecha_Alta field
  Fecha_Alta: string;
  // The AreaGeo field
  AreaGeo: string;
}
