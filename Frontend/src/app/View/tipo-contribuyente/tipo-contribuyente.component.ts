import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoContribuyenteService } from '../../Service/tipo-contribuyente/tipo-contribuyente.service';
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { TipoContribuyenteFormComponent } from '../../components/tipo-contribuyente-form/tipo-contribuyente-form.component';

@Component({
  selector: 'app-tipo-contribuyente',
  standalone: true,
  templateUrl: './tipo-contribuyente.component.html',
  styleUrls: ['./tipo-contribuyente.component.scss'],
  imports: [CommonModule, HeaderComponent, FormsModule, TipoContribuyenteFormComponent]
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
        this.closeModal();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  updateTipoContribuyente(id: number, tipoContribuyente: any): void {
    this.tipoContribuyenteService.update(id, tipoContribuyente).subscribe(
      () => {
        this.loadTipoContribuyentes();
        this.closeModal();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  editTipoContribuyente(tipoContribuyente: any): void {
    this.isEditing = true;
    this.editingId = tipoContribuyente.id_tipo_contribuyente;
    this.tipoContribuyente = { ...tipoContribuyente, estado: tipoContribuyente.estado === 1 };
    this.openModal();
  }

  deleteTipoContribuyente(id: number): void {
    this.tipoContribuyenteService.delete(id).subscribe(
      () => {
        this.loadTipoContribuyentes();
      },
      error => {
        console.error('Error:', error);
      }
    );
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