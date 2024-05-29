import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <router-outlet></router-outlet>
  `,
    imports: [RouterModule, HeaderComponent]
})
export class AppComponent {}
