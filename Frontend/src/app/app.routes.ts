import { Routes } from '@angular/router';
import { LoginComponent } from './View/login/login.component';
import { EntidadComponent } from './View/entidad/entidad.component';
import { RegisterComponent } from './View/register/register.component';
import { TipoContribuyenteComponent } from './View/tipo-contribuyente/tipo-contribuyente.component';
import { TipoDocumentoComponent } from './View/tipo-documento/tipo-documento.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'entidades', component: EntidadComponent, },
  { path: 'contribuyente', component: TipoContribuyenteComponent, canActivate: [authGuard] },
  { path: 'documento', component: TipoDocumentoComponent, canActivate: [authGuard] },
  { path: 'PRUEBA', component: EntityFormComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];