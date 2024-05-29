import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TipoContribuyenteComponent } from './tipo-contribuyente.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TipoContribuyenteService } from '../../Service/tipo-contribuyente/tipo-contribuyente.service';
import { TipoContribuyenteFormComponent } from '../../components/tipo-contribuyente-form/tipo-contribuyente-form.component';
import { HeaderComponent } from '../../components/header/header.component';
import { of } from 'rxjs';

describe('TipoContribuyenteComponent', () => {
  let component: TipoContribuyenteComponent;
  let fixture: ComponentFixture<TipoContribuyenteComponent>;
  let tipoContribuyenteService: TipoContribuyenteService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TipoContribuyenteComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        HeaderComponent,
        TipoContribuyenteFormComponent
      ],
      providers: [
        TipoContribuyenteService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoContribuyenteComponent);
    component = fixture.componentInstance;
    tipoContribuyenteService = TestBed.inject(TipoContribuyenteService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(tipoContribuyenteService, 'getAll').and.returnValue(of([
      { id_tipo_contribuyente: 1, nombre: 'Contribuyente 1', estado: 1 },
      { id_tipo_contribuyente: 2, nombre: 'Contribuyente 2', estado: 0 }
    ]));
    spyOn(tipoContribuyenteService, 'create').and.returnValue(of({}));
    spyOn(tipoContribuyenteService, 'update').and.returnValue(of({}));
    spyOn(tipoContribuyenteService, 'delete').and.returnValue(of({}));

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tipo contribuyentes on init', () => {
    component.ngOnInit();
    expect(component.tipoContribuyentes.length).toBe(2);
    expect(tipoContribuyenteService.getAll).toHaveBeenCalled();
  });

  it('should open modal for new tipo contribuyente', () => {
    component.openModal();
    expect(component.showModal).toBeTrue();
    expect(component.isEditing).toBeFalse();
  });

  it('should reset form when closing modal', () => {
    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.isEditing).toBeFalse();
    expect(component.tipoContribuyente).toEqual({
      nombre: '',
      estado: true
    });
  });

  it('should create a new tipo contribuyente', () => {
    component.handleSaveTipoContribuyente({ isEditing: false, tipoContribuyente: component.tipoContribuyente });
    expect(tipoContribuyenteService.create).toHaveBeenCalled();
  });

  it('should update an existing tipo contribuyente', () => {
    component.handleSaveTipoContribuyente({ isEditing: true, id: 1, tipoContribuyente: component.tipoContribuyente });
    expect(tipoContribuyenteService.update).toHaveBeenCalledWith(1, component.tipoContribuyente);
  });

  it('should delete a tipo contribuyente', () => {
    component.deleteTipoContribuyente(1);
    expect(tipoContribuyenteService.delete).toHaveBeenCalledWith(1);
  });

  it('should set editing state when editing a tipo contribuyente', () => {
    const contribuyente = { id_tipo_contribuyente: 1, nombre: 'Contribuyente 1', estado: 1 };
    component.editTipoContribuyente(contribuyente);
    expect(component.isEditing).toBeTrue();
    expect(component.editingId).toBe(1);
    expect(component.tipoContribuyente).toEqual({ ...contribuyente, estado: true });
  });
});
