import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
})
export class EntityFormComponent {
  @Input() entidad: any = {
    id_tipo_documento: '',
    nro_documento: '',
    razon_social: '',
    nombre_comercial: '',
    id_tipo_contribuyente: '',
    direccion: '',
    telefono: '',
    estado: true,
  };
  @Input() isEditing: boolean = false;
  @Input() editingId: number | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() createEntidadEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateEntidadEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() messageEvent: EventEmitter<{ message: string, type: 'success' | 'error' }> = new EventEmitter<{ message: string, type: 'success' | 'error' }>();

  resetForm(): void {
    this.entidad = {
      id_tipo_documento: '',
      nro_documento: '',
      razon_social: '',
      nombre_comercial: '',
      id_tipo_contribuyente: '',
      direccion: '',
      telefono: '',
      estado: true,
    };
    this.isEditing = false;
    this.editingId = null;
  }

  saveEntidad(): void {
    try {
      if (this.isEditing) {
        this.updateEntidad();
      } else {
        this.createEntidad();
      }
      this.messageEvent.emit({ message: 'Operación realizada con éxito', type: 'success' });
    } catch (error) {
      this.messageEvent.emit({ message: 'Ocurrió un error, inténtelo de nuevo', type: 'error' });
    }
  }

  createEntidad(): void {
    this.createEntidadEvent.emit(this.entidad);
    this.closeModal.emit();
  }

  updateEntidad(): void {
    this.updateEntidadEvent.emit({ id: this.editingId, entidad: this.entidad });
    this.closeModal.emit();
  }

  onCloseModal(): void {
    this.resetForm();
    this.closeModal.emit();
  }
}