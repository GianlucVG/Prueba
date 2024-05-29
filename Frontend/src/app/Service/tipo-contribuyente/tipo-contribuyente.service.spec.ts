import { TestBed } from '@angular/core/testing';
import { TipoContribuyenteService } from './tipo-contribuyente.service';


describe('TipoContribuyenteService', () => {
  let service: TipoContribuyenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoContribuyenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
