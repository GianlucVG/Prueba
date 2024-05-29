import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TipoContribuyenteFormComponent } from './tipo-contribuyente-form.component';

describe('TipoContribuyenteFormComponent', () => {
  let component: TipoContribuyenteFormComponent;
  let fixture: ComponentFixture<TipoContribuyenteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TipoContribuyenteFormComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TipoContribuyenteFormComponent);
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
    expect(component.tipoContribuyente).toEqual({
      nombre: '',
      estado: true
    });
    expect(component.isEditing).toBeFalse();
    expect(component.editingId).toBeNull();
  });

  it('should emit refreshList when saveTipoContribuyente is called', () => {
    spyOn(component.refreshList, 'emit');
    component.isEditing = true;
    component.editingId = 1;
    component.tipoContribuyente = {
      nombre: 'Test Contribuyente',
      estado: true
    };
    component.saveTipoContribuyente();
    expect(component.refreshList.emit).toHaveBeenCalledWith({
      id: component.editingId,
      tipoContribuyente: component.tipoContribuyente,
      isEditing: component.isEditing
    });
  });

  it('should render the correct title based on isEditing', () => {
    component.isEditing = false;
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Crear Nuevo Tipo de Contribuyente');

    component.isEditing = true;
    fixture.detectChanges();
    title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Editar Tipo de Contribuyente');
  });

  it('should call saveTipoContribuyente when form is submitted', () => {
    spyOn(component, 'saveTipoContribuyente');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(component.saveTipoContribuyente).toHaveBeenCalled();
  });

  it('should call onCloseModal when cancel button is clicked', () => {
    spyOn(component, 'onCloseModal');
    const cancelButton = fixture.debugElement.query(By.css('.cancel-button')).nativeElement;
    cancelButton.click();
    expect(component.onCloseModal).toHaveBeenCalled();
  });
});
