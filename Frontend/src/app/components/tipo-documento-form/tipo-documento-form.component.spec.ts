import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TipoDocumentoFormComponent } from './tipo-documento-form.component';

describe('TipoDocumentoFormComponent', () => {
  let component: TipoDocumentoFormComponent;
  let fixture: ComponentFixture<TipoDocumentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TipoDocumentoFormComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TipoDocumentoFormComponent);
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
    expect(component.tipoDocumento).toEqual({
      codigo: '',
      nombre: '',
      descripcion: '',
      estado: true,
    });
    expect(component.isEditing).toBeFalse();
    expect(component.editingId).toBeNull();
  });

  it('should emit saveTipoDocumentoEvent when saveTipoDocumento is called', () => {
    spyOn(component.saveTipoDocumentoEvent, 'emit');
    component.isEditing = true;
    component.editingId = 1;
    component.tipoDocumento = {
      codigo: '123',
      nombre: 'Test Documento',
      descripcion: 'Descripción del documento',
      estado: true,
    };
    component.saveTipoDocumento();
    expect(component.saveTipoDocumentoEvent.emit).toHaveBeenCalledWith({
      id: 1,
      tipoDocumento: {
        codigo: '123',
        nombre: 'Test Documento',
        descripcion: 'Descripción del documento',
        estado: true,
      },
      isEditing: true
    });
  });

  it('should render the correct title based on isEditing', () => {
    component.isEditing = false;
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Crear Nuevo Tipo de Documento');

    component.isEditing = true;
    fixture.detectChanges();
    title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Editar Tipo de Documento');
  });

  it('should call saveTipoDocumento when form is submitted', () => {
    spyOn(component, 'saveTipoDocumento');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(component.saveTipoDocumento).toHaveBeenCalled();
  });

  it('should call onCloseModal when cancel button is clicked', () => {
    spyOn(component, 'onCloseModal');
    const cancelButton = fixture.debugElement.query(By.css('.Cancelar')).nativeElement;
    cancelButton.click();
    expect(component.onCloseModal).toHaveBeenCalled();
  });
});
