import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntidadService } from '../../Service/entidad/entidad.service';
import { HeaderComponent } from '../../components/header/header.component';
import { EntityFormComponent } from '../../components/entity-form/entity-form.component';
import { AlertComponent } from "../../components/alert/alert.component";

@Component({
    selector: 'app-entidad',
    standalone: true,
    templateUrl: './entidad.component.html',
    styleUrls: ['./entidad.component.scss'],
    imports: [CommonModule, FormsModule, HeaderComponent, EntityFormComponent, AlertComponent]
})
export class EntidadComponent implements OnInit {
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  
  entidades: any[] = [];
  entidad = {
    id_tipo_documento: '',
    nro_documento: '',
    razon_social: '',
    nombre_comercial: '',
    id_tipo_contribuyente: '',
    direccion: '',
    telefono: '',
    estado: true
  };
  isEditing = false;
  editingId: number | null = null;
  showModal = false;

  constructor(private entidadService: EntidadService) {}

  ngOnInit(): void {
    this.loadEntidades();
  }

  loadEntidades(): void {
    this.entidadService.getAll().subscribe(
      data => {
        this.entidades = data;
      },
      error => {
        console.error('Error:', error);
        this.showMessage('Error al cargar entidades', 'error');
      }
    );
  }

  openModal(): void {
    this.showModal = true;
    this.resetForm();
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleCreateEntidad(entidad: any): void {
    this.entidadService.create(entidad).subscribe(
      () => {
        this.loadEntidades();
        this.resetForm();
        this.showMessage('Entidad creada exitosamente', 'success');
      },
      error => {
        console.error('Error:', error);
        this.showMessage(error.error.message || 'Error al crear la entidad', 'error');
      }
    );
  }

  handleUpdateEntidad(data: any): void {
    const { id, entidad } = data;
    this.entidadService.update(id, entidad).subscribe(
      () => {
        this.loadEntidades();
        this.resetForm();
        this.showMessage('Entidad actualizada exitosamente', 'success');
      },
      error => {
        console.error('Error:', error);
        this.showMessage(error.error.message || 'Error al actualizar la entidad', 'error');
      }
    );
  }

  editEntidad(entidad: any): void {
    this.isEditing = true;
    this.editingId = entidad.id_entidad;
    this.entidad = { ...entidad, estado: entidad.estado === 1 };
    this.showModal = true;
  }

  deleteEntidad(id: number): void {
    this.entidadService.delete(id).subscribe(
      () => {
        this.loadEntidades();
        this.showMessage('Entidad eliminada exitosamente', 'success');
      },
      error => {
        console.error('Error:', error);
        this.showMessage(error.error.message || 'Error al eliminar la entidad', 'error');
      }
    );
  }

  resetForm(): void {
    this.entidad = {
      id_tipo_documento: '',
      nro_documento: '',
      razon_social: '',
      nombre_comercial: '',
      id_tipo_contribuyente: '',
      direccion: '',
      telefono: '',
      estado: true
    };
    this.isEditing = false;
    this.editingId = null;
  }

  handleMessage(event: { message: string, type: 'success' | 'error' }): void {
    this.showMessage(event.message, event.type);
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 3000);
  }
}