import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TipoContribuyenteService } from './tipo-contribuyente.service';

describe('TipoContribuyenteService', () => {
  let service: TipoContribuyenteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipoContribuyenteService]
    });
    service = TestBed.inject(TipoContribuyenteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all tipos de contribuyente', () => {
    const dummyTiposContribuyente = [
      { id_tipo_contribuyente: 1, nombre: 'Contribuyente 1', estado: 1 },
      { id_tipo_contribuyente: 2, nombre: 'Contribuyente 2', estado: 1 },
    ];

    service.getAll().subscribe(tiposContribuyente => {
      expect(tiposContribuyente.length).toBe(2);
      expect(tiposContribuyente).toEqual(dummyTiposContribuyente);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTiposContribuyente);
  });

  it('should create a new tipo de contribuyente', () => {
    const newTipoContribuyente = { id_tipo_contribuyente: 3, nombre: 'Contribuyente 3', estado: 1 };

    service.create(newTipoContribuyente).subscribe(tipoContribuyente => {
      expect(tipoContribuyente).toEqual(newTipoContribuyente);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newTipoContribuyente);
  });

  it('should update an existing tipo de contribuyente', () => {
    const updatedTipoContribuyente = { id_tipo_contribuyente: 1, nombre: 'Updated Contribuyente', estado: 1 };

    service.update(updatedTipoContribuyente.id_tipo_contribuyente, updatedTipoContribuyente).subscribe(tipoContribuyente => {
      expect(tipoContribuyente).toEqual(updatedTipoContribuyente);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${updatedTipoContribuyente.id_tipo_contribuyente}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTipoContribuyente);
  });

  it('should delete a tipo de contribuyente', () => {
    const tipoContribuyenteId = 1;

    service.delete(tipoContribuyenteId).subscribe(response => {
      expect(response).toEqual(null);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${tipoContribuyenteId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
