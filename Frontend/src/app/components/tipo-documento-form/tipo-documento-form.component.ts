import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tipo-documento-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-documento-form.component.html',
  styleUrls: ['./tipo-documento-form.component.scss'],
})
export class TipoDocumentoFormComponent {
  @Input() tipoDocumento: any = {
    codigo: '',
    nombre: '',
    descripcion: '',
    estado: true,
  };
  @Input() isEditing: boolean = false;
  @Input() editingId: number | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveTipoDocumentoEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() messageEvent: EventEmitter<{ message: string, type: 'success' | 'error' }> = new EventEmitter<{ message: string, type: 'success' | 'error' }>();

  resetForm(): void {
    this.tipoDocumento = {
      codigo: '',
      nombre: '',
      descripcion: '',
      estado: true,
    };
    this.isEditing = false;
    this.editingId = null;
  }

  saveTipoDocumento(): void {
    try {
      const data = {
        id: this.editingId,
        tipoDocumento: this.tipoDocumento,
        isEditing: this.isEditing
      };
      this.saveTipoDocumentoEvent.emit(data);
      this.messageEvent.emit({ message: 'Operación realizada con éxito', type: 'success' });
    } catch (error) {
      this.messageEvent.emit({ message: 'Ocurrió un error, inténtelo de nuevo', type: 'error' });
    }
    this.resetForm();
    this.closeModal.emit();
  }

  onCloseModal(): void {
    this.resetForm();
    this.closeModal.emit();
  }
}