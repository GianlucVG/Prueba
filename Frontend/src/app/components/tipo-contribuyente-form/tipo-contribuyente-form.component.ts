import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tipo-contribuyente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-contribuyente-form.component.html',
  styleUrls: ['./tipo-contribuyente-form.component.scss'],
})
export class TipoContribuyenteFormComponent {
  @Input() tipoContribuyente: any = {
    nombre: '',
    estado: true
  };
  @Input() isEditing: boolean = false;
  @Input() editingId: number | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshList: EventEmitter<any> = new EventEmitter<any>();
  @Output() messageEvent: EventEmitter<{ message: string, type: 'success' | 'error' }> = new EventEmitter<{ message: string, type: 'success' | 'error' }>();

  saveTipoContribuyente(): void {
    try {
      const data = {
        id: this.editingId,
        tipoContribuyente: this.tipoContribuyente,
        isEditing: this.isEditing
      };
      this.refreshList.emit(data);
      this.messageEvent.emit({ message: 'Operación realizada con éxito', type: 'success' });
    } catch (error) {
      this.messageEvent.emit({ message: 'Ocurrió un error, inténtelo de nuevo', type: 'error' });
    }
  }

  onCloseModal(): void {
    this.resetForm();
    this.closeModal.emit();
  }

  resetForm(): void {
    this.tipoContribuyente = {
      nombre: '',
      estado: true
    };
    this.isEditing = false;
    this.editingId = null;
  }
}
