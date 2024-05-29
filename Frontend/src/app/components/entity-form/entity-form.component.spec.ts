import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EntityFormComponent } from './entity-form.component';
import { By } from '@angular/platform-browser';

describe('EntityFormComponent', () => {
  let component: EntityFormComponent;
  let fixture: ComponentFixture<EntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, EntityFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeModal when close button is clicked', () => {
    spyOn(component.closeModal, 'emit');
    const closeButton = fixture.debugElement.query(By.css('.close-button')).nativeElement;
    closeButton.click();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should reset form when onCloseModal is called', () => {
    component.onCloseModal();
    expect(component.entidad).toEqual({
      id_tipo_documento: '',
      nro_documento: '',
      razon_social: '',
      nombre_comercial: '',
      id_tipo_contribuyente: '',
      direccion: '',
      telefono: '',
      estado: true,
    });
    expect(component.isEditing).toBeFalse();
    expect(component.editingId).toBeNull();
  });

  it('should emit createEntidadEvent when creating a new entidad', () => {
    spyOn(component.createEntidadEvent, 'emit');
    component.isEditing = false;
    component.entidad = {
      id_tipo_documento: '1',
      nro_documento: '123',
      razon_social: 'Test Razon Social',
      nombre_comercial: 'Test Nombre Comercial',
      id_tipo_contribuyente: '1',
      direccion: 'Test Dirección',
      telefono: '123456789',
      estado: true,
    };
    component.saveEntidad();
    expect(component.createEntidadEvent.emit).toHaveBeenCalledWith(component.entidad);
  });

  it('should emit updateEntidadEvent when updating an existing entidad', () => {
    spyOn(component.updateEntidadEvent, 'emit');
    component.isEditing = true;
    component.editingId = 1;
    component.entidad = {
      id_tipo_documento: '1',
      nro_documento: '123',
      razon_social: 'Test Razon Social',
      nombre_comercial: 'Test Nombre Comercial',
      id_tipo_contribuyente: '1',
      direccion: 'Test Dirección',
      telefono: '123456789',
      estado: true,
    };
    component.saveEntidad();
    expect(component.updateEntidadEvent.emit).toHaveBeenCalledWith({
      id: component.editingId,
      entidad: component.entidad,
    });
  });

  it('should render the correct title based on isEditing', () => {
    component.isEditing = false;
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Crear Nueva Entidad');

    component.isEditing = true;
    fixture.detectChanges();
    title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Editar Entidad');
  });

  it('should call saveEntidad when form is submitted', () => {
    spyOn(component, 'saveEntidad');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(component.saveEntidad).toHaveBeenCalled();
  });

  it('should call onCloseModal when cancel button is clicked', () => {
    spyOn(component, 'onCloseModal');
    const cancelButton = fixture.debugElement.query(By.css('.Cancelar')).nativeElement;
    cancelButton.click();
    expect(component.onCloseModal).toHaveBeenCalled();
  });
});
