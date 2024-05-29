import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntidadService } from '../../Service/entidad/entidad.service';
import { HeaderComponent } from '../../components/header/header.component';
import { EntityFormComponent } from '../../components/entity-form/entity-form.component';

@Component({
  selector: 'app-entidad',
  standalone: true,
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent, EntityFormComponent]
})
export class EntidadComponent implements OnInit {
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
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  handleUpdateEntidad(data: any): void {
    const { id, entidad } = data;
    this.entidadService.update(id, entidad).subscribe(
      () => {
        this.loadEntidades();
        this.resetForm();
      },
      error => {
        console.error('Error:', error);
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
      },
      error => {
        console.error('Error:', error);
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
}
