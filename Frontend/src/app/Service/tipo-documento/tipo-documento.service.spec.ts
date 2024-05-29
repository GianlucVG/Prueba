import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TipoDocumentoService } from './tipo-documento.service';

describe('TipoDocumentoService', () => {
  let service: TipoDocumentoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipoDocumentoService]
    });
    service = TestBed.inject(TipoDocumentoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all tipos de documento', () => {
    const dummyTiposDocumento = [
      { id_tipo_documento: 1, codigo: 'ABC', nombre: 'Documento 1', descripcion: 'Desc 1', estado: 1 },
      { id_tipo_documento: 2, codigo: 'DEF', nombre: 'Documento 2', descripcion: 'Desc 2', estado: 1 },
    ];

    service.getAll().subscribe(tiposDocumento => {
      expect(tiposDocumento.length).toBe(2);
      expect(tiposDocumento).toEqual(dummyTiposDocumento);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTiposDocumento);
  });

  it('should create a new tipo de documento', () => {
    const newTipoDocumento = { id_tipo_documento: 3, codigo: 'GHI', nombre: 'Documento 3', descripcion: 'Desc 3', estado: 1 };

    service.create(newTipoDocumento).subscribe(tipoDocumento => {
      expect(tipoDocumento).toEqual(newTipoDocumento);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newTipoDocumento);
  });

  it('should update an existing tipo de documento', () => {
    const updatedTipoDocumento = { id_tipo_documento: 1, codigo: 'XYZ', nombre: 'Documento Actualizado', descripcion: 'Desc Act', estado: 1 };

    service.update(updatedTipoDocumento.id_tipo_documento, updatedTipoDocumento).subscribe(tipoDocumento => {
      expect(tipoDocumento).toEqual(updatedTipoDocumento);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${updatedTipoDocumento.id_tipo_documento}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTipoDocumento);
  });

  it('should delete a tipo de documento', () => {
    const tipoDocumentoId = 1;

    service.delete(tipoDocumentoId).subscribe(response => {
      expect(response).toEqual(null);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${tipoDocumentoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
