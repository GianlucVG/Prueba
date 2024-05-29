import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EntidadService } from './entidad.service';

describe('EntidadService', () => {
  let service: EntidadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EntidadService]
    });
    service = TestBed.inject(EntidadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all entidades', () => {
    const dummyEntidades = [
      { id_entidad: 1, id_tipo_documento: 1, nro_documento: '12345678', razon_social: 'Entidad 1', nombre_comercial: 'Comercial 1', id_tipo_contribuyente: 1, direccion: 'Direccion 1', telefono: '123456789', estado: 1 },
      { id_entidad: 2, id_tipo_documento: 2, nro_documento: '87654321', razon_social: 'Entidad 2', nombre_comercial: 'Comercial 2', id_tipo_contribuyente: 2, direccion: 'Direccion 2', telefono: '987654321', estado: 1 }
    ];

    service.getAll().subscribe(entidades => {
      expect(entidades.length).toBe(2);
      expect(entidades).toEqual(dummyEntidades);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEntidades);
  });

  it('should create a new entidad', () => {
    const newEntidad = { id_entidad: 3, id_tipo_documento: 3, nro_documento: '11223344', razon_social: 'Entidad 3', nombre_comercial: 'Comercial 3', id_tipo_contribuyente: 3, direccion: 'Direccion 3', telefono: '1122334455', estado: 1 };

    service.create(newEntidad).subscribe(entidad => {
      expect(entidad).toEqual(newEntidad);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newEntidad);
  });

  it('should update an existing entidad', () => {
    const updatedEntidad = { id_entidad: 1, id_tipo_documento: 1, nro_documento: '12345678', razon_social: 'Updated Entidad', nombre_comercial: 'Updated Comercial', id_tipo_contribuyente: 1, direccion: 'Updated Direccion', telefono: '123456789', estado: 1 };

    service.update(updatedEntidad.id_entidad, updatedEntidad).subscribe(entidad => {
      expect(entidad).toEqual(updatedEntidad);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${updatedEntidad.id_entidad}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEntidad);
  });

  it('should delete an entidad', () => {
    const entidadId = 1;

    service.delete(entidadId).subscribe(response => {
      expect(response).toEqual(null);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${entidadId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
