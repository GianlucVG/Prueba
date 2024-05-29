import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoDocumentoService } from '../../Service/tipo-documento/tipo-documento.service';
import { HeaderComponent } from "../../components/header/header.component";
import { TipoDocumentoFormComponent } from '../../components/tipo-documento-form/tipo-documento-form.component';

@Component({
  selector: 'app-tipo-documento',
  standalone: true,
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent, TipoDocumentoFormComponent]
})
export class TipoDocumentoComponent implements OnInit {
  tipoDocumentos: any[] = [];
  showModal = false;
  isEditing = false;
  editingId: number | null = null;
  tipoDocumento: any = {
    codigo: '',
    nombre: '',
    descripcion: '',
    estado: true
  };

  constructor(private tipoDocumentoService: TipoDocumentoService) {}

  ngOnInit(): void {
    this.loadTipoDocumentos();
  }

  loadTipoDocumentos(): void {
    this.tipoDocumentoService.getAll().subscribe(
      data => {
        this.tipoDocumentos = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.tipoDocumento = {
      codigo: '',
      nombre: '',
      descripcion: '',
      estado: true
    };
    this.isEditing = false;
    this.editingId = null;
  }

  handleSaveTipoDocumento(data: any): void {
    if (data.isEditing) {
      this.updateTipoDocumento(data.id, data.tipoDocumento);
    } else {
      this.createTipoDocumento(data.tipoDocumento);
    }
  }

  createTipoDocumento(tipoDocumento: any): void {
    this.tipoDocumentoService.create(tipoDocumento).subscribe(
      () => {
        this.loadTipoDocumentos();
        this.resetForm();
        this.closeModal();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  updateTipoDocumento(id: number, tipoDocumento: any): void {
    this.tipoDocumentoService.update(id, tipoDocumento).subscribe(
      () => {
        this.loadTipoDocumentos();
        this.resetForm();
        this.closeModal();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  deleteTipoDocumento(id: number): void {
    this.tipoDocumentoService.delete(id).subscribe(
      () => {
        this.loadTipoDocumentos();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  editTipoDocumento(tipoDocumento: any): void {
    this.isEditing = true;
    this.editingId = tipoDocumento.id_tipo_documento;
    this.tipoDocumento = { ...tipoDocumento, estado: tipoDocumento.estado === 1 };
    this.openModal();
  }
}