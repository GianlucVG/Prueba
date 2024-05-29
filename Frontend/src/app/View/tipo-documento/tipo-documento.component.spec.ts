import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TipoDocumentoComponent } from './tipo-documento.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TipoDocumentoService } from '../../Service/tipo-documento/tipo-documento.service';
import { TipoDocumentoFormComponent } from '../../components/tipo-documento-form/tipo-documento-form.component';
import { HeaderComponent } from "../../components/header/header.component";
import { of } from 'rxjs';

describe('TipoDocumentoComponent', () => {
  let component: TipoDocumentoComponent;
  let fixture: ComponentFixture<TipoDocumentoComponent>;
  let tipoDocumentoService: TipoDocumentoService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TipoDocumentoComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        TipoDocumentoFormComponent,
        HeaderComponent
      ],
      providers: [
        TipoDocumentoService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDocumentoComponent);
    component = fixture.componentInstance;
    tipoDocumentoService = TestBed.inject(TipoDocumentoService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(tipoDocumentoService, 'getAll').and.returnValue(of([
      { id_tipo_documento: 1, codigo: '123', nombre: 'Documento 1', descripcion: 'Desc 1', estado: 1 },
      { id_tipo_documento: 2, codigo: '456', nombre: 'Documento 2', descripcion: 'Desc 2', estado: 0 }
    ]));
    spyOn(tipoDocumentoService, 'create').and.returnValue(of({}));
    spyOn(tipoDocumentoService, 'update').and.returnValue(of({}));
    spyOn(tipoDocumentoService, 'delete').and.returnValue(of({}));

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tipo documentos on init', () => {
    component.ngOnInit();
    expect(component.tipoDocumentos.length).toBe(2);
    expect(tipoDocumentoService.getAll).toHaveBeenCalled();
  });

  it('should open modal for new tipo documento', () => {
    component.openModal();
    expect(component.showModal).toBeTrue();
    expect(component.isEditing).toBeFalse();
  });

  it('should reset form when closing modal', () => {
    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.isEditing).toBeFalse();
    expect(component.tipoDocumento).toEqual({
      codigo: '',
      nombre: '',
      descripcion: '',
      estado: true
    });
  });

  it('should create a new tipo documento', () => {
    component.handleSaveTipoDocumento({ isEditing: false, tipoDocumento: component.tipoDocumento });
    expect(tipoDocumentoService.create).toHaveBeenCalled();
  });

  it('should update an existing tipo documento', () => {
    component.handleSaveTipoDocumento({ isEditing: true, id: 1, tipoDocumento: component.tipoDocumento });
    expect(tipoDocumentoService.update).toHaveBeenCalledWith(1, component.tipoDocumento);
  });

  it('should delete a tipo documento', () => {
    component.deleteTipoDocumento(1);
    expect(tipoDocumentoService.delete).toHaveBeenCalledWith(1);
  });

  it('should set editing state when editing a tipo documento', () => {
    const documento = { id_tipo_documento: 1, codigo: '123', nombre: 'Documento 1', descripcion: 'Desc 1', estado: 1 };
    component.editTipoDocumento(documento);
    expect(component.isEditing).toBeTrue();
    expect(component.editingId).toBe(1);
    expect(component.tipoDocumento).toEqual({ ...documento, estado: true });
  });
});
