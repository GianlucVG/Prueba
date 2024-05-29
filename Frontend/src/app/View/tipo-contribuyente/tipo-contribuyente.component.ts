import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoContribuyenteService } from '../../Service/tipo-contribuyente/tipo-contribuyente.service';
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { TipoContribuyenteFormComponent } from '../../components/tipo-contribuyente-form/tipo-contribuyente-form.component';
import { AlertComponent } from "../../components/alert/alert.component";

@Component({
  selector: 'app-tipo-contribuyente',
  standalone: true,
  templateUrl: './tipo-contribuyente.component.html',
  styleUrls: ['./tipo-contribuyente.component.scss'],
  imports: [CommonModule, HeaderComponent, FormsModule, TipoContribuyenteFormComponent, AlertComponent]
})
export class TipoContribuyenteComponent implements OnInit {
  tipoContribuyentes: any[] = [];
  showModal = false;
  isEditing = false;
  editingId: number | null = null;
  tipoContribuyente: any = {
    nombre: '',
    estado: true
  };
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  constructor(private tipoContribuyenteService: TipoContribuyenteService) {}

  ngOnInit(): void {
    this.loadTipoContribuyentes();
  }

  loadTipoContribuyentes(): void {
    this.tipoContribuyenteService.getAll().subscribe(
      data => {
        this.tipoContribuyentes = data;
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
    this.tipoContribuyente = {
      nombre: '',
      estado: true
    };
    this.isEditing = false;
    this.editingId = null;
  }

  handleSaveTipoContribuyente(data: any): void {
    if (data.isEditing) {
      this.updateTipoContribuyente(data.id, data.tipoContribuyente);
    } else {
      this.createTipoContribuyente(data.tipoContribuyente);
    }
  }

  createTipoContribuyente(tipoContribuyente: any): void {
    this.tipoContribuyenteService.create(tipoContribuyente).subscribe(
      () => {
        this.loadTipoContribuyentes();
        this.resetForm();
        this.closeModal();
        this.showMessage('Tipo de contribuyente creado con éxito', 'success');
      },
      error => {
        console.error('Error:', error);
        this.showMessage('Error al crear el tipo de contribuyente', 'error');
      }
    );
  }

  updateTipoContribuyente(id: number, tipoContribuyente: any): void {
    this.tipoContribuyenteService.update(id, tipoContribuyente).subscribe(
      () => {
        this.loadTipoContribuyentes();
        this.resetForm();
        this.closeModal();
        this.showMessage('Tipo de contribuyente actualizado con éxito', 'success');
      },
      error => {
        console.error('Error:', error);
        this.showMessage('Error al actualizar el tipo de contribuyente', 'error');
      }
    );
  }

  deleteTipoContribuyente(id: number): void {
    this.tipoContribuyenteService.delete(id).subscribe(
      () => {
        this.loadTipoContribuyentes();
        this.showMessage('Tipo de contribuyente eliminado con éxito', 'success');
      },
      error => {
        console.error('Error:', error);
        this.showMessage('Error al eliminar el tipo de contribuyente', 'error');
      }
    );
  }

  editTipoContribuyente(tipoContribuyente: any): void {
    this.isEditing = true;
    this.editingId = tipoContribuyente.id_tipo_contribuyente;
    this.tipoContribuyente = { ...tipoContribuyente, estado: tipoContribuyente.estado === 1 };
    this.openModal();
  }

  handleMessage(event: { message: string, type: 'success' | 'error' }): void {
    this.message = event.message;
    this.messageType = event.type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 3000);
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
