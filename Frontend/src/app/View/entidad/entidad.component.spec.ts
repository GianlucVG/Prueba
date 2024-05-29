import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EntidadComponent } from './entidad.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntidadService } from '../../Service/entidad/entidad.service';
import { HeaderComponent } from '../../components/header/header.component';
import { EntityFormComponent } from '../../components/entity-form/entity-form.component';
import { of } from 'rxjs';

describe('EntidadComponent', () => {
  let component: EntidadComponent;
  let fixture: ComponentFixture<EntidadComponent>;
  let entidadService: EntidadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        EntidadComponent,
        HeaderComponent,
        EntityFormComponent
      ],
      providers: [EntidadService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadComponent);
    component = fixture.componentInstance;
    entidadService = TestBed.inject(EntidadService);

    spyOn(entidadService, 'getAll').and.returnValue(of([
      { id_entidad: 1, id_tipo_documento: 1, nro_documento: '12345678', razon_social: 'Entidad 1', nombre_comercial: 'Comercial 1', id_tipo_contribuyente: 1, direccion: 'Direccion 1', telefono: '123456789', estado: 1 },
      { id_entidad: 2, id_tipo_documento: 2, nro_documento: '87654321', razon_social: 'Entidad 2', nombre_comercial: 'Comercial 2', id_tipo_contribuyente: 2, direccion: 'Direccion 2', telefono: '987654321', estado: 1 }
    ]));

    spyOn(entidadService, 'create').and.returnValue(of({}));
    spyOn(entidadService, 'update').and.returnValue(of({}));
    spyOn(entidadService, 'delete').and.returnValue(of({}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load entidades on init', () => {
    component.ngOnInit();
    expect(entidadService.getAll).toHaveBeenCalled();
    expect(component.entidades.length).toBe(2);
  });

  it('should open modal for creating new entidad', () => {
    component.openModal();
    expect(component.showModal).toBeTrue();
    expect(component.isEditing).toBeFalse();
  });

  it('should reset form when opening modal for new entidad', () => {
    component.openModal();
    expect(component.entidad).toEqual({
      id_tipo_documento: '',
      nro_documento: '',
      razon_social: '',
      nombre_comercial: '',
      id_tipo_contribuyente: '',
      direccion: '',
      telefono: '',
      estado: true
    });
  });

  it('should call createEntidad on handleCreateEntidad', () => {
    const newEntidad = { id_tipo_documento: 3, nro_documento: '11223344', razon_social: 'Entidad 3', nombre_comercial: 'Comercial 3', id_tipo_contribuyente: 3, direccion: 'Direccion 3', telefono: '1122334455', estado: 1 };
    component.handleCreateEntidad(newEntidad);
    expect(entidadService.create).toHaveBeenCalledWith(newEntidad);
  });

  it('should call updateEntidad on handleUpdateEntidad', () => {
    const updatedEntidad = { id: 1, entidad: { id_tipo_documento: 1, nro_documento: '12345678', razon_social: 'Updated Entidad', nombre_comercial: 'Updated Comercial', id_tipo_contribuyente: 1, direccion: 'Updated Direccion', telefono: '123456789', estado: 1 } };
    component.handleUpdateEntidad(updatedEntidad);
    expect(entidadService.update).toHaveBeenCalledWith(1, updatedEntidad.entidad);
  });

  it('should call deleteEntidad on delete', () => {
    component.deleteEntidad(1);
    expect(entidadService.delete).toHaveBeenCalledWith(1);
  });
});
